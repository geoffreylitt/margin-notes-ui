<template>
  <div>
    <div class="serialized-value">
      <span>
      <template v-if="showRichObject">
        <VueObjectView v-model="value.value" class="rich-object" />
      </template>
      <template v-else>
        <span style="white-space: pre;">{{ serializedValue }}</span>
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
    vertical-align: top;
  }

  .class-name {
    font-size: 12px;
    color: #cacaca;
    margin: 2px 0 0 5px;
    vertical-align: top;
  }

  .serialized-value {
    max-width: 350px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  }

  .vue-object-view.rich-object {
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  }
</style>
