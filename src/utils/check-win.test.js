import checkWin from './check-win.js'

function assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin) {

  // convert zeros to nulls (for convenience - so we can represent nulls as `0` in the tests below)
  for (let i=0; i<squares.length; i++) {
    if (squares[i] === 0) squares[i] = null;
  }

  for (let i=0; i<squares.length; i++) {

    // Act
    const result = checkWin(squares, numRows, numCols, i, numCellsInALineToWin);

    // Assert
    expect( result.length>0 ).toEqual( winningSquares[i]==true );

  }

}

test('checkWin() - SE', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 0, 0, 0, 0,
                    0, 1, 0, 1,
                    0, 0, 1, 1,
                    0, 1, 1, 1 ];

  const winningSquares = [ 0, 0, 0, 0,
                           0, 1, 0, 1,
                           0, 0, 0, 0,
                           0, 1, 0, 1 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});

test('checkWin() - NE', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 0, 1, 1, 1,
                    0, 0, 1, 1,
                    0, 1, 0, 1,
                    0, 0, 0, 0 ];

  const winningSquares = [ 0, 1, 0, 1,
                           0, 0, 0, 0,
                           0, 1, 0, 1,
                           0, 0, 0, 0 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});

test('checkWin() - NW', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 1, 1, 1, 0,
                    1, 1, 0, 0,
                    1, 0, 1, 0,
                    0, 0, 0, 0 ];

  const winningSquares = [ 1, 0, 1, 0,
                           0, 0, 0, 0,
                           1, 0, 1, 0,
                           0, 0, 0, 0 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});

test('checkWin() - SW', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 0, 0, 0, 0,
                    1, 0, 1, 0,
                    1, 1, 0, 0,
                    1, 1, 1, 0 ];

  const winningSquares = [ 0, 0, 0, 0,
                           1, 0, 1, 0,
                           0, 0, 0, 0,
                           1, 0, 1, 0 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});

test('checkWin() - Vertical', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 0, 1, 0, 0,
                    0, 1, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 1, 0 ];

  const winningSquares = [ 0, 1, 0, 0,
                           0, 0, 1, 0,
                           0, 1, 0, 0,
                           0, 0, 1, 0 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});

test('checkWin() - Horizontal', () => {

  // Arrange
  const numRows = 4;
  const numCols = 4;
  const numCellsInALineToWin = 3

  const squares = [ 0, 0, 0, 0,
                    1, 1, 1, 0,
                    0, 1, 1, 1,
                    0, 0, 0, 0 ];

  const winningSquares = [ 0, 0, 0, 0,
                           1, 0, 1, 0,
                           0, 1, 0, 1,
                           0, 0, 0, 0 ];

  assert(squares, winningSquares, numRows, numCols, numCellsInALineToWin);

});
