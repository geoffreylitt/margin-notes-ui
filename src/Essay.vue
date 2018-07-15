<template>
  <div id="essay">
    <p class="note">Work-in-progress, please don't share publicly.</p>

<h1>Margin Notes: reading code with recorded examples</h1>

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

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
Margin Notes takes care of automatically recording all these examples as a program runs, and then displaying them next to the code for easy access in the future.

This is similar to what a programmer could already do by inserting a debugger or a print statement at the right point and running the program. But Margin Notes makes it so much less cumbersome to access these examples that it becomes a natural part of reading the code, rather than a tool of last resort for particularly complex cases.

# The system

Margin Notes has two parts, the *recorder* and the *viewer*.

## The recorder

The recorder is a Ruby library which observes examples of method inputs/outputs as a program runs, and saves serialized examples to a file. It offers a simple interface for wrapping any code with recording logic.

The recorder is implemented using the `TracePoint` API in Ruby, which offers a callback hook into every method call made in a program. The recorder defines a TracePoint callback that saves data from every call, deduping examples based on exact matching of argument and return values to avoid redundantly showing the same example multiple times. The resulting recording is a JSON file containing data about every method call that happened while running, with serialized versions of arguments and return values.

## The viewer

The viewer is a UI that displays a recording alongside the code for the program, so that the programmer can efficiently use the recording to aid her understanding while reading the code. She can click on any method she's reading, browse examples for that method, and view the details of any specific method call.

The prototype viewer shown in this essay is implemented as a web UI using the Codemirror library for the code viewing component, but this is only for convenience of developing and iterating on user interface ideas. Ideally, viewers could be built into all the places that programmers read code, ranging from text editors and IDEs to websites like Github.

## To serialize or not to serialize

Serializing objects rather than saving in-memory interactive versions creates some limitations. It means that a programmer can't interact with objects shown in the viewer UI.

However, serializing also simplifies deploying this as a real system that programmers could use. Recorders could be implemented in many languages, all targeting a standard language-agnostic serialization format. Viewers that read the standard recording format could be built into many different code reading interfaces, ranging from text editors to Github.

# Reading code with Margin Notes

Margin Notes helps programmers understand what a method does in many specific ways. Some of them reinforce existing best practices or make them more efficient, while others add new functionality that programmers can't access today.

## Type annotations

One benefit of statically typed languages is that they provide programmers and their tools with information about the types of every variable while the code is being written and read. This makes it simple for the programmer to answer useful questions like "what operations can I perform on this variable?"

In a dynamically typed language like Ruby, it's theoretically impossible to answer such questions statically, but in practice there are many cases where a variable usually takes on a specific type. As a result, large Ruby codebases often contain manual type hints for each method suggesting the expected types of arguments and return values, e.g. using the popular [yardoc](https://yardoc.org/index.html) commenting system. These annotations aren't as complete or rigorous as the formal type definitions in a statically typed language, but they are still valuable—knowing what type is *usually* expected makes it easier to program than not knowing at all.

Some systems have been developed that cleverly create automatic type annotations by observing the code at runtime, such as [MonkeyType](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881), a Python project by Instagram, and [a similar tool](https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0) for Ruby by Arpith Siromoney. Margin Notes takes inspiration from those projects, and provides similar information as one of its features.

For example, given this method from the tic-tac-toe game, there's no information about what type the `player` argument takes on.

      # returns true if the given player has won the game
      def won?(player)
        return true if won_row?(player)
        return true if won_column?(player)
        return true if won_diagonal?(player)
        return false
      end

In Margin Notes, the programmer can inspect a few example calls, and quickly observe that `player` is an `Integer` and the return value is either `FalseClass` or `TrueClass` (i.e., a boolean value) at least in this recording.
      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.tictactoe.code"
    v-bind:examples="presets.tictactoe.data"
    v-bind:filename="presets.tictactoe.filename"
    v-bind:video-path="require('./assets/tic-tac-toe-player-2.mp4')"
    default-line-number="85"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
## Seeing specific values

Margin Notes goes further than just showing types. Often, seeing a few example values can help a programmer make an educated guess about the typical values of a data field, more specifically than they could given a generic type.

In the above example, type hints could specify that `player` is an integer, but that doesn't constrain the possible values. Seeing that 0 and 1 are the only values called during a game suggests that those are the only integers used in this program, and seeing that only 0 and 1 are used across hundreds of runs of the program on a production server would make a programmer fairly confident that those are the only values ever used in practice.

As another example, upon seeing a variable `location` with type `String`, a programmer doesn't gain much information about the contents of the variable. But after seeing example values `["Massachusetts", "Alaska"]` , they can make some inferences that these are (at least, sometimes) names of US states.

While there are more formal ways of providing a stronger guarantee to the programmer that the data will always take a certain constrained shape, in real complex programs there tend to be implicit constraints on the data that are not formally enforced. Seeing examples is a good way to understand these implicit, soft constraints.

## Inspecting complex data structures

Most existing strategies for annotating code come in the form of adding commented text to source files. This approach is simple and makes it easy to evolve annotations alongside code, but it also limits the space available for annotations, and only allows for annotations that can be expressed with text. Comments are sufficient for expressing simple example cases like this one from the YARDOC website:

    # @example Reverse a String
    #   "mystring".reverse #=> "gnirtsym"
    def reverse; end

but large numbers of examples, or examples containing large data structures, are too cumbersome to write or read as comments.

By showing annotations in a sidebar separate from the code, Margin Notes provides more space for viewing many examples. Each example can contain rich data structures that the programmer can interactively inspect wherever she finds it useful.

The example code below is from an open-source Ruby library called ruby-money which helps programmers with tasks like currency exchange rates. Many of the arguments to the `initialize` method for the `Money` class can take a few different types, as documented in the comments in the code. There are even examples in the comments, but they exclusively demonstrate usage when the inputs are primitives.

Using examples that Margin Notes recorded while running the test suite for the gem, the programmer finds an example where the `currency` parameter is an instance of the `Money::Currency` class, and can view a representation of that object to get a sense of what it represents—in this case, the US Dollar currency. This object is represented simply by serializing its internal instance variables, but objects can also provide a serialized representation of themselves which Margin Notes will display.
      </vue-markdown>
    </div>

    <demo
    v-bind:code="presets.money.code"
    v-bind:examples="presets.money.data"
    v-bind:filename="presets.money.filename"
    v-bind:video-path="require('./assets/money-initialize.mp4')"
    default-line-number="265"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
Because that these examples were recorded while running the test suite, they tend to contain small and easily understandable data. In a sense, Margin Notes is just making it much easier to access the demo data that programmers already went through the trouble of creating for the purpose of tests—we could even think of Margin Notes as a better UI for tests.

## Seeing data from production

The example recorder can run in any context where the program runs. So, in addition to recording examples during local runs of the program or while running the test suite, it's possible to record examples while a program is running on a production server, with real input being provided by users.

This can provide a programmer with an intuitive sense of the real data that flows through a program. For example, if a programmer is wondering whether a particular algorithm will be too slow to operate on a certain collection, she can observe that users typically have around a few hundred friends in their friends array, so the algorithm will probably perform okay even though it wouldn't perform well on tens of thousands of friends.

## Greater documentation coverage

Because manually documenting methods takes time and care, there is a limit to how much of a codebase can be documented in detail. Open-source codebases where volunteers are donating their time often don't have the time to enforce strict standards around documenting methods. Even in a codebase where public APIs are well-documented, smaller private methods often have little or no documentation.

The examples that Margin Notes produces can serve as a sort of automated documentation, helping a programmer understand a method with zero manual effort required on the part of those writing the code. As a result, it could scale to situations like open-source projects or private methods in the corners of a codebase.

# Related work

- Jonathan Edwards Example Centric Programming
  - similar
    - unit tests as source of examples
  - different
    - automatically record examples
    - focused more on reading, less on authoring
    - solving an observed need of programmers
- Learnable Programming, Seymour
  - similar: "see the state" idea
  - different: those meant for beginners, this is meant for experts
  - different: snippets of traces, rather than one big trace
    - eventually could combine?
- MonkeyType
  - similar: recording characteristics of data at runtime
  - different: more detail
- Fuzzyset
  - similar: understand the program through examples
  - different: this has pre-recorded examples built in. could be a technique for building fuzzyset? fuzzyset has interactivity, could be adde
- Theseus
  - similar: records examples of calls at runtime
  - different: saves for later, making it easier to read code you aren't running
- Light Table
  - Focused on showing state from a current run
- Arvind Satya runtime stuff? (omit for now)
- Auto generation of Clojure specs

# Future work

## More data

I'm interested in exploring how Margin Notes could help programmers more by providing access to more data from runtime.

One dimension of "more data" is providing a greater amount of data for each example. For example, each example could contain a callstack showing where the context that the method was called in. This would help programmers answer questions like "where is this typically called from?"—a question which can be difficult to statically answer for languages like Ruby where metaprogramming is frequently used, but is quite easy to answer based on runtime data.

< insert picture? >

Another dimension of "more data" is providing more fine-grained examples. Method calls are a convenient level of granularity because they represent units of functionality that the programmer has decided are conceptually meaningful, but the same techniques could potentially be usefully applied to smaller pieces of a program. For example, a programmer could click on individual variables and see examples of values that variable held during runs of the program.

## Organizing examples

Margin Notes can result in many examples being recorded, and it currently doesn't do much in terms of organizing large numbers of examples to help a programmer find the most useful ones.

The system could categorize examples by types of inputs and outputs to help a programmer browse the cases that they care about. Programmers could also manually highlight certain examples as useful starting points for understanding a function.

## Interactivity

# Acknowlegements
      </vue-markdown>
    </div>
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
