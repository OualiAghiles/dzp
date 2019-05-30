var Sales = (function () {
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

  window.onload = () => {

    Utils.getData('products', (obj) => {
      document.querySelector('.toSelect').insertAdjacentHTML('beforeend', generateSelectProd(obj))
      var products = document.querySelectorAll('.selected--product input')
      products.forEach(cat => {
        cat.addEventListener('click', function () {
          var block = document.querySelector('.formSales')
          var tittle = document.querySelector('.selectedProd')
          var amout = document.querySelector('.totalAmount')
          var amoutUI = document.querySelector('.totalAmountUi')
          var prixCoupon = document.querySelector('.prixCoupon')
          var nbrCoupon = document.querySelector('.nbrCoupon')
          var totalCostCoupon = document.querySelector('.totalCostCoupon')
          block.classList.remove('d-none')
          tittle.innerHTML = `Le produit choisit (${cat.id})`
          amout.addEventListener('change', function (e) {
            amoutUI.innerHTML = e.target.valueAsNumber
          })
          var initialAmout = amout.value
          nbrCoupon.addEventListener('change', function (e) {
            var oldval = 0

            var mod = parseFloat(initialAmout) % parseFloat(prixCoupon.value)
            var nbrCpn = (parseFloat(initialAmout) - mod) / parseFloat(prixCoupon.value)
            nbrCoupon.setAttribute("max", nbrCpn)
            amoutUI.innerHTML = parseFloat(initialAmout) - (parseFloat(prixCoupon.value * e.target.valueAsNumber))
            totalCostCoupon.innerHTML = parseFloat(prixCoupon.value * e.target.valueAsNumber)
          })
          var addRow = document.querySelector('.addRow')
          addRow.addEventListener('click', function (e) {
            e.preventDefault()
            var table = document.querySelector('.tableCoupons')
            var tbody = table.querySelector('tbody')
            table.classList.remove('d-none')
            var template = `<tr>
                            <td>${prixCoupon.value}</td>
                            <td>${nbrCoupon.value}</td>
                            <td> ${ totalCostCoupon.innerHTML}</td>
                            <td>
                            <button class="btn btn-sm btn-info">edit</button>
                            <button class="btn btn-sm btn-danger">Remove</button>
                            </td>
            </tr>`
            tbody.insertAdjacentHTML('beforeend', template)
            initialAmout = amoutUI.innerHTML
          })

        })
      })
    })
    Utils.getData('coupons', (obj) => {
      var t = obj.map(el => el.montant)
      let x = (names) => names.filter((v, i) => names.indexOf(v) === i)
      let table = x(t)
      console.log(table)
    })

  }
})()
