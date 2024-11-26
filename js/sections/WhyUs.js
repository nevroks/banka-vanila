document.querySelectorAll('.WhyUs-CoreValues-value').forEach((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('openned')) {
            return
        } else {
            document.querySelectorAll('.WhyUs-CoreValues-value').forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('openned');
                }
            });
            item.classList.add('openned');
        }
        
    })
})