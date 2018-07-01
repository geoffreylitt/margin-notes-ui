<template>
  <div>
    <div class="serialized-value">
      <span>
      <template v-if="showRichObject">
        <VueObjectView v-model="value.value" />
      </template>
      <template v-else>
        {{ serializedValue }}
      </template>
      </span>
    </div>
    <div class="class-name">
      {{ value.class_name }}
    </div>
  </div>
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
        let value = this.value.value
        return (value === Object(value))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .class-name, .serialized-value {
    display: inline-block;
  }

  .class-name {
    font-size: 12px;
    color: #cacaca;
    margin-left: 5px;
  }

  .serialized-value {
    max-width: 200px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  }

  .vue-object-view {
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  }
</style>
