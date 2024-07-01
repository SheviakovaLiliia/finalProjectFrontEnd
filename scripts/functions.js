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
