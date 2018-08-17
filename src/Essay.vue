<template>
  <div id="essay">
    <br /><br /><br /><br /><br />
    <h1 class="title">📝 Margin Notes</h1>
    <h2 class="subtitle">Automatic code documentation with recorded examples from runtime</h2>

    <div class="prose">
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
# Abstract

Programmers working on large codebases often need to understand how existing code works, but they don't have powerful tools to help them understand the runtime behavior of code. Margin Notes generates code documentation by recording example data from function calls as a program executes, and then displaying those examples in an interactive UI next to the code. This allows programmers to quickly view examples from multiple past executions as they read the code, helping them understand the runtime behavior of the program.

# Introduction

Modern programmers spend a lot of time understanding existing code. A programmer using a library needs to understand the external interface provided by that library. In other cases, someone preparing to modify some unfamiliar code in a large codebase needs to develop an understanding of how that code works.

Despite the importance of programmers understanding code, it's highly challenging for us to do, because **we don't have powerful tools to help us understand what our programs are doing when they run**. We have all sorts of tools for manipulating and viewing the static structure of our source code, but once the program is actually running, we're left in the dark.

Programming tools for beginners tend to focus more on representing runtime behavior, to help beginners understanding the basic connections between their code and the behavior it creates. For example, the [Scratch](https://scratch.mit.edu/) programming environment makes it easy to see the numerical direction of a character, live-updated as it moves:

    </vue-markdown>
    <figure>
      <video controls src="/margin-notes/static/scratch-runtime-2.mp4#t=0.1" height="300px"/>
      <figcaption>In Scratch, the numbers update as the character moves</figcaption>
    </figure>
    <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">

Advanced programmers also need to understand what our programs are doing, but we have different needs than beginners. For example, as a software engineer collaborating on a large codebase, I frequently depend on code written by others, which requires learning how to use a function from an open-source library or an unfamiliar corner of our system. What arguments does it expect? What does it return? How does it handle a particular edge case?

Existing solutions to this problem have limitations:

* **Documentation** (in code comments or otherwise) can answer these questions effectively, especially if it includes examples. But manual docs are time-intensive to maintain, and can become incomplete or incorrect as the code changes.
* **Reading the code** can provide a detailed and accurate understanding of a system, but is often a tedious way to develop a general understanding, since it requires delving into too much detail. Also, code can be difficult to read because it describes abstract behavior, and we can't see concrete examples of actual data values.
* **Running the code** can help develop understanding beyond reading the code, but this approach is limited in value without powerful tools for seeing what code is doing when it runs. Print statements and interactive debuggers can provide some visibility into behavior, but are cumbersome to use for quickly developing a general understanding of some code.

This essay describes **Margin Notes**, a tool that combines strengths from all of these approaches, with the goal of helping a programmer learn how to use or modify an existing function. Margin Notes automatically creates documentation for functions in a codebase, by saving example data from function calls when the program runs, and then displaying those saved examples next to the code in a rich interactive viewer.

When examples are easily accessible, the act of reading the code can fluidly incorporate information gathered from running the code. This can help programmers understand properties of the data commonly passed into or out of a function. The interactive UI allows for more flexibility in displaying data than text documentation does. The ability to record in different execution contexts allows for collecting diverse example data with different benefits for each context. The rest of the essay explores these benefits in more depth with examples.

# Reading code with Margin Notes

Here's a snippet of Ruby code* from a tic-tac-toe program. It's a `to_s` method on the `Game` class, which returns a string representation of the board state that can be printed out and shown to the user.

    </vue-markdown><p class="sidenote">
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

To generate documentation for this method, I played a tic-tac-toe game and instrumented it with Margin Notes example recorder. The system saves information about every method call, including the state of the method receiver ( `self` in Ruby), the arguments, and the return value. Margin Notes then shows this data alongside the code when we click on the `to_s` method, so we can instantly see some examples of how the board looks when it's printed out:

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

If our goal is just to understand the output of this method so we can use the result, seeing specific examples can help build that understanding. Beyond that, if our goal is to edit the internals of this method, seeing example output can also be useful for helping us read the method implementation. For example, in this method, it becomes more clear why 12 dashes are inserted between each row of squares to make the output look like a board.

Another feature of Margin Notes is that the programmer can also optionally assign names to examples, to make them easier to find later. (The rest of the demos in this essay use named examples.)

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

If we want to call this method, we need to know what type of object we can pass into the `player` argument. Perhaps it's some `Player` object, or maybe a player ID number? In a dynamically typed language like Ruby, we can't answer this question by just reading the code. Margin Notes can help, again using examples recorded from a real game. (There are only three examples shown for the entire game because example calls with identical data are deduplicated and only shown once.)

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
Within these examples, we observe that `player` is always an `Integer`; beyond the type, we can also see that it takes on the values 0 and 1. This gives us valuable information for using or modifying this function.

These benefits overlap with some of the value provided by static type systems, but Margin Notes also differs from type systems in important ways. Seeing specific values reveals detailed properties that can't be described by most static type systems—in this case, that we use 0 and 1 to represent the two players. As another example of a detailed property, when a method returns a hash, it's helpful to know the keys typically defined on the hash instead of just knowing that the object is a hash. These detailed properties can help a reader develop a concrete understanding of what code does.

Of course, Margin Notes also lacks most of the power of type systems. Based on these examples, we can't conclude `player` is always an integer with values 0 or 1—these are just examples from a single game, and they don't represent a general guarantee about all the values that could ever appear in the program. This points at a fundamental difference in goals: Margin Notes aims to convey a starting point for understanding, not to provide an exhaustive understanding of all possible states, or guarantees of safety.

## Understanding a library using a test suite

One way to use Margin Notes is to understand how to use a library. Here's a code snippet from [ruby-money](https://github.com/RubyMoney/money), a popular Ruby library for dealing with currencies. It's a method from the `Currency` class which handles comparing a currency to anther currency for equality. It includes a manual documentation comment that provides helpful information, including expected types of arguments and the return value, and a single example.

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

In the tic-tac-toe examples, playing a single game was a simple way to record examples, but in this case, it's not as obvious how to manually run code that uses all the parts of the library. In these situations, **test suites** can be a useful context for recording, because they generally aim to exercise most of the code, and they often contain small, easily understandable example data. I used Margin Notes to record examples while running the test suite for ruby-money, and then viewed examples for this method.
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

Margin Notes provides some advantages over the documentation comment. The interactive viewer provides more space than a text comment, so it can show many examples instead of just one. Rich objects can be easily included in examples and interactively inspected.

Interestingly, this example also happens to demonstrate how manual documentation can fail to fully describe the code. The documentation comment says that the `other_currency` param is of the type `Money::Currency`, but the examples from the test suite show that it can also be a symbol or a string. Because Margin Notes uses real examples of usage to document the code, it's more likely to reflect the code's actual behavior.

Using an interactive viewer instead of text comments also provides many more possibilities for other ways to display this information. This essay shows one suggestion for a design, but in the future, viewers could be built into all the different places we read code, ranging from text editors to code repositories like Github, with the design adapted for those different contexts.

## Execution contexts

Margin Notes can record examples in any context where the program can be run. Different contexts each have tradeoffs:

- **Manual executions by the programmer** (e.g. playing a tic-tac-toe game) allow the programmer to control the inputs to create a specific situation, and then view the resulting example data throughout all the functions in the program. For example, this could be used to reproduce a bug and inspect data at various points in the program. However, it's time-consuming to run enough manual executions to record diverse examples that cover a whole codebase, and with unfamiliar code it might not even be obvious how to go about doing so.
- **Test suites** are a convenient source of examples because they aim for broad coverage of all the functionality in a program. Tests also often contain minimal example data designed to be easily understandable, making them useful for demonstrating the behavior of a function. On the other hand, the test context can differ from a real execution context in ways that might make examples misleading, like replacing certain objects with mocked versions, or calling functions from a test harness rather than a real call site.
- **Real executions** (e.g. on a production server) can provide examples that broadly cover all of the commonly used functionality of a program. Examples from real executions can also demonstrate properties of real data used in the program that are not present in development contexts—for example, a list of users in a test suite might contain a few dummy users while a production list contains thousands, and seeing the longer list could help a programmer understand performance concerns. However, real data could be too complex to easily understand in some cases. This approach also raises privacy concerns since sensitive data could be included in examples.

# Related work

Margin Notes builds on prior work in runtime visualization, example-centric programming, and API documentation.

## Runtime visualization

Many projects have explored ways to visualize information from the runtime of a program to help programmers understand their code.

Some have aimed at helping beginners understand their programs as each line executes. [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/) visualize state across time, allowing the programmer to scrub back and forth in time. [Online Python Tutor](http://dx.doi.org/10.1145/2445196.2445368) focuses on illustrating the contents of a program's memory at a single point in time.

Other projects have aimed to help programmers at a broader range of experience levels understand the runtime behavior of their programs. [Example-Centric Programming](https://dl.acm.org/citation.cfm?id=1052894) introduces a system that uses concrete examples to help people write code, and mentions unit tests as a useful source of examples. [Light Table](http://lighttable.com/) allows programmers to watch the values of variables change in realtime as a program executes. [Theseus](https://dl.acm.org/citation.cfm?id=2611205.2557409) augments a Javascript IDE with runtime information from code that just ran. [In Situ Visualizations for Vega](http://idl.cs.washington.edu/files/2018-InSituCodeVis-CHI.pdf) introduces visual techniques for including runtime state inline with the source code itself.

Margin Notes builds on ideas from all of these projects, but takes a slightly different approach. These tools generally focus on visualizing a single execution initiated by the programmer—either a live view of an in-progress execution, or a recording of a completed execution. In contrast, Margin Notes shows snippets of data from many past recorded executions across different contexts. This might provide several benefits:

- Since examples are indexed by function, it's easy to find many different examples for a particular function across multiple executions.
- Margin Notes can show a variety of examples covering cases that would be difficult for a programmer to run themselves, like rare edge cases and real examples from a production server.
- Programmers on a team can collaborate to annotate a shared library of recorded examples, e.g. naming examples or marking certain examples as important.
- When programmers are reading code outside of an executable environment (e.g. when reading the code for a Ruby library on Github), Margin Notes can display examples without the reader needing to run any code.

Of course Margin Notes could also be improved by incorporating more of the ideas from these other projects. In particular, these improvements would be interesting to explore:

- **More context for examples**: Margin Notes presents each example in isolation, without temporal context about previous or subsequent calls, or context about the stack trace and how the function was called. It might be helpful to “zoom out” on an example in Margin Notes and see more of these types of context, perhaps with a tool similar to the “macro visualization” from Seymour.
- **More granular examples**: Margin Notes currently shows information at the granularity of a function call. Projects like Light Table and In Situ Visualizations for Vega have explored ways to include information about individual variables inline with the code; these techniques might be useful for showing recorded example values for individual variables.

## API Documentation

[Examplore](http://web.cs.ucla.edu/~tianyi.zhang/examplore.pdf) aims to help programmers use APIs correctly by synthesizing many code examples mined from open-source codebases. Margin Notes has a similar goal of providing examples, but it collects data at runtime rather than collecting examples from static source code. This allows Margin Notes to show more information, like the detailed state of an object returned by a particular example.

Unlike Examplore, Margin Notes doesn't synthesize large numbers of examples, and incorporating some of those techniques could make it more manageable to browse examples and find patterns. For example, Margin Notes could categorize examples by the types of the inputs and outputs to make it easier to find a particular example, or visualize how often a given argument takes on different values in production.

## Runtime type annotation

Margin Notes was inspired by systems that create automatic type annotations by observing code at runtime, including [MonkeyType](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881), a Python project by Instagram, and [a similar tool](https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0) for Ruby. These projects record types at runtime and add type annotations as code comments. Margin Notes extends this functionality by recording more specific examples, and showing examples interactively outside of the code.

# Conclusion and future work

This essay has presented Margin Notes, a system that provides automatic code documentation, by recording example data from function calls as a program executes, and then displaying those examples in an interactive UI next to the code.

One direction I'd like to explore further is adding interactivity to these examples. If programmers could tweak the examples as they read, that could help them more deeply understand the code. Incorporating this functionality into Margin Notes would require rethinking the current approach it takes to recording and viewing examples.

More broadly, Margin Notes is just one example of how visualization of runtime information can solve a real need for advanced programmers. We still need better tools for many other use cases, particularly tools for understanding behavior at a higher level of abstraction, e.g. how modules collaborate in a large system. I look forward to exploring how data from runtime can play a part in meeting these broader needs.
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
      display: block;
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
