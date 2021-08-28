<template>
  <div class="home">
    <div class="headerFlex">
      <HeaderAuth />
    </div>
    <div class="container">
      <div class="leftContent">
        <h2>予約状況</h2>
        <div class="reservations">
          <Reservationcard v-for="(reservaions, index) in reservations" :key="index" :reservation="reservations[index]" :number="index" />
        </div>
        <button @click="logout">logout</button>
      </div>
      <div class="rightContent">
        <h1>testさん</h1>
        <h2>お気に入り店舗</h2>
        <div class="likes">
          <Shopcard v-for="(shops, index) in shops" :key="index" :shop="shops" :like="likes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HeaderAuth from "../components/HeaderAuth.vue";
import Shopcard from "../components/Shopcard.vue";
import Reservationcard from "../components/Reservationcard.vue";
import axios from "axios";
export default {
  data() {
    return {
      shops: [],
      likes: [],
      reservations: []
    };
  },
  methods: {
    async reservation() {
      const reservations = await axios.get("http://127.0.0.1:8000/api/reservations");
      for (const i in reservations.data.data) {
        const reservation = reservations.data.data[i];
        if(Number(reservation.user_id) === this.$store.state.user.id) {
          this.reservations.push(reservation);
        }
      }
      console.log(this.reservations);
    },
    async getShops() {
      const shops = await axios.get(
        "http://127.0.0.1:8000/api/shops"
      );
      for (const i in shops.data.data) {
        const shop = shops.data.data[i];
        for(const j in shop.like) {
          if(Number(shop.like[j].user_id) === this.$store.state.user.id) {
            this.shops.push(shop);
            this.likes.push(shop.like[j]);
          }
        }
      }
      console.log(this.likes);
    },
    logout() {
      axios.post("http://127.0.0.1:8000/api/logout")
      this.$store.dispatch("logout");
    }
  },
  components: {
    HeaderAuth,
    Shopcard,
    Reservationcard
  },
  mounted() {
    this.reservation();
    this.getShops();
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 25px auto 0 auto;
  width: 100%;
}
.leftContent {
  width: 30vw;
  margin-left: 8.5vw;
}
.leftContent h2 {
  font-weight: bold;
  padding-top: 24px;
}
.reservations {
  width: 30vw;
  /* margin: 0 10vw; */
}
.btns img {
  height: 21px;
}

.rightContent {
  width: 45vw;
  margin-right: 8.5vw;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.likes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
