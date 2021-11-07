<template>
  <div class="app">
    <div class="cursor"></div>
    <div class="follow"></div>
    <header class="fixed-lg-top">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-3">
            <nuxt-link to="/">
              <img :src="`${logo}`" />
            </nuxt-link>
          </div>
          <div class="col-lg-9 text-end" style="text-align: end">
            <div class="menu d-none d-lg-block">
              <div class="container">
                <nuxt-link class="liens" to="/about">About</nuxt-link>
                <nuxt-link class="liens" to="/contact">Contact</nuxt-link>
                <ul class="pictoUl">
                  <li v-for="link in reseauxLink" :key="link.id">
                    <a :href="`${link.LienVersSite}`">
                      <img
                        :src="`${link.ImageVersSite.url}`"
                        :alt="`${link.ImageVersSite.alternativeText}`"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <nav class="mobile d-lg-none"></nav>
          </div>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logo: null,
      reseauxLink: {},
      linksA: [],
    };
  },
  mounted() {
   this.$mouse()
    let one = "https://back-portf.herokuapp.com/options";

    const requestOne = axios.get(one);

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];

          this.logo = responseOne.data.logoPrincipal.url;
          this.reseauxLink = responseOne.data.Icones;

          // use/access the results
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  },
  methods: {
  
  },
};
</script>

<style lang="scss" scoped>
*{cursor:none;}
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  z-index: 300;
  pointer-events: none;
}
.follow {
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  z-index: 299;
  border: black 1px solid;
  border-radius: 50%;
  pointer-events: none;
}

.col-3,
.col-lg-9 {
  z-index: 110;
}

.col-lg-9.text-end {
  z-index: 110;
  text-align: end;
}
header {
  padding: 2rem 0 0 0;
  position: initial;
  width: 100%;
  z-index: 100;
  margin-bottom: 60px;
  .container {
    a.liens {
      padding-right: 1.4rem;
      font-weight: 200;
      z-index: 100;
      color: #2c2c2c;
      font-family: "Open Sans", sans-serif;
      font-weight: 500;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: #fddb3a !important;
        text-decoration: none;
      }
    }
  }
  .pictoUl {
    display: inline-flex;
    margin: 0;
    list-style: none;
    li {
      margin: 0;
      padding-right: 1rem;
      font-weight: 200;
      z-index: 100;
      font-weight: 200;
      z-index: 100;

      a {
        color: #2c2c2c;
        font-family: "Open Sans", sans-serif;
        font-weight: 500;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>