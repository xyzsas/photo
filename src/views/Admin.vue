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
    download () {
      let _this = this
      let zip = new JSZip()
      let cache = {}
      let promises = []
      let times = 1
      const images = this.data[this.group]
      const filename = "photo"
      var setIme = setInterval(() => {
        times++
        console.log(times)
      }, 1000)

      for (const i in images) {
        const item = images[i]
        const promise = _this.getImgArrayBuffer(item.url).then(data => {
          // 下载文件, 并存成ArrayBuffer对象(blob)
          zip.file(item.name, data, { binary: true }) // 逐个添加文件
          cache[item.name] = data
        });
        promises.push(promise)
      }
      Promise.all(promises)
        .then(() => {
          zip.generateAsync({ type: "blob" }).then(content => {
            // 生成二进制流
            FileSaver.saveAs(content, filename) // 利用file-saver保存文件  自定义文件名
            this.tip = "压缩完成"
            window.clearInterval(setIme)
          })
        })
        .catch(() => {
          this.tip = "文件压缩失败"
        })
    },
    //获取文件blob
    getImgArrayBuffer(url) {
      return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest()
        xmlhttp.open("GET", url, true)
        xmlhttp.responseType = "blob"
        xmlhttp.onload = function() {
          if (this.status == 200) {
            resolve(this.response)
          } else {
            reject(this.status)
          }
        }
        xmlhttp.send()
      })
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
