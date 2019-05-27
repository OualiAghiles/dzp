var getInputs = () => {
  return {
    email: document.querySelector('.user-email').value,
    phone: document.querySelector('.user-phone').value,
    city: document.querySelector('.user-city').value,
  }
}

var objectUser = (obj, arr) => {
  let id = 0
  if(arr.length > 0){
    id = arr[arr.length -1].id + 1
  } else {
    id = 0
  }
  return {
    id : id,
    email: '',
    phone: '',
    city:'',
    shop:[],
    date: Utils.todayDate(),
    ...obj
  }
}
var addUser = (e) => {
  e.preventDefault()
  Utils.getData('users', (obj)=>{
    Utils.addData('users',objectUser(getInputs(),obj))
    console.log(data)
    let listUsers = document.querySelector('.listUsers tbody')
    let template =`<tr>
                    <td>${data.id}</td>
                    <td>${data.email}</td>
                    <td>${data.phone}</td>
                    <td>${data.city}</td>
                    <td>${data.date}</td>
                    <td>${data.shop.length}</td>
                    <td>
                    <button class="btn btn-sm btn-outline-warning userActions"  data-tippy-content="Voir plus"><i class="fas fa-info-circle"></i></button>
                    <button class="btn btn-sm btn-outline-info userActions" data-tippy-content="Editer"><i class="fas fa-pen-square" ></i></button>
                    </td>
</tr>`
    listUsers.insertAdjacentHTML('beforeend', template)
      var btnActions = document.querySelectorAll('.userActions')
      tippy(btnActions)


  })

  Swal.fire({
    position: 'center',
    type: 'success',
    title: 'The user has been added',
    showConfirmButton: false,
    timer: 1500
  })
}
document.querySelector('.add-user').addEventListener('click', addUser)
var generateTable = () => {
  Utils.getData('users', (obj)=>{
    let listUsers = document.querySelector('.listUsers tbody')
    return obj.forEach(el =>{
      let template =`<tr>
                      <td>${el.id}</td>
                      <td>${el.email}</td>
                      <td>${el.phone}</td>
                      <td>${el.city}</td>
                      <td>${el.date}</td>
                      <td>${el.shop.length}</td>
                      <td>
                      <button class="btn btn-sm btn-outline-warning userActions infoUser" 
                      data-toggle="modal" data-target="#${el.id}-user"  data-tippy-content="Voir plus">
                      <i class="fas fa-info-circle"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-info userActions editUser" data-toggle="modal" 
                      data-target="#${el.id}-user" data-tippy-content="Editer"><i class="fas fa-pen-square" ></i></button>
                      </td>
</tr>`
      listUsers.insertAdjacentHTML('beforeend', template)
    })
  })
  window.onload = () => {
    var btnActions = document.querySelectorAll('.userActions')
    tippy(btnActions)
    btnActions.forEach(btn => {
      btn.addEventListener('click', (e)=> {
        //e.preventDefault()
        let modalEl = document.querySelector('.modal')
        if(modalEl){
          modalEl.parentNode.removeChild(modalEl)
        }
        var target = btn.dataset.target.substr(1, btn.dataset.target.length)
        console.log(target)
        var modal = Utils.generateModal('recap', target)
        document.querySelector('.listUsers').insertAdjacentHTML('beforeend', modal)
      })
    })
  }
}

generateTable()

