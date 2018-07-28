<template>
  <div id="essay">
    <p class="note">
      Work-in-progress, please don't share with others.
      Thanks for helping me make this better!
    </p>

<h1>Margin Notes: reading code with recorded examples</h1>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

by Geoffrey Litt

As software engineers, we read a lot of code. We review pull requests; we familiarize ourselves with code before modifying it; we read our own code as we write it.

Reading code is *hard work.* No matter how "clean" it is, I still find that reading code requires a substantial investment of time and mental energy.

Take the below snippet of Ruby code. It's a method on a `Game` class in a tic-tac-toe game. See if you can figure out what its output looks like just by reading the code.

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

This code isn't doing anything particularly complicated, but I often find myself staring at bits of code like this for a long time to understand them—holding on to imaginary bits of state, simulating manipulations, remembering the structure of variables. If you've programmed a lot, you've probably done this enough that it feels natural, but to me, this activity feels inefficient at best, and maddening at worst. The computer already knows how to execute this code, so why am I spending time simulating the computer in my brain? Why not let the computer do the work?

## A demo

In this essay, I'll introduce **Margin Notes**, an early prototype of a tool that helps people read code more *fluently,* by showing example data next to the program. Here's how you could use Margin Notes to quickly see what that tic-tac-toe method does:
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
Margin Notes saves examples of method calls as a program is actually running, and then later displays the examples alongside the program's code. Examples can be recorded in any context where the program is running—in an automated test suite, a manual execution, or running on a production server. I think seeing examples in this way could help people read code more fluently, by:

- understanding the **typical data values** in a program
- interactively inspecting the contents of **rich objects** and nested data structures
- seeing real example data from **production servers**
- getting a form of **documentation** for every single method in a codebase

More broadly, this essay isn't just about Margin Notes. I'm interested in how we can make more tools for professional programmers that radically improve our ability to understand our code. Many innovative programming tools focus on the needs of beginners learning to write small programs, but Margin Notes aims to help software engineers collaborating on large codebases. Later on, I'll discuss my hopes for how this approach could yield better tools for experts.

# Reading code with Margin Notes

Margin Notes provides many tools to help a programmer understand what code does. Some of them replace the value of manual comments often added to programs today, while others add new functionality that programmers have no way of accessing with their existing tools.

## Type annotations

One benefit of statically typed languages is that they provide programmers and their tools with information about the types of every variable while the code is being written and read. This makes it simple for the programmer to answer questions like "what operations can I perform on this variable?"

In a dynamically typed language like Ruby, it's theoretically impossible to answer such questions statically, but in practice there are many cases where a variable usually takes on a specific type. As a result, large Ruby codebases often contain manual type hints for each method suggesting the expected types of arguments and return values, e.g. using the popular [yardoc](https://yardoc.org/index.html) commenting system. These annotations aren't nearly as complete or rigorous as the formal type definitions in a statically typed language, but based on their prevalence in Ruby codebases, programmers clearly still find them valuable—knowing what type is *typically* expected makes it easier to program than not knowing at all.

There are some systems that cleverly create automatic type annotations by observing the code at runtime, like [MonkeyType](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881), a Python project by Instagram, and [a similar tool](https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0) for Ruby by Arpith Siromoney. Margin Notes takes inspiration from those projects, and similarly to them, can provide information about types.

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

While there are formal ways of providing a stronger guarantee to the programmer that the data will always take a certain constrained shape, in real complex programs there tend to be implicit constraints on the data that are not formally enforced. Seeing examples is a good way to understand these softer constraints.

## Inspecting complex data structures

Most existing strategies for annotating code come in the form of adding commented text to source files. This approach is simple and makes it easy to evolve annotations alongside code, but it also limits the space available for annotations, and only allows for annotations that can be expressed with text. Comments are sufficient for expressing simple example cases, like this one from the YARDOC website:

    # @example Reverse a String
    #   "mystring".reverse #=> "gnirtsym"
    def reverse; end

But large numbers of examples, or examples containing large data structures, are too cumbersome to write or read as comments.

By showing annotations in a sidebar separate from the code, Margin Notes provides more space for viewing many examples. Each example can contain rich data structures that the programmer can interactively inspect wherever she finds it useful.

The example code below is from an open-source Ruby library called ruby-money which helps programmers with tasks like currency exchange rates. Many of the arguments to the `initialize` method for the `Money` class can take a few different types, as documented in the comments in the code. There are even examples in the comments, but they exclusively demonstrate usage when the inputs are primitives.

Using examples that Margin Notes recorded while running the test suite for the gem, the programmer finds an example where the `currency` parameter is an instance of the `Money::Currency` class, and can view a representation of that object to get a sense of what it represents—in this case, the US Dollar currency. This particular object is represented here by its internal instance variables, but objects can also specify a serialization format that more faithfully represents the object.
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
Because that these examples were recorded while running the test suite, they tend to contain small and easily understandable data. In a sense, Margin Notes is just making it much easier to access the demo data that programmers already went through the trouble of creating for the purpose of tests—you could even think of Margin Notes as a better UI for tests.

## Seeing data from production

The example recorder can run in any context where the program runs. So, in addition to recording examples during local runs of the program or while running the test suite, it's possible to record examples while a program is running on a production server, with real input being provided by users.

This can provide a programmer with an intuitive sense of the real data that flows through a program. For example, if a programmer is wondering whether a particular algorithm will be too slow to operate on a certain collection, she can observe that users typically have around a few hundred friends in their friends array, so the algorithm will probably perform okay even though it wouldn't perform well on tens of thousands of friends.

## Greater documentation coverage

Because manually documenting methods takes time and care, there is a limit to how much of a codebase can be documented in detail. Open-source codebases where volunteers are donating their time often don't have the time to enforce strict standards around documenting methods. Even in a codebase where public APIs are well-documented, smaller private methods often have little or no documentation.

The examples that Margin Notes produces can serve as a sort of automated documentation, helping a programmer understand a method with zero manual effort required on the part of those writing the code. As a result, it could scale to situations like open-source projects or private methods in the corners of a codebase.

# How it works

The main point of this essay is the concept, but I'll briefly describe the prototype implementation. Margin Notes has two main parts, the *recorder* and the *viewer*.

The recorder is a [Ruby library](https://github.com/geoffreylitt/example-recorder) which observes examples of method inputs/outputs as a program runs using the `TracePoint` API in Ruby, and saves those examples to a file. The resulting recording is a JSON file containing data about every method call, with serialized versions of arguments and return values. Recorders could be built in other languages, although it might require substantially more effort in certain languages.

The viewer is a UI that displays recorded examples alongside the code for the program, so that the programmer can efficiently use them to aid her understanding while reading the code. The prototype viewer is a [simple web UI](https://github.com/geoffreylitt/example-docs) implemented using the Codemirror library, but I envision viewers being built into all the places that programmers read code, ranging from text editors and IDEs to code repositories like Github.

# Designing for experts

Bret Victor's essay [Learnable Programming](http://worrydream.com/LearnableProgramming/) introduced, among others, the principle of "seeing the state"—the idea that seeing the runtime behavior of a program is critical to developing a person's understanding of that program. That essay specifically mentions that this principle isn't intended to only apply to beginners:

> These design principles were presented in the context of systems for learning, but they apply universally. An experienced programmer may not need to know what an "if" statement means, but she does need to understand the runtime behavior of her program, and she needs to understand it while she's programming.

Despite this disclaimer, many of the most prominent examples of visualizing runtime data maintain a focus on the needs of beginners. [Scratch](https://scratch.mit.edu/)—one of the most prominent non-text-based programming environments today—is explicitly designed for younger children. [Online Python Tutor](http://www.pythontutor.com/) visualizes execution line-by-line, helping beginners understand the basics of how code works. [Seymour](https://harc.github.io/seymour-live2017/) further develops some of the ideas of Learnable Programming, with an emphasis on teaching the basics.

Perhaps partially as a result of this leaning, I've observed a perception among expert programmers that richer visualizations of program behavior are meant for beginners, not for them. (From a [Hacker News discussion](https://news.ycombinator.com/item?id=4577133) of Learnable Programming: "As far as learning is concerned, I think this is a wonderful idea... I'm interested, though, in what the ramifications are for advanced, complex programming. I have difficulty imagining this sort of model expanded beyond elementary visualization techniques...") It doesn't help that interactive debuggers, the state-of-the-art tools for visualizing runtime data, apparently provide little enough utility that [many expert programmers forego them entirely](https://lemire.me/blog/2016/06/21/i-do-not-use-a-debugger/).

## What do experts need?

So, in the interest of progress, and of changing perceptions, I think we would benefit from seeing more ideas for how runtime visualization can help expert programmers. This necessitates asking: if an experienced programmer doesn't know need to know what an "if" statement means, what *does* she need to know about what her program is doing, and for what purpose?

Reflecting on my personal experience, I discovered some of my own answers to that question. As I'm reading code, I often want to quickly understand what the arguments to a method look like, so I can manipulate them inside the method. I also often want to understand what the return value of a method looks like, so I can use its results after calling it. I find that these needs are especially present when collaborating on a large codebase, since I'm usually working with unfamiliar code that I didn't originally write.

One thing that excites me about these particular needs is that programmers have deemed them important enough to address with our existing tools; code comments with types and examples are one way to solve these needs within the constraints of text. Not only does this suggest to me that these use cases are real and important, it also gives me hope that there's an easy way to communicate the value of a better solution to expert programmers: "You know how you manually write documentation comments with examples, and find them useful when reading code? What if the computer saved you some of that time, and generated better results?"

This goal of communication might seem secondary, but I think it's paramount for generating excitement among a wide range of programmers. The [Light Table](http://lighttable.com/) IDE, which I see as the most successful attempt so far at shipping runtime visualization in a real product, currently lists as the first full sentence on the homepage: "Connects you to your creation with instant feedback and showing data values flow through your code." This pitch was able to attract people who found that idea compelling, but many programmers I've talked to don't see "showing data values flow through your code" as a familiar need. Margin Notes isn't solely a replacement for documentation comments, but maybe framing it in those terms could help convey the value.

Of course, seeing examples of data in method calls is just one of many needs that professional programmers face. I would love to see more projects that solve for other things experts truly need to understand about how their programs are running.

# Future work

This is just the seed of an idea, and there are some directions I think would be interesting to explore further:

<p class="note">todo note: add screenshots/mockups to better explain these concepts</p>

## Seeing more data

One of my favorite things about Ruby is the robust support for metaprogramming. But using this power comes with costs; one problem is that if you're dynamically generating method calls, it becomes impossible to use a text search to find all the places where a given method gets called. This is a problem that could be solved by recording additional runtime behavior: if Margin Notes examples contained a callstack showing the context of that specific method call, you could use that to determine where a given method is usually called from.

I think Margin Notes could also become more useful by showing data at different levels of granularity. Method calls are a convenient level because they represent units of functionality that the programmer has decided are conceptually meaningful, but the same techniques could be applied to smaller pieces of a program. For example, a programmer could click on individual variables and see example values from real runs of the program.

## Organizing examples

Margin Notes can record many examples, and it currently doesn't do anything to organize large numbers of examples to help a programmer find the most useful ones. As a start, the system could categorize examples by the types of inputs and outputs to help a programmer browse the cases that they care about. Programmers could also manually highlight certain examples as useful starting points for understanding a function.

Another way the system could be more useful would be to tie individual examples together, answering questions like "what call came next after this one?" This work could draw inspiration from other projects that have focused on understanding a single execution over time, like [record-and-replay debuggers](https://rr-project.org/), as well as projects like [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/).

## Interactivity

After viewing recorded examples, a natural next step towards deeper understanding is to try modifying, combining, or generating new examples. In many programs today, getting to a point where you can probe the behavior of a method requires a lot of setup work. What if it were as easy as clicking "edit" on an example in Margin Notes? Glen Chiacchieri's [Human-Readable Interactive Representation of a Code Library](http://glench.github.io/fuzzyset.js/ui/) suggests one idea of how this sort of easily accessible interactive environment could help people understand programs better.

## Testing

I've used this prototype and have found it useful when reading through the code for some libraries, but it hasn't had much testing beyond that. I'd like to make the tool more full-featured and robust so I can get some programmers to try it out—you would be justified in being skeptical of all of the claims I've made in this essay until more people have used this thing!

If you're interested in using the tool or giving feedback, please [get in touch](mailto:gklitt@gmail.com), or [follow me on Twitter](https://twitter.com/geoffreylitt) for updates on the project.
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
    line-height: 1.3em;

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
