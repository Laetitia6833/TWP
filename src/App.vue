<template>
  <div>
    <Jumbo />
  </div>
  <router-view />
</template>
<script>
import Jumbo from "@/components/Jumbo.vue";
export default {
  name: "app",
  components: {
    Jumbo,
  },
};
</script>

<style src="./assets/style/reset.css"></style>

<style lang="scss">
#app {
  // width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh - 50px);
  // background: center / cover
  //   url("https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  // background-attachment: fixed;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.-exact-active {
      color: #42b983;
    }
  }
}
</style>
