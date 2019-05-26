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
                      <td><button class="btn btn-sm btn-outline-warning"><i class="fas fa-info"></i></button></td>
</tr>`
      listUsers.insertAdjacentHTML('beforeend', template)
    })
  })
}

generateTable()
