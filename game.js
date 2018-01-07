'use strict';
class Component {
  getElement() {
    return this._element;
  }
}

class CellComponent extends Component {
  //location - musimy wiedziec gdzie jestesmy aby zmieniac stan konkretnej komórki
  //dectructuring assingment
  //jesli nie mam location: location, to domyslnie value jest takie samo jak key
  constructor({ location, handleCellClick }) {
    super();
    this._state = 'unknown';
    this._element = document.createElement('td');
    this._element.addEventListener('click', function() {
      handleCellClick({ location });
    });
    this._refresh();
  }

  setState(stateName) {
    this._state = stateName;
    this._refresh();
  }

  _refresh() {
    this._element.textContent = this._state;
    this._element.className = 'cell_' + this._state;
  }
}

//setting state on proper cell
class BoardComponent extends Component {
  constructor({ handleCellClick, size = 8 }) {
    super();
    // Create _element, create child cells, append to our element
    this._element = document.createElement('table');
    this._cells = {};
    for (let rowNumber = 0; rowNumber < size; rowNumber++) {
      const rowElement = document.createElement('tr');
      for (let colNumber = 0; colNumber < size; colNumber++) {
        const cell = new CellComponent({
          handleCellClick,
          location : { row: rowNumber, column: colNumber}
        });
        rowElement.appendChild(cell.getElement());
        this._cells[`${rowNumber}x${colNumber}`] = cell;
      }
      this._element.appendChild(rowElement);
    }
  }

  setCellState(location, state) {
    //Find the appropriate cell, call its setState()
    const key = `${location.row}x${location.column}`;
    console.log(this._cells);
    this._cells[key].setState(state);
  }
}
class GameController {
  constructor(model) {
    this._model = model;
  }
  handleCellClick({ location }) {
    console.log();
    this._model.fireAt(location);
  }
}

//Models
class CellModel {
  constructor(hasShip) {
    this._hasShip = hasShip;
    this._firedAt = false;
  }
  //fire at one cell, return : has ship
  fire() {
    if (this._firedAt) {
      return undefined;
    }
    this._firedAt = true;
    console.log('fired');
    return this._hasShip ? 'hit' : 'miss';
  }
}
class BoardModel {
  constructor({ size = 8} = {}) {
    this._cells = {};
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this._cells[`${i}x${j}`] = new CellModel({ hasShip: false });
      }
    }
    console.log(this);
  }
  fireAt(location) {
    const target = this._cells[`${location.row}x${location.column}`];
    const trigeredResult = target.fire();
  }
}

let myController;
function handleCellClick(...args) {
  //args w argumentach metody jest arrayem
  //myController jako this
  myController.handleCellClick.apply(myController, args);
}

const myCell = new CellComponent({ handleCellClick, location: 0 });
const boardView = new BoardComponent({ handleCellClick });
const boardModel = new BoardModel();
myController = new GameController(boardModel);


document.getElementById('boardContainer').appendChild(boardView.getElement());
