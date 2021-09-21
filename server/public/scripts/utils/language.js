function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isoLangs = {
  ab: {
    name: "Abkhaz",
    nativeName: "аҧсуа"
  },
  aa: {
    name: "Afar",
    nativeName: "Afaraf"
  },
  af: {
    name: "Afrikaans",
    nativeName: "Afrikaans"
  },
  ak: {
    name: "Akan",
    nativeName: "Akan"
  },
  sq: {
    name: "Albanian",
    nativeName: "Shqip"
  },
  am: {
    name: "Amharic",
    nativeName: "አማርኛ"
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية"
  },
  an: {
    name: "Aragonese",
    nativeName: "Aragonés"
  },
  hy: {
    name: "Armenian",
    nativeName: "Հայերեն"
  },
  as: {
    name: "Assamese",
    nativeName: "অসমীয়া"
  },
  av: {
    name: "Avaric",
    nativeName: "авар мацӀ, магӀарул мацӀ"
  },
  ae: {
    name: "Avestan",
    nativeName: "avesta"
  },
  ay: {
    name: "Aymara",
    nativeName: "aymar aru"
  },
  az: {
    name: "Azerbaijani",
    nativeName: "azərbaycan dili"
  },
  bm: {
    name: "Bambara",
    nativeName: "bamanankan"
  },
  ba: {
    name: "Bashkir",
    nativeName: "башҡорт теле"
  },
  eu: {
    name: "Basque",
    nativeName: "euskara, euskera"
  },
  be: {
    name: "Belarusian",
    nativeName: "Беларуская"
  },
  bn: {
    name: "Bengali",
    nativeName: "বাংলা"
  },
  bh: {
    name: "Bihari",
    nativeName: "भोजपुरी"
  },
  bi: {
    name: "Bislama",
    nativeName: "Bislama"
  },
  bs: {
    name: "Bosnian",
    nativeName: "bosanski jezik"
  },
  br: {
    name: "Breton",
    nativeName: "brezhoneg"
  },
  bg: {
    name: "Bulgarian",
    nativeName: "български език"
  },
  my: {
    name: "Burmese",
    nativeName: "ဗမာစာ"
  },
  ca: {
    name: "Catalan; Valencian",
    nativeName: "Català"
  },
  ch: {
    name: "Chamorro",
    nativeName: "Chamoru"
  },
  ce: {
    name: "Chechen",
    nativeName: "нохчийн мотт"
  },
  ny: {
    name: "Chichewa; Chewa; Nyanja",
    nativeName: "chiCheŵa, chinyanja"
  },
  zh: {
    name: "Chinese",
    nativeName: "中文 (Zhōngwén), 汉语, 漢語"
  },
  cv: {
    name: "Chuvash",
    nativeName: "чӑваш чӗлхи"
  },
  kw: {
    name: "Cornish",
    nativeName: "Kernewek"
  },
  co: {
    name: "Corsican",
    nativeName: "corsu, lingua corsa"
  },
  cr: {
    name: "Cree",
    nativeName: "ᓀᐦᐃᔭᐍᐏᐣ"
  },
  hr: {
    name: "Croatian",
    nativeName: "hrvatski"
  },
  cs: {
    name: "Czech",
    nativeName: "česky, čeština"
  },
  da: {
    name: "Danish",
    nativeName: "dansk"
  },
  dv: {
    name: "Divehi; Dhivehi; Maldivian;",
    nativeName: "ދިވެހި"
  },
  nl: {
    name: "Dutch",
    nativeName: "Nederlands, Vlaams"
  },
  en: {
    name: "English",
    nativeName: "English"
  },
  eo: {
    name: "Esperanto",
    nativeName: "Esperanto"
  },
  et: {
    name: "Estonian",
    nativeName: "eesti, eesti keel"
  },
  ee: {
    name: "Ewe",
    nativeName: "Eʋegbe"
  },
  fo: {
    name: "Faroese",
    nativeName: "føroyskt"
  },
  fj: {
    name: "Fijian",
    nativeName: "vosa Vakaviti"
  },
  fi: {
    name: "Finnish",
    nativeName: "suomi, suomen kieli"
  },
  fr: {
    name: "French",
    nativeName: "français, langue française"
  },
  ff: {
    name: "Fula; Fulah; Pulaar; Pular",
    nativeName: "Fulfulde, Pulaar, Pular"
  },
  gl: {
    name: "Galician",
    nativeName: "Galego"
  },
  ka: {
    name: "Georgian",
    nativeName: "ქართული"
  },
  de: {
    name: "German",
    nativeName: "Deutsch"
  },
  el: {
    name: "Greek, Modern",
    nativeName: "Ελληνικά"
  },
  gn: {
    name: "Guaraní",
    nativeName: "Avañeẽ"
  },
  gu: {
    name: "Gujarati",
    nativeName: "ગુજરાતી"
  },
  ht: {
    name: "Haitian; Haitian Creole",
    nativeName: "Kreyòl ayisyen"
  },
  ha: {
    name: "Hausa",
    nativeName: "Hausa, هَوُسَ"
  },
  he: {
    name: "Hebrew (modern)",
    nativeName: "עברית"
  },
  hz: {
    name: "Herero",
    nativeName: "Otjiherero"
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी, हिंदी"
  },
  ho: {
    name: "Hiri Motu",
    nativeName: "Hiri Motu"
  },
  hu: {
    name: "Hungarian",
    nativeName: "Magyar"
  },
  ia: {
    name: "Interlingua",
    nativeName: "Interlingua"
  },
  id: {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia"
  },
  ie: {
    name: "Interlingue",
    nativeName: "Originally called Occidental; then Interlingue after WWII"
  },
  ga: {
    name: "Irish",
    nativeName: "Gaeilge"
  },
  ig: {
    name: "Igbo",
    nativeName: "Asụsụ Igbo"
  },
  ik: {
    name: "Inupiaq",
    nativeName: "Iñupiaq, Iñupiatun"
  },
  io: {
    name: "Ido",
    nativeName: "Ido"
  },
  is: {
    name: "Icelandic",
    nativeName: "Íslenska"
  },
  it: {
    name: "Italian",
    nativeName: "Italiano"
  },
  iu: {
    name: "Inuktitut",
    nativeName: "ᐃᓄᒃᑎᑐᑦ"
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語 (にほんご／にっぽんご)"
  },
  jv: {
    name: "Javanese",
    nativeName: "basa Jawa"
  },
  kl: {
    name: "Kalaallisut, Greenlandic",
    nativeName: "kalaallisut, kalaallit oqaasii"
  },
  kn: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ"
  },
  kr: {
    name: "Kanuri",
    nativeName: "Kanuri"
  },
  ks: {
    name: "Kashmiri",
    nativeName: "कश्मीरी, كشميري‎"
  },
  kk: {
    name: "Kazakh",
    nativeName: "Қазақ тілі"
  },
  km: {
    name: "Khmer",
    nativeName: "ភាសាខ្មែរ"
  },
  ki: {
    name: "Kikuyu, Gikuyu",
    nativeName: "Gĩkũyũ"
  },
  rw: {
    name: "Kinyarwanda",
    nativeName: "Ikinyarwanda"
  },
  ky: {
    name: "Kirghiz, Kyrgyz",
    nativeName: "кыргыз тили"
  },
  kv: {
    name: "Komi",
    nativeName: "коми кыв"
  },
  kg: {
    name: "Kongo",
    nativeName: "KiKongo"
  },
  ko: {
    name: "Korean",
    nativeName: "한국어 (韓國語), 조선말 (朝鮮語)"
  },
  ku: {
    name: "Kurdish",
    nativeName: "Kurdî, كوردی‎"
  },
  kj: {
    name: "Kwanyama, Kuanyama",
    nativeName: "Kuanyama"
  },
  la: {
    name: "Latin",
    nativeName: "latine, lingua latina"
  },
  lb: {
    name: "Luxembourgish, Letzeburgesch",
    nativeName: "Lëtzebuergesch"
  },
  lg: {
    name: "Luganda",
    nativeName: "Luganda"
  },
  li: {
    name: "Limburgish, Limburgan, Limburger",
    nativeName: "Limburgs"
  },
  ln: {
    name: "Lingala",
    nativeName: "Lingála"
  },
  lo: {
    name: "Lao",
    nativeName: "ພາສາລາວ"
  },
  lt: {
    name: "Lithuanian",
    nativeName: "lietuvių kalba"
  },
  lu: {
    name: "Luba-Katanga",
    nativeName: ""
  },
  lv: {
    name: "Latvian",
    nativeName: "latviešu valoda"
  },
  gv: {
    name: "Manx",
    nativeName: "Gaelg, Gailck"
  },
  mk: {
    name: "Macedonian",
    nativeName: "македонски јазик"
  },
  mg: {
    name: "Malagasy",
    nativeName: "Malagasy fiteny"
  },
  ms: {
    name: "Malay",
    nativeName: "bahasa Melayu, بهاس ملايو‎"
  },
  ml: {
    name: "Malayalam",
    nativeName: "മലയാളം"
  },
  mt: {
    name: "Maltese",
    nativeName: "Malti"
  },
  mi: {
    name: "Māori",
    nativeName: "te reo Māori"
  },
  mr: {
    name: "Marathi (Marāṭhī)",
    nativeName: "मराठी"
  },
  mh: {
    name: "Marshallese",
    nativeName: "Kajin M̧ajeļ"
  },
  mn: {
    name: "Mongolian",
    nativeName: "монгол"
  },
  na: {
    name: "Nauru",
    nativeName: "Ekakairũ Naoero"
  },
  nv: {
    name: "Navajo, Navaho",
    nativeName: "Diné bizaad, Dinékʼehǰí"
  },
  nb: {
    name: "Norwegian Bokmål",
    nativeName: "Norsk bokmål"
  },
  nd: {
    name: "North Ndebele",
    nativeName: "isiNdebele"
  },
  ne: {
    name: "Nepali",
    nativeName: "नेपाली"
  },
  ng: {
    name: "Ndonga",
    nativeName: "Owambo"
  },
  nn: {
    name: "Norwegian Nynorsk",
    nativeName: "Norsk nynorsk"
  },
  no: {
    name: "Norwegian",
    nativeName: "Norsk"
  },
  ii: {
    name: "Nuosu",
    nativeName: "ꆈꌠ꒿ Nuosuhxop"
  },
  nr: {
    name: "South Ndebele",
    nativeName: "isiNdebele"
  },
  oc: {
    name: "Occitan",
    nativeName: "Occitan"
  },
  oj: {
    name: "Ojibwe, Ojibwa",
    nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ"
  },
  cu: {
    name: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
    nativeName: "ѩзыкъ словѣньскъ"
  },
  om: {
    name: "Oromo",
    nativeName: "Afaan Oromoo"
  },
  or: {
    name: "Oriya",
    nativeName: "ଓଡ଼ିଆ"
  },
  os: {
    name: "Ossetian, Ossetic",
    nativeName: "ирон æвзаг"
  },
  pa: {
    name: "Panjabi, Punjabi",
    nativeName: "ਪੰਜਾਬੀ, پنجابی‎"
  },
  pi: {
    name: "Pāli",
    nativeName: "पाऴि"
  },
  fa: {
    name: "Persian",
    nativeName: "فارسی"
  },
  pl: {
    name: "Polish",
    nativeName: "polski"
  },
  ps: {
    name: "Pashto, Pushto",
    nativeName: "پښتو"
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português"
  },
  qu: {
    name: "Quechua",
    nativeName: "Runa Simi, Kichwa"
  },
  rm: {
    name: "Romansh",
    nativeName: "rumantsch grischun"
  },
  rn: {
    name: "Kirundi",
    nativeName: "kiRundi"
  },
  ro: {
    name: "Romanian, Moldavian, Moldovan",
    nativeName: "română"
  },
  ru: {
    name: "Russian",
    nativeName: "русский язык"
  },
  sa: {
    name: "Sanskrit (Saṁskṛta)",
    nativeName: "संस्कृतम्"
  },
  sc: {
    name: "Sardinian",
    nativeName: "sardu"
  },
  sd: {
    name: "Sindhi",
    nativeName: "सिन्धी, سنڌي، سندھی‎"
  },
  se: {
    name: "Northern Sami",
    nativeName: "Davvisámegiella"
  },
  sm: {
    name: "Samoan",
    nativeName: "gagana faa Samoa"
  },
  sg: {
    name: "Sango",
    nativeName: "yângâ tî sängö"
  },
  sr: {
    name: "Serbian",
    nativeName: "српски језик"
  },
  gd: {
    name: "Scottish Gaelic; Gaelic",
    nativeName: "Gàidhlig"
  },
  sn: {
    name: "Shona",
    nativeName: "chiShona"
  },
  si: {
    name: "Sinhala, Sinhalese",
    nativeName: "සිංහල"
  },
  sk: {
    name: "Slovak",
    nativeName: "slovenčina"
  },
  sl: {
    name: "Slovene",
    nativeName: "slovenščina"
  },
  so: {
    name: "Somali",
    nativeName: "Soomaaliga, af Soomaali"
  },
  st: {
    name: "Southern Sotho",
    nativeName: "Sesotho"
  },
  es: {
    name: "Spanish; Castilian",
    nativeName: "español, castellano"
  },
  su: {
    name: "Sundanese",
    nativeName: "Basa Sunda"
  },
  sw: {
    name: "Swahili",
    nativeName: "Kiswahili"
  },
  ss: {
    name: "Swati",
    nativeName: "SiSwati"
  },
  sv: {
    name: "Swedish",
    nativeName: "svenska"
  },
  ta: {
    name: "Tamil",
    nativeName: "தமிழ்"
  },
  te: {
    name: "Telugu",
    nativeName: "తెలుగు"
  },
  tg: {
    name: "Tajik",
    nativeName: "тоҷикӣ, toğikī, تاجیکی‎"
  },
  th: {
    name: "Thai",
    nativeName: "ไทย"
  },
  ti: {
    name: "Tigrinya",
    nativeName: "ትግርኛ"
  },
  bo: {
    name: "Tibetan Standard, Tibetan, Central",
    nativeName: "བོད་ཡིག"
  },
  tk: {
    name: "Turkmen",
    nativeName: "Türkmen, Түркмен"
  },
  tl: {
    name: "Tagalog",
    nativeName: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
  },
  tn: {
    name: "Tswana",
    nativeName: "Setswana"
  },
  to: {
    name: "Tonga (Tonga Islands)",
    nativeName: "faka Tonga"
  },
  tr: {
    name: "Turkish",
    nativeName: "Türkçe"
  },
  ts: {
    name: "Tsonga",
    nativeName: "Xitsonga"
  },
  tt: {
    name: "Tatar",
    nativeName: "татарча, tatarça, تاتارچا‎"
  },
  tw: {
    name: "Twi",
    nativeName: "Twi"
  },
  ty: {
    name: "Tahitian",
    nativeName: "Reo Tahiti"
  },
  ug: {
    name: "Uighur, Uyghur",
    nativeName: "Uyƣurqə, ئۇيغۇرچە‎"
  },
  uk: {
    name: "Ukrainian",
    nativeName: "українська"
  },
  ur: {
    name: "Urdu",
    nativeName: "اردو"
  },
  uz: {
    name: "Uzbek",
    nativeName: "zbek, Ўзбек, أۇزبېك‎"
  },
  ve: {
    name: "Venda",
    nativeName: "Tshivenḓa"
  },
  vi: {
    name: "Vietnamese",
    nativeName: "Tiếng Việt"
  },
  vo: {
    name: "Volapük",
    nativeName: "Volapük"
  },
  wa: {
    name: "Walloon",
    nativeName: "Walon"
  },
  cy: {
    name: "Welsh",
    nativeName: "Cymraeg"
  },
  wo: {
    name: "Wolof",
    nativeName: "Wollof"
  },
  fy: {
    name: "Western Frisian",
    nativeName: "Frysk"
  },
  xh: {
    name: "Xhosa",
    nativeName: "isiXhosa"
  },
  yi: {
    name: "Yiddish",
    nativeName: "ייִדיש"
  },
  yo: {
    name: "Yoruba",
    nativeName: "Yorùbá"
  },
  za: {
    name: "Zhuang, Chuang",
    nativeName: "Saɯ cueŋƅ, Saw cuengh"
  }
};

function getLanguage(code) {
  if (code) {
    return isoLangs[code];
  } else {
    return {};
  }
}

var LANGUAGE_AVAILABLE = ["fr", "en", "es"];

var APP_CONTENT = {
  all: {
    error: ["Contactez l'admin", "Contact the admin", "contacte con el administrador"],
    at_least_8: ["Un minimum de 8 caractères est requis", "A minimum of 8 character is required", "Se requiere un mínimo de 8 caracteres"],
    not_enough: ["Le titre ou le contenu ne contient pas assez de caractère", "The title or the content doesn't contain enough character", "El título o el contenido no tiene suficientes caracteres"]
  },
  menu: {
    search: ["Rechercher", "Search", "Buscar"],
    lang: ["Langue", "Language", "Idioma"],
    stats: ["Statistiques", "Statistics", "Estadísticas"],
    changelog: ["Journal des modifications", "Changelog", "Registro de cambios"]
  },
  search_page: {
    results_count: ["{0} resultat{1} trouvé{1} ({2} visible{1}).", "{0} result{1} found ({2} shown).", "{0} resultado{1} encontrado{1} ({2} mostrado{1})."]
  },
  footer: {
    made_by: ["Fait par", "Made by", "Hecho por"],
    using: ["Utilisant", "Using", "Utilizando"],
    github: ["Le projet sur", "The project on", "El proyecto en"]
  },
  movie_page: {
    status: ["Statut :", "Status:", "Estado:"],
    Rumored: ["Rumeur", "Rumored", "Rumor"],
    Planned: ["Prévu", "Planned", "Planificado"],
    "In Production": ["En Production", "In Production", "En producción"],
    "Post Production": ["Post-production", "Post Production", "Postproducción"],
    Released: ["Publié", "Released", "Publicado"],
    Canceled: ["Annulé", "Canceled", "Cancelado"],
    lang: ["Langue :", "Language:", "Idioma:"],
    revenue: ["Revenu :", "Revenue:", "Ingresos:"],
    budget: ["Budget :", "Budget:", "Presupuesto:"],
    review: ["Critiques", "Reviews", "Comentarios"],
    review_title: ["Titre de la critique", "Title of the review", "Título de la crítica"],
    review_comment: ["Entrez votre critique", "Enter your review", "Introduzca su comentario"],
    add_review: ["Envoyer", "Send", "Enviar"],
    is_rating: ["Je ne veux pas noter", "I dont want to grade", "No quiero calificar"],
    in_cinema: ["Vu au cinéma", "Seen in theaters", "Visto en el cine"],
    is_first_time: ["Premier visionnage", "First viewing", "Primer visionado"],
    is_spoiler: ["Spoiler", "Spoiler", "Spoiler"],
    add_review_title: ["Faites une critique", "Write a review", "Escriba un comentario"],
    list_reviews_title: ["Les autres critiques", "Other reviews", "Otros comentarios"],
    error: ["Une critique doit comprendre un titre et un contenu", "A review must contain a title and a content", "Una reseña debe contener un título y un contenido"],
    submit: ["Votre critique à été ajoutée", "Your review has been added", "Su opinión ha sido añadida"]
  },
  login: {
    login: ["Connexion", "Login", "Inicio de sesión"],
    signout: ["Signout", "Déconnexion", "Desconexión"],
    username: ["Nom d'utilisateur", "Username", "Nombre de usuario"],
    password: ["Mot de passe", "Password", "Contraseña"],
    user: ["Compte", "Account", "Cuenta"]
  },
  user_page: {
    change_password: ["Changer de mot de passe", "Change password", "Cambiar contraseña"],
    change_username: ["Changer de pseudo", "Change username", "Cambiar el nombre de usuario"],
    save: ["Sauvegarder", "Save", "Guardar"],
    new_username: ["Nouveau pseudo", "New username", "Nuevo nombre de usuario"],
    new_password: ["Nouveau mot de passe", "New password", "Nueva contraseña"],
    new_email: ["Nouvel email", "New email", "Nuevo correo electrónico"],
    create: ["Créer", "Create", "crear"],
    success: ["Succès", "Success", "Éxito"]
  }
};

function translate(component, element, lang, variables) {
  if (element) {
    var translation = APP_CONTENT[component][element][LANGUAGE_AVAILABLE.indexOf(lang)];
    if (variables) {
      var _translation;

      translation = (_translation = translation).format.apply(_translation, _toConsumableArray(variables));
    }
    return translation;
  } else {
    return "";
  }
}

function translateAll(element, lang, variables) {
  return translate("all", element, lang, variables);
}

function translateMenu(element, lang, variables) {
  return translate("menu", element, lang, variables);
}

function translateFooter(element, lang, variables) {
  return translate("footer", element, lang, variables);
}

function translateSearchPage(element, lang, variables) {
  return translate("search_page", element, lang, variables);
}

function translateMoviePage(element, lang, variables) {
  return translate("movie_page", element, lang, variables);
}

function translateLogin(element, lang, variables) {
  return translate("login", element, lang, variables);
}

function translateUserPage(element, lang, variable) {
  return translate("user_page", element, lang, variable);
}