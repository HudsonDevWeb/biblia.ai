export interface BibleBookMetadata {
  id: number
  abbrev: string
  name: string
  testament: 'OT' | 'NT'
  group: string
  chaptersCount: number
}

export const BIBLE_BOOKS: BibleBookMetadata[] = [
  {
    "id": 1,
    "abbrev": "GN",
    "name": "Gênesis",
    "testament": "OT",
    "group": "Pentateuco",
    "chaptersCount": 50
  },
  {
    "id": 2,
    "abbrev": "EX",
    "name": "Êxodo",
    "testament": "OT",
    "group": "Pentateuco",
    "chaptersCount": 40
  },
  {
    "id": 3,
    "abbrev": "LV",
    "name": "Levítico",
    "testament": "OT",
    "group": "Pentateuco",
    "chaptersCount": 27
  },
  {
    "id": 4,
    "abbrev": "NM",
    "name": "Números",
    "testament": "OT",
    "group": "Pentateuco",
    "chaptersCount": 36
  },
  {
    "id": 5,
    "abbrev": "DT",
    "name": "Deuteronômio",
    "testament": "OT",
    "group": "Pentateuco",
    "chaptersCount": 34
  },
  {
    "id": 6,
    "abbrev": "JS",
    "name": "Josué",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 24
  },
  {
    "id": 7,
    "abbrev": "JZ",
    "name": "Juízes",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 21
  },
  {
    "id": 8,
    "abbrev": "RT",
    "name": "Rute",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 4
  },
  {
    "id": 9,
    "abbrev": "1SM",
    "name": "1 Samuel",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 31
  },
  {
    "id": 10,
    "abbrev": "2SM",
    "name": "2 Samuel",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 24
  },
  {
    "id": 11,
    "abbrev": "1RS",
    "name": "1 Reis",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 22
  },
  {
    "id": 12,
    "abbrev": "2RS",
    "name": "2 Reis",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 25
  },
  {
    "id": 13,
    "abbrev": "1CR",
    "name": "1 Crônicas",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 29
  },
  {
    "id": 14,
    "abbrev": "2CR",
    "name": "2 Crônicas",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 36
  },
  {
    "id": 15,
    "abbrev": "ED",
    "name": "Esdras",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 10
  },
  {
    "id": 16,
    "abbrev": "NE",
    "name": "Neemias",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 13
  },
  {
    "id": 17,
    "abbrev": "ET",
    "name": "Ester",
    "testament": "OT",
    "group": "Históricos",
    "chaptersCount": 10
  },
  {
    "id": 18,
    "abbrev": "JÓ",
    "name": "Jó",
    "testament": "OT",
    "group": "Poéticos",
    "chaptersCount": 42
  },
  {
    "id": 19,
    "abbrev": "SL",
    "name": "Salmos",
    "testament": "OT",
    "group": "Poéticos",
    "chaptersCount": 150
  },
  {
    "id": 20,
    "abbrev": "PV",
    "name": "Provérbios",
    "testament": "OT",
    "group": "Poéticos",
    "chaptersCount": 31
  },
  {
    "id": 21,
    "abbrev": "EC",
    "name": "Eclesiastes",
    "testament": "OT",
    "group": "Poéticos",
    "chaptersCount": 12
  },
  {
    "id": 22,
    "abbrev": "CT",
    "name": "Cântico dos Cânticos",
    "testament": "OT",
    "group": "Poéticos",
    "chaptersCount": 8
  },
  {
    "id": 23,
    "abbrev": "IS",
    "name": "Isaías",
    "testament": "OT",
    "group": "Profetas Maiores",
    "chaptersCount": 66
  },
  {
    "id": 24,
    "abbrev": "JR",
    "name": "Jeremias",
    "testament": "OT",
    "group": "Profetas Maiores",
    "chaptersCount": 52
  },
  {
    "id": 25,
    "abbrev": "LM",
    "name": "Lamentações",
    "testament": "OT",
    "group": "Profetas Maiores",
    "chaptersCount": 5
  },
  {
    "id": 26,
    "abbrev": "EZ",
    "name": "Ezequiel",
    "testament": "OT",
    "group": "Profetas Maiores",
    "chaptersCount": 48
  },
  {
    "id": 27,
    "abbrev": "DN",
    "name": "Daniel",
    "testament": "OT",
    "group": "Profetas Maiores",
    "chaptersCount": 12
  },
  {
    "id": 28,
    "abbrev": "OS",
    "name": "Oseias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 14
  },
  {
    "id": 29,
    "abbrev": "JL",
    "name": "Joel",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 3
  },
  {
    "id": 30,
    "abbrev": "AM",
    "name": "Amós",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 9
  },
  {
    "id": 31,
    "abbrev": "OB",
    "name": "Obadias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 1
  },
  {
    "id": 32,
    "abbrev": "JN",
    "name": "Jonas",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 4
  },
  {
    "id": 33,
    "abbrev": "MQ",
    "name": "Miqueias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 7
  },
  {
    "id": 34,
    "abbrev": "NA",
    "name": "Naum",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 3
  },
  {
    "id": 35,
    "abbrev": "HC",
    "name": "Habacuque",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 3
  },
  {
    "id": 36,
    "abbrev": "SF",
    "name": "Sofonias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 3
  },
  {
    "id": 37,
    "abbrev": "AG",
    "name": "Ageu",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 2
  },
  {
    "id": 38,
    "abbrev": "ZC",
    "name": "Zacarias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 14
  },
  {
    "id": 39,
    "abbrev": "ML",
    "name": "Malaquias",
    "testament": "OT",
    "group": "Profetas Menores",
    "chaptersCount": 4
  },
  {
    "id": 40,
    "abbrev": "MT",
    "name": "Mateus",
    "testament": "NT",
    "group": "Evangelhos",
    "chaptersCount": 28
  },
  {
    "id": 41,
    "abbrev": "MC",
    "name": "Marcos",
    "testament": "NT",
    "group": "Evangelhos",
    "chaptersCount": 16
  },
  {
    "id": 42,
    "abbrev": "LC",
    "name": "Lucas",
    "testament": "NT",
    "group": "Evangelhos",
    "chaptersCount": 24
  },
  {
    "id": 43,
    "abbrev": "JO",
    "name": "João",
    "testament": "NT",
    "group": "Evangelhos",
    "chaptersCount": 21
  },
  {
    "id": 44,
    "abbrev": "ATOS",
    "name": "Atos",
    "testament": "NT",
    "group": "Histórico",
    "chaptersCount": 28
  },
  {
    "id": 45,
    "abbrev": "RM",
    "name": "Romanos",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 16
  },
  {
    "id": 46,
    "abbrev": "1CO",
    "name": "1 Coríntios",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 16
  },
  {
    "id": 47,
    "abbrev": "2CO",
    "name": "2 Coríntios",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 13
  },
  {
    "id": 48,
    "abbrev": "GL",
    "name": "Gálatas",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 6
  },
  {
    "id": 49,
    "abbrev": "EF",
    "name": "Efésios",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 6
  },
  {
    "id": 50,
    "abbrev": "FP",
    "name": "Filipenses",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 4
  },
  {
    "id": 51,
    "abbrev": "CL",
    "name": "Colossenses",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 4
  },
  {
    "id": 52,
    "abbrev": "1TS",
    "name": "1 Tessalonicenses",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 5
  },
  {
    "id": 53,
    "abbrev": "2TS",
    "name": "2 Tessalonicenses",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 3
  },
  {
    "id": 54,
    "abbrev": "1TM",
    "name": "1 Timóteo",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 6
  },
  {
    "id": 55,
    "abbrev": "2TM",
    "name": "2 Timóteo",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 4
  },
  {
    "id": 56,
    "abbrev": "TT",
    "name": "Tito",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 3
  },
  {
    "id": 57,
    "abbrev": "FM",
    "name": "Filemom",
    "testament": "NT",
    "group": "Cartas Paulinas",
    "chaptersCount": 1
  },
  {
    "id": 58,
    "abbrev": "HB",
    "name": "Hebreus",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 13
  },
  {
    "id": 59,
    "abbrev": "TG",
    "name": "Tiago",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 5
  },
  {
    "id": 60,
    "abbrev": "1PE",
    "name": "1 Pedro",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 5
  },
  {
    "id": 61,
    "abbrev": "2PE",
    "name": "2 Pedro",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 3
  },
  {
    "id": 62,
    "abbrev": "1JO",
    "name": "1 João",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 5
  },
  {
    "id": 63,
    "abbrev": "2JO",
    "name": "2 João",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 1
  },
  {
    "id": 64,
    "abbrev": "3JO",
    "name": "3 João",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 1
  },
  {
    "id": 65,
    "abbrev": "JD",
    "name": "Judas",
    "testament": "NT",
    "group": "Cartas Gerais",
    "chaptersCount": 1
  },
  {
    "id": 66,
    "abbrev": "AP",
    "name": "Apocalipse",
    "testament": "NT",
    "group": "Profecia",
    "chaptersCount": 22
  }
]
