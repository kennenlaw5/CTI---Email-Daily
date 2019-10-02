function driver(input) {
  switch (input) {
    case 'mode' : return 1; // 1 will send email to all; if number is set to 2, will put up maintenance alert.

    case 'mainColumns' : return 6;

    case 'numTeams' : return teamInfo('Teams').length;

    case 'As of' : return 9;

    case 'Include' : return 7; // Column on the 'Main' sheet that finds out if a team is included

    case '<31' : return '<31 Days';

    case '31-60' : return '31-60 Days';

    case '61+' : return '61+ Days';

    case '31-60 Req' : return 10;

    case '61+ Req' : return 15;

    case 'emails':
      return [
        ['deanw@schomp.com', 'Dean', 'Wentland'],
        ['jeffe@schomp.com', 'Jeff', 'Edgell'],
        ['kennen.lawrence@a2zsync.com', 'Kennen', 'Lawrence'],
        ['marko@schomp.com', 'Mark', 'Osborne']
      ];

    default:
      throw (input + ' is an invalid entry for driver()');
  }
}

function teamInfo(team) {
  switch (team) {
    case 'BW':
      return ['Ian Hudgens', 'Austin Hornick', 'Nathan Stock', 'Jeremy King', 'Tatiana Bourey', 'Andrien Franklin'];

    case 'Ben':
      return ['Shahin Nia', 'Sam Nejad', 'Bob Sumrall', 'Tony Moomau', 'Jeff Hanson', 'Eric Graves'];

    case 'Josh':
      return ['Andrew Sapoznik', 'Michael Barrett', 'Adam Maxwell', 'Derrik Blackmore', 'Daniel Day', 'Max Faulkner'];
      
    case 'Ace':
      return ['Patrick Stenson', 'Tina Watson', 'Michael Meis', 'Nick Majka', 'Jonathan Fuller'];
      
    case 'Matt':
      return ['Joshua Ackerman', 'Connor Hanlon', 'Brian Neal', 'Christopher Leirer', 'Timothy Green', 'Jeff Hayzlett', 'Alexander Duquette'];
      
    case 'Teams':
      return ['Team BW', 'Team Ben', 'Team Josh', 'Team Ace', 'Team Matt'];

    default:
      throw (team + ' is an invalid entry for teamInfo()');
  }
}
