var GestCats = (function () {
  var cat = function (
    title,
    img,
    labels,
    desc,
    id) {
    this.title = title,
      this.img = img,
      this.labels = labels,
      this.desc = desc,
      this.id = id
  }
  return {
    newCat: function (obj) {
      var t = new cat(obj.title,
        obj.img,
        obj.labels,
        obj.desc,
        obj.id)
      return t
    }
  }
})()


var UIGestCatsController = (function () {
  return {
    generateRows: function (obj) {
      var addTags = function (arr) {
        var els = '';
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i];
          var h = `<code>${el}</code>`;
          els = els + h + ' / '
        }
        return els
      };
      var html = `<tr>
                        <td>${obj.title}</td>
                        <td>${addTags(obj.labels)}</td>
                        <td>${obj.desc}</td>
                        <td><div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                          <button type="button" data-toggle="modal" data-target="#${obj.title}" class="btn btn-success btnShow">

                          <i class="fas fa-eye"></i>

                        </button>
                          <button type="button" data-toggle="modal" data-target="#${obj.title}" class="btn btn-warning btnEdit"><i class="fas fa-edit"></i></button>
                          <button type="button" class="btn btn-danger deleteCat" data-target="#${obj.title}"><i class="fas fa-trash"></i></button>
                        </div></td>
                      </tr>`;
      return html
    }
  }
})()

var GestCatsController = (function (UICats, GestCats, Store) {

  var cont = document.querySelector('.gestCats');
  var table = []
  Utils.getData('categories', function (obj) {
    var rows = ""
    obj.forEach((el) => {
      //var cat = GestCats.newCat()
      rows = rows + UICats.generateRows(el)
      table.push(el)
      return rows
    })
    var UItable = `<table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Labels</th>
                        <th scope="col">desc</th>
                        <th scope="col">actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${rows}
                  </tbody>
                </table>`;
    //var modal = Utils.generateModal(`${el.title}`,`${el.title.toLowerCase()}`)
    //
    cont.insertAdjacentHTML('beforeend', UItable);
    var modalBtns = document.querySelectorAll('[data-toggle="modal"]')
    modalBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault()
        var title = btn.dataset.target
        var target = title.substr(1, title.length)
        var modalHtml = Utils.generateModal(`${target}`, `${target}`)
        var modal = cont.querySelector('.modal')
        var indaxCat = table.findIndex(x => x.title === `${target}`)
        var cat = GestCats.newCat(table[indaxCat])
        console.log(cat)
        if (modal) {
          modal.parentNode.removeChild(modal)
          cont.insertAdjacentHTML('afterbegin', modalHtml)
        } else {
          cont.insertAdjacentHTML('afterbegin', modalHtml)
        }
        var contentModal = ''
        if (btn.classList.contains('btnEdit')) {
          var bodyModalTemplate = `
                          <div class="col-9 editForm">
                          <div class="card">
                              <div class="card-header"><h6>Form</h6></div>
                              <div class="card-body">
                              <form class="form">
                                <div class="form-row">
                              ${Utils.generateInputs(6,{id: cat.title+"-name", label: "Nom de la catégorie", type: 'text', cls: "catTitle",placeH:"",val:cat.title})}
                              ${Utils.generateInputs(6,{id: cat.title+"-img", label: "Lien vers l'image", type: 'text', cls: "catImg",placeH:"",val:cat.img })}
                              ${Utils.generateInputs(6,{id: cat.title+"-tags", label: "Nom de la catégorie", type: 'text', cls: "catTags",placeH:"",val:cat.labels})}
                              ${Utils.generateTextarea(6,{id: cat.title+"-desc", label: "Description de la catégorie", cls: "descTitle",placeH:"",val: cat.desc})}
</div></form>
</div>
                            </div>
                            </div>`
          var modalBody = cont.querySelector('.modal-body')
          modalBody.insertAdjacentHTML('beforeend', bodyModalTemplate)
          Utils.generateCard(`${title} .modal-body`, cat)
        }
        if (btn.classList.contains('btnShow')) {
          Utils.generateCard(`${title} .modal-body`, cat)
          Utils.getData(`products?cat=${target.toLowerCase()}`, function (obj) {
            console.log(obj)
            var products = cont.querySelector('.modal-body')
            products.insertAdjacentHTML('beforeend', `<div class="products col-md-9">
              <h3 class="card-title"> Produit afilié<hr></h3>
              <div class="row">
              </div>
              </div>`)
            obj.forEach(function (el) {
              var total = [];
              Utils.getData(`coupons?produitRef=${el.ref}`, function (obj) {
                var vendu = obj.filter(statut => statut.valide === false).length
                console.log(vendu)
                total = obj.length
                products.querySelector('.products .row').insertAdjacentHTML('beforeend', Utils.gereratProductCards(el, total, vendu))
              })

            })
          })
        }
        var initSuccess = function () {
          var btn = document.querySelector('.alertSuccess')
          btn.addEventListener('click', function () {
            var getInputs = {
              name: document.querySelector(`#${cat.title}-name`).value,
              img: document.querySelector(`#${cat.title}-img`).value,
              tags: document.querySelector(`#${cat.title}-tags`).value,
              desc: document.querySelector(`#${cat.title}-desc`).value
            }
            var data = Object.assign(cat, getInputs)

            Utils.updateData("categories", cat.id, data, function (obj) {

              console.log(obj)
            })
            //e.preventDefault()
            Swal.fire({
              type: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          })
        }
        initSuccess()
      }, false)
    })
    var dels = document.querySelectorAll('.deleteCat')
    dels.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.target.substr(1, btn.dataset.target.length)
        var indaxCat = table.findIndex(x => x.title === `${target}`)
        var cat = table[indaxCat]
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#18d6b5',
          cancelButtonColor: '#d63031',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        Utils.delData('categories', cat.id, function (obj) {
          console.log(obj)
        })
      })
    })

  })


})(UIGestCatsController, GestCats, Store)
