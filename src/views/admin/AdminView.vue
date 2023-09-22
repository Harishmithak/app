
<!-- task page -->
 
<template>
  <div class="container mb-3 admin" style="padding: 0">
    <h1 style="color: black; margin-top: 20px" class="blogs text-center">Tasks</h1>
    <button type="button" class="btn btn-primary mt-3" id="addtask" data-bs-toggle="modal" data-bs-target="#addTaskModal"
      @click="showAddTaskModal"><i class="fa-regular fa-square-plus"></i></button>
    <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTaskModalLabel">Add New Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="taskTitle" class="form-label">taskTitle</label>
              <input type="text" class="form-control" id="taskTitle" v-model="newTask.title">
            </div>
            <div class="form-group">
              <label for="taskTitle" class="form-label">status</label>
              <input type="text" class="form-control" id="taskTitle" v-model="newTask.status">
            </div>
            <div class="form-group">
              <label for="taskDueDate" class="form-label">End Date</label>
              <input type="date" class="form-control" id="taskDueDate" v-model="newTask.duedate">
            </div>
            <div class="form-group">
              <label for="taskTitle" class="form-label">Assigned to</label>
              <input type="text" class="form-control" id="taskTitle" v-model="newTask.assigned">
            </div>

            <div class="form-group">
              <label for="taskDueDate" class="form-label">start Date</label>
              <input type="date" class="form-control" id="taskDueDate" v-model="newTask.startdate">
            </div>
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary" @click="addTask">Add</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="task in taskindex" :key="task.id" class="col-md-12">
        <div class="cards">
          <div class="card-body text-center">
            <li>TASK: {{ task.title }}
              <button class="btn" id="remove" @click="removeTask(task.id)"><i class="fa-solid fa-trash-can"></i></button>
            </li>
            <button class="btn" @click="editTask(task.id)" id="edit"><i class="fa-solid fa-pencil"></i></button>
          </div>
        </div>
      </div>

    </div>
    <div>
    </div>
  </div>
</template>

<!-- <script>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'TaskView',
  setup() {
    const taskindex = ref([]);
    const isAddTaskModalOpen = ref(false);
    const newTask = ref({
      title: '',
      duedate: '',
      startdate: '',
      status: '',
      assigned: '',
    });

    onMounted(fetchData);

    function fetchData() {
      axios.get('http://127.0.0.1:8000/api/tasks')
        .then((response) => {
          taskindex.value = response.data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    function showAddTaskModal() {
      isAddTaskModalOpen.value = true;
    }

    function closeAddTaskModal() {
      isAddTaskModalOpen.value = false;
      newTask.value = {
        title: '',
        duedate: '',
        startdate: '',
        status: '',
        assigned: '',
      };
    }

    function addTask() {
      if (newTask.value.title && newTask.value.duedate) {
        const taskData = {
          title: newTask.value.title,
          duedate: newTask.value.duedate,
          startdate: newTask.value.startdate,
          status: newTask.value.status,
          assigned: newTask.value.assigned,
        };

        axios.post('http://127.0.0.1:8000/api/tasks', taskData)
          .then((response) => {
            taskindex.value.push(response.data);
          })
          .catch((error) => {
            console.error('Error adding task:', error);
          });

        closeAddTaskModal();
      }
    }

    function removeTask(taskId) {
      axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}`)
        .then(() => {
          taskindex.value = taskindex.value.filter((task) => task.id !== taskId);
        })
        .catch((error) => {
          console.error('Error removing task:', error);
        });
    }
    
    function editTask(taskId) {
      const taskToEdit = taskindex.value.find((task) => task.id === taskId);

      Swal.fire({
        title: 'Edit Task',
        html: `
      <label for="editTaskTitle">Title:</label>
      <input type="text" id="editTaskTitle" value="${taskToEdit.title}" required>
      <br>
      <label for="editTaskStatus">Status:</label>
      <input type="text" id="editTaskStatus" value="${taskToEdit.status}">
      <br>
      <label for="editTaskDueDate">End Date:</label>
      <input type="date" id="editTaskDueDate" value="${taskToEdit.duedate}">
      <br>
      <label for="editTaskStartDate">Start Date:</label>
      <input type="date" id="editTaskStartDate" value="${taskToEdit.startdate}">
      <br>

      <label for="editTaskAssigned">assigned to :</label>
      <input type="text" id="editTaskAssigned" value="${taskToEdit.assigned}">
    `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const updatedTitle = document.getElementById('editTaskTitle').value;
          const updatedStatus = document.getElementById('editTaskStatus').value;
          const updatedDueDate = document.getElementById('editTaskDueDate').value;
          const updatedStartDate = document.getElementById('editTaskStartDate').value;
          const updatedAssigned = document.getElementById('editTaskAssigned').value;


          return {
            title: updatedTitle.trim(),
            status: updatedStatus.trim(),
            duedate: updatedDueDate.trim(),
            startdate: updatedStartDate.trim(),
            assigned: updatedAssigned.trim(),
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTask = result.value;
          if (updatedTask.title !== '') {
            taskToEdit.title = updatedTask.title.trim();
            taskToEdit.status = updatedTask.status.trim();
            taskToEdit.duedate = updatedTask.duedate.trim();
            taskToEdit.startdate = updatedTask.startdate.trim();
            taskToEdit.assigned = updatedTask.assigned.trim();

            axios
              .put(`http://127.0.0.1:8000/api/tasks/${task.id}`, taskToEdit)
              .then(() => {
                Swal.fire('Task updated successfully!', '', 'success');
              })
              .catch((error) => {
                console.error('Error updating task:', error);
                Swal.fire('Error updating task!', 'Please try again later.', 'error');
              });
          } else {
            Swal.fire('Task title cannot be empty!', '', 'error');
          }
        }
      });
    }


    return {
      taskindex,
      isAddTaskModalOpen,
      newTask,
      showAddTaskModal,
      closeAddTaskModal,
      addTask,
      removeTask,
      editTask,


    };
  },
};
</script>  -->
<script>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'TaskView',
  setup() {
    const taskindex = ref([]);
    const isAddTaskModalOpen = ref(false);
    const newTask = ref({
      title: '',
      duedate: '',
      startdate: '',
      status: '',
      assigned: '',
    });

    onMounted(fetchData);

    function fetchData() {
      axios.get('http://127.0.0.1:8000/api/tasks')
        .then((response) => {
          taskindex.value = response.data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    function showAddTaskModal() {
      isAddTaskModalOpen.value = true;
    }

    function closeAddTaskModal() {
      isAddTaskModalOpen.value = false;
      newTask.value = {
        title: '',
        duedate: '',
        startdate: '',
        status: '',
        assigned: '',
      };
    }

    function addTask() {
      if (newTask.value.title && newTask.value.duedate) {
        const taskData = {
          title: newTask.value.title,
          duedate: newTask.value.duedate,
          startdate: newTask.value.startdate,
          status: newTask.value.status,
          assigned: newTask.value.assigned,
        };

        axios.post('http://127.0.0.1:8000/api/tasks', taskData)
          .then((response) => {
            taskindex.value.push(response.data);
          })
          .catch((error) => {
            console.error('Error adding task:', error);
          });

        closeAddTaskModal();
      }
    }

    function removeTask(taskId) {
      axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`)
        .then(() => {
          taskindex.value = taskindex.value.filter((task) => task.id !== taskId);
        })
        .catch((error) => {
          console.error('Error removing task:', error);
        });
    }
    
    function editTask(taskId) {
      const taskToEdit = taskindex.value.find((task) => task.id === taskId);

      Swal.fire({
        title: 'Edit Task',
        html: `
      <label for="editTaskTitle">Title:</label>
      <input type="text" id="editTaskTitle" value="${taskToEdit.title}" required>
      <br>
      <label for="editTaskStatus">Status:</label>
      <input type="text" id="editTaskStatus" value="${taskToEdit.status}">
      <br>
      <label for="editTaskDueDate">End Date:</label>
      <input type="date" id="editTaskDueDate" value="${taskToEdit.duedate}">
      <br>
      <label for="editTaskStartDate">Start Date:</label>
      <input type="date" id="editTaskStartDate" value="${taskToEdit.startdate}">
      <br>

      <label for="editTaskAssigned">assigned to :</label>
      <input type="text" id="editTaskAssigned" value="${taskToEdit.assigned}">
    `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const updatedTitle = document.getElementById('editTaskTitle').value;
          const updatedStatus = document.getElementById('editTaskStatus').value;
          const updatedDueDate = document.getElementById('editTaskDueDate').value;
          const updatedStartDate = document.getElementById('editTaskStartDate').value;
          const updatedAssigned = document.getElementById('editTaskAssigned').value;


          return {
            title: updatedTitle.trim(),
            status: updatedStatus.trim(),
            duedate: updatedDueDate.trim(),
            startdate: updatedStartDate.trim(),
            assigned: updatedAssigned.trim(),
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTask = result.value;
          if (updatedTask.title !== '') {
            taskToEdit.title = updatedTask.title.trim();
            taskToEdit.status = updatedTask.status.trim();
            taskToEdit.duedate = updatedTask.duedate.trim();
            taskToEdit.startdate = updatedTask.startdate.trim();
            taskToEdit.assigned = updatedTask.assigned.trim();

            axios
              .put(`http://127.0.0.1:8000/api/tasks/${taskId}`, taskToEdit)
              .then(() => {
                Swal.fire('Task updated successfully!', '', 'success');
              })
              .catch((error) => {
                console.error('Error updating task:', error);
                Swal.fire('Error updating task!', 'Please try again later.', 'error');
              });
          } else {
            Swal.fire('Task title cannot be empty!', '', 'error');
          }
        }
      });
    }

    return {
      taskindex,
      isAddTaskModalOpen,
      newTask,
      showAddTaskModal,
      closeAddTaskModal,
      addTask,
      removeTask,
      editTask,
    };
  },
};
</script>


<style scoped>
.cards {

  background-color: rgb(17, 16, 16);
  margin-left: -50px;
  padding-left: 23px;
  width: 565px;
  color: white;
  margin-top: 50px;
  height: 100px;
  display: inline-flex;
  box-shadow: 1px 2px 4px rgb(165, 162, 162);

}


.blogs {
  color: black;
  font-weight: 700;
  font-family: logo;
}

#addtask {
  background-color: green;
  color: white;
}

#remove {
  background-color: red;
  color: white;
  margin-top: 40px;
  margin-left: 450px;
}

#edit {
  background-color: grey;
  color: white;
  margin-top: -60px;
  margin-left: -500px;
}
</style>
  
  