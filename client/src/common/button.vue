<script setup lang="ts">
import { bottomNavList } from './data';
import { activeIndex, setActiveIndex } from './common';
</script>

<template>
  <div class="bottom-nav-wrapper">
    <div class="bottom-nav">
      <div
        v-for="(item, index) in bottomNavList"
        :key="index"
        class="bottom-nav-item"
        :class="{ 'bottom-nav-item-active': activeIndex === index }"
        @click="setActiveIndex(index)"
      >
        <i :class="item.icon" class="bottom-nav-item-icon" />
        <span
          class="bottom-nav-item-title"
          @click="$router.push(item.url)"
        >
          {{ item.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-nav-wrapper {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 0.6rem;
  margin-top: 0.6rem;
  z-index: 999;
  border-top: 1px solid #ccc;
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width:100%;
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: #999;
      &-icon {
        font-size: 0.26rem;
      }
      &-title {
        font-size: 0.12rem;
      }
    }
    &-item-active {
      color: #21a2ff;
    }
  }
}
</style>
