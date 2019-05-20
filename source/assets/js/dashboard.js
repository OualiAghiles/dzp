window.onload = function () {

  Store.ShowData('coupons', function (obj) {
    document.querySelector('.recapStat .prods .data').innerHTML = obj.length
    console.log(obj.length)
  })
  Store.ShowData('coupons?valide=false', function (obj) {
    var sales = 0;
    obj.forEach(el => {
      sales = sales + parseInt(el.montant)
      return sales
    });

    document.querySelector('.recapStat .sales .data').innerHTML = sales + '$'
    console.log(sales)
  })
}
