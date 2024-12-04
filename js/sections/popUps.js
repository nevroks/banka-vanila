$(function() {
    const openPopUpBtn1 = $(".header-navigation-button-resume");
    const popUp1Wrapper = $(".popUp-wrapper.sendResumePopUp");
    const popUp1Content = $(".popUp-content.sendResumePopUp-content");

    openPopUpBtn1.click(function() {
        popUp1Wrapper.addClass("visible");
    })
    popUp1Wrapper.click(function() {
        popUp1Wrapper.removeClass("visible");
    })
    popUp1Content.click(function(e) {
        e.stopPropagation();
    })




})