<template>
  <header>
    <div class="logo-container">
      <router-link to="/"><img alt="self-Logo" class="logo" src="/rembrandt_r_white.svg" /></router-link>
    </div>
    <nav id="nav">
      <router-link to="/resources">Resources</router-link>
      <router-link to="/types">Types</router-link>
    </nav>
    <div class="user-container">
      <router-link to="/settings">
        <span>Christian</span>
      </router-link>
      <router-link to="/settings">
        <img src="https://avatars2.githubusercontent.com/u/17351844?s=460&v=4" />
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
  position: fixed;
  z-index: 1;

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
    width: 45px;
    max-width: 100%;
  }

  nav {
    width: 900px;
    box-sizing: border-box;
    max-width: 100%;
    text-align: left;
    justify-self: center;

    a {
      padding-right: @spacing * 1.5;
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
      font-weight: bold;
    }

    img {
      width: 40px;
      border-radius: 7px;
    }
  }
}

</style>
