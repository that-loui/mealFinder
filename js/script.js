const submit = document.querySelector('.form');
const randomMeal = document.querySelector('.shuffle');
// outputs
const searchTitle = document.querySelector('.result-header');
const searchBody = document.querySelector('.results');
const singleMeal = document.querySelector('.single-result');
const loader = document.querySelector('.loader');

async function fetchMeals() {
  singleMeal.innerHTML = '';
  let searchValue = document.querySelector('.search').value;
  //   check input field isn't empty
  if (searchValue !== '') {
    // call fetch
    try {
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      );

      let meals = await res.json();
      displayResults(meals, searchValue);

      console.log(meals);
    } catch (err) {
      console.log(err);
    }
  } else {
    displayAlert();
    return false;
  }
}
async function fetchDetailsById(ID) {
  // call fetch
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`
    );

    let data = await res.json();
    let meal = data.meals[0];
    displayDetails(meal);
  } catch (err) {
    console.log(err);
  }
}
// function to display alerts
let displayAlert = () => {
  const header = document.querySelector('.header');
  let alert = document.createElement('div');
  alert.classList = 'alert alert-warning w-lg-25';
  alert.innerHTML = `<p class = 'text h5'> Please enter a search term</p>`;
  header.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
};

// function to display search results
let displayResults = (data, search) => {
  // check that meal data isn't empty
  if (data.meals !== null) {
    searchTitle.innerHTML = `
    <h3 class='display-4 h3'>Results for '${search}' </h3>`;
    // loop through and add to dom
    data.meals.forEach((meal) => {
      searchBody.innerHTML += `
        <div class="m-4 col-lg-3 meal d-flex flex-column align-items-center text-center" data-mealId="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="" class = 'img-thumbnail w-50'>
            <h4>${meal.strMeal}</h4>
        </div>
        `;
    });
  } else {
    searchTitle.innerHTML = `
            <h3>Search Term Wasn't Found 😢,  try again</h3>
        `;
  }
};

let displayDetails = (meal) => {
  const ingredients = [];
  // loop through ingredients and add to array
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
  <div class="details text-center">
  <div class="detailsHeader ">
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${
    meal.strMeal
  }" class ='img-thumbnail w-50 mt-4'>
  </div>
  <div class="detailsBody">
    ${
      meal.strCategory
        ? `<p><h5 class="d-inline-block">Category</h5> - ${meal.strCategory}</p>`
        : ''
    }
    ${
      meal.strArea
        ? `<p> <h5 class="d-inline-block">From</h5> - ${meal.strArea}</p>`
        : ''
    }
    <div class="ingredientsCont">
      <h3 class ="mb-3">Ingredients</h3>
      <ol class="ingredients w-50">
      ${ingredients
        .map((ing) => {
          return `<li class="p-2">${ing}</li>`;
        })
        .join('')}
      </ol>
    </div>
    <div class="instructionsCont">
      <p class="instructions">${meal.strInstructions}</p>
    </div>
  </div>
  
</div>
  `;
  console.log(ingredients);
};

// event listeners
submit.addEventListener('submit', (e) => {
  e.preventDefault();
  searchBody.innerHTML = '  ';
  if (fetchMeals()) {
    //   display loading gif and remove results
    loader.classList.toggle('display');
    searchBody.classList.toggle('display');
    submit.reset();
    setTimeout(() => {
      // remove loader and add results
      loader.classList.toggle('display');
      searchBody.classList.toggle('display');
    }, 5000);
  }
});

searchBody.addEventListener('click', (e) => {
  const target = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal');
    } else {
      return false;
    }
  });
  if (target) {
    let mealID = target.getAttribute('data-mealId');
    fetchDetailsById(mealID);
  }
});
