// Trailer
function playTrailer() {
  document.getElementById("videoPreview").classList.add("d-none");
  let video = document.getElementById("heroVideo");
  video.classList.remove("d-none");
  video.play();
}

// Save movies
function saveMovie(list, title, year, genre) {
  let movies = JSON.parse(localStorage.getItem(list)) || [];
  let message = document.getElementById("saveMessage");

  if (movies.some(movie => movie.title === title)) {
    message.textContent = title + " is already saved.";
    return;
  }

  movies.push({title, year, genre});
  localStorage.setItem(list, JSON.stringify(movies));
  message.textContent = title + " added to " + (list === "favorites" ? "Favorites" : "Watch Later") + ".";
}

// Change background
let colors = ["#090c0f", "#12254a", "#1f371d", "#5c0101"];
let colorIndex = 0;

function changeBackgroundColor() {
  colorIndex = (colorIndex + 1) % colors.length;
  document.body.style.setProperty("background-color", colors[colorIndex], "important");
}

// Date and time
function showTime() {
  let now = new Date();
  document.getElementById("date").textContent = now.toLocaleDateString("en-US", {dateStyle: "full"});
  document.getElementById("time").textContent = now.toLocaleTimeString("en-US");
}

if (document.getElementById("date") && document.getElementById("time")) {
  showTime();
  setInterval(showTime, 1000);
}

// Sign up validation
let signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.noValidate = true;
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;
    let result = document.getElementById("signupMessage") || document.getElementById("formMessage");
    let error = "";

    if (!email.value.trim() || !password || !confirm) error = "Please fill in all fields.";
    else if (!email.checkValidity()) error = "Enter a valid email.";
    else if (password.length < 8) error = "Password must be at least 8 characters.";
    else if (password !== confirm) error = "Passwords do not match.";

    result.textContent = error || "Validation successful! Demo only.";
    result.className = error ? "small text-danger" : "small text-success";
  });
}

// Contact form
let contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("contactMessage").textContent =
      "Form completed! This demo does not send messages.";
  });
}

// FAQ accordion
document.querySelectorAll("#faq .accordion-button").forEach(function(button) {
  button.addEventListener("click", function() {
    let answer = button.closest(".accordion-item").querySelector(".accordion-collapse");
    bootstrap.Collapse.getOrCreateInstance(answer, {toggle: false}).toggle();
  });
});

// Favorites and Watch Later
let table = document.getElementById("movieList");

if (table) {
  let list = location.pathname.includes("favorites.html") ? "favorites" : "watchLater";
  let movies = JSON.parse(localStorage.getItem(list)) || [];

  let posters = {
    "Interstellar": "interstellar.jpg",
    "Inception": "inception.jpg",
    "Dune: Part Two": "dune.jpg",
    "The Batman": "the-batman.jpg",
    "Oppenheimer": "oppenheimer.jpg",
    "La La Land": "la-la-land.jpg",
    "Fight Club": "fight-club.jpg",
    "Jurassic Park 1": "jurassic.jpg",
    "Harry Potter 1": "harry-potter.jpg",
    "Pirates of the Caribbean 3": "pirates.jpg"
  };

  function showMovies() {
    table.innerHTML = "";
    document.getElementById("emptyList").classList.toggle("d-none", movies.length > 0);

    movies.forEach(function(movie, i) {
      let row = document.createElement("tr");
      let poster = document.createElement("td");

      if (posters[movie.title]) {
        let img = document.createElement("img");
        img.src = "images/" + posters[movie.title];
        img.alt = movie.title;
        img.className = "movie-poster";
        img.width = 65;
        img.height = 80;
        img.style.objectFit = "cover";
        poster.appendChild(img);
      }

      let title = document.createElement("td");
      title.textContent = movie.title;

      let genre = document.createElement("td");
      genre.textContent = movie.genre;

      let year = document.createElement("td");
      year.textContent = movie.year;

      let action = document.createElement("td");
      let button = document.createElement("button");
      button.className = "btn btn-outline-danger btn-sm";
      button.textContent = "Remove";

      button.onclick = function() {
        movies.splice(i, 1);
        localStorage.setItem(list, JSON.stringify(movies));
        showMovies();
      };

      action.appendChild(button);
      row.append(poster, title, genre, year, action);
      table.appendChild(row);
    });
  }

  showMovies();
}