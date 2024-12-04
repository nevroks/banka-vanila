// $(function () {
//     var scroll = new LocomotiveScroll({
//         el: document.querySelector('.wrapper'),
//         smooth: true
//     });

//     document.addEventListener('wheel', function (event) {
//         event.preventDefault();

//         var delta = event.deltaY;

//         if (delta > 0) {
//             scroll.scrollTo(scroll.scroll.instance.scroll.y + window.innerHeight);
//         } else {
//             scroll.scrollTo(scroll.scroll.instance.scroll.y - window.innerHeight);
//         }
//     }, { passive: false });

//     function animateSections() {
//         var sections = $('.pagepiling section');
//         var windowHeight = $(window).height();

//         sections.each(function() {
//             var sectionTop = $(this).offset().top;

//             if(sectionTop < scroll.scroll.instance.scroll.y + windowHeight - 100) {
//                 $(this).addClass('visible'); 
//             }
//         });
//     }

//     animateSections();

//     scroll.on('scroll', function() {
//         animateSections();
//     });

//     $(window).on('resize', function () {
//         animateSections();
//     });
// });

// $(function () {
//     var scroll = new LocomotiveScroll({
//         el: document.querySelector('.wrapper'),
//         smooth: true
//     });

//     var isScrolling = false;

//     scroll.on('scroll', function (obj) {
//         if (isScrolling) return;

//         var delta = obj.direction;

//         isScrolling = true;

//         var duration = 1200; 

//         if (delta === "down") {
//             scroll.scrollTo(scroll.scroll.instance.scroll.y + window.innerHeight, {
//                 duration: duration,
//                 easing: [0.25, 0.25, 0.25, 0.25],
//                 callback: function () {
//                     isScrolling = false;
//                 }
//             });
//         } else {
//             scroll.scrollTo(scroll.scroll.instance.scroll.y - window.innerHeight, {
//                 duration: duration,
//                 easing: [0.25, 0.1, 0.25, 1],
//                 callback: function () {
//                     isScrolling = false;
//                 }
//             });
//         }

//         animateSections();
//     });

//     function animateSections() {
//         var sections = $('.pagepiling section');
//         var windowHeight = $(window).height();
//         sections.each(function() {
//             var sectionTop = $(this).offset().top;

//             if (sectionTop < scroll.scroll.instance.scroll.y + windowHeight - 100) {
//                 $(this).addClass('visible');
//                 console.log( this.className); 
//             } else {
//                 $(this).removeClass('visible');
//             }
//         });
//     }

//     $(window).on('resize', function () {
//         animateSections();
//     });
// });





function preventDefault(e) {
    e.preventDefault();
}

$(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('.wrapper'),
        smooth: true
    });

    var isScrolling = false;

    scroll.on('scroll', function (obj) {
        if (isScrolling) return;

        var delta = obj.direction;

        var currentSection = document.querySelector('.pagepiling .visible');
        var whyUsSection = document.querySelector('.WhyUs');

        if (whyUsSection === currentSection) {
            return; 
        }

        isScrolling = true;

        var duration = 1200; 

        if (delta === "down") {
            scroll.scrollTo(scroll.scroll.instance.scroll.y + window.innerHeight, {
                duration: duration,
                easing: [0.25, 0.25, 0.25, 0.25], 
                callback: function () {
                    isScrolling = false;
                }
            });
        } else {
            scroll.scrollTo(scroll.scroll.instance.scroll.y - window.innerHeight, {
                duration: duration,
                easing: [0.25, 0.1, 0.25, 1],
                callback: function () {
                    isScrolling = false;
                }
            });
        }

        animateSections();
    });

    function animateSections() {
        var sections = $('.pagepiling section');
        var windowHeight = $(window).height();
        var whyUsVisible = false;

        sections.each(function () {
            var sectionTop = $(this).offset().top;

            if (sectionTop < scroll.scroll.instance.scroll.y + windowHeight - 100) {
                $(this).addClass('visible');
                if ($(this).hasClass('WhyUs')) {
                    whyUsVisible = true; 
                }
            } else {
                $(this).removeClass('visible');
                if ($(this).hasClass('WhyUs')) {
                    whyUsVisible = false; 
                }
            }
        });

        if (whyUsVisible) {
            onWhyUsVisible(); 
            scroll.stop();
            disableScroll();
        }
    }

    function onWhyUsVisible() {
        console.log("Секция WhyUs теперь видима!");
    }

    function disableScroll() {
        window.addEventListener('wheel', preventDefault, { passive: false });
        window.addEventListener('touchmove', preventDefault, { passive: false });
        window.addEventListener('scroll', preventDefault, { passive: false });
    }

    $(window).on('resize', function () {
        animateSections();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const coreValues = document.querySelectorAll('.WhyUs-CoreValues-value');
    let currentIndex = 0;
    let count = 0; 

    function updateClasses() {
        coreValues.forEach((value, index) => {
            value.classList.toggle('openned', index === currentIndex);
        });
    }

    updateClasses();

    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            if (currentIndex < coreValues.length - 1) {
                currentIndex++;
                count = 0; 
            } else {
                count++;
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
                if (currentIndex === 0) {
                    count++;
                }
            } else {
                count++;
            }
        }

        if (count >= 3) {
            enableScroll(); 
            count=0
        }
        console.log(count); 
        updateClasses();
    });

    function enableScroll() {
        console.log(enableScroll);
        window.removeEventListener('wheel', preventDefault, { passive: false });
        window.removeEventListener('touchmove', preventDefault, { passive: false });
        window.removeEventListener('scroll', preventDefault, { passive: false });
    }
});