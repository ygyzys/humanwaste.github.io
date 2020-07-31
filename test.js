const { Chess } = require('./chess.js')
const fs = require('fs'); 

function sanToLan(startfen, san) {
  let game = new Chess(startfen, 3)
  const dests = game.dests() // an object that maps start squares to a list of all possible end squares (shows all possible moves in the current position)

  // possible move forms: Nf3, Nf3+, Nxf3, Nxf3+, e8, e8=Q, e8=Q+, O-O, O-O-O
  
  // we have enough information to return the answer if the move is castling
  if (san === "O-O-O") {
    return (game.turn() === "w") ? "e1-c1" : "e8-c8"
  }
  else if (san === "O-O") {
    return (game.turn() === "w") ? "e1-g1" : "e8-g8"
  }
  
  // for non-castling moves, the destination square is always given by san.substring(i-1,2) where i is the index of the last digit
  // (a move can have two digits, e.g. N6e8, so we should find the last digit (from the left) which is also the first digit from the right)
  const endSq = ((san) => {
    let i = san.length-1
    while (i >= 0 && !san[i].match(/[1-8]/)) {i--;}
    return san.substring(i-1,i+1)
  })(san)

  // figure out what type of piece is being moved
  let piece;
  if (san[0].match(/[KQRBN]/)) {
    piece = san[0]
  }
  else {
    piece = "p"
  }
  piece = (game.turn() === "w") ? piece.toUpperCase() : piece.toLowerCase()

  // determine the location of all instances of the given piece in the fen
  const possibleStartSquares = (function locatePiece(fen, piece) {
    // given a piece (e.g., "K" for the white king or "k" for the black king) and a fen, determine
    // squares (e.g. "e1") with the piece
    fen = fen.split(" ")[0]
    let rank = 8
    let file = 97 // "a"
    let i = 0
    let possibleStartSquares = []
    while (i < fen.length) {
      if (fen[i].match(/[kqrbnp]/i)) {
        if (fen[i] === piece) {
          possibleStartSquares.push(String.fromCharCode(file) + rank)
        }
        file++
      }
      else if (fen[i] === "/") {
        rank--
        file = 97
      }
      else if (fen[i].match(/[1-8]/)) {
        file += parseInt(fen[i])
      }
      i++
    }
    return possibleStartSquares
  })(game.fen(), piece); // test fen rn1qkbnr/p1p1p2p/4b1p1/1p1pQ3/8/2N1P3/PPPP1PPP/R1B1KB1R w KQkq b6 0 7

  let possibleMoves = []
  for (const x in dests) {
    if (dests[x].includes(endSq) && possibleStartSquares.includes(x)) {
      // if there is a legal move from square x to the destination square
      // and x contains the desired piece,
      // add it to possibleMoves
      possibleMoves.push({ from: x, to: endSq })
    }
  }
  if (possibleMoves.length > 1) {
    for (let i = 0; i < possibleMoves.length; i++) {
      game.move(san) // play the input san move
      let tmpGame = new Chess(startfen, 3)
      tmpGame.move(possibleMoves[i])
      if (tmpGame.fen() == game.fen()) {
        // if two moves (of the same type of piece) somehow lead to the same position
        // (possible or not?),
        // just return the first one that is a match
        return `${possibleMoves[i]["from"]}-${possibleMoves[i]["to"]}`
      }
    }
  }
  else if (possibleMoves.length == 0) {
    return false
  }
  else {
    return `${possibleMoves[0]["from"]}-${possibleMoves[0]["to"]}`
  }
}

function buildPosTree(startfen, pgn, buildMoveTree) {
  // pgn is something like "1. Nf3 f6 (1...e5) 2. d4 (2. e4 (2. e3 e6)) 2...d5 3. Na6"
  // (in which variations (and subvariations, subsubvariations, etc) are recursively embedded)
  // the output is an array of FEN strings
  // buildMoveTree indicates whether we should build a move tree instead of a positoin tree
  // (e.g. 1. Nf3 f6 will produce "Nf3" in the first elt of the tree and "f6" in the second elt)
  if (!startfen) startfen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  let atomicgame = new Chess(startfen, 3)
  let posTree = []
  for (let i = 0; i < pgn.length; i ++) {
    // skip numbers, periods and whitespace
    while (pgn[i] && pgn[i].match(/[0-9.\s]/i)) {
      i++
    }
    if (pgn[i] && pgn[i].match(/[a-hKQRBNO]/)) {
      // we're at the beginning of a move
      let b = i
      // find the end of the move
      if (pgn[i] == "O") {
        while (pgn[i] && pgn[i].match(/[-O]/i)) { // get to the last char of "O-O" or "O-O-O"
          i++
        }
        i--
      }
      else {
        while (pgn[i] && !pgn[i].match(/[1-8]/i)) { // a non-castling move ends in a number
          i++
        }
      }
      // (actually a move can end with +, #, =Q, =R, =B or =N,
      // but these suffixes don't matter to chess.js)
      let singleMove = pgn.slice(b,i+1)
      atomicgame.move(singleMove)
      if (buildMoveTree) {
        posTree.push([ atomicgame.fen(), null, singleMove ])
      }
      else {
        posTree.push([ atomicgame.fen(), null ])
      }
    }
    else if (pgn[i] && pgn[i].match(/[([]/i)) {
      /* ( or [ indicates the start of a variation
      goal: find the closing bracket in order to extract the variation text
      and recursively build the variation tree */
      let b = i+1
      let count = 1
      while (count > 0) {
        i++
        if (pgn[i].match(/[([]/i)) {
          count++
        }
        else if (pgn[i].match(/[)\]]/i)) {
          count--
        }
      }
      let variationtext = pgn.slice(b,i)
      // the start of the variation is 2 moves back, not 1 move back
      // for example in "1. Nf3 f6 (1...e5)", 1...e5 is played after 1. Nf3, not after 1. Nf3 f6
      let newstartfen
      if (posTree.length > 1) {
        newstartfen = posTree[posTree.length-2][0]
      }
      else { // a variation can begin on the first move (e.g. 1. Nf3 (1. Nc3)) - posTree.length would be 1
        // take the original start fen
        newstartfen = startfen
      }
      let variationtree = buildPosTree(newstartfen, variationtext, buildMoveTree)
      posTree[posTree.length-1][1] = variationtree
    }
  }
  return posTree
}

function buildPosTree2(startfen, pgn)
{
  if (!startfen) startfen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  // same as buildPosTree, but:
  // include the start fen at the beginning of the position tree (as the first position in the main line)
  let posTree = buildPosTree(startfen, pgn) 
  posTree.unshift( [ startfen, null ] )
  return posTree
}

function buildSingleGameHTML(gamenum, pgn)
{
  if (!gamenum) gamenum = 0
  function buildMoveSpans(pgn, prefix)
  {
    /* Moves of the main line are put in spans with id `board${boardnum}move${movenum}`,
    but moves within a variation which occurs at move n of the main line are put in spans
    of id `board${boardnum}move${n}-${movenum}`, and this idea is recursively applied for subvariations.
    So a move with id board4move1-2-3 is the 3rd move (on the 4th board of the webpage) 
    of a variation in the 2nd move of a variation in the 1st move in the main line. For example:
    1. Nf3   f6   (1...e5   2. Ng5   f5   (2...f6   3. Nf7   Qe7   4. Nd6+)) 
    0        1     1-0      1-1      1-2   1-2-0    1-2-1    1-2-2 1-2-3  

    To accomplish this, we write a function that we utilize recursively that takes a prefix:
    initially, the prefix is empty; but when we have entered a variation we take the current move number
    and append a hyphen and take that as the prefix.
    
    */
    let code = ""
    let movecount;
    if (!prefix) {
      prefix = ""
      movecount = 0 // empty prefix => we're in mainline => there is a start button, which is technically move 0
    }
    else {
      movecount = -1 // if there's a prefix, we're building a variation, so there will be no "start" move
      // start 1. Nf3 f6 (1...e5 2. Ng5)
      // ^0    ^1     ^2  ^2-0   ^2-1
    }
    for (let i = 0; i < pgn.length; i++) {
      if (pgn[i].match(/[a-h1-9KQRBNO]/)) {
        movecount++
        // we're at the beginning of a move (including the index)
        // "1. Nf3 ..." or "1. Nf3 f6"
        //  ^                      ^
        let b = i
        // skip past any move index and go to the first letter of the move
        if (pgn[i].match(/[1-9]/i)) {
          while (pgn[i] && !pgn[i].match(/[a-hKQRBNO]/)) {
            i++
          }
        }
        // now go to the end
        //  "1. Nf3 ..." "9. O-O-O"
        //        ^              ^
        if (pgn[i] == "O") {
          while (pgn[i] && (pgn[i] == "-" || pgn[i] == "O")) {
            i++
          }
          i--
        }
        else {
          while (pgn[i] && !pgn[i].match(/[1-8]/i)) {
            i++
          }
        }
        // ignore extra suffixes
        if (pgn[i+1] == "=") { // "e8" could be "e8=Q"; skip to the Q
          i = i+2
        }
        if (pgn[i+1] && pgn[i+1].match(/[+#]/i)) { // Ng5 could be "Ng5+"; skip to the +
          i++
        }
        // now extract the move
        let singleMove = pgn.slice(b, i+1)
        // finally, update the move text to include figurine code
        singleMove = singleMove.replace(/[KQRBN]/g, (match) => `<span class="figurine">${match}</span>`)
        // put the move text inside a span of class "move" with an id that indicates the game number and move number
        code += `<span class="move" id="board${gamenum}move${prefix}${movecount}">${singleMove}</span>`
      }
      else if (pgn[i].match(/[([]/i)) {
        // we're at the beginning of a variation
        // goal: call this function recursively to build the HTML for the variation
        // first step: extract the variation text between the brackets
        let b = i+1
        let count = 1
        while (count > 0) {
          i++
          if (pgn[i] && pgn[i].match(/[([]/i)) {
            count++
          }
          else if (pgn[i] && pgn[i].match(/[)\]]/i)) {
            count--
          }
        }
        let variationpgn = pgn.slice(b,i)
        let newPrefix = `${prefix}${movecount}` // equivalent to the current cursor: e.g., "2-0" is the cursor for 1...d6 in 1. Nf3 f6 (1...d6)
        let variationHTML = buildMoveSpans(variationpgn, `${newPrefix}-`)
        let checkboxId = `checkbox${gamenum}${newPrefix ? `-${newPrefix}` : ''}`
        let variationSpanClass = `game${gamenum} variation` // used to identify variations for toggling
        let variationSpanId = `board${gamenum}variation${newPrefix}` // used to highlight variations (gray out non-selected variations)
        code +=
`
    <input type="checkbox" id="${checkboxId}" class="toggler" checked/><label for="${checkboxId}">alt.</label>(<span class="${variationSpanClass}" id="${variationSpanId}">${variationHTML}</span>)
    `
      }
    }
    return code
  }


  let moveSpans = buildMoveSpans(pgn)

  let code =
`  <div class="gamecontainer${gamenum == 0 ? ' selected' : ''}">
    <div id="game${gamenum}" style="display: flex; flex-direction: column;">
      <div id="board${gamenum}" class="boardcontainer"></div>
      <div class="noselect">
        <input class="back" id="back${gamenum}" type="button" value="<">
        <input class="forward" id="forward${gamenum}" type="button" value=">">
        <input class="backback" id="backback${gamenum}" type="button" value="<<">
        <input class="forwardforward" id="forwardforward${gamenum}" type="button" value=">>">
      </div>
    </div>
    <div class="move-list game${gamenum} scroller" id="board${gamenum}variation">
      <span class="move" id="board${gamenum}move0">start</span>${moveSpans}
    </div>
  </div>`
  return code
}

// let startfen = "r1bqkbnr/pppppppp/n7/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2"
// let pgn = "2...f6 3. Nc3 d5 4. Nb5 Bg4 5. f3 Nb4 6. Nxc7 Nxc2 7. e4 a6 (7...Rc8 8. Bd2 e5 (8...a5 9. Bb5+ Kd8 10. Bc3 e5 11. Rc1) 9. Bb4 Bxb4 10. Bb5+ Kf8 11. Rc1 Rc2 12. Rxc2 Bd7) 8. Rc1 Rc8 9. Rc7 Rxc7 10. e5 h5 11. Nh3 e6 12. b4 Bd6 13. Bd3 g6 (13...Nh6 14. Bg6+ fxg5 15. Kd2 Bc7 16. Ng5 O-O 17. Rc1) 14. Bc1"
// console.log( JSON.stringify(buildPosTree2(startfen, pgn), null, 2) )
// console.log("")
// console.log(buildSingleGameHTML(gamenum, pgn))

// fs.appendFileSync('test.js', `\n/*\n${JSON.stringify(buildPosTree2(startfen, pgn), null, 0)}\n*/\n`);
// fs.appendFileSync('test.js', `\n/*\n${buildSingleGameHTML(gamenum, pgn)}\n*/\n`);

// let moveTree = buildPosTree(startfen, pgn, true)
// moveTree.unshift([startfen, null, "start"]) // add "start" move to 0 index

// console.log(JSON.stringify(moveTree, null, 2))

// transform tree to only keep the moves
// moveTree = (function mapMoveTree(moveTree) {
//   return moveTree.map((elt) => {
//     if (elt[1]) {
//       return [ elt[2], mapMoveTree(elt[1]) ]
//     }
//     else {
//       return [ elt[2], null ]
//     }
//     // e.g. mapElt == [ "Nf3", [ "Nh3", [ "Na3", null ] ] ] represents
//     // the main move "Nf3" and its variation "Nh3" (and subvariation "Na3")
//   })
// })(moveTree)

function getVariations(moveTree, prefix) {
  // produce an object specifying all variation arrows that should be drawn for the given move tree
  // each arrow/variation is of the form <beforeMoveNum> : [ [ <LAN-representation-of-the-move>, <afterMoveNum> ] ]
  // an example output would be
  // {
  //   "1": [ ["f7-f6", "2"], ["e7-e5", "2-0"] ],
  //   "2": [ ["b1-c3", "3"], ["b1-a3", "3-0"], ["e2-e3", "3-0-0"] ],
  // }
  // for the pgn "start 1. Nf3 f6 (1...e5) 2. Nc3 (2. Na3 (2. e3))""
  //              ^0    ^1     ^2  ^2-0    ^3      ^3-0    ^3-0-0
  // for which the moveTree would be
  // [
  //   [ <fen>, null, "start" ],
  //   [ <fen>, null, "Nf3" ],
  //   [ <fen>, [ <fen>, null, "e5" ], "f6" ],
  //   [ <fen>, [ <fen>, [ <fen>, null, "e3" ], "Na3" ], "Nc3" ]
  // ]
  // move 1 contains both continuations f6 and e5 (moves 2 and 2-0, respectively)
  // and move 2 contains three continuations Nc3, Na3 and e3 (moves 3, 3-0 and 3-0-0, respectively)
  if (!prefix) prefix = ""
  // the technique will be to traverse the tree and check each element for a non-null second
  // element. if one is found, we (a) recursively obtain the arrows for the tree of the second element
  // (and merge them into our result), and
  // (b) get the arrows for the current position in the tree by collecting the tail elements of each nested object
  // in sequence as long as a second element exists

  // for example when we are in the last object of the above moveTree, we find that (a) the move "Nc3"
  // (with index 3)
  // has the tail elements "e3" and "Na3", corresponding to moves 3-0 and 3-0-0, and (b) the 
  // recursive solution gets us variations for "Na3" (which has index 3-0), namely just "e3".

  // note that we should ignore moves with indexes that end in 0 (move 0, move 1-0, 1-0-0, etc) since collecting
  // the 0th move is redundant if we have already collected it in step (a). in the mainline the 0th move is just "start"
  // (to return to the start position). 

  let arrows = {}
  for (let moveNum = 0; moveNum < moveTree.length; moveNum++) {
    let node = moveTree[moveNum]
    if (node[1]) {
      // the current element has a second element => the current move has a variation
      let key = prefix ? `${prefix}-${moveNum-1}` : `${moveNum-1}` // the key represents the index of the previous move
      let obj = { [key] : [ ] }

      if (moveNum > 0) {
        let startfen = moveTree[moveNum-1][0]
        let mainMoveSan = node[2]
        let mainMoveLan = sanToLan(startfen, mainMoveSan)

        obj[key].push([ mainMoveLan, prefix ? `${prefix}-${moveNum}` : `${moveNum}` ])

        // now add all variations to obj[key]
        let i = 1
        while (node[1]) {
          node = node[1][0] // go to the first node in the variation tree
          let sanMove = node[2]
          let lanMove = sanToLan(startfen, sanMove)
          obj[key].push([ lanMove, prefix ? `${prefix}-${moveNum}${"-0".repeat(i)}` : `${moveNum}${"-0".repeat(i)}` ])
          i++
        }

        Object.assign(arrows, obj) // merge into arrows
      }

      let updatedPrefix = prefix ? `${prefix}-${moveNum}` : `${moveNum}`
      let deepArrows = getVariations(moveTree[moveNum][1], updatedPrefix)
      Object.assign(arrows, deepArrows) // merge into arrows
    }
    else {
      // do nothing (no arrows) since current element's second element is null)
    }
  }
  return arrows
}




function createPage(opening, startfen, ...pgnList) {
  // let permalink = opening.replace(/(\d+)\.\s?/g, "").split(".").join("").replace(/(\s+)/g, "-").toLowerCase()
  let permalink = opening.replace(/(\.+)\s?/g, "-").split(" ").join("-")
  let boardhtml = ''
  let fenlist = ''
  var arrows = ''
  pgnList.forEach((pgn, i) => {
    boardhtml += `${buildSingleGameHTML(i, pgn)}
`
    fenlist += `${JSON.stringify(buildPosTree2(startfen, pgn), null, 0)}
      ,
      `
    let moveTree = buildPosTree(startfen, pgn, true)
    moveTree.unshift([startfen, null, "start"]) // add "start" move to 0 index
    arrows += `${JSON.stringify(getVariations(moveTree), null, 0)}
      ,
      `
  })

  return `---
layout: page
permalink: /${permalink}
title: ${opening}
description: humanwaste's analysis of atomic chess opening ${opening}
---
<body>
${boardhtml}
  <script>
    const numOfBoards = ${pgnList.length}
    const fenlist =
    [
      ${fenlist}
    ]

    var arrows = [
      ${arrows}
    ]

    var theme = "merida"

    function instantiateBoards(n) {
      // insert chessboards in n boardcontainers board0, board1, ...
      let boards = []
      for(let i = 0; i < n; i++) {
        let board = ChessBoard(\`board\${i}\`, {
          pieceTheme: window["pieceThemes"][theme],
          boardTheme: window["boardThemes"][theme],
          position: "start",
          moveSpeed: 38,
          draggable: false,
          showNotation: false,
        })
        boards.push(board)
      }
      return boards
    }

    var boards = instantiateBoards(numOfBoards)
    var cursors = new Array(numOfBoards)
    var leaderlines = new Array(numOfBoards)
    for (let i = 0; i < numOfBoards; i++) {
      leaderlines[i] = [];
      cursors[i] = "0";
    }
  </script>
</body>
<!-- inputs used to create this page
opening : ${opening}
startfen : ${startfen}
PGN's: ${JSON.stringify(pgnList, null, 2)}
-->`
}

//inputs :
let opening;
let startfen;
let pgn;

opening = "1. d4 Nh6"
startfen = "rnbqkb1r/pppppppp/7n/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2"
pgn = "2. f3 Ng4 3. fxg4 d5 4. Nf3 Bg4 5. g3 Na6 6. Bh3 Nb4 7. O-O f6 8. c3 Nc2 9. Ng5 e6 10. e4 (10. Nf7 Qd6 (10...Qc8 11. Bxg4) 11. Bxg4 (11. Rf3 Qa6 12. c4 dxc4) 11...Qa6 12. c4 dxc4 13. Rf4) 10...Be2 11. Kh1 Nxa1 12. Nf7 Qd7 (12...Qc8 (12...Qd6 13. exd5 Bxd1 14. Re1 f5 15. Nd8) 13. Bg5 (13. e5)) 13. Nd6+ Kd8 14. Ne8 c5 (14...c6 15. Bg5 (15. Qa4)) 15. Bxe6 (15. Qa4 Qxa4 16. Nxg7 Bxf1 17. exd5) 15...Bxd1 16. Re1"

// opening = "1. d4 Na6"
// startfen = "r1bqkbnr/pppppppp/n7/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2"
// pgn = "2. Bg5 f6 3. Nc3 d5 4. Nb5 Bg4 5. f3 Nb4 6. Nxc7 Nxc2 7. e4 a6 (7...Rc8 8. Bd2 e5 (8...a5 9. Bb5+ Kd8 10. Bc3 e5 11. Rc1) 9. Bb4 Bxb4 10. Bb5+ Kf8 11. Rc1 Rc2 12. Rxc2 Bd7) 8. Rc1 Rc8 9. Rc7 Rxc7 10. e5 h5 11. Nh3 e6 12. b4 Bd6 13. Bd3 g6 (13...Nh6 14. Bg6+ fxg5 15. Kd2 Bc7 16. Ng5 O-O 17. Rc1) 14. Bc1"
// pgn2 = "2. Nh3 e6 (2...f6 (2...h6 3. Bg5)) 3. Ng5 f5 4. b4 (4. Bf4 (4. a3 h6 5. Nd2 hxg5 6. Nf3 Nh6 7. Bg5 Qf6 8. Nh4) 4...Bd6 (4...e5 (4...Nb4 5. Bxc7 Rc8 (5...Nf6 6. e3 Ng4 7. f4) 6. e4) 5. Bd2 (5. Nxh7 Qh4 6. g3 Qh5 (6...Nb4 7. gxh4 Nxc2) 7. g4 Qh4 8. Bg3 Nb4 9. Bxh4 Nxc2 10. a3) 5...Nb4 (5...Bb4 6. c3) 6. Bxb4) 5. Nxh7 Qh4 (5...Nb4 6. Bg5 Qf6 7. Bxf6 Nxc2 8. h4) 6. g3) 4...h6 (4...Bxb4 5. c3 h6 6. e4 hxg5 7. Bg5 Nf6 8. d5 O-O (8...e5 9. d6 c6 10. Qb3)) 5. Nh7 Bxb4 6. e4 Nb4 7. Qh5+ g6 8. Qh4 Qxh4 9. a3 Nxc2 10. Bb5 c6 11. Rc1 b6 (11...Ne7 12. d5 Rxh7 (12...exd5 13. Nf6+ Kf8 14. Ng8 Nd5 15. Bxc6) 13. dxe6) 12. Bxc6 (12. Nf8) 12...Rxh7 13. Rc7 Kf8 14. Kd2 a5 15. Rb7"

// opening = "1. d4 Nf6"
// startfen = "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2"
// pgn = "2. Bg5 d5 3. Nf3 Bg4 4. e3 e6 (4...c6 (4...Na6 5. c3 c6 (5...Bxf3 6. Bd3) 6. Bd3 Nb4 (6...Nc5 (6...e6 7. O-O Bxf3 8. h3) 7. dxc5 Qa5 8. Qa4 e5 9. Qb4 (9. Bxh7 d5) 9...Qc5 10. Qb6 Qxb6 (10...axb6 11. a4)) 7. cxb4 Qa5+ 8. b4 Qa4 (8...e6 (8...O-O-O 9. Ba6 Qxa6 10. Nc3) 9. Bg6 O-O-O (9...fxg6 10. bxa5) 10. Bxf7) 9. Qxa4 O-O-O 10. Nc3) 5. c3 e6 6. Qa4 Bxf3 7. Nd2) 5. Bb5+ c6 6. O-O Bxf3 7. f4 cxb5 (7...Na6 8. f5 Nb4 (8...Qb8 9. g3 Ng4 10. h3 f6 11. fxe6 Nf2 (11...h5 12. Qd3 (12. Qe1 (12. Qe2 Nh2 13. Rd1 Nf3+ 14. Kh1 Ng1 15. Qe1 h4 16. e4 Bb4 17. c3 hxg3 18. exd5 Ne2) 12...Nh2 13. Rf3 Bb4)) 12. Qe2 Bb4 (12...Qc8 13. Nc3 Qg4 (13...Nb4 14. e4) 14. hxg4 O-O-O 15. Bxc6) 13. e4 Bd2 14. exd5 Be3 15. Re1) 9. fxe6 f6 10. Qh5+ g6 11. Bxf6 Qf6 12. Qxg6 O-O-O 13. a3)"
// pgn2 = "2. f3 d5 (2...e6 (2...Nd5 3. Nc3) 3. e4 (3. Bg5))"

// opening = "1. Nf3 f6 2. Nc3 Nh6 3. Ne5 fxe5"
// startfen = "rnbqkb1r/ppppp1pp/7n/8/8/2N5/PPPPPPPP/R1BQKB1R w KQkq - 0 4"
// pgn = `4. e4 Ng4 5. f4 c6 6. h3 e5
// (6...g6 7. hxg4 Bh6 8. e5 (8. Qg4 e6 (8...Bxf4 9. Nd5 e5 10. Nf6+ Qxf6 11. Bc4) 9. Qh4 Bg5 (9...Qxh4) 10. Qxh7 (10. Nb5 cxb5 11. Bb5 Nc6 12. Qxh7) 10...Bh6 (10...Bh4+ 11. g3) 11. d4) 8...d5 (8...e6) 9. e6 d4
//   (9...Na6
//     (9...O-O
//       (9...Bxe6)
//     10. Bd3 d4 (10...Rf5) 11. Bxg6 h5 12. d3 dxc3 13. Be3)
//   10. Nb5 O-O
//     (10...Nb4 11. Nc7+ Kf8 12. Qh5 gxh5 13. Rh6))
// 10. d3)
// 7. hxg4 (7. Nb5 (7. Nd5)) 7...d5 8. Qh5+ g6 9. Qh4 (9. Nb5 Qh4+ 10. g3) 9...Qf6 (9...Qg5 (9...Qxh4))`

// opening = "1. Nh3 h6 2. d4 e6 3. Bg5"
// startfen = "rnbqkbnr/pppp1pp1/4p2p/6B1/3P4/7N/PPP1PPPP/RN1QKB1R b KQkq - 1 3"
// pgn = "3...f6 4. e3 Na6 (4...hxg5 (4...fxg5) 5. Nf4 g6 (5...Bb4+ 6. c3 Nh6 7. Qh5+ g6 8. Nd5 Ng4 9. Kd1) 6. d5) 5. Bf4 e5 (5...d6 (5...Nb4 6. Bxc7) 6. Nc3) 6. Ng5 f5 (6...Nb4 7. Nf7 Qe7 8. Nd6+ Qxd6 9. Qh5+ g6 10. Qh3 f5 11. Qh4) 7. Nf7 Qh4 8. g3 Nb4 9. Bg5 (9. Qh5 Qxh5 10. a3) 9...Bd6 (9...Nf6 10. dxe5 Bd6 11. Ne5 O-O (11...Kf8 12. Be7+ Kg8 13. Ng6+ Kf7 14. Bf6 Ke8 15. Nf8) 12. Be7 Rf6 (12...Kh7 (12...Kh8 13. Ng6+ Kh7 14. Bg5) 13. gxh4 h5 14. Rg1 g5 15. Bxg5) 13. gxh4 g5 (13...h5 (13...Nxc2 14. Bf8 g5 15. Bc4+) 14. Ng6 Kh7 15. Rg1 (15. Bf8 Bxf8 (15...Rxf8 16. Qd5 Nxd5 17. Rg1) 16. Rg1 Rf8 17. Rg5) 15...Nd3 16. Bxd3 Bb4 17. c3 Rf8 18. Qd5) 14. Qh5 Rg6 15. Qxg5) 10. dxe5 d6 11. Be7"
// pgn2 = "3...hxg5 4. Ng5 f5 5. e4 (5. Na3 Nh6 (5...Bb4+ (5...Nf6 6. Nf7 Qe7 7. Ne5 d5 8. Ng6) 6. c3 Nf6 7. Nf7 O-O) 6. Qc1 (6. e3 Ng4 7. f4 Nxh2) 6...Ng4 7. Kd1) 5...Na6 6. Na3 Nh6 7. f4 (7. Nf7 Qh4+ 8. g3 Nb4 9. Qh5) 7...Ng4 (7...fxe4 (7...Nb4 8. Nh7 Be7 9. Qh5+ g6 10. Nb5) 8. Nb5 Ng4) 8. Nf7 Qh4+ 9. Qxg4 Nb4 10. Nb5 Nxa2 (10...a6 11. Nbd6+ cxd6 (11...Bxd6 12. a3) 12. Bb5 axb5) 11. Nxh8 a6 12. Nxc7 "
// pgn3 = "3...f6 4. Bf4 e5 (4...Bb4+ (4...d6 (4...Bd6 5. Nc3) 5. Nc3 c6 6. e4 (6. Nb5 (6. Qd3)) ) 5. c3 d6 6. Na3 Bxa3 7. Qa4+ c6 (7...b5 8. Qa5) 8. O-O-O b5 (8...Qa5 (8...Na6 9. d5)))"
// pgn4 = "3...f6 4. Bh4"

opening = "1. Nf3 f6 2. e4 d5"
startfen = "rnbqkbnr/ppp1p1pp/5p2/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq d6 0 3"
pgn = "3. Nc3 Bg4 4. d4 (4. e5) 4...Na6 (4...c6 (4...a6 (4...b5)))"
pgn2 = `3. Nc3 b5 4. d4 Nh6 5. g4 e5
(5...Bxg4 (5...c6) 6. h3 (6. Rg1 (6. exd5 (6. f3))) 6...e6 (6...c6 (6...Nd7 (6...Ng4 (6...g6 (6...e5))))) 7. exd5 (7. e5 (7. Rg1 (7. Bg2))) 7...Nf5 (7...Nc6 (7...g6 (7...Qd6 (7...Bd6 (7...c6 (7...c5 (7...Ba3)))))) 8. Bxb5 Qd6 (8...c6 (8...Bb4)) 9. Qh5+ g6 10. Qb5+ Qc6 (10...c6 11. Qb7 Qc7 12. Ne4) 11. d5 Qxb5 12. Bd3) 8. Bh6 Qd6 (8...Bd6 (8...Nxh6 (8...Nh4 (8...Ba3))) 9. Nd5 Bg3 (9...Ng3 (9...Bh2 (9...Nxd4))) 10. fxg3) 9. Bg2 (9. Qg4) 9...Ne3 (9...Qh2 (9...Qg3 (9...Nxd4 (9...Ng3) 10. Qxd6 Bd6 (10...Bc5 (10...Nc6 (10...gxh6 11. O-O-O Bd6 (11...Kf7 12. Rde1 e5 13. Bd5+ Ke7 14. Bg8) 12. Bc6+ Kd8 13. Rhe1) 11. Rd1 Bb4+ 12. c3 Nd4 13. Bc6+ Ke7 14. Bf4 Kf7 15. Rg1 g5 16. Bxg5 Nf3+ 17. Bxf3 Bc5 18. Rd4) 11. O-O-O Bd4 12. c3 Nc6 (12...gxh6 13. Bc6+ Kf8 (13...Nxc6 14. cxd4) 14. Rg1) 13. cxd4 Nd4 14. Bc6+ Ke7 15. Bf4) 11. Bc6+ Kd8 12. O-O-O))) 10. Qe2 Qh2)
6. exd5 c6 (6...Nc6 (6...Bd6 (6...Be6 (6...e4 (6...Bb7)))))`

// endgames: one king
// opening = "one king"
// startfen = "8/8/2q5/8/3k4/8/8/5K1 w - - 0 1"
// pgn = "1. Kf2 Kc5 2. Ke3 Kb6 3. Kd4 Qc5 4. Ke4 Qd4 5. Kf5 Qe5 6. Kg6 Qf6 6. Kh7 Qg7"

// startfen = "8/8/8/8/8/8/rK6/kr6 w - - 0 1"
// pgn2 = "1. Kc3 Rab2 2. Kd4 Rd1 3. Kc3 Rd3 4. Kc4 Rc2 5. Kb4 Rb3 6. Ka4 Ra2*"

// startfen = "8/8/8/8/8/8/nK6/kr6 w - - 0 1"
// pgn3 = "1. Kc2 (1. Ka3 Rb2 2. Ka4 Rb3 3. Ka5 Nc3 4. Ka6 Rb7 5. Ka5 Na4 6. Ka6 Nc5 7. Ka5 Rb5) Rb2 2. Kb1 Nc1 3. Ka2 Kb1 4. Ka1 Nb3 5. Ka2 Na1 6. Ka3 Kc1 7. Ka4Rb4 8. Ka3 Kd2 9. Ka2 Ke3 10. Ka3 Nc2 11. Ka2 Rb2"

// startfen = "8/8/8/8/8/8/bK6/kr6 w - - 0 1"
// pgn4 = "1. Kc3 (1. Kc2 Rc1 2. Kb2 Rc2 3. Kb1 Rb2 4. Kc1 Bb1) 1...Rb2 2. Kd3 Rc2 3. Kd4 Rc3 4. Ke4 Rd3 5. Ke5 Rd4 6. Kf5 Re4 7. Kf6 Re5 8. Kg6 Rf5 9. Kg7 Rf6 10. Kh7 Rg6 11. Kh8 Bb1 12. Kh7 Bc2 13. Kh8 Rg8"

let output = createPage(opening, startfen, pgn, pgn2)
// // output to tmp file
fs.writeFileSync('tmp', output);