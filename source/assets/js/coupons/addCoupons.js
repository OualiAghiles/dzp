/* ********
 *
 * Coupons Plugin
 *
 * **********
 * */
var CouponController = (function () {

    var Coupon = function (
      cat,
      produitRef,
      source,
      montant,
      devise,
      prixAchat,
      prixVente,
      codeCoupon,
      date,
      valide) {
        this.cat = cat
        this.produitRef = produitRef
        this.source = source
        this.montant = montant
        this.devise = devise
        this.prixAchat = prixAchat
        this.prixVente = prixVente
        this.codeCoupon = codeCoupon
        this.date = date
        this.valid = valide
    }

  return {
    getData: function (cb) {
      var elems;
      Store.ShowData("categories", function (obj) {
        elems = obj
        cb(elems)
      })
    },
    addCoupon: function (cat, produitRef, source, montant, devise, prixAchat, prixVente, codeCoupon, date, valide) {
      var newCoup = new Coupon(cat,
        produitRef,
        source,
        montant,
        devise,
        prixAchat,
        prixVente,
        codeCoupon,
        date,
        valide)
            console.log(newCoup)

        return newCoup
    }
  }

})()

var UICoupon = (function () {
  var DOMstrings = {
    addModal: '.add-coupons'
  }
  var showRecapAddCoupModal = function (modalId, obj) {
    var info = obj
    // Logout Modal
    var insertInfo = function (tab) {
      var list = ''
      tab.forEach(function (el) {
        var html = `<tr>
                      <td>${el.cat}</td>
                      <td>${el.produitRef}</td>
                      <td>${el.source}</td>
                      <td>${el.montant}</td>
                      <td>${el.devise}</td>
                      <td>${el.prixAchat}</td>
                      <td>${el.prixVente}</td>
                      <td>${el.codeCoupon}</td>
                      </tr>`
        list = list + html
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
                    ${insertInfo(info)}

                  </tbody>
                </table>`
    var modal = document.querySelector(`${modalId} .modal-body`)
    modal.innerHTML = ""
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
    /**
     *
     * @param {*} content
     * @param {*} obj
     */
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
    /**
     *
     * @param {*} obj
     */
    generateInputs: function (obj) {
      var html = `<div class="form-group col-md-4">
                    <label for="${obj.id}">${obj.label}</label>
                    <input id = "${obj.id}"
                    class = "form-control ${obj.cls}"
                    type = "${obj.type}",
                    aria-describedby = '${obj.desc}'
                    value = "${obj.val}"
                    placeholder = "${obj.placeH}"
                    required = "required">
                    <div class = "valid-feedback" >
                      Looks good!
                      </div>
                    <div class = "invalid-feedback" >
                      Please choose a username.. </div>
                  </div>`
      return html
    },
    /**
     *
     * @param {*} obj
     * @returns htmlElement
     */
    generateInputFile: function (obj) {
      var html = `<div class="custom-file col-md-4">

                    <input id = "${obj.id}"
                    class = "custom-file-input ${obj.cls}"
                    type = "${obj.type}",
                    aria-describedby = '${obj.desc}'
                    value = "${obj.val}"
                    placeholder = "${obj.placeH}"
                    required >
                    <label class="custom-file-label" for="${obj.id}">${obj.label}</label>
                  </div>`
      return html
    },
    /**
     *
     * @param {*} arr
     */
    generateSelectProd: function (arr) {
      var addSelect = function (array) {
        var result = ''
        array.forEach(function (el) {
          var templ = `<div
                        class="custom-control custom-radio custom-control-inline" >
                        <input
                          class="custom-control-input"
                          id="${el.ref}"
                          type="radio"
                          name= "${el.cat}"
                          data-multi= "${el.multi}"
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
      var html = `<div class="selected--product">
                    ${addSelect(arr)}
                  </div>`
      return html
    },
    /**
     *
     * @param {*} cls
     * @param {*} name
     * @param {*} id
     */
    generateTabs: function (cls, name, id) {
      var menu = `<h3 class="card-title">Veuiller remplire les informations</h3><ul class="nav nav-tabs" id="${name}-nav" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active"
                        id="one-tab"
                        data-toggle="tab"
                        href="#one"
                        role="tab"
                        aria-controls="one"
                        aria-selected="true">
                        Unique</a>
                      </li>
                    <li class="nav-item">
                      <a
                      class="nav-link"
                      id="multi-tab"
                      data-toggle="tab"
                      href="#multi"
                      role="tab"
                      aria-controls="multi"
                      aria-selected="false">
                      Multiple</a>
                    </li>
                    </ul>`
      var content = `<div class="tab-content" id="${name}-content">
                        <div
                          class="card tab-pane fade show active border-top-0"
                          id="one"
                          role="tabpanel"
                          aria-labelledby="one-tab">
                          <div class="card-body">${UICoupon.generateForm(name, id, false)}</div>
                        </div>
                        <div class="card tab-pane fade"
                            id="multi"
                            role="tabpanel"
                            aria-labelledby="multi-tab">
                            <div class="card-body">${UICoupon.generateForm(name, id+ '-multi', true)}</div>
                        </div>
                      </div>`
      var el = document.querySelector(cls)
      el.insertAdjacentHTML('beforeend', menu)
      el.insertAdjacentHTML('beforeend', content)
    },
    generateModal: function (id) {
      var html = `<div
                    class="modal fade" id="${id}"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="Recap" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Recap</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                      </div>
                      <div class="modal-body"></div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-success add-btn-coupon" data-dismiss="modal" href="#">Save</a>
                      </div>
                    </div>
                  </div>
                </div>`
      return html
    },
    /**
     *
     * @param {*} addBtn
     * @param {*} cat
     * @param {*} container
     */
    closeCat: function () {
      var btn = document.querySelector('.action')

      var close = function () {
        console.log('close')
        document.querySelector('.couponChoiceCat').innerHTML = ""
        CoupnCenter.init()

      }
      btn.addEventListener('click', close)
    },
    /**
     *
     * @param {*} cat
     * @param {*} content
     */
    showRecap: function (target, content, cat, file) {

      var showAction = content.querySelector(`[data-target="${target}"]`)
      var el = cat
      console.log(el)
      var data = []
      showAction.addEventListener('click', function (event) {
        var radios = content.querySelectorAll(`.products .selected--product input`)
        var activeTab = content.querySelector(`#${el}-content .active`)
        var montant = ''
        var devise = ''
        var codeCoupon
        var cat, produit;
        var source = content.querySelector(`#${el}-content .active .sourceCoupon`)
        var prixAchat = content.querySelector(`#${el}-content .active .prixAchat`)
        var prixVente = content.querySelector(`#${el}-content .active .prixVente`)
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            cat = radios[i].getAttribute('name')
            produit = radios[i].getAttribute('id')
          }
        }
        if (activeTab.id !== "multi") {
          console.log('remove some inputs value')
          var montant = content.querySelector(`#${el}-content .active .montantCoupon`).value
          devise = content.querySelector(`#${el}-content .active .devise`)
          devise = devise.options[devise.selectedIndex].value
          codeCoupon = content.querySelector(`#${el}-content .active .codeCoupon`)

          var couponObj = CouponController.addCoupon(
            cat,
            produit,
            source.value,
            montant,
            devise,
            parseInt(prixAchat.value) * parseInt(montant),
            parseInt(prixVente.value) * parseInt(montant),
            codeCoupon.value,
            todayDate(),
            true
          )
          data.push(couponObj)

        } else {
          var codeCoupon = content.querySelector(`#${el}-content .active .codeCouponMulti`)
          console.log(file)
          file.forEach(function (el) {
            var cp = Object.assign(el, {
              cat: cat,
              produitRef: produit,
              source: source.value,
              prixAchat: parseInt(prixAchat.value) * parseInt(el.montant),
              prixVente: parseInt(prixVente.value) * parseInt(el.montant),
              date: todayDate(),
              valide: true

            })
            console.log(cp)
            data.push(cp)
          })

        }

        var form = document.querySelector('.active .needs-validation');
        //Loop over them and prevent submission
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          console.log('form', form)
        }
        form.classList.add('was-validated');
        document.querySelector(`${target} .modal-body`).innerHTML = ''
        showRecapAddCoupModal(target, data)
        source.value = ''
        devise = ""
        montant = ""
        codeCoupon.value = ""
        return data
      })
      //
      var addBtnCoupon = document.querySelector('.add-btn-coupon')
      addBtnCoupon.addEventListener('click', function (e) {
        debugger
        e.preventDefault()
        var obj = data
        obj.forEach(function (el) {
          Store.AddData('coupons', el, function (t) {

          })
        })
        console.log(obj)
      })
      data = []

    },
    /**
     *
     * @param {*} cat
     * @param {*} ref
     * @param {*} multi
     */
    generateForm: function (cat, ref, multi) {
      var html = `<form class='needs-validation' novalidate>
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
                      ${!multi ? UICoupon.generateInputs({
                        id: cat+'-montant-'+ref,
                        cls: "montantCoupon",
                        type: "number",
                        desc: '',
                        val: "",
                        label: "Montant",
                        placeH: "Indiquer la montant"
                      }):''}
                      ${!multi ?UICoupon.generateListInput(
                        'devise',
                        "Devise",
                        cat+'-devise-'+ref,
                        "Default value",
                        [
                          {val:"dollar",
                          label:"$"},
                          {val:"euro",
                          label:"€"}
                        ]):""}
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
                      ${!multi?UICoupon.generateInputs({
                        id: cat+'-codeCoupon-'+ref,
                        cls: "codeCoupon",
                        type: "text",
                        desc: '',
                        val: "",
                        label: "Code",
                        placeH: "Indiquer le code a ajouter"
                        }): UICoupon.generateInputFile({
                          id: cat + '-codeCoupon-' + ref,
                          cls: "codeCouponMulti",
                          type: "file",
                          desc: '',
                          val: "",
                          label: "Selectionner le fichier",
                          placeH: "Indiquer le code a ajouter"
                        })
                        }
                    </div>
                  </form>`
      return html
    },
    /**
     *
     * @param {*} cls
     * @param {*} val
     * @param {*} id
     * @param {*} label
     * @param {*} arr
     */
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
    },
    readFile: function () {
      var input = document.querySelector('.codeCouponMulti')
      var tab = []
      input.addEventListener('change', function (e) {
        console.log(input.files[0])
        var reader = new FileReader()
        reader.onload = function () {
          var lines = reader.result.split('\n')

          var devise = ''
          lines.forEach(function (el) {
            var t = el.replace(',', '')
            t = t.replace(' ', '')
            if (t.indexOf('$') !== -1) {
              t = t.replace('$', '')
              devise = "dollar"
            }
            if (t.indexOf('€') !== -1) {
              t = t.replace('€', '')
              devise = "euro"
            }
            t = t.split(':')
            var data = {
              devise: devise,
              montant: t[0],
              codeCoupon: t[1]
            }
            if (data.codeCoupon !== undefined) {

              tab.push(data)
            }
          })
          return tab
        }
        reader.readAsText(input.files[0])
      }, false)
      return tab
    },
    handelSelectProd: function (cls, multi) {
      var products = document.querySelectorAll('.selected--product input')
      products.forEach((el) => {
        el.addEventListener('click', function (e) {
          var prodForm = document.querySelector(cls)
          var templ = `<hr />
                      <div class="action text-right">
                        <button
                          class="btn btn-primary showRecap"
                          type="submit" role="button"
                          data-toggle="modal"
                          data-target="#${el.id}-modal" > Voir le resumé </button>
                        <button
                          class="btn btn-success"
                          type="button"
                          role="button">Sauvegarder</button>
                      </div>`



          console.log(el.dataset.multi)
          if (el.dataset.multi === "true") {
            prodForm.innerHTML = ''
            UICoupon.generateTabs(cls, el.name, el.id, multi)
            var file = UICoupon.readFile()
            console.log('file:', file)
            var modal = UICoupon.generateModal(`${el.id}-modal`)
            prodForm.insertAdjacentHTML('beforeend', templ)
            prodForm.insertAdjacentHTML('beforeend', modal)
            UICoupon.showRecap(`#${el.id}-modal`, prodForm.parentNode, el.name, file)


          } else {
            var form = UICoupon.generateForm(el.name, el.id)
            var container = `<div id="${el.name}-content">
                              <div class='active'>
                              <h3 class = "card-title" > Veuiller remplire les informations </h3>
                                ${form}
                              </div>
                            </div>`

            prodForm.innerHTML = ''
            prodForm.insertAdjacentHTML('beforeend', container)
            var modal = UICoupon.generateModal(`${el.id}-modal`)
            prodForm.insertAdjacentHTML('beforeend', templ)
            prodForm.insertAdjacentHTML('beforeend', modal)
            UICoupon.showRecap(`#${el.id}-modal`, prodForm.parentNode, el.name)

          }

          //var bodyModal = document.querySelector('.modal-body')


        })
      })

    },
    generateMain: function () {
      var main = document.querySelector('.couponChoiceCat')
        main.innerHTML = '';
        var content = `<div class="couponAddContent col-md-9">
                          <div class="card">
                            <div class="card-body">
                              <h3 class="card-title">Veuiller choisire un produit
                                <a href="#" data-action= "initCoup" class="action">
                                  <i class="fas fa-times"></i>
                                </a>
                              </h3>
                              <div class="products"></div>
                              <div class="products-form"></div>

                            </div>
                          </div>
                        </div>`
        main.insertAdjacentHTML('beforeend', content)

    }
  }
})()

var CoupnCenter = (function (UICoup, CouponCtrl, Store) {

  var genCouponCenter = function (el) {
    UICoup.generateMain()
    var cat = el.dataset.target.charAt(0).toUpperCase() + el.dataset.target.slice(1)
    console.log(cat)
    Store.ShowData('products?cat=' + cat, function (obj) {
      var products = UICoup.generateSelectProd(obj)
      console.log(obj)
      document.querySelector('.couponAddContent .products').insertAdjacentHTML('beforeend', products + '<hr>')
      UICoup.handelSelectProd('.couponAddContent .products-form')
      UICoup.closeCat()
    })
    Store.ShowData('categories?title=' + cat, function (obj) {
      UICoup.generateCard('.couponChoiceCat', obj[0])
    })
  }
  //see the link above to see where the variable fileTobeRead comes from.
  var setupEvents = function () {
    var btnsAddCoupon = document.querySelectorAll('.addCoupon')
    /**
     *
     * @param {*} cls
     * @param {*} multi
     */
    btnsAddCoupon.forEach(function (el) {
      el.addEventListener('click', (e) => {
        genCouponCenter(el)
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
