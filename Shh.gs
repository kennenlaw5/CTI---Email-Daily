function onEdit(e) {
  //Created By Kennen Lawrence
  var user=e.range;
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheetName=user.getSheet().getName();
  if(sheetName!="Shhhhh...."){Logger.log("check");return}
  var range=ss.getSheetByName(sheetName).getRange(5,2,3,3);
  if(e.value=="Computer"){boardClear();return}
  if(e.value=="Yes"){boardClear();ss.getSheetByName(sheetName).getRange(2,4).setValue('Clear Board');return}
  var versus=ss.getSheetByName(sheetName).getRange(2,3).getValue();
  var board=range.getValues();
  var empty=true;var count=0;var full=true;
  if(versus!="Computer"){
    Logger.log("PvP");
    var winner=ss.getSheetByName(sheetName).getRange(3,2).getValue();
    if(winner==""){return}
    winner=winner.split(" ");
    winner=winner[1];
    PvP(winner);
    return
  }
  var userC=user.getColumn()-2;
  var userR=user.getRow()-5;
  var aiC=userC;
  var aiR=userR;
  var userTeam=e.value;var aiTeam;
  var userTeamCheck = ss.getSheetByName(sheetName).getRange(1,1).getValue();
  if(userTeam=="X"){aiTeam="O";}else{aiTeam="X";}
  Logger.log(userTeam+" "+aiTeam);
  Logger.log(board[0].length);
  for(var i=0;i<board.length&&count<2;i++){
    for(var j=0;j<board[i].length&&count<2;j++){
      if(board[i][j]!=""){Logger.log("Found");empty=false;count+=1;}
      else{full=false;}
    }
  }
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[i].length;j++){
      if(board[i][j]==""){full=false;}
    }
  }
  if(empty==true){Logger.log("Empty");return}
  Logger.log(count);
  if(count==1){
    while(aiC==userC&&aiR==userR){
      aiC = Math.floor(Math.random() * 3);
      aiR = Math.floor(Math.random() * 3);
    }
    board[aiR][aiC]=aiTeam;
    range.setValues(board);
    ss.getSheetByName(sheetName).getRange(1,1).setValue(userTeam);
    return
  }
  if(userTeam != userTeamCheck){board[aiR][aiC]=userTeam=userTeamCheck;}
  if(userTeam=="X"){aiTeam="O";}else{aiTeam="X";}
  var uTwo=[[0,0],[0,0],[0,0],[0,0]];var aTwo=[[0,0],[0,0],[0,0],[0,0]];
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      if(board[i][j]==userTeam){uTwo[i][0]+=1;}
      if(board[j][i]==userTeam){uTwo[i][1]+=1;}
      if(board[i][j]==aiTeam){aTwo[i][0]+=1;}
      if(board[j][i]==aiTeam){aTwo[i][1]+=1;}
    }
    if(uTwo[i][0]==3||uTwo[i][1]==3){userWon();return}
  }
  for(i=0;i<3;i++){
    if(aTwo[i][0]==2&&uTwo[i][0]==0){for(var k=0;k<3;k++){if(board[i][k]==""){board[i][k]=aiTeam;range.setValues(board);range.getValues();aiWon();return}}}
    if(aTwo[i][1]==2&&uTwo[i][1]==0){for(var k=0;k<3;k++){if(board[k][i]==""){board[k][i]=aiTeam;range.setValues(board);range.getValues();aiWon();return}}}
  }
  j=3;
  for(i=0;i<3;i++){
    j--;
    if(board[i][i]==userTeam){uTwo[3][0]+=1;}
    if(board[i][j]==userTeam){uTwo[3][1]+=1;}
    if(board[i][i]==aiTeam){aTwo[3][0]+=1;}
    if(board[i][j]==aiTeam){aTwo[3][1]+=1;}
  }
  if(uTwo[3][0]==3||uTwo[3][1]==3){userWon();return}
  if(aTwo[3][0]==2&&uTwo[3][0]==0){for(var k=0;k<3;k++){if(board[k][k]==""){board[k][k]=aiTeam;range.setValues(board);range.getValues();aiWon();return}}}
  if(aTwo[3][1]==2&&uTwo[3][1]==0){j=3;for(var k=0;k<3;k++){j--;if(board[k][j]==""){board[k][j]=aiTeam;range.setValues(board);range.getValues();aiWon();return}}}
  if(uTwo[3][0]==2&&aTwo[3][0]==0){Logger.log("Diag");for(var k=0;k<3;k++){if(board[k][k]==""){board[k][k]=aiTeam;range.setValues(board);return}}}
  if(uTwo[3][1]==2&&aTwo[3][1]==0){Logger.log("Diag");j=3;for(var k=0;k<3;k++){j--;if(board[k][j]==""){board[k][j]=aiTeam;range.setValues(board);return}}}
  for(i=0;i<3;i++){
    if(uTwo[i][0]==3||uTwo[i][1]==3){userWon();return}
    if(uTwo[i][0]==2&&aTwo[i][0]==0){Logger.log("Row");for(var k=0;k<3;k++){if(board[i][k]==""){board[i][k]=aiTeam;range.setValues(board);return}}}
    if(uTwo[i][1]==2&&aTwo[i][1]==0){Logger.log("Column");for(var k=0;k<3;k++){if(board[k][i]==""){board[k][i]=aiTeam;range.setValues(board);return}}}
  }
  if(full==true){tieGame();}
  for(i=0;i<3;i++){
    if(uTwo[i][0]==0&&aTwo[i][0]==1){Logger.log("Row");for(var k=0;k<3;k++){if(board[i][k]==""){board[i][k]=aiTeam;range.setValues(board);return}}}
    if(uTwo[i][1]==0&&aTwo[i][1]==1){Logger.log("Column");for(var k=0;k<3;k++){if(board[k][i]==""){board[k][i]=aiTeam;range.setValues(board);return}}}
  }
  if(aTwo[3][0]==1&&uTwo[3][0]==0){for(var k=0;k<3;k++){if(board[k][k]==""){board[k][k]=aiTeam;range.setValues(board);range.getValues();return}}}
  if(aTwo[3][1]==1&&uTwo[3][1]==0){j=3;for(var k=0;k<3;k++){j--;if(board[k][j]==""){board[k][j]=aiTeam;range.setValues(board);range.getValues();return}}}
  return
}
function aiWon(){
  var ui=SpreadsheetApp.getUi();
  ui.alert("You Lost!","The computer has won this match! The board will reset upon closing this notification!",ui.ButtonSet.OK);
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  boardClear();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValues([['','',''],['','',''],['','','']]);
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).getValues();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValue("");
}
function userWon(){
  var ui=SpreadsheetApp.getUi();
  ui.alert("You Won!","You have won this match against the computer! The board will reset upon closing this notification!",ui.ButtonSet.OK);
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValues([['','',''],['','',''],['','','']]);
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).getValues();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValue("");
  boardClear();
}
function tieGame(){
  var ui=SpreadsheetApp.getUi();
  ui.alert("TIE!","You have tied against the computer! The board will reset upon closing this notification!",ui.ButtonSet.OK);
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).getValues();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValues([['','',''],['','',''],['','','']]);
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValue("");
  boardClear();
}
function PvP(winner){
  var ui=SpreadsheetApp.getUi();
  ui.alert("Player "+winner+" won!","Player "+winner+"! You have won this match! The board will reset upon closing this notification!",ui.ButtonSet.OK);
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValues([['','',''],['','',''],['','','']]);
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).getValues();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValue("");
  boardClear();
}
function boardClear(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).getValues();
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValues([['','',''],['','',''],['','','']]);
  ss.getSheetByName("Shhhhh....").getRange(5,2,3,3).setValue("");
}