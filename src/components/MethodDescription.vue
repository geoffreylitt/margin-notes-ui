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
          <p>Click a highlighted method to see examples</p>
        </template>
        <!-- <p class="method-description">Todo: fill in description</p> -->
      </div>
      <!-- todo: use a better unique key here-->
      <div v-for="(example, index) in sortedExamples" :key="example.name">
        <div v-if="activeExample == example" class="example active-example">
          <div class="method-example-body">
            <div class="section example-name">
              <EditableText :content="example.name" @update="example.name = $event"></EditableText>
              <!-- <h3 class="example-name">example {{index + 1}}</h3> -->
            </div>
            <div class="section inputs">
              <!-- todo: use a better unique key here-->
              <div v-for="(argument, name) in example.arguments" :key="argument.value">
                <div class="data-example">
                  <div class="data-label" v-bind:title="name" v-bind:class="{ 'real-argument': name != 'return' && name != 'self' }">{{ name }}:</div>
                  <div class="data-contents">
                    <serialized-value v-bind:value="argument"></serialized-value>
                  </div>
                </div>
              </div>
            </div>
            <div class="section return">
              <div class="data-example">
                <div class="data-label return-label">return:</div>
                <div class="data-contents">
                  <serialized-value v-bind:value="example.return_value"></serialized-value>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="example inactive-example">
          <a class="light-link" href="javascript:void(0);" v-on:click="activeExample = example">
            {{ example.name || "example" + (index + 1) }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SerializedValue from './SerializedValue'
  import EditableText from './EditableText'

  export default {
    props: ['examples'],
    components: { SerializedValue, EditableText },
    data: function () {
      return {
        activeExample: this.examples[0]
      }
    },
    watch: {
      examples: function(newExamples, oldExamples) {
        this.activeExample = newExamples[0]

        this.examples.filter(ex => ex.name == null).forEach((example, index) => {
          example.name = "untitled example " + (index + 1)
        })
      }
    },
    computed: {
      sortedExamples: function () {
        // put named examples first
        return this.examples.filter(ex => ex.name.indexOf("untitled") == -1).concat(this.examples.filter(ex => ex.name.indexOf("untitled") != -1))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .examples-container {
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

  h3.example-name {
    color: #999;
    font-size: 16px;
    margin: 0;
    font-weight: normal;
  }

  .method-header {
    margin-bottom: 20px;
  }

  /* individual examples */

  .example {
    border-bottom: solid thin rgb(247, 247, 247);
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

    &.inputs {
      margin-bottom: 15px;
    }

    &.example-name {
      margin-bottom: 20px;
    }
  }

  .data-example {
    margin: 5px 0;
  }

  .data-label {
    display: inline-block;
    width: 90px;
    font-size: 14px;
    color: #999;
    vertical-align: top;
    text-align: right;
    font-style: italic;
    margin-top: 1px;

    /* truncate long names */
    text-overflow: ellipsis;
    overflow-x: hidden;

    &.real-argument {
      font-style: normal;
    }
  }

  .data-contents {
    display: inline-block;
    margin-left: 15px;
  }

  a.light-link,
  a.light-link:hover,
  a.light-link:active,
  a.light-link:visited,
  a.light-link:focus {
    display: block;
    text-decoration: none;
    color: #ccc;
    width: 100%;
    margin: 0;
    padding: 7px 0;
  }

  a.light-link:hover {
    color: rgb(83, 83, 83);
    background-color: rgb(241, 241, 241);
  }

  a.examples-list-link.active {
    font-weight: bold;
    color: #aaa;
  }
</style>
