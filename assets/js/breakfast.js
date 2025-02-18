// Retrieve query parameters from the URL
const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const typeofmeal = URLparams.get("mealType");
console.log(typeofmeal);

// Select the container where the recipes will be displayed
const breakover = document.querySelector(".break_over");
const breakskema = document.querySelector(".break_skema");

// Fetch recipe data from the API
fetch(`https://dummyjson.com/recipes/meal-type/${typeofmeal}`)
  .then((response) => response.json())
  .then((data) => {
    let titleHTML = document.querySelector("title");
    titleHTML.innerHTML = typeofmeal;

    // Set the initial header content
    breakover.innerHTML = `
             <img class="break_over_billede" src="assets/webp/hero_lande.webp" alt="">
            <h1 class="break_overskrift">${typeofmeal}</h1>
        `;

    // Generate the recipe HTML using .map()
    const recipesHTML = data.recipes
      .map(
        (recipe) => `
            <div class="kategori">
                <a href="">
                    <img class="kategori_billede" src="${recipe.image}" alt="">
                    <a href="enkeltopskriftside.html?id=${recipe.id}" class="kategori_tekst">${recipe.name}</a>
                </a>
            </div>
        `
      )
      .join("");

    // Append the recipes to the container
    breakskema.innerHTML = recipesHTML;
  })
  .catch((error) => console.error("Error fetching recipes:", error));
