let input = document.querySelector(".input"),
submit  = document.querySelector(".add"),
tasks = document.querySelector(".tasks");

// Empty array
let arrayOfTasks = [];
// get tasks from local storge 
getDataFromLocalStorge();
// check local storge
if (window.localStorage.getItem("tasks")){
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

tasks.addEventListener("click", e => {
  if ( e.target.classList.contains("del")){
    // remove task from local storge 
    removeTaskFromLocalStorge(e.target.parentElement.getAttribute("data-id"));

    //  remove task from page
    e.target.parentElement.remove();

  }
}) 
submit.onclick = function () {
  if ( input.value !== ""){
    addTaskToArray (input.value);
    input.value = "";
  }
}

function addTaskToArray (taskText){
  // Task Data
  const task = {
    id : Date.now(),
    title: taskText ,
    completed: false ,
  }
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add tasks to page 
  addElementsToPageFrom(arrayOfTasks);
  // add tasks to local storge
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
  tasks.innerHTML= "";
  arrayOfTasks.forEach(element => {
    let div = document.createElement("div");
    let divChaild = document.createElement("div");
    div.classList="task";
    divChaild.classList= "input-task"
    div.setAttribute('data-id',element.id);
    divChaild.appendChild(document.createTextNode(element.title));
    div.appendChild(divChaild);
    if(element.completed){
      div.classList= " task done"; 
    }
    let span = document.createElement("span");
    span.className= "del"
    span.appendChild(document.createTextNode("Delete"))
    div.appendChild(span);
    tasks.appendChild(div);
    console.log(tasks);
    });
}
function addDataToLocalStorgeFrom (arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorge () {
  let data = window.localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}


function removeTaskFromLocalStorge (taskid) {
  arrayOfTasks= arrayOfTasks.filter((task) => task.id != taskid );
  console.log(arrayOfTasks);
  addDataToLocalStorgeFrom(arrayOfTasks);

}