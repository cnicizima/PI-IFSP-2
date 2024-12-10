document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Close other active items
        document.querySelectorAll('.faq-item').forEach(el => {
            if (el !== item) {
                el.classList.remove('active');
            }
        });
        // Toggle the clicked item
        item.classList.toggle('active');
    });
});

document.querySelector('.btn_entre_em_contato').addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do botão dentro de formulários
    alert("Mensagem enviada com sucesso!");
    location.reload();
});
