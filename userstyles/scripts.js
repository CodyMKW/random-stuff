const container = document.getElementById("userstyles-container");

// Fetch userstyles from the JSON file
fetch('https://api.npoint.io/54bfe0417ed06740c244')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load userstyles.json");
    }
    return response.json();
  })
  .then(userstyles => {
    userstyles.forEach(style => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${style.thumbnail}" alt="${style.name}">
        <h3>${style.name}</h3>
        <p>Created by: ${style.creator}</p>
        <button onclick="window.open('${style.installLink}', '_blank')"> <span>Install</span> </button>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading userstyles:", error);
    container.innerHTML = `<p>Failed to load userstyles. Please try again later.</p>`;
  });
