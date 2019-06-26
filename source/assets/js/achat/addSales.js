var UISales = (function () {
  DomElems = {
    mainBlock: '.toSelect',
    formSales: '.formSales',
    slectProduct: '.selected--product',
    selectedProd: '.selectedProd',
    totalAmountInit: '.totalAmount',
    totalAmountUi: '.totalAmountUi',
    costCoupon: '.prixCoupon',
    totalCoupon: '.nbrCoupon',
    totalCostCoupon: '.totalCostCoupon'
  }

  var validForm = function (cls, event, cb) {
    var form = document.querySelector(cls);
    //Loop over them and prevent submission
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log(form.checkValidity())

      form.classList.add('was-validated');
      //return false
    } else {
      form.classList.add('was-validated');
      return cb(form.checkValidity())
    }
  }
  return {
    getDomEls: () => {
      return DomElems
    },
    addRows: (el, prixCoupon, nbrCoupon, totalCostCoupon) => {
      var addRow = document.querySelector(el)
      var total = 0
      addRow.addEventListener('click', function (e) {
        e.preventDefault()
        validForm('.needs-validation', e, () => {
          validForm('.tableRow', e, () => {
            var option = prixCoupon.querySelector(`option[value="${prixCoupon.value}"]`)
            var table = document.querySelector('.tableCoupons')
            var tbody = table.querySelector('tbody')
            var totalAmount = parseFloat(prixCoupon.value) * parseFloat(nbrCoupon.value)
            var template = `<tr>
                            <td data-prix="${prixCoupon.value}">${prixCoupon.value}</td>
                            <td data-nbrcp="${nbrCoupon.value}">${nbrCoupon.value}</td>
                            <td data-total="${totalAmount}"> ${totalAmount}</td>
                            <td>
                            <button class="btn btn-sm btn-info editRow">edit</button>
                            <button class="btn btn-sm btn-danger delRow">Remove</button>
                            </td>
            </tr>`

            table.classList.remove('d-none')

            tbody.insertAdjacentHTML('beforeend', template)
            nbrCoupon.value = ''
            prixCoupon.value = ''
            totalCostCoupon.innerHTML = 0
            option.parentNode.removeChild(option)
            UISales.removeRow()
            UISales.editRow()
          })


        })
      })
    },
    contentModal: (modal, recap, coupons, prod) => {
      var generateRows = function () {
        var html = ''
        coupons.forEach(el => {
          var template = `<tr>
                          <td>${el.montant}</td>
                          <td>${el.codeCoupon}</td>
                          <td>${el.prixVente}</td>
                          <td>${el.devise}</td>
                        </tr>`
          html = html + template
          return html
        })
        return html
      }
      var template = `<div class="media w-100 p-3 shadow-sm ">
                      <img width='120' src="${prod.img}" class="align-self-start mr-3" alt="${prod.title}">
                      <div class="media-body">
                        <h5 class="mt-0">Produit: ${prod.title}</h5>
                        <p>Email: ${recap.emailUser}</p>
                        <p>Numero de commande: ${recap.numCommand}</p>
                        <p>Preveu de payement: ${recap.proof}</p>
                        </div>
                      </div>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Valeur Coupon</th>
                            <th scope="col">Code Coupon</th>
                            <th scope="col">Prix vente</th>
                            <th scope="col">Devise</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${generateRows()}
                        </tbody>
                      </table>`
      var modalBody = document.querySelector(`${modal} .modal-body`)
      if (modalBody === null) {
        console.log('null')
        setTimeout(() => {
          modalBody.insertAdjacentHTML('beforeend', template)
        }, 200)
      } else {

        modalBody.insertAdjacentHTML('beforeend', template)
      }

      console.log('prod', prod)
      console.log('recap', recap)
      console.log('coupons', coupons)
    },
    removeRow: () => {
      var btnDel = document.querySelectorAll('.delRow')
      btnDel.forEach(btn => {
        btn.addEventListener('click', function () {
          var row = btn.parentNode.parentNode
          var nbr = row.querySelector('td[data-nbrcp]').dataset.nbrcp
          var opt = row.querySelector('td[data-prix]').dataset.prix
          var select = document.querySelector('.prixCoupon')
          select.insertAdjacentHTML('afterbegin', `<option value="${opt}">${opt}</option>`)
          select.value = opt
          row.parentNode.removeChild(row)

        })
      })
    },
    editRow: () => {
      var btnEdit = document.querySelectorAll('.editRow')
      btnEdit.forEach(btn => {
        btn.addEventListener('click', function () {
          var row = btn.parentNode.parentNode
          var nbr = row.querySelector('td[data-nbrcp]').dataset.nbrcp
          var nbrCoup = document.querySelector('.nbrCoupon')

          var opt = row.querySelector('td[data-prix]').dataset.prix


          nbrCoup.value = nbr
          var select = document.querySelector('.prixCoupon')
          select.insertAdjacentHTML('afterbegin', `<option value="${opt}" selected="selected">${opt}</option>`)
          select.value = opt
          row.parentNode.removeChild(row)
        })
      })
    },
    pushDataSale: (recap, coupons) => {
      Utils.getData('users?email=' + recap.emailUser, (obj) => {
        var tablecoup = []
        coupons.forEach(item => {
          tablecoup.push({
            cat: item.cat,
            codeCoupon: item.codeCoupon,
            montant: item.montant,
            produitRef: item.produitRef
          })
        })
        var shop = {
          numCommand: recap.numCommand,
          proof: recap.proof,
          dateVente: Utils.todayDate(),
          coupons: [...tablecoup]
        }
        var data = { ...obj[0] }
        data.shop.push(shop)
        console.log('data', data)
        Utils.updateData('users', obj[0].id, data, (obj) => {
          console.log('pushed')
        })
        coupons.forEach(item => {
          var data = { ...item, valide: false }
          console.log(data)
          Utils.updateData('coupons', item.id, data, (obj) => {
            console.log('pushed')
          })
        })
      })
    },
    generateBlockAddSale: (content) => {
      var cont = document.querySelector(content)
      cont.innerHTML = ""
      var template = `<div class="card-body col-12">
  <h4 mb-3">Informations client<small class="ml-2 text-info selectedProd"></small></h4>
  <form class="needs-validation" novalidate="novalidate">
      <div class="form-row">
        <div class=" col-12 col-md-6 mb-3">
          <input class="form-control emailUser" required="required" type="text" placeholder="Email" aria-label="emailUser" aria-describedby="email User" />
          <div class="invalid-feedback">L' email est obligatoire</div>
        </div>
        <div class=" col-12 col-md-6 mb-3">
          <input class="form-control phoneUser" required="required" type="text" placeholder="Phone " aria-label="phoneUser" aria-describedby="phone User" />
          <div class="invalid-feedback">L' email est obligatoire</div>
        </div>
        <div class=" col-12 col-md-6 mb-3">
          <input class="form-control locationUser" required="required" type="text" placeholder="Adress " aria-label="locationUser" aria-describedby="Location User" />
          <div class="invalid-feedback">Le nom de la ville est obligatoire</div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <textarea class="form-control" placeholder="Note" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </div>
      </div>
  </form>
</div><hr class='m-0' />
<div class="card-body col-12">
  <h5 class="card-header mb-3">choisir les coupons</h5>
  <form class="tableRow d-flex justify-content-between align-items-center" novalidate="novalidate">
    <div>
      <select class="custom-select prixCoupon" required="required"></select>
    </div>
    <div>
      <div class="input-group">
        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">N°</span></div>
        <input class="form-control nbrCoupon" required="required" type="number" min="0" placeholder="nombre de coupon" aria-label="nbr Coupons" aria-describedby="basic-addon1" />
      </div>
    </div>
    <div:span class="totalCostCoupon">- total</div:span>
    <div:a class="btn btn-primary addRow" href="#">+</div:a>
  </form>
  <div class="tableCoupons d-none mt-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Valeur Coupon</th>
          <th scope="col">Nbr Coupon</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="nextStep">
      <button class="btn btn-success recapCommande float-right" data-toggle="modal" data-target="#recapCommand">Recap</button>
    </div>
  </div>
</div>`
      cont.insertAdjacentHTML('beforeend', template)

    },

    /**
     *
     * @param obj
     * @returns {string}
     */
    gereratCards: function (obj) {
      data = obj

      var html = `<div class="col-md-3 mb-3 ">
                    <a data-toggle="modal" data-product="${data.ref}" data-target="#addSales" href='#' class="media addOrder bg-white shadow-sm p-3">
                      <img src="${data.img}" class="align-self-center mr-3" width="70px" alt="${data.title}">
                      <div class="media-body">
                        <h5 class="mt-0">${data.title}</h5>
                        <p>${data.desc}</p>
                        <p class="mb-0">
                          <span class='badge badge-light'>${data.ref}</span>
                          <span class='badge badge-light'>${data.cat}</span>
                        </p>
                      </div>
                    </a>
                  </div>`
      return html
    },
    clearModalForm: function() {
      $('.addOrderFormUser').find('input[type=text], input[type=email], input[type=number], textarea').val('');
      $('.addOrderFormProd').find('input[type=text], input[type=email], input[type=number], select, textarea').val('');

    },
    showSelectCat: function() {

        var template = `
                <div class="popover" role="tooltip">
                  <div class="arrow"></div>
                  <h3 class="popover-header">Choisir un Produit</h3>
                  <div class="popover-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, sit!</p>
                    <select class="chooseRef"> 
                      <option value="0">0</option>
                    </select>
                  </div>
                </div>`

        //console.log(els)
        $('.otherProd').popover({
          html: true,
          content: function(){
            return template
          }
        })



    },
  }

})()



var Sales = (function (UISales) {
  var Dom = UISales.getDomEls()
  var saveCommande = function (product, cb) {
    var btn = document.querySelector('.recapCommande')
    btn.addEventListener('click', () => {
      var rows = document.querySelectorAll('.tableCoupons tbody tr')
      var numCommande = document.querySelector('.idCommande').value
      var emailUser = document.querySelector('.emailUser').value
      var proof = document.querySelector('.proof').value
      var recap = {
        numCommand: numCommande,
        emailUser: emailUser,
        proof: proof,
        product: product,
        details: []
      }
      rows.forEach(row => {
        var tds = row.querySelectorAll('td')
        var details = {
          prix: '',
          nbrCp: '',
          total: ''
        }
        tds.forEach(td => {
          if (td.dataset.prix) {
            details.prix = td.dataset.prix
          }
          if (td.dataset.nbrcp) {
            details.nbrCp = td.dataset.nbrcp
          }

          if (td.dataset.total) {
            details.total = td.dataset.total
          }

        })
        recap.details.push(details)

        return (details)
      })
      return cb(recap)

    })


  }
  var limitNbrCoupons = function (nbrCoupon, priceCoup, ref) {
    Utils.getData('coupons?valide=true&produitRef=' + ref, (obj) => {
      var max = obj.filter(el => el.montant === priceCoup)
      nbrCoupon.setAttribute('max', max.length)
      console.log(max)
    })
  }
  var getValideCoupon = function (obj) {
    return obj.filter(el => {
      if (el.valide !== false) {
        return el.montant
      }
    })
  }
  var generateSelectCostCoupon = function (productId) {
    Utils.getData('coupons?produitRef=' + productId, (obj) => {

      // object of amouts coupons valide for the product
      var t = getValideCoupon(obj)
      console.log('montant', t)

      // array of amout coupon valide
      var correctTable = t.map(el => el.montant)
      // return array without duplicated value
      let x = (names) => names.filter((v, i) => names.indexOf(v) === i)
      // sort array by value
      let table = x(correctTable).sort()
      // select elem on the dom
      var prixCoupon = document.querySelector(Dom.costCoupon)
      // fetch table  to generate options
      table.forEach((el) => {
        // add options to select
        prixCoupon.insertAdjacentHTML('beforeend', `<option value="${el}">${el}</option>`)
      })
    })
  }
  var handleSelectProducts = function (arr, Dom, fullobj) {
    // fetch nodeArray
    arr.forEach(cat => {
      // add event click
      cat.addEventListener('click', function () {
        //UISales.generateBlockAddSale()
        // vars Dom elements
        var block = document.querySelector(Dom.formSales)
        var tittle = document.querySelector(Dom.selectedProd)
        var prixCoupon = document.querySelector(Dom.costCoupon)
        var nbrCoupon = document.querySelector(Dom.totalCoupon)
        var totalCostCoupon = document.querySelector(Dom.totalCostCoupon)

        // init productId
        productId = cat.id
        // add valid coupons on select
        generateSelectCostCoupon(productId)

        // add name of product
        tittle.innerHTML = `Le produit choisit (${productId})`

        // calc amout on rows
        nbrCoupon.addEventListener('change', function () {
          totalCostCoupon.innerHTML = parseFloat(prixCoupon.value) * parseFloat(nbrCoupon.value)
          limitNbrCoupons(nbrCoupon, prixCoupon.value, cat.id)
        })

        Utils.getData('users', (obj) => {
          var data = obj.map(el => el.email)
          console.log(data)
          $(".emailUser").select2({
            data: data,
            placeholder: 'email',
            allowClear: true,
            minimumResultsForSearch: 2
          });
          $(".emailUser").on("change", function (e) {
            $(e.target).valid();
          });
        })
        // add row on table
        UISales.addRows('.addRow', prixCoupon, nbrCoupon, totalCostCoupon)
        saveCommande(`${cat.id}`, (recap) => {

          var container = document.querySelector('.formSales')
          var modal = container.querySelector('#recapCommand')
          if (modal) {
            modal.parentNode.removeChild(modal)
          }
          modal = Utils.generateModal(`Recap commande ${recap.numCommand}`, 'recapCommand')
          container.insertAdjacentHTML('beforeend', modal)
          Utils.getData(`coupons?produitRef=${recap.product}&valide=true`, obj => {
            var coupons = []
            recap.details.forEach((cp) => {
              console.log('here')
              var filtre = obj.filter(el => {
                return el.montant === cp.prix
              })
              for (let i = 0; i < cp.nbrCp; i++) {
                const element = filtre[i];
                coupons.push(element)
              }
            })
            console.log('fullobj', fullobj)
            var productObj = fullobj.filter(el => el.ref === `${cat.id}`)
            UISales.contentModal('#recapCommand', recap, coupons, productObj[0])
            var btnSave = document.querySelector('#recapCommand .alertSuccess')
            btnSave.addEventListener('click', (e) => {
              e.preventDefault()
              console.log(recap, coupons)
              UISales.pushDataSale(recap, coupons)
            })
          })

        })
      })
    })
  }

  window.onload = () => {
    Utils.getData('products', (obj) => {

      var products = document.querySelector(Dom.formSales)
      obj.forEach(el => {
        var product = UISales.gereratCards(el)
        products.insertAdjacentHTML('beforeend', product)
      })

      var cont = document.querySelector('.formSales')
      var modal = cont.querySelector('.modal')
      var products = document.querySelectorAll('.addOrder')
      var prixCoupon = modal.querySelector(Dom.costCoupon)
      var nbrCoupon = modal.querySelector(Dom.totalCoupon)
      var totalCostCoupon = modal.querySelector(Dom.totalCostCoupon)

      var emailUser = modal.querySelector('.emailUser')
      var phoneUser = modal.querySelector('.phoneUser')
      var locationUser = modal.querySelector('.locationUser')
      var userNote = modal.querySelector('.userNote')
      var ref  = ''
      products.forEach(prod => {
        prod.addEventListener('click', function () {
          generateSelectCostCoupon(prod.dataset.product)
          ref = prod.dataset.product


          nbrCoupon.addEventListener('change', function () {
            totalCostCoupon.innerHTML = parseFloat(prixCoupon.value) * parseFloat(nbrCoupon.value)
            limitNbrCoupons(nbrCoupon, prixCoupon.value, prod.dataset.product)
          })


        })

      })
      var saveData = document.querySelector('.saveData')
      var otherProd = document.querySelector('.otherProd')
      var order  = {
        ref: "",
        prixCoupon: "",
        nbrCoupon: ""
      }
      var orderBoj= {
        email: '',
        tel: "",
        ville: "",
        note: "",
        orders: [ ]

      }

      /**
       *
       * @param product
       */
        var addOrderProduct = function(product) {
        order  = {
          ref: product,
          prixCoupon: prixCoupon.value,
          nbrCoupon: nbrCoupon.value
        }
        orderBoj.orders.push(order)
      }
      saveData.addEventListener('click', function (e) {
        e.preventDefault()
        orderBoj= {
          email: emailUser.value,
          tel: phoneUser.value,
          ville: locationUser.value,
          note: userNote.value,
          orders: [
          ]
        }
        addOrderProduct(ref)
        console.log(orderBoj)
        UISales.clearModalForm()
        orderBoj= {
          email: '',
          tel: '',
          ville: '',
          note: '',
          orders: [
          ]
        }
        //console.log(orderBoj)
      })
      otherProd.addEventListener('click',function ()  {
        // Afficher un select de choix du produit
        console.log(this)
        UISales.showSelectCat()

        //addOrderProduct(el)
      })
    })

  }
})(UISales)
