const getIpInfo = (ipAddress = '') => {
    const ip = ipAddress;
    const api_key = 'at_hcsOZYM8HMFQVB0DqDWt4kdfQloRP';
    $(() => {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: data => {
            console.log(data);
            displayInfo(data.ip, data.location.city, data.location.country, data.location.postalCode, data.location.timezone, data.isp);
            showMap(data.location.lat, data.location.lng);
           }
       });
    });
};

const displayInfo = (ipAddress, city, country, postalCode, timezone, isp) => {
    $('.ip-address').text(ipAddress);
    $('.location').text(`${city}, ${country} ${postalCode}`);
    $('.timezone-value').text(timezone);
    $('.isp').text(isp);
};

let map = L.map('map');

const showMap = (latitude, longitude) => {
    map.setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .openPopup();
}

$('.search-btn').click(e => {
    e.preventDefault();
    let searchValue = $('.ip-input').val().trim();
    getIpInfo(searchValue);

});

getIpInfo();