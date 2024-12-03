$(function () {
    const bankaWrapper = document.querySelector('.banka-banka-wrapper');
    const bankaLid = document.querySelector('.banka-banka-lid');
    const chosenCookie = document.querySelector('.banka-banka-cookies-cookie-chosen-one');


    let container = document.querySelector('.banka');
    let jar = document.querySelector('.banka-banka-jar');

    gsap.registerPlugin(Draggable, RoughEase)
    Draggable.create('.banka-banka-cookies-cookie', {
        bounds: container,
        cursor: 'pointer',
        throwProps: true,
        autoScroll: 1,
        onDrag: dragCookie, onRelease: releaseCookie,
        zIndexBoost: true
    });
    function dragCookie() {
        let dragDirection = this.getDirection('velocity');
        let skew;

        dragDirection === 'right' ? skew = 9 : dragDirection === 'left' ? skew = -9 : 0;
        if (this.hitTest(jar, '40%')) {
            console.log("inside jar")
            bankaLid.classList.remove('upped');

            TweenMax.to(this.target, 0.3, { scale: 0.7 });
        } else {

            console.log("outside jar")
            bankaLid.classList.add('upped');

            TweenMax.to(this.target, 0.3, { skewX: skew, scale: 1 });
        }

    }

    function releaseCookie() {
        let jarBottom = $(window).height() - $('.banka-banka-jar').offset().top - $('.banka-banka-jar').height() + 16;
        let cookieBottom = $(window).height() - $(this.target).offset().top - $(this.target).height();
        let distance = (cookieBottom - jarBottom) + this.y + $(this.target).height() * 0.1;

        if (this.hitTest(jar, '80%')) {
            console.log("dropped in jar");
            TweenMax.to(this.target, 1, { skewX: 0, x: this.x, y: distance, ease: Bounce.easeOut })
        } else {
            console.log("leaved jar");
            TweenMax.to(this.target, 1, { skewX: 0, x: 0, y: 0, scale: 1, ease: Elastic.easeOut });
            startAnimation()
        };

    }
    function startAnimation() {
        const step1Duration = 900;
        const step2Duration = 1000;

        // ----- 1 шаг -----
        bankaWrapper.classList.add('step-1');
        setTimeout(() => {
            // ----- 2 шаг -----
            bankaLid.classList.add('step-2');
            chosenCookie.classList.add('step-2');

        }, step1Duration)
        setTimeout(() => {
            // ----- 3 шаг -----
            chosenCookie.classList.add('step-3');
        }, step1Duration + step2Duration)
    }

})
// Короче, шаги анимации:
// 1. Приближается камера банка немного опускается вниз,скрывается хедер,убирается скролл,убирается футер | длительность: 0.9 с
// 2. Крышка отлетает влево и поворачивается ,появляется невидимая печенька | длительность: 1 с
// 3. Печенька вылетает из банки | длительность: 1 с

