<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-for="data in dataFetch" :key="data.id" class="dataCat">
          <div class="imgCat">
            <img :src="`${data.image.url}`" alt="" />
          </div>
          <div class="p-1">
            <h2>{{ data.Titre }}</h2>
            <h3>{{ data.descriptifCategory }}</h3>
            
              <nuxt-link v-for="projet in data.projects" :key="projet.id"
                :to="`/projects/${projet.id}`"
                class="project_link"
              >
               <p> {{ projet.titreDuProjet }}</p>
              </nuxt-link>
             
            
          </div>
        </div>
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
      axios
        .get(`https://back-portf.herokuapp.com/categorypourprojets/`)
        .then((response) => {
          this.dataFetch = response.data;
          console.log(this.dataFetch);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.dataCat {
  margin-bottom: 2rem;
  border-radius: 20px 20px 0 0;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-family: "Open Sans";
    font-weight: 700;
    font-size: 20px;
  }
  h3 {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 15px;
    text-align: justify;
  }
  .imgCat {
    img {
      border-radius: 20px 20px 0 0;
      width: 100%;
    }
  }
}
</style>