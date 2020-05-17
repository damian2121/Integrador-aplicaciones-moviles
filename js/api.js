let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('code') && !localStorage.getItem('token')) {
    var settings = {
        url: URL_SPOTIFY,
        method: 'POST',
        timeout: 0,
        headers: {
            Authorization: `Basic ${CLIENT_ID}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie:
                '__Host-device_id=AQBwFkn6pd3I6kgTN0Tzw9vzF_Fcns0L8bMdSxwebkUnss1PDhp6WzmD9xxDBk84ufcxKoyka7WfBRUBLoHqb_cHMFaJ_EzDzwc; __Secure-TPASESSION=AQCIh1eWiV+Ptc71Csv+Ur2zNm9OXbWi3RT+1A8FQEotqda5wtYrsjMxs0N/N7ICE6dhQOUNmFr5aKWDGO8cv0RUTFNWgEHyeao=; csrf_token=AQA1IWoVIBKPz-rWcFoVNKnQCT7nS10pKufrOcuvdwxUK-uy7tdACUXcrPalRQBApfl7RafIm8tFtEqh',
        },
        data: {
            grant_type: GRANT_TYPE,
            code: searchParams.get('code'),
            redirect_uri: REDIRECT_URI,
        },
    };
    $.ajax(settings).done(function (response) {
        localStorage.setItem('token', response.access_token);
    });
}
