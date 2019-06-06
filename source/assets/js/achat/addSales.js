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
  var tableFoot = function (table, total) {
    var tableCoupons = table.querySelector('table')
    var tfoot = tableCoupons.querySelector('tfoot')
    if (tfoot) {
      tfoot.parentNode.removeChild(tfoot)
    }
    tableCoupons.insertAdjacentHTML('beforeend', `<tfoot><tr>
                            <td>valeur des coupon</td>
                            <td>total Nbr coupons </td>
                            <td>${total}</td>
                            <td>
                            </td>
            </tr></tfoot>`)
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
                            <button class="btn btn-sm btn-info">edit</button>
                            <button class="btn btn-sm btn-danger">Remove</button>
                            </td>
            </tr>`

            table.classList.remove('d-none')

            tbody.insertAdjacentHTML('beforeend', template)

            switch (nbrCoupon.value) {
              case ('15'):
                totalAmount = totalAmount * 230
                break;
              case ('25'):
                totalAmount = totalAmount * 225
                break;
              case ('50'):
                totalAmount = totalAmount * 220
                break;
              default:
                totalAmount = totalAmount * 230

            }

            total = total + totalAmount
            tableFoot(table, total)


            nbrCoupon.value = ''
            prixCoupon.value = ''
            totalCostCoupon.innerHTML = 0

            option.parentNode.removeChild(option)

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
    }
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
  var generateSelectProd = function (arr) {
    var addSelect = function (array) {
      var result = ''
      array.forEach(function (el) {
        var templ = `<div
                        class="custom-control custom-radio custom-control-inline" >
                        <input
                          class="custom-control-input"
                          id="${el.ref}"
                          type="radio"
                          name= "categories"
                           / >
                        <label
                          class="custom-control-label"
                          for="${el.ref}">
                            <img
                              src="${el.img}"
                              alt="${el.title}"
                              width="50px" /></label>
                      </div>`
        result = result + templ
      })
      return result
    }
    var html = `<div class="selected--product d-flex justify-content-between">
                    ${addSelect(arr)}
                  </div>`
    return html
  };
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
        // display block
        block.classList.remove('d-none')
        // add name of product
        tittle.innerHTML = `Le produit choisit (${cat.id})`

        // calc amout on rows
        nbrCoupon.addEventListener('change', function () {
          totalCostCoupon.innerHTML = parseFloat(prixCoupon.value) * parseFloat(nbrCoupon.value)
        })

        Utils.getData('users', (obj) => {
          var data = obj.map(el => el.email)
          console.log(data)
          $(".emailUser").select2({
            data: data,
            placeholder: 'email',
            allowClear: true,
            minimumResultsForSearch: 2
          });;
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
            recap.details.forEach((cp, i) => {
              var filtre = obj.filter(el => {
                return el.montant === cp.prix
              })
              for (let i = 0; i < cp.nbrCp; i++) {
                const element = filtre[i];
                coupons.push(element)
              }
            })
            console.log('go next')
            productObj = fullobj.filter(el => el.ref === cat.id)
            UISales.contentModal('#recapCommand', recap, coupons, productObj[0])
            console.log('add content modal')
            var btnSave = document.querySelector('#recapCommand .alertSuccess')
            btnSave.addEventListener('click', (e) => {
              e.preventDefault()
              console.log(recap, coupons)
            })
          })

        })
      })
    })
  }
  window.onload = () => {
    Utils.getData('products', (obj) => {
      document.querySelector('.toSelect').insertAdjacentHTML('beforeend', generateSelectProd(obj))
      var products = document.querySelectorAll(Dom.slectProduct + ' input')
      handleSelectProducts(products, Dom, obj)


    })
  }
})(UISales)
