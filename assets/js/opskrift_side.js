// Retrieve query parameters from the URL
const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const country = URLparams.get("cuisine");
console.log(country);

// Select the container where the recipes will be displayed
const produktgrid = document.querySelector(".container_boks_hero");
const recipelist = document.querySelector(".opskrift_liste_container");

// Fetch recipe data from the API
fetch(`https://dummyjson.com/recipes/tag/${country}`)
  .then((response) => response.json())
  .then((data) => {
    let titleHTML = document.querySelector("title");
    titleHTML.innerHTML = country;

    // Set the initial header content
    produktgrid.innerHTML += `
            <h1 class="h1_opskriftside">${country}</h1>
        `;

    // Generate the recipe HTML using .map()
    const recipesHTML = data.recipes
      .map(
        (recipe) => `
            <div class="opskrift">
                <div class="centeret_opskrift">
                    <a href="enkeltopskriftside.html?id=${recipe.id}">
                        <img class="opskrift_billede" src="${recipe.image}" alt="${recipe.name}">
                    </a>
                </div>
                <p class="p_tekst1">${recipe.name}</p>
                <div class="time_boks">${recipe.cookTimeMinutes + recipe.prepTimeMinutes} min</div>
            </div>
        `
      )
      .join("");

    // Append the recipes to the container
    recipelist.innerHTML = recipesHTML;
  })
  .catch((error) => console.error("Error fetching recipes:", error));
