<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Liste des projets</h1>
        <nuxt-link
          v-for="data in dataFetch"
          :key="data.id"
          :to="`/projects/${data.id}`"
          class="dataCat project_link"
        >
        <div class="project_image">
          <img src="" alt="">
        </div>

          <div class="p-1">
            <h2>{{ data.title.rendered }}</h2>
            <h3>{{ data.acf.type_de_projet }}</h3>
            
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataFetch: {},
    };
  },
  mounted() {
    this.fetchDataCategory();
    document.body.style.overflow = "initial";
  },
  methods: {
    fetchDataCategory() {
      axios.get(process.env.wordpressAPI + "wp/v2/portfolio").then((response) => {
        this.dataFetch = response.data;
        console.log(this.dataFetch);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container .row .col-12 h1 {
  font-family: "Open Sans";
  font-weight: 700;
}
.project_link {
  margin-bottom: 2rem;
  border-radius: 20px 20px 0 0;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.1);
a{
  color: black;
}
  h2 {
    font-family: "Open Sans";
    font-weight: 700;
    font-size: 20px;
    color: black;
  }
  h3 {
    color:black;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 15px;
    text-align: justify;
    margin-bottom: 1rem;
  }
  .project_image{
    border-radius: 20px 20px 0 0 ;
    width:100%;
    height: 140px;
    img {
      border-radius: 20px 20px 0 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
      }
  
  a {
    color: black;
    margin-top: 0.7rem;
    p {
      padding: 1rem;
      background-color: rgb(235, 235, 235);
      border-radius: 15px;
      font-weight: 600;
    }
  }
}
</style>
