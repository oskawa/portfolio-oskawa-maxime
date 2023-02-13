<template>
  <div id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-12 imageLeft">
          <img :src="`${img}`" />
        </div>
        <div class="col-md-1 col-lg-6 col-12 texteRight">
          <h1>{{ title }}</h1>
          <!-- First, we make sure we don't have a bot -->
          <div v-if="isBot" class="">
            Great! You have proven to be a bot! I've destroyed the form from the page, and
            acted like you successfully sent the form.
          </div>
          <!-- Then we show the rest of the component if not. -->
          <div v-else>
            <div v-if="success" class="">
              Great! Your message has been sent successfully. I will try to respond
              quickly.
            </div>
            <form v-else v-on:submit.prevent="sendMessage" class="">
              <div v-if="errored" class="">
                Bummer, Something went wrong. Did you fill out all of the fields?
              </div>
              <div class="labelInput">
                <label for="full_name" class="">Full name*</label>

                <input
                  v-model="name"
                  required
                  name="name"
                  id="full_name"
                  class="form-input"
                />
              </div>
              <!-- The whole field and label is set to display hidden with Tailwind CSS -->

              <div class="labelInput">
                <label for="email">Email*</label>

                <input
                  required
                  v-model="email"
                  name="email"
                  id="email"
                  type="email"
                  class=""
                />
              </div>
              <div class="labelInput">
                <label for="phone">Phone</label>

                <input v-model="phone" name="phone" id="phone" class="form-input" />
              </div>
              <div class="labelInput">
                <label for="message">Message</label>

                <textarea
                  required
                  v-model="message"
                  name="message"
                  id="message"
                  rows="4"
                  class="form-input"
                ></textarea>
              </div>
              <div class="invisible">
                <label> Don’t fill this out if you're human: </label>
                <input
                  v-model="bot"
                  name="bot-field"
                  placeholder="This field is only for the robots."
                  class="form-input"
                />
              </div>
              <div class="">
                <span class="">
                  <button type="submit" class="btn_stroke submit">
                    {{ loading ? "Sending Message..." : "Submit" }}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "Portfolio Maxime Eloir - Contact",
      meta: [
        {
          name: "description",
          content: "You can contact me if you want to collaborate :)",
          hid: "description",
        },
      ],
    };
  },
  layout: "black",
  data() {
    return {
      title: "",
      img: null,
      loading: false,
      success: false,
      errored: false,
      isBot: false,
      name: "",
      bot: null,
      email: "",
      phone: "",
      message: "",
      renderer: null,
    };
  },

  mounted() {
    if (this.renderer !== null) {
      this.renderer.domElement = null;

      this.renderer = null;
    }
    document.body.style.overflow = "initial";

    if (window.localStorage.getItem("language") == "en") {
      axios.get(process.env.wordpressAPI + "wp/v2/pages/43").then((responses) => {
        let en_ID = responses.data.wpml_translations.en_US.id;
        axios.get(process.env.wordpressAPI + "wp/v2/pages/" + en_ID).then((responses) => {
          this.img = responses.data.acf.contact_image.sizes.large;
        });
      });
    } else {
      document.body.style.overflowY = "initial";
      document.body.style.overflowX = "hidden";

      axios
        .get(process.env.wordpressAPI + "wp/v2/pages/43")
        .then((responses) => {
          this.img = responses.data.acf.contact_image.sizes.large;
        })

        .catch((errors) => {
          // react on errors.
        });
    }
  },
  methods: {
    sendMessage() {
      this.loading = true;
      /* This is where I check if the bot field has a value. 
         Only bots will fill this out. */
      if (this.bot != null) {
        this.isBot = true;
      }
      // Otherwise the form will try to go through.
      else {
        console.log("hello");
        const emailBody = {
          "your-name": this.name,
          "your-email": this.email,
          "your-message": this.message,
        };

        const form = new FormData();
        for (const field in emailBody) {
          form.append(field, emailBody[field]);
        }
        console.log(form)

        axios
          .post(
            "https://portfolio-maxime-back.maxime-eloir.fr/wp-json/contact-form-7/v1/contact-forms/166/feedback",
            form,
            {
              headers: {
                "content-type": "multipart/form-data",
                
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.success = true;
            this.errored = false;
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
#contact {
  margin-top: 5rem;
  h1 {
    font-family: "Open Sans", sans-serif;
    font-weight: 800;
    font-size: 30px;
    margin-bottom: 50px;
  }
  label {
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
    font-weight: 600;
    width: 81%;
  }
  input,
  textarea {
    border: none;
    border-bottom-color: currentcolor;
    border-bottom-style: none;
    border-bottom-width: medium;
    border-bottom: 1px solid black;
    width: 100%;
  }
  input:focus {
    border: none;
    outline: none;
  }

  img {
    width: 100%;
    position: relative;
    height: 550px;
    object-fit: cover;
  }
  .imageLeft {
    &:before {
      content: "";
      position: absolute;
      bottom: -10px;
      left: -20px;
      right: -20px;
      height: 550px;
      z-index: -1;
      width: 90%;
      background-color: #2e475e;
    }
  }
}
.labelInput {
  margin-bottom: 1rem;
}
</style>
