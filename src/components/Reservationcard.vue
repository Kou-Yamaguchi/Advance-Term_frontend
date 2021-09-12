<template>
  <div class="reservationCard">
    <div class="cardHead">
      <div class=timeLogo>

      </div>
      <p>予約{{ number+1 }}</p>
      <button @click="del(index)">×</button>
    </div>
    <div class="table">
      <table>
        <tr>
          <th>Shop</th>
          <td>{{ reservation.shop.shopName }}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{{ reservation.date }}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{{ reservation.time }}</td>
        </tr>
        <tr>
          <th>Number</th>
          <td>{{ reservation.number }}人</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ['reservation','number'],
  methods: {
    del() {
      axios
        .delete("http://rocky-wave-13285.herokuapp.com/api/reservations/" + this.reservation.id)
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
  }
}
</script>

<style scoped>
.reservationCard {
  background-color: #305dff;
  width: 100%;
  height: 200px;
  box-shadow: 1px 1px 5px #9b9b9b;
  border-radius: 5px;
  margin-bottom: 20px;
}
.reservationCard p {
  color: white;
  font-weight: normal;
}

.cardHead {
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
}

.reservationCard button {
  border: 2px solid white;
  background-color: #305dff;
  color: white;
  border-radius: 130px;
  font-weight: bold;
  cursor: pointer;
}

.reservationCard button:hover {
  background-color: white;
  color: #305dff;
  transition: 0.5s;
}

.timeLogo {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
}

.table {
  margin-top: 15px;
  margin-left: 15px;
}

th {
  text-align: start;
  padding: 5px;
  padding-bottom: 15px;
  padding-right: 30px;
}

th, td {
  color: white;
  font-weight: normal;
  font-size: 12px;
  margin: 5px;
}
</style>