/* 
  UPDATED GOOGLE APPS SCRIPT FOR GOOGLE SHEETS INTEGRATION
  
  Instructions:
  1. Open your Google Sheet (https://docs.google.com/spreadsheets/d/1ENGMUy8T39KuUV7kbaNDyDcHU9JN4Vx6u-nZWZsGBBQ/)
  2. Go to 'Extensions' -> 'Apps Script'
  3. Replace the existing code with this updated script.
  4. Click 'Deploy' -> 'Manage Deployments'
  5. Edit the current deployment and select 'New Version'
  6. Click 'Deploy' again.
*/

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // Add a header row if the sheet is empty
    if (sheet.getLastRow() == 0) {
      sheet.appendRow(['Date', 'Name', 'Brand', 'Email', 'Phone', 'Location', 'Requirement', 'Message']);
    }
    
    // Append the lead data
    sheet.appendRow([
      new Date(),
      data.name,
      data.brand,
      data.email,
      data.phone,
      data.location,
      data.requirement,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
