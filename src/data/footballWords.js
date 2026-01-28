// Base de datos de fútbol para Modo Fútbol
// 100 jugadores muy conocidos (actuales + leyendas retiradas)
// 40 equipos de fútbol muy conocidos (clubes)

export const footballWords = {
  players: [
    // Leyendas retiradas
    'Pelé', 'Diego Maradona', 'Johan Cruyff', 'Franz Beckenbauer', 'Alfredo Di Stéfano',
    'Ferenc Puskás', 'Garrincha', 'Zinedine Zidane', 'Ronaldo Nazário', 'Ronaldinho',
    'Thierry Henry', 'Dennis Bergkamp', 'Roberto Baggio', 'Paolo Maldini', 'Franco Baresi',
    'Alessandro Del Piero', 'Francesco Totti', 'Raúl González', 'Iker Casillas', 'Carles Puyol',
    'Xavi Hernández', 'Andrés Iniesta', 'David Beckham', 'Ryan Giggs', 'Paul Scholes',
    'Steven Gerrard', 'Frank Lampard', 'John Terry', 'Didier Drogba', 'Samuel Eto\'o',
    'Rivaldo', 'Rui Costa', 'Luis Figo', 'Michael Ballack', 'Oliver Kahn',
    'Fabio Cannavaro', 'Alessandro Nesta', 'Gianluigi Buffon', 'Andrea Pirlo', 'Clarence Seedorf',
    
    // Actuales super conocidos
    'Lionel Messi', 'Cristiano Ronaldo', 'Kylian Mbappé', 'Erling Haaland', 'Karim Benzema',
    'Robert Lewandowski', 'Mohamed Salah', 'Sadio Mané', 'Kevin De Bruyne', 'Luka Modrić',
    'Virgil van Dijk', 'Sergio Ramos', 'Manuel Neuer', 'Thibaut Courtois', 'Alisson Becker',
    'Ederson', 'Marc-André ter Stegen', 'Jan Oblak', 'Gianluigi Donnarumma', 'David de Gea',
    'Neymar', 'Vinicius Junior', 'Jude Bellingham', 'Phil Foden',
    'Bukayo Saka', 'Jamal Musiala', 'Pedri', 'Gavi', 'Federico Valverde',
    'Rodri', 'Declan Rice', 'Enzo Fernández', 'Aurélien Tchouaméni', 'Eduardo Camavinga',
    'Antoine Griezmann', 'Olivier Giroud', 'Harry Kane', 'Son Heung-min', 'Romelu Lukaku',
    'Lautaro Martínez', 'Ángel Di María', 'Paulo Dybala', 'Federico Chiesa', 'Nicolò Barella',
    'Marco Verratti', 'Marquinhos', 'Thiago Silva', 'Raphaël Varane', 'Aymeric Laporte',
    'Rúben Dias', 'João Cancelo', 'Trent Alexander-Arnold', 'Andrew Robertson', 'Alphonso Davies',
    'Achraf Hakimi', 'Theo Hernández', 'Jordi Alba', 'Dani Carvajal', 'Kyle Walker',
    'Bernardo Silva', 'Bruno Fernandes', 'Mason Mount', 'Jack Grealish', 'Raheem Sterling',
    'Gabriel Jesus', 'Richarlison', 'Raphinha', 'Rodrygo',
    'Ousmane Dembélé', 'Kingsley Coman', 'Serge Gnabry', 'Leroy Sané', 'Christopher Nkunku'
  ],
  
  teams: [
    // España
    'Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Sevilla FC', 'Valencia CF',
    'Villarreal CF', 'Real Sociedad', 'Athletic Club', 'Real Betis', 'Espanyol',
    
    // Inglaterra
    'Manchester United', 'Manchester City', 'Liverpool FC', 'Chelsea FC', 'Arsenal FC',
    'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'Brighton & Hove Albion', 'West Ham United',
    
    // Italia
    'Juventus', 'AC Milan', 'Inter de Milán', 'AS Roma', 'Napoli',
    'Atalanta', 'Lazio', 'Fiorentina', 'Torino',
    
    // Alemania
    'Bayern Múnich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt',
    
    // Francia
    'Paris Saint-Germain', 'Olympique de Marseille', 'AS Monaco', 'Olympique Lyon', 'Lille OSC',
    
    // Otros países
    'Ajax Ámsterdam', 'PSV Eindhoven', 'FC Porto', 'Benfica', 'Sporting CP',
    'Celtic FC', 'Rangers FC', 'Galatasaray', 'Fenerbahçe', 'Besiktas'
  ]
}

// Lista combinada de todas las palabras de fútbol
export const footballAllWords = [
  ...footballWords.players,
  ...footballWords.teams
]

// Función para obtener una palabra aleatoria de fútbol
export function getRandomFootballWord() {
  const randomIndex = Math.floor(Math.random() * footballAllWords.length)
  return footballAllWords[randomIndex]
}

// Función para obtener todas las palabras de fútbol
export function getAllFootballWords() {
  return footballAllWords
}

