<template>
  <div id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 offset-md-1 col-12 imageLeft">
          <img :src="`http://localhost:1337${img}`" />
        </div>
        <div class="col-lg-6 col-12 texteRight">
          <h1>{{ title }}</h1>
          <!-- First, we make sure we don't have a bot -->
          <div v-if="isBot" class="">
            Great! You have proven to be a bot! I've destroyed the form from the
            page, and acted like you successfully sent the form.
          </div>
          <!-- Then we show the rest of the component if not. -->
          <div v-else>
            <div v-if="success" class="">
              Great! Your message has been sent successfully. I will try to
              respond quickly.
            </div>
            <form v-else v-on:submit.prevent="sendMessage" class="">
              <div v-if="errored" class="">
                Bummer, Something went wrong. Did you fill out all of the
                fields?
              </div>
              <div>
                <label for="full_name" class="sr-only">Full name*</label>
                <div class="">
                  <input
                    v-model="name"
                    required
                    name="name"
                    id="full_name"
                    class="form-input"
                    placeholder="Full name*"
                  />
                </div>
              </div>
              <!-- The whole field and label is set to display hidden with Tailwind CSS -->
              <div class="invisible">
                <label class="sr-only"
                  >Don’t fill this out if you're human:
                </label>
                <input
                  v-model="bot"
                  name="bot-field"
                  placeholder="This field is only for the robots."
                  class="form-input"
                />
              </div>
              <div>
                <label for="email" class="sr-only">Email*</label>
                <div class="relative rounded-md shadow-sm">
                  <input
                    required
                    v-model="email"
                    name="email"
                    id="email"
                    type="email"
                    class=""
                    placeholder="Email*"
                  />
                </div>
              </div>
              <div>
                <label for="phone" class="sr-only">Phone</label>
                <div class="relative rounded-md shadow-sm">
                  <input
                    v-model="phone"
                    name="phone"
                    id="phone"
                    class="form-input"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div>
                <label for="message" class="sr-only">Message</label>
                <div class="">
                  <textarea
                    required
                    v-model="message"
                    name="message"
                    id="message"
                    rows="4"
                    class="form-input"
                    placeholder="Message*"
                  ></textarea>
                </div>
              </div>
              <div class="">
                <span class="">
                  <button type="submit" class="">
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
    };
  },
  mounted() {
    let one = "https://back-portf.herokuapp.com/contact";

    const requestOne = axios.get(one);

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];

          this.title = responseOne.data.Titre;
          this.img = responseOne.data.Image.formats.large.url;

          // use/access the results
        })
      )
      .catch((errors) => {
        // react on errors.
      });
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
        axios
          .post("http://localhost:1337/messages", {
            name: this.name,
            email: this.email,
            phone: this.phone,
            message: this.message,
          })
          .then((response) => {
            this.success = true;
            this.errored = false;
          })
          .catch((error) => {
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
      bottom: -30px;
      left: -20px;
      right: -20px;
      height: 550px;
      z-index: -1;
      width: 90%;
      background-color: #2e475e;
    }
  }
}
</style>