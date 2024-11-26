// Manipulando o modal de criação de destino
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const destinoForm = document.getElementById("destinoForm");
const cardContainer = document.getElementById("card-container");
const updateModal = document.getElementById("updateModal");
const closeUpdateModalBtn = document.getElementById("closeUpdateModalBtn");
const updateDestinoForm = document.getElementById("updateDestinoForm");

// Modal para criar novo destino
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
  } else if (event.target === updateModal) {
    updateModal.style.display = "none";
  }
};

// Envio dos dados para criar um destino
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
  if (
    !nome ||
    !descricao ||
    !imagem ||
    isNaN(preco) ||
    !avaliacao ||
    isNaN(reviews)
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return; // Não envia os dados se houver campos vazios ou inválidos
  }

  try {
    const response = await fetch("http://localhost:4000/admin/destinos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        descricao,
        imagem,
        preco,
        avaliacao,
        reviews,
      }),
    });

    const data = await response.json();

    // Verifica a resposta do backend
    if (response.ok) {
      alert("Destino adicionado com sucesso!");
      modal.style.display = "none"; // Fecha o modal após sucesso
      destinoForm.reset(); // Reseta o formulário
      loadDestinos(); // Atualiza a lista de destinos
    } else {
      alert(
        "Erro ao adicionar o destino: " + (data.message || "Erro desconhecido.")
      );
    }
  } catch (error) {
    console.error(error);
    alert("Erro de rede. Não foi possível enviar os dados.");
  }
};

// Função para carregar os destinos do banco
async function loadDestinos() {
  try {
    const response = await fetch("http://localhost:4000/admin/destinos");
    const destinos = await response.json();

    // Limpar o container de cards antes de adicionar novos
    cardContainer.innerHTML = "";

    // Preencher o container com os destinos
    destinos.forEach((destino) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${destino.imagem}" alt="${destino.nome}">
        <div class="card-content">
          <h3>${destino.nome}</h3>
          <p class="reviews">${destino.avaliacao} <span>${destino.reviews} customer reviews</span></p>
          <p>${destino.descricao}</p>
          <div class="price-tag">$${destino.preco}</div>
          <div>
            <button onclick="openUpdateModal(${destino.id}, '${destino.nome}', '${destino.descricao}', '${destino.imagem}', ${destino.preco}, '${destino.avaliacao}', ${destino.reviews})">Atualizar Destino</button>
            <button onclick="deleteDestino(${destino.id})">Excluir Destino</button>
          </div>
        </div>
      `;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar destinos:", error);
    alert("Erro ao carregar os destinos.");
  }
}

// Função para abrir o modal de atualização de destino
function openUpdateModal(
  id,
  nome,
  descricao,
  imagem,
  preco,
  avaliacao,
  reviews
) {
  document.getElementById("updateId").value = id;
  document.getElementById("updateNome").value = nome;
  document.getElementById("updateDescricao").value = descricao;
  document.getElementById("updateImagem").value = imagem;
  document.getElementById("updatePreco").value = preco;
  document.getElementById("updateAvaliacao").value = avaliacao;
  document.getElementById("updateReviews").value = reviews;

  updateModal.style.display = "block";
}

// Fechar o modal de atualização
closeUpdateModalBtn.onclick = function () {
  updateModal.style.display = "none";
};

// Atualizar destino
updateDestinoForm.onsubmit = async function (event) {
  event.preventDefault();

  const id = document.getElementById("updateId").value;
  const nome = document.getElementById("updateNome").value;
  const descricao = document.getElementById("updateDescricao").value;
  const imagem = document.getElementById("updateImagem").value;
  const preco = parseFloat(document.getElementById("updatePreco").value);
  const avaliacao = document.getElementById("updateAvaliacao").value;
  const reviews = parseInt(document.getElementById("updateReviews").value);

  // Verificação de dados
  if (
    !nome ||
    !descricao ||
    !imagem ||
    isNaN(preco) ||
    !avaliacao ||
    isNaN(reviews)
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/admin/destinos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        descricao,
        imagem,
        preco,
        avaliacao,
        reviews,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Destino atualizado com sucesso!");
      updateModal.style.display = "none";
      loadDestinos(); // Atualiza a lista de destinos
    } else {
      alert(
        "Erro ao atualizar o destino: " + (data.message || "Erro desconhecido.")
      );
    }
  } catch (error) {
    console.error(error);
    alert("Erro de rede. Não foi possível atualizar o destino.");
  }
};

// Excluir destino
async function deleteDestino(id) {
  if (confirm("Tem certeza que deseja excluir este destino?")) {
    try {
      const response = await fetch(
        `http://localhost:4000/admin/destinos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Destino excluído com sucesso!");
        loadDestinos(); // Atualiza a lista de destinos
      } else {
        alert("Erro ao excluir o destino.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de rede. Não foi possível excluir o destino.");
    }
  }
}

// Carregar os destinos ao iniciar a página
window.onload = loadDestinos;
