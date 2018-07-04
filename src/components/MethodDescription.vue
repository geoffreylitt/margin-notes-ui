<template>
  <div class="examples-container">
    <div class="examples-inner-container">
      <div class="method-header">
        <template v-if="activeExample !== undefined">
          <h1 class="method-name">
            {{ activeExample.class_name }}#{{ activeExample.method_name }}
          </h1>
        </template>
        <template v-else>
          <p>Click a highlighted row to see docs</p>
        </template>
        <!-- <p class="method-description">Todo: fill in description</p> -->
      </div>
      <!-- todo: use a better unique key here-->
      <div v-for="example in examples" :key="example.method">
        <div v-if="activeExample == example" class="example active-example">
          <div class="method-example-body">
            <div class="section inputs">
              <!-- todo: use a better unique key here-->
              <div v-for="(argument, name) in example.arguments" :key="argument.value">
                <div class="data-example">
                  <div class="data-label" v-bind:title="name">{{ name }}</div>
                  <div class="data-contents">
                    <serialized-value v-bind:value="argument"></serialized-value>
                  </div>
                </div>
              </div>
            </div>
            <div class="section return"></div>
              <div class="data-example">
                <div class="data-label return-label">return</div>
                <div class="data-contents">
                  <serialized-value v-bind:value="example.return_value"></serialized-value>
                </div>
              </div>
            <!-- todo
              <div class="section callstack"></div>
            -->
          </div>
        </div>
        <div v-else class="example inactive-example">
          <a class="light-link" href="javascript:void(0);" v-on:click="activeExample = example">
            <!-- todo: rather than printing raw strings, make a condensed view of serialized_value -->
            <template v-for="(argument, name) in example.arguments">
              {{ name }} = {{argument.value}}
            </template>
            return = {{ example.return_value.value }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SerializedValue from './SerializedValue'

  export default {
    props: ['examples'],
    components: { SerializedValue },
    data: function () {
      return {
        activeExample: this.examples[0]
      }
    },
    watch: {
      examples: function(newExamples, oldExamples) {
        this.activeExample = newExamples[0]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .examples-inner-container {
    padding: 20px;
    border-top: none;
    font-family: "Helvetica Neue", sans serif;
  }

  h1.method-name, p.method-description {
    margin: 0;
  }

  h1.method-name {
    font-size: 24px;
  }

  .method-header {
    margin-bottom: 20px;
  }

  /* individual examples */

  .example {
    padding: 3px 0;
    border-bottom: solid thin #ddd;
  }

  /* individual inactive examples */

  .inactive-example {
    color: #ccc;
  }

  /* individual active examples */

  .active-example {
    padding: 10px 0;
  }

  .method-example-body .section {
    margin-bottom: 10px;
  }

  .data-label {
    display: inline-block;
    width: 90px;
    font-size: 14px;
    font-weight: bold;
    color: #999;
    text-align: right;
    margin-right: 15px;

    /* truncate long names */
    text-overflow: ellipsis;
    overflow-x: hidden;
    vertical-align: middle;

    &.return-label {
      text-decoration: underline;
    }
  }

  .data-contents {
    display: inline-block;
    width: 240px;
  }

  a.light-link,
  a.light-link:hover,
  a.light-link:active,
  a.light-link:visited,
  a.light-link:focus {
    text-decoration: none;
    color: #ccc;
  }

  a.light-link:hover {
    color: #bbb;
  }

  a.examples-list-link.active {
    font-weight: bold;
    color: #bbb;
  }
</style>
