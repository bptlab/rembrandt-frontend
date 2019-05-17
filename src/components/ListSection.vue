<template>
  <section class="list">
    <h1 v-if="title">{{title}}</h1>
    <ul>
      <li :key="element.id" v-for="element in this.list" v-bind:class="{ disabled: !element.link && !element.onClick }">
        <Link :link="element.link" :onClick="element.onClick">
          <div>
            <h2>{{element.firstValue}}</h2>
            <p v-if="element.secondValue">{{element.secondValue}}</p>
          </div>
          <p class="third-value" v-if="element.thirdValue">{{element.thirdValue}}</p>
        </Link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Link from '@/components/Link.vue';

export interface ListElement {
  id: string;
  firstValue: string;
  secondValue?: string;
  thirdValue?: string;
  link: string;
  onClick?: () => void;
}

@Component({
  components: {
    Link,
  },
})
export default class ListSection extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public title!: string;

  @Prop(Array)
  public list!: ListElement[];
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors";

section.list {
  h1 {
    margin-top: 40px;
    font-size: 19px;
    font-weight: 800;
  }

  h2,
  .third-value {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    border-radius: 10px;
    background-color: @secondary-bg;
    box-shadow: 0 0 0.25em 0.1em @primary-shadow;
    margin-top: 20px;
  }

  li {
    border-bottom: 1px solid @primary-bg;
    min-height: 77px;
    display: flex;

    &:hover{
      background-image: linear-gradient(to right, @accent, @accent);
      background-position: 0 0;
      background-size: 5px 100%;
      background-repeat: no-repeat;
    }

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom: none;
    }

    & > a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      text-decoration: none;
      width: 100%;
    }
  }

  li.disabled {
    &:hover {
      background: none;
    }

    a {
      pointer-events: none;
    }
  }
}
</style>
