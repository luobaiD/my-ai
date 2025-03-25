<template>
  <!-- 有交流的页面 -->
  <div class="home-whole">
    <div class="content">
      <homeData/>
    </div>
    <search/>
    <div class="hint">
      <span>内容由 AI 生成，请仔细甄别</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import search from './search.vue';
import homeData from './homePage/homeData.vue';



</script>

<style scoped lang="scss">
  .home-whole {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding:0 64px;
    user-select: auto;
    position: relative;
    .content {
      width: 100%;
      display: flex; 
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .hint{
      width: 100%;
      font-size: 12px;
      margin: 0 auto;
      margin-top: 6px;
      margin-bottom: 6px;
      color: rgb(163, 163, 163);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media(max-width: 1270px){
    .home-whole{
      .content{
        width: 100%;
        .content-list{
          width: 90%;
        }
      }
    }
  }
  @media(max-width: 1038px){
    .home-whole{
      .content{
        width: 100%;
        .content-list{
          width: 100%;
        }
      }
    }
  }
</style>