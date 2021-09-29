<template>
  <div class="detail">
    <div class="leftWrap">
      <HeaderAuth />
      <div class="leftContent">
        <div class="leftTop">
          <button @click="$router.push('/')">＜</button>
          <h1>{{ this.$store.state.shop.data.shopName }}</h1>
        </div>
        <img :src="this.$store.state.shop.data.img_url" alt="">
        <div class="hashtag">
          <p>#{{ $store.state.shop.data.location.prefecture }}</p>
          <p>#{{ $store.state.shop.data.genre.name }}</p>
        </div>
        <p class="comment">{{ this.$store.state.shop.data.comment }}</p>
      </div>
    </div>
    <div class="rightContent">
      <h1>予約</h1>
      <form @submit.prevent="addReservation">
        <div class="inputs">
          <input type="date" v-model="date">
          <select name="" id="" v-model="time">
            <option value="" selected>Time</option>
            <option v-for="index in timeList" :key="index">{{ index }}</option>
          </select>
          <select name="" id="" v-model="number">
            <option value="" selected>Number</option>
            <option v-for="index in numberList" :key="index">{{ index }}</option>
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
      number: "",
      timeList: [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
      ],
      numberList: [
        1,2,3,4,5
      ]
    };
  },
  methods: {
    rememberInputs() {
      console.log(this.$store.state);
      console.log(this.$store.state.remain);
      console.log(this.store.state.remain.date);
      this.date = this.$store.state.remain.date,
      this.time = this.$store.state.remain.time,
      this.number = this.$store.state.remain.number
    },
    addReservation() {
      if(this.$store.state.auth){
        if(this.date != "" && this.time != "" && this.number != "") {
          axios
            .post("https://rocky-wave-13285.herokuapp.com/api/reservations", {
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
        } else {
          window.alert("入力が正しくありません");
        }
      } else {
        this.$store.dispatch("Remain", {
          shop_id: this.$store.state.shop.data.id,
          date: this.date,
          time: this.time,
          number: this.number,
        });
        return this.$router.push('/login');
      }
    }
  },
  components: {
    HeaderAuth
  },
  async created() {
    this.rememberInputs()
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
}

.rightContent button:hover {
  background-color: cornflowerblue;
  transition: 0.5s;
}

</style>