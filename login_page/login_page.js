const emailBtn = document.getElementById("emailBtn");
const phoneBtn = document.getElementById("phoneBtn");
const input = document.getElementById("email");
const signIn = document.getElementById("signIn");

emailBtn.onclick = () => {
  emailBtn.classList.add("active");
  phoneBtn.classList.remove("active");
  input.placeholder = "Enter your email";
};

phoneBtn.onclick = () => {
  phoneBtn.classList.add("active");
  emailBtn.classList.remove("active");
  email.placeholder = "Enter your phone number";
};

signIn.addEventListener("click",() => {
    
})