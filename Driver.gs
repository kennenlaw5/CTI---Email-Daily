function driver(input){
  switch(input){
    case "mode":
      var mode = 1; //Mode 1 will send email to all; if number is set to 2, will put up maintanance alert.
      return mode;
      break;
    case "mainColumns":
      var mainColumns=6;
      return mainColumns;
      break;
    case "numTeams":
      var numTeams=6;
      return numTeams;
      break;
    case "As of":
      var dateColumn=9;
      return dateColumn;
      break;
    case "Include":
      var include=7; //Column on the 'Main' sheet that finds out if a team is included
      return include;
      break;
    case "tableWidth":
      var width=800; //Width of the table generated and sent
      return width;
      break;
    case "<31":
      return "<31 Days";
      break;
    case "31-60":
      return "31-60 Days";
      break;
    case "61+":
      return "61+ Days";
      break;
    default:
      Logger.log(input+" was invalid.");
      break;
  }
}
function teamInfo(team) {
  switch(team){
    case "Jeff":
      return ["Omar Johnson","Jeremy Sanchez","Ian Hudgens","Demitri Gavito"];
      break;
    case "Ben":
      return ["Patrick Quinlan","Tony Moomau","Troy Roth","Willard Lovell","Stephen Giese","Damir Memisevic"];
      break;
    case "Robb":
      return ["Agye Spencer","Jacob Ford","Kathy Powell","Chris Castro","Conner Graves","Steven Nelson","Mo Kayeni"];
      break;
    case "Anna":
      return ["Sam Nejad","Connor Hanlon","Ace Taylor-Brown","Andrew Sapoznik","Erin Vangilder","Wil Lemon"];
      break;
    case "Seth":
      return ["Jeff Hanson","Chuck Northrup","Christopher Leirer","Alexander Duquette","Marlowe Jones","Craig Smeton","Patrick Stenson"];
      break;
    case "Dean":
      return ["Timothy Green", "Joshua Ackerman","Fika Host","Brian Neal"];
      break;
    case "Teams":
      return ["Team Jeff","Team Ben","Team Robb","Team Anna","Team Seth","Team Dean"];
      break;
    default:
      Logger.log(team+ " team was invalid");
  }
}