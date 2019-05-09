var Store = (function () {
  var dataOut = {
    api: 'http://localhost:3000/',
    coupon: 'coupons',
    categories: 'categories',
    produit: 'produit'
  }
  var outputSuccessData = function (data) {
    return (data)
  }
  var outputErrorData = function (err) {
    return err
  }
  return {
    /**
     *  [description]
     *  @method
     *  @param  {[string]} c [witch category to fetch ]
     *  @return {[Object]}   [object from db]
     */
    ShowData: function (c, cb) {
      var myData
      axios.get(`${dataOut.api}${c}`)
        .then(function (response) {
          myData = response.data
          return cb(myData)
        })
        .catch(function (error) {
          console.log(outputErrorData(error))
        })
    },
    /**
     *  [description]
     *  @method
     *  @param  {[type]} cat [description]
     *  @param  {[type]} obj [description]
     *  @return {[type]}     [description]
     */
    AddData: function (cat, obj, cb) {
      axios.post(`${dataOut.api}${cat}`, data = obj)
        .then(function (data) {
          cb(data)
        })
        .catch(function (error) {
          console.log(outputErrorData(error))

        })
    },
    UpdateData: function (cat, id, obj, cb) {

      cb()
    }
  }

})()
