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

    case '31-60 Req' : return {
      regular: {
        cti: 10,
        email: 20,
        text: 20,
      },
      saturday: {
        cti: 10,
        email: 20,
        text: 20,
      },
    };

    case '61+ Req' : return {
      regular: {
        cti: 10,
        email: 20,
        text: 20,
      },
      saturday: {
        cti: 10,
        email: 20,
        text: 20,
      },
    };
      
    case 'mainSheetName' : return 'Main';

    case 'indvsSheet' : return {
      sheetName: 'Individuals',
      // Column #'s are not 0 indexed
      columns: {
        caName: 1,
        emailsOut: 2,
        cti: 3,
        texts: 4,
        emailsIn: 5,
        setAppts: 6,
        team: 7,
        include: 8,
        emplLength: 9,
      },
    };
      
    case 'indvSheetName' : return 'Individuals';

    case 'emails':
      return [
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
      return ['Ian Hudgens', 'Nathan Stock', 'Jeremy King', 'Tatiana Bourey', 'Andrien Franklin', 'Sean Kelsen', 'Daniel Clingman', 'Christian Harris'];

    case 'Ben':
      return ['Shahin Nia', 'Sam Nejad', 'Bob Sumrall', 'Tony Moomau', 'Jeff Hanson', 'Eric Graves', 'Kamran Janamian', 'Carla Strombitski'];

    case 'Jeff':
      return ['Andrew Sapoznik', 'Michael Barrett', 'Derrik Blackmore', 'Calvin Lasater', 'Alexander Clark'];
      
    case 'Ace':
      return ['Tina Watson', 'Nick Majka', 'Jonathan Fuller', 'Ron Hannon', 'Jesus Samaniego', 'Brendan Clarke', 'Jacob Boyce'];
      
    case 'Loyalty':
      return ['Joshua Ackerman', 'Connor Hanlon', 'Brian Neal', 'Christopher Leirer', 'Timothy Green', 'Alexander Duquette'];
      
    case 'TrueCar':
      return ['Vicki Holmstedt'];
      
    case 'Teams':
      return ['Team BW', 'Team Ben', 'Team Jeff', 'Team Ace', 'Team Loyalty', 'Team TrueCar'];

    default:
      throw (team + ' is an invalid entry for teamInfo()');
  }
}
