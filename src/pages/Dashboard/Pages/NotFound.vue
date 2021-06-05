<template >
  <div class="notfound">
    <h1>Página não encontrada</h1>
    <md-button class="md-info" @click="goback()">Voltar</md-button>
  </div>
</template>
<script>
export default {
    methods: {
        goback(){
            this.$router.go(-1);
        }
    },
};
</script>
<style lang="scss">
.notfound {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>