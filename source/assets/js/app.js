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
  var showRecapAddCoupModal = function (obj) {
    // Logout Modal
    var insertInfo = function (tab) {
      var list = ''
      tab.forEach(function (el) {
        var html = `<tr>
                      <td>${el.cat}</td>
                      <td>${el.produit}</td>
                      <td>${el.source}</td>
                      <td>${el.montant}</td>
                      <td>${el.devise}</td>
                      <td>${el.prixAchat}</td>
                      <td>${el.prixVente}</td>
                      <td>${el.codeCoupon}</td>
                      </tr>`
        list = html
      })
      return list
    }
    var html = `<table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Cat</th>
                      <th scope="col">produit</th>
                      <th scope="col">Source</th>
                      <th scope="col">Montant</th>
                      <th scope="col">Devise</th>
                      <th scope="col">prixAchat</th>
                      <th scope="col">prixVente</th>
                      <th scope="col">codeCoupon</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${insertInfo(obj)}

                  </tbody>
                </table>`
    var modal = document.querySelector('#recapModal .modal-body')
    modal.insertAdjacentHTML('beforeend', html)

  }
  var todayDate = function () {
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
  return {
    showArticles: function (cat) {

    },
    closeCat: function (addBtn, cat, container) {
      var btn = container.querySelector('.closeCat')
      var close = function () {
        container.classList.add('d-none')
        container.querySelector(`.add-${cat}`).classList.add('d-none')
        container.querySelector(`.add-${cat}`).classList.remove('active')
        document.querySelectorAll('.couponChoiceCat .col-md-3').forEach((el) => {
          el.classList.remove('d-none')
          el.classList.remove('active')
        })
        addBtn.classList.remove('d-none')
      }
      btn.addEventListener('click', close)

    },
    showRecap: function (cat, content) {
      var showAction = content.querySelector(`.add-${cat} .showRecap`)
      var el = cat
      console.log(showAction)
      var data = []
      showAction.addEventListener('click', function () {
        var radios = content.querySelectorAll(`.add-${el} .selected--product input`)
        var activeTab = content.querySelector(`.add-${el} .show`)
        var source = content.querySelector(`.add-${el} .sourceCoupon`)
        var montant = content.querySelector(`.add-${el} .montantCoupon`)
        var devise = content.querySelector(`.add-${el} .devise`)
        var prixAchat = content.querySelector(`.add-${el} .prixAchat`)
        var prixVente = content.querySelector(`.add-${el} .prixVente`)
        var codeCoupon = content.querySelector(`.add-${el} .codeCoupon`)

        var cat, produit;
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            cat = radios[i].getAttribute('name')
            produit = radios[i].getAttribute('id')
          }
        }
        data.push({
          cat: cat,
          produit: produit,
          tab: activeTab.getAttribute('id'),
          source: source.value,
          montant: montant.value,
          devise: devise.options[devise.selectedIndex].value,
          prixAchat: parseInt(prixAchat.value) * parseInt(montant.value),
          prixVente: parseInt(prixVente.value) * parseInt(montant.value),
          codeCoupon: codeCoupon.value,
          date: todayDate(),
          valide: true
        })
        console.log(data)
        showRecapAddCoupModal(data)
        return data
      })
      //
      return data
    }

  }
})()

var CoupnCenter = (function (UICoup, CouponCtrl, Store) {

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
      var cat = item.dataset.target
      e.preventDefault()
      document.querySelectorAll('.couponChoiceCat .col-md-3').forEach((el) => {
        el.classList.add("d-none")
      })
      card.classList.remove("d-none")
      card.classList.add("active")
      couponAddContent.classList.remove('d-none')
      couponAddContent.querySelector(`.add-${cat}`).classList.remove('d-none')
      couponAddContent.querySelector(`.add-${cat}`).classList.add('active')
      item.classList.add('d-none')

      UICoup.closeCat(item, cat, couponAddContent)
      //UICoup.showRecap(cat, couponAddContent)
      var infoCoupon = UICoup.showRecap(cat, couponAddContent)
      console.log('infoCoupon: ', infoCoupon)
      var addBtnCoupon = couponAddContent.querySelector('.add-btn-coupon')
      addBtnCoupon.addEventListener('click', function (e) {
        e.preventDefault()
        var obj = infoCoupon[0]
        Store.AddData('coupons', obj, function (t) {

          console.log(t)
        })
      })
      Store.ShowData('coupons', function (obj) {
        obj.forEach(function (el) {
          console.log(el.cat, el.codeCoupon, el.produit)
        });
      })


      // } else {
      //   labels.forEach((el) => {
      //     el.classList.remove("hide")
      //   })
      //   item.parentNode.querySelector('.details').classList.add('hide')
      // }
    })
  })
})(UICoupon, CouponController, Store)
