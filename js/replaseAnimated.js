document.querySelectorAll('.social-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const img = item.querySelector('.img');
        img.style.animation = 'none'; 
        img.offsetHeight; 
        img.style.animation = ''; 
    });
});
document.querySelectorAll('.social-item-show-Button').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const img = item.querySelector('.img');
        img.style.animation = 'none'; 
        img.offsetHeight; 
        img.style.animation = ''; 
    });
});