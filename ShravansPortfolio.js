if (!localStorage.getItem("portfolioData")) {
  const portfolioData = {
    projects: 4,
    games: 3,
    skills: 8,
  };

  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
}

window.onload = function () {
  const hero = document.querySelector(".hero");
  const main = document.getElementById("MainWindow");
  const CardPrev = document.getElementById("prevView");
  const CardNext = document.getElementById("nextView");
  const CardGrid = document.getElementById("projectGrid");

  const gamesButton = document.getElementById("gamesButton");
  const navbarGames = document.getElementById("NavbarGames");

  gamesButton.addEventListener("click", () => {
    if (navbarGames.style.display === "flex") {
      navbarGames.style.display = "none";
    } else {
      navbarGames.style.display = "flex";
    }
  });

  CardPrev.addEventListener("click", () => {
    const isScroll = CardGrid.classList.contains("scroll");

    CardGrid.classList.toggle("scroll", !isScroll);
    CardGrid.classList.toggle("static", isScroll);
  });
  CardNext.addEventListener("click", () => {
    const isScroll = CardGrid.classList.contains("scroll");

    CardGrid.classList.toggle("scroll", !isScroll);
    CardGrid.classList.toggle("static", isScroll);
  });

  if (sessionStorage.getItem("heroPlayed")) {
    hero.style.display = "none";
    main.style.display = "block";
    main.style.opacity = "1";
    return;
  }

  hero.style.display = "flex";
  hero.style.opacity = "1";
  main.style.display = "none";
  main.style.opacity = "0";

  sessionStorage.setItem("heroPlayed", "true");

  setTimeout(() => {
    hero.style.opacity = "0";

    setTimeout(() => {
      hero.style.display = "none";
      main.style.display = "block";

      this.requestAnimationFrame(() => {
        main.style.opacity = "1";
      });
    }, 600);
  }, 4000);
};
function goToDashboard() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "Dashboard/dashboard.html";
  } else {
    window.location.href = "Dashboard/Login.html";
  }
}
function openProject(path) {
  window.location.href = path;
}
