<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">{{getUser.name}}</h4>
      <md-button class="md-round" disabled :class="getColorButton(buttonColor)"
        >Alterar Foto</md-button
      >
    </md-card-content>
  </md-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./img/default.png"
    },
    buttonColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    }
  },
  computed: {
    ...mapGetters({ getUser: "getUser" }),
  },
};
</script>
<style></style>
