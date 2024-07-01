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
