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
