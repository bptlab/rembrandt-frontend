<template>
  <div id="app">
    <Header />
    <router-view />
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
export default class Home extends Vue { }
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
  max-width: 100vw;
  min-height: 100vh;
}

body {
  background-color: @primary-bg;
}

main {
  margin-top: 85px;
  box-sizing: border-box;
  flex-grow: 1;
  text-align: left;
  position: relative;
}

main,
.wrapper {
  box-sizing: border-box;
  padding: 0px @spacing;
  max-width: 900px;
  width: 100%;
}

.wrapper {
  align-self: center;
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
