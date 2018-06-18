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
let clicks = 0;
let totalclicks = 0;
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

function clearBoard(open_cards) {
  if (open_cards.length % 2 == 0) {
    document.querySelectorAll(".card.show").forEach(function (card) {
      open_cards.forEach(function (card_symbol, index) {
        if (card.childNodes[0].classList.contains(card_symbol)) {
          card.classList.remove("show");
          open_cards.splice(index, 1);
        }
      });
    });
  }
}

function setAsOpenCard(card) {
  open_cards.push(card.childNodes[0].classList[1]); // Expl : adds "fa-diamond" to open_cards
}

function restartGame() {
  moves = 0;
  game_over = false;
  open_cards = [];
  document.querySelector(".deck").innerHTML = ""; //empty the game board
  document.querySelector(".stars").innerHTML = "";
  initGame();
  playGame();
}

function matchFound(card_symbol) {

  document.querySelectorAll(`.card.show`).forEach(function (card) {
    if (card.childNodes[0].classList.contains(card_symbol)) {
      card.classList.remove("show");
      card.classList.add("open", "match");
    }

  });
  document.querySelector(".stars").innerHTML +=
    '<li> <i class = "fa fa-star" > </i></li>';
  if (open_cards.length === cards.length) {
    game_over = true;
  }
}

function playGame() {
  document.querySelectorAll(".card").forEach(function (card) {

    card.addEventListener("click", function (e) {
      if (totalclicks == 0) {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime() {
          ++totalSeconds;
          secondsLabel.innerHTML = pad(totalSeconds % 60);
          minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
          var valString = val + "";
          if (valString.length < 2) {
            return "0" + valString;
          } else {
            return valString;
          }
        }
      }
      if (clicks == 1) {
        document.querySelectorAll(".card").forEach(function (c) {
          c.style.cursor = "not-allowed";
          c.style.pointerEvents = 'not-allowed'
          setTimeout(function () {
            //Clear non matching cards from the board after 2 seconds
            c.style.cursor = "pointer";
            c.style.pointerEvents = 'auto'
          }, 2000);
        });

      } else {
        e.target.style.cursor = "pointer";
      }
      totalclicks += 1
      clicks = (clicks + 1) % 2
      card = e.target; //current card
      displayCard(card);
      setAsOpenCard(card);
      if (totalclicks % 2 == 0) {
        moves = moves + 1; //increment moves
        document.querySelector(".moves").textContent = moves;
      }

      if (open_cards.length > 1) {
        //match found
        if (
          open_cards[open_cards.length - 1] ===
          open_cards[open_cards.length - 2]
        ) {
          matchFound(card.childNodes[0].classList[1]);
        } else {
          //No match found
          setTimeout(function () {
            //Clear non matching cards from the board after 2 seconds
            clearBoard(open_cards);
          }, 2000);
        }
      }
      //ALl cards have been matched
      if (open_cards.length === cards.length) {
        game_over = true;
      }
      if (game_over) {
        if (moves == cards.length) {
          alert(`Excellent ! you made zero errors using exactly ${moves} clicks !`)
        } else if (moves > cards.length && moves < 30) {
          alert(`Good job ! you won using ${moves} clicks !`)
        } else {
          alert(`Oh Oh ! You can do better ! you won using ${moves} clicks !`)
        }
      }
      //GAME OVER
      //TODO fix issue of having last card not turning "matched" only after the alert box pops up
    });
  });
  //restart GAME
  document.querySelector(".restart").addEventListener("click", function (e) {
    restartGame();
  });

}

/*main program*/
initGame();
playGame();
