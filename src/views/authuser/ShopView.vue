<!-- blogs page  -->
<template>
    <div class="container mb-3" style="padding: 0">
      <h1 style="color: black; margin-top: 20px" class=" blogs text-center">Tasks</h1>
      <div class="row">
        <div v-for="task in taskindex" :key="task.id" class="col-md-12">
         
            <div class="cards">
              <div class="card-body text-center">
               <li> TASK: {{ task.title }}</li>
               <li> DUE DATE : {{ task.duedate }}</li>
              </div>
            </div>
         
        </div>
      </div>
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
    },
    methods: {
      fetchData() {
        fetch('http://localhost:3000/task') //fetching TASK details from json
          .then((response) => response.json())
          .then((data) => {
            this.taskindex = data;
          });
      },
    },
  };
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
  </style>
  
  