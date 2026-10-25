
const sampleSkills = [
  { name: "Python Programming", category: "Technology", student: "Aarav", type: "Teach" },
  { name: "UI/UX Design", category: "Design", student: "Ananya", type: "Teach" },
  { name: "Public Speaking", category: "Communication", student: "Rohan", type: "Learn" },
  { name: "Web Development", category: "Technology", student: "Priya", type: "Teach" },
  { name: "Startup Basics", category: "Business", student: "Ishita", type: "Learn" },
  { name: "Graphic Design", category: "Design", student: "Kabir", type: "Teach" }
];

let skills = [];

const skillGrid = document.getElementById("skill-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const skillCount = document.getElementById("skill-count");
const emptyState = document.getElementById("empty-state");
const skillForm = document.getElementById("skill-form");
const formMessage = document.getElementById("form-message");

const validCategories = [
  "Technology",
  "Design",
  "Communication",
  "Business",
  "Other"
];

const validTypes = ["Teach", "Learn"];

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

// Convert a Supabase database row into the format used by the website.
function formatSkill(row) {
  return {
    id: row.id,
    name: row.skill_name,
    category: row.category,
    student: row.student_name,
    type: row.skill_type,
    emoji: getEmoji(row.category)
  };
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
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

// Load skills from Supabase.
// If the table is empty, add the six initial demo skills once.
async function loadSkills() {
  const { data, error } = await supabaseClient
    .from("skills")
    .select("id, student_name, skill_name, category, skill_type, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (data.length === 0) {
    const demoRows = sampleSkills.map((skill) => ({
      student_name: skill.student,
      skill_name: skill.name,
      category: skill.category,
      skill_type: skill.type
    }));

    const { error: insertError } = await supabaseClient
      .from("skills")
      .insert(demoRows);

    if (insertError) {
      throw insertError;
    }

    return loadSkills();
  }

  skills = data.map(formatSkill);
  renderSkills();
}

searchInput.addEventListener("input", renderSkills);
categoryFilter.addEventListener("change", renderSkills);

skillForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(skillForm);

  const student = String(formData.get("studentName") || "").trim();
  const name = String(formData.get("skillName") || "").trim();
  const category = String(formData.get("category") || "");
  const type = String(formData.get("type") || "");

  if (!student || !name || !category || !type) {
    showMessage("Please complete all fields.", "error");
    return;
  }

  if (student.length > 60 || name.length > 80) {
    showMessage(
      "Student name must be 60 characters or fewer and skill name 80 or fewer.",
      "error"
    );
    return;
  }

  if (!validCategories.includes(category) || !validTypes.includes(type)) {
    showMessage("Please select valid category and skill type options.", "error");
    return;
  }

  const submitButton = skillForm.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
  }

  showMessage("Saving your skill...", "success");

  try {
    const { data, error } = await supabaseClient
      .from("skills")
      .insert({
        student_name: student,
        skill_name: name,
        category,
        skill_type: type
      })
      .select("id, student_name, skill_name, category, skill_type, created_at")
      .single();

    if (error) {
      throw error;
    }

    skills.unshift(formatSkill(data));

    skillForm.reset();
    categoryFilter.value = "All";
    searchInput.value = "";
    renderSkills();

    showMessage("Skill saved successfully to Supabase!", "success");
  } catch (error) {
    console.error("Could not save skill:", error);
    showMessage(
      "Could not save the skill. Check your connection and Supabase settings, then try again.",
      "error"
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
});

// Start the application.
async function startApp() {
  renderSkills();

  try {
    await loadSkills();
  } catch (error) {
    console.error("Could not load skills from Supabase:", error);
    showMessage(
      "Could not connect to Supabase. Check your project URL, key, and database policies.",
      "error"
    );
  }
}

startApp();
