document.addEventListener("scrapeData", function(e) {
    console.log("heard the event")
    chrome.runtime.sendMessage(e.detail);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "receiveData") {
        document.dispatchEvent(new CustomEvent("getData", { detail: request.detail }));
    }
});