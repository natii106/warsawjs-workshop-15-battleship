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

class GameController {
  constructor(cells) {
    this._cells = cells;
  }
  handleCellClick({ location }) {
    this._cells[location].setState('miss');
  }
}

let myController;
function handleCellClick(...args) {
  //args w argumentach metody jest arrayem
  //myController jako this
  myController.handleCellClick.apply(myController, args);
}

const myCell = new CellComponent({ handleCellClick, location: 0 });
const cells = [
  new CellComponent({ handleCellClick, location: 0 }),
  new CellComponent({ handleCellClick, location: 1 })
];
myController = new GameController(cells);

const cellContainer = document.getElementById('cellContainer');
cellContainer.appendChild(cells[0].getElement());
cellContainer.appendChild(cells[1].getElement());
