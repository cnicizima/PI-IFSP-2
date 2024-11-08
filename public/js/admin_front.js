// Manipulando o modal
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const destinoForm = document.getElementById("destinoForm");

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

// Fechar o modal se clicar fora dele
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Envio dos dados para o backend
destinoForm.onsubmit = async function (event) {
  event.preventDefault();

  // Coleta dos dados do formulário
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const imagem = document.getElementById("imagem").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const avaliacao = document.getElementById("avaliacao").value;
  const reviews = parseInt(document.getElementById("reviews").value);

  // Verificação se os dados estão preenchidos corretamente
  if (!nome || !descricao || !imagem || isNaN(preco) || !avaliacao || isNaN(reviews)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return; // Não envia os dados se houver campos vazios ou inválidos
  }

  try {
    const response = await fetch('http://localhost:4000/admin/destinos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, descricao, imagem, preco, avaliacao, reviews }),
    });

    const data = await response.json();

    // Verifica a resposta do backend
    if (response.ok) {
      alert("Pacote adicionado com sucesso!");
      modal.style.display = "none"; // Fecha o modal após sucesso
      destinoForm.reset(); // Reseta o formulário
    } else {
      alert("Erro ao adicionar o pacote: " + (data.message || "Erro desconhecido."));
    }
  } catch (error) {
    console.error(error);
    alert("Erro de rede. Não foi possível enviar os dados.");
  }
};
