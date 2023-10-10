
addTask=()=>{
    const input=$("#toDoInput").val();
    

    if(input !=''){// checks if input is empty

        const taskItem=`
        <div class="task mt-2">
        <li class="list-group-item d-flex justify-content-between  align-items-center">
        <span>
            <input class="form-check-input me-1" type="checkbox" value=""  />
        </span>
        <span class="text">
           ${input}
        </span>
        <span>
            <button type="button" class="btn-close" aria-label="Close"></button>
        </span>
        </li> 
    </div>

    `;


    $("#task-group").append(taskItem);//add taskItem into task-group
    
    // Save the tasks to local storage
    saveTasksToLocalStorage();
        

    $("#toDoInput").val("");// Clears input after insert

}
}



$("#addBtn").click(function (e) { 

      addTask();

    e.preventDefault();
    
    
});

$(document).keypress (function () { //For Enter button
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){//Enter button keycode
        addTask();
        }
  
});







 $("#task-group").on("click", ".btn-close", function() {
    $(this).closest('.task').remove(); // Remove the parent element with class 'task'
});


$(document).on('change', '.form-check-input', function() {//for line on text
    const isChecked = $(this).is(':checked');
    const textElement = $(this).closest('.task').find('.text');

    if (isChecked) {
        textElement.css('text-decoration', 'line-through');
    } else {
        textElement.css('text-decoration', 'none');
    }

      // Save the tasks to local storage whenever a checkbox is changed
      saveTasksToLocalStorage();

});



// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
    const tasks = $("#task-group").html();
    localStorage.setItem('tasks', tasks);
}

// Load tasks from local storage when the page is loaded
const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        $("#task-group").html(tasks);
    }
}

// Load tasks from local storage on page load
$(document).ready(() => {
    loadTasksFromLocalStorage();
});

