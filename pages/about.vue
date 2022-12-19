<template>
  <div>
    <div id="about">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-5 zIndex_about">
            <h1 data-aos="fade-right" data-aos-duration="1500">{{ title }}</h1>
            <p v-html="presentation"></p>
          </div>
          <div class="col-12 col-lg-5 offset-md-1 col_about">
            <img :src="`${img1}`" alt="" class="img_About" />
          </div>
        </div>
      </div>
    </div>

    <div id="competences">
      <div class="container-fluid">
        <div class="row">
          <div id="scroll" class="wrapper text">
            <p>
              <svg>
                <text x="0" y="100">
                  AdobeXD Wordpress NuxtJS NodeJS Javascript Figma Php
                </text>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="experiences">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-5 colExperiences">
            <img
              v-for="experience in experiences"
              :key="experience.id"
              v-show="experience.active"
              :src="`${experience.image_associee.url}`"
              alt=""
              class="imgExperiences"
            />
          </div>
          <div class="col-12 col-lg-5 offset-md-1 zIndex_about">
            <h2>{{ titleExperiences }}</h2>

            <ul class="experiences_Liste">
              <li v-for="experience in experiences" :key="experience.id">
                <div class="texte">
                  <button v-on:click="toggleActive(experience)" class="accordeon">
                    <h3>{{ experience.titre_de_lexperience }}</h3>
                    <div class="separation">
                      <span class="ligne"></span>
                      <span class="rond"></span>
                    </div>
                  </button>
                  <div v-if="experience.active">
                    <p v-html="experience.description_de_lexperience"></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "black",
  head() {
    return {
      title: "Portfolio Maxime Eloir - About",
      meta: [
        {
          name: "description",
          content:
            "Discover the cursus of Maxime Eloir : why you need to choose him, why you need to have his smile in your business !",
          hid: "description",
        },
      ],
    };
  },
  data() {
    return {
      title: "",
      presentation: "",
      img1: "",
      titleExperiences: "",
      experiences: {},
      isActive: false,
    };
  },
  methods: {
    toggleActive: function (item) {
      this.experiences.forEach((element) => {
        element.active = false;
      });
      item.active = !item.active;
      console.log(item);
      this.isActive = true;
    },
  },
  mounted() {
    if (window.localStorage.getItem("language") == "en") {
      axios
        .get(process.env.wordpressAPI + "wp/v2/pages/40")
        .then((responses) => {
          let en_ID = responses.data.wpml_translations.en_US.id
          axios
          .get(process.env.wordpressAPI + "wp/v2/pages/"+ en_ID)
          .then((responses)=>{
            const responseOne = responses;
          console.log(responseOne.data.acf);
          this.title = responseOne.data.title.rendered;
          this.presentation = responseOne.data.acf.texte_de_presentation;
          this.img1 = responseOne.data.acf.image_de_profil.url;
          // this.titleExperiences = responseOne.data.Sectionexperiences;
          this.experiences = responseOne.data.acf.experiences_professionnelles;
          })
          
        })
    } else {
      document.body.style.overflowY = "initial";
      document.body.style.overflowX = "hidden";
      console.log(process.env.wordpressAPI + "wp/v2/pages/40");
      axios
        .get(process.env.wordpressAPI + "wp/v2/pages/40")
        .then((responses) => {
          console.log(responses);
          const responseOne = responses;
          console.log(responseOne.data.acf);
          this.title = responseOne.data.title.rendered;
          this.presentation = responseOne.data.acf.texte_de_presentation;
          this.img1 = responseOne.data.acf.image_de_profil.url;
          // this.titleExperiences = responseOne.data.Sectionexperiences;
          this.experiences = responseOne.data.acf.experiences_professionnelles;
        })

        .catch((errors) => {
          // react on errors.
        });
    }
  },
};
</script>

<style lang="scss">
#competences {
  margin: 3rem 0;
  position: relative;
  height: 100px;
  #scroll {
    position: absolute;
    left: -100px;
    width: 100%;
    p {
      font-family: "Open Sans";
      font-weight: 800;
      font-size: 50px;
      svg {
        display: block;
        width: 100%;
        text {
          fill: white;
          stroke: black;
          stroke-width: 1;
        }
      }
    }
  }
}

.col_about {
  &:before {
    content: "";
    position: absolute;
    bottom: -20px;
    left: -20px;
    right: -20px;
    height: 550px;
    z-index: -1;
    width: 90%;
    background-color: #2e475e;
  }
}
.img_About {
  width: 100%;
  height: 550px;
  object-fit: cover;
  box-shadow: rgb(0 0 0/24%);
}
#experiences {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.experiences_Liste {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
.colExperiences {
  &:before {
    content: "";
    position: absolute;
    bottom: -20px;

    right: -15px;
    height: 550px;
    z-index: -1;
    width: 90%;
    background-color: #2e475e;
  }
}
button {
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  h3 {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 17px;
    text-align: left;
  }
  .separation {
    position: relative;
    width: 350px;
    .ligne {
      width: 100%;
      height: 2px;
      margin: auto;
      background: black;
      display: block;
      min-height: 2px;
    }
    .rond {
      width: 26px;
      height: 26px;
      border-radius: 25px;
      border: 2px solid black;
      display: block;
      color: white;
      font-weight: 800;
      text-align: center;
      line-height: 50px;
      position: absolute;
      right: -25px;
      top: -12px;
    }
  }
}

.imgExperiences {
  width: 100%;
  position: relative;
  height: 550px;
  object-fit: cover;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}
#about {
  h1 {
    font-family: "Open Sans", sans-serif;
    font-weight: 800;
    font-size: 30px;
  }
  p {
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
    line-height: 1.4;
  }
}
#experiences {
  h2 {
    font-family: "Open Sans", sans-serif;
    font-weight: 800;
    font-size: 30px;
    margin-bottom: 2rem;
  }
  .texte {
    .accordeon {
      margin-bottom: 1rem;
    }
    p {
      margin-top: 1rem;
    }
  }
}
</style>
