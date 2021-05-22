<template>
  <div class="md-layout da-layout">
    <div class="md-layout-item">
      <registrar-user-form />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
import {RegitrarUserForm} from "@/pages";
export default {
  components: {
    'registrar-user-form':RegitrarUserForm,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({ loggedIn: "loggedIn" }),
  },
};
</script>
<style>
.da-layout {
  width: 50% !important;
}
</style>
