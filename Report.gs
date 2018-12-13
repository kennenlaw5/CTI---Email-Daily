function onOpen() {
  //Created By Kennen Lawrence
  //Version 1.3
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addItem('Refresh Report','report').addToUi();
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
function report() {
  //Created By Kennen Lawrence
  //Version 1.1 Corrections made to CA names
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var source1=ss.getSheetByName('Email Report');
  var source3=ss.getSheetByName('BDC Activity Report');
  var target=ss.getSheetByName('Main');
  ss.getSheetByName('Shhhhh....').hideSheet();
  var numRows=source1.getLastRow();
  var numCol=source1.getLastColumn();
  var range1=source1.getRange(1,1,numRows,numCol).getValues();
  numRows=source3.getLastRow();
  numCol=source3.getLastColumn();
  var range3=source3.getRange(1,1,numRows,numCol).getValues();
  var name;var found=false;
  var jeff=[0, 0, 0, 0, 0];var ben=[0, 0, 0, 0, 0];var robb=[0, 0, 0, 0, 0];var dean=[0, 0, 0, 0, 0];
  var portfolio=[0, 0, 0, 0, 0];var seth=[0,0,0,0,0]; var sales = [0, 0, 0, 0, 0]
  
  var tjeff = teamInfo('Jeff');
  var tben = teamInfo('Ben');
  var trobb = teamInfo('Robb');
  var tportfolio = teamInfo('Portfolio');
  var tseth = teamInfo('Seth');
  var tdean = teamInfo('Dean');
  var tsales = teamInfo('Sales');
  
  var teamCA=[tjeff,tben,trobb,tdean,tseth,tportfolio,tsales];
  var teams=[jeff,ben,robb,dean,seth,portfolio,sales];
  for(var i=1;i<range1.length;i++){
    if(range1[i][2]!=''){
      name=range1[i][2];
      found=false;
      for(var j=0;j<teamCA.length;j++){
        for(var k=0;k<teamCA[j].length;k++){
          if(teamCA[j][k]==name){
            if(range1[i][1]=='Sent'){teams[parseInt(j)][1]+=1;}
            else if(range1[i][1]=='Received'){teams[parseInt(j)][3]+=1;}
            k=teamCA[j].length-1;j=teamCA.length-1;found=true;
          }
        }
      }
    }
    else{i=range1.length;}
    //if(found==false){ Logger.log(name + ' was not found!'); }
  }
  for(var i=0;i<range3.length;i++){if(range3[i][0]=='RepName'){numRows=parseInt(i)+1;i=range3.length; /*Logger.log('REPNAME');*/}}
  for(var i=numRows;i<range3.length;i++){
    if(range3[i][0]!=''){
      name=range3[i][0];
      found=false;
      for(var j=0;j<teamCA.length;j++){
        for(var k=0;k<teamCA[j].length;k++){
          if(teamCA[j][k]==name){
            teams[parseInt(j)][2]+=range3[i][12];
            teams[parseInt(j)][0]+=range3[i][8];
            teams[parseInt(j)][4]+=range3[i][5];
            k=teamCA[j].length-1;j=teamCA.length-1;found=true;
          }
        }
      }
    }
    else{i=range3.length;}
    //if(found==false){Logger.log(name);}
  }
  reportInd(range1,range3);
  var d = new Date();
  var timestamp = d.toLocaleTimeString();
  timestamp = timestamp.split(' MDT')[0];
  timestamp = timestamp.split(' MST')[0];
  timestamp = timestamp.split(':');
  timestamp = [timestamp[0], timestamp[1]].join(':') + timestamp[2].split(' ')[1];
  target.getRange(2, 2, driver('numTeams'), driver('mainColumns')-1).setValues(teams);
  target.getRange(driver('numTeams') + 5, 2, 1, 2).setValues([[timestamp, d]]);
  checkBoxValidation();
  ss.toast('Reports have been updated!','Success!');
}
function reportInd(range1,range3) {
  //Created By Kennen Lawrence
  //Version 1.0
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName('Shhhhh....').hideSheet();
  var source1=ss.getSheetByName('Email Report');
  var source3=ss.getSheetByName('BDC Activity Report');
  var target=ss.getSheetByName('Individuals');var numRows;
  var name=[];var found=false;var n=0;
  var jeff = [];var ben = [];var robb = [];var portfolio = [];
  var seth = [];var dean = [];var final = [];
  var sales = []; var type;
  
  var tjeff = teamInfo('Jeff');
  var tben = teamInfo('Ben');
  var trobb = teamInfo('Robb');
  var tportfolio = teamInfo('Portfolio');
  var tseth = teamInfo('Seth');
  var tdean = teamInfo('Dean');
  var tsales = teamInfo('Sales');
  
  var teamCA = [tjeff, tben, trobb, tdean, tseth, tportfolio, tsales];
  var teamFinal = [jeff, ben, robb, dean, seth, portfolio, sales];
  
  var teams=teamInfo('Teams');
  for(var i=0;i<teamCA.length;i++){
    for(var j=0;j<teamCA[i].length;j++){
      name[n]=[teamCA[i][j],0,0,0,0,0,teams[i]];n++;
    }
  }
  for(var i=1;i<range1.length;i++){
    if(range1[i][2]!=''){
      type=range1[i][1];
      found=false;
      if(n!=0){
        for(var j=0;j<name.length;j++){
          if(name[j][0]==range1[i][2]){
            if(type=='Sent'){name[j][1]+=1;}
            else if(type=='Received'){name[j][4]+=1;}
            else{ Logger.log('NOT SENT OR RECEIVED'); }
            found=true;j=name.length;
          }
        }
      }
      if(found==false){
        //Logger.log(name);
        if(type=='Sent'){name[n]=[range1[i][2],1,0,0,0,0,''];}
        else if(type=='Received'){name[n]=[range1[i][2],0,0,0,1,0,''];}
        else{ Logger.log('NOT SENT OR RECEIVED'); }
        found=true;n++;
      }
    }
    else{i=range1.length;}
  }
  for(var i=0;i<range3.length;i++){if(range3[i][0]=='RepName'){numRows=parseInt(i)+1;i=range3.length;}}
  for(var i=numRows;i<range3.length;i++){
    if(range3[i][0]!=''){
      //name=range3[i][0];
      found=false;
      for(var j=0;j<name.length;j++){
        if(name[j][0]==range3[i][0]){
          name[j][3]+=range3[i][12];
          name[j][2]+=range3[i][8];
          name[j][5]+=range3[i][5];
          found=true;j=name.length;
        }
      }
      if(found==false){name[n]=[range3[i][0],0,range3[i][8],range3[i][12],0,range3[i][5],''];found=true;n++;}
    }
    else{i=range3.length;}
    if (found == false){ Logger.log('WUT?'); }
  }
  n=0;
  for(i=0;i<name.length;i++){
    for(var j=0;j<teamCA.length;j++){
      for(var k=0;k<teamCA[j].length;k++){
        if(teamCA[j][k]==name[i][0]){final[n]=name[i];final[n][driver('mainColumns')]=teams[j];k=teamCA[j].length;j=teamCA.length-1;n++;}
      }
    }
  }
  for(i=0;i<teamFinal.length;i++){
    n=0;
    for(j=0;j<final.length;j++){
      if(final[j][driver('mainColumns')]==teams[i]){teamFinal[i][n]=final[j];n++;}
    }
  }
  n=0;
  for(i=0;i<teamFinal.length;i++){
    for(j=0;j<teamFinal[i].length;j++){
      final[n]=teamFinal[i][j];n++;
    }
  }
  target.getRange(2,1,target.getLastRow()-1,driver('Include')).setValue('');
  target.getRange(2,1,final.length,driver('Include')).setValues(final);
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
    if (validations[i][0] == null || validations[i][0].getCriteriaType() != 'CHECKBOX') {
      include = ui.alert('Include ' + teams[i], teams[i] + ' did not have a checkbox validation. Should ' + teams[i] + ' be included right now?', ui.ButtonSet.YES_NO);
      range = main.getRange(i + 2, driver('Include'));
      range.setDataValidation(rule);
      if (include == ui.Button.YES) { range.setValue(true); }
    }
  }
  
  teams = indv.getRange(2, 1, indv.getLastRow() - 1).getValues();
  validations = indv.getRange(2, driver('Include') + 1, indv.getLastRow() - 1).getDataValidations();
  
  for (i = 0; i < validations.length; i++) {
    if (validations[i][0] == null || validations[i][0].getCriteriaType() != 'CHECKBOX') {
      include = ui.alert('Include ' + teams[i], teams[i] + ' did not have a checkbox validation. Should ' + teams[i] + ' be included right now?', ui.ButtonSet.YES_NO);
      range = indv.getRange(i + 2, driver('Include') + 1);
      range.setDataValidation(rule);
      if (include == ui.Button.YES) { range.setValue(true); }
    }
  }
}

function shh(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName('Shhhhh....'));
}
