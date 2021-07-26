const getIpInfo = (ipAddress = '') => {
    const ip = ipAddress;
    const api_key = 'at_hcsOZYM8HMFQVB0DqDWt4kdfQloRP';
    $(() => {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: data => {
            console.log(data);
           }
       });
    });
};

getIpInfo();