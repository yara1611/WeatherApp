const key = 'SQ5NTAUJPTLHZ54BHH675H25E'
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?key=${key}`+'&aggregateHours=24&unitGroup=uk&shortColumnNames=false&contentType=json&locationMode=single'

const btn = document.querySelector('button')
const neededData = ['temp','sunrise','sunset','visibility','humidity','datetime']
btn.addEventListener('click',()=>{
    const location = document.querySelector('#location').value
    fetch(url+`&locations=${location}`, {mode:"cors"})
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
function filterResponseDays(response){
    const otherDaysConditions = response.location.values
    console.log(otherDaysConditions)
    return otherDaysConditions
}
function displayCurrentConditions(response){
    var currentConditions = filterResponseToday(response)
    const result = document.querySelector('#result')
    const nextResult = document.querySelector('#days-results')
    for (const cond in currentConditions) {
        if(neededData.includes(cond)){
            if (Object.hasOwnProperty.call(currentConditions, cond)) {
                const li = document.createElement('li')
                li.innerHTML = `${cond}: ${currentConditions[cond]}`
                result.appendChild(li)
            }
        } 
    }
    // var otherDaysConditions = filterResponseDays(response)
    // for (const day of otherDaysConditions.values) {
        
    //         const dayDiv = document.createElement('div')
    //         for (let i = 0; i < 6; i++) {
    //                 const li = document.createElement('li')
    //                 console.log(day[i])
    //                 li.innerHTML = `${day[i]}`
    //                 dayDiv.appendChild(li)
                
    //         }
    //         nextResult.appendChild(dayDiv) 
       
    // }
   
}
function displayDaysConditions(otherDaysConditions) {
    
}

