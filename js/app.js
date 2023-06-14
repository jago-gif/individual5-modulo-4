async function fetchMealCategories() {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const selectElement = document.getElementById("categorias");

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const categories = strCategory(data.categories);
    console.log("Las categorias son: ");
        console.log(categories);

    categories.forEach((category) => {
      const optionElement = document.createElement("option");
      optionElement.value = category.strCategory;
      optionElement.textContent = category.strCategory;
      selectElement.appendChild(optionElement);
    });
  } catch (error) {
    console.log("Error al obtener los datos:", error);
  }
}

async function fetchMealsByCategory() {
  const categorySelect = document.getElementById("categorias");
  const selectedCategory = categorySelect.value;
  const mealContainer = document.getElementById("resultado");

  if (selectedCategory) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Los platillos de la categoria seleccionada son ");
      console.log(data);

      // Limpiar el contenedor de comidas antes de agregar las nuevas tarjetas
      mealContainer.innerHTML = "";

      const meals = data.meals;
      meals.forEach((meal) => {
        const mealCard = createMealCard(meal);
        mealContainer.appendChild(mealCard);
      });
    } catch (error) {
      console.log("Error al obtener los datos:", error);
    }
  }
}

function createMealCard(meal) {
  const { idMeal, strMeal, strMealThumb } = meal;

  // Crear elementos HTML para la tarjeta
  const card = document.createElement('div');
  card.classList.add('card', 'col-md-4');

  const image = document.createElement('img');
  image.src = strMealThumb;
  image.alt = strMeal;
  image.classList.add("card-img-top");
  card.appendChild(image);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  // Crear un elemento de título con la clase 'card-title' de Bootstrap
  const title = document.createElement("h3");
  title.textContent = strMeal;
  title.classList.add("card-title");
  cardBody.appendChild(title);

  // Crear un elemento de ID con la clase 'card-text' de Bootstrap
  const id = document.createElement("p");
  id.textContent = `ID: ${idMeal}`;
  id.classList.add("card-text");
  cardBody.appendChild(id);
  return card;
}

function strCategory(categories) {
  categories.sort((a, b) => {
    const categoryA = a.strCategory.toLowerCase();
    const categoryB = b.strCategory.toLowerCase();

    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }
    return 0;
  });

  return categories;
}

fetchMealCategories();

