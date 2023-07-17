

<!-- task page -->
 
<template>
  <div class="container mb-3" style="padding: 0">
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
            <li>TASK: {{ task.title }}</li>
            <!-- <button class="btn" id="edit" @click="editTask(task)"><i class="fa-solid fa-edit"></i></button> -->
            <button class="btn" id="remove" @click="removeTask(task.id)"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>

    </div>
    <div>

    </div>
  </div>
</template>

 <script>
import { ref, onMounted } from 'vue';

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
    });

    onMounted(fetchData);

    function fetchData() {
      fetch('http://localhost:3000/task')
        .then((response) => response.json())
        .then((data) => {
          taskindex.value = data;
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
      };
    }
    function addTask() {
      if (newTask.value.title && newTask.value.duedate) {
        const taskData = {
          title: newTask.value.title,
          duedate: newTask.value.duedate,
          startdate: newTask.value.startdate,
          status: newTask.value.status,
        };

        fetch('http://localhost:3000/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        })
          .then((response) => response.json())
          .then((data) => {
            taskindex.value.push(data);
          })
          .catch((error) => {
            console.error('Error adding task:', error);
          });

        closeAddTaskModal();
      }
    }

    function removeTask(taskId) {
      fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
      })
        .then(() => {
          taskindex.value = taskindex.value.filter((task) => task.id !== taskId);
        })
        .catch((error) => {
          console.error('Error removing task:', error);
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
  background-color:red;
  color: white;
  margin-top: 60px;
  margin-left: 450px;
}


</style>
  
  