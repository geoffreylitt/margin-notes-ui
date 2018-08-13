<template>
  <div id="essay">
    <img class="hero" src="/margin-notes/static/manuscript.jpg"/>
    <h1 class="title">Margin Notes</h1>
    <h2 class="subtitle">Automatic code documentation with recorded examples from runtime</h2>

    <div class="prose">
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
# Abstract

Programmers working on production codebases need to understand how existing code works in order to modify code and use library functions. Manual documentation can help build this understanding, but takes time to maintain and sometimes doesn't exist at all. Margin Notes provides automatic code documentation, by recording example data from function calls as a program executes, and then displaying those examples in an interactive UI next to the code. This allows people to quickly access examples from different past executions as they read the code, hopefully leading to improved understanding.

# Introduction

Modern programmers spend a lot of time understanding existing code. Whether it's learning to use a library or preparing to modify part of a large codebase, understanding what code does is just as important as writing new code.

Despite the importance of this activity, it's challenging to understand what code does, because **we don't have powerful tools to help us understand what our programs are doing when they run**. We have all sorts of tools for manipulating and viewing the static structure of our source code, but once the program is actually running, we're left in the dark.

Programming tools for beginners tend to focus more on representing runtime behavior, to help beginners understanding the basic connections between their code and the behavior it creates. For example, the [Scratch](https://scratch.mit.edu/) programming environment makes it easy to see the numerical direction of a character, live-updated as it moves:

    </vue-markdown>
    <figure>
      <video controls src="/margin-notes/static/scratch-runtime-2.mp4#t=0.1" height="300px"/>
      <figcaption>In Scratch, the numbers update as the character moves</figcaption>
    </figure>
    <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">

Advanced programmers working on large codebases have very different needs than beginners working on tiny programs, but we still need to understand what our programs are doing. Unfortunately, there aren't many tools to help us. Print statements and interactive debuggers are the most common tools for peeking inside the code as it runs; these techniques can help with fixing bugs, but they're too cumbersome to use all the time as we program. In order to understand our programs better, we need a broader set of tools that incorporate data from runtime to help programmers in a variety of contexts, beyond just fixing bugs.

## The need for API documentation

One use case where programmers could benefit from better tools is quickly understanding the behavior of a function. As a software engineer collaborating on a large codebase, I frequently find myself needing to figure out how to use a function from an open-source library or an unfamiliar corner of our codebase. What arguments does it expect? What does it return? How does it handle a particular case? Documentation can help answer these questions, but manual documentation is difficult to maintain, and docs are often incomplete, or even worse, incorrect.

It's difficult to automatically generate code documentation based on the source code alone, but if our tools have access to the runtime behavior of the code, there are more possibilities. In particular, we can observe examples of how the code is actually used when the program executes. This is convenient, because examples of code usage also happen to be a common and highly useful way to document code for humans.

# Reading code with Margin Notes

Margin Notes automatically creates documentation for functions in a codebase, by **saving example calls when the program runs**, and then **displaying those saved examples next to the code** in a rich interactive viewer. It's best demonstrated with a quick example.

Here's a snippet of Ruby code* from a tic-tac-toe program. It's a `to_s` method on the `Game` class, which returns a string representation of the board state that can be printed out and shown to the user.

    </vue-markdown><p class="sidenote" style="margin-top:-80px;">
      *The prototype example recorder is implemented in Ruby and can only record Ruby programs, but examples could theoretically be recorded in any language.
    </p><vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">

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

This method isn't particularly complicated, but even simple code can take a while to puzzle through since it describes abstract behavior without providing any concrete examples. This method would be easier to understand if we could just see some examples of what the board looks like when it's printed.

To collect some examples, I played a tic-tac-toe game and recorded it with Margin Notes. The system saved information about every method call, including the state of the object receiving the call ( `self` in Ruby), the arguments passed into the method, and the return value. Margin Notes then shows these examples alongside the code when we click on the `to_s` method, so we can instantly see some examples of how the board looks when it's printed out:

      </vue-markdown>
    </div>
    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    v-bind:video-path="require('./assets/tic-tac-toe-tos-2.mp4')"
    default-line-number="42"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">

The programmer can also optionally assign names to examples, to make them easier to find later:

      </vue-markdown>
        </div>
        <demo
        v-bind:code="presets.tictactoeNames.code"
        v-bind:examples="presets.tictactoeNames.data"
        v-bind:filename="presets.tictactoeNames.filename"
        v-bind:video-path="require('./assets/tic-tac-toe-names.mp4')"
        default-line-number="42"
        ></demo>

        <div class="prose">
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">

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
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
This gives us some valuable information! First, we learn that `player` is an integer. Ruby is a dynamically typed language so we can't get this type information from the code, but Margin Notes gives us a way to find the types of arguments.*
    </vue-markdown>
    <p class="sidenote">
      *Margin Notes was inspired by systems that create automatic type annotations by observing code at runtime, including <a href="https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881">MonkeyType</a>, a Python project by Instagram, and <a href="https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0">a similar tool</a> for Ruby by Arpith Siromoney.
    </p>
    <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
Beyond the type of `player`, we also learn that it takes on the values 0 and 1, which helps us understand what we can do with the object. There are many cases like this where specific properties of an object aren't captured by its type alone; for example, knowing that an object has the type `Hash` doesn't tell you what its keys are.

It's worth noting that, based on these examples, we can't conclude `player` is always an integer with values 0 or 1. These examples are from a single game, and they don't represent a guarantee about all the values that could ever appear in the program. But that's okay, because Margin Notes is about conveying a starting point for understanding, not providing safety guarantees or an exhaustive understanding of all possible states.

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
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
Interestingly, this particular example happened to demonstrate the pitfalls of manual documentation. The comment above the method says that the `other_currency` param has the class `Money::Currency`, but the examples from the test suite show that it can actually be a symbol or a string as well.

Breaking out of the constraints of text provides more space for information, and allows for freedom in how to display it, including interactivity. This prototype shows one suggestion for how to visualize this data, but in theory there could be different viewers built into all the different places where read code, ranging from text editors to code repositories like Github, with the design adapted for those different contexts.

## Execution contexts

Margin Notes can record examples in any context where the program is actually run. Different contexts each have tradeoffs:

- **Manual executions by the programmer** (e.g. playing a tic-tac-toe game) allow the programmer to control the inputs to create a specific situation, and then view the resulting example data throughout all the functions in the program. For example, this could be used to reproduce a bug and quickly inspect data at various points in the program. However, it would be time-consuming to run enough manual executions to record diverse examples that cover a whole codebase; with unfamiliar code it might not even be obvious how to go about doing so.
- **Test suites** are a convenient source of examples because they aim for broad coverage of all the functionality in a program. Tests also often contain minimal example data designed to be easily understandable, making them perfect for demonstrating the behavior of a function. On the other hand, the test context can differ from a real execution context in ways that might make demos misleading, like replacing certain objects with mock versions, or calling functions from a test harness rather than a real call site.
- **Real executions** (e.g. on a production server) can provide examples that broadly cover commonly used functionality, and demonstrate actual properties of real data used in the program. For example, a list of users in a developer or test environment might have 10 dummy users, but a production list might have thousands, helping the programmer understand scaling concerns. However, real data could be too complex in some cases, and also raises privacy concerns.

# Related work

Margin Notes builds on prior work in runtime visualization, API documentation, and example-centric programming.

## Runtime visualization

Many projects have explored ways to record and visualize information from runtime to help programmers understand their code. Some, like [Learnable Programming](http://worrydream.com/LearnableProgramming/), [Seymour](https://harc.github.io/seymour-live2017/), and [Online Python Tutor](http://www.pythontutor.com/), have aimed at displaying basic information for beginners. Others, like [Light Table](http://lighttable.com/), [Theseus](https://dl.acm.org/citation.cfm?id=2611205.2557409), [In Situ Visualizations for Vega](http://idl.cs.washington.edu/files/2018-InSituCodeVis-CHI.pdf), and [record-and-replay debuggers](https://rr-project.org/), have aimed to also cover the needs of more advanced programmers.

These tools generally focus on visualizing a single execution initiated by the programmer—either a live view of an in-progress execution, or a recording of a completed execution. In contrast, Margin Notes shows snippets of data from many past executions across different contexts, which could provide several benefits:

- Since examples are indexed by function, it's easy to find many different examples for a particular function across multiple executions, without needing to first pick a specific execution to search within.
- Margin Notes can show a variety of examples covering cases that might be difficult or impossible for a programmer to run themselves, like error cases or real examples from a production server.
- When programmers are reading code outside of an executable environment (e.g. when reading the code for a Ruby library on Github), Margin Notes can display examples without the reader needing to run the code.

## API Documentation

[Examplore](http://web.cs.ucla.edu/~tianyi.zhang/examplore.pdf) aims to help programmers use APIs correctly by synthesizing many code examples mined from open-source codebases. Margin Notes has a similar goal of providing examples, but it collects data at runtime rather than collecting examples from static source code. This allows Margin Notes to show more information, like the detailed state of an object returned by a particular example.

Unlike Examplore, Margin Notes doesn't synthesize large numbers of examples, and incorporating some of those techniques could make it more manageable to browse examples. As a simple example, Margin Notes could categorize examples by the types of the inputs and outputs, to make it easier to find a particular example.

## Example-centric programming

In [Example-Centric Programming](https://dl.acm.org/citation.cfm?id=1052894), Edwards introduces a system that uses concrete examples to help people understand and write code, and mentions unit tests as one useful source of examples. Margin Notes builds on this work and similarly focuses on examples as a means for understanding code, but it gathers examples from real executions of the code rather than requiring them to be manually specified, making it easier to generate a wide variety of examples.

# Future work

This is just an early prototype, and there are some future directions that might make the tool more useful:

- **More context for examples:** Margin Notes presents each example in isolation, without temporal context about previous or subsequent calls, or environmental context about the stack trace at the time and how the function was called. It might be helpful to "zoom out" on an example in Margin Notes and see more of these types of context, perhaps with a tool similar to the "macro visualization" from Seymour.
- **More granular examples:** Margin Notes currently shows information at the granularity of a function call. Projects like Light Table and In Situ Visualizations for Vega have explored ways to include information about individual variables inline with the code; these techniques might be useful for showing recorded example values for individual variables.
- **Data visualization:** Data visualization techniques could be applied to help readers see patterns across large numbers of examples (e.g. answering "how often does this function receive `true` vs `false` for this argument?").
- **Interactivity:** After viewing recorded examples, a natural next step towards deeper understanding is to try modifying those examples and re-running them to see the new result. In many programs today, getting to a point where you can probe the behavior of a method like requires a lot of setup work. What if it were as easy as clicking "edit" on an example in Margin Notes? Glen Chiacchieri's [Human-Readable Interactive Representation of a Code Library](http://glench.github.io/fuzzyset.js/ui/) and the [documentation for the Paper.js library](http://paperjs.org/reference/path/#path-line-from-to) offer two examples of how an interactive environment can help people understand programs better.

# Conclusion

This essay has presented Margin Notes, a system that provides automatic code documentation, by recording example data from function calls as a program executes, and then displaying those examples in an interactive UI next to the code.

Margin Notes is just one example of how runtime instrumentation can solve a real need for advanced programmers. I believe we still need better tools for many other use cases, particularly tools to help us develop an intuitive grasp of what our large systems are doing when they run. In the future, I look forward to exploring how data from runtime can play a part in other tools to meet these broader needs.
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

code { font-size: 16px; } // for inline code, not listings

video {
  width: 100% !important;
  max-height: 400px;
}

#essay {
  font-family: $sans-family;
  max-width: 1024px;
  margin-left: 120px;
  margin-right: 50px;

  img.hero {
    width: 100%;
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
    code {
      font-size: 14px;
    }
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
  #essay {
    margin-left: 10px;

    .prose {
      font-size: 14px;
    }

    pre {
      font-size: 14px;
    }
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
