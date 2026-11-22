// Staff Data Array (Easy to update or connect to an API later)
const staffMembers = [
  {
    id: 1,
    name: "Ananya Nair",
    role: "Chief Executive Officer",
    department: "Leadership",
    email: "ananya@company.com",
    image: "https://unsplash.com",
    bio: "Ananya leads company strategy and operations with over 12 years of experience scaling technology teams."
  },
  {
    id: 2,
    name: "Rohan Menon",
    role: "Lead Frontend Engineer",
    department: "Engineering",
    email: "rohan@company.com",
    image: "https://unsplash.com",
    bio: "Rohan specializes in accessible web architecture, performance optimization, and modern JavaScript frameworks."
  },
  {
    id: 3,
    name: "Meera Krishnan",
    role: "Senior UI/UX Designer",
    department: "Design",
    email: "meera@company.com",
    image: "https://unsplash.com",
    bio: "Meera crafts intuitive user interfaces and design systems focused on clarity and human-centered workflows."
  },
  {
    id: 4,
    name: "David Thomas",
    role: "Backend Systems Architect",
    department: "Engineering",
    email: "david@company.com",
    image: "https://unsplash.com",
    bio: "David builds resilient cloud infrastructure, APIs, and database pipelines for high-traffic applications."
  },
  {
    id: 5,
    name: "Priya Varghese",
    role: "Head of Growth & Marketing",
    department: "Marketing",
    email: "priya@company.com",
    image: "https://unsplash.com",
    bio: "Priya oversees brand storytelling, digital campaigns, and customer acquisition across global markets."
  },
  {
    id: 6,
    name: "Arjun Pillai",
    role: "Product Designer",
    department: "Design",
    email: "arjun@company.com",
    image: "https://unsplash.com",
    bio: "Arjun bridges user research and interactive prototyping to turn complex problems into simple products."
  }
];

// DOM Elements
const staffGrid = document.getElementById("staffGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");

// Modal Elements
const modal = document.getElementById("staffModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDept = document.getElementById("modalDept");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");
const modalEmail = document.getElementById("modalEmail");

let currentDept = "All";
let searchQuery = "";

// Render Staff Cards
function renderStaff() {
  const filtered = staffMembers.filter((member) => {
    const matchesDept = currentDept === "All" || member.department === currentDept;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery) ||
      member.role.toLowerCase().includes(searchQuery);
    return matchesDept && matchesSearch;
  });

  staffGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  filtered.forEach((member) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" class="avatar" />
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <span class="badge">${member.department}</span>
      <button class="btn-outline" data-id="${member.id}">View Profile</button>
    `;
    staffGrid.appendChild(card);
  });
}

// Open Modal with Member Info
function openModal(memberId) {
  const member = staffMembers.find((m) => m.id === Number(memberId));
  if (!member) return;

  modalImg.src = member.image;
  modalImg.alt = member.name;
  modalName.textContent = member.name;
  modalDept.textContent = member.department;
  modalRole.textContent = member.role;
  modalBio.textContent = member.bio;
  modalEmail.href = `mailto:${member.email}`;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderStaff();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentDept = btn.dataset.dept;
    renderStaff();
  });
});

staffGrid.addEventListener("click", (e) => {
  if (e.target.matches(".btn-outline")) {
    openModal(e.target.dataset.id);
  }
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Initial Render
renderStaff();
