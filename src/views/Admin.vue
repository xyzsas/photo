<template>
  <div class="admin">
    <h1>照片管理</h1>
    <p>{{ tip }}</p>
    <v-row>
      <v-select v-if="groups.length" outlined v-model="group" :items="groups" label="用户组"></v-select>
    </v-row>
    <v-card v-if="group" style="width: 95%;">
      <v-card-title>照片预览</v-card-title>
      <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
        <div v-for="(v, k) in data[group]" :key="k" style="margin: 10px;">
          <img :src="v.url" alt="无照片" style="width: 147.5px; height: 206.5px; object-position: center;" :name="v.name">
          <h3>{{ v.name }}</h3>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
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
