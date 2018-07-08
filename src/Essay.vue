<template>
  <div id="essay">
    <p class="note">Work-in-progress, please don't share publicly.</p>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

# Margin Notes: Code With a Side of Data

If you're in the habit of programming computers like I am, you probably spend lot of time reading code. Whether it's reviewing a pull request, skimming the source of a library in Github, or reading our own systems as we create them—reading source code and internalizing the described behavior is an essential part of what programmers do.

Unfortunately, much of the time and effort we spend reading code is **totally wasted**. We usually read code in static environments that only display the text content of the code, which then puts the burden on us readers to play computer in our heads. We pore over sequences of instructions, laboriously simulating what the computer will do, imagining inputs and outputs and data structures being transformed.

When you really think about it, this makes absolutely no sense! We're millions of times slower and substantially less accurate than computers at running code—that's why we invented computers in the first place. And yet, we routinely make no use of the power of computers in the process of reading code for our own understanding. Maybe this simulation approach made sense in a bygone era where computing power was scarce and programs were precious punch cards to be submitted for overnight evaluation, but today it's no longer necessary for us to expend energy on this pursuit of mental simulation.

As Bret Victor points out in Learnable Programming, it's absolutely possible to design dynamic programming environments that show us what the computer is doing with our code, so we can spend our scarce focus on other things. This essay is about my attempt at one such environment, which I call Margin Notes.

Margin Notes shows you real examples of data recorded during previous runs of a program, right next to the code itself. I'll claim that this small change can make it easier to understand code as you read, reduce the need for manual documentation, and integrate easily with the way we already do programming today.

## Seeing the board

Here's some Ruby code I wrote as part of a Game class in a tic-tac-toe game. The to_s method returns a string representation of a Game object, for printing out to a terminal. See if you can figure out what its output looks like.

    class Game
      # A string representation of the board state.
      def to_s
        @squares.map do |row|
          row.map { |square| " " + (square || " ") + " " }.join("|")
        end.join("\n------------\n")
      end
    end

All things considered, this is a pretty short method, but even for reading something this simple, there are some mental gymnastics involved. The method returns a transformed version of the instance variable `@squares` , so we'll first need to go hunt down all the places where that variable gets set and understand the values it can take on. Once we figure that out, we need to keep track of two layers of mapping over lists and joining them back together, all while remembering the structure of `@squares`. If you're a skilled programmer you might be able to do all this, but that doesn't mean it's a good use of your time.

Here's how Margin Notes answers the question, "what does this method's output look like?":

![](margin-notes-1.gif)

Much easier, right? These are examples of actual output that happened in the course of a tic-tac-toe game that I played using this program. Margin Notes takes care of automatically recording all these examples as a program runs, and then displaying them next to the code for easy access.

This isn't rocket science—you could do this all yourself if you got the program running and inserted a debugger to inspect some state. But let's be honest, you rarely or never do that because it's so cumbersome. Margin Notes simply makes it much easier to access examples of real data that appeared when a program ran.

## More examples of examples

Let's take a look at some other examples.

      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    ></demo>

    <h1>Under construction</h1>

    <p class="note">Still working on this stuff!</p>

    <h3>Money</h3>

    <p>Examples from running tests against an open source library:</p>

    <demo
    v-bind:code="presets.money.code"
    v-bind:examples="presets.money.data"
    v-bind:filename="presets.money.filename"
    ></demo>

    <h3>Hashes</h3>

    <p>Examples of rich objects like nested hashes</p>

    <demo
    v-bind:code="presets.hash.code"
    v-bind:examples="presets.hash.data"
    v-bind:filename="presets.hash.filename"
    ></demo>


        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <hr>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />



    <h1>Margin Notes: Reading code with the data</h1>
    <p>BostonRB demo</p>

    <h2>Fibonacci</h2>

    <demo
    v-bind:code="presets.fibonacci.code"
    v-bind:examples="presets.fibonacci.data"
    v-bind:filename="presets.fibonacci.filename"
    ></demo>

    <br /><br /><br /><br /><br />

    <h2>Tic-tac-toe</h2>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    ></demo>

    <br /><br /><br /><br /><br />

    <h2>ruby-money</h2>

    <demo
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
