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
     *  @param cb
     *  @return {[Object]}   [object from db]
     */
    ShowData: async (c, cb) => {
      var data;
      try {
        // fetch data from a url endpoint
        const response = await axios.get(`${dataOut.api}${c}`);
        data = await response.data;
        return data, cb(data)
      } catch (error) {
        alert(error); // catches both errors
      }

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
    },
    DeleteData: function (cat, id, cb) {
      axios.delete(`${dataOut.api}${cat}/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
      axios.delete(`${dataOut.api}${cat}`, {
        params: data
      })
      return cb(data)
    }
  }
})()
