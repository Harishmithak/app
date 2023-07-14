
<!-- sign in page  -->

<template>
    <div class="container" id="cont">
      <div class="row">
        <div class="col-12 py-5 shadow mb-5 my-custom-shadow">
          <h2 class="ms-5 mb-3" style="color: #978F8F; font-size: 27px;">Login with Nozti</h2>
          <form class="login-form" @submit="submitForm">
            <div class="form-group">
              <input v-model="username" class="w-100" type="text" placeholder="Username" />
            </div>
            <div class="form-group ms-1 pt-3">
              <input v-model="password" class="w-100" type="password" placeholder="Password" />
            </div>
            <div class="form-group ms-1 pt-3">
  
              <select v-model="userType"  class=" w-100 form-select">
  
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button class="bg-black text-white btn-size" type="submit">Login</button>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <p class="mt-3 text-center" style="font-size: 13px; color: #978F8F;">
                Doesn't have an account?
                <router-link to="/register" class="text-black w-25">Register</router-link>
              </p>
            </div>
            <p v-if="errorMessage" class="mt-3 text-center" style="font-size: 13px; color: red;">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
  
  
  
  
  
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
//   import Swal from 'sweetalert2';
  import { mapActions } from 'vuex';
  
  export default {
    name: 'loginView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        userType: 'user'
        
      };
    },
    methods: {
      ...mapActions(['login']),
      submitForm(event) {
        // Swal.fire('login successfull');
        event.preventDefault();
  
        axios
          .get('http://localhost:3000/register')
          .then(response => {
            const users = response.data;
  
            const user = users.find(user => user.email === this.username);
  
            if (user) {
              if (user.password === this.password ){
  
        // this.login()
        this.login(this.userType)
          .then(() => {
            
            // Swal.fire('login successfull as user');
  
            if (this.userType==='user' && user.userType==='user' ) {
            this.$router.push('/shop');
          }
          else if(this.userType==='admin' && user.userType==='admin' ) {
            // Swal.fire('login successfull as user');
   
                      this.$router.push('/about');
                    }
        
          })}
          
        }
     
        })}
  
  }}
  </script>
  
  
  
  <style>
  .container {
    max-width: 500px;
  }
  </style>