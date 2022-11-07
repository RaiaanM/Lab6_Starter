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
  if(!recipes){
    return;
  }
  // A10. TODO - Get a reference to the <main> element
  let mainEl = document.getElementsByTagName('main')[0];
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for(let i = 0; i < recipes.length; i++){
    let currR = document.createElement('recipe-card');
    currR.data = recipes[i];
    mainEl.appendChild(currR);
    //console.log(currR)
    //console.log(mainEl)
  }

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
  let formEl = document.getElementsByTagName('form')[0];
  // B2. TODO - Get a reference to the <form> element
  formEl.addEventListener('submit', formSubmit);
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  function formSubmit(){
    let fdata = new FormData(formEl);
    let recipeObject = {};
  
    
    for(const pair of fdata.entries()){
      recipeObject[`${pair[0]}`] = `${pair[1]}`;
    }

    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = fdata;
    console.log('adding recipes to document')
    addRecipesToDocument(recipeObject);

    console.log('getting recipes from storage')
    let newRecipes = getRecipesFromStorage();
    newRecipes.push(recipeObject);
    saveRecipesToStorage(newRecipes);
  }
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
  // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  // B6. TODO - Create a new <recipe-card> element
  // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
  // B8. TODO - Append this new <recipe-card> to <main>
  // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage

  let button = document.getElementsByClassName('danger')[0];
  button.addEventListener('click', clearStorage);
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  // B11. TODO - Add a click event listener to clear local storage button
  function clearStorage(){
    window.localStorage.clear();
    document.getElementsByTagName('main')[0].innerHTML = "";
  }
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
  // B13. TODO - Delete the contents of <main>
}
