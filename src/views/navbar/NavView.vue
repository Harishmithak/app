<template>
  <div>
    <nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container">
          <img
            src="data:image/png;base64,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"
            alt="Logo" class="navbar-logo">
          <router-link to="" class="navbar-brand">NOZTI</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link"><i class="fa-solid fa-house"></i></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">About</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/ag" class="nav-link">AgGrid</router-link>
              </li>

              <li @click="goToShoppingCart()" class="nav-item">
                <router-link to="" class="nav-link">Tasks </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/signin" class="nav-link">login </router-link>
              </li>
              <li @click="handleLogout()" class="nav-item">
                <router-link to="" class="nav-link">logout </router-link>
              </li>

              <div v-if="isLoggedIn && userType === 'admin'">
                <router-link class="nav-link" id="admin" to="/admin">ADMIN</router-link>
              </div>

              <div v-if="isLoggedIn && userType === 'user'" id="user1">

                <li class="nav-item">

                  <router-link to="" class="nav-link " id="welcome-text">Welcome, {{ userName }}</router-link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </nav>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  computed: {

    ...mapState(['isLoggedIn', 'userType', 'user']),
    ...mapGetters(['userName']),
  },
  methods: {

    ...mapActions(['logout']),
    handleLogout() {

      this.logout()
        .then(() => {

          this.$router.push('/signin');
        })
        .catch(error => {
          console.error('Logout error:', error);

        });
    },


    goToShoppingCart() {
      this.$router.push('/shop');
    }

  }
}
</script>
<style>
.navbar-logo {
  height: 40px;
  width: 50px;
  ;
}

#user1 #welcome-text {
  color: rgb(182, 233, 166);
  font-size: 18px;
  font-weight: bold;
  margin-left: 300px;
  display: inline-block;
  border: 2px solid rgb(182, 233, 166);
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

#user1 #welcome-text:hover {
  background-color: rgb(182, 233, 166);
  color: white;
}
</style>