<template>
  <div>
    <header>
      <HeaderAuth />
      <div class="search">
        <div class="area">
          <select name="" id="" v-model="keylocation">
            <option value="" selected>All area</option>
            <option v-for="(shops, index) in getLocations" :key="index">{{shops}}</option>
          </select>
        </div>
        <div class="genre">
          <select name="" id="" v-model="keygenre">
            <option value="" selected>All genre</option>
            <option v-for="(shops, index) in getGenres" :key="index">{{shops}}</option>
          </select>
        </div>
        <div class="name">
          <input placeholder="Search ..." class="searchInput" type="text" v-model="keyword">
        </div>
      </div>
    </header>
    <div class="container">
      <div class="cards">
        <Shopcard v-for="(value, index) in filteredShops" :key="index" :shop="filteredShops[index]" :like="likes"/>
      </div>
    </div>
    <footer>
      <div v-if="this.$store.state.auth" class="btns">
        <button @click="$router.push('/mypage')">ホームへ</button>
        <button @click="logout">ログアウト</button>
      </div>
      <div v-else class="btns">
        <button @click="$router.push('/register')">新規登録</button>
        <button @click="$router.push('/login')">ログイン</button>
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import Shopcard from "../components/Shopcard.vue";
import axios from "axios";
export default {
  data() {
    return {
      keyword: "",
      keylocation: "",
      keygenre: "",
      shops: [],
      likes: []
    };
  },
  methods: {
    //店舗情報を取得する関数
    async getShops() {
      const shops = await axios.get(
        "https://rocky-wave-13285.herokuapp.com/api/shops"
      );
      this.shops = shops.data.data;
      console.log(this.shops);
    },
    async makeLikes() {
      if(this.$store.state.auth === true) {
        for (const i in this.shops) {
          const like = this.shops[i].like;
          for(const j in like) {
            if(Number(like[j].user_id) === this.$store.state.user.id) {
              this.likes.push(like[j]);
            }
          }
        }
        console.log(this.likes);
      }
    },
    logout() {
      axios.post("https://rocky-wave-13285.herokuapp.com/api/logout")
      this.$store.dispatch("logout");
    }
  },
  //インスタンス生成時に店舗情報を取得する関数getShops()を実行する
  async created() {
    await this.getShops();
    await this.makeLikes();
  },
  components: {
    HeaderAuth,
    Shopcard
  },
  computed: {
    filteredShops() {
      const shopsArray = [];
      for (const i in this.shops) {
        const shop = this.shops[i];
        if (shop.location.prefecture.indexOf(this.keylocation) !== -1 && shop.genre.name.indexOf(this.keygenre) !== -1 && shop.shopName.indexOf(this.keyword) !== -1) {
          shopsArray.push(shop);
        }
      }
      return shopsArray;
    },
    getLocations() {
      const locationArray = [];
      for (const i in this.shops) {
        const location = this.shops[i].location.prefecture;
        if(locationArray.indexOf(location) === -1){
          locationArray.push(location);
        }
      }
      return locationArray;
    },
    getGenres() {
      const genreArray = [];
      for (const i in this.shops) {
        const genre = this.shops[i].genre.name;
        if(genreArray.indexOf(genre) === -1){
          genreArray.push(genre);
        }
      }
      return genreArray;
    },
  },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

.search {
  display: flex;
  background-color: white;
  height: 36px;
  width: 42vw;
  margin-top: 40px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #9b9b9b;
  align-items: center;
  margin-right: 80px;
}

.area {
  display: flex;
  height: 80%;
  border-right: 1px solid #9b9b9b;
}

select {
  border: none;
  font-size: 10px;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.genre {
  display: flex;
  height: 80%;
  border-right: 1px solid #9b9b9b;
}

/* .search p {
  font-size: 12px;
  margin: auto;
  padding-left: 10px;
} */

.name {
  height: 100%;
}

.searchInput {
  border: none;
  font-size: 12px;
  padding-left: 10px;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 10;
}

.container {
  margin: 20px 0 0 80px;
}

.cards {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.btns {
  display: flex;
  justify-content: space-around;
}

.btns button {
  margin-top: 40px;
  height: 30px;
  color: #305dff;
  background-color: white;
  border: 2px solid #305dff;
  border-radius: 5px;
  padding: 0 20px;
  cursor: pointer;
}

.btns button:nth-child(1) {
  margin-left: 300px;
}

.btns button:nth-child(2) {
  margin-right: 300px;
}

.btns button:hover {
  background-color: #305dff;
  color: white;
  transition: 0.5s;
}
</style>