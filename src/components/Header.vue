<template>
  <header>
    <div class="logo-container">
      <router-link to="/"><span class="logo">R</span></router-link>
    </div>
    <nav id="nav">
      <router-link to="/types">Types</router-link>
      <router-link to="/resources">Resources</router-link>
    </nav>
    <div class="user-container">
      <router-link to="/settings">
        <span>Username</span>
      </router-link>
      <router-link to="/settings">
        <img src="https://dummyimage.com/100/616161/616161.jpg" />
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}

</script>

<style lang="less">
@import "../colors";

header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    padding: @spacing;
  }

  a {
    text-decoration: none;
    color: @primary;
  }

  .logo-container,
  .user-container {
    width: 150px;
    max-width: 100%;
  }

  .logo-container {
    text-align: left;
  }

  .logo {
    width: 100px;
    max-width: 100%;
    font-size: 35px;
    color: @primary;
  }

  nav {
    width: 900px;
    box-sizing: border-box;
    max-width: 100%;
    text-align: left;
    justify-self: center;

    a {
      padding-right: 30px;
      font-weight: bold;
      color: @primary;
      font-size: 18px;
      &.router-link-active {
        color: @accent;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
      padding-right: 10px;
    }

    img {
      width: 40px;
      border-radius: 50%;
    }
  }
}

</style>
