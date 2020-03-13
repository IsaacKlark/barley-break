<template>
  <div id="app">
    <BarleyBreak />
  </div>
</template>

<script>
import BarleyBreak from './components/barley-break';

export default {
  name: 'App',
  components: {
    BarleyBreak,
  }
}
</script>

<style>
body {
  background-image: url(https://on-desktop.com/ru/images/wp.php?path=/wps/Backgrounds_Pi__background_figures_104148_.jpg&wp=9);
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #207a49;
  margin-top: 20px;
}
</style>
