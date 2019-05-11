/* ********
 *
 * Coupons Plugin
 *
 * **********
 * */
var CouponController = (function () {


  return {
    getData: function (cb) {
      var elems;
      Store.ShowData("categories", function (obj) {
        elems = obj
        cb(elems)
      })
    }
  }

})()

var UICoupon = (function () {
  var DOMstrings = {
    addModal: '.add-coupons'
  }
  var showRecapAddCoupModal = function (obj) {
    // Logout Modal
    var insertInfo = function (tab) {
      var list = ''
      tab.forEach(function (el) {
        var html = `<tr>
                      <td>${el.cat}</td>
                      <td>${el.produit}</td>
                      <td>${el.source}</td>
                      <td>${el.montant}</td>
                      <td>${el.devise}</td>
                      <td>${el.prixAchat}</td>
                      <td>${el.prixVente}</td>
                      <td>${el.codeCoupon}</td>
                      </tr>`
        list = html
      })
      return list
    }
    var html = `<table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Cat</th>
                      <th scope="col">produit</th>
                      <th scope="col">Source</th>
                      <th scope="col">Montant</th>
                      <th scope="col">Devise</th>
                      <th scope="col">prixAchat</th>
                      <th scope="col">prixVente</th>
                      <th scope="col">codeCoupon</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${insertInfo(obj)}

                  </tbody>
                </table>`
    var modal = document.querySelector('#recapModal .modal-body')
    modal.insertAdjacentHTML('beforeend', html)

  }
  var todayDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today

  }
  return {
    generateCard: function (content, obj) {
      var addTags = function (arr) {
        var els = ''
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i];
          var h = `<code>${el}</code>`
          els = els + h + ' / '
        }
        return els
      }
      var html = `<div class="col-md-3" data-content="${obj.title.toLowerCase()}">
                    <div class="card">
                      <img class="card-img-top" src="${obj.img}" alt="${obj.title}" />
                      <div class="card-body text-center">
                        <h4 class="card-title cat__title">${obj.title}</h4>
                        <p class="card-text cat__desc">${obj.desc}</p>
                        <p class="card-text cat__tags">
                        ${addTags(obj.labels)}
                        </p>
                        <a class="btn btn-outline-primary addCoupon" href="#" data-target="${obj.title.toLowerCase()}">Ajouter des coupons</a>
                  </div>
                </div>
      </div>`
      var cont = document.querySelector(content)

      cont.insertAdjacentHTML('beforeend', html)

    },
    generateInputs: function (obj) {
      var html = `<div class="form-group col-md-4">
                    <label for="${obj.id}">${obj.label}</label>
                    <input id = "${obj.id}"
                    class = "form-control ${obj.cls}"
                    type = "${obj.type}",
                    aria-describedby = '${obj.desc}'
                    value = "${obj.val}"
                    placeholder = "${obj.placeH}">
                  </div>`
      return html
    },
    generateSelectProd: function (arr) {
      var addSelect = function (array) {
        var result = ''
        array.forEach(function (el) {
          var templ = `<div
                        class="custom-control custom-radio custom-control-inline">
                        <input
                          class="custom-control-input"
                          id="${el.ref}"
                          type="radio"
                          name = "${el.cat}" / >
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
      var html = `<div class="selected--product">
                    ${addSelect(arr)}
                  </div>`
      return html
    },
    closeCat: function (addBtn, cat, container) {
      var btn = container.querySelector('.closeCat')
      var close = function () {
        container.classList.add('d-none')
        container.querySelector(`.add-${cat}`).classList.add('d-none')
        container.querySelector(`.add-${cat}`).classList.remove('active')
        document.querySelectorAll('.couponChoiceCat .col-md-3').forEach((el) => {
          el.classList.remove('d-none')
          el.classList.remove('active')
        })
        addBtn.classList.remove('d-none')
      }
      btn.addEventListener('click', close)

    },
    showRecap: function (cat, content) {
      var showAction = content.querySelector(`.add-${cat} .showRecap`)
      var el = cat
      console.log(showAction)
      var data = []
      showAction.addEventListener('click', function () {
        var radios = content.querySelectorAll(`.add-${el} .selected--product input`)
        var activeTab = content.querySelector(`.add-${el} .show`)
        var source = content.querySelector(`.add-${el} .sourceCoupon`)
        var montant = content.querySelector(`.add-${el} .montantCoupon`)
        var devise = content.querySelector(`.add-${el} .devise`)
        var prixAchat = content.querySelector(`.add-${el} .prixAchat`)
        var prixVente = content.querySelector(`.add-${el} .prixVente`)
        var codeCoupon = content.querySelector(`.add-${el} .codeCoupon`)

        var cat, produit;
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            cat = radios[i].getAttribute('name')
            produit = radios[i].getAttribute('id')
          }
        }
        data.push({
          cat: cat,
          produit: produit,
          tab: activeTab.getAttribute('id'),
          source: source.value,
          montant: montant.value,
          devise: devise.options[devise.selectedIndex].value,
          prixAchat: parseInt(prixAchat.value) * parseInt(montant.value),
          prixVente: parseInt(prixVente.value) * parseInt(montant.value),
          codeCoupon: codeCoupon.value,
          date: todayDate(),
          valide: true
        })
        console.log(data)
        showRecapAddCoupModal(data)
        return data
      })
      //
      return data
    },
    generateForm: function (cat, ref) {
      var html = `<form>
                    <div class="form-row">
                      ${UICoupon.generateInputs({
                        id: cat+'-source-'+ref,
                        cls: "sourceCoupon",
                        type: "text",
                        desc: '',
                        val: "",
                        label: "Source",
                        placeH: "Indiquer la source"
                      })}
                      ${UICoupon.generateInputs({
                        id: cat+'-montant-'+ref,
                        cls: "montantCoupon",
                        type: "number",
                        desc: '',
                        val: "",
                        label: "Montant",
                        placeH: "Indiquer la montant"
                      })}
                      ${UICoupon.generateListInput(
                        'devise',
                        "Devise",
                        cat+'-devise-'+ref,
                        "Default value",
                        [
                          {val:"dollar",
                          label:"$"},
                          {val:"euro",
                          label:"€"}
                        ])}
                      ${UICoupon.generateInputs({
                        id: cat+'-prixAchat-'+ref,
                        cls: "prixAchat",
                        type: "number",
                        desc: '',
                        val: "210",
                        label: "Prix d'achat",
                        placeH: "Indiquer le prix d'achat"
                      })}
                      ${UICoupon.generateInputs({
                        id: cat+'-prixVente-'+ref,
                        cls: "prixVente",
                        type: "number",
                        desc: '',
                        val: "230",
                        label: "Prix de vente",
                        placeH: "Indiquer le prix de vente"
                      })}
                      ${UICoupon.generateInputs({
                        id: cat+'-codeCoupon-'+ref,
                        cls: "codeCoupon",
                        type: "text",
                        desc: '',
                        val: "",
                        label: "Code",
                        placeH: "Indiquer le code a ajouter"})}
                    </div>
                  </form>`
      return html
    },
    generateListInput: function (cls, val, id, label, arr) {
      var options = function (arr) {
        var el;
        arr.forEach(function (opt) {
          var h = `<option value = '${opt.val}'>${opt.label}</option>`
          el = el + h
        })
        return el
      }
      var html = `<div class="form-group col-md-4">
                    <label for="${id}">${val}</label>
                    <select id="${id}" class="custom-select ${cls}">
                      <option value="">${label}</option>
                      ${options(arr)}
                    </select>
                  </div>`
      return html
    }
  }
})()

var CoupnCenter = (function (UICoup, CouponCtrl, Store) {

  window.onload = function () {
    var arrCoupn = []
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var fileSelected = document.getElementById('txtfiletoread');
      fileSelected.addEventListener('change', function (e) {
        //Set the extension for the file
        var fileExtension = /text.*/;
        //Get the file object
        var fileTobeRead = fileSelected.files[0];
        //Check of the extension match
        if (fileTobeRead.type.match(fileExtension)) {
          //Initialize the FileReader object to read the 2file
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            var fileContents = document.getElementById('msg');
            //fileContents.innerText = fileReader.result;
            var arrayOfLines = fileReader.result.match(/[^\r\n]+/g);
            console.log(arrCoupn)

            arrayOfLines.forEach((el, id) => {
              //console.log(el)
              var coupn = el.replace(',', '')
              coupn = coupn.replace(' ', '')
              coupn = coupn.replace('$', '')
              coupn = coupn.split(':')
              arrCoupn.push({
                amount: coupn[0],
                code: coupn[1],
                id: id,
                dateAjout: UICoup.todayDate(),
                source: 'gearbest',
                prixAchat: '210',
                prixVente: '230',
                status: 'Valide',
                devise: '$'
              })

            })
            arrCoupn.forEach((el) => {
              var html = `<div>
                            <span>${el.amount} ${el.devise}</span>
                            <span>${el.source}</span>
                            <span>${el.code}</span>
                            <span>${el.dateAjout}</span>

</div>`
              fileContents.insertAdjacentHTML('beforeend', html)
            })
          }
          fileReader.readAsText(fileTobeRead);
        } else {
          alert("Please select text file");

        }

      }, false);

    } else {
      alert("Files are not supported");
    }
    console.log(arrCoupn)
  }
  var hundleCpn = function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (e.target.dataset.target === "jeux") {
        console.log(e.target)
        Store.ShowData('categories?title=Jeux', function (obj) {
          console.log(obj[0])
          //UICoup.generateCard('.couponChoiceCat', obj[0])
          //document.querySelector('.couponChoiceCat').insertAdjacentHTML('afterbegin', form)

        })
      }

      //document.querySelector('.couponChoiceCat').innerHTML = '';


      //UICoup.closeCat(item, cat, couponAddContent)
      // Store.ShowData('categories?name=jeux', function (obj) {
      //   console.log(obj)
      //   var form = UICoup.generateSelectProd(obj)
      //   document.querySelector('.add-jeux .card-body').insertAdjacentHTML('afterbegin', form)

      // })




      //UICoup.showRecap(cat, couponAddContent)
      //var infoCoupon = UICoup.showRecap(cat, couponAddContent)
      //console.log('infoCoupon: ', infoCoupon)
      /*var addBtnCoupon = couponAddContent.querySelector('.add-btn-coupon')
      addBtnCoupon.addEventListener('click', function (e) {
        e.preventDefault()
        var obj = infoCoupon[0]
        Store.AddData('coupons', obj, function (t) {

          console.log(t)
        })
      })*/



      e.stopPropagation()
    }, false)
  }
  //see the link above to see where the variable fileTobeRead comes from.
  var setupEvents = function () {
    console.log('started')
    var btnsAddCoupon = document.querySelectorAll('.addCoupon')
    var couponAddContent = document.querySelector('.couponAddContent')
    console.log(btnsAddCoupon)
    btnsAddCoupon.forEach(function (el) {
      el.addEventListener('click', () => {
        console.log(el)
      })
    })
  }
  return {
    init: function () {
      var data = CouponCtrl.getData(function (obj) {
        obj.forEach(function (el) {
          UICoup.generateCard('.couponChoiceCat', el)

        })
        setupEvents()
      })

      console.log('init')

    }
  }
})(UICoupon, CouponController, Store)



window.onload = CoupnCenter.init()
