const categorySelect = document.getElementById("categorySelect");
const jokeBox = document.getElementById("jokeBox");
const getJokeBtn = document.getElementById("getJokeBtn");
const getCategoriesBtn = document.getElementById("getCategoriesBtn");

getCategoriesBtn.addEventListener("click", async () => {
  const res = await fetch("/jokebook/categories");
  const data = await res.json();

  jokeBox.innerHTML = `
    <p><strong>Categories:</strong> ${data.categories}</p>
  `;
});

getJokeBtn.addEventListener("click", async () => {
  const cat = categorySelect.value;
  const res = await fetch(`/jokebook/joke/${cat}`);
  const data = await res.json();

  jokeBox.innerHTML = `
    <p><strong>Joke:</strong> ${data.joke}</p>
    <p><strong>Response:</strong> ${data.response}</p>
  `;
});
