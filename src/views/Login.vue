<template>
  <div>
    <HeaderAuth />
    <div class="container">
      <div class="card">
        <p>Login</p>
        <div class="form">
          <input placeholder="Email" type="email" v-model="email">
          <input placeholder="Password" type="password" v-model="password">
          <div class="btn">
            <button @click="auth">ログイン</button>
          </div>
        </div>
      </div>
      <div class="btns">
        <button @click="$router.push('/register')">新規登録</button>
        <button @click="$router.push('/')">店舗一覧</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    HeaderAuth
  },
  methods: {
    auth() {
      axios.post("https://rocky-wave-13285.herokuapp.com/api/login", {
        email: this.email,
        password: this.password
      });
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>

<style scoped>

.card {
  margin: 100px auto 50px;
  /* padding: 0 20px; */
  width: 350px;
  background: #305dff;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #9b9b9b;
}
.card p {
  line-height: 30px;
  width: 80%;
  margin: 0 auto;
  color: white;
}
.form {
  padding: 30px auto;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
  background: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.form input {
  margin: 10px 0;
  padding: 0 auto;
  width: 80%;
  color: black;
}
.form button {
  color: white;
  background-color: #305dff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.form button:hover {
  background-color: #196dce;
}
.btn {
  margin: 0 auto;
  width: 80%;
  text-align: right;
}
.btns button {
  margin: 0 auto;
  height: 30px;
  color: #305dff;
  background-color: white;
  border: 2px solid #305dff;
  border-radius: 5px;
  padding: 0 20px;
  cursor: pointer;
}
.btns {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}
.btns button:nth-child(1) {
  margin-left: 450px;
}
.btns button:nth-child(2) {
  margin-right: 450px;
}
.btns button:hover {
  background-color: #305dff;
  color: white;
  transition: 0.5s;
}
</style>