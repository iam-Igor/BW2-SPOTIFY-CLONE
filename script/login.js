let email = "team8@epicode.com";
let password = "epicode2023";

const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

const form = document.getElementById("login-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailInput.value === email && passwordInput.value === password) {
    location.assign("main.html");
  } else {
    const loginalert = document.getElementsByClassName("loginalert")[0];
    loginalert.classList.remove("d-none");
  }
});

const showPassword = function () {
  const checkbox = document.getElementById("checkbox");
  const eyeicon = document.getElementById("eye-icon");
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      passwordInput.type = "text";
      eyeicon.classList.remove("bi-eye-slash");
      eyeicon.classList.add("bi-eye");
    } else {
      passwordInput.type = "password";
      eyeicon.classList.add("bi-eye-slash");
      eyeicon.classList.remove("bi-eye");
    }
  });
};

showPassword();
