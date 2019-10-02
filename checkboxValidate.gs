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

      if (input === ui.Button.CLOSE) return false;
      if (input === ui.Button.YES) value = true;

      mainSheet.getRange(i + 2, driver('Include')).setDataValidation(rule).setValue(value);
    }
  }
  
  //Check MTD checkbox
  validations = mainSheet.getRange(6, driver('As of')).getDataValidations();
  
  if (validations[0][0] === null) {
    value = false;
    input = ui.alert('MTD Checkbox', 'No checkbox was found for MTD. Is this report an MTD report?', ui.ButtonSet.YES_NO);
    
    if (input === ui.Button.CLOSE) return false;
    if (input === ui.Button.YES) value = true;
    
    mainSheet.getRange(6, driver('As of')).setDataValidation(rule).setValue(value);
  }
  
  //Check Individuals Sheet
  validations = indvSheet.getRange(2, driver('Include') + 1, indvSheet.getLastRow() - 1).getDataValidations();
  
  for (i = 0; i < validations.length; i++) {
    if (validations[i][0] === null) {
      value = false;
      input = ui.alert(indvSheet.getRange(i + 2, 1).getDisplayValue(), 'No checkbox was found for this CA. Should this CA be included in the report?', ui.ButtonSet.YES_NO);
      
      if (input === ui.Button.CLOSE) return false;
      if (input === ui.Button.YES) value = true;
      
      indvSheet.getRange(i + 2, driver('Include') + 1).setDataValidation(rule).setValue(value);
    }
  }
  
  return true;
}

function checkBoxValidation() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var main = ss.getSheetByName('Main');
  var indv = ss.getSheetByName('Individuals');
  var rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  var validations = main.getRange(2, driver('Include'), driver('numTeams')).getDataValidations();
  var teams = main.getRange(2, 1, driver('numTeams')).getValues();
  var include, range;
  
  for (var i = 0; i < validations.length; i++) {
    if (validations[i][0] === null || validations[i][0].getCriteriaType() != 'CHECKBOX') {
      include = ui.alert('Include ' + teams[i], teams[i] + ' did not have a checkbox validation. Should ' + teams[i] + ' be included right now?', ui.ButtonSet.YES_NO);
      range = main.getRange(i + 2, driver('Include'));
      range.setDataValidation(rule);
      
      if (include === ui.Button.YES) range.setValue(true);
    }
  }
  
  teams = indv.getRange(2, 1, indv.getLastRow() - 1).getValues();
  validations = indv.getRange(2, driver('Include') + 1, indv.getLastRow() - 1).getDataValidations();
  
  for (i = 0; i < validations.length; i++) {
    if (validations[i][0] === null || validations[i][0].getCriteriaType() != 'CHECKBOX') {
      include = ui.alert('Include ' + teams[i], teams[i] + ' did not have a checkbox validation. Should ' + teams[i] + ' be included right now?', ui.ButtonSet.YES_NO);
      range = indv.getRange(i + 2, driver('Include') + 1);
      range.setDataValidation(rule);
      
      if (include === ui.Button.YES) range.setValue(true);
    }
  }
}

function singleCheckBoxValidation(team, range) {
  var ui = SpreadsheetApp.getUi();
  var rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  var validation = range.getDataValidation();
  var include;
  
  if (validation === null || validation.getCriteriaType() != 'CHECKBOX') {
    include = ui.alert('Include ' + team, team + ' did not have a checkbox validation. Should ' + team + ' be included right now?', ui.ButtonSet.YES_NO);
    range.setDataValidation(rule);
    
    if (include !== ui.Button.YES) return false;
    
    range.setValue(true);
    return true;
  }
  
  return null;
}

function shh() {
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName('Shhhhh....'));
}
