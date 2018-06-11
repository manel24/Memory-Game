/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-cube",
  "fa-cube",
  "fa-bolt",
  "fa-bolt",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];
let open_cards = [];

let game_over = false

let moves = 0

let stars = 0
/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976

function initGame() {
  cards = shuffle(cards);
  cards.forEach(function (card, index) {
    const c = document.createElement("li");
    c.innerHTML = `<i class="fa ${card}"></i>`;
    c.classList.add("card");
    document.querySelector(".deck").appendChild(c);
  });
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayCard(e) {
  e.target.classList.add("show");
  e.target.classList.add("open");
}

function clearBoard() {
  document.querySelectorAll('.card.open').forEach(function (card) {
    card.classList.remove('show')
    card.classList.remove('open')
    open_cards.pop()
    open_cards.pop()
    console.log('open cards are now : ', open_cards)
  })
}

function setAsOpenCard(e) {
  open_cards.push(e.target.childNodes[0].classList[1]) // Expl : adds "fa-diamond" to open_cards
}

function restartGame() {
  document.querySelector(".deck").innerHTML = ''
  open_cards = []
  moves = 0
  game_over = false
  initGame()
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function playGame() {
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function (e) {
      displayCard(e);
      setAsOpenCard(e);
      if (open_cards.length > 1) {
        console.log('current class:  ', e.target.childNodes[0].classList[1])
        console.log('current open cards  ', open_cards)
        if (open_cards[open_cards.length - 1] === open_cards[open_cards.length - 2]) {
          console.log('match found')
          document.querySelectorAll('.card.open').forEach(function (card) {
            card.classList.remove('open')
            card.classList.remove('show')
            card.classList.add('match')

          })
          document.querySelector('.stars').innerHTML +=
            '<li> <i class = "fa fa-star" > </i></li>'
          stars = stars + 1
          console.log('stars=',stars)
        }
      }
      moves = moves + 1
      document.querySelector('.moves').textContent = moves
      if (stars === 8) {
        alert(`Well done ! you won with ${moves} moves.`)
      }
    });
    card.addEventListener("mouseout", function (e) {
      if ((open_cards.length >= 2) && (open_cards.length % 2 == 0)) {
        setTimeout(function () {
          clearBoard(open_cards)
        }, 1000);

      }
    });
  })
  document.querySelector('.restart').addEventListener('click', function (e) {
    restartGame()
  })
}

/*main program*/
initGame();
playGame();