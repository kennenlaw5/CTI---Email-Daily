function onEdit(e) {
  var sheet = e.source.getSheetName();
  var col   = e.range.getColumn();
  var row   = e.range.getRow();
  var val   = e.value;
  
  if (sheet !== 'Individuals' || //Ensure on correct Sheet
      col !== driver('mainColumns') + 3 || //Ensure an edit was made on relevant column
      val !== driver('61+') || //Ensure that the relevant value was selected
      e.oldValue === undefined || //Ensure the old value was present. Not relevant otherwise
      e.range.getA1Notation().indexOf(':') !== -1) { return; } //Ensure edit performed on only one cell. Return if any condition not met.
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  if (e.oldValue !== driver('31-60')) {
    var input = ui.alert(driver('61+') + '?', 'You are trying to assign this CA an Employment Length of "' +
                         driver('61+') + '" without them ever being assigned to the "' +
                         driver('31-60') + '" group. Is this what you meant to do?', ui.ButtonSet.YES_NO_CANCEL);

    if (input !== ui.Button.YES) { return e.range.setValue(e.oldValue); }
  }
  
  ss.getSheetByName(sheet).getRange(row, 1).clearNote();
}
