$(function () {
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
            TweenMax.to(this.target, 0.3, { scale: 0.7 });
        } else {
            TweenMax.to(this.target, 0.3, { skewX: skew, scale: 1 });
        }
    }

    function releaseCookie() {
        let jarBottom = $(window).height() - $('.banka-banka-jar').offset().top - $('.banka-banka-jar').height();
        let cookieBottom = $(window).height() - $(this.target).offset().top - $(this.target).height();
        let distance = (cookieBottom - jarBottom) + this.y + $(this.target).height() * 0.1;

        if (this.hitTest(jar, '80%')) {
            TweenMax.to(this.target, 1, { skewX: 0, x: this.x, y: distance, ease: Bounce.easeOut })
        } else {
            TweenMax.to(this.target, 1, { skewX: 0, x: 0, y: 0, scale: 1, ease: Elastic.easeOut });
        };

    }

})

