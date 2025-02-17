// Retrieve query parameters from the URL
// This allows us to get specific details from the URL, such as an ID
const queryString = document.location.search; // Get the full query string from the URL
const URLparams = new URLSearchParams(queryString); // Parse the query string
const identity = URLparams.get('id'); // Extract the value associated with 'id'
console.log(identity); // Log the ID to the console for debugging purposes

// Select the container where the recipe data will be displayed in the HTML
const produktgrid = document.querySelector(".produktgrid");

// Fetch recipe data from a dummy API
fetch(`https://dummyjson.com/recipes/4`)
    .then(response => response.json()) // Convert the API response into JSON format
    .then(product => {

        let titleHTML = document.querySelector("title");
        titleHTML.innerHTML = product.name

        // Dynamically generate the HTML for ingredients
        // We use the map function to iterate through the ingredients array
        // Each ingredient is wrapped in a <p> tag and then joined into a single string
        let ingredientsHTML = product.ingredients.map(ingredient => `<p>${ingredient}</p>`).join('');

        // Dynamically generate the HTML for instructions
        // Each instruction is wrapped in a <p> tag and associated with a checkbox
        // The index is used to create unique checkbox names and IDs
        let instructionsHTML = product.instructions.map((instruction, index) => `
            <div class="insitem">
                <input type="checkbox" name="ins${index + 1}" id="ins${index + 1}">
                <p>${instruction}</p>
            </div>
        `).join('');

        // Populate the container with the dynamically generated recipe details
        produktgrid.innerHTML = `
          <h1>${product.name}</h1> <!-- Recipe title -->
          <img src="https://cdn.dummyjson.com/recipe-images/${product.id}.webp" alt=""> <!-- Recipe image -->
          <div class="grid_2-1">
              <p><b>Servings:</b> ${product.servings}</p> <!-- Display number of servings -->
              <p><b>Difficulty:</b> ${product.difficulty}</p> <!-- Display difficulty level -->
          </div>
          <div class="grid_3-1">
              <p><b>Prep time:</b> ${product.prepTimeMinutes} min</p> <!-- Preparation time -->
              <p><b>Cook time:</b> ${product.cookTimeMinutes} min</p> <!-- Cooking time -->
              <p><b>Total time:</b> ${product.prepTimeMinutes + product.cookTimeMinutes} min</p> <!-- Total time -->
          </div>
          <div class="grid_2-2">
              <div class="grid_ing">
                  <div class="grid_3-2">
                      <div class="line"></div>
                      <h2>Ingredients</h2>
                      <div class="line"></div>
                  </div>
                  ${ingredientsHTML} <!-- Inject dynamically generated ingredients -->
              </div>
              <div class="grid_ins">
                  <div class="grid_3-2">
                      <div class="line"></div>
                      <h2>Instructions</h2>
                      <div class="line"></div>
                  </div>
                  <div class="inslist">
                      ${instructionsHTML} <!-- Inject dynamically generated instructions -->
                  </div>
              </div>
          </div>
        `;

        // Add event listeners to each checkbox
        // When a checkbox is checked or unchecked, toggle the "checked" class on the associated instruction
        document.querySelectorAll('.insitem input').forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                this.nextElementSibling.classList.toggle('checked', this.checked);
            });
        });
    })
    // Handle errors, such as network failures or invalid API responses
    .catch(error => console.error('Error fetching recipe:', error));
