---
layout: page
permalink: /one-king
title: One King ending
description: humanwaste's analysis of atomic chess one-king ending
---
<body>
  <div class="gamecontainer selected">
    <div id="game0" style="display: flex; flex-direction: column;">
      <div id="board0" class="boardcontainer"></div>
      <div class="noselect">
        <input class="back" id="back0" type="button" value="<">
        <input class="forward" id="forward0" type="button" value=">">
        <input class="backback" id="backback0" type="button" value="<<">
        <input class="forwardforward" id="forwardforward0" type="button" value=">>">
      </div>
    </div>
    <div class="move-list game0 scroller" id="board0variation">
      <div class="comment">
      If the kings are not able to be connected, a queen can force checkmate. If the kings are already connected, however, a single queen cannot force the king to separate and cannot force checkmate. As long as the king is connected it cannot be captured and therefore cannot be checkmated.
      </div>
      <span class="move" id="board0move0">start</span><span class="move" id="board0move1">1. <span class="figurine">K</span>f2</span><span class="move" id="board0move2"><span class="figurine">K</span>c5</span><span class="move" id="board0move3">2. <span class="figurine">K</span>e3</span><span class="move" id="board0move4"><span class="figurine">K</span>b6</span><span class="move" id="board0move5">3. <span class="figurine">K</span>d4</span><span class="move" id="board0move6"><span class="figurine">Q</span>c5</span><span class="move" id="board0move7">4. <span class="figurine">K</span>e4</span><span class="move" id="board0move8"><span class="figurine">Q</span>d4</span><span class="move" id="board0move9">5. <span class="figurine">K</span>f5</span><span class="move" id="board0move10"><span class="figurine">Q</span>e5</span><span class="move" id="board0move11">6. <span class="figurine">K</span>g6</span><span class="move" id="board0move12"><span class="figurine">Q</span>f6</span><span class="move" id="board0move13">6. <span class="figurine">K</span>h7</span><span class="move" id="board0move14"><span class="figurine">Q</span>g7</span>
    </div>
  </div>

  <div class="gamecontainer">
    <div id="game1" style="display: flex; flex-direction: column;">
      <div id="board1" class="boardcontainer"></div>
      <div class="noselect">
        <input class="back" id="back1" type="button" value="<">
        <input class="forward" id="forward1" type="button" value=">">
        <input class="backback" id="backback1" type="button" value="<<">
        <input class="forwardforward" id="forwardforward1" type="button" value=">>">
      </div>
    </div>
    <div class="move-list game1 scroller" id="board1variation">
      <div class="comment">
      If the kings are connected, two rooks can force separation in a corner of the board and in turn force checkmate.
      </div>
      <span class="move" id="board1move0">start</span><span class="move" id="board1move1">1. <span class="figurine">K</span>c3</span><span class="move" id="board1move2"><span class="figurine">R</span>ab2</span><span class="move" id="board1move3">2. <span class="figurine">K</span>d4</span><span class="move" id="board1move4"><span class="figurine">R</span>d1</span><span class="move" id="board1move5">3. <span class="figurine">K</span>c3</span><span class="move" id="board1move6"><span class="figurine">R</span>d3</span><span class="move" id="board1move7">4. <span class="figurine">K</span>c4</span><span class="move" id="board1move8"><span class="figurine">R</span>c2</span><span class="move" id="board1move9">5. <span class="figurine">K</span>b4</span><span class="move" id="board1move10"><span class="figurine">R</span>b3</span><span class="move" id="board1move11">6. <span class="figurine">K</span>a4</span><span class="move" id="board1move12"><span class="figurine">R</span>a2</span>
    </div>
  </div>

  <div class="gamecontainer">
    <div id="game2" style="display: flex; flex-direction: column;">
      <div id="board2" class="boardcontainer"></div>
      <div class="noselect">
        <input class="back" id="back2" type="button" value="<">
        <input class="forward" id="forward2" type="button" value=">">
        <input class="backback" id="backback2" type="button" value="<<">
        <input class="forwardforward" id="forwardforward2" type="button" value=">>">
      </div>
    </div>
    <div class="move-list game2 scroller" id="board2variation">
      <div class="comment">
      An ending of one king against two pieces is winnable for the player with the two pieces if at least one of the two pieces is a rook or queen. A rook and a knight can force separation by  , ; if the kings are already disconnected, then a rook and a knight can create checkmate by forcing the king to the edge of the board with the rook and using the knight to trap the king into one square. 
      </div>
      <span class="move" id="board2move0">start</span><span class="move" id="board2move1">1. <span class="figurine">K</span>c2</span>
      <input type="checkbox" id="checkbox2-1" class="toggler" checked/><label for="checkbox2-1">alt.</label>(<span class="game2 variation" id="board2variation1"><span class="move" id="board2move1-0">1. <span class="figurine">K</span>a3</span><span class="move" id="board2move1-1"><span class="figurine">R</span>b2</span><span class="move" id="board2move1-2">2. <span class="figurine">K</span>a4</span><span class="move" id="board2move1-3"><span class="figurine">R</span>b3</span><span class="move" id="board2move1-4">3. <span class="figurine">K</span>a5</span><span class="move" id="board2move1-5"><span class="figurine">N</span>c3</span><span class="move" id="board2move1-6">4. <span class="figurine">K</span>a6</span><span class="move" id="board2move1-7"><span class="figurine">R</span>b7</span><span class="move" id="board2move1-8">5. <span class="figurine">K</span>a5</span><span class="move" id="board2move1-9"><span class="figurine">N</span>a4</span><span class="move" id="board2move1-10">6. <span class="figurine">K</span>a6</span><span class="move" id="board2move1-11"><span class="figurine">N</span>c5</span><span class="move" id="board2move1-12">7. <span class="figurine">K</span>a5</span><span class="move" id="board2move1-13"><span class="figurine">R</span>b5</span></span>)
      <span class="move" id="board2move2"><span class="figurine">R</span>b2</span><span class="move" id="board2move3">2. <span class="figurine">K</span>b1</span><span class="move" id="board2move4"><span class="figurine">N</span>c1</span><span class="move" id="board2move5">3. <span class="figurine">K</span>a2</span><span class="move" id="board2move6"><span class="figurine">K</span>b1</span><span class="move" id="board2move7">4. <span class="figurine">K</span>a1</span><span class="move" id="board2move8"><span class="figurine">N</span>b3</span><span class="move" id="board2move9">5. <span class="figurine">K</span>a2</span><span class="move" id="board2move10"><span class="figurine">N</span>a1</span><span class="move" id="board2move11">6. <span class="figurine">K</span>a3</span><span class="move" id="board2move12"><span class="figurine">K</span>c1</span><span class="move" id="board2move13">7. <span class="figurine">K</span>a4</span><span class="move" id="board2move14"><span class="figurine">R</span>b4</span><span class="move" id="board2move15">8. <span class="figurine">K</span>a3</span><span class="move" id="board2move16"><span class="figurine">K</span>d2</span><span class="move" id="board2move17">9. <span class="figurine">K</span>a2</span><span class="move" id="board2move18"><span class="figurine">K</span>e3</span><span class="move" id="board2move19">10. <span class="figurine">K</span>a3</span><span class="move" id="board2move20"><span class="figurine">N</span>c2</span><span class="move" id="board2move21">11. <span class="figurine">K</span>a2</span><span class="move" id="board2move22"><span class="figurine">R</span>b2</span>
    </div>
  </div>

  <div class="gamecontainer">
    <div id="game3" style="display: flex; flex-direction: column;">
      <div id="board3" class="boardcontainer"></div>
      <div class="noselect">
        <input class="back" id="back3" type="button" value="<">
        <input class="forward" id="forward3" type="button" value=">">
        <input class="backback" id="backback3" type="button" value="<<">
        <input class="forwardforward" id="forwardforward3" type="button" value=">>">
      </div>
    </div>
    <div class="move-list game3 scroller" id="board3variation">
      <span class="move" id="board3move0">start</span><span class="move" id="board3move1">1. <span class="figurine">K</span>c3</span>
    <input type="checkbox" id="checkbox3-1" class="toggler" checked/><label for="checkbox3-1">alt.</label>(<span class="game3 variation" id="board3variation1"><span class="move" id="board3move1-0">1. <span class="figurine">K</span>c2</span><span class="move" id="board3move1-1"><span class="figurine">R</span>c1</span><span class="move" id="board3move1-2">2. <span class="figurine">K</span>b2</span><span class="move" id="board3move1-3"><span class="figurine">R</span>c2</span><span class="move" id="board3move1-4">3. <span class="figurine">K</span>b1</span><span class="move" id="board3move1-5"><span class="figurine">R</span>b2</span><span class="move" id="board3move1-6">4. <span class="figurine">K</span>c1</span><span class="move" id="board3move1-7"><span class="figurine">B</span>b1</span></span>)
    <span class="move" id="board3move2">1...<span class="figurine">R</span>b2</span><span class="move" id="board3move3">2. <span class="figurine">K</span>d3</span><span class="move" id="board3move4"><span class="figurine">R</span>c2</span><span class="move" id="board3move5">3. <span class="figurine">K</span>d4</span><span class="move" id="board3move6"><span class="figurine">R</span>c3</span><span class="move" id="board3move7">4. <span class="figurine">K</span>e4</span><span class="move" id="board3move8"><span class="figurine">R</span>d3</span><span class="move" id="board3move9">5. <span class="figurine">K</span>e5</span><span class="move" id="board3move10"><span class="figurine">R</span>d4</span><span class="move" id="board3move11">6. <span class="figurine">K</span>f5</span><span class="move" id="board3move12"><span class="figurine">R</span>e4</span><span class="move" id="board3move13">7. <span class="figurine">K</span>f6</span><span class="move" id="board3move14"><span class="figurine">R</span>e5</span><span class="move" id="board3move15">8. <span class="figurine">K</span>g6</span><span class="move" id="board3move16"><span class="figurine">R</span>f5</span><span class="move" id="board3move17">9. <span class="figurine">K</span>g7</span><span class="move" id="board3move18"><span class="figurine">R</span>f6</span><span class="move" id="board3move19">10. <span class="figurine">K</span>h7</span><span class="move" id="board3move20"><span class="figurine">R</span>g6</span><span class="move" id="board3move21">11. <span class="figurine">K</span>h8</span><span class="move" id="board3move22"><span class="figurine">B</span>b1</span><span class="move" id="board3move23">12. <span class="figurine">K</span>h7</span><span class="move" id="board3move24"><span class="figurine">B</span>c2</span><span class="move" id="board3move25">13. <span class="figurine">K</span>h8</span><span class="move" id="board3move26"><span class="figurine">R</span>g8</span>
    </div>
  </div>


  <script>
    const numOfBoards = 4
    const fenlist =
    [
      [["8/8/2q5/8/3k4/8/8/6K1 w - - 0 1",null],["8/8/2q5/8/3k4/8/5K2/8 b - - 1 1",null],["8/8/2q5/2k5/8/8/5K2/8 w - - 2 2",null],["8/8/2q5/2k5/8/4K3/8/8 b - - 3 2",null],["8/8/1kq5/8/8/4K3/8/8 w - - 4 3",null],["8/8/1kq5/8/3K4/8/8/8 b - - 5 3",null],["8/8/1k6/2q5/3K4/8/8/8 w - - 6 4",null],["8/8/1k6/2q5/4K3/8/8/8 b - - 7 4",null],["8/8/1k6/8/3qK3/8/8/8 w - - 8 5",null],["8/8/1k6/5K2/3q4/8/8/8 b - - 9 5",null],["8/8/1k6/4qK2/8/8/8/8 w - - 10 6",null],["8/8/1k4K1/4q3/8/8/8/8 b - - 11 6",null],["8/8/1k3qK1/8/8/8/8/8 w - - 12 7",null],["8/7K/1k3q2/8/8/8/8/8 b - - 13 7",null],["8/6qK/1k6/8/8/8/8/8 w - - 14 8",null]]
      ,
      [["8/8/8/8/8/8/rK6/kr6 w - - 0 1",null],["8/8/8/8/8/2K5/r7/kr6 b - - 1 1",null],["8/8/8/8/8/2K5/1r6/kr6 w - - 2 2",null],["8/8/8/8/3K4/8/1r6/kr6 b - - 3 2",null],["8/8/8/8/3K4/8/1r6/k2r4 w - - 4 3",null],["8/8/8/8/8/2K5/1r6/k2r4 b - - 5 3",null],["8/8/8/8/8/2Kr4/1r6/k7 w - - 6 4",null],["8/8/8/8/2K5/3r4/1r6/k7 b - - 7 4",null],["8/8/8/8/2K5/3r4/2r5/k7 w - - 8 5",null],["8/8/8/8/1K6/3r4/2r5/k7 b - - 9 5",null],["8/8/8/8/1K6/1r6/2r5/k7 w - - 10 6",null],["8/8/8/8/K7/1r6/2r5/k7 b - - 11 6",null],["8/8/8/8/K7/1r6/r7/k7 w - - 12 7",null]]
      ,
      [["8/8/8/8/8/8/nK6/kr6 w - - 0 1",null],["8/8/8/8/8/8/n1K5/kr6 b - - 1 1",[["8/8/8/8/8/K7/n7/kr6 b - - 1 1",null],["8/8/8/8/8/K7/nr6/k7 w - - 2 2",null],["8/8/8/8/K7/8/nr6/k7 b - - 3 2",null],["8/8/8/8/K7/1r6/n7/k7 w - - 4 3",null],["8/8/8/K7/8/1r6/n7/k7 b - - 5 3",null],["8/8/8/K7/8/1rn5/8/k7 w - - 6 4",null],["8/8/K7/8/8/1rn5/8/k7 b - - 7 4",null],["8/1r6/K7/8/8/2n5/8/k7 w - - 8 5",null],["8/1r6/8/K7/8/2n5/8/k7 b - - 9 5",null],["8/1r6/8/K7/n7/8/8/k7 w - - 10 6",null],["8/1r6/K7/8/n7/8/8/k7 b - - 11 6",null],["8/1r6/K7/2n5/8/8/8/k7 w - - 12 7",null],["8/1r6/8/K1n5/8/8/8/k7 b - - 13 7",null],["8/8/8/Krn5/8/8/8/k7 w - - 14 8",null]]],["8/8/8/8/8/8/nrK5/k7 w - - 2 2",null],["8/8/8/8/8/8/nr6/kK6 b - - 3 2",null],["8/8/8/8/8/8/1r6/kKn5 w - - 4 3",null],["8/8/8/8/8/8/Kr6/k1n5 b - - 5 3",null],["8/8/8/8/8/8/Kr6/1kn5 w - - 6 4",null],["8/8/8/8/8/8/1r6/Kkn5 b - - 7 4",null],["8/8/8/8/8/1n6/1r6/Kk6 w - - 8 5",null],["8/8/8/8/8/1n6/Kr6/1k6 b - - 9 5",null],["8/8/8/8/8/8/Kr6/nk6 w - - 10 6",null],["8/8/8/8/8/K7/1r6/nk6 b - - 11 6",null],["8/8/8/8/8/K7/1r6/n1k5 w - - 12 7",null],["8/8/8/8/K7/8/1r6/n1k5 b - - 13 7",null],["8/8/8/8/Kr6/8/8/n1k5 w - - 14 8",null],["8/8/8/8/1r6/K7/8/n1k5 b - - 15 8",null],["8/8/8/8/1r6/K7/3k4/n7 w - - 16 9",null],["8/8/8/8/1r6/8/K2k4/n7 b - - 17 9",null],["8/8/8/8/1r6/4k3/K7/n7 w - - 18 10",null],["8/8/8/8/1r6/K3k3/8/n7 b - - 19 10",null],["8/8/8/8/1r6/K3k3/2n5/8 w - - 20 11",null],["8/8/8/8/1r6/4k3/K1n5/8 b - - 21 11",null],["8/8/8/8/8/4k3/Krn5/8 w - - 22 12",null]]
      ,
      [["8/8/8/8/8/8/bK6/kr6 w - - 0 1",null],["8/8/8/8/8/2K5/b7/kr6 b - - 1 1",[["8/8/8/8/8/8/b1K5/kr6 b - - 1 1",null],["8/8/8/8/8/8/b1K5/k1r5 w - - 2 2",null],["8/8/8/8/8/8/bK6/k1r5 b - - 3 2",null],["8/8/8/8/8/8/bKr5/k7 w - - 4 3",null],["8/8/8/8/8/8/b1r5/kK6 b - - 5 3",null],["8/8/8/8/8/8/br6/kK6 w - - 6 4",null],["8/8/8/8/8/8/br6/k1K5 b - - 7 4",null],["8/8/8/8/8/8/1r6/kbK5 w - - 8 5",null]]],["8/8/8/8/8/2K5/br6/k7 w - - 2 2",null],["8/8/8/8/8/3K4/br6/k7 b - - 3 2",null],["8/8/8/8/8/3K4/b1r5/k7 w - - 4 3",null],["8/8/8/8/3K4/8/b1r5/k7 b - - 5 3",null],["8/8/8/8/3K4/2r5/b7/k7 w - - 6 4",null],["8/8/8/8/4K3/2r5/b7/k7 b - - 7 4",null],["8/8/8/8/4K3/3r4/b7/k7 w - - 8 5",null],["8/8/8/4K3/8/3r4/b7/k7 b - - 9 5",null],["8/8/8/4K3/3r4/8/b7/k7 w - - 10 6",null],["8/8/8/5K2/3r4/8/b7/k7 b - - 11 6",null],["8/8/8/5K2/4r3/8/b7/k7 w - - 12 7",null],["8/8/5K2/8/4r3/8/b7/k7 b - - 13 7",null],["8/8/5K2/4r3/8/8/b7/k7 w - - 14 8",null],["8/8/6K1/4r3/8/8/b7/k7 b - - 15 8",null],["8/8/6K1/5r2/8/8/b7/k7 w - - 16 9",null],["8/6K1/8/5r2/8/8/b7/k7 b - - 17 9",null],["8/6K1/5r2/8/8/8/b7/k7 w - - 18 10",null],["8/7K/5r2/8/8/8/b7/k7 b - - 19 10",null],["8/7K/6r1/8/8/8/b7/k7 w - - 20 11",null],["7K/8/6r1/8/8/8/b7/k7 b - - 21 11",null],["7K/8/6r1/8/8/8/8/kb6 w - - 22 12",null],["8/7K/6r1/8/8/8/8/kb6 b - - 23 12",null],["8/7K/6r1/8/8/8/2b5/k7 w - - 24 13",null],["7K/8/6r1/8/8/8/2b5/k7 b - - 25 13",null],["6rK/8/8/8/8/8/2b5/k7 w - - 26 14",null]]
      ,
    ]

    var arrows = [
      {}
      ,
      {}
      ,
      {"0":[["b2-c2","1"],["b2-a3","1-0"]]}
      ,
      {"0":[["b2-c3","1"],["b2-c2","1-0"]]}
      ,
    ]

    var theme = "merida"

    function instantiateBoards(n) {
      // insert chessboards in n boardcontainers board0, board1, ...
      let boards = []
      for(let i = 0; i < n; i++) {
        let board = ChessBoard(`board${i}`, {
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