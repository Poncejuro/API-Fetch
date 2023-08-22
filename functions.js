const dataContainer = document.querySelector('.dataContainer')


//localstore Validation
function LocalStorageValidation() {
  const dataValue = localStorage.getItem('myDataJason')
  const date = localStorage.getItem('DatemyDataJason')
  
  const today = new Date()
  const time=today.getTime()
  const dif = (time - date)/1000/60
  
  if (dataValue == null) {
    console.log('no hay datos guardados') //testing
    traerDatos()
  } else {
    console.log('existen datos') //testing
    console.log('la diferencia de tiempo en minutos es: ' + dif) // testing

    if (dif >1) {
      traerDatos()
    } else {
      dataManager(JSON.parse(dataValue)) 
    }
  }
}


//call data
function traerDatos(){
    const url = 'https://reqres.in/api/users?delay=3'
    fetch(url)
          .then(response => response.json())
          .then( (dataJson) =>{
            dataManager(dataJson)
          var jsonString = JSON.stringify(dataJson)
          saveData(jsonString)
          })
          .catch(error => console.log(error))  
          
    
}
//save data and date
function saveData(data) {
  localStorage.setItem('myDataJason', data);

  const today = new Date();  
  const time=today.getTime();
  localStorage.setItem('DatemyDataJason', time);
}
 
// iterate data and save
function dataManager(dataJson) {
  //console.log(dataJson )  //testing
  //console.log(dataJson.data) //testing
  console.log('el tipo es: ' + typeof(dataJson)) //testing
  
  dataJson.data.map(aux =>(
  createItems(aux)
  ))
  
  
}


//handling DOM
function createItems(aux){
  const th = document.createElement('th')
  th.scope = 'row'
  th.textContent = aux.id

  const tdName = document.createElement('td')
  tdName.textContent = aux.first_name

  const tdMail = document.createElement('td')
  tdMail.textContent = aux.email


  const img = document.createElement('img')
  img.src = aux.avatar
  img.style.borderRadius= '100px'  
  
  const tr = document.createElement('tr')

  tr.appendChild(th)
  tr.appendChild(tdName)
  tr.appendChild(tdMail)
  tr.appendChild(img)
  
  dataContainer.appendChild(tr)
}

  