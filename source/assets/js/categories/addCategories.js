var AddCategories = (function () {


  return {
    addData: function (data) {
      Store.AddData('categories', data)
    }
  }

})()





var UIAddCatController = (function () {
  var DomElements = {
    InputAddCat: '.addCategory',
    InputAddName: '.catTitle',
    InputAddTags: '.catLabel',
    InputAddImg: '.catImg',
    InputAddDesc: '.catdesc',
    btnAdd: '.catAdd',
    btnShow: '.catShow',
    card: '.cardCat',
  }
  return {
    generateCard: function (content, obj) {
      //var tags = [...obj.labels.split(' - ')]
      //console.log('tags: ', tags)
      var addTags = function (arr) {
        var els = ''
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i];
          var h = `<code>${el}</code>`
          els = els + h + ' / '
        }
        return els
      }
      var html = `<div class="card">
                  <img class="card-img-top" src="${obj.img}" alt="${obj.title}" />
                  <div class="card-body text-center">
                    <h4 class="card-title cat__title">${obj.title}</h4>
                    <p class="card-text cat__desc">${obj.desc}</p>
                    <p class="card-text cat__tags">
                    ${addTags(obj.labels)}
                    </p>
                    <a class="btn btn-outline-secondary" href="#" data-target="${obj.title.toLowerCase()}">Ajouter des coupons</a>
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
      img = document.querySelector(DomElements.InputAddImg).value
      labels = document.querySelector(DomElements.InputAddTags).value
      desc = document.querySelector(DomElements.InputAddDesc).value
      return {
        "title": title,
        "img": img,
        "labels": labels.split(' - '),
        "desc": desc
      }

    },
    getDOMEls: function () {
      return DomElements
    }
  }

})()

var AddCatController = (function (UIcat, AddCat, Store) {
  var dom = UIcat.getDOMEls()

  var setupEvents = function () {
    var btnAdd = document.querySelector(`${dom.btnAdd}`)
    var btnprev = document.querySelector(`${dom.btnShow}`)


    btnAdd.addEventListener('click', function (e) {
      var obj = UIcat.getDomString(dom)
      e.preventDefault()
      AddCat.addData(obj)
      document.querySelector(dom.InputAddName).value = ''
      document.querySelector(dom.InputAddImg).value = ''
      document.querySelector(dom.InputAddTags).value = ''
      document.querySelector(dom.InputAddDesc).value = ''

    })
    btnprev.addEventListener('click', function (e) {
      var obj = UIcat.getDomString(dom)
      e.preventDefault()
      console.log(obj)

      UIcat.generateCard('.cardCat', obj)

    })
  }

  return {
    init: function () {
      console.log("init")
      setupEvents()

    }
  }
})(UIAddCatController, AddCategories, Store)


AddCatController.init()
