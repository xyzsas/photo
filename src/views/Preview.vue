<template>
  <div class="preview">
    <h1>预览&上传</h1>
    <img :src="data">
    <v-btn @click="upload" color="primary" fab large><v-icon>mdi-check</v-icon></v-btn>
  </div>
</template>

<script>
const SS = window.sessionStorage

export default {
  name: 'Preview',
  data: () => ({
    data: ''
  }),
  mounted () {
    if (!SS.data) this.$router.push({ name: 'Guide' })
    else this.data = SS.data
  },
  methods: {
    upload () {
    }
  }
}
</script>

<style scoped>
  div.preview {
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
