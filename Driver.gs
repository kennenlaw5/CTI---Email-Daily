function driver(input) {
  switch (input) {
    case 'mode' : return 1; // 1 will send email to all; if number is set to 2, will put up maintenance alert.

    case 'mainColumns' : return 6;

    case 'numTeams' : return 6;

    case 'As of' : return 9;

    case 'Include' : return 7; // Column on the 'Main' sheet that finds out if a team is included

    case '<31' : return '<31 Days';

    case '31-60' : return '31-60 Days';

    case '61+' : return '61+ Days';

    case '31-60 Req' : return 20;

    case '61+ Req' : return 30;

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
    case 'Merrie':
      return ['Ian Hudgens', 'Tony Moomau', 'Daniel Fink', 'Austin Hornick', 'Nathan Stock'];

    case 'Ben':
      return ['Patrick Quinlan', 'James Pryor', 'Shahin Nia', 'Sam Nejad', 'Adam Ellison', 'Bob Sumrall'];

    case 'Liz':
      return ['Jim Merrell', 'Conner Graves', 'Jeff Hanson', 'Troy Roth', 'Andrien Franklin', 'Robb Ashby'];

    case 'Josh':
      return ['Andrew Sapoznik', 'Michael Barrett', 'Alexander Duquette', 'Adam Maxwell', 'Annie Bennett', 'Derrik Blackmore'];

    case 'Ace':
      return ['Patrick Stenson', 'Toby Hesketh-Tutton', 'Tina Watson', 'Damir Memisevic', 'Michael Meis'];

    case 'Portfolio':
      return ['Timothy Green', 'Joshua Ackerman', 'Connor Hanlon', 'Brian Neal', 'Christopher Leirer', 'Jeff Hayzlett'];

    case 'Teams':
      return ['Team Merrie', 'Team Ben', 'Team Liz', 'Team Josh', 'Team Ace', 'Team Portfolio'];

    default:
      throw (team + ' is an invalid entry for teamInfo()');
  }
}
