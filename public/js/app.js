console.log('Client side javascript file is loaded!')
const searchWeather = (location) => {
    massage1.textContent = 'Loading...'
    massage2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
        if (data.error) {
            massage1.textContent = data.error
        } else {
            massage1.textContent = data.Location
            massage2.textContent = data.weather_descriptions + '. temperature: ' + data.temperature
        }
    })
})}
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const location = document.querySelector('input').value
    searchWeather(location)
})
const massage1 = document.querySelector('#massage-1')
const massage2 = document.querySelector('#massage-2')
massage2.textContent = ''
