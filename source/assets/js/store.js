var Store = (function() {
  var dataOut = {
    link: 'http://localhost:3000/categories/',
    game: 'jeux',
    apps: 'divertissement',
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
      axios.get(`${dataOut.link}?q=${dataOut.game}`)
        .then(function(response) {
          myData = response.data
          console.log(myData)
        })
        .catch(function(error) {
          console.log(outputErrorData(error))
        })
    },
    AddData: function(cat, obj) {
      axios.post(`${dataOut.link}[${cat}]`, data = obj)
        .then(function(obj) {
          console.log(outputSuccessData(obj))
        })
        .catch(function(error) {
          console.log(outputErrorData(error))

        })
    }
  }

})()
