<template>
  <div id="essay">
    <h1>Margin Notes: Reading code with the data</h1>
    <p>by Geoffrey Litt</p>

    <br /><br /><br /><br /><br />

    <h2>Fibonacci</h2>

    <demo id="demo-fib"
    v-bind:code="presets.fibonacci.code"
    v-bind:examples="presets.fibonacci.data"
    v-bind:filename="presets.fibonacci.filename"
    ></demo>

    <br /><br /><br /><br /><br />

    <h2>Tic-tac-toe</h2>

    <demo id="demo-tictactoe"
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    ></demo>

    <br /><br /><br /><br /><br />

    <h2>ruby-money</h2>

    <demo id="demo-money"
    v-bind:code="presets.money.code"
    v-bind:examples="presets.money.data"
    v-bind:filename="presets.money.filename"
    ></demo>

    <br /><br /><br /><br /><br />

  </div>
</template>

<script>
import Demo from './components/Demo'
import presets from './presets'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'BostonRBDemo',
  components: {
    Demo, VueMarkdown
  },
  data () {
    return {
      presets: presets
    }
  }
}
</script>

<style lang="scss">
@import url('prismjs');

#essay {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 1024px;
  margin-left: 100px;
  margin-right: 50px;

  .prose {
    max-width: 600px;
  }

  .note {
    color: red;
    font-style: italic;
  }
}
</style>
