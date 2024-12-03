let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".carousel-indicators button");
let autoSlideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
    indicators[i].classList.toggle("active", i === index);
  });
  document.querySelector(".carousel-slides").style.transform = `translateX(-${
    index * 100
  }%)`;
  currentSlide = index;
}

function nextSlide() {
  const newIndex = (currentSlide + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  const newIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function goToSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000); // Intervalo de 3 segundos
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", () => {
  startAutoSlide();
});

// para montar dinamicamente a partir do db.json

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");

  fetch("http://localhost:4000/admin/destinos")
    .then((response) => response.json())
    .then((destinos) => {
      cardContainer.innerHTML = ""; // Limpa o container antes de adicionar os cards

      destinos.forEach((destino) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${destino.imagem}" alt="${destino.nome}">
          <div class="card-content">
            <h3>${destino.nome}</h3>
            <p class="reviews">${destino.avaliacao} <span>${destino.reviews} customer reviews</span></p>
            <p>${destino.descricao}</p>
            <div>
              <button>Adicionar ao carrinho</button>
              <div class="price-tag">R$ ${destino.preco}</div>
            </div>
          </div>
        `;

        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar destinos:", error));
});
