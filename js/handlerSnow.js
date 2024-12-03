$(document).ready(function() {
    let isSnowflakesVisible = true; 

    $('.showButton').on('click', function() {
        isSnowflakesVisible = !isSnowflakesVisible;

        if (isSnowflakesVisible) {
            $('.img-hide').show(); 
        } else {
            $('.img-hide').hide(); 


            document.querySelectorAll('.social-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const img = item.querySelector('.img');
                    img.style.animation = 'none'; 
                    img.offsetHeight; // Вызов для перезапуска анимации
                    img.style.animation = ''; 
                });
            });

            document.querySelectorAll('.social-item-show-Button').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const img = item.querySelector('.img');
                    img.style.animation = 'none'; 
                    img.offsetHeight; // Вызов для перезапуска анимации
                    img.style.animation = ''; 
                });
            });
        }
    });
});
