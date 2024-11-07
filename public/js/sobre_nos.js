let currentIndex = 0;

function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, i) => {
        item.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}

function prevSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 5000); // Muda automaticamente de slide a cada 5 segundos

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});
