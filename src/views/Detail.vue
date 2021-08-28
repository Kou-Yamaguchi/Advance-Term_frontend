<template>
  <div class="detail">
    <div class="leftWrap">
      <HeaderAuth />
      <div class="leftContent">
        <div class="leftTop">
          <button @click="$router.push('/')">＜</button>
          <h1>{{this.$store.state.shop.data.shopName}}</h1>
        </div>
        <img :src="this.$store.state.shop.data.img_url" alt="">
        <div class="hashtag">
          <p>#{{$store.state.shop.data.location.prefecture}}</p>
          <p>#{{$store.state.shop.data.genre.name}}</p>
        </div>
        <p class="comment">{{this.$store.state.shop.data.comment}}</p>
      </div>
    </div>
    <div class="rightContent">
      <h1>予約</h1>
      <form @submit.prevent="addReservation">
        <div class="inputs">
          <input type="date" v-model="date">
          <select name="" id="" v-model="time">
            <option value="" selected>Time</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
          </select>
          <select name="" id="" v-model="number">
            <option value="" selected>Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="reservationCard">
          <table>
            <tr>
              <th>Shop</th>
              <td>{{this.$store.state.shop.data.shopName}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{date}}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{time}}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{{number}}</td>
            </tr>
          </table>
        </div>
        <button>予約する</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderAuth from "../components/HeaderAuth.vue"
export default {
  data() {
    return {
      date: "",
      time: "",
      number: ""
    };
  },
  methods: {
    addReservation() {
      if(this.date != "" && this.time != "" && this.number != "") {
        axios
          .post("http://127.0.0.1:8000/api/reservations", {
            shop_id: this.$store.state.shop.data.id,
            user_id: this.$store.state.user.id,
            date: this.date,
            time: this.time,
            number: this.number
          })
          .then((response) => {
            console.log(response);
            this.$router.push('/done');
          })
          .catch(error => {
            alert(error);
          })
      }
    }
  },
  components: {
    HeaderAuth
  }
}
</script>

<style scoped>
.detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100vw;
}

.leftWrap {
  width: 550px;
}

.leftContent {
  margin-top: 40px;
  margin-left: 80px;
}

.leftTop {
  display: flex;
}

.leftTop button {
  border: none;
  background-color: white;
  color: black;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #9b9b9b;
}

.leftTop h1 {
  font-size: 24px;
  margin-left: 10px;
}

img {
  width: 100%;
  margin-top: 20px;
}

.hashtag {
  display: flex;
  font-size: 14px;
  margin-top: 20px;
}

.hashtag p {
  margin-right: 5px;
}

.comment {
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;
}

.rightContent {
  position: relative;
  width: 40%;
  margin-top: 40px;
  margin-right: 80px;
  padding-top: 30px;
  background-color: #305dff;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #AAAAAA;
}

.rightContent h1 {
  padding-left: 20px;
  color: white;
  font-size: 20px;
}

.inputs {
  padding-left: 20px;
  margin-top: 20px;
}

select, input {
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

select {
  width: 90%;
  padding: 5px;
}

.reservationCard {
  background-color: #4c7eff;
  border-radius: 5px;
  margin-left: 20px;
  width: 80%;
  padding: 20px;
  padding-right: 0;
}

th {
  color: white;
  font-weight: normal;
  font-size: 14px;
  padding: 5px 20px 5px 0;
  text-align: start;
}

td {
  color: white;
  font-size: 14px;
}

.rightContent button {
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  border: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #0438FF;
  color: white;
}

</style>