var Store = (function() {
  var dataOut = {
    link: 'http://localhost:3000/',
    post: 'posts'
  }
  var outputSuccessData = function(data) {
    return (data)
  }
  var outputErrorData = function(err) {
    return err
  }
  return {
    ShowData: function() {
      var myData
      axios.get(`${dataOut.link}${dataOut.post}`)
        .then(function(response) {
          myData = response.data
          console.log(myData)
        })
        .catch(function(error) {
          console.log(outputErrorData(error))
        })
    },
    AddData: function(obj,cb) {
      axios.post(`${data.link}${data.post}`, obj)
        .then(function(response) {
          console.log(outputSuccessData(response))
          cb(response, obj)
        })
        .catch(function(error) {
          console.log(outputErrorData(error))

        })
    }
  }

})()
