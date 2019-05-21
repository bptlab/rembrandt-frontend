<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue'; // @ is an alias to /src

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {}
</script>

<style lang="less">
@import "colors";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  background-color: @primary-bg;
}

main {
  text-align: left;
  margin: 0px 30px;
  max-width: 900px;
  width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
a {
  margin: 0;
  color: @primary;
}

a {
  text-decoration: none;
}

.row {
  display: flex;
}

.row > * {
  flex-basis: 100%;
  margin-left: 15px;
  margin-right: 15px;
}
.row > *:first-child {
  margin-left: 0;
}

.row > *:last-child {
  margin-right: 0;
}
</style>
