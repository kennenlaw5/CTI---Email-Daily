function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone', 'menuItem1').addItem('By Email', 'menuItem2')).addItem('Refresh Report', 'report').addItem('Send Report', 'sendNotification').addToUi();
  ss.getSheetByName('Shhhhh....').hideSheet();
}

function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}

function menuItem2() {
  //Created By Kennen Larence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email Help', 'Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:', ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    MailApp.sendEmail('kennen.lawrence@a2zsync.com', 'HELP CTI & Email Daily', input.getResponseText(), { name:getName() });
  }
}

function reportSafetyCheck() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['BDC', 'CarWars', 'Email'];
  var sheets = {};
  sheets[sheetNames[0]] = ss.getSheetByName('BDC Activity Report');
  sheets[sheetNames[1]] = ss.getSheetByName('CarWars Report');
  sheets[sheetNames[2]] = ss.getSheetByName('Email Report');
  
  for (var i in sheetNames) {
    if (!sheets[sheetNames[i]]) throw 'Warning! Could not locate ' + sheetNames[i] + ' Report sheet!'
  }
  
  return sheets;
}

function report() {
  //Created By Kennen Lawrence
  //Version 1.2 Corrections made to CA names
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var target = ss.getSheetByName('Main');
  ss.getSheetByName('Shhhhh....').hideSheet();
  var sheets = reportSafetyCheck();
  var numRows = sheets.Email.getLastRow();
  var numCol = sheets.Email.getLastColumn();
  var emailRange = sheets.Email.getRange(1, 1, numRows, numCol).getValues();
  numRows = sheets.BDC.getLastRow();
  numCol = sheets.BDC.getLastColumn();
  var bdcRange = sheets.BDC.getRange(1, 1, numRows, numCol).getValues();
  numRows = sheets.CarWars.getLastRow();
  numCol = sheets.CarWars.getLastColumn();
  var carWarsRange = sheets.CarWars.getRange(1, 1, numRows, numCol).getValues();
  var name;
  var cols = {
    name: 0,
    cti: 0,
    texts: 0,
    aptsSet: 0,
    email: 0
  };
  var found = false;
  var bw = [0, 0, 0, 0, 0];
  var ben = [0, 0, 0, 0, 0];
  var loyalty = [0, 0, 0, 0, 0];
  var jeff = [0, 0, 0, 0, 0];
  var ace = [0, 0, 0, 0, 0];
  var trueCar = [0, 0, 0, 0, 0];
  
  var tbw = teamInfo('BW');
  var tben = teamInfo('Ben');
  var tAce = teamInfo('Ace');
  var tjeff = teamInfo('Jeff');
  var tloyalty = teamInfo('Loyalty');
  var ttrueCar = teamInfo('TrueCar');
  
  var teamCA = [tbw, tben, tjeff, tAce, tloyalty, ttrueCar];
  var teams = [bw, ben, jeff, ace, loyalty, trueCar];
  
  var ctiFromBdc = ui.alert('Use CarWars For CTI?',
                            'Would you like to import the CTI values from the CarWars Report? Selecting "No" will use CTI from the BDC Activity Report like usual.',
                            ui.ButtonSet.YES_NO);
  
  if (ctiFromBdc === ui.Button.CLOSE) return;
  
  ctiFromBdc = ctiFromBdc === ui.Button.NO;
  
  // Skim Email range
  cols.name = getReportCol(emailRange, 'Assigned');
  cols.email = getReportCol(emailRange, 'EmailType');
  
  for (var i = 1; i < emailRange.length; i++) {
    if (emailRange[i][cols.name] === '') continue;
    
    name = emailRange[i][cols.name];
    
    for (var j = 0; j < teamCA.length; j++) {
      if (teamCA[j].indexOf(name) === -1) continue;
      
      if (emailRange[i][cols.email] === 'Sent') teams[j][1] ++;
      else if (emailRange[i][cols.email] === 'Received') teams[j][3] ++;
      break;
    }
  }
  
  // BDC skim
  cols.cti = getReportCol(bdcRange, 'RepCallsCTI');
  cols.name = getReportCol(bdcRange, 'RepName');
  cols.texts = getReportCol(bdcRange, 'RepTextSent');
  cols.aptsSet = getReportCol(bdcRange, 'RepApptCreated');
  
  for (i = getBdcStart(bdcRange); i < bdcRange.length; i++) {
    if (bdcRange[i][cols.name] === '') continue;
    
    name = bdcRange[i][cols.name];
    
    for (j = 0; j < teamCA.length; j++) {
      if (teamCA[j].indexOf(name) === -1) continue;
      
      if (ctiFromBdc) teams[j][0] += bdcRange[i][cols.cti]; // Dealersocket CTI
      
      teams[j][2] += bdcRange[i][cols.texts];
      teams[j][4] += bdcRange[i][cols.aptsSet];
      break;
    }
  }
  
  if (!ctiFromBdc) {
    //Car Wars skim
    cols.cti = getReportCol(carWarsRange, 'Unique Outbound');
    cols.name = getReportCol(carWarsRange, 'Agent Name');
    
    for (i = 0; i < carWarsRange.length; i++) {
      if (carWarsRange[i][cols.name] === '') continue;
      
      name = carWarsRange[i][cols.name];
      
      for (j = 0; j < teamCA.length; j++) {
        if (teamCA[j].indexOf(name) === -1) continue;
        
        teams[j][0] += carWarsRange[i][cols.cti];
      }
    }
  }
  
  reportInd(emailRange, bdcRange, carWarsRange, ctiFromBdc);
  
  var d = new Date();
  var timestamp = d.toLocaleTimeString();
  timestamp = timestamp.split(' MDT')[0];
  timestamp = timestamp.split(' MST')[0];
  timestamp = timestamp.split(':');
  timestamp = [timestamp[0], timestamp[1]].join(':') + timestamp[2].split(' ')[1];
  target.getRange(2, 2, driver('numTeams'), driver('mainColumns') - 1).setValues(teams);
  target.getRange(driver('numTeams') + 5, 2, 1, 2).setValues([[timestamp, d]]);
  checkBoxValidation();
  ss.toast('Reports have been updated!', 'Success!');
}

function reportInd (emailRange, bdcRange, carWarsRange, ctiFromBdc) {
  //Created By Kennen Lawrence
  //Version 1.2
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName('Shhhhh....').hideSheet();
  var target = ss.getSheetByName('Individuals');
  var numRows;
  var name = [];
  var found = false;
  var n = 0;
  var bw = [];
  var ben = [];
  var loyalty = [];
  var jeff = [];
  var ace = [];
  var trueCar = [];
  var final = [];
  var type;
  
  var cols = {
    name: 0,
    cti: 0,
    texts: 0,
    aptsSet: 0,
    email: 0
  };
  
  var teams = teamInfo('Teams');
  var tbw = teamInfo('BW');
  var tben = teamInfo('Ben');
  var tAce = teamInfo('Ace');
  var tjeff = teamInfo('Jeff');
  var tloyalty = teamInfo('Loyalty');
  var ttrueCar = teamInfo('TrueCar');
  
  var teamCA = [tbw, tben, tjeff, tAce, tloyalty, ttrueCar];
  var teamFinal = [bw, ben, jeff, ace, loyalty, trueCar];
  
  for (var i = 0; i < teamCA.length; i++) {
    for (var j = 0; j < teamCA[i].length; j++) {
      name[n] = [teamCA[i][j], 0, 0, 0, 0, 0, teams[i]];
      n++;
    }
  }
  
  //Skim email range
  cols.name = getReportCol(emailRange, 'Assigned');
  cols.email = getReportCol(emailRange, 'EmailType');
  
  for (i = 1; i < emailRange.length; i++) {
    if (emailRange[i][cols.name] === '') continue;
    
    type = emailRange[i][cols.email];
    found = false;
    
    if (n !== 0) {
      for (j = 0; j < name.length; j++) {
        if (name[j][0] == emailRange[i][cols.name]) {
          if (type === 'Sent') name[j][1]++;
          else if (type === 'Received') name[j][4]++;
          
          found = true; 
          break;
        }
      }
    }
    
    if (!found) {
      name[n] = [emailRange[i][2], 0, 0, 0, 0, 0, ''];
      
      if (type == 'Sent') name[n][1]++;
      else if (type == 'Received') name[n][4]++;
      
      n++;
    }
  }
  
  // Skim BDC range
  cols.cti = getReportCol(bdcRange, 'RepCallsCTI');
  cols.name = getReportCol(bdcRange, 'RepName');
  cols.texts = getReportCol(bdcRange, 'RepTextSent');
  cols.aptsSet = getReportCol(bdcRange, 'RepApptCreated');
  
  for (i = getBdcStart(bdcRange); i < bdcRange.length; i++) {
    if (bdcRange[i][cols.name] === '') continue;
    
    found = false;
    
    for (j = 0; j < name.length; j++) {
      if (name[j][0] == bdcRange[i][cols.name]) {
        if (ctiFromBdc) name[j][2] += bdcRange[i][cols.cti]; // BDC Cti
        
        name[j][3] += bdcRange[i][cols.texts];
        name[j][5] += bdcRange[i][cols.aptsSet];
        found = true;
        break;
      }
    }
    
    if (!found) {
      name[n] = [bdcRange[i][cols.name], 0, 0, bdcRange[i][cols.texts], 0, bdcRange[i][cols.aptsSet], ''];
      
      if (ctiFromBdc) name[n][2] = bdcRange[i][cols.cti];
      n++;
    }
  }
  
  if (!ctiFromBdc) {
    // Skim CarWars Range
    cols.cti = getReportCol(carWarsRange, 'Unique Outbound');
    cols.name = getReportCol(carWarsRange, 'Agent Name');
    
    for (i = 0; i < carWarsRange.length; i++) {
      if (carWarsRange[i][cols.name] === '') continue;
      
      found = false;
      
      for (j = 0; j < name.length; j++) {
        if (name[j][0] == carWarsRange[i][cols.name]) {
          name[j][2] += carWarsRange[i][cols.cti];
          found = true;
          break;
        }
      }
      
      if (!found) {
        name[n] = [carWarsRange[i][cols.name], 0, carWarsRange[i][cols.cti], 0, 0, 0, ''];
        n++;
      }
    }
  }
  
  n = 0;
  for (i = 0; i < name.length; i++) {
    for (j = 0; j < teamCA.length; j++) {
      if (teamCA[j].indexOf(name[i][0]) === -1) continue;
      
      final[n] = name[i];
      final[n][driver('mainColumns')] = teams[j];
      n++;
      break;
    }
  }
  
  for (i = 0; i < teamFinal.length; i++) {
    n = 0;
    
    for (j = 0; j < final.length; j++) {
      if (final[j][driver('mainColumns')] == teams[i]) {
        teamFinal[i][n] = final[j];
        n++;
      }
    }
  }
  
  n = 0;
  for (i = 0; i < teamFinal.length; i++) {
    for (j = 0; j < teamFinal[i].length; j++) {
      final[n] = teamFinal[i][j]
      n++;
    }
  }
  
  target.getRange(2, 1, target.getLastRow() - 1, driver('Include')).setValue('');
  target.getRange(2, 1, final.length, driver('Include')).setValues(final);
}

// Get start row for BDC range
function getBdcStart(bdcRange) {
  for (var i = 0; i < bdcRange.length; i++) {
    if (bdcRange[i][0] === 'RepName') {
      return i + 1;
    }
  }
}

// Get Unique Outbound col for CarWars report
function getReportCol(range, colName) {
  for (var i = 0; i < range.length; i++) {
    if (range[i].indexOf(colName) === -1) continue;
    
    return range[i].indexOf(colName);
  }
}
