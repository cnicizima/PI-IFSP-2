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

function showSlide() {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    index = (index + 1) % images.length;
    showSlide();
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide();
}

// Troca automática após 3 segundos
setInterval(nextSlide, 3000);