function driver(input) {
  switch (input) {
    case 'mode':
      var mode = 1; //Mode 1 will send email to all; if number is set to 2, will put up maintanance alert.
      return mode;
      break;
    case 'mainColumns':
      var mainColumns = 6;
      return mainColumns;
      break;
    case 'numTeams':
      var numTeams = 7;
      return numTeams;
      break;
    case 'As of':
      var dateColumn = 9;
      return dateColumn;
      break;
    case 'Include':
      var include_column = 7; //Column on the 'Main' sheet that finds out if a team is included
      return include_column;
      break;
    case 'tableWidth':
      var width = 800; //Width of the table generated and sent
      return width;
      break;
    case '<31':
      return '<31 Days';
      break;
    case '31-60':
      return '31-60 Days';
      break;
    case '61+':
      return '61+ Days';
      break;
    case '31-60 Req':
      return 10;
      break;
    case '61+ Req':
      return 15;
      break;
    case 'emails':
      return [
        ['deanw@schomp.com','Dean','Wentland'],
        ['jeffe@schomp.com','Jeff','Edgell'],
        ['kennen.lawrence@a2zsync.com','Kennen','Lawrence'],
        ['marko@schomp.com','Mark','Osborne']];
      break;
    default:
      Logger.log(input + ' was invalid.');
      break;
  }
}
function teamInfo(team) {
  switch (team) {
    case 'Merrie':
      return ['Chris Castro', 'Ian Hudgens', 'Demitri Gavito', 'Brian Neal', 'Jim Merrell', 'Robin Windhager', 'Dan Fink'];
      break;
    case 'Ben':
      return ['Patrick Quinlan', 'James Pryor', 'Shahin Nia', 'Marlowe Jones', 'Sam Nejad', 'Jeanne Tal', 'Adam Ellison'];
      break;
    case 'Robb':
      return ['Conner Graves', 'Mo Kayeni', 'Jason Hovde', 'Robert Bird', 'Jeff Hanson', 'Troy Roth', 'Stephanie Reese'];
      break;
    case 'Josh':
      return ['Ace Taylor-Brown', 'Andrew Sapoznik', 'Omar Johnson', 'Michael Barrett', 'Alexander Duquette', 'Adam Maxwell', 'Joey Bernier'];
      break;
    case 'Liz':
      return ['Chuck Northrup', 'Christopher Leirer', 'Patrick Stenson', 'Toby Hesketh-Tutton', 'Tina Watson', 'Damir Memisevic', 'Michael Meis'];
      break;
    case 'Portfolio':
      return ['Timothy Green', 'Joshua Ackerman', 'Connor Hanlon'];
      break;
    case 'Sales':
      return ['David Toben', 'Alexa Gerner', 'Thomas Krohn'];
      break;
    case 'Teams':
      return ['Team Merrie', 'Team Ben', 'Team Robb', 'Team Josh', 'Team Liz', 'Team Portfolio', 'Sales Support'];
      break;
    default:
      Logger.log(team+ ' team was invalid');
  }
}
