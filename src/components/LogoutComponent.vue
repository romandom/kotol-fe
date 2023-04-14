<template>
  <div>
    <h1>Welcome, {{ user.username }}!</h1>
    <button @click="logout">Logout</button>
    <!-- Protected content here -->
  </div>
</template>

<script>
export default {
  name: "LogoutComponent",
  methods: {
    logout() {
      // Remove authentication token from local storage
      localStorage.removeItem('authToken')

      // Redirect to the login page
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>