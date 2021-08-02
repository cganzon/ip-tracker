const getIpInfo = (ipAddress = '') => {
    const ip = ipAddress;
    const api_key = 'at_hcsOZYM8HMFQVB0DqDWt4kdfQloRP';
    $(() => {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: data => {
            // console.log(data);
            displayInfo(data.ip, data.location.city, data.location.region, data.location.country, data.location.postalCode, data.location.timezone, data.isp);
            showMap(data.location.lat, data.location.lng);
           }
       });
    });
};

const displayInfo = (ipAddress, city, state, country, postalCode, timezone, isp) => {
    if(country === 'US') {
        $('.location').text(`${city}, ${state} ${postalCode}`)
    } else {
        $('.location').text(`${city}, ${country} ${postalCode}`);
    }
    $('.ip-address').text(ipAddress);
    $('.timezone-value').text(timezone);
    $('.isp').text(isp);
};

const validateIp = (ip) => {
    let validator = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/;
    return validator.test(ip);
};

let map = L.map('map');
map.zoomControl.remove();

const showMap = (latitude, longitude) => {
    map.setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let customMarker = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [23, 56]
    });
    L.marker([latitude, longitude], {icon: customMarker}).addTo(map);
};

$('.search-btn').click(e => {
    e.preventDefault();
    let searchValue = $('.ip-input').val().trim();
    if(searchValue === '' || !validateIp(searchValue)) {
        $('.error').addClass('display');
    } else {
        $('.error').removeClass('display');
        getIpInfo(searchValue);
    }
});

getIpInfo();