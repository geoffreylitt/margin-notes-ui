<template>
  <div class="demo">
    <div class="code-container"></div>
    <div class="code-sidebar">
      <!-- Pass in active examples to the method description component -->
      <method-description v-bind:examples="examplesForCurrentMethod" ></method-description>
    </div>
  </div>
</template>

<script>
  import MethodDescription from './MethodDescription'

  import _ from 'lodash'
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/ruby/ruby.js'

  export default {
    name: 'Demo',
    components: { MethodDescription },
    props: ['code', 'examples', 'filename'],
    data () {
      return {
        codeEditor: null,
        currentMethod: {
          class_name: this.examples[0].class_name,
          method_name: this.examples[0].method_name
        },
        lineNumber: 1
      }
    },
    mounted () {
      this.codeEditor = CodeMirror(this.$el.querySelector(".code-container"), {
        value: this.code,
        mode:  "ruby"
      })

      let lineNumbers = _.uniq(
        this.examples.
          filter(e => e.method_location[0] == this.filename).
          map(e => e.method_location[1])
        )

      lineNumbers.forEach(lineNumber => {
        this.codeEditor.addLineClass(lineNumber, 'wrap', 'highlighted-line')
      })

      this.codeEditor.on("cursorActivity", cm => {
        var cursor = cm.getCursor()
        this.lineNumber = cursor.line
      })
    },
    watch: {
      code: function(newCode, oldCode) {
        this.codeEditor.setValue(newCode)
      }
    },
    computed: {
      examplesForCurrentMethod: function () {
        return this.examples.filter(example => 
          example.method_location[0] === this.filename &&
          example.method_location[1] === this.lineNumber
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo {
    max-width: 1024px;
    height: 500px;
    border: solid thin #ddd;
  }

  .code-container {
    float: left;
    vertical-align: top;
    width: 60%;
    height: 100%;
  }

  .code-sidebar {
    float: left;
    vertical-align: top;
    width: 40%;
    height: 100%;
    overflow: hidden;
  }
</style>

<style>
  .CodeMirror {
    height: 100%;
  }

  .highlighted-line {
    background-color: rgb(255, 253, 221);
    cursor: pointer;
  }

  .highlighted-line:hover {
    background-color: rgb(255, 251, 190);
    font-weight: bold;
  }

  span.cm-def {
    cursor: pointer;
  }

  span.cm-def:hover {
    font-weight: bold;
  }
</style>
