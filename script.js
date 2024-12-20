const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `
    <div class="task">
      <input type="checkbox" class="task-check">
      <span class="taskname" contenteditable="false">${taskName}</span>
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="far fa-trash-alt"></i></button>
    </div>
  `;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  // Delete functionality
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      const taskElement = button.parentNode;
      const isChecked = taskElement.querySelector(".task-check").checked;
      if (!isChecked) {
        taskCount -= 1;
        displayCount(taskCount);
      }
      taskElement.remove();
    };
  });

  // Edit functionality
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      const taskElement = e.target.closest(".task");
      const taskSpan = taskElement.querySelector(".taskname");
      const editButton = taskElement.querySelector(".edit i");

      if (taskSpan.contentEditable === "false") {
        taskSpan.contentEditable = "true";
        taskSpan.focus();

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(taskSpan);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        editButton.classList.remove("fa-edit");
        editButton.classList.add("fa-save");
      } else {
        taskSpan.contentEditable = "false";

        editButton.classList.remove("fa-save");
        editButton.classList.add("fa-edit");
      }
    };
  });

  // Handle edit on Enter key and escape on Esc key
  const taskSpans = document.querySelectorAll(".taskname");
  taskSpans.forEach((span) => {
    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        span.contentEditable = "false";
        const editButton = span.parentNode.querySelector(".edit i");
        editButton.classList.remove("fa-save");
        editButton.classList.add("fa-edit");
      }
      if (e.key === "Escape") {
        span.contentEditable = "false";
        const editButton = span.parentNode.querySelector(".edit i");
        editButton.classList.remove("fa-save");
        editButton.classList.add("fa-edit");
      }
    });
  });

  // Checkbox
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

// keyboard support for adding tasks
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
