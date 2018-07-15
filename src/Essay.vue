<template>
  <div id="essay">
    <p class="note">Work-in-progress, please don't share publicly.</p>

<h1>Margin Notes: Code with a side of data</h1>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">


by Geoffrey Litt

# Introduction

Most programmers today use underpowered tools. In particular, we read and write code in static environments that don't include any visibility into runtime behavior. This imposes an unnecessary and taxing burden on us programmers to simulate the computer in our heads.

There have been numerous compelling demonstrations of how incorporating runtime visualizations into code editing can make it easier to program, but most professional programmers still aren't using tools with these capabilities.

My goal in this essay is to nudge the expert programming community towards considering these ideas, by demonstrating an approach for incorporating data from runtime into code editing in a way that would be immediately useful to expert professional programmers collaborating on a large codebase.

I hope to balance radicalism and incrementalism—on the one hand, this approach is inspired by the radical rethinking of the relationship between code and runtime, but on the other hand, it's inspired by proven practices that expert programmers have already found useful, and it incorporates considerations of how this tool would be deployed into existing tools for editing code.

The approach is a tool called Margin Notes. It records examples of method arguments and return values while a program is running, and displays those examples next to the code. It's best illustrated with a quick example:

## An example

Here's some Ruby code I wrote as part of a Game class in a tic-tac-toe game. The to_s method returns a string representation of a Game object, for printing out to a terminal. See if you can figure out what its output looks like.

    class Game
      # A string representation of the board state.
      def to_s
        @squares.map do |row|
          row.map { |square| " " + (square || " ") + " " }.join("|")
        end.join("\n------------\n")
      end
    end

Even if you're an expert Ruby programmer, there are some mental gymnastics involved in understanding this code snippet. The method depends on the instance variable `@squares` , so we need to go hunt down the places where that variable gets mutated and understand what it typically contains. Then, we need to keep track of two layers of mapping over lists and joining them back together, all while remembering the structure of `@squares`.

Margin Notes more efficiently answers the question "what does this method's output look like?" by simply showing you a real example of output from this method that happened during a game:


      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    v-bind:video-path="require('./assets/tic-tac-toe-tos.mp4')"
    default-line-number="42"
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
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 1024px;
  margin-left: 100px;
  margin-right: 50px;

  .prose {
    max-width: 600px;

    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }
  }

  .note {
    color: red;
    font-style: italic;
  }
}
</style>
