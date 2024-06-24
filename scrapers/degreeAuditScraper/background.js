
// Store the ID of the web page of the caller.
var majorauditId = ""

/* Upon receiving scraping request, open Degree Audit and inject the scraper into the web page. */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
	if (request.action === "openWebsite") 
	{
	  	majorauditId = sender.tab.id;

		chrome.tabs.create({
			url: "https://secure.its.yale.edu/cas/login?service=https%3A%2F%2Fdegreeaudit.yale.edu%2Fresponsive%2Flogin%2Fcas",
		},

		function(tab) 
		{
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
			{
				if (tabId === tab.id && changeInfo.url && changeInfo.url.includes('https://degreeaudit.yale.edu/responsive/')) 
				{
					chrome.tabs.update(tabId, { url: "https://degreeaudit.yale.edu/responsive/worksheets/WEB31" });
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						files: ['degreeAuditContent.js']
					});
				}
				if (tabId === tab.id && changeInfo.url && changeInfo.url.includes('https://degreeaudit.yale.edu/responsive/worksheets/WEB31')) {
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						files: ['degreeAuditContent.js']
					});
				}
			});
		});
	}
});

/* Check whether a string is a valid course ID (defined as four alphabets + a space + three digits)
 * @param {*} str the string that needs to be checked
 * @returns whether the string is a valid course ID */
function isCourseId(str) 
{
    // const pattern = /^[A-Za-z]{4} \d{3}$/;
	const pattern = /^[A-Za-z&]{3,4} \d{3}J?$/;
    return pattern.test(str);
}

/**
 * Extract the distributional requirement from a string
 * 
 * @param {*} str the string needs to be checked
 * @returns empty string if any dist req info is contained
 * otherwise return a string that denotes the correponding distributional requirement
 */
function isDesignation(str) {
	if(str.includes("Writing Credit")) return "Wr";
	if(str.includes("Language through")) return "L";
	if(str.includes("Language Credit")) return "L";
	if(str.includes("Reasoning Credit")) return "Qr";
	if(str.includes("Arts Credit")) return "Hu";
	if(str.includes("Social Science Credit")) return "So";
	if(str.includes("Science Credit")) return "Sc";
	return "";
}

/* According to the format of Degree Audit, the distributional requirment entry, if existed, must be located in either the same line or the above line. */
function getDesignation(table, row, col) 
{
	if(isDesignation(table[row][0])!=""){
		return isDesignation(table[row][0]);
	} 
	if(row >= 1)
	{
		if(isDesignation(table[row-1][0])!="") 
		{
			return isDesignation(table[row-1][0]);
		}
	}
	return "";
}

/* Transform the table into a JSON file. */
function TabletoJson(table) 
{
	var courses = [];
	for(var i = 0; i < table.length; i++) {
		if(isCourseId(table[i][1])) {
			const course = {
				id: table[i][1],
				name: table[i][2],
				status: table[i][3],
				credit: table[i][4],
				term: table[i][5],
				designation: getDesignation(table, i, 1)
			}
			courses.push(course);
		}
		else if(isCourseId(table[i][0])) {
			const course = {
				id: table[i][0],
				name: table[i][1],
				status: table[i][2],
				credit: table[i][3],
				term: table[i][4],
				designation: getDesignation(table, i, 0)
			}
			courses.push(course);
		}
	}
	return courses;
}

/* Format raw data sent from Degree Audit Scraper into a JSON file. */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
	if (request.action === "dataExtracted") {

		const { name, degree, major, tables } = request.data;

		var coursestable = []
		var first_year_tables = [
			"",
			"Distributional Requirements for the First Year", 
			"Distributional Requirements for Sophomore Year", 
			"Distributional Requirements for Junior Year",
			"Distributional Requirements for Bachelor's Degree", 
			"Undeclared Major", 
			"In Progress"]
		
		for(var i = 0; i < tables.length; i++) 
		{
			const requirement = {
				req: first_year_tables[i],
				courses: TabletoJson(tables[i])
			}
			coursestable.push(requirement);
		}

		const dataJSON = JSON.stringify({
			name: name,
			degree: degree,
			major: major,
			coursestable: coursestable
		}, null, 2);

		sendMessageToTab(majorauditId, {action: "receiveData", detail: dataJSON});

		chrome.tabs.remove(sender.tab.id);
	}
});

/* Send formatted JSON file back to caller. */
function sendMessageToTab(tabID, message) 
{
    chrome.tabs.sendMessage(tabID, message);
}
