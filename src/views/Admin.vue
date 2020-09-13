<template>
  <div class="admin">
    <h1>照片管理</h1>
    <p>{{ tip }}</p>
    <v-row>
      <v-select v-if="groups.length" outlined v-model="group" :items="groups" label="用户组"></v-select>
    </v-row>
    <v-card v-if="group" style="width: 95%;">
      <v-card-title>
        照片预览
        <v-btn outlined color="secondary" style="margin-left: 20px" @click="download">下载照片</v-btn>
      </v-card-title>
      <div style="width: 100%;">
        <div v-for="(v, k) in data[group]" :key="k" style="margin: 10px; display: inline-block;">
          <img :src="v.url" alt="无照片" style="width: 147.5px; height: 206.5px; object-position: center;" :name="v.name">
          <h3>{{ v.name }}</h3>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import JSZip from "jszip"
import FileSaver from "file-saver"
const SS = window.sessionStorage

export default {
  name: 'Admin',
  data: () => ({
    tip: '正在加载...',
    group: '',
    groups: [],
    data: null
  }),
  mounted () {
    if (SS.role !== 'ADMIN') this.$router.push({ name: 'Guide' })
    else this.load()
  },
  watch: {
    group () { // render data
    }
  },
  methods: {
    load () {
      this.$ajax // load data
        .get('/photo', { headers: { token: SS.token } })
        .then(resp => {
          this.data = resp.data
          for (const g in this.data) this.groups.push(g)
          this.tip = '请选择用户组'
        })
        .catch(err => {
          this.tip = err.response.data
        })
    },
    async download () {
      let zip = new JSZip()
      const images = this.data[this.group]
      this.tip = '正在压缩，请稍等...'
      for (const i in images) {
        const item = images[i]
        const data = await this.getImgArrayBuffer(item.url)
        if (data) zip.file(item.name + '.png', data, { binary: true })
      }
      zip.generateAsync({ type: "blob" })
        .then(content => {
          FileSaver.saveAs(content, this.group)
          this.tip = "压缩完成"
        })
        .catch(() => {
          this.tip = "文件压缩失败"
        })
    },
    //获取文件blob
    async getImgArrayBuffer (url) {
      return await new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest()
        xmlhttp.open("GET", url, true)
        xmlhttp.responseType = "blob"
        xmlhttp.onload = function() {
          if (this.status == 200) {
            resolve(this.response)
          } else {
            reject(false)
          }
        }
        xmlhttp.send()
      }).then(resp => resp).catch(() => false)
    }
  }
}
</script>

<style scoped>
  div.admin {
    padding: 30px;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
