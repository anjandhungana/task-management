const newTask = document.getElementById("new-task");
const newDesc = document.getElementById("new-task-desc");
const selectUsers = document.getElementById("select-users");
const assignBtn = document.getElementById("assign-btn");
const urgencyBlob = document.querySelectorAll(".urgency-blob");
const urgencyDiv = document.querySelector(".urgency");
const urgencyChild = document.querySelectorAll(".urgency-child");
const taskArea = document.querySelector(".task-area");
const userDropdown = document.getElementById("select-users");
const taskSummary = document.querySelector(".task-summary");

let addClasses = "";

let userTasks = [];

let id = 1;
let saturation = 20;

const labels = [
  {
    name: "High",
    color: "#FF7171",
  },
  {
    name: "Medium",
    color: "#69CC7E",
  },
  {
    name: "Low",
    color: "#F156FF",
  },
];

const userList = ["Ram", "Shyam", "Hari"];

labels.forEach((element) => {
  element.id = id;
  element.addClasses = addClasses;
  id++;
  element.saturation = saturation;
});

const viewLabels = () => {
  userDropdown.innerHTML = userList.map(
    (element) => `<option value="${element}">${element}</option>`
  );
  urgencyDiv.innerHTML = labels
    .map(
      (
        element
      ) => `<div class="urgency-child col d-flex flex-column align-items-center ${element.addClasses}" style = "filter:saturate(${element.saturation}%);"onclick = "clickLabel(${element.id})">
         <div class="urgency-blob" style="background-color:${element.color}; "></div>
         <p style='font-weight:100;'>${element.name}</p>
 </div>`
    )
    .join("");
};

const viewTaskSummary = () => {
  let taskCount = userTasks.length;

  if (taskCount == 0) {
    taskSummary.innerHTML = "<h2>No Tasks</h2>";
  } else {
    taskSummary.innerHTML = `<h1>X%</h1>
    <h4 class="text-center">tasks completed</h4>
    <h5>total tasks: ${taskCount}</h5>
    <h5>completed: y</h5>`;
  }
};

document.addEventListener("load", viewLabels(), viewTaskSummary());

const clickLabel = (id) => {
  labels.forEach((element) => {
    element.addClasses = "";
    element.saturation = saturation;
    if (element.id == id) {
      element.saturation = 100;
      element.addClasses = "active";
    }

    viewLabels();
    viewTaskSummary();
  });
};

const clickAssignBtn = () => {
  const activeBlobColor = document.querySelector(
    ".urgency-child.active .urgency-blob"
  ).style.backgroundColor;
  userTasks.push({
    taskName: newTask.value,
    taskDesc: newDesc.value,
    taskUser: selectUsers.value,
    activeBlobColor: activeBlobColor,
  });
  viewTaskSummary();

  taskArea.innerHTML = userTasks.map(
    (element) => `<div class="task-detail-card container card w-50">
  <div class="card-body">
    <h4 class="card-title text-uppercase">${element.taskName}</h4>
    <p class="subtitle font-weight-light">${element.taskDesc}</p>
    <span>Assigned to: ${element.taskUser} | Priority: High</span>
  </div>
  <div class='task-detail-card-color' style='background-color:${element.activeBlobColor}'></div>
  <i class='far fa-square checkbox unchecked'></i>
</div>`
  );
  clearTaskForm();
};

const clearTaskForm = () => {
  newTask.value = "";
  newDesc.value = "";
  document.querySelector(".urgency-child.active").forEach((element)=>{
    element.classList.remove('active');
  });
};
