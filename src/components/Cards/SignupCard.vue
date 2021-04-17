<template>
  <md-card class="md-card-signup da-card-signup">
    <slot name="title"></slot>

    <md-card-content>
      <div class="md-layout">
        <slot name="content-left"></slot>
        <slot name="content-right"></slot>
        <slot name="content-center"></slot>
      </div>
    </md-card-content>

    <md-card-actions>
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "signup-card"
};
</script>

<style lang="css">
.da-card-signup{
  margin-top: 0!important;
  margin-bottom: 0!important;
}
</style>
