<!-- task page -->
  <template>

    <div class="container mb-3" style="padding: 0">
      <h1 style="color: black; margin-top: 20px" class="blogs text-center">Tasks</h1>


      <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addTaskModal" id="addtask">
          Add Task
        </button>
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
                  <label for="taskDueDate" class="form-label">Due Date</label>
                  <input type="date" class="form-control" id="taskDueDate" v-model="newTask.duedate">
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
              <li>DUE DATE: {{ task.duedate }}</li>
              <button class="btn" id="remove" @click="removeTask(task.id)">Remove</button>
              <!-- <button class="btn" id="edit" @click="editTask(task)">Edit</button> -->


            </div>
          </div>
        </div>
      </div>



      <div>
     
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskView',
    data() {
      return {
        taskindex: [],
        isAddTaskModalOpen: false,
      newTask: {
        title: '',
        duedate: '',
      },
   
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        fetch('http://localhost:3000/task') //fetching TASK details from json
          .then((response) => response.json())
          .then((data) => {
            this.taskindex = data;
          });
      },
      showAddTaskModal() {
      this.isAddTaskModalOpen = true;
    },
    closeAddTaskModal() {
      this.isAddTaskModalOpen = false;
      this.newTask = {
        title: '',
        duedate: '',
      };
    },
    addTask() {

  if (this.newTask.title && this.newTask.duedate) {

    const newTask = {
      title: this.newTask.title,
      duedate: this.newTask.duedate,
    };


    fetch('http://localhost:3000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {

        this.taskindex.push(data);
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });


    this.closeAddTaskModal();
  }
    },
    removeTask(taskId) {
      fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.taskindex = this.taskindex.filter((task) => task.id !== taskId);
        })
        .catch((error) => {
          console.error('Error removing task:', error);
        });
    },


  },

}

 
  </script>
  
  <style scoped>
  .cards {
  
    background-color: rgb(17, 16, 16);
    margin-left:-50px;
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

  #addtask{
    background-color: black;
    color: white;
  }
  #remove{
    background-color: black;
    color: white;
    margin-top: 40px;
margin-left: 450px;
  }
  </style>
  
  