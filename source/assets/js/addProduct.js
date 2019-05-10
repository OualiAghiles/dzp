var AddProducts = (function () {


  return {
    addData: function (data) {
      Store.AddData('products', data, function (obj) {
        console.log(obj)
      })
    }
  }

})()





var UIAddProductsController = (function () {
  var DomElements = {
    InputAddProd: '.prodAdd',
    InputAddName: '.prodTitle',
    InputAddRef: '.prodRef',
    InputAddImg: '.prodImg',
    InputAddCat: '.prodCat',
    InputAddDesc: '.proddesc',
    inputMulty: '.prodMulty',
    btnAdd: '.prodAdd',
    btnShow: '.prodShow',
    card: '.cardProd',
  }
  return {
    generateCard: function (content, obj) {
      var addDetails = function (title, value) {
        var template = `<hr />
                        <p class="card-text">
                          <span class="mr-3">${title}:</span>
                          <span><code>${value}</code></span>
                        </p>`
      }
      var html = `<div class="card">
                  <img class="card-img-top" src="${obj.img}" alt="${obj.title}" />
                  <div class="card-body text-center">
                    <h4 class="card-title cat__title">${obj.title}</h4>
                    ${addDetails('Ref:', obj.ref)}
                    ${addDetails('Ref:', obj.cat)}
                    ${addDetails('Ref:', obj.type)}
                    <p class="card-text cat__desc">
                    <h5> Description :</h5>
                    <span>${obj.desc}</span>
                    </p>
                  </div>
                </div>`
      var cont = document.querySelector(content)
      cont.innerHTML = ''
      cont.insertAdjacentHTML('beforeend', html)

    },
    getDomString: function (DomElements) {
      var content, title, img, labels, desc;
      content = document.querySelector(DomElements.card)
      title = document.querySelector(DomElements.InputAddName).value
      ref = document.querySelector(DomElements.InputAddRef).value
      img = document.querySelector(DomElements.InputAddImg).value
      cat = document.querySelector(DomElements.InputAddCat).value
      desc = document.querySelector(DomElements.InputAddDesc).value
      multi = document.querySelector(DomElements.inputMulty).value
      return {
        "title": title,
        "img": img,
        "ref": ref,
        "desc": desc,
        "cat": cat,
        "multi": multi
      }

    },
    getDOMEls: function () {
      return DomElements
    }
  }

})()

var AddProductsController = (function (UIprod, AddProd, Store) {
  var dom = UIprod.getDOMEls()

  var setupEvents = function () {
    var btnAdd = document.querySelector(`${dom.btnAdd}`)
    var btnprev = document.querySelector(`${dom.btnShow}`)

    btnAdd.addEventListener('click', function (e) {
      e.preventDefault()
      var obj = UIprod.getDomString(dom)
      AddProd.addData(obj)
      console.log(UIprod.getDomString(dom))
      document.querySelector(dom.InputAddName).value = ""
      document.querySelector(dom.InputAddRef).value = ""
      document.querySelector(dom.InputAddImg).value = ""
      document.querySelector(dom.InputAddCat).value = ""
      document.querySelector(dom.InputAddDesc).value = ""
      document.querySelector(dom.inputMulty).value = ""
      console.log(UIprod.getDomString(dom))

    })
    btnprev.addEventListener('click', function (e) {
      e.preventDefault()
      var obj = UIprod.getDomString(dom)

      UIprod.generateCard(dom.card, obj)
      console.log(UIprod.getDomString(dom))

    })
  }

  return {
    init: function () {
      console.log("init")
      setupEvents()

    }
  }
})(UIAddProductsController, AddProducts, Store)


AddProductsController.init()
