
<!-- registration page  -->

<template>
  <div class="container2" id="cont" style="margin-bottom: 250px;">
    <div class="row">
      <div class="col-12 py-1 shadow mt-5">
        <h3 class="ms-4 pb-3" style="color: #978F8F;">Sign Up with Nozti</h3>
        <form class="registration-form" style="color: #978F8F;">
          <div class="form-group">
            <input type="text" v-model="formData.fname" class="form-control" placeholder="First name" required />

            <span v-if="vc$.fname.$error">{{ vc$.fname.$errors[0].$message }}</span>

          </div>

          <div class="form-group">
            <input type="text" v-model="formData.lname" class="form-control" placeholder="Last name" required />

            <span v-if="vc$.lname.$error">{{ vc$.lname.$errors[0].$message }}</span>

          </div>

          <div class="form-group">
            <input type="email" v-model="formData.email" class="form-control" placeholder="Email" required />

            <span v-if="vc$.email.$error">{{ vc$.email.$errors[0].$message }}</span>

          </div>

          <div class="form-group">
            <input type="password" v-model="formData.password" class="form-control" placeholder="Password" required />

            <span v-if="vc$.password.$error">{{ vc$.password.$errors[0].$message }} {{ formData.password }}</span>
          </div>


          <div class="form-group">
            <input type="password" v-model="formData.confirm" class="form-control" placeholder="Confirm password"
              required />

            <span v-if="vc$.confirm.$error">{{ vc$.confirm.$errors[0].$message }} {{ formData.confirm }}</span>

          </div>

          <div class="form-group">
            <label>
              <input type="radio" v-model="formData.userType" value="user" />
              User
            </label>
            <label>
              <input type="radio" v-model="formData.userType" value="admin" />
              Admin
            </label>

            <span v-if="vc$.userType.$error">{{ vc$.accountType.$errors[0].$message }}</span>

          </div>

          <button class="bg-black text-white" type="submit" @click="submitForm">Register</button>
          <p class="mt-3 text-center" style="font-size: 13px; color: #978F8F;">
            Already have an account?
            <router-link to="/signin" class="text-black w-25">Sign in</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
  
  
  
<script>

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'RegisterView',
  setup() {
    const formData = reactive({
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirm: '',
      userType: '',

    });


    const rules = computed(() => {
      return {

        fname: { required },
        lname: { required },
        email: { required, email },
        password: { required, minLength: minLength(6), maxLength: maxLength(10) },
        confirm: { required },
        userType: { required },
      };
    });

    const vc$ = useVuelidate(rules, formData);


    return {
      formData,
      vc$
    };


  },
  methods: {
    submitForm() {
      this.vc$.$validate();

      if (!this.vc$.$error && this.formData.password === this.formData.confirm) {
        axios.post('http://localhost:3000/register', this.formData) //posting the registration details to json 

          .then(response => {
            console.log(response.data);
            Swal.fire('Registered updated successfully!', '', 'success')

          })
          .catch(error => {
            console.error(error);
            alert('An error occurred while submitting the form');
          });
      } else {
        //   Swal.fire('Form validations failed');
      }
    }
  }
};
</script> 
  
  
  
  
  
<style scoped>
.container2 {
  max-width: 500px;
  margin: 0 auto;
}

.form-control {
  margin-bottom: 10px;
}

.invalid-feedback {
  color: red;
}
</style> 