<template>
  <header class="header">
    <div class="logo-container">
      <router-link :to="{ name: 'home' }"><img alt="self-Logo" class="logo" src="/rembrandt_r_white.svg" /></router-link>
    </div>
    <nav id="nav" v-if="this.$route.path.startsWith('/organization')">
      <router-link :to="{ name: 'resources' }">Resources</router-link>
      <router-link :to="{ name: 'types' }">Types</router-link>
    </nav>
    <nav id="nav" v-else-if="this.$route.path.startsWith('/optimization')">
      <router-link :to="{ name: 'algorithms' }">Algorithms</router-link>
      <router-link :to="{ name: 'transformers' }">Transformers</router-link>
    </nav>
    <div class="user-container">
      <Link class="notification-button" :linkOptions="{ onClick: toggleNotificationCenter }">
        <i class="far fa-bell"></i>
      </Link>
      <div class="menu-button">
        <span class="burger-menu" @click="toggleMenu()">
          <span></span>
        </span>
      </div>
    </div>

    <NotificationCenter :visible="notificationCenterIsVisible" />
    <NotificationPopup :visible="!notificationCenterIsVisible" />

    <div class="menu" v-if="menuIsVisible">
      <header>
        <div class="logo-container">
          <router-link to="/"><img class="logo" src="/rembrandt_r_white.svg" /></router-link>
        </div>
        <div class="user-container">
          <div class="menu-button ">
            <span class="burger-menu" @click="toggleMenu()">
              <span></span>
            </span>
          </div>
        </div>
      </header>
      <nav>
        <div class="row">
          <div>
            <ul @click="toggleMenu()">
              <router-link :to="{ name: 'organization' }">
                <h1>Organization</h1>
              </router-link>
              <li>
                <router-link :to="{ name: 'resources' }">Resources</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'types' }">Types</router-link>
              </li>
            </ul>
          </div>
          <div>
            <ul @click="toggleMenu()">
              <router-link :to="{ name: 'optimization' }">
                <h1>Optimization</h1>
              </router-link>
              <li>
                <router-link :to="{ name: 'algorithms' }">Algorithms</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import NotificationCenter from '@/components/NotificationCenter.vue';
import NotificationPopup from '@/components/NotificationPopup.vue';
import Link from '@/components/Link.vue';

@Component({
  components: {
    NotificationCenter,
    NotificationPopup,
    Link,
  },
})
export default class Header extends Vue {
  public notificationCenterIsVisible: boolean = false;
  public menuIsVisible: boolean = false;

  public toggleNotificationCenter() {
    this.notificationCenterIsVisible = !this.notificationCenterIsVisible;
  }

  public toggleMenu() {
    this.menuIsVisible = !this.menuIsVisible;
  }
}

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

  nav#nav {
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

    .notification-button {
      padding-right: @spacing;
    }

    span {
      padding-right: 10px;
      font-weight: bold;
    }

    img {
      width: 40px;
      border-radius: 7px;
    }

    .menu-button {
      margin: 0 @spacing;
    }

    @burger-spacing: 8px;

    .burger-menu {
      padding: 0;
      width: 30px;
      height: 20px;
      display: block;
      position: relative;
      cursor: pointer;

      span, &:before, &:after {
        content: " ";
        position: absolute;
        right: 0;
        height: 2px;
        border-radius: 6px;
        background: @primary;
        transition: all 0.3s;
      }

      &:before {
        top: 0;
        width: 30px;
      }

      span {
        margin: 8px 0;
        width: 25px;
        padding: 0;
      }

      &:after {
        bottom: 0;
        width: 20px;
      }
    }
  }

  .menu {
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, @accent-bg 50%, @primary-bg 50%);

    .burger-menu {
      &:before {
        transform: rotate(45deg);
        top: 8px;
      }

      span {
        display: none;
      }

      &:after {
        transform: rotate(-45deg);
        width: 30px;
        top: 8px;
      }
    }

    nav {
      text-align: left;
      display: flex;
      align-items: center;
      height: 100%;

      h1 {
        font-size: 70px;
      }

      .row  {
        width: 100%;

        & > * {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          font-size: 30px;
          margin-top: @spacing * 0.5;
          margin-left: @spacing;
        }
      }
    }
  }
}

</style>
