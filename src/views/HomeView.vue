<template>
  <div><img src="../assets/task-management.webp" alt="home" class="home"></div>

  <div id="manage">
    <h1>MANAGE YOUR TASK</h1>
  </div>
  <div>
    <router-link to="/about">
      <button class="btn n1">
        About us
      </button></router-link>
  </div>
</template>


<style>
.home {
  width: 900px;
  height: 400px;
  margin-left: 280px;
  margin-top: 100px;
  position: relative;
}

#manage {
  position: absolute;
  margin-top: -400px;
  margin-left: 550px;
  font-family: cursive;

}

.n1 {
  background-color: aqua;
  margin-left: 680px;
  margin-top: 30px;
  padding-bottom: 10px;
}
</style>
