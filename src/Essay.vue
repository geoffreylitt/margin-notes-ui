<template>
  <div id="essay">
    <br /><br /><br /><br /><br />
    <h1 class="title">📝 Margin Notes</h1>
    <h2 class="subtitle">Automatic code documentation with recorded examples from runtime</h2>

    <p>By <a href="https://geoffreylitt.com">Geoffrey Litt</a></p>
    <p>Presented at <a target="_blank" href="https://2018.splashcon.org/track/live-2018-papers#event-overview">LIVE 2018</a></p>

    <div class="prose">
      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
# Abstract

Programmers working on large codebases frequently need to understand APIs for existing code. Manual documentation is helpful, but takes time to maintain and often doesn't include enough examples.

Margin Notes automatically generates code documentation by recording example data from function calls as a program executes and displaying those examples in an interactive UI next to the code. This allows programmers to quickly view many examples from past executions as they read the code, helping them efficiently gain insight into the behavior of the program.

      </vue-markdown>

      <h1>Talk video</h1>
      <p>Here's a recorded version of the talk I gave at LIVE 2018 about this project. If you prefer reading, keeping scrolling down to the essay version below.</p>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/nABwZ1199eE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      <vue-markdown v-bind:anchor-attributes="{'target': '_blank'}">
# Introduction

Today, most software engineers don't use powerful tools to observe the behavior of their programs. Despite the publication of promising research ideas like [Learnable Programming](http://worrydream.com/LearnableProgramming/) and the release of commercial products like the [Light Table IDE](http://lighttable.com/), programmers still primarily use tools that operate on static code and don't provide visibility into runtime behavior. Some prominent programmers have even [publicly stated](https://lemire.me/blog/2016/06/21/i-do-not-use-a-debugger/) that they avoid using interactive debuggers, which are the most commonly available tools for seeing what code is doing when it runs.

As a software engineer, I think that I and others could benefit from using tools that better bridge the gap between static code and runtime. But in order to gain more adoption in industry, I think we need to explore tools that incorporate runtime information into programming in a broader variety of ways. In particular, I'm interested in tools that focus on pain points experienced by software engineers working collaboratively on large codebases, which are very different from the needs of beginners addressed by projects like Learnable Programming.

One common problem software engineers face today is learning to use APIs for existing code. Programming in a large codebase generally requires building on top of other code, ranging from frameworks and libraries developed by third parties to modules developed within a company. Examples of usage are an effective way to learn how to use an API, but examples can be difficult to find. One [survey](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf) found that programmers at Microsoft cited "insufficient or inadequate examples" as the most frequent barrier to learning an API. In some cases, particularly for private APIs designed for internal use at a company, documentated examples might not even exist at all.

This essay describes **Margin Notes**, a tool that incorporates data from runtime to solve this need for examples. Margin Notes automatically creates documentation for functions in a codebase by saving example data from function calls when the program runs, then displaying those saved examples next to the code in a rich interactive viewer. Examples can be recorded in any context where the program is run, ranging from test suites to live on a production server.

When examples are easily accessible, the act of reading the code can fluidly incorporate information gathered from running the code. This can help programmers understand the behavior of a function and the properties of data passed in and out of the function. The interactive example viewing UI allows for more flexibility in displaying data than text documentation, and the ability to record in different execution contexts allows for collecting diverse example data. The rest of the essay explores these benefits in more depth.

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

If our goal is just to understand the output of this method so we can use the result, seeing specific examples is immediately informative. Beyond that, if our goal is to edit the internals of this method, seeing example output can also clarify the method implementation. For example, in this method, it becomes more evident why 12 dashes are inserted between each row of squares to make the output look like a board.

Another feature of Margin Notes is that the programmer can optionally assign names to examples, to make them easier to find later. (The rest of the demos in this essay use named examples.)

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

In the previous example we focused on the output of a method, but Margin Notes can also help programmers understand the arguments that get passed in to a method. Here's another method from the tic-tac-toe program that determines whether a player has won the game:

```ruby
# returns true if the given player has won the game
def won?(player)
  return true if won_row?(player)
  return true if won_column?(player)
  return true if won_diagonal?(player)
  return false
end
```

If we want to call this method, we need to know what type of object we can pass into the `player` argument. Perhaps it's some `Player` object, or maybe a player ID number? In a dynamically typed language like Ruby, we can't answer this question just by reading the code. Margin Notes can help, again using examples recorded from a real game. (There are only three examples shown for the entire game because example calls with identical data are deduplicated and only shown once.)

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
Within these examples, we observe that `player` is always an `Integer`; beyond the type, we can also see that it takes on the values 0 and 1. This gives us valuable information for using this function, or for modifying it.

These benefits overlap with some of the value provided by static type systems, but Margin Notes differs from type systems in important ways. Seeing specific values reveals detailed properties that can't be described by most static type systems—in this case, that we use 0 and 1 to represent the two players. (As another example of a detailed property, when a method returns a hash, it's helpful to know the keys typically defined on the hash in addition to the type.) These detailed properties can help a reader develop a concrete understanding of the data typically present in a program.

Of course, based on these examples, we can't conclude `player` is always an integer with values 0 or 1—these are just examples from a single game, and they don't represent a guarantee about all the values that could ever appear in the program. This points at a fundamental difference in goals: Margin Notes aims to build a foundation for informed programming, not to provide safety guarantees. This essay shows Margin Notes in the context of a dynamically typed language, but Margin Notes could also be used in a statically typed context and complement the type system by providing concrete examples.

## Understanding a library using a test suite

Margin Notes can also help demystify third-party libraries. Here's a code snippet from [ruby-money](https://github.com/RubyMoney/money), a popular Ruby library for dealing with currencies. It defines the `==` method from the `Currency` class, an operator that compares a currency to anther currency for equality. It includes a manual documentation comment that provides helpful information, including expected types of arguments and the return value, as well as a single example.

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

In the tic-tac-toe examples, playing a single game was a simple way to record examples, but in this case, it's not as obvious how to manually run code that uses all the parts of the library. In these situations, **test suites** can be a useful context for recording, because they generally aim to exercise most of the code, and they often contain small, easily understandable example data. I used Margin Notes to record examples while running the test suite for ruby-money, then viewed examples for this method.
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

Interestingly, this example also demonstrates how manual documentation can fail to fully describe the code. The documentation comment says that the `other_currency` param has the type `Money::Currency`, but the examples from the test suite show that it can also be a symbol or a string. Because Margin Notes uses real examples of usage to document the code, it's more likely to reflect the code's actual behavior.

Beyond visualizing rich objects, using an interactive viewer instead of text comments opens up many more possibilities for other ways to display this information. This essay suggests one design, but viewers could be built into all the different places we read code, ranging from text editors to code repositories like Github, with the design adapted for those different contexts.

# Related work

Margin Notes builds on prior work in API documentation, runtime visualization, and runtime type annotation.

## API Documentation

[Examplore](http://web.cs.ucla.edu/~tianyi.zhang/examplore.pdf) helps programmers use APIs correctly by synthesizing many code examples mined from open-source codebases. Both Margin Notes and Examplore aim to leverage existing code to provide API usage examples, but Margin Notes collects examples of runtime data rather than collecting examples of static source code. These two approaches could be complementary techniques for learning an API.

Margin Notes currently displays individual examples in isolation, but could be improved by synthesizing across multiple examples like Examplore does. For example, Margin Notes could categorize examples by the types of the inputs and outputs, or visualize how often a given argument takes on different values in production.

## Runtime visualization

Many projects have explored ways to visualize runtime information to help programmers understand what their code is doing.

Some have aimed at helping beginners understand their programs as each line executes. [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/) visualize state across time, allowing the programmer to scrub back and forth in time. [Online Python Tutor](http://dx.doi.org/10.1145/2445196.2445368) focuses on illustrating the contents of a program's memory at a single point in time.

Other projects have aimed to help programmers at a broader range of experience levels understand the runtime behavior of their programs. [Example-Centric Programming](https://dl.acm.org/citation.cfm?id=1052894) introduces a system that uses concrete examples to help people write code, and the author mentions unit tests as a useful source of examples. [Light Table](http://lighttable.com/) allows programmers to watch the values of variables change in realtime as a program executes. [Theseus](https://dl.acm.org/citation.cfm?id=2611205.2557409) augments a Javascript IDE with runtime information from code that just ran. [In Situ Visualizations for Vega](http://idl.cs.washington.edu/files/2018-InSituCodeVis-CHI.pdf) introduces visual techniques for including runtime state inline with the source code itself.

Margin Notes draws on the key insight that showing runtime information can aid understanding, but aims to solve a different problem: helping programmers understand existing APIs, rather than helping them understand new code that they are writing. These other projects generally visualize a single execution by the programmer, but Margin Notes shows snippets of data across multiple recorded executions, so that the programmer can quickly view many examples relevant to a particular function.

There are many ideas from these projects that could be incorporated into Margin Notes to make it more powerful. Here are two examples:

- **More context for examples**: Margin Notes presents each example in isolation, without temporal context about previous or subsequent calls, or context about the stack trace and how the function was called. It might be helpful to “zoom out” on an example in Margin Notes and see more of these types of context, perhaps with a tool similar to the “macro visualization” from Seymour.
- **More granular examples**: Margin Notes currently shows information at the granularity of a function call. Projects like Light Table and In Situ Visualizations for Vega have explored ways to include information about individual variables inline with the code; these techniques might be useful for showing recorded example values for individual variables.

## Runtime type annotation

Margin Notes was inspired by systems that automatically add type annotations to code by observing the types that are used at runtime, including [MonkeyType](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881), a Python project used on production codebases at Instagram, and [a similar tool](https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0) built for Ruby. Margin Notes extends this functionality by recording more specific data beyond just type information, and showing examples interactively instead of just adding text comments to the code.

# Conclusion and future work

This essay has presented Margin Notes, a system that provides automatic code documentation by recording example data from function calls as a program executes and displaying those examples in an interactive UI next to the code.

One direction I'd like to explore further is adding interactivity to these examples. If programmers could tweak the examples as they read, that could help them more deeply understand the code. Incorporating this functionality into Margin Notes would require redesigning the current approach to recording and viewing examples.

More broadly, Margin Notes is just one example of how incorporating information from runtime into our tools can solve a real need for software engineers. We still need better tools for many other use cases, like understanding program behavior at a higher level of abstraction than individual functions. I look forward to exploring how data from runtime can play a part in meeting these needs, and to a future where software engineers use more powerful tools to do their work.

## Acknowledgements

Thanks to Glen Chiacchieri, Jonathan Edwards, Steve Krouse, Soya Park, Ivan Reese, Eli Rose, Seth Thompson, and Maggie Yellen for providing valuable feedback and encouragement on this work.

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
