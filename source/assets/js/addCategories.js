var AddCategories = (function () {


  return {
    addData: function (data) {
      Store.AddData('categories', data, function (obj) {
        console.log(obj)
      })
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
        "labels": labels,
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
      e.preventDefault()
      var obj = UIcat.getDomString(dom)
      AddCat.addData(obj)
      console.log(UIcat.getDomString(dom))

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
