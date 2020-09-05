<template>
  <div class="preview">
    <h1>预览&上传</h1>
    <img :src="data">
    <v-btn @click="upload" :loading="loading" color="primary" fab large><v-icon>mdi-check</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>学生事务系统</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="back">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const SS = window.sessionStorage

export default {
  name: 'Preview',
  data: () => ({
    data: '',
    success: false,
    loading: false,
    dialog: false,
    message: ''
  }),
  mounted () {
    if (!SS.data) this.$router.push({ name: 'Guide' })
    else this.data = SS.data
  },
  methods: {
    async upload () {
      this.loading = true
      const res = await this.$ajax
        .post('/photo', { data: this.data }, {
          headers: { token: SS.token }
        })
        .then(resp => {
          this.success = true
          return resp.data
        })
        .catch(err => err.response.data)
      this.loading = false
      this.dialog = true
      this.message = res
    },
    back () {
      this.dialog = false
      if (this.success) window.location.href = '/index.html'
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
