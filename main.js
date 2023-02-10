const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const playerName = form.querySelector(".player-name").value;
  const playerScore = form.querySelector(".player-score").value;

  const response = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bam0nykA289fQktGqFqI/scores/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: playerName,
      score: playerScore,
    }),
  });

  form.reset();
});

const refreshButton = document.querySelector(".refresh");

refreshButton.addEventListener("click", async (event) => {
  const response = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bam0nykA289fQktGqFqI/scores/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    }
  });

  if (!response.ok) {
    console.error(`Fetch failed with status code: ${response.status}`);
    return;
  }

  const data = await response.json();
  const scoresData = await data.result;
  
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
 
  scoresData.forEach(score => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = `
      ${score.user}: ${score.score}
    `;
    td.classList.add("p-4");
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
});
