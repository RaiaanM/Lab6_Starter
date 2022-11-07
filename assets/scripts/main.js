// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  
  let item = JSON.parse(window.localStorage.getItem('recipes'));
  if(!item){
    return [];
  }
  return item;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  
   let mainA = document.getElementsByTagName('main')[0];
  
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  
  for(let i = 0; i < recipes.length; i++){
    let object = document.createElement('recipe-card');
    object.data = recipes[i];
    mainA.appendChild(object);

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  
  return window.localStorage.setItem('recipes', JSON.stringify(recipes))
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  
  let formA = document.getElementsByTagName('form')[0];
  formA.addEventListener('submit', formSubmit);
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  
  function formSubmit(){
    let formdata = new FormData(formA);
    let recipeObject = {};
  
    
    for(const pair of formdata.entries()){
      recipeObject[`${pair[0]}`] = `${pair[1]}`;
    }

    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = formdata;
    console.log('adding recipes to document')
    addRecipesToDocument(recipeObject);

    console.log('getting recipes from storage')
    let newRecipes = getRecipesFromStorage();
    newRecipes.push(recipeObject);
    saveRecipesToStorage(newRecipes);
  }
  
  let button = document.getElementsByClassName('danger')[0];
  button.addEventListener('click', clearStorage);
  
  function clearStorage(){
    window.localStorage.clear();
    document.getElementsByTagName('main')[0].innerHTML = "";
  }

}
