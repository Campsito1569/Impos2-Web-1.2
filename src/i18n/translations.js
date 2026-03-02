export const translations = {
  es: {
    // Home
    home: {
      title: "¿Quién es el impostor?",
      subtitle: "El juego de deducción entre amigos",
      description: "Descubre al impostor entre tus amigos. Un jugador (o varios) no conoce la palabra secreta y debe pasar desapercibido mientras los demás intentan descubrirlo.",
      startGame: "COMENZAR PARTIDA"
    },
    // Mode Select
    modeSelect: {
      title: "Selecciona el Modo de Juego",
      manual: {
        title: "Modo Manual",
        description: "Una persona externa escribe UNA palabra secreta al iniciar cada partida. Ideal para mayor control sobre las palabras."
      },
      semiManual: {
        title: "Modo Semi-Manual",
        description: "Permite agregar VARIAS palabras de golpe (una por línea o separadas por comas). Se crea un pool de palabras que se usa aleatoriamente sin repetir."
      },
      database: {
        title: "Modo Base de Datos",
        description: "Base de datos local con ~1000 palabras MUY conocidas. Categorías: Países, Famosos, Animales, Objetos, Acciones y Lugares."
      },
      football: {
        title: "Modo Fútbol",
        description: "Juega con una base de datos de fútbol (jugadores y equipos famosos)."
      },
      back: "Volver",
      continue: "Continuar"
    },
    // Players
    players: {
      title: "Gestión de Jugadores",
      impostorCount: "Cantidad de Impostores",
      impostorCountHint: "Puedes tener hasta {count} impostor{plural}",
      playersList: "Jugadores",
      addPlayer: "+ Agregar Jugador",
      back: "Volver",
      continue: "Continuar",
      minPlayers: "Necesitas al menos 3 jugadores para comenzar.",
      duplicateNames: "No puede haber jugadores con el mismo nombre.",
      tooManyImpostors: "No puede haber más o igual cantidad de impostores que jugadores."
    },
    // Word Setup
    wordSetup: {
      manual: {
        title: "Palabra Secreta",
        label: "Ingresa la palabra secreta para esta partida",
        placeholder: "Escribe la palabra...",
        required: "Debes ingresar una palabra secreta."
      },
      semiManual: {
        title: "Pool de Palabras",
        label: "Agrega palabras (una por línea o separadas por comas)",
        placeholder: "Palabra1, Palabra2, Palabra3...",
        addToPool: "Agregar al Pool",
        poolCount: "Pool actual: {count} palabra{plural}",
        addSuccess: "Palabras agregadas al pool. Puedes agregar más o continuar.",
        minWords: "Debes agregar al menos una palabra al pool.",
        noWords: "Debes agregar al menos una palabra al pool."
      },
      database: {
        title: "Preparación de Palabra",
        description: "Se seleccionará una palabra aleatoria de la base de datos de ~1000 palabras conocidas."
      },
      back: "Volver",
      continue: "Continuar"
    },
    // Reveal Role
    revealRole: {
      turn: "Turno de {name}",
      playerCount: "Jugador {current} de {total}",
      viewInfo: "VER MI INFORMACIÓN",
      impostor: {
        title: "ERES EL IMPOSTOR",
        description: "No conoces la palabra secreta.",
        hint: "Intenta pasar desapercibido."
      },
      player: {
        title: "ERES JUGADOR",
        secretWord: "La palabra secreta es:",
        hint: "Descubre quién es el impostor."
      },
      next: "OCULTAR Y PASAR AL SIGUIENTE",
      startRound: "OCULTAR Y COMENZAR RONDA",
      mustView: "Debes ver tu información antes de continuar."
    },
    // Round
    round: {
      title: "Ronda de Eliminación",
      players: "Jugadores",
      activePlayers: "Jugadores activos: {count}",
      activeImpostors: "Impostores activos: {count}",
      eliminate: "Eliminar",
      revive: "Revivir",
      back: "Volver",
      endGame: "Finalizar Partida",
      canEnd: "✓ Puedes finalizar la partida"
    },
    // End
    end: {
      playersWin: "Jugadores GANARON",
      impostorsWin: "Impostores GANARON",
      secretWord: "La palabra secreta era:",
      impostorsWere: "Los impostores eran:",
      playAgain: "Jugar Otra Partida",
      changePlayers: "Cambiar Jugadores",
      changeMode: "Cambiar Modo",
      allImpostorsEliminated: "Todos los impostores fueron eliminados",
      impostorsWinCondition: "Los impostores igualan o superan a los jugadores"
    },
    // Settings
    settings: {
      title: "Configuración",
      language: "Idioma",
      volume: "Volumen",
      soundEffects: "Efectos de Sonido",
      music: "Música",
      back: "Volver",
      save: "Guardar"
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Error",
      offline: {
        title: "Sin conexión",
        message: "El impostor se llevó el WiFi",
        retry: "Reintentar misión"
      }
    }
  },
  en: {
    home: {
      title: "Who is the impostor?",
      subtitle: "The deduction game between friends",
      description: "Discover the impostor among your friends. One player (or several) doesn't know the secret word and must go unnoticed while others try to find them.",
      startGame: "START GAME"
    },
    modeSelect: {
      title: "Select Game Mode",
      manual: {
        title: "Manual Mode",
        description: "An external person writes ONE secret word at the start of each game. Ideal for greater control over words."
      },
      semiManual: {
        title: "Semi-Manual Mode",
        description: "Allows adding SEVERAL words at once (one per line or separated by commas). Creates a word pool used randomly without repetition."
      },
      database: {
        title: "Database Mode",
        description: "Local database with ~1000 VERY well-known words. Categories: Countries, Celebrities, Animals, Objects, Actions and Places."
      },
      football: {
        title: "Football Mode",
        description: "Play with a football database (famous players and teams)."
      },
      back: "Back",
      continue: "Continue"
    },
    players: {
      title: "Player Management",
      impostorCount: "Number of Impostors",
      impostorCountHint: "You can have up to {count} impostor{plural}",
      playersList: "Players",
      addPlayer: "+ Add Player",
      back: "Back",
      continue: "Continue",
      minPlayers: "You need at least 3 players to start.",
      duplicateNames: "There cannot be players with the same name.",
      tooManyImpostors: "There cannot be more or equal impostors than players."
    },
    wordSetup: {
      manual: {
        title: "Secret Word",
        label: "Enter the secret word for this game",
        placeholder: "Write the word...",
        required: "You must enter a secret word."
      },
      semiManual: {
        title: "Word Pool",
        label: "Add words (one per line or separated by commas)",
        placeholder: "Word1, Word2, Word3...",
        addToPool: "Add to Pool",
        poolCount: "Current pool: {count} word{plural}",
        addSuccess: "Words added to pool. You can add more or continue.",
        minWords: "You must add at least one word to the pool.",
        noWords: "You must add at least one word to the pool."
      },
      database: {
        title: "Word Preparation",
        description: "A random word will be selected from the database of ~1000 known words."
      },
      back: "Back",
      continue: "Continue"
    },
    revealRole: {
      turn: "Turn of {name}",
      playerCount: "Player {current} of {total}",
      viewInfo: "VIEW MY INFORMATION",
      impostor: {
        title: "YOU ARE THE IMPOSTOR",
        description: "You don't know the secret word.",
        hint: "Try to go unnoticed."
      },
      player: {
        title: "YOU ARE A PLAYER",
        secretWord: "The secret word is:",
        hint: "Discover who is the impostor."
      },
      next: "HIDE AND NEXT",
      startRound: "HIDE AND START ROUND",
      mustView: "You must view your information before continuing."
    },
    round: {
      title: "Elimination Round",
      players: "Players",
      activePlayers: "Active players: {count}",
      activeImpostors: "Active impostors: {count}",
      eliminate: "Eliminate",
      revive: "Revive",
      back: "Back",
      endGame: "End Game",
      canEnd: "✓ You can end the game"
    },
    end: {
      playersWin: "PLAYERS WON",
      impostorsWin: "IMPOSTORS WON",
      secretWord: "The secret word was:",
      impostorsWere: "The impostors were:",
      playAgain: "Play Again",
      changePlayers: "Change Players",
      changeMode: "Change Mode",
      allImpostorsEliminated: "All impostors were eliminated",
      impostorsWinCondition: "Impostors equal or exceed players"
    },
    settings: {
      title: "Settings",
      language: "Language",
      volume: "Volume",
      soundEffects: "Sound Effects",
      music: "Music",
      back: "Back",
      save: "Save"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      offline: {
        title: "No connection",
        message: "The impostor took the WiFi",
        retry: "Retry mission"
      }
    }
  },
  fr: {
    home: {
      title: "Qui est l'imposteur ?",
      subtitle: "Le jeu de déduction entre amis",
      description: "Découvrez l'imposteur parmi vos amis. Un joueur (ou plusieurs) ne connaît pas le mot secret et doit passer inaperçu pendant que les autres tentent de le trouver.",
      startGame: "COMMENCER LA PARTIE"
    },
    modeSelect: {
      title: "Sélectionnez le Mode de Jeu",
      manual: {
        title: "Mode Manuel",
        description: "Une personne externe écrit UN mot secret au début de chaque partie. Idéal pour un meilleur contrôle sur les mots."
      },
      semiManual: {
        title: "Mode Semi-Manuel",
        description: "Permet d'ajouter PLUSIEURS mots à la fois (un par ligne ou séparés par des virgules). Crée un pool de mots utilisé aléatoirement sans répétition."
      },
      database: {
        title: "Mode Base de Données",
        description: "Base de données locale avec ~1000 mots TRÈS connus. Catégories: Pays, Célébrités, Animaux, Objets, Actions et Lieux."
      },
      football: {
        title: "Mode Football",
        description: "Jouez avec une base de données de football (joueurs et équipes célèbres)."
      },
      back: "Retour",
      continue: "Continuer"
    },
    players: {
      title: "Gestion des Joueurs",
      impostorCount: "Nombre d'Imposteurs",
      impostorCountHint: "Vous pouvez avoir jusqu'à {count} imposteur{plural}",
      playersList: "Joueurs",
      addPlayer: "+ Ajouter un Joueur",
      back: "Retour",
      continue: "Continuer",
      minPlayers: "Vous avez besoin d'au moins 3 joueurs pour commencer.",
      duplicateNames: "Il ne peut pas y avoir de joueurs avec le même nom.",
      tooManyImpostors: "Il ne peut pas y avoir plus ou autant d'imposteurs que de joueurs."
    },
    wordSetup: {
      manual: {
        title: "Mot Secret",
        label: "Entrez le mot secret pour cette partie",
        placeholder: "Écrivez le mot...",
        required: "Vous devez entrer un mot secret."
      },
      semiManual: {
        title: "Pool de Mots",
        label: "Ajoutez des mots (un par ligne ou séparés par des virgules)",
        placeholder: "Mot1, Mot2, Mot3...",
        addToPool: "Ajouter au Pool",
        poolCount: "Pool actuel: {count} mot{plural}",
        addSuccess: "Mots ajoutés au pool. Vous pouvez en ajouter plus ou continuer.",
        minWords: "Vous devez ajouter au moins un mot au pool.",
        noWords: "Vous devez ajouter au moins un mot au pool."
      },
      database: {
        title: "Préparation du Mot",
        description: "Un mot aléatoire sera sélectionné dans la base de données de ~1000 mots connus."
      },
      back: "Retour",
      continue: "Continuer"
    },
    revealRole: {
      turn: "Tour de {name}",
      playerCount: "Joueur {current} sur {total}",
      viewInfo: "VOIR MES INFORMATIONS",
      impostor: {
        title: "VOUS ÊTES L'IMPOSTEUR",
        description: "Vous ne connaissez pas le mot secret.",
        hint: "Essayez de passer inaperçu."
      },
      player: {
        title: "VOUS ÊTES UN JOUEUR",
        secretWord: "Le mot secret est:",
        hint: "Découvrez qui est l'imposteur."
      },
      next: "MASQUER ET SUIVANT",
      startRound: "MASQUER ET COMMENCER LE TOUR",
      mustView: "Vous devez voir vos informations avant de continuer."
    },
    round: {
      title: "Tour d'Élimination",
      players: "Joueurs",
      activePlayers: "Joueurs actifs: {count}",
      activeImpostors: "Imposteurs actifs: {count}",
      eliminate: "Éliminer",
      revive: "Ressusciter",
      back: "Retour",
      endGame: "Terminer la Partie",
      canEnd: "✓ Vous pouvez terminer la partie"
    },
    end: {
      playersWin: "LES JOUEURS ONT GAGNÉ",
      impostorsWin: "LES IMPOSTEURS ONT GAGNÉ",
      secretWord: "Le mot secret était:",
      impostorsWere: "Les imposteurs étaient:",
      playAgain: "Rejouer",
      changePlayers: "Changer les Joueurs",
      changeMode: "Changer le Mode",
      allImpostorsEliminated: "Tous les imposteurs ont été éliminés",
      impostorsWinCondition: "Les imposteurs égalent ou dépassent les joueurs"
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      volume: "Volume",
      soundEffects: "Effets Sonores",
      music: "Musique",
      back: "Retour",
      save: "Enregistrer"
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      offline: {
        title: "Pas de connexion",
        message: "L'imposteur a pris le WiFi",
        retry: "Réessayer la mission"
      }
    }
  },
  pt: {
    home: {
      title: "Quem é o impostor?",
      subtitle: "O jogo de dedução entre amigos",
      description: "Descubra o impostor entre seus amigos. Um jogador (ou vários) não conhece a palavra secreta e deve passar despercebido enquanto os outros tentam encontrá-lo.",
      startGame: "INICIAR PARTIDA"
    },
    modeSelect: {
      title: "Selecione o Modo de Jogo",
      manual: {
        title: "Modo Manual",
        description: "Uma pessoa externa escreve UMA palavra secreta no início de cada partida. Ideal para maior controle sobre as palavras."
      },
      semiManual: {
        title: "Modo Semi-Manual",
        description: "Permite adicionar VÁRIAS palavras de uma vez (uma por linha ou separadas por vírgulas). Cria um pool de palavras usado aleatoriamente sem repetição."
      },
      database: {
        title: "Modo Banco de Dados",
        description: "Banco de dados local com ~1000 palavras MUITO conhecidas. Categorias: Países, Celebridades, Animais, Objetos, Ações e Lugares."
      },
      football: {
        title: "Modo Futebol",
        description: "Jogue com um banco de dados de futebol (jogadores e times famosos)."
      },
      back: "Voltar",
      continue: "Continuar"
    },
    players: {
      title: "Gerenciamento de Jogadores",
      impostorCount: "Quantidade de Impostores",
      impostorCountHint: "Você pode ter até {count} impostor{plural}",
      playersList: "Jogadores",
      addPlayer: "+ Adicionar Jogador",
      back: "Voltar",
      continue: "Continuar",
      minPlayers: "Você precisa de pelo menos 3 jogadores para começar.",
      duplicateNames: "Não pode haver jogadores com o mesmo nome.",
      tooManyImpostors: "Não pode haver mais ou igual quantidade de impostores que jogadores."
    },
    wordSetup: {
      manual: {
        title: "Palavra Secreta",
        label: "Digite a palavra secreta para esta partida",
        placeholder: "Escreva a palavra...",
        required: "Você deve inserir uma palavra secreta."
      },
      semiManual: {
        title: "Pool de Palavras",
        label: "Adicione palavras (uma por linha ou separadas por vírgulas)",
        placeholder: "Palavra1, Palavra2, Palavra3...",
        addToPool: "Adicionar ao Pool",
        poolCount: "Pool atual: {count} palavra{plural}",
        addSuccess: "Palavras adicionadas ao pool. Você pode adicionar mais ou continuar.",
        minWords: "Você deve adicionar pelo menos uma palavra ao pool.",
        noWords: "Você deve adicionar pelo menos uma palavra ao pool."
      },
      database: {
        title: "Preparação da Palavra",
        description: "Uma palavra aleatória será selecionada do banco de dados de ~1000 palavras conhecidas."
      },
      back: "Voltar",
      continue: "Continuar"
    },
    revealRole: {
      turn: "Turno de {name}",
      playerCount: "Jogador {current} de {total}",
      viewInfo: "VER MINHA INFORMAÇÃO",
      impostor: {
        title: "VOCÊ É O IMPOSTOR",
        description: "Você não conhece a palavra secreta.",
        hint: "Tente passar despercebido."
      },
      player: {
        title: "VOCÊ É UM JOGADOR",
        secretWord: "A palavra secreta é:",
        hint: "Descubra quem é o impostor."
      },
      next: "OCULTAR E PRÓXIMO",
      startRound: "OCULTAR E INICIAR RODADA",
      mustView: "Você deve ver suas informações antes de continuar."
    },
    round: {
      title: "Rodada de Eliminação",
      players: "Jogadores",
      activePlayers: "Jogadores ativos: {count}",
      activeImpostors: "Impostores ativos: {count}",
      eliminate: "Eliminar",
      revive: "Reviver",
      back: "Voltar",
      endGame: "Finalizar Partida",
      canEnd: "✓ Você pode finalizar a partida"
    },
    end: {
      playersWin: "JOGADORES GANHARAM",
      impostorsWin: "IMPOSTORES GANHARAM",
      secretWord: "A palavra secreta era:",
      impostorsWere: "Os impostores eram:",
      playAgain: "Jogar Outra Partida",
      changePlayers: "Mudar Jogadores",
      changeMode: "Mudar Modo",
      allImpostorsEliminated: "Todos os impostores foram eliminados",
      impostorsWinCondition: "Os impostores igualam ou superam os jogadores"
    },
    settings: {
      title: "Configurações",
      language: "Idioma",
      volume: "Volume",
      soundEffects: "Efeitos Sonoros",
      music: "Música",
      back: "Voltar",
      save: "Salvar"
    },
    common: {
      loading: "Carregando...",
      error: "Erro",
      offline: {
        title: "Sem conexão",
        message: "O impostor levou o WiFi",
        retry: "Tentar novamente"
      }
    }
  }
}

export const languages = {
  es: { name: "Español", flag: "🇪🇸" },
  en: { name: "English", flag: "🇬🇧" },
  fr: { name: "Français", flag: "🇫🇷" },
  pt: { name: "Português", flag: "🇵🇹" }
}



