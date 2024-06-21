
console.log("exec: degreeAuditContent.js")

/* Extract tables from HTML. */
function processTable(table) 
{
	const data = [];
	const rows = table.querySelectorAll('tr');

	rows.forEach(row => {
		const cells = row.querySelectorAll('td, th');
		const rowData = Array.from(cells).map(cell => cell.textContent.trim());
		data.push(rowData);
	});

	return data;
}

/* Check whether content is fully loaded. */
function isContentLoaded() 
{
	if (document.location.href.includes("https://degreeaudit.yale.edu/responsive/worksheets/WEB31"))
	{
		return document.querySelector('table') !== null;
	}
	return false;
}

/* Get DegreeAudit HTML; extract course data. */
function onContentLoaded() 
{
	let data = document.body.innerHTML;
	const tables = document.querySelectorAll('table');
	const allTableData = Array.from(tables).map(table => processTable(table))
	chrome.runtime.sendMessage({ action: "dataExtracted", data: allTableData }); 
}

function observerCallback(mutationsList, observer) 
{
	if(isContentLoaded()) {
		onContentLoaded();
		observer.disconnect();
	}
}

function extractData() 
{
	const observer = new MutationObserver(observerCallback);
	const config = {childList: true, subtree: true};
	observer.observe(document.body, config);
}

extractData();
