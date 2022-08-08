var input = document.querySelector("#phone");

var validMsg = document.querySelector('#valid-msg');
var errorMsg = document.querySelector('#error-msg');
var errorMap = ["Invalid number", "Invalid country code", "Too short",
    "Too long", "Invalid number"];

var iti = window.intlTelInput(input, {
    initialCountry: 'se',
    preferredCountries: ['se'],
    separateDialCode: true,
    nationalMode: true,
    // TODO denna ska vara local
    utilsScript: 'utils.js',
});

var reset = function () {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
}

input.addEventListener('blur', function () {
    reset();
    if (input.value.trim) {
        if (iti.isValidNumber()) {
            validMsg.innerHTML = "√ Valid";
        }
        else if (input.value.length === 11) {
            errorMsg.innerHTML = "Invalid number";
        }
        else {
            validMsg.innerHTML = "";
            input.classList.add("error");
            var errorCode = iti.getValidationError();
            errorMsg.innerHTML = errorMap[errorCode];
            errorMsg.classList.remove("hide");
        }
    }
});

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

function outputNumber() {
    console.log(iti.getNumber());
}