<template>
  <span>{{ serializedValue }}</span>
</template>

<script>
  export default {
    props: ['value'],
    computed: {
      serializedValue: function () {
        if (this.value === null) {
          return "null";
        } else {
          return this.value;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
