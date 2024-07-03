navLogo.addEventListener("click", () => {
  location.pathname = "page1.html";
});

document.addEventListener("DOMContentLoaded", () => {
  eventsStore.forEach((el) => {
    createCard(el);
  });
});

selectEventType.addEventListener("change", filterEvents);
selectEventDistance.addEventListener("change", filterEvents);
selectEventCategory.addEventListener("change", filterEvents);

eventsStore.forEach((el) => {
  console.log(el.date);
});

closeMapBtn.addEventListener("click", () => {
  mapContainer.style.display = "none";
});

closeOrOpenModal(
  openSignupModalBtn,
  modalSignup,
  closeModalSignupBtn,
  toggleModalHiddenS
);

openLoginModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
});

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

// modal sign up=========

// openSignupModalBtn.addEventListener("click", () => {
//   modalSignup.classList.toggle("modalHidden");
// });

// modalSignup.addEventListener("click", () => {
//   modalSignup.classList.toggle("modalHidden");
// });

// window.addEventListener("keydown", (event) => {
//   if (event.key === "Escape") {
//     modalSignup.classList.add("modalHidden");
//   }
// });

// closeModalSignupBtn.addEventListener("click", () => {
//   modalSignup.classList.toggle("modalHidden");
// });

// modalContentSignup.addEventListener("click", (event) => {
//   event.stopPropagation();
// });

// openLoginModalBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   modalLogin.classList.toggle("modalHidden");
// });

// modalLogin.addEventListener("click", () => {
//   modalLogin.classList.toggle("modalHidden");
// });

// closeModalLoginBtn.addEventListener("click", () => {
//   modalLogin.classList.toggle("modalHidden");
// });

// modalContentLogin.addEventListener("click", (event) => {
//   event.stopPropagation();
// });

// modalContentSignup.addEventListener("click", (event) => {
//   event.stopPropagation();
// });

// modal log in=========

// openLoginModalBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   modalLogin.classList.toggle("modalHidden");
// });

// modalLogin.addEventListener("click", () => {
//   modalLogin.classList.toggle("modalHidden");
// });

// window.addEventListener("keydown", (event) => {
//   if (event.key === "Escape") {
//     modalLogin.classList.add("modalHidden");
//   }
// });

// closeModalLoginBtn.addEventListener("click", () => {
//   modalLogin.classList.toggle("modalHidden");
// });

// modalContentLogin.addEventListener("click", (event) => {
//   event.stopPropagation();
// });
