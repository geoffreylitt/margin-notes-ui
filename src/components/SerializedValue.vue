<template>
  <div>
    <div class="serialized-value">
      <span>
      <template v-if="showRichObject">
        <vue-json-pretty
          v-bind:data="value.value"
          deep=0>
        </vue-json-pretty>
      </template>
      <template v-else>
        <span style="white-space: pre;" v-bind:class="primitiveClass">{{ serializedValue }}</span>
      </template>
      </span>
    </div>
    <div class="class-name">
      {{ value.class_name }}
    </div>
  </div>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'

  export default {
    props: ['value'],
    components: { VueJsonPretty },
    computed: {
      primitiveClass () {
        let value = this.value.value

        return {
          "primitive-string": typeof value == "string",
          "primitive-boolean": typeof value == "boolean",
          "primitive-number": typeof value == "number",
          "primitive-null": value == null
        }
      },
      serializedValue() {
        if (this.value.value == null) {
          return "null"
        } else {
          return this.value.value
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
    font-size: 13px;
    color: #b9b9b9;
    margin: 2px 0 0 5px;
    vertical-align: top;
  }

  .serialized-value {
    max-width: 340px;
    font-family: Monaco,Menlo,Consolas,Bitstream Vera Sans Mono, monospace;
    font-size: 14px;

    .primitive-string { color: #13ce66;}
    .primitive-number { color: #1d8ce0; }
    .primitive-boolean { color: #9e00ce; }
    .primitive-null { color: #ff4949; }
  }
</style>

<style lang="scss">
  // Styles not scoped to this component

  .vjs__tree .vjs__value__boolean {
    color: #9e00ce !important;
  }
</style>
