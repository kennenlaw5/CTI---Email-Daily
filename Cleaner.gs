function onEdit(e) {
  var sheetName = e.source.getSheetName();
  
  if (sheetName === 'Shhhhh....') return play(e);
  
  if (sheetName === 'Individuals') {
    empLengthUpdateCheck(e);
    indvCheckBoxUpdate(e)
  }
  
  if (sheetName === 'Main') mainCheckBoxUpdate(e);
}

function empLengthUpdateCheck(e) {
  var sheet = e.source.getActiveSheet().getSheetName();
  var col   = e.range.getColumn();
  var row   = e.range.getRow();
  var val   = e.value;
  
  if (col !== driver('mainColumns') + 3 || //Ensure an edit was made on relevant column
    val !== driver('61+') || //Ensure that the relevant value was selected
      e.oldValue === undefined || //Ensure the old value was present. Not relevant otherwise
        e.range.getA1Notation().indexOf(':') !== -1) { return; } //Ensure edit performed on only one cell. Return if any condition not met.
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  if (e.oldValue !== driver('31-60')) {
    var input = ui.alert(driver('61+') + '?', 'You are trying to assign this CA an Employment Length of "' +
                         driver('61+') + '" without them ever being assigned to the "' +
      driver('31-60') + '" group. Is this what you meant to do?', ui.ButtonSet.YES_NO_CANCEL);
    
    if (input !== ui.Button.YES) return e.range.setValue(e.oldValue);
  }
  
  ss.getSheetByName(sheet).getRange(row, 1).clearNote(); 
}

function indvCheckBoxUpdate(e) {
  var sheet = e.source.getActiveSheet();
  var col = e.range.getColumn();
  var teamCol = driver('Include');
  var reqCol = teamCol + 1;
  
  if (col !== reqCol) return;
  
  var val = e.value === 'TRUE';
  var range = sheet.getRange(1, teamCol, sheet.getLastRow()).getValues();
  var row = e.range.getRow();
  var team = range[row - 1][0];
  
  var newVal = singleCheckBoxValidation(team, sheet.getRange(row, reqCol));
  val = newVal === null ? val : newVal;
  
  indvCheckBoxChange(val, team);
}

function indvCheckBoxChange(boxValue, team) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(driver('indvsSheet').sheetName);
  var teamCol = driver('Include');
  
  var range = sheet.getRange(1, teamCol, sheet.getLastRow(), 2).getValues();
  var count = 0;
  
  var teamInfo = range.filter(function (item) {
    return item[0] === team;
  });
  
  var matches = teamInfo.filter(function (item) {
    return item[1] === boxValue;
  });
  
  sheet = ss.getSheetByName(driver('mainSheetName'));
  
  var teamOrder = sheet.getRange(1, 1, driver('numTeams') + 1).getValues().map(function (team) {
    return team[0];
  });
  
  var row = teamOrder.indexOf(team) + 1;
  
  if (row === 0) throw team + ' could not be found on Main sheet';
  
  if ((boxValue && matches.length === 1) || (!boxValue && matches.length === teamInfo.length)) {
    sheet.getRange(row, driver('Include')).setValue(boxValue);
  }
}

function mainCheckBoxUpdate(e) {
  var sheet = e.source.getActiveSheet();
  var col = e.range.getColumn();
  var incCol = driver('Include');
  
  if (col !== incCol) return;
  
  var val = e.value === 'TRUE';
  var row = e.range.getRow();
  var team = sheet.getRange(row, 1).getValue();
  
  var newVal = singleCheckBoxValidation(team, sheet.getRange(row, incCol));
  val = newVal === null ? val : newVal;
  
  mainCheckBoxChange(val, team)
}

function mainCheckBoxChange(boxValue, team) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(driver('indvsSheet').sheetName);
  var range = sheet.getRange(2, driver('Include'), sheet.getLastRow() - 1, 2);
  var values = range.getValues();
  
  values = values.map(function (row) {
    if (row[0] === team) row[1] = boxValue;
    return row;
  });
  
  range.setValues(values);
}
