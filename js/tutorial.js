// Tutorial 👉 https://codyhouse.co/tutorials/revealing-hero-effect
(function() {
  var RevealingHero = function(element) {
    this.element = element;
    this.scrollingFn = false;
    this.scrolling = false;
    this.resetOpacity = false;
    initRevealingHero(this);
  };

  function initRevealingHero(element) {
    // set position of sticky element
    setBottom(element);
    // create a new node - to be inserted before the sticky element
    createPrevElement(element);
    // on resize -> reset element bottom position
    element.element.addEventListener('update-reveal-hero', function(){
      setBottom(element);
      setPrevElementTop(element);
    });
    animateRevealingHero.bind(element)(); // set initial status
    // change opacity of layer
    var observer = new IntersectionObserver(revealingHeroCallback.bind(element));
		observer.observe(element.prevElement);
  };

  function createPrevElement(element) {
    var newElement = document.createElement("div"); 
    newElement.setAttribute('aria-hidden', 'true');
    element.element.parentElement.insertBefore(newElement, element.element);
    element.prevElement =  element.element.previousElementSibling;
    element.prevElement.style.opacity = '0';
    setPrevElementTop(element);
  };

  function setPrevElementTop(element) {
    element.prevElementTop = element.prevElement.getBoundingClientRect().top + window.scrollY;
  };

  function revealingHeroCallback(entries, observer) {
		if(entries[0].isIntersecting) {
      if(this.scrollingFn) return; // listener for scroll event already added
      revealingHeroInitEvent(this);
    } else {
      if(!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      updateOpacityValue(this, 0);
      this.scrollingFn = false;
    }
  };
  
  function revealingHeroInitEvent(element) {
    element.scrollingFn = revealingHeroScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function revealingHeroScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateRevealingHero.bind(this));
  };

  function animateRevealingHero() {
    if(this.prevElementTop - window.scrollY < window.innerHeight) {
      var opacity = (1 - (window.innerHeight + window.scrollY - this.prevElementTop)/window.innerHeight).toFixed(2);
      if(opacity > 0 ) {
        this.resetOpacity = false;
        updateOpacityValue(this, opacity);
      } else if(!this.resetOpacity) {
        this.resetOpacity = true;
        updateOpacityValue(this, 0);
      } 
    }
    this.scrolling = false;
  };

  function updateOpacityValue(element, value) {
    element.element.style.setProperty('--reavealing-hero-overlay-opacity', value);
  };

  function setBottom(element) {
    var translateValue = window.innerHeight - element.element.offsetHeight;
    if(translateValue > 0) translateValue = 0;
    element.element.style.bottom = ''+translateValue+'px';
  };

  //initialize the Revealing Hero objects
  var revealingHero = document.getElementsByClassName('js-revealing-hero');
  var stickySupported = Util.cssSupports('position', 'sticky') || Util.cssSupports('position', '-webkit-sticky');
	if( revealingHero.length > 0 && stickySupported) {
    var revealingHeroArray = [];
		for( var i = 0; i < revealingHero.length; i++) {
      (function(i){revealingHeroArray.push(new RevealingHero(revealingHero[i]));})(i);
    }
    
    var resizingId = false,
      customEvent = new CustomEvent('update-reveal-hero');

    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 100);
    });

    // wait for font to be loaded
    document.fonts.onloadingdone = function (fontFaceSetEvent) {
      doneResizing();
    };

    function doneResizing() {
      for( var i = 0; i < revealingHeroArray.length; i++) {
        (function(i){revealingHeroArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
	}
}());