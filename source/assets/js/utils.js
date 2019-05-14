var Utils = (function() {
  return {
    getData: function (rout, cb) {
      var elems;
      Store.ShowData(rout, function (obj) {
        elems = obj
        cb(elems)
      })

    },
    addData: function (data) {
      Store.AddData('products', data, function (obj) {
        console.log(obj)
      })
    },
    updateData: function (rout,id, obj, cb) {
      Store.UpdateData(rout, id, obj, function(obj) {
        return cb(obj)
      })
    },

    /**
     *
     * @returns {string}
     */
    todayDate: function () {
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

    },
    /**
     *
     * @param content
     * @param obj
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
     * @param size
     * @param obj
     * @returns {string}
     */
    generateInputs: function (size, obj) {
      var html = `<div class="form-group col-md-${size}">
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
    /**
     *
     * @param id
     * @returns {string}
     */
    generateModal: function (title, id) {
      var html = `<div
                    class="modal fade" id="${id}"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="${title}" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
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
     * @param size
     * @param cls
     * @param val
     * @param id
     * @param label
     * @param arr
     * @returns {string}
     */
    generateListInput: function (size, cls, val, id, label, arr) {
      var options = function (tab) {
        var el;
        tab.forEach(function (opt) {
          var h = `<option value = '${opt.val}'>${opt.label}</option>`
          el = el + h
        })
        return el
      }
      var html = `<div class="form-group col-md-${size}">
                    <label for="${id}">${val}</label>
                    <select id="${id}" class=" custom-select ${cls}">
                      ${options(arr)}
                    </select>
                  </div>`
      return html
    },
    /**
     *
     */
    generateCats: function (cls, obj) {
      var cats = document.querySelector(cls)
      obj.forEach(el => {
        var t = el.title.toLowerCase()
        cats.insertAdjacentHTML('beforeend', `<option value = "${el.title.toLowerCase()}"> ${t} </option>`)
        console.log(t)
      });

    }
  }
})()
