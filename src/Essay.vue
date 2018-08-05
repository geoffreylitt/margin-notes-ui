<template>
  <div id="essay">
    <div class="prose">
      <p class="note">Work-in-progress, please don't share with others.</p>

      <p class="note">
        Thank you so much for helping me make this better! <br />
      </p>
    </div>

<img class="hero" src="/margin-notes/static/manuscript.jpg"/>
<h1 class="title">Margin Notes</h1>
<h2 class="subtitle">Automatic code documentation with recorded examples from runtime</h2>
<p class="byline">by Geoffrey Litt</p>
    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

Modern programmers spend a lot of time understanding existing code. Whether it's learning to use a library or preparing to modify part of a large codebase, understanding what some code does is just as important as writing new code.

Despite the importance of this activity, understanding what code does is extremely challenging, because **we don't have powerful tools to help us understand what our programs are doing when they run**. We have all sorts of tools for manipulating and viewing the static structure of our source code, but once the program is actually running, we're left in the dark.

Programming tools for beginners tend to focus more on representing runtime behavior. The [Scratch](https://scratch.mit.edu/) programming environment shows a live view of the numerical position and direction of a character, to help children understand how those numbers correspond to the visual representation of the character. Microsoft Excel, perhaps the most popular programming tool for "non-programmers", shows the data flowing through the program, so it's always clear what the formulas are doing. Research projects like [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/) have explored even more powerful tools to help beginners understand their programs.

      </vue-markdown>
      <figure>
        <video controls src="/margin-notes/static/scratch-runtime.mp4" />
        <figcaption>In Scratch, the numbers update as the character moves</figcaption>
      </figure>
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

But there aren't many tools like this for advanced programmers. The best tools we have for seeing inside our programs are debuggers, which tend to only be used for "fixing bugs," or reconciling the programmer's mental model of the program with its actual behavior when the two don't match. While debuggers can be useful in these narrow contexts, I think programmers would benefit from a much broader set of program visualization tools that proactively give us a continuous, intuitive understanding of what our programs are doing.

# Reading code with Margin Notes

One particular place that better tools could help us is in quickly understanding the behavior of some function without needing to read all of its code. As a software engineer collaborating on a large codebase, I constantly find myself figuring out how to use a function that I didn't write. What are the argument types? What does it return? Manual documentation can answer these questions, but I think an automated tool can do better.

**Margin Notes** is a prototype tool that automatically creates documentation for methods in a Ruby codebase, by **recording example data when the program actually runs**, and then displaying those examples next to the code in a rich interactive viewer. It's best explained with a brief example.

Take a look at this snippet of Ruby code. It's a method on a `Game` class in a tic-tac-toe program that I wrote, which prints out the board. See if you can figure out what its output looks like by reading the code:

```ruby
class Game
  # A string representation of the board state.
  def to_s
    @squares.map do |row|
      row.map { |square| " " + (square || " ") + " " }.join("|")
    end.join("\n------------\n")
  end
end
```

This method isn't particularly complicated, but even a few simple lines like this can take a while to puzzle through, because code represents abstract behavior without providing us any concrete examples. This method would be much easier to understand if we could just see some examples of what the board looks like when it's printed.

If we can use data from runtime, finding examples is easy: we can simply record example data from real executions. In this case, I played a single game using the tic-tac-toe program and recorded it with Margin Notes. The system saved data about every method call, including the object receiving the call ( self in Ruby), the arguments, and the return value.

Margin Notes then shows these examples alongside the code when the relevant method is clicked, so we can see some examples of how the board is printed out. (After watching the video demo, you can click "interactive demo" underneath the video if you'd like to try it out yourself!)

      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    v-bind:video-path="require('./assets/tic-tac-toe-tos-11.mp4')"
    default-line-number="42"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

Other than running the program, it took no work to generate these examples. I assigned names to some of the examples after recording to make them easier to find, but that step is fully optional.

## Seeing arguments

Here's another method from the tic-tac-toe program, which determines whether a player has won the game.

```ruby
# returns true if the given player has won the game
def won?(player)
  return true if won_row?(player)
  return true if won_column?(player)
  return true if won_diagonal?(player)
  return false
end
```

This is very simple code, but it's missing a crucial piece of information: what is the `player` argument? Perhaps it's some `Player` object, or maybe a player ID or something? We can answer this using Margin Notes, again using examples recorded from a real game:

      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    v-bind:video-path="require('./assets/tic-tac-toe-won-11.mp4')"
    default-line-number="85"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
This gives us some valuable information! First, we learn that `player` is an integer. Ruby is a dynamically typed language so we can't get this type information from the code, but Margin Notes gives us a way to find the types of arguments.*
    </vue-markdown>
    <p class="sidenote">
      *Margin Notes was inspired by systems that create automatic type annotations by observing code at runtime, including <a href="https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881">MonkeyType</a>, a Python project by Instagram, and <a href="https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0">a similar tool</a> for Ruby by Arpith Siromoney.
    </p>
    <vue-markdown v-bind:breaks="false" v-bind:html="true">

But not only do we learn that `player` is an integer; we also learn that it takes on the values 0 and 1, which helps us understand what we can do with the object. There are many cases like this where there's valuable information about an object that isn't captured by its type alone—another example is that knowing an object is a Hash doesn't tell you what the keys are.

It's worth noting that, based on these examples, we can't conclude `player` is always an integer with values 0 or 1. These examples are from a single game, and they don't represent a formal guarantee about all the values that could ever appear in the program. But that's ok, because Margin Notes is about conveying a starting point for understanding, not providing an exhaustive understanding of all possible states.

## Understanding a library using a test suite

In the tic-tac-toe examples, I just recorded examples while playing a game, but in other cases, it's not as obvious how to run all the parts of a program to gather examples. In these situations, **test suites** can be a useful context for recording, because they generally aim to exercise a lot of the code and contain small, easily understandable bits of example data.

I tried using Margin Notes to record examples while running the test suite for `ruby-money`, a popular Ruby library for dealing with currencies. Here's one method from the `Currency` class which handles comparing two currencies for equality.

```ruby
# Compares +self+ with +other_currency+ and returns +true+ if the are the
# same or if their +id+ attributes match.
#
# @param [Money::Currency] other_currency The currency to compare to.
#
# @return [Boolean]
#
# @example
#   c1 = Money::Currency.new(:usd)
#   c2 = Money::Currency.new(:jpy)
#   c1 == c1 #=> true
#   c1 == c2 #=> false
def ==(other_currency)
  self.equal?(other_currency) || compare_ids(other_currency)
end
```

The documentation comment is helpful, but it's also limited by being expressed as text. Margin Notes lets us explore many examples and interactively explore the contents of rich objects:
      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.currency.code"
    v-bind:examples="presets.currency.data"
    v-bind:filename="presets.currency.filename"
    v-bind:video-path="require('./assets/money-currency-11.mp4')"
    default-line-number="322"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
This particular example happened to demonstrate the pitfalls of manual documentation. The comment above the method says that the `other_currency` param has the class `Money::Currency`, but the examples from the test suite show that it can actually be a symbol or a string as well.

Breaking out of the constraints of text provides more space for information, and allows for freedom in how to display it, including interactivity. This prototype shows one suggestion for how to visualize this data, but in theory there could be different viewers built into all the different places where read code, ranging from text editors to code repositories like Github, with the design adapted for those different contexts.

# Future work

This is just an early prototype, and I imagine some directions for developing this further:

**Organizing examples:** Margin Notes can record many examples, and it currently doesn't do anything to organize large numbers of examples to help a programmer find the most useful ones. As a start, the system could categorize examples by the types of inputs and outputs, to help a programmer browse the cases that they care about. Programmers could also manually highlight certain examples as useful starting points for understanding a function.

**Showing a whole execution:** Another way the system could be more useful would be to tie individual examples together, answering questions like "what call came next after this one?" This work could draw inspiration from other projects that have focused on understanding a single execution over time, like [record-and-replay debuggers](https://rr-project.org/), as well as projects like [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/).

**More detail:** I think Margin Notes could also become more useful by showing data at different levels of granularity. Method calls are a convenient level because they represent units of functionality that the programmer has decided are conceptually meaningful, but the same techniques could be applied to smaller pieces of a program. For example, a programmer could click on individual variables and see example values from real runs of the program.

**Interactivity:** Perhaps the biggest gap I see in this prototype is the lack of true interactivity. After viewing recorded examples, a natural next step towards deeper understanding is to try modifying those examples and re-running them to see the new result. In many programs today, getting to a point where you can probe the behavior of a method like requires a lot of setup work. What if it were as easy as clicking "edit" on an example in Margin Notes? Glen Chiacchieri's [Human-Readable Interactive Representation of a Code Library](http://glench.github.io/fuzzyset.js/ui/) and the [documentation for the Paper.js library](http://paperjs.org/reference/path/#path-line-from-to) offer two superb examples of how an interactive environment can help people understand programs better.
      </vue-markdown>
    </div>
    <footer />
  </div>
</template>

<script>
import Demo from './components/Demo'
import presets from './presets'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs';
import 'prismjs/components/prism-ruby';

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

$prose-width: 600px;
$light-gray: #a9a9a9;
$sans-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
$serif-family: 'Merriweather', serif;

a, a:hover, a:active, a:focus, a:visited {
  color: #77a9d8
}

a:hover, a:active {
  color: #638eb6
}

code {
  font-size: 16px;
}

#essay {
  font-family: $sans-family;
  max-width: 1024px;
  margin-left: 120px;
  margin-right: 50px;

  img.hero {
    max-width: $prose-width;
  }

  h1.title { margin-bottom: 0; }
  h2.subtitle {
    margin-top: 0;
    font-weight: normal;
    font-size: 18px;
  }
  p.byline {
    margin-bottom: 30px;
  }

  .prose {
    font-family: $serif-family;
    font-weight: 300;
    max-width: $prose-width;
    line-height: 1.5em;

    h1, h2, h3, h4, h5, h6 {
      font-family: $sans-family;
    }

    h1 {
      font-size: 24px;
      margin-top: 40px;
    }

    h2 {
      font-size: 20px;
      margin-top: 30px;
    }

    img {
      max-width: 100%;
    }

    figure {
      margin-left: 0;
      margin-right: 0;

      figcaption {
        color: $light-gray;
        font-size: 14px;
        font-family: $sans-family;
      }
    }

    .sidenote {
      position: absolute;
      margin-left: $prose-width + 50px;
      margin-top: -40px;
      width: 200px;
      font-size: 12px;
      line-height: 1.4em;
      color: $light-gray;
    }
  }

  pre {
    width: 1000px;
  }

  .note {
    color: red;
    font-style: italic;
  }

  footer {
    height: 100px;
  }
}

@media only screen and (max-width: 960px) {
  #essay{
    margin-left: 20px;
    margin-right: 10px;

    .prose {
      .sidenote {
        margin-left: 650px;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  #essay .prose {
    font-size: 14px;
  }

  #essay .prose .sidenote {
    position: relative;
    font-size: 12px;
    line-height: 1.4em;
    color: #a9a9a9;
    margin: 0;
    width: 100%;
  }
}
</style>
