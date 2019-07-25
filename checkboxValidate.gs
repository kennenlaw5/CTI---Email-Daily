function checkValidation() {
  var ss          = SpreadsheetApp.getActiveSpreadsheet();
  var ui          = SpreadsheetApp.getUi();
  var mainSheet   = ss.getSheetByName('Main');
  var indvSheet   = ss.getSheetByName('Individuals');
  var rule        = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  var validations = mainSheet.getRange(2, driver('Include'), driver('numTeams')).getDataValidations();
  var input, value;

  for (var i = 0; i < validations.length; i++) {
    if (validations[i][0] == null) {
      value = false;
      input = ui.alert(mainSheet.getRange(i + 2, 1).getDisplayValue(),
          'No checkbox was found in this team. Should this team be included in the report?',
          ui.ButtonSet.YES_NO);

      if (input === ui.Button.YES) { value = true; }
      else if (input === ui.Button.CLOSE) { return false; }

      mainSheet.getRange(i + 2, driver('Include')).setDataValidation(rule).setValue(value);
    }
  }
  
  //Check MTD checkbox
  validations = mainSheet.getRange(6, driver('As of')).getDataValidations();
  
  if (validations[0][0] == null) {
    value = false;
    input = ui.alert('MTD Checkbox', 'No checkbox was found for MTD. Is this report an MTD report?', ui.ButtonSet.YES_NO);
    if (input === ui.Button.YES) { value = true; }
    else if (input === ui.Button.CLOSE) { return false;  }
    mainSheet.getRange(6, driver('As of')).setDataValidation(rule).setValue(value);
  }
  
  //Check Individuals Sheet
  validations = indvSheet.getRange(2, driver('Include') + 1, indvSheet.getLastRow() - 1).getDataValidations();
  
  for (i = 0; i < validations.length; i++) {
    if (validations[i][0] == null) {
      value = false;
      input = ui.alert(indvSheet.getRange(i + 2, 1).getDisplayValue(), 'No checkbox was found for this CA. Should this CA be included in the report?', ui.ButtonSet.YES_NO);
      if (input === ui.Button.YES) { value = true; }
      else if (input === ui.Button.CLOSE) { return false;  }
      indvSheet.getRange(i + 2, driver('Include') + 1).setDataValidation(rule).setValue(value);
    }
  }
  
  return true;
}
