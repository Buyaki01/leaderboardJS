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

  const data = await response.json();
  console.log(data);
  
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
 
  const tr = document.createElement("tr");
  const td = document.createElement("td");

  td.innerHTML = `
    ${playerName}: ${playerScore}
  `;
  
  td.classList.add("p-4");
  tr.appendChild(td);
  tbody.appendChild(tr);
  form.reset();
});
