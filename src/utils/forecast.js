const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = "https://api.darksky.net/forecast/5dbb16135b9da8e155b1f549c2bbd352/"+latitude+","+longitude
   
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather forecast service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{console.log()
            const msg = body.daily.summary+" It is currently "+body.currently.temperature+" degrees out. The high today is "+body.daily.data[0].temperatureHigh+" with a low of "+body.daily.data[0].temperatureLow+". There is "+body.currently.precipProbability+" percent chance of rain"
            callback(undefined, msg)
        }
    })
}


module.exports = forecast