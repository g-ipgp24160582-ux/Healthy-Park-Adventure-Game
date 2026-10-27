function doPost(e) {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Add headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Player Name", "Total Stars", "Total Correct", "L1 Stars", "L2 Stars", "L3 Stars", "L4 Stars"]);
  }

  try {
    // Parse the incoming JSON data from the game
    var data = JSON.parse(e.postData.contents);

    // Create the row data
    var rowData = [
      new Date(), // Timestamp
      data.playerName || "Anonymous",
      data.totalStars || 0,
      data.totalCorrect || 0,
      data.l1Stars || 0,
      data.l2Stars || 0,
      data.l3Stars || 0,
      data.l4Stars || 0
    ];

    // Add the row to the sheet
    sheet.appendRow(rowData);

    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error if parsing fails
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}