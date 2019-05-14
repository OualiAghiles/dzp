var GestCats = (function() {
  var cat = function (
    title,
    img,
    labels,
    desc,
    id) {
    this.title = title,
    this.img = img,
    this.labels = labels,
    this.desc = desc,
    this.id = id
  }
  return {
    newCat: function(obj) {
      var t  = new cat(obj.title,
        obj.img,
        obj.labels,
        obj.desc,
        obj.id)
      return t
    }
  }
})()


var UIGestCatsController = (function() {
  return {
    generateRows: function (obj) {
      var addTags = function (arr) {
        var els = '';
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i];
          var h = `<code>${el}</code>`;
          els = els + h + ' / '
        }
        return els
      };
      var html = `<tr>
                        <td>${obj.title}</td>
                        <td>${addTags(obj.labels)}</td>
                        <td>${obj.desc}</td>
                        <td><div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
  <button type="button" data-toggle="modal" data-target="#${obj.title.toLowerCase()}" class="btn btn-success">
  
  <i class="fas fa-eye"></i>
  
</button>
  <button type="button" class="btn btn-warning"><i class="fas fa-edit"></i></button>
  <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>
</div></td>
                      </tr>`;
      return html
    }
  }
})()

var GestCatsController= (function(UICats,GestCats, Store) {

  var cont = document.querySelector('.gestCats');
  Store.ShowData('categories', function(obj) {

    var rows= ""
    obj.forEach((el)=>{

      var row = UICats.generateRows(el)
      rows = rows + row
      var modal = Utils.generateModal(`${el.title}`,`${el.title.toLowerCase()}`)

      cont.insertAdjacentHTML('beforeend', modal);
      return rows
    })
    var table = `<table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Labels</th>
                        <th scope="col">desc</th>
                        <th scope="col">actions</th>
                      </tr>
                    </thead>
                    <tbody>   
                    ${rows}                 
                  </tbody>
                </table>`


    cont.insertAdjacentHTML('beforeend', table);
  })


})(UIGestCatsController, GestCats, Store)
