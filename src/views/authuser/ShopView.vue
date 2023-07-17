
<template>

 
    <div class="container mb-3" style="padding: 0">
      <h1 style="color: black; margin-top: 20px" class="blogs text-center">Tasks</h1>
      <div class="text-center mt-3">
    <button @click="sortTasks('dueDate')">Sort by end Date</button>
    <button @click="sortTasks('status')">Sort by Status</button>
    <button @click="sortTasks('startDate')">Sort by Start Date</button>
  </div>
      <div class="row">
        <div v-for="task in taskindex" :key="task.id" class="col-md-12">
       <router-link to="/task">  <div class="cards">
            <div class="card-body text-center">
              <li id="task">TASK: {{ task.title }}</li>  
              <button @click="showStatusUpdateModal(task)" id="update"><i class="fa-solid fa-pen-to-square"></i></button>
            </div> 
          </div></router-link> 
        </div>
      </div>
    </div>

</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'TaskView',
  data() {
    return {
      taskindex: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {

    fetchData() {
   
      fetch('http://localhost:3000/task')
        .then((response) => response.json())
        .then((data) => {
          this.taskindex = data;
        });
    },

    showStatusUpdateModal(task) {
      const statusOptions = ['Completed', 'Not Completed','In progress'];

      Swal.fire({
        title: 'Update Task Status',
        input: 'select',
        inputOptions: statusOptions,
        inputPlaceholder: 'Select status',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedStatusIndex = result.value;
          const selectedStatus = statusOptions[selectedStatusIndex];
          const updatedTask = { ...task, status: selectedStatus };

          fetch(`http://localhost:3000/task/${task.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 'success') {
                const updatedTaskIndex = this.taskindex.map((t) =>
                  t.id === task.id ? { ...t, status: selectedStatus } : t
                );
                this.taskindex = updatedTaskIndex;
              }
            })
            .catch((error) => {

              console.error('Error updating task status:', error);
            });
        }
      });
    },
    sortTasks(criteria) {
      switch (criteria) {
        case 'dueDate':
          this.taskindex.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
          break;
        case 'status':
          this.taskindex.sort((a, b) => a.status.localeCompare(b.status));
          break;
        case 'startDate':
          this.taskindex.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
          break;
        default:
          break;
      }
    },




  }
}
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

#update {
  background-color:grey;
  color: white;
  margin-top: 50px;
}
#task{
  color: white;
  text-decoration: none;
}
</style>

  