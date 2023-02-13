const API_key = '74f8b856494115481b53fb205b15a852'
const API_geo = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_D1TaE3kNu2kahp8ucwfDfmLsjufvZ'

const main = document.querySelector('.main');

const getPositionByIp = async() => {
    let resp = await fetch(API_geo)
    let data = await resp.json();
    let lat = data.location.lat;
    let lng = data.location.lng;
        getWeather(lat, lng);
}

const getPosition = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos)=>{
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
            getWeather(lat, lon);
    });
    } 
    getPositionByIp();
}
getPosition();

const getWeather = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`

    let resp = await fetch(url);
    let data = await resp.json()
    
    render(data);
}

const render = (data) => {
    main.innerHTML = '';
    main.innerHTML = 
    `<h1 class="temperature">${(data.main.temp).toFixed(1)}${String.fromCharCode(0x00B0)} C</h1>
    <p class="condition">${data.weather[0].description} in ${data.name}</p>
    <input class="location" type="text" placeholder="change city">`

    const location = document.querySelector('.location');
    location.addEventListener('click', ()=>renderSearch());
}

const renderSearch = () => {
    main.innerHTML = '';
    main.innerHTML = 
    `<input class="location location-active" type="text" placeholder="Type your city here">
    <div class="line"></div>
    <button class="button">Find</button>`

    const button = document.querySelector('.button');
    const location = document.querySelector('.location');

    button.addEventListener('click', async ()=>{
        let place = location.value;
        let resp = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${API_key}`)
        let arr = await resp.json();
        try {
            let data = arr[0];
            let lat = data.lat;
            let lon = data.lon;
            getWeather(lat, lon);
        } catch (err) {
        location.value = "Ooops. Something went wrong."
        }
    })
}

