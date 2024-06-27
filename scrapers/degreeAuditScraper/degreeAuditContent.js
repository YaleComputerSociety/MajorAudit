
console.log("inject: degreeAuditContent.js")

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
	
	const nameMatch = data.match(/id="studentName"[^>]*value="([^"]+)"/);
	const name = nameMatch ? nameMatch[1] : 'Name Not Found';

	const degreeMatch = data.match(/id="degree"[^>]*value="([^"]+)"/);
	const degree = degreeMatch ? degreeMatch[1] : 'Degree Not Found';

	const majorMatch = data.match(/Major<\/span>\s*([^<]+)<\/span>/);
	const major = majorMatch ? majorMatch[1] : 'Major Not Found';

	const headers = document.querySelectorAll('h2');
	const headerTexts = Array.from(headers).map(header => {
        const firstSpan = header.querySelector('span');
        return firstSpan ? firstSpan.textContent : header.textContent;
    });

	const tables = document.querySelectorAll('table');
	const tableTexts = Array.from(tables).map(table => processTable(table));
	
	chrome.runtime.sendMessage({
		action: "dataExtracted",
		data: {
			name: name,
			degree: degree,
			major: major,
			headers: headerTexts,
			tables: tableTexts
		}
	});
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
