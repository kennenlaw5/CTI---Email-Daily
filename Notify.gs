function sendNotification() {
  //Created By Kennen Lawrence
  //Version 1.2.1 (Added function to generate user's name)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ss.getSheetByName("Shhhhh....").hideSheet();
  report();
  var mode=driver("mode"); //Mode 1 will send email to all; if number is set to 2, will put up maintanance alert.
  if(mode==2){ //Create maintanance prompt and allow for overide
    var overide=ui.prompt('Under Maintanance!','Down for maintanance! Will be up again shortly! :D',ui.ButtonSet.OK);
    if(overide.getResponseText().toLowerCase()!='overide'){return;}
  }
  var input=ui.alert("Are you sure you'd like to send the notification?",ui.ButtonSet.YES_NO);
  if(input==ui.Button.YES){
    //Start of main script
    var sheet=ss.getSheetByName("Main");
    var sheet2=ss.getSheetByName("Recipients");
    var indvSheet=ss.getSheetByName("Individuals");
    var ranger=sheet2.getRange(1,mode,sheet2.getLastRow()).getDisplayValues();
    var range=indvSheet.getRange(2,1,indvSheet.getLastRow()-1,driver("mainColumns")+1).getValues(); /*Gets values from "Main" sheet Ends on column before "Include" column*/
    var info=sheet.getRange(1,driver("As of"),3,1).getDisplayValues(); /*Gets 'Date' and 'As Of' values*/
    var includeIndv=indvSheet.getRange(2,driver("Include"),indvSheet.getLastRow()-1,3).getValues();
    var day=info[0][0];var asOf=info[2][0];
    if(day.split(" ")[0]=="Saturday"){
      Logger.log("It's Saturday");
      for(var i=0;i<includeIndv.length;i++){
        if(includeIndv[i][2]!=driver("<31")){includeIndv[i][2]=driver("31-60");}
      }
    }
    var subject = "Outbound Activity - "+day;
    var sender=getName();
    var body;var recipients="";var check=false;
    var cti=[];var emails=[];var texts=[];var recv=[];var appts=[];
    var teams=teamInfo("Teams");
    for(var i=0;i<teams.length;i++){
      cti[i]=emails[i]=texts[i]=recv[i]=appts[i]=0;
    }
    for(var j=0;j<teams.length;j++){
      for(var i=0;i<range.length;i++){
        if(includeIndv[i][1]=="Yes" && range[i][driver("mainColumns")]==teams[j] && includeIndv[i][2]!=driver("<31")){
          cti[j]+=range[i][2];
          emails[j]+=range[i][1];
          texts[j]+=range[i][3];
          recv[j]+=range[i][4];
          appts[j]+=range[i][5];
        }
      }
    }
    body=bodyGen(cti,emails,texts,recv,asOf,day,appts,includeIndv);
    if(body=="NONE"){check=false;}
    else{check=true;}
    for(var i=0;i<ranger.length;i++){
      if(ranger[i][0]!=""&&i<ranger.length-1){recipients+=ranger[i][0]+",";}
      else if(ranger[i][0]!=""&&i==ranger.length-1){recipients+=ranger[i][0];}
      else{i=ranger.length;}
    }
    var bodyPlain=body.replace(/\<br\/\>/gi, '\n').replace(/(<([^>]+)>)/ig, "");
    if(check==true){
      MailApp.sendEmail(recipients, subject, bodyPlain,{htmlBody:body,name:sender});
      var d=new Date();
      var timestamp = d.toLocaleTimeString();
      timestamp=timestamp.split(" MDT");
      timestamp=timestamp[0];
      if(mode!=2){sheet.getRange(9,driver("As of")-1,1,2).setValues([[timestamp,d]]);}
      ss.getSheetByName("Main").getRange(2,driver("Include"),driver("numTeams")).setValue("Yes");
      ss.toast('Email notification has been sent!','Success!');
      if(asOf=="End of day" && mode!=2){caQuota();}
    }
    else{ui.alert('At least ONE team MUST be included in order to send the email! Please include a team, then try again!',ui.ButtonSet.OK);}
  }else{ss.toast('Action was cancelled! Email was not sent!','Cancelled');}
}
function bodyGen(iCti,iEmails,iTexts,iRecv,asOf,day,iAppts,includeIndv){
  //Created By Kennen Lawrence
  //Version 3.1
  Logger.log("START OF bodyGen!!!");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui=SpreadsheetApp.getUi();
  ss.getSheetByName("Shhhhh....").hideSheet();
  var sheet=ss.getSheetByName("Individuals");
  var prompt='Type any notes you would like added below, or leave the box blank if you have none! Then press "OK" to continue! \n'
            +'------------------------------------------------------------------------------------------------------------------------------------------------------------';
  var rawNotes=ui.prompt('Notes:',prompt,ui.ButtonSet.OK);
  var notes=rawNotes.getResponseText()+"";
  var include=ss.getSheetByName("Main").getRange(2,driver("Include"),driver("numTeams")).getValues();
  var range=sheet.getRange(2,1,sheet.getLastRow()-1,driver("Include")).getValues();
  var body='<HTML><BODY><font size="5" color="black">Outbound Activity as of - '+asOf+' '+day+'</font><br/><br/>';
  if(notes!=""){body+='<font size="3" color="black"><u>'+notes+'</u></font><br/><br/>';}
  var teams=teamInfo("Teams");
  var tjeff=teamInfo("Jeff/Anna");//Count 10
  var tben=teamInfo("Ben/Mark");//Count 10
  var trobb=teamInfo("Robb/Seth");//Count 11
  var tdean=teamInfo("Dean/Liz");//Count 2
  var teamCA=[tjeff,tben,trobb,tdean];
  body+="<table border='1' color='black',cellpadding='10',cellspacing ='0', width ='"+driver("tableWidth")+"'>";
  var cti;
  var emails;var font;var color="black";
  var texts;
  var check=false;
  var currentReq;
  var teamCount=[];//Array for team counts
  for(var i=0;i<teams.length;i++){teamCount[i]=0;}//Loop to inititalize teamCount array based off of the number of teams
  for(var i=0;i<includeIndv.length;i++){ //Loop to determine active team count
    for(var j=0;j<teams.length;j++){
      if(includeIndv[i][0]==teams[j] && includeIndv[i][1]=="Yes" && includeIndv[i][2]==driver("61+")){teamCount[j]+=15;}
      else if(includeIndv[i][0]==teams[j] && includeIndv[i][1]=="Yes" && includeIndv[i][2]==driver("31-60")){teamCount[j]+=10;}
    }
  }
  for(var i=0;i<teams.length;i++){
    if(include[i][0]=="Yes" && teamCount[i]>0){
      //Calculate weighted average
      var preTotal=[];
      if(iCti[i]/teamCount[i]>1){preTotal[0]=1;}else{preTotal[0]=iCti[i]/teamCount[i];}
      if(iEmails[i]/teamCount[i]>1){preTotal[1]=1;}else{preTotal[1]=iEmails[i]/teamCount[i];}
      if(iTexts[i]/teamCount[i]>1){preTotal[2]=1;}else{preTotal[2]=iTexts[i]/teamCount[i];}
      var total;
      if(preTotal[0]==1&&preTotal[1]==1&&preTotal[2]==1){total=100;}
      else if(preTotal[0]+preTotal[1]+preTotal[2]>=2.98){total=99.49;}
      else{total=(((preTotal[0])*(1/3))+((preTotal[1])*(1/3))+((preTotal[2])*(1/3)))*100;}
      if(total<100){if(total>50){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
      Logger.log(teams[i]+": "+(preTotal[0]+preTotal[1]+preTotal[2]));
      body+="<tr><th colspan='6' bgcolor='"+font+"'><font size='5' color='"+color+"'><b><u>"+teams[i]+": "+Math.round(total)+"% of Total Outbound Completed</u></b></font></th></tr>";
      body+="<td bgcolor = 'white', Align = 'center'><font size='4' color='black'><b>CA:</b></font></td>";
      
      if(iCti[i]/teamCount[i]<1){if(iCti[i]/teamCount[i]>0.7){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
      
      body+="<td bgcolor = '"+font+"', Align = 'center'><font size='4' color='"+color+"'><b>CTI: "+iCti[i]+"/"+teamCount[i]+"</b></font></td>";
      
      if(iEmails[i]/teamCount[i]<1){if(iEmails[i]/teamCount[i]>0.7){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
      
      body+="<td bgcolor = '"+font+"', Align = 'center'><font size='4' color='"+color+"'><b>Email Out: "+iEmails[i]+"/"+teamCount[i]+"</b></font></td>";
      
      if(iTexts[i]/teamCount[i]<1){if(iTexts[i]/teamCount[i]>0.7){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
      
      body+="<td bgcolor = '"+font+"', Align = 'center'><font size='4' color='"+color+"'><b>Texts: "+iTexts[i]+"/"+teamCount[i]+"</b></font></td>";
      body+="<td bgcolor = 'white', Align = 'center'><font size='4' color='black'><b>Email In: "+iRecv[i]+"</b></font></td>";
      body+="<td bgcolor = 'white', Align = 'center'><font size='4' color='black'><b>Set Appt: "+iAppts[i]+"</b></font></td>";
      for(var j=0;j<range.length;j++){
        if(range[j][driver("mainColumns")]==teams[i] && includeIndv[j][1]=="Yes"){
          if(includeIndv[j][2]==driver("31-60")){currentReq=10;}else if(includeIndv[j][2]==driver("61+")){currentReq=15;}
          if(includeIndv[j][2]!=driver("<31")){
            body+="<tr><td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][0]+"</font></td>";
            if(range[j][2]<currentReq){if(range[j][2]>0.7*currentReq){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
            body+="<td bgcolor = '"+font+"', Align = 'center'><font size='3' color='"+color+"'>"+range[j][2]+"/"+currentReq+"</font></td>";
            if(range[j][1]<currentReq){if(range[j][1]>0.7*currentReq){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
            body+="<td bgcolor = '"+font+"', Align = 'center'><font size='3' color='"+color+"'>"+range[j][1]+"/"+currentReq+"</font></td>";
            if(range[j][3]<currentReq){if(range[j][3]>0.7*currentReq){font="#EEEE16";color="black";}else{font="#FB3333";color="black";}}else{font="#11E31B";color="black";}
            body+="<td bgcolor = '"+font+"', Align = 'center'><font size='3' color='"+color+"'>"+range[j][3]+"/"+currentReq+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][4]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][5]+"</font></td></tr>";
          }
          else{
            body+="<tr><td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][0]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][2]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][1]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][3]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][4]+"</font></td>";
            body+="<td bgcolor = 'white', Align = 'center'><font size='3' color='black'>"+range[j][5]+"</font></td></tr>";
          }
        }
      }
      check=true;
    }
    else{Logger.log("Skip");}
  }
  Logger.log(cti);
  Logger.log("END OF bodyGen!!!");
  if(check==true){return body+"</table>"}
  else{return "NONE"}
}

function quotaCheck(){
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
}
function getName(){
  //Created By Kennen Lawrence
  //Version 1.0
  var email = Session.getActiveUser().getEmail();
  var name;var first;var last;
  name = email.split("@schomp.com");
  name=name[0];
  name=name.split(".");
  first=name[0];
  last=name[1];
  first= first[0].toUpperCase() + first.substring(1);
  last=last[0].toUpperCase() + last.substring(1);
  name=first+" "+last;
  Logger.log(name);
  return name;
}
function caQuota(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheet=ss.getSheetByName("Individuals");
  var range=sheet.getRange(2,1,sheet.getLastRow()-1);
  var values=range.getValues();
  var include=sheet.getRange(2,driver("Include")+1,sheet.getLastRow()-1).getValues();
  var target=ss.getSheetByName("Requirements");
  ss.deleteSheet(target);
  ss.getSheetByName("Requirements Master").copyTo(ss).setName("Requirements");
  target=ss.getSheetByName("Requirements");
  target.getRange(2,1,values.length).setValues(values);
  var req = target.getRange(2,2,target.getLastRow()-1,4).getDisplayValues();
  var count;
  for(var i=0;i<values.length;i++){
    count=0;
    for(var j=0;j<req[i].length;j++){
      if(req[i][j]!=""){
        count+=parseInt(req[i][j]);
      }
    }
    if(count>0 && include[i][0]=="Yes"){req[i][3]="No";}
    else if(include[i][0]=="No"){req[i][3]="OFF";}else{req[i][3]="";}
  }
  target.getRange(2,2,target.getLastRow()-1,4).setValues(req);
  target.showSheet();
  sheet.getRange(2,driver("Include")+1,values.length).setValue("Yes");
  ss.setActiveSheet(target);
  ss.moveActiveSheet(3);
  ss.setActiveSheet(ss.getSheetByName("Main"));
}