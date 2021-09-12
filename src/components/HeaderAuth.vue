<template>
  <div class="headerLeft" @click="change()">
    <div class="logo">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p>Rese</p>
  </div>
</template>

<script>
export default {
  methods: {
    change() {
      if (this.$store.state.auth == true) {
        return this.$router.push('/');
      } else {
        return this.$router.push('/login');
      }
    }
  },
}
</script>

<style scoped>
.headerLeft {
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-left: 80px;
  cursor: pointer;
}

.headerLeft p {
  color: #305dff;
  font-weight: bold;
  font-size: 24px;
  padding-left: 20px;
  text-align: center;
}

.logo {
  width: 36px;
  height: 36px;
  background-color: #305dff;
  border-radius: 5px;
  position: relative;
  box-shadow: 1px 1px 5px #9b9b9b;
}

.logo span {
  display: inline-block;
  background-color: white;
  height: 1px;
  position: absolute;
  left: 10px;
}

.logo span:nth-child(1) {
  top: 10px;
  width: 10px;
}

.logo span:nth-child(2) {
  top: 18px;
  width: 15px;
}

.logo span:nth-child(3) {
  top: 26px;
  width: 5px;
}
</style>