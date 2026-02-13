function checkAuth() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const data = JSON.parse(localStorage.getItem("portfolioData")) || {
    projects: 0,
    games: 0,
    skills: 0,
  };

  const p = document.getElementById("projectCount");
  const g = document.getElementById("gameCount");
  const s = document.getElementById("skillCount");

  if (p && g && s) {
    p.textContent = data.projects;
    g.textContent = data.games;
    s.textContent = data.skills;
  }

  updateActivity();

  const ctx = document.getElementById("activityChart");
  if (!ctx) return;

  if (activityChartInstance) {
    activityChartInstance.destroy();
  }

  const activityData = getWeeklyActivity();

  activityChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(activityData),
      datasets: [
        {
          label: "Projects Activity",
          data: Object.values(activityData),
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function login() {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  if (usernameInput && passwordInput) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Enter username and password");
  }
}
function getWeeklyActivity() {
  const defaultData = {
    Mon: 1,
    Tue: 2,
    Wed: 1,
    Thu: 3,
    Fri: 2,
    Sat: 4,
    Sun: 3,
  };

  const stored = localStorage.getItem("weeklyActivity");

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem("weeklyActivity", JSON.stringify(defaultData));

  return defaultData;
}
function updateActivity() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];

  const activity = getWeeklyActivity();
  activity[today] += 1;

  localStorage.setItem("weeklyActivity", JSON.stringify(activity));
}

let activityChartInstance = null;

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
