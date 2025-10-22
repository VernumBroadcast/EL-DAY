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
  try {
    // Use the specific Sheet ID
    const spreadsheet = SpreadsheetApp.openById('1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM');
    
    // Get all sheet names for debugging
    const sheets = spreadsheet.getSheets();
    const sheetNames = sheets.map(s => s.getName());
    
    // Try to find the sheet - try 'ELDAY' first, then try the first sheet
    let sheet = spreadsheet.getSheetByName('ELDAY');
    
    // If ELDAY doesn't exist, use the first sheet
    if (!sheet && sheets.length > 0) {
      sheet = sheets[0];
    }
    
    // If still no sheet, return error with debug info
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'No sheets found',
        availableSheets: sheetNames
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Action: trigger - Set a new blessing trigger
    if (e.parameter.action === 'trigger') {
      const timestamp = new Date().getTime();
      sheet.getRange('N2').setValue(timestamp);
      return ContentService.createTextOutput(JSON.stringify({
        success: true, 
        timestamp: timestamp,
        sheetUsed: sheet.getName()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Action: check - Get the latest trigger timestamp
    if (e.parameter.action === 'check') {
      const trigger = sheet.getRange('N2').getValue();
      return ContentService.createTextOutput(JSON.stringify({
        trigger: trigger || 0,
        sheetUsed: sheet.getName(),
        availableSheets: sheetNames
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default response
    return ContentService.createTextOutput(JSON.stringify({
      message: 'Hector Blessing Control Active!',
      availableSheets: sheetNames,
      usage: 'Add ?action=trigger or ?action=check'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      message: 'Make sure the script has permission to access the spreadsheet'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to manually trigger from Apps Script editor
function triggerBlessingNow() {
  const spreadsheet = SpreadsheetApp.openById('1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM');
  const sheet = spreadsheet.getSheets()[0]; // Use first sheet
  const timestamp = new Date().getTime();
  sheet.getRange('N2').setValue(timestamp);
  Logger.log('Blessing triggered! Timestamp: ' + timestamp);
  Logger.log('Sheet used: ' + sheet.getName());
}
