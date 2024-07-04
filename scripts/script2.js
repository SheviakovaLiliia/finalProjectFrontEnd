const navLogo = document.querySelector("#navLogo");
const eventsNearNYContainer = document.querySelector(".eventsNearNYContainer");

const selectEventType = document.querySelector("#selectEventType");
const selectEventDistance = document.querySelector("#selectEventDistance");
const selectEventCategory = document.querySelector("#selectEventCategory");

let filltredEventsList;

const mapContainer = document.querySelector(".mapContainer");
const closeMapBtn = document.querySelector("#closeMap");

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

const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: "SAT, MAR 23 - 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: "SAT, MAR 23 - 11:30 AM ",
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: "SAT, MAR 16 - 2:00 PM",
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: "WED, MAR 13 - 11:00 AM",
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: "THU MAR 14 - 11:00 AM",
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: "THU MAR 14 - 11:00 AM",
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

// ============ SCRIPT ====================================================

navLogo.addEventListener("click", () => {
  location.pathname = "page1.html";
});

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  eventsStore.forEach((el) => {
    createCard(el);
  });
});

selectEventType.addEventListener("change", filterEvents);
selectEventDistance.addEventListener("change", filterEvents);
selectEventCategory.addEventListener("change", filterEvents);

closeMapBtn.addEventListener("click", () => {
  mapContainer.style.display = "none";
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

function createCard(obj) {
  const card = document.createElement("div");
  card.classList.add("eventsNearNYCard");
  eventsNearNYContainer.append(card);
  const cardImg = document.createElement("div");

  cardImg.classList.add("eventCard2Img");
  cardImg.style.backgroundImage = `url(${obj.image})`;
  const eventInfo = document.createElement("div");
  eventInfo.classList.add("eventsNearNYInfo");
  card.append(cardImg, eventInfo);

  const eventDate = document.createElement("p");
  const eventTitle = document.createElement("h2");
  const eventCategory = document.createElement("p");
  const eventAttend = document.createElement("p");

  eventDate.classList.add("eventsNearNYDate");
  eventTitle.classList.add("eventsNearNYTitle");
  eventCategory.classList.add("eventsNearNYCategory");
  eventAttend.classList.add("eventsNearNYAttend");

  eventDate.textContent = obj.date;
  eventTitle.textContent = obj.title;
  eventCategory.textContent = `${obj.category} (${obj.distance} km)`;
  if (obj.attendees) {
    eventAttend.textContent = `${obj.attendees} attendees`;
  }

  if (obj.type === "online") {
    const onlineSignAbsolute = document.createElement("div");
    const onlineSignAP = document.createElement("p");
    const onlineSignAImg = document.createElement("img");

    onlineSignAbsolute.classList.add("onlineSignAbsolute");
    onlineSignAP.classList.add("onlineSignAP");
    onlineSignAImg.classList.add("onlineSignAImg");

    onlineSignAP.textContent = "Online Event";
    onlineSignAImg.setAttribute("src", "assets/icons/onlineIcon.svg");

    cardImg.append(onlineSignAbsolute);
    onlineSignAbsolute.append(onlineSignAImg, onlineSignAP);

    const onlineSignStatic = document.createElement("p");
    const onlineSignSImg = document.createElement("img");

    onlineSignStatic.classList.add("onlineSignStatic");
    onlineSignSImg.classList.add("onlineSignSImg");

    onlineSignStatic.textContent = "Online Event";
    onlineSignSImg.setAttribute("src", "assets/icons/onlineIcon.svg");

    eventInfo.append(onlineSignStatic);
    onlineSignStatic.prepend(onlineSignSImg);
  }

  eventInfo.append(eventDate, eventTitle, eventCategory, eventAttend);
}

function filterEvents() {
  eventsNearNYContainer.textContent = "";
  if (
    selectEventType.value === "Any type" &&
    selectEventDistance.value === "Any distance" &&
    selectEventCategory.value === "Any category"
  ) {
    filltredEventsList = eventsStore;
  } else if (
    selectEventType !== "Any type" &&
    selectEventDistance.value === "Any distance" &&
    selectEventCategory.value === "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return card.type === selectEventType.value;
    });
  } else if (
    selectEventType.value === "Any type" &&
    selectEventDistance.value !== "Any distance" &&
    selectEventCategory.value === "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return card.distance <= selectEventDistance.value;
    });
  } else if (
    selectEventType.value === "Any type" &&
    selectEventDistance.value === "Any distance" &&
    selectEventCategory.value !== "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return card.category === selectEventCategory.value;
    });
  } else if (
    selectEventType.value !== "Any type" &&
    selectEventDistance.value !== "Any distance" &&
    selectEventCategory.value === "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return (
        card.type === selectEventType.value &&
        card.distance <= selectEventDistance.value
      );
    });
  } else if (
    selectEventType.value !== "Any type" &&
    selectEventDistance.value === "Any distance" &&
    selectEventCategory.value !== "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return (
        card.type === selectEventType.value &&
        card.category === selectEventCategory.value
      );
    });
  } else if (
    selectEventType.value === "Any type" &&
    selectEventDistance.value !== "Any distance" &&
    selectEventCategory.value !== "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return (
        card.distance <= selectEventDistance.value &&
        card.category === selectEventCategory.value
      );
    });
  } else if (
    selectEventType.value !== "Any type" &&
    selectEventDistance.value !== "Any distance" &&
    selectEventCategory.value !== "Any category"
  ) {
    filltredEventsList = eventsStore.filter((card) => {
      return (
        card.type === selectEventType.value &&
        card.distance <= selectEventDistance.value &&
        card.category === selectEventCategory.value
      );
    });
  }

  if (filltredEventsList.length > 0) {
    filltredEventsList.forEach((el) => {
      createCard(el);
    });
  } else {
    eventsNearNYContainer.textContent = "No events found...";
  }
}

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
        "You signed in succesfully",
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
