export const translations = {
  es: {
    // Home
    home: {
      title: "¿Quién es el impostor?",
      subtitle: "El juego de deducción entre amigos",
      description: "Descubre al impostor entre tus amigos. Un jugador (o varios) no conoce la palabra secreta y debe pasar desapercibido mientras los demás intentan descubrirlo.",
      descriptionShort: "Uno (o varios) jugadores no conocen la palabra secreta.",
      tagline: "Engaña, observa y descubre quién es el impostor.",
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
      animals: {
        title: "Modo Animales",
        description: "Palabras aleatorias de una lista de ~70 animales conocidos."
      },
      countries: {
        title: "Modo Países",
        description: "Palabras aleatorias de una lista de ~100 países del mundo."
      },
      movies: {
        title: "Modo Películas y Series",
        description: "Palabras aleatorias entre películas y series muy famosas (~70 títulos)."
      },
      sports: {
        title: "Modo Deportes",
        description: "Palabras aleatorias de deportes generales."
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
      eliminationType: "Tipo de Eliminación",
      classic: "Clásico",
      classicRecommended: "(Recomendado)",
      noMiss: "Sin fallos",
      noMissDeath: "(Muerte súbita)",
      classicHint: "Puedes expulsar jugadores aunque te equivoques.",
      noMissHint: "Si expulsan a un jugador y NO es impostor, los impostores ganan inmediatamente.",
      playerPlaceholder: "Jugador {n}",
      addPlayerButton: "Agregar Jugador",
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
        poolLoaded: "Palabras cargadas: {count}",
        addSuccess: "Palabras agregadas al pool. Puedes agregar más o continuar.",
        minWords: "Debes agregar al menos una palabra al pool.",
        noWords: "Debes agregar al menos una palabra al pool."
      },
      deletePool: "Eliminar pool",
      deletePoolConfirm: "¿Seguro que quieres eliminar todas las palabras del pool?",
      addWordsToContinue: "Agrega palabras para continuar.",
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
      onlyFor: "SOLO PARA {name}",
      instructionBefore: "Asegúrate de estar solo. Memoriza tu información antes de pasar el teléfono.",
      revealButton: "Revelar mi rol",
      onlyCanLook: "SOLO {name} PUEDE MIRAR",
      impostorNoWord: "NO CONOCES LA PALABRA",
      impostorHint: "Improvise. No te delates.",
      impostorInstruction: "Actúa natural. Escucha bien y trata de adivinar la palabra.",
      playerInstruction: "Memoriza la palabra. Cuando estés listo, pasa el teléfono.",
      hideAndNext: "OCULTAR Y PASAR AL SIGUIENTE",
      hideAndStartRound: "OCULTAR Y COMENZAR RONDA",
      tapToHide: "Toca para ocultar tu rol y pasar el turno.",
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
      subtitle: "Tras la discusión, elimina al sospechoso.",
      players: "Jugadores",
      activePlayers: "Jugadores activos: {count}",
      activeImpostors: "Impostores activos: {count}",
      eliminate: "Eliminar",
      revive: "Revivir",
      back: "Volver",
      endGame: "Finalizar Partida",
      canEnd: "✓ Puedes finalizar la partida",
      confirm: "Confirmar",
      cancel: "Cancelar",
      eliminated: "ELIMINADO",
      winnerPlayers: "Jugadores",
      winnerImpostors: "Impostores"
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
      impostorsWinCondition: "Los impostores igualan o superan a los jugadores",
      narrativeImpostor: "El impostor logró engañar al grupo.",
      narrativePlayers: "El grupo logró descubrir al impostor.",
      wrongEliminationNoMiss: "Regla: Sin fallos (Muerte súbita). Expulsión incorrecta → ganan impostores."
    },
    // Settings
    settings: {
      title: "Configuración",
      language: "Idioma",
      back: "Volver",
      save: "Guardar",
      aboutGame: "Acerca del juego"
    },
    about: {
      title: "Acerca del juego",
      back: "Volver",
      whatIs: "IMPOS2 es un juego de deducción social para jugar en grupo. Un jugador (o varios) es el «impostor»: no conoce la palabra secreta y debe pasar desapercibido. El resto debe descubrirlo mediante pistas y votación.",
      howToPlay: "Cómo se juega",
      step1: "Crear partida: elige el modo de juego y añade los nombres de los jugadores.",
      step2: "Palabra secreta: según el modo, se asigna una palabra (manual, pool, base de datos, etc.).",
      step3: "Asignación de roles: cada jugador ve en privado si es impostor o si conoce la palabra.",
      step4: "Ronda de pistas: todos dan pistas sobre la palabra sin decirla. El impostor improvisa.",
      step5: "Votación: los jugadores pueden eliminar a un sospechoso. Según la regla, un fallo puede hacer ganar a los impostores.",
      step6: "Fin: gana el grupo si elimina a todos los impostores, o los impostores si igualan o superan en número a los jugadores.",
      modes: "Modos de juego",
      modeManual: "Manual: una persona externa escribe UNA palabra secreta al iniciar cada partida.",
      modeSemiManual: "Semi-manual: se agregan varias palabras a un pool privado; la app elige una al azar sin repetir hasta agotar.",
      modeDatabase: "Base de datos: palabra aleatoria de una gran lista por idioma (categorías variadas).",
      modeFootball: "Fútbol: palabras de jugadores y equipos de fútbol famosos.",
      modeAnimals: "Animales: palabras de una lista de animales conocidos.",
      modeCountries: "Países: palabras de una lista de países del mundo.",
      modeMovies: "Películas y series: títulos famosos de películas y series.",
      modeSports: "Deportes: nombres de deportes.",
      tips: "Consejos",
      tip1: "No mires la pantalla cuando se asignen los roles; pasa el teléfono con la pantalla oculta.",
      tip2: "Usad un temporizador por ronda para dar pistas (ej. 1 minuto por persona).",
      tip3: "En modo «Sin fallos», una expulsión incorrecta hace ganar a los impostores al instante."
    },
    categories: {
      countries: "Países",
      famous: "Famosos",
      animals: "Animales",
      objects: "Objetos",
      actions: "Acciones",
      places: "Lugares",
      footballPlayers: "Jugadores",
      footballTeams: "Equipos"
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Error",
      playerNotFound: "Error: Jugador no encontrado",
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
      descriptionShort: "One (or more) players don't know the secret word.",
      tagline: "Deceive, observe and discover who the impostor is.",
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
      animals: {
        title: "Animals Mode",
        description: "Random words from a list of ~70 well-known animals."
      },
      countries: {
        title: "Countries Mode",
        description: "Random words from a list of ~100 countries worldwide."
      },
      movies: {
        title: "Movies & Series Mode",
        description: "Random words from famous movies and series (~70 titles)."
      },
      sports: {
        title: "Sports Mode",
        description: "Random words from general sports."
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
      eliminationType: "Elimination Type",
      classic: "Classic",
      classicRecommended: "(Recommended)",
      noMiss: "No mistakes",
      noMissDeath: "(Sudden death)",
      classicHint: "You can eliminate players even if you're wrong.",
      noMissHint: "If a player is eliminated and is NOT the impostor, impostors win immediately.",
      playerPlaceholder: "Player {n}",
      addPlayerButton: "Add Player",
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
        poolLoaded: "Words loaded: {count}",
        addSuccess: "Words added to pool. You can add more or continue.",
        minWords: "You must add at least one word to the pool.",
        noWords: "You must add at least one word to the pool."
      },
      deletePool: "Delete pool",
      deletePoolConfirm: "Are you sure you want to delete all words from the pool?",
      addWordsToContinue: "Add words to continue.",
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
      onlyFor: "ONLY FOR {name}",
      instructionBefore: "Make sure you're alone. Memorize your information before passing the phone.",
      revealButton: "Reveal my role",
      onlyCanLook: "ONLY {name} CAN LOOK",
      impostorNoWord: "YOU DON'T KNOW THE WORD",
      impostorHint: "Improvise. Don't give yourself away.",
      impostorInstruction: "Act natural. Listen carefully and try to guess the word.",
      playerInstruction: "Memorize the word. When you're ready, pass the phone.",
      hideAndNext: "HIDE AND NEXT",
      hideAndStartRound: "HIDE AND START ROUND",
      tapToHide: "Tap to hide your role and pass the turn.",
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
      subtitle: "After the discussion, eliminate the suspect.",
      players: "Players",
      activePlayers: "Active players: {count}",
      activeImpostors: "Active impostors: {count}",
      eliminate: "Eliminate",
      revive: "Revive",
      back: "Back",
      endGame: "End Game",
      canEnd: "✓ You can end the game",
      confirm: "Confirm",
      cancel: "Cancel",
      eliminated: "ELIMINATED",
      winnerPlayers: "Players",
      winnerImpostors: "Impostors"
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
      impostorsWinCondition: "Impostors equal or exceed players",
      narrativeImpostor: "The impostor fooled the group.",
      narrativePlayers: "The group found the impostor.",
      wrongEliminationNoMiss: "Rule: No mistakes (Sudden death). Wrong elimination → impostors win."
    },
    settings: {
      title: "Settings",
      language: "Language",
      back: "Back",
      save: "Save",
      aboutGame: "About the game"
    },
    about: {
      title: "About the game",
      back: "Back",
      whatIs: "IMPOS2 is a social deduction game for groups. One or more players are the «impostor»: they don't know the secret word and must blend in. The others must find them through clues and voting.",
      howToPlay: "How to play",
      step1: "Create a game: choose the game mode and add player names.",
      step2: "Secret word: depending on the mode, a word is assigned (manual, pool, database, etc.).",
      step3: "Role assignment: each player sees in private whether they are the impostor or know the word.",
      step4: "Clue round: everyone gives clues about the word without saying it. The impostor improvises.",
      step5: "Voting: players may eliminate a suspect. Depending on the rule, one wrong elimination can make the impostors win.",
      step6: "End: the group wins if they eliminate all impostors, or the impostors win if they match or outnumber the players.",
      modes: "Game modes",
      modeManual: "Manual: an external person writes ONE secret word at the start of each game.",
      modeSemiManual: "Semi-manual: add several words to a private pool; the app picks one at random without repeating until the pool is used.",
      modeDatabase: "Database: random word from a large list per language (mixed categories).",
      modeFootball: "Football: words from famous football players and teams.",
      modeAnimals: "Animals: words from a list of well-known animals.",
      modeCountries: "Countries: words from a list of countries worldwide.",
      modeMovies: "Movies & series: famous movie and series titles.",
      modeSports: "Sports: names of sports.",
      tips: "Tips",
      tip1: "Don't look at the screen when roles are assigned; pass the phone with the screen hidden.",
      tip2: "Use a timer per round for giving clues (e.g. 1 minute per person).",
      tip3: "In «No mistakes» mode, one wrong elimination makes the impostors win instantly."
    },
    categories: {
      countries: "Countries",
      famous: "Famous",
      animals: "Animals",
      objects: "Objects",
      actions: "Actions",
      places: "Places",
      footballPlayers: "Players",
      footballTeams: "Teams"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      playerNotFound: "Error: Player not found",
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
      descriptionShort: "Un (ou plusieurs) joueurs ne connaissent pas le mot secret.",
      tagline: "Trompez, observez et découvrez qui est l'imposteur.",
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
      animals: {
        title: "Mode Animaux",
        description: "Mots aléatoires parmi ~70 animaux bien connus."
      },
      countries: {
        title: "Mode Pays",
        description: "Mots aléatoires parmi ~100 pays du monde."
      },
      movies: {
        title: "Mode Films et Séries",
        description: "Mots aléatoires parmi des films et séries très connus (~70 titres)."
      },
      sports: {
        title: "Mode Sports",
        description: "Mots aléatoires parmi les sports en général."
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
      eliminationType: "Type d'élimination",
      classic: "Classique",
      classicRecommended: "(Recommandé)",
      noMiss: "Sans erreur",
      noMissDeath: "(Mort subite)",
      classicHint: "Vous pouvez éliminer des joueurs même si vous vous trompez.",
      noMissHint: "Si un joueur est éliminé et n'est PAS l'imposteur, les imposteurs gagnent immédiatement.",
      playerPlaceholder: "Joueur {n}",
      addPlayerButton: "Ajouter un Joueur",
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
        poolLoaded: "Mots chargés: {count}",
        addSuccess: "Mots ajoutés au pool. Vous pouvez en ajouter plus ou continuer.",
        minWords: "Vous devez ajouter au moins un mot au pool.",
        noWords: "Vous devez ajouter au moins un mot au pool."
      },
      deletePool: "Vider le pool",
      deletePoolConfirm: "Êtes-vous sûr de vouloir supprimer tous les mots du pool ?",
      addWordsToContinue: "Ajoutez des mots pour continuer.",
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
      onlyFor: "UNIQUEMENT POUR {name}",
      instructionBefore: "Assurez-vous d'être seul. Mémorisez vos informations avant de passer le téléphone.",
      revealButton: "Révéler mon rôle",
      onlyCanLook: "SEUL {name} PEUT REGARDER",
      impostorNoWord: "VOUS NE CONNAISSEZ PAS LE MOT",
      impostorHint: "Improvisez. Ne vous faites pas repérer.",
      impostorInstruction: "Agissez naturellement. Écoutez bien et essayez de deviner le mot.",
      playerInstruction: "Mémorisez le mot. Quand vous êtes prêt, passez le téléphone.",
      hideAndNext: "MASQUER ET SUIVANT",
      hideAndStartRound: "MASQUER ET COMMENCER LE TOUR",
      tapToHide: "Appuyez pour masquer votre rôle et passer le tour.",
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
      subtitle: "Après la discussion, éliminez le suspect.",
      players: "Joueurs",
      activePlayers: "Joueurs actifs: {count}",
      activeImpostors: "Imposteurs actifs: {count}",
      eliminate: "Éliminer",
      revive: "Ressusciter",
      back: "Retour",
      endGame: "Terminer la Partie",
      canEnd: "✓ Vous pouvez terminer la partie",
      confirm: "Confirmer",
      cancel: "Annuler",
      eliminated: "ÉLIMINÉ",
      winnerPlayers: "Joueurs",
      winnerImpostors: "Imposteurs"
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
      impostorsWinCondition: "Les imposteurs égalent ou dépassent les joueurs",
      narrativeImpostor: "L'imposteur a trompé le groupe.",
      narrativePlayers: "Le groupe a trouvé l'imposteur.",
      wrongEliminationNoMiss: "Règle : Sans erreur (mort subite). Mauvaise élimination → les imposteurs gagnent."
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      back: "Retour",
      save: "Enregistrer",
      aboutGame: "À propos du jeu"
    },
    about: {
      title: "À propos du jeu",
      back: "Retour",
      whatIs: "IMPOS2 est un jeu de déduction sociale pour jouer en groupe. Un ou plusieurs joueurs sont les « imposteurs » : ils ne connaissent pas le mot secret et doivent passer inaperçus. Les autres doivent les démasquer par des indices et des votes.",
      howToPlay: "Comment jouer",
      step1: "Créer une partie : choisissez le mode et ajoutez les noms des joueurs.",
      step2: "Mot secret : selon le mode, un mot est assigné (manuel, pool, base de données, etc.).",
      step3: "Attribution des rôles : chaque joueur voit en privé s'il est imposteur ou s'il connaît le mot.",
      step4: "Tour des indices : chacun donne des indices sur le mot sans le dire. L'imposteur improvise.",
      step5: "Vote : les joueurs peuvent éliminer un suspect. Selon la règle, une mauvaise élimination peut faire gagner les imposteurs.",
      step6: "Fin : le groupe gagne s'il élimine tous les imposteurs, ou les imposteurs gagnent s'ils égalisent ou dépassent le nombre de joueurs.",
      modes: "Modes de jeu",
      modeManual: "Manuel : une personne externe écrit UN mot secret au début de chaque partie.",
      modeSemiManual: "Semi-manuel : on ajoute plusieurs mots à un pool privé ; l'app en choisit un au hasard sans répétition jusqu'à épuisement.",
      modeDatabase: "Base de données : mot aléatoire dans une grande liste par langue (catégories variées).",
      modeFootball: "Football : mots de joueurs et d'équipes de football célèbres.",
      modeAnimals: "Animaux : mots d'une liste d'animaux connus.",
      modeCountries: "Pays : mots d'une liste de pays du monde.",
      modeMovies: "Films et séries : titres de films et séries célèbres.",
      modeSports: "Sports : noms de sports.",
      tips: "Conseils",
      tip1: "Ne regardez pas l'écran lors de l'attribution des rôles ; passez le téléphone écran caché.",
      tip2: "Utilisez un minuteur par tour pour les indices (ex. 1 minute par personne).",
      tip3: "En mode « Sans erreur », une mauvaise élimination fait gagner les imposteurs instantanément."
    },
    categories: {
      countries: "Pays",
      famous: "Célébrités",
      animals: "Animaux",
      objects: "Objets",
      actions: "Actions",
      places: "Lieux",
      footballPlayers: "Joueurs",
      footballTeams: "Équipes"
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      playerNotFound: "Erreur : Joueur non trouvé",
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
      descriptionShort: "Um (ou vários) jogadores não conhecem a palavra secreta.",
      tagline: "Engane, observe e descubra quem é o impostor.",
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
      animals: {
        title: "Modo Animais",
        description: "Palavras aleatórias de uma lista de ~70 animais conhecidos."
      },
      countries: {
        title: "Modo Países",
        description: "Palavras aleatórias de uma lista de ~100 países do mundo."
      },
      movies: {
        title: "Modo Filmes e Séries",
        description: "Palavras aleatórias entre filmes e séries muito famosos (~70 títulos)."
      },
      sports: {
        title: "Modo Esportes",
        description: "Palavras aleatórias de esportes em geral."
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
      eliminationType: "Tipo de Eliminação",
      classic: "Clássico",
      classicRecommended: "(Recomendado)",
      noMiss: "Sem erros",
      noMissDeath: "(Morte súbita)",
      classicHint: "Você pode eliminar jogadores mesmo que se engane.",
      noMissHint: "Se um jogador for eliminado e NÃO for o impostor, os impostores ganham imediatamente.",
      playerPlaceholder: "Jogador {n}",
      addPlayerButton: "Adicionar Jogador",
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
        poolLoaded: "Palavras carregadas: {count}",
        addSuccess: "Palavras adicionadas ao pool. Você pode adicionar mais ou continuar.",
        minWords: "Você deve adicionar pelo menos uma palavra ao pool.",
        noWords: "Você deve adicionar pelo menos uma palavra ao pool."
      },
      deletePool: "Eliminar pool",
      deletePoolConfirm: "Tem certeza de que deseja eliminar todas as palavras do pool?",
      addWordsToContinue: "Adicione palavras para continuar.",
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
      onlyFor: "APENAS PARA {name}",
      instructionBefore: "Certifique-se de estar sozinho. Memorize suas informações antes de passar o telefone.",
      revealButton: "Revelar meu papel",
      onlyCanLook: "APENAS {name} PODE OLHAR",
      impostorNoWord: "VOCÊ NÃO CONHECE A PALAVRA",
      impostorHint: "Improvisar. Não se entregue.",
      impostorInstruction: "Aja naturalmente. Ouça bem e tente adivinhar a palavra.",
      playerInstruction: "Memorize a palavra. Quando estiver pronto, passe o telefone.",
      hideAndNext: "OCULTAR E PRÓXIMO",
      hideAndStartRound: "OCULTAR E INICIAR RODADA",
      tapToHide: "Toque para ocultar seu papel e passar a vez.",
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
      subtitle: "Após a discussão, elimine o suspeito.",
      players: "Jogadores",
      activePlayers: "Jogadores ativos: {count}",
      activeImpostors: "Impostores ativos: {count}",
      eliminate: "Eliminar",
      revive: "Reviver",
      back: "Voltar",
      endGame: "Finalizar Partida",
      canEnd: "✓ Você pode finalizar a partida",
      confirm: "Confirmar",
      cancel: "Cancelar",
      eliminated: "ELIMINADO",
      winnerPlayers: "Jogadores",
      winnerImpostors: "Impostores"
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
      impostorsWinCondition: "Os impostores igualam ou superam os jogadores",
      narrativeImpostor: "O impostor enganou o grupo.",
      narrativePlayers: "O grupo descobriu o impostor.",
      wrongEliminationNoMiss: "Regra: Sem erros (morte súbita). Eliminação incorreta → impostores ganham."
    },
    settings: {
      title: "Configurações",
      language: "Idioma",
      back: "Voltar",
      save: "Salvar",
      aboutGame: "Sobre o jogo"
    },
    about: {
      title: "Sobre o jogo",
      back: "Voltar",
      whatIs: "IMPOS2 é um jogo de dedução social para jogar em grupo. Um ou mais jogadores são os «impostores»: não conhecem a palavra secreta e devem passar despercebidos. Os outros devem descobri-los por pistas e votação.",
      howToPlay: "Como jogar",
      step1: "Criar partida: escolha o modo de jogo e adicione os nomes dos jogadores.",
      step2: "Palavra secreta: conforme o modo, uma palavra é atribuída (manual, pool, banco de dados, etc.).",
      step3: "Atribuição de papéis: cada jogador vê em privado se é impostor ou se conhece a palavra.",
      step4: "Rodada de pistas: todos dão pistas sobre a palavra sem dizê-la. O impostor improvisa.",
      step5: "Votação: os jogadores podem eliminar um suspeito. Conforme a regra, um erro pode fazer os impostores ganharem.",
      step6: "Fim: o grupo ganha se eliminar todos os impostores, ou os impostores ganham se igualarem ou superarem o número de jogadores.",
      modes: "Modos de jogo",
      modeManual: "Manual: uma pessoa externa escreve UMA palavra secreta no início de cada partida.",
      modeSemiManual: "Semi-manual: adicionam-se várias palavras a um pool privado; o app escolhe uma ao acaso sem repetir até esgotar.",
      modeDatabase: "Banco de dados: palavra aleatória de uma grande lista por idioma (categorias variadas).",
      modeFootball: "Futebol: palavras de jogadores e times de futebol famosos.",
      modeAnimals: "Animais: palavras de uma lista de animais conhecidos.",
      modeCountries: "Países: palavras de uma lista de países do mundo.",
      modeMovies: "Filmes e séries: títulos famosos de filmes e séries.",
      modeSports: "Esportes: nomes de esportes.",
      tips: "Dicas",
      tip1: "Não olhe a tela quando os papéis forem atribuídos; passe o telefone com a tela escondida.",
      tip2: "Use um temporizador por rodada para dar pistas (ex.: 1 minuto por pessoa).",
      tip3: "No modo «Sem erros», uma eliminação incorreta faz os impostores ganharem na hora."
    },
    categories: {
      countries: "Países",
      famous: "Famosos",
      animals: "Animais",
      objects: "Objetos",
      actions: "Ações",
      places: "Lugares",
      footballPlayers: "Jogadores",
      footballTeams: "Times"
    },
    common: {
      loading: "Carregando...",
      error: "Erro",
      playerNotFound: "Erro: Jogador não encontrado",
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



