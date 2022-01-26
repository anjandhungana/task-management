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
const checkbox = document.querySelector("i.checkbox");

let addClasses = "";

let userTasks = [];
let completedTasks = [];

let id = 1;
let taskid = 1;
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
         <div class="urgency-blob" style="background-color:${element.color}"></div>
         <p style='font-weight:100;'>${element.name}</p>
 </div>`
    )
    .join("");
};

const viewTaskSummary = () => {
  let taskCount = userTasks.length;
  let completedTaskCount = completedTasks.length;
  let percentageCount = (completedTaskCount / taskCount) * 100;
  if (taskCount == 0) {
    taskSummary.innerHTML = "<h2>No Tasks</h2>";
  } else {
    if (completedTaskCount > 0) {
      taskSummary.innerHTML = `<h1>${Math.round(percentageCount)}%</h1>
      <h4 class="text-center">tasks completed</h4>
      <h5>total tasks: ${taskCount}</h5>
      <h5>completed: ${completedTaskCount}</h5>`;
    } else {
      taskSummary.innerHTML = `<h1>NO</h1>
    <h4 class="text-center">tasks completed</h4>
    <h5>total tasks: ${taskCount}</h5>
    <h5>completed: ${completedTaskCount}</h5>`;
    }
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

const viewTasks = () => {
  taskArea.innerHTML = userTasks.map(
    (
      element
    ) => `<div class="task-detail-card container card my-3" style="width:25%" draggable="true">
  <div class="card-body">
    <h4 class="card-title text-uppercase">${element.taskName}</h4>
    <p class="subtitle font-weight-light">${element.taskDesc}</p>
    <span>Assigned to: ${element.taskUser} | Priority: High</span>
  </div>
  <div class='task-detail-card-color' style='background-color:${element.activeBlobColor}'></div>
  <i class='far fa-square checkbox unchecked' onclick="toggleCheckbox(${element.taskid})"></i>
</div>`
  );
};

let taskStatus = false;

const clickAssignBtn = () => {
  const activeBlobColor = document.querySelector(
    ".urgency-child.active .urgency-blob"
  ).style.backgroundColor;
  userTasks.push({
    taskid: taskid,
    taskName: newTask.value,
    taskDesc: newDesc.value,
    taskUser: selectUsers.value,
    activeBlobColor: activeBlobColor,
    taskStatus: taskStatus,
  });
  // console.log(userTasks);
  taskid++;
  viewTaskSummary();

  viewTasks();
  clearTaskForm();
};

const clearTaskForm = () => {
  newTask.value = "";
  newDesc.value = "";
  document.querySelector(".urgency-child.active").classList.remove("active");
};

const toggleCheckbox = (val) => {
  userTasks.forEach((element) => {
    if (val == element.taskid) {
      if(element.taskStatus==false){
        element.taskStatus = true;
      }
      else{
        element.taskStatus=false;
      }
    }
  });
  completedTasks = userTasks.filter((value) => (value.taskStatus == true));
  viewTaskSummary();

  console.log(completedTasks);
};
