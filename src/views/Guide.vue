<template>
  <div class="guide">
    <h1>照片上传指南</h1>
    <p>{{ tip }}</p>
    <div style="height: 20px;">&nbsp;</div>
    <h3>示例</h3>
    <div style="position: relative;">
      <img src="../assets/example.jpg">
      <img style="position: absolute; top: 0; left: 0;" src="../assets/template.png">
    </div>
    <p>如图所示，纯色背景，人像居中，着装得体，位置合适。</p>
    <v-btn @click="$router.push({ name: 'Workspace' })" color="primary" fab large><v-icon>mdi-arrow-right</v-icon></v-btn>
  </div>
</template>

<script>
const SS = window.sessionStorage

export default {
  name: 'Guide',
  data: () => ({
    tip: '请您登陆'
  }),
  mounted () {
    if (!SS.token) {
      window.location.href = '/user/#/?c=/photo/'
    } else {
      this.tip = `接下来您需要选择或拍摄一张${SS.name}的免冠标准照。选择照片后，您可以在辅助线的帮助下剪裁和调整您的照片。`
    }
  }
}
</script>

<style scoped>
  div.guide {
    padding: 30px;
    text-align: center;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
</style>

