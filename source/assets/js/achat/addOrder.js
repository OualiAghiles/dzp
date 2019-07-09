function validForm() {
  // body
}
function pushData(obj) {
  // fetch data if the email exist or phone
  // if exist update all datas
  // else create the user then update data
}
/*
 *
 * @param([table]) = Node list * table of all commandes
 * @param(Object) push static element data to the object
 */
function getRowsValue(table, obj) {
  // loop throw table
  table.forEach(row => {
    var valueCoupons = rows.querySelector('.value-coup').innerHTML
    var nbrCoupons = rows.querySelector('.nbrCoups').innerHTML
    // push data
    obj.coupons.push({
      valueCoupons: valueCoupons,
      nbrCoupons: nbrCoupons
    })
  });

}

function getTables(table, orders) {
  table.forEach(table => {
    // each table must have data-ref= "product Tag"
    var ref = table.dataset.ref
    // main Obj
    var product = {
      productRef: ref,
      coupons: []
    }
    var rows = table.querySelectorAll('tbody tr')
    getRowValue(rows, product)
    orders.push(product)
  });
}

function addProduct(cls) {
  var orders = []
  var tables = document.querySelectorAll(cls)
  getTables(tables, orders)
  return orders
}

function addOrder() {
  validForm()
  var order = addProduct('.table')
  //inputValues() return  obj of input values
  var inputs = inputValues()
  var CompleteOrder = {
    email: inputs.email,
    tel: inputs.tel,
    city: inputs.city,
    node: inputs.node,
    orders: [...order]
  }
  pushData(CompleteOrder)

}


addOrder()
