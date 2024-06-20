
console.log("exec: majorAuditContent.js")

document.addEventListener("scrapeData", function(e) 
{
    chrome.runtime.sendMessage(e.detail);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    if(request.action == "receiveData") 
    {
        console.log("if: receiveData")
        fetch('http://127.0.0.1:5001/majoraudit/us-central1/functions/sync_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: request.detail
        });
        console.log(request);
    }
});
