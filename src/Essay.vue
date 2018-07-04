<template>
  <div id="essay">
    <p class="note">Work-in-progress, please don't share.</p>
    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

# Margin Notes
## Read the data with the code

As developers, we spend a lot of time reading code: in text editors, on Github, etc.
Often we spend a large portion of our effort imagining the data that could be
present in the program at various points.

Take this example from a tic-tac-toe program I wrote in Ruby:

```ruby
  # returns true if the given player has won the game
  def won?(player)
    return true if won_row?(player)
    return true if won_column?(player)
    return true if won_diagonal?(player)
    return false
  end
```

What values get passed in as the `player` argument here?
Perhaps an instance of some `Player` class? Or maybe a hash?
In a dynamic language like Ruby our IDE can't statically
answer this question for us.
One thing we can do is write comments hinting at types:

```ruby
  # @param player [Integer] A number for a player
  # @return [Boolean] whether the given player won
  def won?(player)
    return true if won_row?(player)
    return true if won_column?(player)
    return true if won_diagonal?(player)
    return false
  end
```

Now we know that player is supposed to be an integer!
This is valuable information, but
it still doesn't tell us everything we need to know to confidently
write code that uses this data.
What values could these player integers take? are they database IDs? 1 and 2?
The type alone doesn't tell us more detailed information about the data.
And not only that, these comments get out of date and are tedious
to write in the first place.

      </vue-markdown>
      <p class="note">todo: find a better introductory example</p>
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

### Examples to the rescue

This essay is about a system that helps us read code by
giving us more detailed information about the data in our programs,
without making us do even more tedious documentation work.

The idea is simple: whenever we run our programs, there are
tons of actual data values present in our variables.
By recording examples of these actual values and making it
easy to see some of these examples while reading the code,
we can better understand the types of data that appear in practice.

Here's a demo of how it works on a simple example, a program
for computing a number in the fibonacci sequence.
Try clicking on the `fib` method to see some examples of inputs
and outputs for that method.
      </vue-markdown>
      <p class="note">todo: improve UI for method selection</p>
    </div>

    <demo id="demo-fib"
    v-bind:code="presets.fibonacci.code"
    v-bind:examples="presets.fibonacci.data"
    v-bind:filename="presets.fibonacci.filename"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

Those `fib` examples came from recording a single function call `fib(10)`,
which generated a bunch of recursive calls to the `fib` function
with different inputs.

### Tic-tac-toe

Here's an example for a more complicated program,
the tic-tac-toe program from earlier.

The examples shown are from recording a single game.
See if you can find the `won?` method and answer the
question of what values `player` can take on.

      </vue-markdown>
    </div>

    <demo id="demo-tictactoe"
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    ></demo>

    <h1>Under construction</h1>

    <p class="note">Still working on this stuff!</p>

    <h3>Money</h3>

    <p>Examples from running tests against an open source library:</p>

    <demo id="demo-tictactoe"
    v-bind:code="presets.money.code"
    v-bind:examples="presets.money.data"
    v-bind:filename="presets.money.filename"
    ></demo>

    <h3>Hashes</h3>

    <p>Examples of rich objects like nested hashes</p>

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
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Essay',
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
