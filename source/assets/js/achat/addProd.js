/**
 * after clicking btn to add new product
 * Steps:
 * - show block html to choose product
 * - get the ref of the choosed product
 * - Regenerate option on select price
 * - create a new table to get coupon's product
 * - relate btn add coupon with the new table
 * - add remove table
 */

/**
 * display block to show list of products to add new prodoct to th cart
 * init setup to add product
 */

function addProduct() {
  // TODO: to rework
  // just exemple in case the display is none
  var box = document.querySelector('.boxProducts')
  box.classList.remove('none')
  initProduct(box)
}

/**
 * init event on all elements of the box
 * @param {HTMLElement} box Container where products are
 */
/**
 *
 * @param box
 */
function initProduct(box) {
  var products = box.querySelectorAll('.choosedProd')
  products.forEach(el => {
    el.addEventListener('click', function () {
      var ref = this.dataset.ref
      box.classList.add('none')
      addTable(ref)
      changeRef(ref)
    })
  })
}

/**
 * fuction to add new table on modal to store several coupons
 * @param {String} ref
 */
function addTable(ref) {
  var template = `<table class="table" data-ref="${red}">
  <thead>
    <tr>
      <th scope="col">Value</th>
      <th scope="col">Qts</th>
      <th scope="col">PriceDzd</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`


  // TODO: add the right class
  var tables = document.querySelector('.add_the_right_class')
  tables.insertAdjacentHTML('afterbegin', template)


  // TODO: add btn to remove table and title
  var el = document.querySelector('.add_the_right_class')
  removeTable(el)
}

function removeTable(el) {
  el.addEventListener('click', function () {
    var target = this.dataset.target
    var table = document.querySelector(`table[data-ref="${target}"]`)
    table.parentNode.removeChild(table)
  })
}

/**
 * change the ref of the product to separate all products
 * @param {String} ref
 */

function changeRef(ref) {
  // TODO: change the class targets
  var form = document.querySelector('.add_the_right_class')
  form.setAttribute('data-ref', ref)
  changeOptions(ref)

}

/**
 * change options on select relatively to the product selected
 * @param {Strin} ref
 */
function changeOptions(ref) {

  // call existing function

}

// ----------------------------------------------------------------------------------------- //

/**
 * init add product Btn
 */
// var addProductBtn = document.querySelector('.addProd')
// addProductBtn.addEventListener('click', function () {
//   addProduct()
// })

