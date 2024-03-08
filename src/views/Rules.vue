<template>
  <div class="poster">
    <img :src="posterUrl" alt="海报图片" />
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      posterUrl: require(`@/assets/规则.jpeg`), 
    };
  },
};
</script>
  
  <style>
.poster {
  display: flex;
  justify-content: center;
  align-items: center;
}

.poster img {
  max-width: 100%;
  max-height: 100%;
  width: 100vw;
  height: auto;
}
</style>