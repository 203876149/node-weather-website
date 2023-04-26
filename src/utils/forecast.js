const request = require("request");
const forecast = ({altitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fdd616b71e78b5b78952acf7f6f78f80&query=' + altitude + ',' + longitude;
    //console.log(url)
    request({url, json: true}, (error, { body } = {}) => {
        if (error || !body['current']) {
            callback('error', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}
module.exports = forecast
