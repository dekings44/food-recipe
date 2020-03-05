<template>
  <div class="navbar">
    <nav class="nav-extended red darken-1">
      <div class="nav-content">
        <router-link :to="{name: 'Home'}">
          <span class="nav-title">Food Recipes</span>
        </router-link>
        <a href class="btn-floating btn-large halfway-fab blue">
          <router-link :to="{name: 'AddFoodRecipes'}">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>