/* ********
 *
 * Coupons Plugin
 *
 * **********
 * */
var CouponController = (function () {

})()

var UICoupon = (function () {
  var DOMstrings = {
    addModal: '.add-coupons'
  }
  var showModal = function () {
    // Logout Modal
    var html = `<div class="modal fade" id="recapModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button><a class="btn btn-primary" href="login.html">Logout</a>
                    </div>
                  </div>
                </div>
              </div>`
  }
  return {
    showArticles: function (cat) {

    },
    closeCat: function (addBtn, cat, container) {
      var btn = container.querySelector('.closeCat')
      var close = function () {
        container.classList.add('d-none')
        container.querySelector(`.add-${cat}`).classList.add('d-none')
        document.querySelectorAll('.couponChoiceCat .col-md-3').forEach((el) => {
          el.classList.remove('d-none')
          el.classList.remove('active')
        })
        addBtn.classList.remove('d-none')
      }
      btn.addEventListener('click', close)

    },
    showRecap: function (cat, content) {
      var showAction = content.querySelector('.showRecap')
      showAction.addEventListener('click', function () {

      })
    },
    todayDate: function () {
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

var CoupnCenter = (function (UICoup, CouponCtrl) {

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

            arrayOfLines.forEach((el, id) => {
              //console.log(el)
              var coupn = el.replace(',', '')
              coupn = coupn.replace(' ', '')
              coupn = coupn.replace('$', '')
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
        } else {
          alert("Please select text file");

        }

      }, false);

    } else {
      alert("Files are not supported");
    }
    console.log(arrCoupn)
  }

  //see the link above to see where the variable fileTobeRead comes from.
  var btnsAddCoupon = document.querySelectorAll('.addCoupon')
  var couponAddContent = document.querySelector('.couponAddContent')
  console.log(btnsAddCoupon)
  btnsAddCoupon.forEach((item) => {
    item.addEventListener('click', (e) => {
      var card = item.parentNode.parentNode.parentNode
      e.preventDefault()
      // if (e.target.type === 'checkbox' && e.target.checked === true) {
      document.querySelectorAll('.couponChoiceCat .col-md-3').forEach((el) => {
        el.classList.add("d-none")
      })
      card.classList.remove("d-none")
      card.classList.add("active")
      couponAddContent.classList.remove('d-none')
      var cat = item.dataset.target
      couponAddContent.querySelector(`.add-${cat}`).classList.remove('d-none')
      item.classList.add('d-none')

      UICoup.closeCat(item, cat, couponAddContent)
      UICoup.showRecap(cat, couponAddContent)

      // } else {
      //   labels.forEach((el) => {
      //     el.classList.remove("hide")
      //   })
      //   item.parentNode.querySelector('.details').classList.add('hide')
      // }
    })
  })
})(UICoupon, CouponController)
