$(function() {
    const formData = new FormData();
    const sendBtn = $(".sendResumePopUp-learnMore-btn")

    const isFieldsFilled = {
        stack: false,
        level: false,
        email: false,
        resume: false,
        agreement: false
    }

    $("#sendResumePopUp-stack-input").on("input", function(e) {
        formData.append("stack", e.target.value);
        if (e.target.value) {
            isFieldsFilled.stack = true;
        } else {
            isFieldsFilled.stack = false;
        }
        checkIsFieldsFilled();
    });

    $("#sendResumePopUp-level-input").on("input", function(e) {
        formData.append("level", e.target.value);
        if (e.target.value) {
            isFieldsFilled.level = true;
        } else {
            isFieldsFilled.level = false;
        }
        checkIsFieldsFilled();
    });

    $("#sendResumePopUp-email-input").on("input", function(e) {
        formData.append("email", e.target.value);
        if (e.target.value) {
            isFieldsFilled.email = true;
        } else {
            isFieldsFilled.email = false;
        }
        checkIsFieldsFilled();
    });

    $("#sendResumePopUp-resume-input").on("input", function(e) {
        formData.append("resume", e.target.files[0]);
        if (e.target.files[0]) {
            isFieldsFilled.resume = true;
        } else {
            isFieldsFilled.resume = false;
        }
        checkIsFieldsFilled();
    });
    $("#sendResumePopUp-agreement").on("change", function(e) {
        formData.append("agreement", e.target.checked);
        if (e.target.checked) {
            isFieldsFilled.agreement = true;
        } else {
            isFieldsFilled.agreement = false;
        }
        checkIsFieldsFilled();
    })


    $(".sendResumePopUp-learnMore-btn").click(function() {
        console.log("send resume clicked");
    });

    const checkIsFieldsFilled = () => {
        if (isFieldsFilled.stack && isFieldsFilled.level && isFieldsFilled.email && isFieldsFilled.resume && isFieldsFilled.agreement) {
            sendBtn.prop("disabled", false);
        } else {
            sendBtn.prop("disabled", true);
        }
    }
});