<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
  #app{
      width:100%;
      height:900px;
      background: -webkit-gradient(linear, center top, center bottom, from(rgba(139, 190, 214, 0.507)), to(rgb(112, 111, 111)));
      margin:90px auto 0;
    }
</style>
