<template>
  <div id="essay">
    <div class="prose">
      <p class="note">Work-in-progress, please don't share with others.</p>

      <p class="note">
        I'm most interested in your high level feedback on the ideas.
        What wasn't clear? What wasn't convincing? What's missing?
      </p>
      <p class="note">
        Thank you so much for helping me make this better! <br />
      </p>
    </div>

<h1>📝 Margin Notes:<br />automatic code documentation with recorded examples</h1>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

by Geoffrey Litt

Programmers spend a lot of time trying to understand code. Whether it's learning to use a library function or preparing to modify an existing part of a codebase, understanding what existing code does is just as important as writing new code.

Everyone hopes for well-written documentation or comments, or perhaps the opportunity to talk to the author, but sometimes the only option is to just read the code. The trouble is, reading code is *hard work;* even reading clean code requires a substantial investment of time and energy.

But what if it didn't need to be so hard? Could we build better tools to help us understand code more easily?

## Seeing the board

Take a look at this snippet of Ruby code. It's a method on a `Game` class in a tic-tac-toe game, which prints out the board. See if you can figure out what its output looks like by reading the code:

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

This method isn't doing anything too complicated, but even these few simple lines can take some time to puzzle through. One reason code is hard to understand is that it describes *abstract* behavior, applicable to countless situations.  It's usually easier to understand an abstract concept if we can see some *concrete* examples; in this case, adding an example as a comment helps explain the behavior:

```ruby
class Game
  # A string representation of the board state.
  #
  # Example:
  #  X | O |
  # -----------
  #  X |   | O
  # -----------
  #    | X |
  #
  def to_s
    @squares.map do |row|
      row.map { |square| " " + (square || " ") + " " }.join("|")
    end.join("\n------------\n")
  end
end
```

It would be great to have examples like this always available when reading code, but it's a lot of work to manually write them, and even more work to keep them up to date as the code changes. Wouldn't it be nice if we could automatically get examples somehow?

Fortunately, there's already a well of examples just waiting to be tapped. Each time the program runs, it contains some specific data—so why not use that data as an example? In this essay, I'll introduce **Margin Notes**, a prototype tool that records examples in any context where a program actually runs, anywhere from a test suite to a production server. It then displays those examples next to the code in a rich interactive viewer, which overcomes the limitations of including text examples in the code itself.

Here's how you could use Margin Notes to browse examples of that tic-tac-toe method, recorded from an actual game:

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

Software engineers get by every day with the tools that we have, but that doesn't mean our tools are adequate. I believe we could create radically better tools to understand our code—moving beyond static, textual descriptions of behavior to incorporate rich information from what the program actually does at runtime. Using code to understand what a program does is like reading a textbook to understand how a bicycle works; it's a lot easier to just watch the gears as it moves. How might we better see the gears in our code?

Margin Notes is just a small, simple example of a better tool for understanding code. But I hope it prompts you to rethink the relationship between runtime behavior and static code, and to reflect on the inadequacies of the tools we use today to build software.

# Reading code with Margin Notes

Here's another method from the tic-tac-toe program, which determines whether a player  has won the game.

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
    v-bind:video-path="require('./assets/tic-tac-toe-player-2.mp4')"
    default-line-number="85"
    ></demo>

    <div class="prose">
      <vue-markdown v-bind:breaks="false" v-bind:html="true">
This gives us some valuable information! First, we learn that `player` is an integer. Ruby is a dynamically typed language so we can't get this type information from the code, but Margin Notes gives us a way to find the types of arguments.

*Margin Notes was inspired by systems that create automatic type annotations by observing code at runtime, including [MonkeyType](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881), a Python project by Instagram, and [a similar tool](https://medium.com/@arpith/type-checking-ruby-with-minimal-effort-ed1859e552c0) for Ruby by Arpith Siromoney.

Not only do we learn that `player` is an integer; we also learn that it takes on the values 0 and 1, which helps us understand what we can do with the object. There are many cases like this where there's valuable information about an object that isn't captured by its type alone—another example is that knowing an object is a Hash doesn't tell you what the keys are.

It's worth noting that, based on these examples, we can't conclude `player` is always an integer with values 0 or 1. These examples are from a single game, and they don't represent a formal guarantee about all the values that could ever appear in the program. But that's ok, because Margin Notes is about conveying a starting point for understanding, not providing an exhaustive understanding of all possible states. If we had examples from multiple games that all used the values 0 and 1, we could probably assume those are the typical values, and then verify that assumption later if needed.

In this simple case, this contextual information could have been included a code comment. But code comments will never be present everywhere we want them to be, and Margin Notes provides a way to quickly view helpful examples in the absence of comments. Next, let's examine an example where Margin Notes goes beyond what we can do today with comments.

## Understanding a library

In the tic-tac-toe examples, I just recorded examples while playing a game, but in other cases, it's not as obvious how to run all the parts of a program to gather examples. In these situations, **test suites** can be a useful context for recording, because they generally aim to exercise a lot of the code and contain small, easily understandable bits of example data.

I decided to use Margin Notes to try recording examples while running the test suite for `ruby-money`, a popular Ruby library for dealing with currencies. Here's the constructor method for the `Money` class; as the extensive comment indicates, you can pass lots of different types of objects to the various parameters. The comment even provides some helpful examples, which is so great!

```ruby
# Creates a new Money object of value given in the
  # +fractional unit+ of the given +currency+.
  #
  # Alternatively you can use the convenience
  # methods like {Money.ca_dollar} and {Money.us_dollar}.
  #
  # @param [Object] obj Either the fractional value of the money,
  #   a Money object, or a currency. (If passed a currency as the first
  #   argument, a Money will be created in that currency with fractional value
  #   = 0.
  # @param [Currency, String, Symbol] currency The currency format.
  # @param [Money::Bank::*] bank The exchange bank to use.
  #
  # @return [Money]
  #
  # @example
  #   Money.new(100)        #=> #&lt;Money @fractional=100 @currency="USD"&gt;
  #   Money.new(100, "USD") #=> #&lt;Money @fractional=100 @currency="USD"&gt;
  #   Money.new(100, "EUR") #=> #&lt;Money @fractional=100 @currency="EUR"&gt;
  #
  def initialize(obj, currency = Money.default_currency, bank = Money.default_bank)
    @fractional = obj.respond_to?(:fractional) ? obj.fractional : as_d(obj)
    @currency   = obj.respond_to?(:currency) ? obj.currency : Currency.wrap(currency)
    @currency ||= Money.default_currency
    @bank       = obj.respond_to?(:bank) ? obj.bank : bank
  end
```

As helpful as this comment is, it also illustrates the limitations of text for conveying documentation. The comment takes up a ton of space and is difficult to navigate without much visual structure. The examples also don't cover how to pass in rich objects to the method because it's difficult to represent these objects in text.

Here's how Margin Notes provides examples for this method:
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
In this demo, I found an example where the `currency` parameter is an instance of the `Money::Currency` class, and interactively viewed a representation of that object to get a sense of what it represents—in this case, the US Dollar currency. Here, rich objects are shown by simply displaying the values of their instance variables, but in theory the system could easily allow objects to define how they should be serialized for display in the Margin Notes sidebar.

As you can see, breaking out of the constraints of text provides more space for information, and allows for freedom in how to display it, including interactivity. The current prototype is a simple sidebar, but these examples could be displayed in many different ways. Viewers for these examples could be built into all the different places where read code, ranging from text editors to code repositories like Github, and the design could be adapted for those different contexts.

When showing examples from the test suite, Margin Notes isn't doing anything you couldn't do yourself by running the tests and inspecting code in a debugger. But by making it so much easier to see example code anywhere, Margin Notes makes it easier to incorporate that sort of exploration naturally into the act of reading code.

      </vue-markdown>
      <p class="note">todo: add a couple more examples</p>
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

# Future work

This is just an early prototype, and I imagine some directions for developing this further:

**Organizing examples:** Margin Notes can record many examples, and it currently doesn't do anything to organize large numbers of examples to help a programmer find the most useful ones. As a start, the system could categorize examples by the types of inputs and outputs, to help a programmer browse the cases that they care about. Programmers could also manually highlight certain examples as useful starting points for understanding a function.

**Showing a whole execution:** Another way the system could be more useful would be to tie individual examples together, answering questions like "what call came next after this one?" This work could draw inspiration from other projects that have focused on understanding a single execution over time, like [record-and-replay debuggers](https://rr-project.org/), as well as projects like [Learnable Programming](http://worrydream.com/LearnableProgramming/) and [Seymour](https://harc.github.io/seymour-live2017/).

**More detail:** I think Margin Notes could also become more useful by showing data at different levels of granularity. Method calls are a convenient level because they represent units of functionality that the programmer has decided are conceptually meaningful, but the same techniques could be applied to smaller pieces of a program. For example, a programmer could click on individual variables and see example values from real runs of the program.

**Interactivity:** Perhaps the biggest gap I see in this prototype is the lack of true interactivity. After viewing recorded examples, a natural next step towards deeper understanding is to try modifying those examples and re-running them to see the new result. In many programs today, getting to a point where you can probe the behavior of a method like requires a lot of setup work. What if it were as easy as clicking "edit" on an example in Margin Notes? Glen Chiacchieri's [Human-Readable Interactive Representation of a Code Library](http://glench.github.io/fuzzyset.js/ui/) and the [documentation for the Paper.js](http://paperjs.org/reference/path/#path-line-from-to) offer two superb examples of how an interactive environment can help people understand programs better.

# Designing for experts

      </vue-markdown>
      <figure>
        <img src="/margin-notes/static/scratch.jpg" />
        <figcaption>Warning: not intended for industrial use</figcaption>
      </figure>
      <vue-markdown v-bind:breaks="false" v-bind:html="true">

Bret Victor's essay [Learnable Programming](http://worrydream.com/LearnableProgramming/) introduced the principle of "seeing the state"—the idea that seeing the runtime behavior of a program is critical to developing a person's understanding of that program. That essay specifically mentions that this principle isn't intended to only apply to beginners:

> These design principles were presented in the context of systems for learning, but they apply universally. An experienced programmer may not need to know what an "if" statement means, but she does need to understand the runtime behavior of her program, and she needs to understand it while she's programming.

Despite this disclaimer, many of the most prominent examples of visualizing runtime data maintain a focus on the needs of beginners. [Scratch](https://scratch.mit.edu/)—one of the most prominent non-text-based programming environments today—is designed for younger children, to the point that even [older children don't think it's for them](https://medium.freecodecamp.org/scratch-has-a-marketing-problem-f84626bd18ef), much less professionals. [Online Python Tutor](http://www.pythontutor.com/) visualizes execution line-by-line, helping beginners understand the basics of how code works. [Seymour](https://harc.github.io/seymour-live2017/) further develops some of the ideas of Learnable Programming, with a specific emphasis on teaching in the classroom.

Perhaps partially as a result of this general leaning, many expert programmers think that richer visualizations of program behavior are meant for beginners, not for them. And it doesn't help that interactive debuggers, the state-of-the-art tools professionals have for visualizing runtime data, provide little enough utility that [many expert programmers forego them entirely](https://lemire.me/blog/2016/06/21/i-do-not-use-a-debugger/).

## What do experts need?

So, in the interest of progress, and of changing perceptions, I think we would benefit from seeing more ideas for how runtime visualization can help expert programmers. This necessitates asking: if an experienced programmer doesn't know need to know what an "if" statement means, what *does* she need to know about what her program is doing, and for what purpose?

I know that as I'm reading code, I often want to quickly understand the arguments and return value for a method. These needs are especially present when collaborating on a large codebase, since I'm often working with unfamiliar code that I didn't originally write.

One thing that excites me about these needs is that programmers have deemed them important enough to address with our existing tools; code comments with types and examples are an attempt to solve these needs within the constraints of text. Not only does this suggest to me that these use cases are real and important, it also gives me hope that there's an easy way to communicate the value of a better solution to expert programmers. "You know how you manually write documentation comments with examples, and find them useful when reading code? What if the computer did some of that work for you, and generated better results?"

I think communicating value like this is important for getting programmers excited. The [Light Table](http://lighttable.com/) IDE, which I see as the most successful attempt so far at shipping runtime visualization in a real product, currently lists as the first full sentence on the homepage: "Connects you to your creation with instant feedback and showing data values flow through your code." This pitch was able to attract people who found that idea compelling, but many programmers I've talked to don't see "showing data values flow through your code" as a familiar need. Margin Notes isn't solely a replacement for documentation comments, but maybe framing it in those terms could help explain why it's a useful tool.

Of course, seeing examples of data in method calls is just one of so many needs that professional programmers have. We still need better ways to see how big pieces of our systems fit together, views of how data flows between chunks of code, tools to help us develop an intuitive grasp of what our systems are doing. I look forward to a day where our tools are powerful enough that understanding a program feels as simple as watching the gears turn on a bicycle.      </vue-markdown>
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

#essay {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 1024px;
  margin-left: 120px;
  margin-right: 50px;

  .prose {
    font-family: 'Merriweather', serif;
    font-weight: 300;
    max-width: 600px;
    line-height: 1.5em;

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
        color: #ddd;
        font-size: 14px;
      }
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

@media only screen and (max-width: 800px) {
  #essay{
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
