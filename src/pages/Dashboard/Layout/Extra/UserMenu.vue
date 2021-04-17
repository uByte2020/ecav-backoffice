<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          {{ user? user.name:'Undefined' }}
        </span>
      </a>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");

export default {
  components: {
    // CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: "Tania Andrew"
    },
    avatar: {
      type: String,
      default: "./img/default.png"
    }
  },
  data() {
    return {
      isClosed: true
    };
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  },
  computed:{
    ...mapGetters({ user: "getUser" }),
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
