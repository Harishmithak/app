<!-- task page  -->
<template>
    <div class="container " style="padding: 0">
      <h1 style="color: black; margin-top: 20px" class="blogs text-center">Tasks</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
       
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskindex" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.startdate }}</td>
            <td>{{ task.duedate }}</td>
            <td>{{ task.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
    
  <script>
  export default {
    name: 'TaskView',
    data() {
      return {
        taskindex: [],

       
      };
    },
    mounted() {
      this.fetchData();
      setInterval(() => {
      this.fetchData();
    }, 2000); 
    },
    methods: {
        fetchData() {

  fetch(`http://localhost:3000/task`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.taskindex = data;
    });
},

    
  
  
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
  
  #update {
    background-color: black;
    color: white;
    margin-top: 40px;
  }
  </style>