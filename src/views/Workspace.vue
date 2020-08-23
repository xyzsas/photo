<template>
  <div class="workspace">
    <div>
      <h1>选择&剪裁</h1>
      <p>点击选择图片，使用鼠标滚轮或双指缩放，调整图片到合适的位置。</p>
    </div>
    <div style="position: relative;">
      <croppa ref="croppa"
        :quality="1"
        :width="width"
        :height="height"
        :placeholder="'点击选择图片'"
        :accept="'image/*'"
        :prevent-white-space="true"
        :remove-button-color="'grey'"
      ></croppa>
      <hr style="position: absolute; width: 100%; top: 37px; left: 0;">
      <hr style="position: absolute; width: 100%; top: 293px; left: 0;">
    </div>
    <v-btn @click="next" color="primary" fab large><v-icon>mdi-arrow-right</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  name: 'Workspace',
  data: () => ({
    width: 295,
    height: 413
  }),
  methods: {
    next () {
      const data = this.$refs.croppa.generateDataUrl()
      if (!data) return
      window.sessionStorage.data = data
      this.$router.push({ name: 'Preview' })
    }
  }
}
</script>

<style scoped>
  div.workspace {
    padding: 30px;
    text-align: center;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
</style>
