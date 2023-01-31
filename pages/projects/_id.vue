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
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <h1>{{ projet.titre }}</h1>
                  <p>{{ projet.typeDeProjet }}</p>
                </div>
              </div>
            </div>
            <div v-for="content in project.repeatable_content">
              <div
                v-if="content.acf_fc_layout === 'classic_image'"
                class="acf-img-full container-fluid"
              >
                <div class="row acf-img-full__row">
                  <div class="col-12 col-lg-10">
                    <img :src="content.image.url" alt="" />
                  </div>
                </div>
              </div>

              <div
                v-if="content.acf_fc_layout === 'title_text_content'"
                class="acf-text-title container-fluid"
              >
                <div class="row">
                  <div class="col-12">
                    <h3>{{ content.title }}</h3>
                  </div>
                  <div class="col-md-12" v-html="content.content"></div>
                </div>
              </div>

              <div
                v-if="content.acf_fc_layout === 'images_typo'"
                class="acf-img-typo container-fluid"
              >
                <div class="row acf-img-typo__row">
                  <div
                    class="col-md-6 col-12"
                    v-for="typo in content.typo_image_single"
                    :key="typo.ID"
                  >
                    <img :src="typo.sizes.medium_large" alt="" />
                  </div>
                </div>
              </div>
              <div
                v-if="content.acf_fc_layout === 'application_color'"
                class="acf-img-colors container-fluid"
              >
                <div class="row">
                  <div
                    v-for="(color, index) in content.colors"
                    :key="index"
                    :class="index > 1 ? 'col-md-4 col-12' : 'col-md-6 col-12'"
                  >
                    <div
                      class="img-colors__content"
                      :style="`background-color:${color.hexa_color}`"
                    >
                      <span :class="color.is_black ? 'isBlack' : 'isWhite'">{{
                        color.titre
                      }}</span
                      ><br />
                      <span :class="color.is_black ? 'isBlack' : 'isWhite'">{{
                        color.hexa_color
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="content.acf_fc_layout === 'outside_image_grid'"
                class="acf-outside-grid container-fluid"
              >
                <div class="row acf-outside-grid__row">
                  <div
                    class="col-12"
                    v-for="outside_image in content.wireframe_userflow_gallery"
                    :key="outside_image.ID"
                  >
                    <img :src="outside_image.url" alt="" />
                  </div>
                </div>
              </div>
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
      },
      lang: "fr",
      project: [],
    };
  },
  async mounted() {
    console.log(this.lang);
    this.lang = window.localStorage.getItem("language");
    console.log(this.lang);
    document.body.style.overflow = "initial";
    if (window.localStorage.getItem("language") == "en") {
      await axios
        .get(process.env.wordpressAPI + "wp/v2/portfolio/" + this.id)
        .then((responses) => {
          console.log(responses);
          let en_ID = responses.data.wpml_translations.en_US.id;

          axios
            .get(process.env.wordpressAPI + "wp/v2/portfolio/" + en_ID)
            .then((response) => {
              console.log(response.data.acf);
              this.projet = {
                titre: response.data.title.rendered,
                typeDeProjet: response.data.acf.type_de_projet,
                descriptionDuProjet: response.data.acf.description,
                galery: response.data.acf.gallerie,
                categoryImage: response.data.categories[0],
              };
               this.project = response.data.acf;

              axios
                .get(
                  process.env.wordpressAPI +
                    "wp/v2/categories/" +
                    this.projet.categoryImage
                )
                .then((response) => {
                  console.log(response.data.acf.image_associee)
                   this.imageCategory = response.data.acf.image_associee.sizes.large;
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
          this.project = response.data.acf;
          console.log(this.project);
          axios
            .get(
              process.env.wordpressAPI + "wp/v2/categories/" + this.projet.categoryImage
            )
            .then((response) => {
               console.log(response.data.acf.image_associee)
              this.imageCategory = response.data.acf.image_associee.sizes.large;
            });
        });
    }
  },
};
</script>

<style scoped lang="scss">
.acf-img-full__row{
  justify-content: center;
  img{
    border-radius: 15px;
    margin: 1rem 0;
  }
}
.acf-img-typo {
    margin-bottom: 3rem;
}
.acf-img-typo img{
    max-height: 35rem;
    height: 35rem;
    width: 100%;
}

.img-colors__content{
    background-color: #929292;
    width: 100%;
    border-radius: 2rem;
    height: 10rem;
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.img-colors__content .isBlack{
    color: #1a1a1a;
}

.acf-text-title {
  h3 {
    font-weight: 800;
    font-size: 1.3rem;
  }
}
.acf-img-full {
  img {
    width: 100%;
  }
}
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
  background-color: #fbfbfb;
  margin-top: -5rem;
  border-radius: 5px;
  padding-top: 2rem;
  margin-bottom: 4rem;
  -webkit-box-shadow: 0px 8px 20px -5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 8px 20px -5px rgba(0, 0, 0, 0.5);
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
