var GestProducts = (function () {


  return {
    addData: function (data) {
      Store.AddData('products', data, function (obj) {
        console.log(obj)
      })
    },
    getData: function (cb) {
      var elems;
      Store.ShowData("products", function (obj) {
        elems = obj
        cb(elems)
      })
    },
    getCats: function (cb) {
      var elems;
      Store.ShowData("categories", function (obj) {
        elems = obj
        cb(elems)
      })
    }
  }

})()
var UIGestProducts = (function () {



  return {
    generateCard: function (content, obj) {
      var addDetails = function (title, value) {
        var template = `<hr />
                        <p class="card-text">
                          <span class="mr-3">${title}:</span>
                          <span><code>${value}</code></span>
                        </p>`
        return template
      }
      var html = `<div class="card">
                  <img class="card-img-top" src="${obj.img}" alt="${obj.title}" />
                  <div class="card-body ">
                    <h4 class = "card-title cat__title text-center"> ${obj.title}</h4>
                    ${addDetails('Ref', obj.ref)}
                    ${addDetails('Categorie', obj.cat)}
                    ${addDetails('Mutli-ajout', obj.multi)}
                    <p class="card-text cat__desc">
                    <h5> Description :</h5>
                    <span>${obj.desc}</span>
                    </p>
                  </div>
                </div>`
      var cont = document.querySelector(content)

      cont.insertAdjacentHTML('beforeend', html)
      console.log('added')
      console.log(html)
    },
    gereratCards: function (obj) {
      data = obj

      var html = `<div class="col-md-3 mb-3 ">
                    <a data-toggle="modal" data-target="#${data.ref}" href='#' class="media editProduct bg-white shadow-sm p-3">
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
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-9">
                            <div class="card">
                              <div class="card-body">
                                <div class="card-title">
                                initForm
                                </div>
</div>
                            </div>
                          </div>
                          <div class="col-3">
                        </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-success updateProduct" data-dismiss="modal" href="#">Save</a>
                      </div>
                    </div>
                  </div>
                </div>`
      return html
    },
    /**
     *
     * @param {*} obj
     */
    generateInputs: function (obj) {
      var html = `<div class="form-group col-md-6">
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
     * @param {*} cat
     * @param {*} ref
     * @param {*} multi
     */
    generateForm: function (cat, ref) {
      /*[
        filterProd[0].title,
        filterProd[0].img,
        filterProd[0].ref,
        filterProd[0].desc,
        filterProd[0].cat,
        filterProd[0].multi,
        filterProd[0].id
      ]*/
      var html = `<form class='needs-validation' novalidate>
                    <div class="form-row">
                      ${UIGestProducts.generateInputs({
        id: cat+'-title-'+ref,
        cls: "producTtitle",
        type: "text",
        val: "",
        label: "Nom du produit",
        placeH: "Nom du produit"
      })}
                      ${UIGestProducts.generateInputs({
        id: cat+'-img-'+ref,
        cls: "producImg",
        type: "text",
        val: "",
        label: "Image du produit",
        placeH: "http://....jpg"
      })}
                      ${UIGestProducts.generateInputs({
        id: cat+'-ref-'+ref,
        cls: "producRef",
        type: "text",
        val: "",
        label: "Referance du produit",
        placeH: "PSN"
      })}

                      ${UIGestProducts.generateListInput(
        'categorie',
        "Categorie",
        cat+'-cat-'+ref,
        "Default value",
        [])}

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
                    <select id="${id}" class=" prodCat custom-select ${cls}">
                      <option value="">${label}</option>
                      ${options(arr)}
                    </select>
                  </div>`
      return html
    },
    generateCats: function () {
      var cats = document.querySelector('.prodCat')
      GestProducts.getCats(function (obj) {
        obj.forEach(el => {
          var t = el.title.toLowerCase()
          cats.insertAdjacentHTML('beforeend', `<option value = "${el.title.toLowerCase()}"> ${t} </option>`)
          console.log(t)
        });
      })

    }
  }


})()
window.onload = function () {
  var handleLoopClickEvent = function (cls, cb) {
    var els = document.querySelectorAll(cls)
    els.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault()
        return cb(el)
      })

    }, false)
  }
  var container = document.querySelector('.gestProducts')
  GestProducts.getData(function (obj) {
    console.log(obj)
    obj.forEach(function (el) {
      var card = UIGestProducts.gereratCards(el)
      container.insertAdjacentHTML('beforeend', card)
    })
    handleLoopClickEvent('.editProduct', function (el) {
      var target = el.dataset.target
      target = target.substr(1, target.length)
      var modal = container.querySelector('.modal')
      var modalHtml = Utils.generateModal(target,target)
      if (modal) {
        modal.parentNode.removeChild(modal)
        container.insertAdjacentHTML('afterbegin', modalHtml)

      } else {
        container.insertAdjacentHTML('afterbegin', modalHtml)
      }
      var test = container.querySelector('.modal-body ')

      var filterProd = obj.filter(function (ref) {
        return ref.ref == target
      })
      test.innerHTML = ``
      //var form = UIGestProducts.generateForm(filterProd[0].cat, filterProd[0].ref)
      var cats = obj.map(el => el.cat)
      var categories = (names) => names.filter((v,i) => names.indexOf(v) === i)
      console.log('hdy',categories(cats))
      var form = `
                          <div class="col-9 editForm">
                          <div class="card">
                              <div class="card-header"><h6>Form</h6></div>
                              <div class="card-body">
                              <form class="form">
                                <div class="form-row">
                              ${Utils.generateInputs(6,{id: filterProd[0].ref+"-name", label: "Nom du produit", type: 'text', cls: filterProd[0].ref+"-name",placeH:"",val:filterProd[0].title})}
                              ${Utils.generateInputs(6,{id: filterProd[0].ref+"-img", label: "Lien vers l'image", type: 'text', cls: filterProd[0].ref+"-img",placeH:"",val:filterProd[0].img })}
                              ${Utils.generateListInput(6,
                                                        'Categories',
                                                        "cats",
                                                        filterProd[0].ref+'-cats',
                                                        "Default value",
        categories(cats), false)}                   
                              ${Utils.generateInputs(6,{id: filterProd[0].ref+"-ref", label: "Nom de la ref", type: 'text', cls: filterProd[0].ref+"-ref",placeH:"",val:filterProd[0].ref})}
                              ${Utils.generateTextarea(6,{id: filterProd[0].ref+"-desc", label: "Description de la catégorie", cls: filterProd[0].ref+"-desc",placeH:"",val: filterProd[0].desc})}
                              ${Utils.generateToggle(6,{title:"Type d'ajout",id: filterProd[0].ref+"-multi", label: "Activer Multi ajout", cls: filterProd[0].ref+"-multi",multi: filterProd[0].multi})}
</div></form>
</div>
                            </div>
                            </div>`
      test.innerHTML = form
      var checkedMulti = document.querySelector(`#${filterProd[0].ref+"-multi"}`)
      

      checkedMulti.checked = filterProd[0].multi
      //$(`#${target} #${filterProd[0].ref+'-cats'}`).select2();
      //document.querySelector(".select2").style.width = '100%'
      $(document).ready(function() {
        $(`#${target} #${filterProd[0].ref + '-cats'}`).select2({
          dropdownParent: $(`#${target} `)
        });
        document.querySelector(".select2").style.width = '100%'
      })


    })

  })
  //p(products)
}
