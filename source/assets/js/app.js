M.AutoInit();
/* ********
 *
 * Coupons Plugin
 *
 * **********
 * */
var CouponController = (function() {

})()

var UICoupon = (function() {
  var DOMstrings = {
    addModal: '.add-coupons'
  }

  return {
    showArticles: function(cat) {

    },
    todayDate: function() {
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

    }
  }
})()

var CoupnCenter = (function(UICoup, CouponCtrl) {

  window.onload = function () {
    var arrCoupn = []
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var fileSelected = document.getElementById('txtfiletoread');
      fileSelected.addEventListener('change', function (e) {
        //Set the extension for the file
        var fileExtension = /text.*/;
        //Get the file object
        var fileTobeRead = fileSelected.files[0];
        //Check of the extension match
        if (fileTobeRead.type.match(fileExtension)) {
          //Initialize the FileReader object to read the 2file
          var fileReader = new FileReader();
          fileReader.onload = function (e) {
            var fileContents = document.getElementById('msg');
            //fileContents.innerText = fileReader.result;
            var arrayOfLines = fileReader.result.match(/[^\r\n]+/g);
            console.log(arrCoupn)

            arrayOfLines.forEach((el, id)=> {
              //console.log(el)
              var coupn = el.replace(',','')
              coupn = coupn.replace(' ','')
              coupn = coupn.replace('$','')
              coupn = coupn.split(':')
              arrCoupn.push({
                amount: coupn[0],
                code: coupn[1],
                id: id,
                dateAjout: UICoup.todayDate(),
                source: 'gearbest',
                prixAchat: '210',
                prixVente: '230',
                status: 'Valide',
                devise: '$'
              })

            })
            arrCoupn.forEach((el) => {
              var html = `<div>
                            <span>${el.amount} ${el.devise}</span>
                            <span>${el.source}</span>
                            <span>${el.code}</span>
                            <span>${el.dateAjout}</span>

</div>`
              fileContents.insertAdjacentHTML('beforeend', html)
            })
          }
          fileReader.readAsText(fileTobeRead);
        }
        else {
          alert("Please select text file");

        }

      }, false);

    }
    else {
      alert("Files are not supported");
    }
    console.log(arrCoupn)
  }

//see the link above to see where the variable fileTobeRead comes from.
  var labels = document.querySelectorAll('.cats')
  labels.forEach((item)=> {
    item.addEventListener('click', (e) => {
      if (e.target.type === 'checkbox' && e.target.checked === true) {
        labels.forEach((el)=> {
          el.classList.add("hide")
        })
        item.classList.remove("hide")
        item.parentNode.querySelector('.details').classList.remove('hide')
        var cat = e.target.dataset.cat



      } else {
        labels.forEach((el)=> {
          el.classList.remove("hide")
        })
        item.parentNode.querySelector('.details').classList.add('hide')
      }
    })
  })
})(UICoupon, CouponController)
