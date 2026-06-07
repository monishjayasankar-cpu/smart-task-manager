let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
let user = localStorage.getItem("user");

/* LOGIN */
function login() {
    let name = username.value;
    if (!name) return;

    localStorage.setItem("user", name);
    user = name;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    welcomeText.innerText = "Hi " + user + " 👋";

    renderAll();
    updateDashboard();
}

/* AUTO LOGIN */
if (user) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
    welcomeText.innerText = "Hi " + user + " 👋";
    renderAll();
    updateDashboard();
}

/* NAVIGATION */
function openPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("show"));
    document.getElementById(id).classList.add("show");
}

/* TASKS */
function addTask() {
    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = "";
    save();
    renderTasks();
    updateDashboard();
}

function renderTasks() {
    taskList.innerHTML = tasks.map((t, i) => `
        <div class="task ${t.done ? "done" : ""}">
            <span onclick="toggle(${i})">${t.text}</span>
            <button onclick="delTask(${i})">❌</button>
        </div>
    `).join("");
}

function toggle(i) {
    tasks[i].done = !tasks[i].done;
    if (tasks[i].done) confetti();
    save();
    renderTasks();
    updateDashboard();
}

function delTask(i) {
    tasks.splice(i, 1);
    save();
    renderTasks();
    updateDashboard();
}

/* GOALS */
function addGoal() {
    goals.push(goalInput.value);
    goalInput.value = "";
    save();
    renderGoals();
}

function renderGoals() {
    goalList.innerHTML = goals.map(g => `<div class="card">🎯 ${g}</div>`).join("");
}

/* REMINDERS */
function addReminder() {
    reminders.push(reminderInput.value);
    reminderInput.value = "";
    save();
    renderReminders();
}

function renderReminders() {
    reminderList.innerHTML = reminders.map(r => `<div class="card">⏰ ${r}</div>`).join("");
}

/* DASHBOARD */
function updateDashboard() {
    dashboard.innerHTML = `
        <h2>Dashboard</h2>
        <div class="card">👤 ${user}</div>
        <div class="card">📌 Total Tasks: ${tasks.length}</div>
        <div class="card">✅ Completed: ${tasks.filter(t => t.done).length}</div>
        <div class="card">⏳ Pending: ${tasks.filter(t => !t.done).length}</div>
        <div class="card">🎯 Goals: ${goals.length}</div>
        <div class="card">⏰ Reminders: ${reminders.length}</div>
    `;
}

/* SAVE */
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

/* CONFETTI */
function confetti() {
    for (let i = 0; i < 20; i++) {
        let c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = ["red","yellow","blue","green"][Math.floor(Math.random()*4)];
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2000);
    }
}

/* INIT */
function renderAll() {
    renderTasks();
    renderGoals();
    renderReminders();
}

renderAll();