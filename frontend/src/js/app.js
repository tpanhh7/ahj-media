import parseCoordinates from "./coordinatesParser";

export default class App {
  constructor() {
    this.timeline = document.getElementById("timeline");
    this.postInput = document.getElementById("post-input");
    this.modal = document.getElementById("modal");
    this.modalInput = document.getElementById("modal-input");
    this.modalCancel = document.getElementById("modal-cancel");
    this.modalOk = document.getElementById("modal-ok");

    this.initEventListeners();
  }

  initEventListeners() {
    this.postInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.postInput.value.trim()) {
        this.createPost(this.postInput.value.trim());
        this.postInput.value = "";
      }
    });

    this.modalCancel.addEventListener("click", () => {
      this.closeModal();
    });

    this.modalOk.addEventListener("click", () => {
      try {
        const coords = parseCoordinates(this.modalInput.value);
        this.addPostToTimeline(this.lastPostText, coords);
        this.closeModal();
      } catch (error) {
        this.showError("Invalid coordinates format. Please try again.");
      }
    });
  }

  showError(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }

  createPost(text) {
    this.lastPostText = text;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.addPostToTimeline(text, coords);
        },
        () => {
          this.showModal();
        }
      );
    } else {
      this.showModal();
    }
  }

  addPostToTimeline(text, coords) {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const date = new Date();
    const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    postElement.innerHTML = `
      <div class="post-content">${text}</div>
      <div class="post-coordinates">Coordinates: ${coords.latitude}, ${coords.longitude}</div>
      <div class="post-date">${dateString}</div>
    `;

    this.timeline.insertBefore(postElement, this.timeline.firstChild);
  }

  showModal() {
    this.modal.style.display = "block";
    this.modalInput.focus();
  }

  closeModal() {
    this.modal.style.display = "none";
    this.modalInput.value = "";
  }
}
