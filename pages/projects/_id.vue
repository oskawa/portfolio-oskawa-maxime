<template>
  <div>
    <div
      id="project_background"
      :style="`background-image:url('${imageCategory}')`"
    ></div>
    <div id="projet">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nuxt-link to="/">
            
              <p v-if="lang == 'en'">Return to projects</p>
              <p v-else>Retour aux projets</p>
            </nuxt-link>
            <div class="desc">
              <h1>{{ projet.titre }}</h1>
              <p>{{ projet.typeDeProjet }}</p>
              <p v-html="projet.descriptionDuProjet"></p>
            </div>
            <div v-for="image in projet.galery" :key="image.id" class="img">
              <img :src="`${image.sizes['1536x1536']}`" alt="" />
            </div>
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
      id: this.$route.params.id,
      imageCategory: null,
      projet: {
        titre: "",
        typeDeProjet: "",
        descriptionDuProjet: "",
        galery: null,
        categoryImage: null,
        imageCategory: null,
        lang : 'fr'
      },
    };
  },
  mounted() {
   this.lang =  window.localStorage.getItem('language')
    document.body.style.overflow = "initial";
    if (window.localStorage.getItem("language") == "en") {
      axios
        .get(process.env.wordpressAPI + "wp/v2/portfolio/" + this.id)
        .then((responses) => {
          
          let en_ID = responses.data.wpml_translations.en_US.id;
          
          axios
            .get(process.env.wordpressAPI + "wp/v2/portfolio/" + en_ID )
            .then((response) => {
              console.log(response.data.acf)              
              this.projet = {
                titre: response.data.title.rendered,
                typeDeProjet: response.data.acf.type_de_projet,
                descriptionDuProjet: response.data.acf.description,
                galery: response.data.acf.gallerie,
                categoryImage: response.data.categories[0],
              };
             
              axios
                .get(
                  process.env.wordpressAPI +
                    "wp/v2/categories/" +
                    this.projet.categoryImage
                )
                .then((response) => {
                 
                  
                  this.imageCategory = response.data.acf.image_associee.url;
                });
            
            });
        });
    } else {
      axios
        .get(process.env.wordpressAPI + "wp/v2/portfolio/" + this.id)
        .then((response) => {
         
          this.projet = {
            titre: response.data.title.rendered,
            typeDeProjet: response.data.acf.type_de_projet,
            descriptionDuProjet: response.data.acf.description,
            galery: response.data.acf.gallerie,
            categoryImage: response.data.categories[0],
          };
          axios
            .get(
              process.env.wordpressAPI + "wp/v2/categories/" + this.projet.categoryImage
            )
            .then((response) => {
             

              this.imageCategory = response.data.acf.image_associee.url;
            });
        
        });
    }
  },
};
</script>

<style scoped lang="scss">
a {
  color: black;
  font-family: "Open Sans";
  p {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  &:hover {
    text-decoration: none;
  }
}
h1 {
  font-weight: 700;
}
p {
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 300;
}
#project_background {
  display: block;
  width: 100%;
  height: auto;
  padding: 0;
  padding-top: 36px;
  padding-bottom: 180px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#projet .container {
  background-color: white;
  margin-top: -5rem;
  border-radius: 5px;
  padding-top: 2rem;
  margin-bottom: 4rem;
}
#projet .container .desc {
  padding-left: 5rem;
}
.img img {
  width: 100%;
}

@media (max-width: 767px) {
  #projet .container .desc {
    padding: 0;
  }
}
</style>
