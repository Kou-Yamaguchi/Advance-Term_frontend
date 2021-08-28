<template>
  <div class="card">
    <img :src="shop.img_url" alt="">
    <div class="container">
      <h2>{{ shop.shopName }}</h2>    
      <div class="hashtag">
        <p>#{{shop.location.prefecture}}</p>
        <p>#{{shop.genre.name}}</p>
      </div>
      <div class="btns">
        <button @click="transition(shop)">詳しく見る</button>
        <button @click="fav(shop.id)" class="heart" :class="determinLike"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ["shop", "like"],
  methods: {
    transition(shop) {
      this.$store.dispatch("seeDetail", {data: shop});
      console.log(this.$store.state.shop);
      this.$router.push({ path: `/detail/${this.$store.state.shop.data.id}` });
    },
    fav() {
      const result = this.like.some((value) => {
        return Number(value.shop_id) == this.shop.id;
      });
      if(result) {
        this.like.forEach((element) => {
          if(Number(element.shop_id) == this.shop.id) {
            axios.delete("http://127.0.0.1:8000/api/like", {
              data: {
                shop_id: this.shop.id,
                user_id: this.$store.state.user.id,
              }
            }).then((response) => {
              console.log(response);
              this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              });
            });
          }
        });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/like", {
            shop_id: this.shop.id,
            user_id: this.$store.state.user.id,
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    },
  },
  computed: {
    determinLike() {
      let TF = "blue";
      for(const i in this.like) {
        if(this.shop.id === Number(this.like[i].shop_id)){
          TF = "red";
        }
      }
      return TF;
    }
  }
};
</script>

<style scoped>
.card {
  /* width: 21vw; */
  width: 250px;
  height: 240px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #9b9b9b;
  margin-bottom: 20px;
  margin-right: 10px;
}

.card img {
  width: 100%;
  height: 50%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.container {
  width: 100%;
  height: 50%;
}

h2 {
  margin-top: 20px;
  margin-left: 20px;
  padding-bottom: 8px;
}

.hashtag {
  display: flex;
  font-size: 9px;
  padding-bottom: 10px;
  margin-left: 20px;
}

.hashtag p:nth-child(2) {
  margin-left: 5px;
}

.btns {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  position: relative;
}

button {
  border: none;
}

.btns button:nth-child(1) {
  background-color: #305dff;
  color: white;
  font-size: 11px;
  border-radius: 5px;
  padding: 5px 15px;
  /* margin-right: 50px; */
}

.btns img {
  width: 10px;
  /* background-color: red; */
  color: blue;

}

.heart {
  position: absolute;
  background-color: white;
  width: 30px;
  height: 25px;
  left: 235px;
  top: 50px;
  margin-top: -45px;
  margin-left: -50px;
}
.heart:before,
.heart:after {
  position: absolute;
  content: "";
  left: 15px;
  top: 0;
  width: 15px;
  height: 25px;
  background: #eeeeee;
  border-radius: 15px 15px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
.heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin :100% 100%;
}

.red:before,
.red:after {
  background-color: red;
}

</style>