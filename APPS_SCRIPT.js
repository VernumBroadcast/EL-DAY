// 🐱 Google Apps Script for Remote Hector Blessing Control
// 
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM/edit
// 2. Click: Extensions → Apps Script
// 3. Delete any existing code
// 4. Paste THIS ENTIRE FILE
// 5. Click: Deploy → New deployment
// 6. Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy
// 10. Copy the Web App URL
// 11. Update script.js: Add the URL to the APPS_SCRIPT_URL variable (around line 8)

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ELDAY');
  
  // Action: trigger - Set a new blessing trigger
  if (e.parameter.action === 'trigger') {
    const timestamp = new Date().getTime();
    sheet.getRange('N2').setValue(timestamp);
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Action: check - Get the latest trigger timestamp
  if (e.parameter.action === 'check') {
    const trigger = sheet.getRange('N2').getValue();
    return ContentService.createTextOutput(JSON.stringify({
      trigger: trigger || 0
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Default response
  return ContentService.createTextOutput(JSON.stringify({
    error: 'Invalid action. Use ?action=trigger or ?action=check'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to manually trigger from Apps Script editor
function triggerBlessingNow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ELDAY');
  const timestamp = new Date().getTime();
  sheet.getRange('N2').setValue(timestamp);
  Logger.log('Blessing triggered! Timestamp: ' + timestamp);
}

