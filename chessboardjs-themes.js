var themes = [
  "newspaper",
  "pepecorona",
  "merida",
  "jinalpha",
  "maya",
  "ericson",
  "vvvvvvchess",
  "pirat",
]
var pieces = ["bB","bN","bK","bQ","bR","bP","wB","wN","wK","wQ","wR","wP"]
var pieceThemes = {}
themes.forEach((theme) => {
  let svg = theme == "jinalpha"
         || theme == "merida"
         || theme == "maya"
         || theme == "pirat"
  let ext = svg ? ".svg" : ".png"
  pieceThemes[theme] = (piece) => `images/chesspieces/${theme}/${piece}${ext}`
})
var boardThemes = { // light square color, dark square color
  "newspaper":    ['#d2d2c8','#b0a89e'],
  "pepecorona":   ['#e7e2e2','#585a5e'], // dark = #5e6064?
  "merida":       ['#c5d4c9','#698771'],
  "jinalpha":     ['#ada9aa','#59523f'],
  "maya":         ['#aeaebd','#505361'],
  // "ericson":      ['#eff2f2','#101818'],
  "vvvvvvchess":  ['#e1d8e5','#211223'],
  "pirat":        ['#c8cbbc','#6b5753'],
}

/* sources

newspaper: chess.com
pepecorona: https://userstyles.org/styles/187073/pepe-corona-lichess-chess-board
merida: https://github.com/ornicar/lila/issues/3318
jinalpha: jinchess.com https://github.com/lukasmonk/lucaschess
maya: https://github.com/lukasmonk/lucaschess
ericson: https://userstyles.org/styles/116523/ericson-lichess
vvvvvvchess: https://userstyles.org/styles/153638/vvvvvvchess

*/