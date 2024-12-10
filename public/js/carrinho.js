
    // Array de cupons válidos
    const cuponsValidos = ['DESCONTO10', 'PROMOCAO10', 'OFERTA10'];  // Cupons de 10%

    // Função para atualizar o custo total com base nas quantidades e aplicar o desconto, se houver
    function atualizarCustoTotal() {
        const pacotes = document.querySelectorAll('.pacote');
        let custoTotal = 0;
    
        pacotes.forEach((pacote) => {
            const quantidade = parseInt(pacote.querySelector('.mais_menos h1').innerText);
            const precoPacote = parseFloat(pacote.querySelector('.preco_pacote h1').innerText.replace('R$', '').replace(',', '.'));
    
            // Somando o custo total (quantidade * preço do pacote)
            custoTotal += quantidade * precoPacote;
        });
    
        // Verifica se o usuário aplicou um cupom
        const cupomAplicado = document.getElementById("codigo").value.trim();
        if (cuponsValidos.includes(cupomAplicado)) {
            custoTotal *= 0.9; // Aplica 10% de desconto
            alert("Cupom de 10% aplicado com sucesso!");
        } else if (cupomAplicado) {
            alert("Cupom inválido. Tente novamente.");
        }
    
        // Atualizando o custo total na interface
        const custoTotalElement = document.querySelector('.custo_total h3');
        custoTotalElement.innerText = `R$ ${custoTotal.toFixed(2)}`;
    }
    
    // Função para incrementar a quantidade
    function incrementarQuantidade(event) {
        const quantidadeElement = event.target.closest('.mais_menos').querySelector('h1');
        let quantidade = parseInt(quantidadeElement.innerText);
        quantidadeElement.innerText = quantidade + 1; // Incrementa 1 na quantidade
    
        // Atualiza o custo total após a alteração
        atualizarCustoTotal();
    }
    
    // Função para decrementar a quantidade
    function decrementarQuantidade(event) {
        const quantidadeElement = event.target.closest('.mais_menos').querySelector('h1');
        let quantidade = parseInt(quantidadeElement.innerText);
    
        // Não permite a quantidade ser menor que zero
        if (quantidade > 0) {
            quantidadeElement.innerText = quantidade - 1; // Decrementa 1 na quantidade
        }
    
        // Atualiza o custo total após a alteração
        atualizarCustoTotal();
    }
    
    // Atribuindo eventos para os botões de incremento e decremento
    document.querySelectorAll('.fa-circle-plus').forEach((plusButton) => {
        plusButton.addEventListener('click', incrementarQuantidade);
    });
    
    document.querySelectorAll('.fa-circle-minus').forEach((minusButton) => {
        minusButton.addEventListener('click', decrementarQuantidade);
    });
    
    // Função para aplicar o cupom quando o botão "Usar" for clicado
    document.querySelector('.usar').addEventListener('click', function() {
        atualizarCustoTotal();
    });
    
    // Inicializar o custo total na carga da página
    document.addEventListener('DOMContentLoaded', () => {
        atualizarCustoTotal();
    });
    

    document.querySelector('.pagamento').addEventListener('click', ()=>{
        alert("Compra bem sucedida!");
        location.reload();
    })