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
        ['deanw@schomp.com','Mark','Osborne']];
      break;
    default:
      Logger.log(input + ' was invalid.');
      break;
  }
}
function teamInfo(team) {
  switch (team) {
    case 'Jeff':
      return ['Omar Johnson', 'Ian Hudgens', 'Demitri Gavito', 'Michael Barrett'];
      break;
    case 'Ben':
      return ['Patrick Quinlan', 'Troy Roth', 'Damir Memisevic', 'James Pryor', 'Shahin Nia'];
      break;
    case 'Robb':
      return ['Chris Castro', 'Conner Graves', 'Mo Kayeni', 'Jason Hovde', 'Robert Bird'];
      break;
    case 'Dean':
      return ['Sam Nejad', 'Connor Hanlon', 'Ace Taylor-Brown', 'Andrew Sapoznik', 'Jeanne Tal'];
      break;
    case 'Liz':
      return ['Jeff Hanson', 'Chuck Northrup', 'Christopher Leirer', 'Marlowe Jones', 'Alexander Duquette', 'Patrick Stenson', 'Toby Hesketh-Tutton', 'Tina Watson'];
      break;
    case 'Portfolio':
      return ['Timothy Green', 'Joshua Ackerman', 'Fika Host', 'Brian Neal'];
      break;
    case 'Sales':
      return ['David Toben', 'Jeff Capps', 'Alexa Gerner', 'Thomas Krohn'];
      break;
    case 'Teams':
      return ['Team Jeff', 'Team Ben', 'Team Robb', 'Team Dean', 'Team Liz', 'Team Portfolio', 'Sales Support'];
      break;
    default:
      Logger.log(team+ ' team was invalid');
  }
}
