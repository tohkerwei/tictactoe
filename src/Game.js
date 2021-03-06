import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

class Game extends React.Component { //game just calls board and stores history of board

  constructor(props) {
    super(props);
    this.state = {
      //history is an array of squares which is an array of 9 number
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xISNext: true,
    };
  }

  //handles what happens to each square box when clicked
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xISNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xISNext: !this.state.xISNext,
    });
  }

  //handles what happens when a move is clicked
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xISNext: (step % 2 ) === 0,
    })
  }

  
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winningTiles = calculateWinningTiles(current.squares);
  
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner) {
      status = 'Winner is: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xISNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            winningTiles={winningTiles}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// finds the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //i think this is the place to make the winning squares yellow
      return squares[a];
    }
  }
  return null;
}

// finds the winning tiles
function calculateWinningTiles(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //i think this is the place to make the winning squares yellow
      return lines[i];
    }
  }
  return null;
}

export default Game;