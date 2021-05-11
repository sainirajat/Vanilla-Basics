const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();
//parse data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovieIndex = localStorage.getItem("movieIndex");
  const selectedTotalPrice = localStorage.getItem("moviePrice");
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  if (selectedTotalPrice !== null) {
    ticketPrice = selectedTotalPrice;
  }
}

// save data to local storage
function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

//update seats number and price
function updateSeatsAndPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

//selecting movie
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  saveMovieData(e.target.selectedIndex, e.target.value);
  updateSeatsAndPrice();
});

//selecting seat event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSeatsAndPrice();
  }
});

//for initial seats and price render
updateSeatsAndPrice();
