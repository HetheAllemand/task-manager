var importantIcon = "fa-regular fa-thumbs-up important";
var nonImportant = "fa-regular fa-thumbs-down";
var isImportant = false;

function toggleImportant(){

    if (isImportant){
        // change to non important
        $("#iImportant")
            .removeClass(importantIcon)
            .addClass(nonImportant);
        isImportant = false;
    }
    else {
        // change to important
        $("#iImportant")
            .removeClass(nonImportant)
            .addClass(importantIcon);
        isImportant = true;
    }
}

function toggleForm(){
    console.log("Button Clicked!");

    $(".form-container").toggle();
}

function saveTask(){
    console.log("Saving task");
    let title = $("#txtTitle").val(); // read the text from the control
    let description = $("#txtDescription").val(); 
    let duedate = $("#selDueDate").val(); 
    let category = $("#selCategory").val(); 
    let contact = $("#txtContact").val(); 
    let status = $("#selStatus").val(); 

    let task = new Task(title, description, duedate, category, contact, status, isImportant);
    
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/JSON",
        success: function(res) {
            console.log(res);

            displayTask(task);
        },
        error: function(error) {
            console.log(error);

            alert("Unexpected Error");
        }
    });

    
}

function displayTask(task) {
    let syntax = `<div class="task">
    <div class="col1">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
    </div>

    <div class="col2">
        <label>${task.dueDate}</label>
        <label>${task.category}</label>
    </div>

    <div class="col3">
        <label>${task.status}</label>
        <label>${task.contact}</label>
    </div>

    </div>`;
    
    $(".list-container").append(syntax);

}

function testRequest() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/",
        success: function(response) {
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

function loadTasks() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(res){
            let data = JSON.parse(res);
            console.log(res);
            for(let i=0; i<data.length; i++){
                let task = data[i];
                if(task.contact == "Hethe") {
                displayTask(task);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}



function init(){
    console.log("Task Manager");

    //loads data
    loadTasks();

    //assigns events
    $("#iImportant").click(toggleImportant);
    $("#btnToggleForm").click(toggleForm);
    $("#btnSave").click(saveTask);
}



window.onload = init;



/**
 * 
 * 1 create the button
 * 2 assign and id
 * 
 * 3 on js
 * 4 catch the click event on that button
 * 5 call a function
 * 6 create the function (toggleForm)
 * 7 console log "button clicked!"
 *
 */