<template>
  <div class="demo">
    <div class="video-demo" v-if="!interactive">
      <video controls preload="auto" muted="" data-video="0" v-bind:src="videoPath">
      </video>
    </div>
    <div class="interactive-demo" v-if="interactive">
      <div class="code-container"></div>
      <div class="code-sidebar">
        <!-- Pass in active examples to the method description component -->
        <method-description v-bind:examples="examplesForCurrentMethod" ></method-description>
      </div>
    </div>
    <div>
      <a href="#" class="interact-link" v-bind:class="{ selected: !interactive }" v-on:click="switchToVideo">video demo</a>
      <a href="#" class="interact-link" v-bind:class="{ selected: interactive }" v-on:click="switchToInteractive">interactive demo</a>
    </div>
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
      switchToVideo: function (e) {
        e.preventDefault()
        this.interactive = false
      },
      switchToInteractive: function (e) {
        e.preventDefault()
        this.interactive = true
      },
      renderCodeEditor: function () {
        this.codeEditor = CodeMirror(this.$el.querySelector(".code-container"), {
            value: this.code,
            mode:  "ruby",
            readOnly: true
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
            let cursor = cm.getCursor()
            this.lineNumber = cursor.line
          }
        )
      }
    },
    mounted () {
      if(this.interactive) {
        this.renderCodeEditor();
      }
    },
    watch: {
      code: function(newCode, oldCode) {
        this.codeEditor.setValue(newCode)
      },
      interactive: function(newInteractive, oldInteractive) {
        if(newInteractive) {
          Vue.nextTick(() => {
            this.renderCodeEditor();
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
    border: solid thin #ddd;
    margin: 20px 0 50px 0;
  }

  .interactive-demo {
    height: 400px;
  }

  .interactive-demo, .video-demo {
    margin-bottom: 10px;
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
  }

  a.interact-link {
    font-size: 14px;
    margin-right: 5px;

    &, &:hover, &:active, &:focus {
      text-decoration: underline;

      &.selected {
        text-decoration: none;
        color: black;
      }
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
