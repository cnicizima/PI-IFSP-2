const containerPrincipal = document.querySelector(".container_principal");

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.showModal();
  toggleBlur(true); // Aplica o desfoque ao abrir qualquer modal
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.close();
  toggleBlur(false); // Remove o desfoque ao fechar
}

function toggleBlur(apply) {
  containerPrincipal.style.filter = apply ? "blur(5px)" : "none";
}

// Fechar o modal ao clicar fora dele
// document.querySelectorAll("dialog").forEach((modal) => {
//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       closeModal(modal.id);
//     }
//   });
// });

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
let index = 0;

function showSlideDestinos() {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlideDestinos() {
    index = (index + 1) % images.length;
    showSlideDestinos();
}

function prevSlideDestinos() {
    index = (index - 1 + images.length) % images.length;
    showSlideDestinos();
}

// Troca automática após 3 segundos
setInterval(nextSlideDestinos, 3000);