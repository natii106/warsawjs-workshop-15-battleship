const gameContainer = document.querySelector('#game');
const cell = document.createElement('div');
//const niezmienialny, let modyfikowalny
//cell.innerText depricated
//const textNode = document.createTextNode('Hello, world');
//cell.appendChild(textNode); same as textContent, shows basics of the structure
cell.textContent = 'Hello, world!';
gameContainer.appendChild(cell);

let onClick = function onClick() {
  cell.textContent = 'Clicked';
}
cell.addEventListener('click', onClick;

//1. ma ona name i mozna ja pobrac, bedzie w stack trace
//2. wykona sie za kazdym razem
// bedzie w function scope
// //to jest to samo co var onCLick =
// function onClick() {
//   console.log('');
// }
// // funkcja anonimowa
// //temporal dead zone dla let i const
// const onCLick2 = function() {
//   console.log('2');
// }
