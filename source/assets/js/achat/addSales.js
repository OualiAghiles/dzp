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


          nbrCoupon.addEventListener('change', function (e) {
            var oldval = 0
            // if (parseFloat(amoutUI.innerHTML) % parseFloat(e.target.value) !== 0) {
            //   var mod = parseFloat(amoutUI.innerHTML) % parseFloat(e.target.value)
            //   var nbrCoupon = (parseFloat(amoutUI.innerHTML) - mod) / parseFloat(e.target.value)
            // }
            //console.log(e, prixCoupon.value)
            const initialAmout = amout.value
            var mod = parseFloat(initialAmout) % parseFloat(prixCoupon.value)
            var nbrCpn = (parseFloat(initialAmout) - mod) / parseFloat(prixCoupon.value)
            nbrCoupon.setAttribute("max", nbrCpn)
            console.log(parseFloat(amoutUI.innerHTML) - parseFloat(prixCoupon.value))

            amoutUI.innerHTML = parseFloat(initialAmout) - (parseFloat(prixCoupon.value * e.target.valueAsNumber))

            console.log(initialAmout)
            console.log(parseFloat(prixCoupon.value * e.target.valueAsNumber));
            totalCostCoupon.innerHTML = parseFloat(prixCoupon.value * e.target.valueAsNumber)
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
