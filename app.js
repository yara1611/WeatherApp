const key = 'SQ5NTAUJPTLHZ54BHH675H25E'
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?key=${key}`+'&aggregateHours=24&shortColumnNames=false&contentType=json&locationMode=single'

const btn = document.querySelector('button')
const ukbtn = document.querySelector('#unitGroup-uk')
const usbtn = document.querySelector('#unitGroup-us')

const neededData = ['temp','sunrise','sunset','visibility','humidity','datetime']

function checkToggle(btn){
    if(btn.checked){
        btn.checked=false
    }
   
}

btn.addEventListener('click',()=>{
    var unitGroup
    if(ukbtn.checked){
        checkToggle(usbtn)
        console.log(usbtn.checked)
        unitGroup=ukbtn.value;
        console.log(unitGroup)
    }
    if(usbtn.checked){
        checkToggle(ukbtn)
        unitGroup=usbtn.value
        console.log(unitGroup)
    }
    const location = document.querySelector('#location').value
    fetch(url+`&locations=${location}&unitGroup=${unitGroup}`, {mode:"cors"})
    .then(function(response){
        return response.json()
    })
    .then(displayCurrentConditions)
    .catch(function(err){
        console.log(err)
    })
})

function filterResponseToday(response){
    const currentConditions= response.location.currentConditions
    console.log(response.location)
    return currentConditions
}

function displayCurrentConditions(response){
    var currentConditions = filterResponseToday(response)
    const result = document.querySelector('#result')
    const nextResult = document.querySelector('#days-results')
    result.innerHTML=`<h1 style="text-align: center;">Today's Forcast</h1>`
    for (const cond in currentConditions) {
        if(neededData.includes(cond)){
            if (Object.hasOwnProperty.call(currentConditions, cond)) {
                const li = document.createElement('li')
                li.innerHTML = `${cond}: ${currentConditions[cond]}`
                result.appendChild(li)
            }
        } 
    }
   
}


