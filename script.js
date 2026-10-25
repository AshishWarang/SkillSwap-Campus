
const sampleSkills = [
  {
    id: 1,
    name: "Python Programming",
    category: "Technology",
    student: "Aarav",
    type: "Teach",
    emoji: "💻"
  },
  {
    id: 2,
    name: "UI/UX Design",
    category: "Design",
    student: "Ananya",
    type: "Teach",
    emoji: "🎨"
  },
  {
    id: 3,
    name: "Public Speaking",
    category: "Communication",
    student: "Rohan",
    type: "Learn",
    emoji: "🎤"
  },
  {
    id: 4,
    name: "Web Development",
    category: "Technology",
    student: "Priya",
    type: "Teach",
    emoji: "🌐"
  },
  {
    id: 5,
    name: "Startup Basics",
    category: "Business",
    student: "Ishita",
    type: "Learn",
    emoji: "🚀"
  },
  {
    id: 6,
    name: "Graphic Design",
    category: "Design",
    student: "Kabir",
    type: "Teach",
    emoji: "🖌️"
  }
];

const skills = [...sampleSkills];

const skillGrid = document.getElementById("skill-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const skillCount = document.getElementById("skill-count");
const emptyState = document.getElementById("empty-state");
const skillForm = document.getElementById("skill-form");
const formMessage = document.getElementById("form-message");

function getEmoji(category) {
  const emojis = {
    Technology: "💻",
    Design: "🎨",
    Communication: "🎤",
    Business: "🚀",
    Other: "✨"
  };

  return emojis[category] || "✨";
}

function renderSkills() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filteredSkills = skills.filter((skill) => {
    const searchableText =
      `${skill.name} ${skill.student} ${skill.category}`.toLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesCategory =
      category === "All" || skill.category === category;

    return matchesSearch && matchesCategory;
  });

  skillGrid.replaceChildren();

  filteredSkills.forEach((skill) => {
    const article = document.createElement("article");
    article.className = "skill-card";

    const top = document.createElement("div");
    top.className = "skill-top";

    const emoji = document.createElement("span");
    emoji.className = "skill-emoji";
    emoji.textContent = skill.emoji || getEmoji(skill.category);

    const badge = document.createElement("span");
    badge.className = `pill ${skill.type === "Learn" ? "learn" : ""}`;
    badge.textContent = skill.type;

    top.append(emoji, badge);

    const title = document.createElement("h3");
    title.textContent = skill.name;

    const description = document.createElement("p");
    description.textContent = skill.category;

    const meta = document.createElement("div");
    meta.className = "skill-meta";
    meta.textContent = `👤 ${skill.student}`;

    article.append(top, title, description, meta);
    skillGrid.appendChild(article);
  });

  skillCount.textContent =
    `${filteredSkills.length} ${filteredSkills.length === 1 ? "skill" : "skills"}`;

  emptyState.hidden = filteredSkills.length !== 0;
}

searchInput.addEventListener("input", renderSkills);
categoryFilter.addEventListener("change", renderSkills);

skillForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(skillForm);

  const student = String(formData.get("studentName") || "").trim();
  const name = String(formData.get("skillName") || "").trim();
  const category = String(formData.get("category") || "");
  const type = String(formData.get("type") || "");

  if (!student || !name || !category || !type) {
    formMessage.textContent = "Please complete all fields.";
    formMessage.className = "form-message error";
    return;
  }

  if (!["Technology", "Design", "Communication", "Business", "Other"].includes(category) ||
      !["Teach", "Learn"].includes(type)) {
    formMessage.textContent = "Please select valid options.";
    formMessage.className = "form-message error";
    return;
  }

  skills.unshift({
    id: Date.now(),
    name,
    category,
    student,
    type,
    emoji: getEmoji(category)
  });

  skillForm.reset();
  categoryFilter.value = "All";
  searchInput.value = "";
  renderSkills();

  formMessage.textContent =
    "Skill added to this demo! Database saving comes in the next stage.";
  formMessage.className = "form-message success";
});

renderSkills();
