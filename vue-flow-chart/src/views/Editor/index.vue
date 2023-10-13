<template>
  <div id="editor">
    <Header />

    <div class="main">
      <Material></Material>
      <Canvas></Canvas>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/views/Header/index.vue";
import Material from "@/views/Material/index.vue";
import Canvas from "@/views/Canvas/index.vue";
import Footer from "@/views/Footer/index.vue";
</script>

<style scoped lang="scss">
#editor {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #9b9494;

  .main {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
}
</style>
