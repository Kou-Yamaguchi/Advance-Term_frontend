<template>
  <div class="wrap">
    <HeaderAuth />
    <div class="container">
      <div class="card">
        <p>ご予約ありがとうございます</p>
        <button @click="$router.push('/')">戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth.vue";
export default {
  components: {
    HeaderAuth
  }
}
</script>

<style scoped>

.card {
  position: relative;
  background-color: white;
  border-radius: 5px;
  align-items: center;
  margin: 0 auto;
  box-shadow: 1px 1px 5px #9b9b9b;
  width: 35%;
  height: 175px;
  padding: 50px 0;
}

p {
  text-align: center;
  padding-top: 50px;
  font-size: 20px;
}

button {
  position: absolute;
  top: 60%;
  left: 35%;
  background-color: #305dff;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
  margin: 0 auto;
  width: 30%;
  cursor: pointer;
}

button:hover {
  background-color: #196dce;
}
</style>