const joinMeetupBtn = document.querySelector("#joinMeetupBtn");
const eventsNearNYContainer = document.querySelector(".eventsNearNYContainer");

const openSignupModalBtn = document.querySelector("#openSignupModalBtn");
const closeModalSignupBtn = document.querySelector("#closeModalSignup");
const openLoginModalBtn = document.querySelector("#openLoginModal");
const closeModalLoginBtn = document.querySelector("#closeModalLogin");

const modalSignup = document.querySelector(".modalSignUp");
const modalLogin = document.querySelector(".modalLogin");
const modalContentSignup = document.querySelector(".modalContentSignup");
const modalContentLogin = document.querySelector(".modalContentLogin");

const signupBtn = document.querySelector("#signupBtn");
const loginBtn = document.querySelector("#loginBtn");

const resetSignupBtn = document.querySelector("#resetSignupBtn");
const resetLoginBtn = document.querySelector("#resetLoginBtn");

const notificationsSignup = document.querySelector(".notificationsSignup");
const notificationsLogin = document.querySelector(".notificationsLogin");

const firstNameSignup = document.querySelector("#firstNameSignup");
const lastNameSignup = document.querySelector("#lastNameSignup");
const emailSignup = document.querySelector("#emailSignup");
const passwordSignup = document.querySelector("#passwordSignup");
const emailLogin = document.querySelector("#emailLogin");
const passwordLogin = document.querySelector("#passwordLogin");

const users = JSON.parse(localStorage.getItem("users")) || [];

let nameFirst;
let nameSecond;

// ======= SCRIPT =============================================

joinMeetupBtn.addEventListener("click", () => {
  location.pathname = "page2.html";
});

openLoginModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetLogin();
});
openSignupModalBtn.addEventListener("click", () => {
  resetSignup();
});

closeOrOpenModal(
  openSignupModalBtn,
  modalSignup,
  closeModalSignupBtn,
  toggleModalHiddenS
);

closeOrOpenModal(
  openLoginModalBtn,
  modalLogin,
  closeModalLoginBtn,
  toggleModalHiddenL
);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalSignup.classList.add("modalHidden");
    modalLogin.classList.add("modalHidden");
  }
});

modalContentSignup.addEventListener("click", stopPropag);
modalContentLogin.addEventListener("click", stopPropag);

// validation=====
signupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateSignupForm(
    firstNameSignup.value,
    lastNameSignup.value,
    emailSignup.value,
    passwordSignup.value
  );
});

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateLoginForm(emailLogin.value, passwordLogin.value);
});

resetSignupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  resetSignup();
});

resetLoginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  resetLogin();
});

// ============== FUNCTIONS ===================================

function toggleModalHiddenS() {
  modalSignup.classList.toggle("modalHidden");
}
function toggleModalHiddenL() {
  modalLogin.classList.toggle("modalHidden");
}

function closeOrOpenModal(el1, el2, el3, func) {
  el1.addEventListener("click", func);
  el2.addEventListener("click", func);
  el3.addEventListener("click", func);
}

function stopPropag(e) {
  e.stopPropagation();
}

class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

function validateSignupForm(firstName, lastName, email, password) {
  if (firstName && lastName && email && password) {
    if (validateEmail(email) !== true) {
      createNotification(
        "Email must include @",
        "notificationError",
        notificationsSignup
      );
    }
    if (validatePassword(password) !== true) {
      createNotification(
        "Your password must include at least 8 characters",
        "notificationError",
        notificationsSignup
      );
    }
    if (
      firstName &&
      lastName &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      createNotification(
        "You succesfully signed up",
        "notificationSuccess",
        notificationsSignup
      );
      const user = new User(firstName, lastName, email, password);
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      resetSignup();
      setTimeout(() => {
        toggleModalHiddenS();
      }, 1000);
    }
  } else {
    createNotification(
      "Please fill the required fields",
      "notificationError",
      notificationsSignup
    );
  }
}

function validateLoginForm(email, password) {
  if (email && password) {
    let checkedUser = users.some((user) => {
      return user.email === email && user.password === password;
    });
    if (checkedUser) {
      const filtredUser = users.filter((user) => {
        if (user.email === email && user.password === password) {
          return user;
        }
      });
      console.log(filtredUser);
      nameFirst = filtredUser[0].firstName;
      nameSecond = filtredUser[0].lastName;
      createNotification(
        `Hi, ${nameFirst} ${nameSecond}! You succesfully logged in!`,
        "notificationSuccess",
        notificationsLogin
      );
      resetLogin();
      setTimeout(() => {
        toggleModalHiddenL();
      }, 1000);
    } else {
      createNotification(
        "Email or password is incorrect",
        "notificationError",
        notificationsLogin
      );
    }
  } else {
    createNotification(
      "Please fill the required fields",
      "notificationError",
      notificationsLogin
    );
  }
}

function resetSignup() {
  firstNameSignup.value = "";
  lastNameSignup.value = "";
  emailSignup.value = "";
  passwordSignup.value = "";
}

function resetLogin() {
  emailLogin.value = "";
  passwordLogin.value = "";
}

const validateEmail = function (str) {
  let flag = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "@") {
      flag = true;
    }
  }
  return flag;
};

const validatePassword = function (str) {
  let flag = false;
  if (str.length >= 8) {
    flag = true;
  }
  return flag;
};

function createNotification(text, classN, el) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.classList.add(classN);
  notification.textContent = text;
  el.append(notification);
  setTimeout(() => {
    notification.style.animation = "fadeOut 2s ease forwards";
  }, 1500);
  setTimeout(() => {
    notification.style.display = "none";
  }, 3500);
}
