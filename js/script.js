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
document.querySelectorAll("dialog").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});
