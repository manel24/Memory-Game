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

let game_over = false;

let moves = 0;

let stars = 0;
/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976

function initGame() {
  cards = shuffle(cards);
  cards.forEach(function(card, index) {
    const c = document.createElement("li");
    c.innerHTML = `<i class="fa ${card}"></i>`;
    c.classList.add("card");
    document.querySelector(".deck").appendChild(c);
  });
}

function shuffle(array) {
  document.querySelector(".moves").textContent = moves;
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

function displayCard(card) {
  card.classList.add("show");
}

function clearBoard() {
  if (open_cards.length % 2 == 0) {
    document.querySelectorAll(".card.show").forEach(function(card) {
      card.classList.remove("show");
      open_cards.pop();
    });
    console.log("open cards are now : ", open_cards);
  }
}

function setAsOpenCard(card) {
  open_cards.push(card.childNodes[0].classList[1]); // Expl : adds "fa-diamond" to open_cards
}

//TODO fix click events issue when game is restarted
function restartGame() {
  moves = 0;
  game_over = false;
  document.querySelector(".deck").innerHTML = ""; //empty the game board
  initGame();
  open_cards = [];
}

function matchFound() {
  console.log("match found");
  document.querySelectorAll(`.card.show`).forEach(function(card) {
    console.log(card);
    card.classList.remove("show");
    card.classList.add("open");
    card.classList.add("match");
  });
  document.querySelector(".stars").innerHTML +=
    '<li> <i class = "fa fa-star" > </i></li>';
  stars = stars + 1;
  console.log("stars=", stars);
  if (open_cards.length === cards.length) {
    game_over = true;
  }
}
//TODO fix simultaneous clicks > 2 issue (disabling click events after 2 open cards)
function playGame() {
  document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("click", function(e) {
      card = e.target; //current card
      displayCard(card);
      setAsOpenCard(card);
      moves = moves + 1; //increment moves
      document.querySelector(".moves").textContent = moves;
      if (open_cards.length > 1) {
        console.log("current class:  ", card.childNodes[0].classList[1]);
        console.log("current open cards  ", open_cards);
        //match found
        if (
          open_cards[open_cards.length - 1] ===
          open_cards[open_cards.length - 2]
        ) {
          matchFound();
        }
      }
      //ALl cards have been matched
      if (open_cards.length === cards.length) {
        game_over = true;
      }
      //GAME OVER
      //TODO fix issue of having last card not turning "matched" only after the alert box pops up
      if (game_over) {
        alert(`Well done ! you won with ${moves} moves.`);
      }
    });
    card.addEventListener("mouseout", function(e) {
      console.log("mouse out event");
      if (open_cards.length >= 2 && open_cards.length % 2 == 0) {
        setTimeout(function() {
          //Clear non matching cards from the board
          clearBoard(open_cards);
        }, 2000);
      }
    });
  });
  //restart GAME
  document.querySelector(".restart").addEventListener("click", function(e) {
    restartGame();
  });
}

/*main program*/
initGame();
playGame();
