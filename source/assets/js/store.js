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
          //console.log(outputSuccessData(myData))
          if (cb) {
            return cb(myData), myData
          } else {
            return myData
          }
        })
        .catch(function (error) {
          console.log(outputErrorData(error))
        })
      return myData
    },
    /**
     *  [description]
     *  @method
     *  @param  {[String]} cat [description]
     *  @param  {[Object]} obj [description]
     *  @return {[Object]}     [description]
     */
    AddData: function (cat, obj) {
      axios.post(`${dataOut.api}${cat}`, data = obj)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(outputErrorData(error))

        })
    },
    /**
     *
     * @param cat
     * @param id
     * @param obj
     * @constructor
     */
    UpdateData: function (cat, id, obj, cb) {
      axios.put(`${dataOut.api}${cat}/${id}`, data = obj)
        .then(function (response) {
          var myData = response.data
          return cb(myData)
        })
        .catch(function (error) {
          console.log(outputErrorData(error))

        })
    }
  }
})()
