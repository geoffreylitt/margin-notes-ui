<template>
  <div class="demo">
    <div class="video-demo" v-if="!interactive">
      <video width="1024" controls preload="auto" muted="" data-video="0" v-bind:src="videoPath">
      </video>
    </div>
    <div class="interactive-demo" v-if="interactive">
      <div class="code-container"></div>
      <div class="code-sidebar">
        <!-- Pass in active examples to the method description component -->
        <method-description v-bind:examples="examplesForCurrentMethod" ></method-description>
      </div>
    </div>
    <a href="#" class="interact-link" v-on:click="toggleInteractive">
      <span v-if="!interactive">try it out!</span>
      <span v-if="interactive">back to video</span>
    </a>
  </div>
</template>

<script>
  import MethodDescription from './MethodDescription'

  import _ from 'lodash'
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/ruby/ruby.js'

  import Vue from 'vue'

  export default {
    name: 'Demo',
    components: { MethodDescription },
    props: ['code', 'examples', 'filename', 'videoPath', 'defaultLineNumber'],
    data () {
      return {
        codeEditor: null,
        currentMethod: {
          class_name: this.examples[0].class_name,
          method_name: this.examples[0].method_name
        },
        lineNumber: 1,
        interactive: false
      }
    },
    methods: {
      toggleInteractive: function (e) {
        e.preventDefault()
        this.interactive = !this.interactive
      }
    },
    mounted () {

    },
    watch: {
      code: function(newCode, oldCode) {
        this.codeEditor.setValue(newCode)
      },
      interactive: function(newInteractive, oldInteractive) {
        if(newInteractive) {
          Vue.nextTick(() => {
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

            this.codeEditor.scrollIntoView({line: this.defaultLineNumber, ch: 0})

            this.codeEditor.on("cursorActivity", cm => {
              var cursor = cm.getCursor()
              this.lineNumber = cursor.line
            })
          })
        }
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
<style scoped lang="scss">
  .demo {
    max-width: 1024px;
    height: 350px;
    border: solid thin #ddd;
    margin: 20px 0 50px 0;
  }

  .interactive-demo {
    height: 100%;
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
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f9f9f9;
  }

  .interact-link {
    display: block;
    font-size: 14px;
    margin-top: 10px;

    &, &:hover, &:active, &:focus {
      color: black;
      text-decoration: underline;
    }
  }
</style>

<style>
  .demo .CodeMirror {
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
