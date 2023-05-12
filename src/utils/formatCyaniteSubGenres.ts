const formatCyaniteSubgenre = (subgenre: string) => {
    switch (subgenre) {
      case "bluesRock":
        return "Blues Rock";
      case "folkRock":
        return "Folk Rock";
      case "hardRock":
        return "Hard Rock";
      case "indieAlternative":
        return "Indie Alternative";
      case "psychedelicProgressiveRock":
        return "Psychedelic Progressive Rock";
      case "punk":
        return "Punk";
      case "rockAndRoll":
        return "Rock And Roll";
      case "popSoftRock":
        return "Pop Soft Rock";
      case "abstractIDMLeftfield":
        return "Abstract IDM Leftfield";
      case "breakbeatDnB":
        return "Breakbeat DnB";
      case "deepHouse":
        return "Deep House";
      case "electro":
        return "Electro";
      case "house":
        return "House";
      case "minimal":
        return "Minimal";
      case "synthPop":
        return "Synth Pop";
      case "techHouse":
        return "Tech House";
      case "techno":
        return "Techno";
      case "trance":
        return "Trance";
      case "contemporaryRnB":
        return "Contemporary RnB";
      case "gangsta":
        return "Gangsta";
      case "jazzyHipHop":
        return "Jazzy Hip Hop";
      case "popRap":
        return "Pop Rap";
      case "trap":
        return "Trap";
      case "blackMetal":
        return "Black Metal";
      case "deathMetal":
        return "Death Metal";
      case "doomMetal":
        return "Doom Metal";
      case "heavyMetal":
        return "Heavy Metal";
      case "metalcore":
        return "Metalcore";
      case "nuMetal":
        return "Nu Metal";
      case "disco":
        return "Disco";
      case "funk":
        return "Funk";
      case "gospel":
        return "Gospel";
      case "neoSoul":
        return "Neo Soul";
      case "soul":
        return "Soul";
      case "bigBandSwing":
        return "Big Band Swing";
      case "bebop":
        return "Bebop";
      case "contemporaryJazz":
        return "Contemporary Jazz";
      case "easyListening":
        return "Easy Listening";
      case "fusion":
        return "Fusion";
      case "latinJazz":
        return "Latin Jazz";
      case "smoothJazz":
        return "Smooth Jazz";
      case "country":
        return "Country";
      case "folk":
        return "Folk";
      default:
        return "Unknown Subgenre";
    }
  }
  
export default formatCyaniteSubgenre;