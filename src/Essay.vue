<template>
  <div id="essay">
    <h1>Automatic documentation with examples</h1>

    <p>We read a lot of code.</p>
    <p>Documentation is helpful...</p>
    <p>but expensive</p>
    <p>We can get automatic docs from example runs</p>

    <p>Here's a simple example with one method:</p>

    <demo id="demo-fib"
    v-bind:code="presets.fibonacci.code"
    v-bind:examples="presets.fibonacci.data"
    v-bind:filename="presets.fibonacci.filename"
    ></demo>
    
    <h2>Tic Tac Toe</h2>

    <demo id="demo-tictactoe"
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    ></demo>

    <h2>Hashes</h2>

    <demo id="demo-tictactoe"
    v-bind:code="presets.hash.code"
    v-bind:examples="presets.hash.data"
    v-bind:filename="presets.hash.filename"
    ></demo>
  </div>
</template>

<script>
import Demo from './components/Demo'
import presets from './presets'

export default {
  name: 'Essay',
  components: {
    Demo 
  },
  data () {
    return {
      presets: presets
    }
  }
}
</script>

<style>
#essay {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 1024px;
  margin-left: 100px;
  margin-right: 50px;
}
</style>
