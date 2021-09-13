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
  margin: 100px auto;
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
}
.btn {
  margin: 0 auto;
  width: 80%;
  text-align: right;
}
</style>