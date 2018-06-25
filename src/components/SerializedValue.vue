<template>
  <span>
  <template v-if="showRichObject">
    <VueObjectView v-model="value.value" />
  </template>
  <template v-else>
    {{ serializedValue }}
  </template>
  </span>
</template>

<script>
  import VueObjectView from 'vue-object-view'

  export default {
    props: ['value'],
    components: { VueObjectView },
    computed: {
      serializedValue () {
        if (this.value.value === null) {
          return "null";
        } else {
          return this.value.value;
        }
      },
      showRichObject () {
        return (this.value.class_name === "Hash")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
