<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/archive">Archive</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { useStore } from 'vuex';
export default {
  beforeCreate() {
    const store = useStore();
    store.commit('loadStore');
  },
};
</script>

<style>
#app {
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 5px 10px #5251d57a;
}

h1 {
  font-weight: 900;
  font-size: 2rem;
  margin: 3rem 0 2rem 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 1rem 0 0;
  background: #eee;
  border-radius: 14px;
  text-decoration: none;
  padding: 0.25rem 0.75rem;
}

#nav a:hover {
  background: #5251d5;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  background: #8180f9;
  color: #ffffff;
}

input[type='submit'] {
  background: #8180f9;
  color: white;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 5px 10px #5251d57a;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.25s ease-out;
  cursor: pointer;
}

input[type='checkbox'] {
  width: auto;
  margin: 0 0.5rem 0 0;
}

input[type='submit']:hover {
  background: #5251d5;
  box-shadow: 0 3px 7px #5251d57a;
}

input {
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
