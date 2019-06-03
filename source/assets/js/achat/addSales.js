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
  var validForm = function (event) {
    var form = document.querySelector('.needs-validation');
    //Loop over them and prevent submission
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log('form', form)
    }
    form.classList.add('was-validated');
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
        validForm(e)
        var option = prixCoupon.querySelector(`option[value="${prixCoupon.value}"]`)
        var table = document.querySelector('.tableCoupons')
        var tbody = table.querySelector('tbody')
        var totalAmount = parseFloat(prixCoupon.value) * parseFloat(nbrCoupon.value)
        var template = `<tr>
                            <td>${prixCoupon.value}</td>
                            <td>${nbrCoupon.value}</td>
                            <td> ${ totalAmount}</td>
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
    }
  }

})()



var Sales = (function (UISales) {
  var Dom = UISales.getDomEls()

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
  var handleSelectProducts = function (arr, Dom) {
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
        // add row on table
        UISales.addRows('.addRow', prixCoupon, nbrCoupon, totalCostCoupon)

      })
    })
  }
  window.onload = () => {
    Utils.getData('products', (obj) => {
      document.querySelector('.toSelect').insertAdjacentHTML('beforeend', generateSelectProd(obj))
      var products = document.querySelectorAll(Dom.slectProduct + ' input')
      handleSelectProducts(products, Dom)
    })
  }
})(UISales)
