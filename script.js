// 1. Data Structure holding multiple recipe objects
const recipes = {
  pancakes: {
    category: "Breakfast",
    emoji: "🥞",
    baseServings: 2,
    ingredients: [
      { name: "Flour", baseQty: 1, unit: "cup" },
      { name: "Milk", baseQty: 1, unit: "cup" },
      { name: "Egg", baseQty: 1, unit: "pc" }
    ]
  },
  waffles: {
    category: "Breakfast",
    emoji: "🧇",
    baseServings: 2,
    ingredients: [
      { name: "Flour", baseQty: 2, unit: "cups" },
      { name: "Milk", baseQty: 1.5, unit: "cups" },
      { name: "Butter", baseQty: 4, unit: "tbsp" },
      { name: "Egg", baseQty: 2, unit: "pcs" }
    ]
  },
  cookies: {
    category: "Dessert",
    emoji: "🍪",
    baseServings: 4,
    ingredients: [
      { name: "Flour", baseQty: 2, unit: "cups" },
      { name: "Sugar", baseQty: 1, unit: "cup" },
      { name: "Chocolate Chips", baseQty: 1.5, unit: "cups" },
      { name: "Butter", baseQty: 0.5, unit: "cup" }
    ]
  }
};

// 2. Global State Variables
let currentRecipeKey = "pancakes";
let currentServings = 2;

// 3. DOM Elements
const recipeSelect = document.getElementById("recipe-select");
const recipeCategory = document.getElementById("recipe-category");
const ingredientsContainer = document.getElementById("ingredients-list");
const recipeVisual = document.querySelector(".pancake-graphic");
const buttons = document.querySelectorAll(".serving-btn");

// 4. Combined Render Function
function updateUI() {
  const activeRecipe = recipes[currentRecipeKey];
  
  // Update Category Label and food emoji graphic
  recipeCategory.textContent = activeRecipe.category;
  recipeVisual.textContent = activeRecipe.emoji;

  // Compute scaling calculation relative to the specific recipe's base serving sizes
  const multiplier = currentServings / activeRecipe.baseServings;

  // Generate ingredient elements using array .map() logic
  const ingredientHTML = activeRecipe.ingredients.map(item => {
    const scaledQty = item.baseQty * multiplier;
    
    // Quick cleaning check for clean decimal points
    const formattedQty = Number(scaledQty.toFixed(2)); 
    
    return `
      <li>
        <span class="name">${item.name}</span>
        <span class="qty">${formattedQty} ${item.unit}</span>
      </li>
    `;
  }).join("");

  ingredientsContainer.innerHTML = ingredientHTML;
}

// 5. Change Event Listener: Recipe Selector Dropdown
recipeSelect.addEventListener("change", (e) => {
  currentRecipeKey = e.target.value;
  updateUI();
});

// 6. Change Event Listener: Serving Amount Buttons
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    // UI active style toggling
    buttons.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    
    // Extract target portions amount and trigger render recalculation
    currentServings = parseInt(e.target.getAttribute("data-servings"));
    updateUI();
  });
});

// Initial boot logic trigger setup
updateUI();
