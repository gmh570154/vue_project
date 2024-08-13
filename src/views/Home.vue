<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="some tempalte msg info"/>
    <span @click="logout" >logout2</span>
    <input type="button" value="dianwo" @click="logout"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
   methods:{
      logout:function(){
          console.log("vue logout")
          localStorage.removeItem('Authorization');
          window.location.href = 'http://192.168.110.129:8099/rest/logout'
          return false
      }
  },
}
</script>
