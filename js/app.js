let comida;
let opiniones = [];
let meals = [];
let tecla =0;
let platosPasivos = [];
   const mealContainer = document.getElementById("resultado");


  const modal = document.getElementById("modalOpinion");

  const instanciaModal = new bootstrap.Modal(modal);


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

async function fetchMealsByCategory(x) {
   const categorySelect = document.getElementById("categorias");
   const selectedCategory = categorySelect.value;

   if (selectedCategory) {
     const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

     try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       console.log("Los platillos de la categoria seleccionada son ");
       console.log(data);

       // Limpiar el contenedor de comidas antes de agregar las nuevas tarjetas
       mealContainer.innerHTML = "";

        meals = data.meals;
        platosPasivos = meals;
      cargarMeals();
        
     } catch (error) {
       console.log("Error al obtener los datos:", error);
     }
   }
}

function cargarMeals(){
      mealContainer.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = createMealCard(meal);

    mealContainer.appendChild(mealCard);
  });
}

function createMealCard(meal) {
  const { idMeal, strMeal, strMealThumb } = meal;

  // Crear elementos HTML para la tarjeta
  const card = document.createElement("div");
  card.classList.add("card", "col-md-4");

  const image = document.createElement("img");
  image.src = strMealThumb;
  image.alt = strMeal;
  image.classList.add("card-img-top");
  card.appendChild(image);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const btnOpinion = document.createElement("button");
  btnOpinion.classList.add("btn", "btn-primary");
  btnOpinion.textContent = "Agregar opinion";
  cardBody.appendChild(btnOpinion);

 
  btnOpinion.onclick = function () {

    abrirModal(strMeal);
  }

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


function abrirModal(meal) {
 
  comida = meal
  instanciaModal.show();
  
} 

const guardarOpinion = document.getElementById("guardarOpinion");

guardarOpinion.addEventListener("click", function () {

const opinion = document.getElementById("opinion").value;
const formularioOpinion = document.getElementById("formularioOpinion");

let opinionInsert ={
  comida: comida,
  opinion: opinion
} 

opiniones.push(opinionInsert);
 agregarLaOpinion()

 instanciaModal.hide();

formularioOpinion.reset();

})

function agregarLaOpinion(){
  const opinionContainer = document.getElementById("lasOpiniones");
  opinionContainer.innerHTML = "";

  opiniones.forEach((opinion) => {
    const card = document.createElement("div");
    card.classList.add("card", "m-1");
    card.style.width = "18rem";

   

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = opinion.comida;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML ="Opinion: <br>"+opinion.opinion;

    cardBody.appendChild(title);
    cardBody.appendChild(description);

    card.appendChild(cardBody);
    opinionContainer.appendChild(card);

  });
}

document.getElementById("filtroTexto").addEventListener("keyup", function () {
  let x = document.getElementById("filtroTexto").value.toLowerCase();
  if(x.length==(tecla-1)){
    fetchMealsByCategory(x);
    return cargarComidas(x);
  }
  tecla = x.length;
  cargarComidas(x);
});

function cargarComidas(x) {
  const comidas = platosPasivos.filter((meal) =>
    meal.strMeal.toLowerCase().includes(x)
  );

  mealContainer.innerHTML = "";

  comidas.forEach((meal) => {
    const mealCard = createMealCard(meal);
    mealContainer.appendChild(mealCard);
  });

  meals.length = 0;
  Array.prototype.push.apply(meals, comidas);
}


