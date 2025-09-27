"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const hireMeBtn =
  document.querySelector(".contact[data-page]") ||
  document.querySelector("[data-nav-link='contact']");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// project modal variables
const modalContainers = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalImgs = document.getElementById("modalImg");
const modalTitles = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalImgs.src = card.querySelector("img").src;
    modalImgs.alt = card.dataset.title;
    modalTitles.textContent = card.dataset.title;
    modalCategory.textContent = card.dataset.category;
    modalDescription.textContent = card.dataset.description;

    // Insert tech stack as styled tags
    modalTech.innerHTML = card.dataset.tech
      .split(",")
      .map((t) => `<span class="tech-tag">${t.trim()}</span>`)
      .join(" ");

    modalGithub.href = card.dataset.github;
    modalLive.href = card.dataset.live;

    modalContainers.classList.add("active");
  });
});

[modalOverlay, modalClose].forEach((el) => {
  el.addEventListener("click", () =>
    modalContainers.classList.remove("active")
  );
});

// page navigation variables
const navigationLinks = document.querySelectorAll(
  ".navbar-link[data-nav-link]"
);
const pages = document.querySelectorAll("[data-page]");
const hireMe = document.querySelector("button.contact[data-pages='contact']");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

if (hireMe) {
  hireMe.addEventListener("click", function () {
    // Deactivate all pages
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    // Activate contact page
    const contactPage = document.querySelector("[data-page='contact']");
    if (contactPage) {
      contactPage.classList.add("active");
    }

    // Update navbar active state to contact
    const navbarLinks = document.querySelectorAll(
      ".navbar-link[data-nav-link]"
    );
    for (let k = 0; k < navbarLinks.length; k++) {
      navbarLinks[k].classList.remove("active");
      if (navbarLinks[k].textContent.toLowerCase() === "contact") {
        navbarLinks[k].classList.add("active");
      }
    }
    // ❌ don't touch nav active state at all
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const blogModal = document.getElementById("blogModal");
const blogOverlay = document.getElementById("blogOverlay");
const blogClose = document.getElementById("blogClose");

const blogModalImg = document.getElementById("blogModalImg");
const blogModalTitle = document.getElementById("blogModalTitle");
const blogModalCategory = document.getElementById("blogModalCategory");
const blogModalDate = document.getElementById("blogModalDate");
const blogModalDescription = document.getElementById("blogModalDescription");

document.querySelectorAll(".blog-post-item").forEach((blog) => {
  blog.addEventListener("click", (e) => {
    e.preventDefault();

    blogModalImg.src = blog.dataset.img;
    blogModalTitle.textContent = blog.dataset.title;
    blogModalCategory.textContent = blog.dataset.category;
    blogModalDate.textContent = blog.dataset.date;
    blogModalDescription.textContent = blog.dataset.description;

    blogModal.classList.add("active");
  });
});

[blogOverlay, blogClose].forEach((el) => {
  el.addEventListener("click", () => blogModal.classList.remove("active"));
});
