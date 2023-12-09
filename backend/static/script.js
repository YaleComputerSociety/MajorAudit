function syncData() {
    var event = new CustomEvent("scrapeData", {
        detail: { action: "openWebsite" }
    });
    document.dispatchEvent(event);
}

function getData() {
    fetch('/get_data', {
        method: 'GET',
    }).then(response => response.json()).
    then(json => {
        document.getElementById('dataDisplay').innerText = JSON.stringify(json, null, 4)
    })
}

document.addEventListener("getData", function(e) {
    fetch('/sync_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: e.detail
    });
});