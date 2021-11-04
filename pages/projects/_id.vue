<template>
  <div>
    <div
      id="project_background"
      :style="`background-image:url('http://localhost:1337${projet.categoryImage}')`"
    ></div>
    <div id="projet">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="desc">
              <h1>{{ projet.titre }}</h1>
              <p>{{ projet.typeDeProjet }}</p>
              <p>{{ projet.descriptionDuProjet }}</p>
            </div>
            <div v-for="image in projet.galery" :key="image.id" class="img">
              <img
                :src="`http://localhost:1337${image.formats.large.url}`"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    Project
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      projet: {
        titre: "",
        typeDeProjet: "",
        descriptionDuProjet: "",
        galery: null,
        categoryImage: null,
      },
    };
  },
  mounted() {
    axios.get(`http://localhost:1337/projects/${this.id}`).then((response) => {
      this.projet = {
        titre: response.data.titreDuProjet,
        typeDeProjet: response.data.typeDeProjet,
        descriptionDuProjet: response.data.descriptionDuProjet,
        galery: response.data.Gallery,
        categoryImage:
          response.data.categorypourprojets[0].image.formats.large.url,
      };
      console.log(this.projet);
    });
  },
};
</script>

<style scoped>
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
#projet .container .desc{
    padding-left:5rem;
}
.img img{
    width:100%;
}
</style>