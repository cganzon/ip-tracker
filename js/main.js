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

$('.search-btn').click(e => {
    e.preventDefault();
    let searchValue = $('.ip-input').val().trim();
    getIpInfo(searchValue);
});

getIpInfo();