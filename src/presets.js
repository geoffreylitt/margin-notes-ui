export default {
    fibonacci: {
      filename: "/Users/glitt/personal-dev/example-annotations/fib.rb",
      code: `
# returns the nth number in fibonacci sequence
def fib(n)
  return nil if n <= 0

  if n == 1 || n == 2
    1
  else
    fib(n - 1) + fib(n - 2)
  end
end
      `,
      data:[{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":-1}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":1}},"return_value":{"class_name":"Fixnum","value":1},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":2}},"return_value":{"class_name":"Fixnum","value":1},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":3}},"return_value":{"class_name":"Fixnum","value":2},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":4}},"return_value":{"class_name":"Fixnum","value":3},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":5}},"return_value":{"class_name":"Fixnum","value":5},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":6}},"return_value":{"class_name":"Fixnum","value":8},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":7}},"return_value":{"class_name":"Fixnum","value":13},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":8}},"return_value":{"class_name":"Fixnum","value":21},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":9}},"return_value":{"class_name":"Fixnum","value":34},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]},{"klass":"Object","method":"#<Method: Object#fib>","parameters":[["req","n"]],"arguments":{"n":{"class_name":"Fixnum","value":10}},"return_value":{"class_name":"Fixnum","value":55},"class_name":"Object","method_name":"fib","method_location":["/Users/glitt/personal-dev/example-annotations/fib.rb",2]}],
      lineForMethod: 2
    },
    tictactoe: {
      filename: "/Users/glitt/personal-dev/tic-tac-toe/game.rb",
      code: `
# The Game class manages board state, move validity logic, and win checking.
# It doesn't manage user interaction.

class Game
  BOARD_SIZE = 3
  PLAYER_SYMBOLS = ["X", "O"]

  def initialize
    @squares = Array.new(BOARD_SIZE).map { |row| row = Array.new(BOARD_SIZE) }
    @active_player = 0
  end

  # Try to make a move for the currently active player at the given coordinates.
  # If successful, returns the index of the new active player.
  # If unsuccessful, raises a Game::InvalidMoveException.
  def move(row, col)
    validate_move!(row, col)
    @squares[row][col] = PLAYER_SYMBOLS[@active_player]
    toggle_active_player!
  end

  # A string representation of the board state.
  # TODO: consider whether this output should be managed externally,
  #       since it's arguably more presentation and less core logic.
  def to_s
    @squares.map do |row|
      row.map { |square| " " + (square || " ") + " " }.join("|")
    end.join("\\n------------\\n")
  end

  # Index of the player who won the game, or nil if nobody has won yet
  def winner
    [0, 1].each { |player| return player if won?(player) }
    return nil
  end

  class InvalidMoveException < StandardError
  end

  attr_accessor :active_player, :squares

  private

  # Raises an exception if the move is invalid. Does nothing for a valid move.
  def validate_move!(row, col)
    if !winner.nil?
      raise InvalidMoveException, "Game already over"
    end

    [row, col].each do |index|
      if index < 0 or index > 2
        raise InvalidMoveException, "Invalid index: #{index}. Only 0 to 2 allowed."
      end
    end

    if @squares[row][col] != nil
      raise InvalidMoveException, "Square already taken: #{row}, #{col}"
    end
  end

  def toggle_active_player!
    @active_player = 1 - @active_player
  end

  # returns true if the given player has won the game
  def won?(player)
    return true if won_row?(player)
    return true if won_column?(player)
    return true if won_diagonal?(player)
    return false
  end

  def won_row?(player)
    (0..BOARD_SIZE-1).each do |row|
      return true if @squares[row].all? { |s| s == PLAYER_SYMBOLS[player] }
    end

    return false
  end

  def won_column?(player)
    (0..BOARD_SIZE-1).each do |col|
      squares = (0..BOARD_SIZE-1).map { |row| @squares[row][col] }
      return true if squares.all? { |s| s == PLAYER_SYMBOLS[player] }
    end

    return false
  end

  def won_diagonal?(player)
    # check left diagonal
    squares = (0..BOARD_SIZE-1).map { |i| @squares[i][i] }
    return true if squares.all? { |s| s == PLAYER_SYMBOLS[player] }

    # check right diagonal
    squares = (0..BOARD_SIZE-1).map { |i| @squares[(BOARD_SIZE - 1) - i][i] }
    return true if squares.all? { |s| s == PLAYER_SYMBOLS[player] }

    return false
  end
end
`   ,
      data:
        [{"klass":"Game","method":"#<Method: Game#won_row?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_row?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",73]},{"klass":"Game","method":"#<Method: Game#won_column?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_column?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",81]},{"klass":"Game","method":"#<Method: Game#won_diagonal?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_diagonal?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",90]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#won_row?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_row?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",73]},{"klass":"Game","method":"#<Method: Game#won_column?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_column?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",81]},{"klass":"Game","method":"#<Method: Game#won_diagonal?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_diagonal?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",90]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#winner>","parameters":[],"arguments":{},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"winner","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",32]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#toggle_active_player!>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"toggle_active_player!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",61]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X |   |   \n------------\n   |   |   \n------------\n   |   |   "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#random_candidates>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},"class_name":"AIPlayer","method_name":"random_candidates","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",6]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#get_move>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[2,2]},"class_name":"AIPlayer","method_name":"get_move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",2]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#toggle_active_player!>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"toggle_active_player!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",61]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X |   |   \n------------\n   |   |   \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X | X |   \n------------\n   |   |   \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#random_candidates>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1]]},"class_name":"AIPlayer","method_name":"random_candidates","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",6]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#get_move>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[1,2]},"class_name":"AIPlayer","method_name":"get_move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",2]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":1},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":1},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X | X |   \n------------\n   |   | O \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":1},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":1},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X | X |   \n------------\n X |   | O \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#random_candidates>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[[0,2],[1,1],[2,0],[2,1]]},"class_name":"AIPlayer","method_name":"random_candidates","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",6]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#get_move>","parameters":[["req","game"]],"arguments":{"game":{"class_name":"Game","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "}},"return_value":{"class_name":"Array","value":[2,1]},"class_name":"AIPlayer","method_name":"get_move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",2]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X | X |   \n------------\n X |   | O \n------------\n   | O | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":" X | X |   \n------------\n X |   | O \n------------\n X | O | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#won_column?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Game","method_name":"won_column?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",81]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#winner>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"winner","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",32]}]
    },
    hash: {
      filename: "hash.rb",
      code:
`
require_relative 'example_recorder'

# returns the nth number in fibonacci sequence
def final_hash(a)
  intermediate_hash.merge(
      id: a
  )
end

def intermediate_hash
    { external_id: 123 }
end

recorder = ExampleRecorder.new

recorder.record do
    hash = final_hash(100)
end

puts recorder.serialized_examples
`,
      data: [{"klass":"Object","method":"#<Method: main.intermediate_hash>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"external_id":123,"nestedHash":{"a":1,"b":2}}},"class_name":"Object","method_name":"intermediate_hash","method_location":["hash.rb",10]},{"klass":"Object","method":"#<Method: main.final_hash>","parameters":[["req","a"]],"arguments":{"a":{"class_name":"Integer","value":100}},"return_value":{"class_name":"Hash","value":{"external_id":123,"id":100,"bool": false,"stringKey": "String val","hashKey":{"a":1,"b":2}}},"class_name":"Object","method_name":"final_hash","method_location":["hash.rb",4]}]
    },
    money: {
      filename: "/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",
      code:
`
# encoding: utf-8
require "money/bank/variable_exchange"
require "money/bank/single_currency"
require "money/money/arithmetic"
require "money/money/constructors"
require "money/money/formatter"
require "money/money/allocation"

# "Money is any object or record that is generally accepted as payment for
# goods and services and repayment of debts in a given socio-economic context
# or country." -Wikipedia
#
# An instance of Money represents an amount of a specific currency.
#
# Money is a value object and should be treated as immutable.
#
# @see http://en.wikipedia.org/wiki/Money
class Money
  include Comparable
  include Money::Arithmetic
  extend Constructors

  # Raised when smallest denomination of a currency is not defined
  class UndefinedSmallestDenomination < StandardError; end

  # Convenience method for fractional part of the amount. Synonym of #fractional
  #
  # @return [Integer] when infinite_precision is false
  # @return [BigDecimal] when infinite_precision is true
  #
  # @see infinite_precision
  def cents
    fractional
  end

  # The value of the monetary amount represented in the fractional or subunit
  # of the currency.
  #
  # For example, in the US dollar currency the fractional unit is cents, and
  # there are 100 cents in one US dollar. So given the Money representation of
  # one US dollar, the fractional interpretation is 100.
  #
  # Another example is that of the Kuwaiti dinar. In this case the fractional
  # unit is the fils and there 1000 fils to one Kuwaiti dinar. So given the
  # Money representation of one Kuwaiti dinar, the fractional interpretation is
  # 1000.
  #
  # @return [Integer] when infinite_precision is false
  # @return [BigDecimal] when infinite_precision is true
  #
  # @see infinite_precision
  def fractional
    # Ensure we have a BigDecimal. If the Money object is created
    # from YAML, @fractional can end up being set to a Float.
    fractional = as_d(@fractional)

    return_value(fractional)
  end

  # Round a given amount of money to the nearest possible amount in cash value. For
  # example, in Swiss franc (CHF), the smallest possible amount of cash value is
  # CHF 0.05. Therefore, this method rounds CHF 0.07 to CHF 0.05, and CHF 0.08 to
  # CHF 0.10.
  #
  # @return [Integer] when infinite_precision is false
  # @return [BigDecimal] when infinite_precision is true
  #
  # @see infinite_precision
  def round_to_nearest_cash_value
    unless self.currency.smallest_denomination
      raise UndefinedSmallestDenomination, 'Smallest denomination of this currency is not defined'
    end

    fractional = as_d(@fractional)
    smallest_denomination = as_d(self.currency.smallest_denomination)
    rounded_value = (fractional / smallest_denomination).round(0, self.class.rounding_mode) * smallest_denomination

    return_value(rounded_value)
  end

  # @!attribute [r] currency
  #   @return [Currency] The money's currency.
  # @!attribute [r] bank
  #   @return [Money::Bank::Base] The +Money::Bank+-based object which currency
  #     exchanges are performed with.

  attr_reader :currency, :bank

  # Class Methods
  class << self

    # @!attribute [rw] default_bank
    #   @return [Money::Bank::Base] Each Money object is associated to a bank
    #     object, which is responsible for currency exchange. This property
    #     allows you to specify the default bank object. The default value for
    #     this property is an instance of +Bank::VariableExchange.+ It allows
    #     one to specify custom exchange rates.
    #
    # @!attribute default_formatting_rules
    #   @return [Hash] Use this to define a default hash of rules for every time
    #     +Money#format+ is called.  Rules provided on method call will be
    #     merged with the default ones.  To overwrite a rule, just provide the
    #     intended value while calling +format+.
    #
    #   @see +Money::Formatting#format+ for more details.
    #
    #   @example
    #     Money.default_formatting_rules = { display_free: true }
    #     Money.new(0, "USD").format                          # => "free"
    #     Money.new(0, "USD").format(display_free: false)  # => "$0.00"
    #
    # @!attribute [rw] use_i18n
    #   @return [Boolean] Use this to disable i18n even if it's used by other
    #     objects in your app.
    #
    # @!attribute [rw] infinite_precision
    #   @return [Boolean] Use this to enable infinite precision cents
    #
    # @!attribute [rw] conversion_precision
    #   @return [Integer] Use this to specify precision for converting Rational
    #     to BigDecimal
    attr_accessor :default_bank, :default_formatting_rules,
      :use_i18n, :infinite_precision, :conversion_precision

    # @attr_writer rounding_mode Use this to specify the rounding mode
    #
    # @!attribute default_currency
    #   @return [Money::Currency] The default currency, which is used when
    #     +Money.new+ is called without an explicit currency argument. The
    #     default value is Currency.new("USD"). The value must be a valid
    #     +Money::Currency+ instance.
    attr_writer :rounding_mode, :default_currency

  end

  def self.default_currency
    if @default_currency.respond_to?(:call)
      Money::Currency.new(@default_currency.call)
    else
      Money::Currency.new(@default_currency)
    end
  end

  def self.setup_defaults
    # Set the default bank for creating new +Money+ objects.
    self.default_bank = Bank::VariableExchange.instance

    # Set the default currency for creating new +Money+ object.
    self.default_currency = Currency.new("USD")

    # Default to using i18n
    self.use_i18n = true

    # Default to not using infinite precision cents
    self.infinite_precision = false

    # Default to bankers rounding
    self.rounding_mode = BigDecimal::ROUND_HALF_EVEN

    # Default the conversion of Rationals precision to 16
    self.conversion_precision = 16
  end

  def self.inherited(base)
    base.setup_defaults
  end

  setup_defaults

  # Use this to return the rounding mode.  You may also pass a
  # rounding mode and a block to temporarily change it.  It will
  # then return the results of the block instead.
  #
  # @param [BigDecimal::ROUND_MODE] mode
  #
  # @return [BigDecimal::ROUND_MODE,Yield] rounding mode or block results
  #
  # @example
  #   fee = Money.rounding_mode(BigDecimal::ROUND_HALF_UP) do
  #     Money.new(1200) * BigDecimal('0.029')
  #   end
  def self.rounding_mode(mode=nil)
    if mode.nil?
      Thread.current[:money_rounding_mode] || @rounding_mode
    else
      begin
        Thread.current[:money_rounding_mode] = mode
        yield
      ensure
        Thread.current[:money_rounding_mode] = nil
      end
    end
  end


  # Adds a new exchange rate to the default bank and return the rate.
  #
  # @param [Currency, String, Symbol] from_currency Currency to exchange from.
  # @param [Currency, String, Symbol] to_currency Currency to exchange to.
  # @param [Numeric] rate Rate to exchange with.
  #
  # @return [Numeric]
  #
  # @example
  #   Money.add_rate("USD", "CAD", 1.25) #=> 1.25
  def self.add_rate(from_currency, to_currency, rate)
    Money.default_bank.add_rate(from_currency, to_currency, rate)
  end

  # Sets the default bank to be a SingleCurrency bank that raises on
  # currency exchange. Useful when apps operate in a single currency at a time.
  def self.disallow_currency_conversion!
    self.default_bank = Bank::SingleCurrency.instance
  end

  # Creates a new Money object of value given in the +unit+ of the given
  # +currency+.
  #
  # @param [Numeric] amount The numerical value of the money.
  # @param [Currency, String, Symbol] currency The currency format.
  # @param [Money::Bank::*] bank The exchange bank to use.
  #
  # @example
  #   Money.from_amount(23.45, "USD") # => #<Money fractional:2345 currency:USD>
  #   Money.from_amount(23.45, "JPY") # => #<Money fractional:23 currency:JPY>
  #
  # @return [Money]
  #
  # @see #initialize
  def self.from_amount(amount, currency = default_currency, bank = default_bank)
    raise ArgumentError, "'amount' must be numeric" unless Numeric === amount

    currency = Currency.wrap(currency) || Money.default_currency
    value = amount.to_d * currency.subunit_to_unit
    value = value.round(0, rounding_mode) unless infinite_precision
    new(value, currency, bank)
  end

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
  #   Money.new(100)        #=> #<Money @fractional=100 @currency="USD">
  #   Money.new(100, "USD") #=> #<Money @fractional=100 @currency="USD">
  #   Money.new(100, "EUR") #=> #<Money @fractional=100 @currency="EUR">
  #
  def initialize(obj, currency = Money.default_currency, bank = Money.default_bank)
    @fractional = obj.respond_to?(:fractional) ? obj.fractional : as_d(obj)
    @currency   = obj.respond_to?(:currency) ? obj.currency : Currency.wrap(currency)
    @currency ||= Money.default_currency
    @bank       = obj.respond_to?(:bank) ? obj.bank : bank
  end

  # Assuming using a currency using dollars:
  # Returns the value of the money in dollars,
  # instead of in the fractional unit cents.
  #
  # Synonym of #amount
  #
  # @return [BigDecimal]
  #
  # @example
  #   Money.new(1_00, "USD").dollars   # => BigDecimal("1.00")
  #
  # @see #amount
  # @see #to_d
  # @see #cents
  #
  def dollars
    amount
  end

  # Returns the numerical value of the money
  #
  # @return [BigDecimal]
  #
  # @example
  #   Money.new(1_00, "USD").amount    # => BigDecimal("1.00")
  #
  # @see #to_d
  # @see #fractional
  #
  def amount
    to_d
  end

  # Return string representation of currency object
  #
  # @return [String]
  #
  # @example
  #   Money.new(100, :USD).currency_as_string #=> "USD"
  def currency_as_string
    warn "[DEPRECATION] currency_as_string is deprecated. Please use
    .currency.to_ instead."
    currency.to_s
  end

  # Set currency object using a string
  #
  # @param [String] val The currency string.
  #
  # @return [Money::Currency]
  #
  # @example
  #   Money.new(100).currency_as_string("CAD") #=> #<Money::Currency id: cad>
  def currency_as_string=(val)
    warn "[DEPRECATION] currency_as_string= is deprecated - Money instances are immutable." \
      " Please use with_currency instead."
    @currency = Currency.wrap(val)
  end

  # Returns a Integer hash value based on the +fractional+ and +currency+ attributes
  # in order to use functions like & (intersection), group_by, etc.
  #
  # @return [Integer]
  #
  # @example
  #   Money.new(100).hash #=> 908351
  def hash
    [fractional.hash, currency.hash].hash
  end

  # Uses +Currency#symbol+. If +nil+ is returned, defaults to "¤".
  #
  # @return [String]
  #
  # @example
  #   Money.new(100, "USD").symbol #=> "$"
  def symbol
    currency.symbol || "¤"
  end

  # Common inspect function
  #
  # @return [String]
  def inspect
    "#<#{self.class.name} fractional:#{fractional} currency:#{currency}>"
  end

  # Returns the amount of money as a string.
  #
  # @return [String]
  #
  # @example
  #   Money.ca_dollar(100).to_s #=> "1.00"
  def to_s
    format thousands_separator: '',
           no_cents_if_whole: currency.decimal_places == 0,
           symbol: false,
           ignore_defaults: true
  end

  # Return the amount of money as a BigDecimal.
  #
  # @return [BigDecimal]
  #
  # @example
  #   Money.us_dollar(1_00).to_d #=> BigDecimal("1.00")
  def to_d
    as_d(fractional) / as_d(currency.subunit_to_unit)
  end

  # Return the amount of money as a Integer.
  #
  # @return [Integer]
  #
  # @example
  #   Money.us_dollar(1_00).to_i #=> 1
  def to_i
    to_d.to_i
  end

  # Return the amount of money as a float. Floating points cannot guarantee
  # precision. Therefore, this function should only be used when you no longer
  # need to represent currency or working with another system that requires
  # floats.
  #
  # @return [Float]
  #
  # @example
  #   Money.us_dollar(100).to_f #=> 1.0
  def to_f
    to_d.to_f
  end

  # Returns a new Money instance in a given currency leaving the amount intact
  # and not performing currency conversion.
  #
  # @param [Currency, String, Symbol] new_currency Currency of the new object.
  #
  # @return [self]
  def with_currency(new_currency)
    new_currency = Currency.wrap(new_currency)
    if !new_currency || currency == new_currency
      self
    else
      self.class.new(fractional, new_currency, bank)
    end
  end

  # Conversion to +self+.
  #
  # @return [self]
  def to_money(given_currency = nil)
    given_currency = Currency.wrap(given_currency)
    if given_currency.nil? || self.currency == given_currency
      self
    else
      exchange_to(given_currency)
    end
  end

  # Receive the amount of this money object in another Currency.
  #
  # @param [Currency, String, Symbol] other_currency Currency to exchange to.
  #
  # @yield [n] Optional block to use when rounding after exchanging one currency
  #  for another.
  # @yieldparam [Float] n The resulting float after exchanging one currency for
  #  another.
  # @yieldreturn [Integer]
  #
  # @return [Money]
  #
  # @example
  #   Money.new(2000, "USD").exchange_to("EUR")
  #   Money.new(2000, "USD").exchange_to("EUR") {|x| x.round}
  #   Money.new(2000, "USD").exchange_to(Currency.new("EUR"))
  def exchange_to(other_currency, &rounding_method)
    other_currency = Currency.wrap(other_currency)
    if self.currency == other_currency
      self
    else
      @bank.exchange_with(self, other_currency, &rounding_method)
    end
  end

  # Receive a money object with the same amount as the current Money object
  # in United States dollar.
  #
  # @return [Money]
  #
  # @example
  #   n = Money.new(100, "CAD").as_us_dollar
  #   n.currency #=> #<Money::Currency id: usd>
  def as_us_dollar
    exchange_to("USD")
  end

  # Receive a money object with the same amount as the current Money object
  # in Canadian dollar.
  #
  # @return [Money]
  #
  # @example
  #   n = Money.new(100, "USD").as_ca_dollar
  #   n.currency #=> #<Money::Currency id: cad>
  def as_ca_dollar
    exchange_to("CAD")
  end

  # Receive a money object with the same amount as the current Money object
  # in euro.
  #
  # @return [Money]
  #
  # @example
  #   n = Money.new(100, "USD").as_euro
  #   n.currency #=> #<Money::Currency id: eur>
  def as_euro
    exchange_to("EUR")
  end

  # Splits a given amount in parts without loosing pennies. The left-over pennies will be
  # distributed round-robin amongst the parties. This means that parties listed first will likely
  # receive more pennies than ones that are listed later.
  #
  # @param [Array<Numeric>, Numeric] pass [2, 1, 1] to give twice as much to party1 as party2 or
  # party3 which results in 50% of the cash to party1, 25% to party2, and 25% to party3. Passing a
  # number instead of an array will split the amount evenly (without loosing pennies when rounding).
  #
  # @return [Array<Money>]
  #
  # @example
  #   Money.new(5,   "USD").allocate([3, 7]) #=> [Money.new(2), Money.new(3)]
  #   Money.new(100, "USD").allocate([1, 1, 1]) #=> [Money.new(34), Money.new(33), Money.new(33)]
  #   Money.new(100, "USD").allocate(2) #=> [Money.new(50), Money.new(50)]
  #   Money.new(100, "USD").allocate(3) #=> [Money.new(34), Money.new(33), Money.new(33)]
  #
  def allocate(parts)
    amounts = Money::Allocation.generate(fractional, parts, !Money.infinite_precision)
    amounts.map { |amount| self.class.new(amount, currency) }
  end
  alias_method :split, :allocate

  # Round the monetary amount to smallest unit of coinage.
  #
  # @note
  #   This method is only useful when operating with infinite_precision turned
  #   on. Without infinite_precision values are rounded to the smallest unit of
  #   coinage automatically.
  #
  # @return [Money]
  #
  # @example
  #   Money.new(10.1, 'USD').round #=> Money.new(10, 'USD')
  #
  # @see
  #   Money.infinite_precision
  #
  def round(rounding_mode = self.class.rounding_mode, rounding_precision = 0)
    rounded_amount = as_d(@fractional).round(rounding_precision, rounding_mode)
    self.class.new(rounded_amount, currency, bank)
  end

  # Creates a formatted price string according to several rules.
  #
  # @param [Hash] See Money::Formatter for the list of formatting options
  #
  # @return [String]
  #
  def format(*rules)
    Money::Formatter.new(self, *rules).to_s
  end

  # Returns a thousands separator according to the locale
  #
  # @return [String]
  #
  def thousands_separator
    Money::Formatter.new(self, {}).thousands_separator
  end

  # Returns a decimal mark according to the locale
  #
  # @return [String]
  #
  def decimal_mark
    Money::Formatter.new(self, {}).decimal_mark
  end

  private

  def as_d(num)
    if num.respond_to?(:to_d)
      num.is_a?(Rational) ? num.to_d(self.class.conversion_precision) : num.to_d
    else
      BigDecimal(num.to_s.empty? ? 0 : num.to_s)
    end
  end

  def return_value(value)
    if self.class.infinite_precision
      value
    else
      value.round(0, self.class.rounding_mode).to_i
    end
  end
end
`,
      data: [{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#initialize>","parameters":[["opt","opts"],["opt","rt"]],"arguments":{"opts":{"class_name":"Hash","value":{}},"rt":{"class_name":"Hash","value":{}}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::RatesStore::Memory","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",21]},{"klass":"Money::Bank::Base","method":"#<Method: Money::Bank::VariableExchange(Money::Bank::Base)#setup>","parameters":[],"arguments":{},"return_value":{"class_name":"NilClass","value":null},"class_name":"Money::Bank::Base","method_name":"setup","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/base.rb",82]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#initialize>","parameters":[["opt","st"],["block","block"]],"arguments":{"st":{"class_name":"Money::RatesStore::Memory","value":"#<Money::RatesStore::Memory:0x00007ffc62ec07c8>"},"block":{"class_name":"NilClass","value":null}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Money::Bank::VariableExchange","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",59]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":100}},"return_value":{"class_name":"BigDecimal","value":"0.1e3"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.stringified_keys>","parameters":[],"arguments":{},"return_value":{"class_name":"Set","value":"#<Set: {\"aed\", \"afn\", \"all\", \"amd\", \"ang\", \"aoa\", \"ars\", \"aud\", \"awg\", \"azn\", \"bam\", \"bbd\", \"bdt\", \"bgn\", \"bhd\", \"bif\", \"bmd\", \"bnd\", \"bob\", \"brl\", \"bsd\", \"btn\", \"bwp\", \"byn\", \"byr\", \"bzd\", \"cad\", \"cdf\", \"chf\", \"clf\", \"clp\", \"cny\", \"cop\", \"crc\", \"cuc\", \"cup\", \"cve\", \"czk\", \"djf\", \"dkk\", \"dop\", \"dzd\", \"egp\", \"ern\", \"etb\", \"eur\", \"fjd\", \"fkp\", \"gbp\", \"gel\", \"ghs\", \"gip\", \"gmd\", \"gnf\", \"gtq\", \"gyd\", \"hkd\", \"hnl\", \"hrk\", \"htg\", \"huf\", \"idr\", \"ils\", \"inr\", \"iqd\", \"irr\", \"isk\", \"jmd\", \"jod\", \"jpy\", \"kes\", \"kgs\", \"khr\", \"kmf\", \"kpw\", \"krw\", \"kwd\", \"kyd\", \"kzt\", \"lak\", \"lbp\", \"lkr\", \"lrd\", \"lsl\", \"ltl\", \"lvl\", \"lyd\", \"mad\", \"mdl\", \"mga\", \"mkd\", \"mmk\", \"mnt\", \"mop\", \"mro\", \"mur\", \"mvr\", \"mwk\", \"mxn\", \"myr\", \"mzn\", \"nad\", \"ngn\", \"nio\", \"nok\", \"npr\", \"nzd\", \"omr\", \"pab\", \"pen\", \"pgk\", \"php\", \"pkr\", \"pln\", \"pyg\", \"qar\", \"ron\", \"rsd\", \"rub\", \"rwf\", \"sar\", \"sbd\", \"scr\", \"sdg\", \"sek\", \"sgd\", \"shp\", \"skk\", \"sll\", \"sos\", \"srd\", \"ssp\", \"std\", \"svc\", \"syp\", \"szl\", \"thb\", \"tjs\", \"tmt\", \"tnd\", \"top\", \"try\", \"ttd\", \"twd\", \"tzs\", \"uah\", \"ugx\", \"usd\", \"uyu\", \"uzs\", \"vef\", \"vnd\", \"vuv\", \"wst\", \"xaf\", \"xag\", \"xau\", \"xba\", \"xbb\", \"xbc\", \"xbd\", \"xcd\", \"xdr\", \"xof\", \"xpd\", \"xpf\", \"xpt\", \"xts\", \"yer\", \"zar\", \"zmk\", \"zmw\", \"btc\", \"jep\", \"ggp\", \"imp\", \"xfu\", \"gbx\", \"cnh\", \"eek\", \"ghc\", \"mtl\", \"tmm\", \"yen\", \"zwd\", \"zwl\", \"zwn\", \"zwr\"}>"},"class_name":null,"method_name":"stringified_keys","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",148]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency._instances>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"usd":"USD","aed":"AED","afn":"AFN","all":"ALL","amd":"AMD","ang":"ANG","aoa":"AOA","ars":"ARS","aud":"AUD","awg":"AWG","azn":"AZN","bam":"BAM","bbd":"BBD","bdt":"BDT","bgn":"BGN","bhd":"BHD","bif":"BIF","bmd":"BMD","bnd":"BND","bob":"BOB","brl":"BRL","bsd":"BSD","btn":"BTN","bwp":"BWP","byn":"BYN","byr":"BYR","bzd":"BZD","cad":"CAD","cdf":"CDF","chf":"CHF","clf":"CLF","clp":"CLP","cny":"CNY","cop":"COP","crc":"CRC","cuc":"CUC","cup":"CUP","cve":"CVE","czk":"CZK","djf":"DJF","dkk":"DKK","dop":"DOP","dzd":"DZD","egp":"EGP","ern":"ERN","etb":"ETB","eur":"EUR","fjd":"FJD","fkp":"FKP","gbp":"GBP","gel":"GEL","ghs":"GHS","gip":"GIP","gmd":"GMD","gnf":"GNF","gtq":"GTQ","gyd":"GYD","hkd":"HKD","hnl":"HNL","hrk":"HRK","htg":"HTG","huf":"HUF","idr":"IDR","ils":"ILS","inr":"INR","iqd":"IQD","irr":"IRR","isk":"ISK","jmd":"JMD","jod":"JOD","jpy":"JPY","kes":"KES","kgs":"KGS","khr":"KHR","kmf":"KMF","kpw":"KPW","krw":"KRW","kwd":"KWD","kyd":"KYD","kzt":"KZT","lak":"LAK","lbp":"LBP","lkr":"LKR","lrd":"LRD","lsl":"LSL","ltl":"LTL","lvl":"LVL","lyd":"LYD","mad":"MAD","mdl":"MDL","mga":"MGA","mkd":"MKD","mmk":"MMK","mnt":"MNT","mop":"MOP","mro":"MRO","mur":"MUR","mvr":"MVR","mwk":"MWK","mxn":"MXN","myr":"MYR","mzn":"MZN","nad":"NAD","ngn":"NGN","nio":"NIO","nok":"NOK","npr":"NPR","nzd":"NZD","omr":"OMR","pab":"PAB","pen":"PEN","pgk":"PGK","php":"PHP","pkr":"PKR","pln":"PLN","pyg":"PYG","qar":"QAR","ron":"RON","rsd":"RSD","rub":"RUB","rwf":"RWF","sar":"SAR","sbd":"SBD","scr":"SCR","sdg":"SDG","sek":"SEK","sgd":"SGD","shp":"SHP","skk":"SKK","sll":"SLL","sos":"SOS","srd":"SRD","ssp":"SSP","std":"STD","svc":"SVC","syp":"SYP","szl":"SZL","thb":"THB","tjs":"TJS","tmt":"TMT","tnd":"TND","top":"TOP","try":"TRY","ttd":"TTD","twd":"TWD","tzs":"TZS","uah":"UAH","ugx":"UGX","uyu":"UYU","uzs":"UZS","vef":"VEF","vnd":"VND","vuv":"VUV","wst":"WST","xaf":"XAF","xag":"XAG","xau":"XAU","xba":"XBA","xbb":"XBB","xbc":"XBC","xbd":"XBD","xcd":"XCD","xdr":"XDR","xof":"XOF","xpd":"XPD","xpf":"XPF","xpt":"XPT","xts":"XTS","yer":"YER","zar":"ZAR","zmk":"ZMK","zmw":"ZMW","btc":"BTC","jep":"JEP","ggp":"GGP","imp":"IMP","xfu":"XFU","gbx":"GBX","cnh":"CNH","eek":"EEK","ghc":"GHC","mtl":"MTL","tmm":"TMM","yen":"YEN","zwd":"ZWD","zwl":"ZWL","zwn":"ZWN","zwr":"ZWR","abc":"ABC","abe":"ABE","abd":"ABD","xxx":"XXX","bar":"BAR","eu4":"EU4","indian_bar":"INDIAN_BAR"}},"class_name":null,"method_name":"_instances","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",47]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":"USD"},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":"USD"},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":100},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc62ec07f0>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc62ec07f0>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"#<Class:Money>","method":"#<Method: Money.rounding_mode>","parameters":[["opt","mode"]],"arguments":{"mode":{"class_name":"NilClass","value":null}},"return_value":{"class_name":"Integer","value":7},"class_name":null,"method_name":"rounding_mode","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",182]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e3"}},"return_value":{"class_name":"BigDecimal","value":"0.1e3"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e3"}},"return_value":{"class_name":"BigDecimal","value":"0.1e3"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"Money::Currency","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":"USD"},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.1e3"},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc62ec07f0>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc62ec07f0>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":7},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"1.00"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"#<Class:Money::Bank::Base>","method":"#<Method: Money::Bank::VariableExchange.instance>","parameters":[],"arguments":{},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":null,"method_name":"instance","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/base.rb",45]},{"klass":"#<Class:Money>","method":"#<Method: #<Class:0x00007ffc6177cf30>.setup_defaults>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":16},"class_name":null,"method_name":"setup_defaults","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",144]},{"klass":"#<Class:Money>","method":"#<Method: Money.inherited>","parameters":[["req","base"]],"arguments":{"base":{"class_name":"Class","value":"#<Class:0x00007ffc6177cf30>"}},"return_value":{"class_name":"Integer","value":16},"class_name":null,"method_name":"inherited","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",164]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"String","value":"NZD"}},"return_value":{"class_name":"Money::Currency","value":"NZD"},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"String","value":"NZD"}},"return_value":{"class_name":"Money::Currency","value":"NZD"},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"#<Class:Money>","method":"#<Method: #<Class:0x00007ffc6177cf30>.rounding_mode>","parameters":[["opt","mode"]],"arguments":{"mode":{"class_name":"NilClass","value":null}},"return_value":{"class_name":"Integer","value":7},"class_name":null,"method_name":"rounding_mode","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",182]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.16e2"}},"return_value":{"class_name":"BigDecimal","value":"0.16e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"Money::Currency","value":"NZD"}},"return_value":{"class_name":"Money::Currency","value":"NZD"},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.16e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: #<Class:0x00007ffc6177cf30>(Money)#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":7},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":null,"value":"0.16"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.15e2"}},"return_value":{"class_name":"BigDecimal","value":"0.15e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.15e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":2},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.15"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.15e2"}},"return_value":{"class_name":"Integer","value":15},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":15},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Money#cents>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":15},"class_name":"Money","method_name":"cents","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",32]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"USD"},"class_name":"Money::Currency","method_name":"to_s","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",358]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"Money::Currency","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":"USD"},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money>","method":"#<Method: Money.default_currency>","parameters":[],"arguments":{},"return_value":{"class_name":"Money::Currency","value":"USD"},"class_name":null,"method_name":"default_currency","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",136]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":10.9}},"return_value":{"class_name":"BigDecimal","value":"0.109e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":10.9},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.109e2"}},"return_value":{"class_name":"BigDecimal","value":"0.109e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.1e2"},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":2},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.10"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":10.9}},"return_value":{"class_name":"BigDecimal","value":"0.109e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":10.9},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.109e2"}},"return_value":{"class_name":"BigDecimal","value":"0.109e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.1e2"},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":2},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.10"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":"USD"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money","method":"#<Method: Money#exchange_to>","parameters":[["req","other_currency"],["block","rounding_method"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":"USD"},"rounding_method":{"class_name":"NilClass","value":null}},"return_value":{"class_name":"Money","value":"0.10"},"class_name":"Money","method_name":"exchange_to","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",441]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e2"}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":10},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e2"}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":10},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":20}},"return_value":{"class_name":"BigDecimal","value":"0.2e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":20},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":20}},"return_value":{"class_name":"BigDecimal","value":"0.2e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":20},"currency":{"class_name":"Money::Currency","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.2e2"}},"return_value":{"class_name":"BigDecimal","value":"0.2e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.2e2"}},"return_value":{"class_name":"Integer","value":20},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":20},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#zero?>","parameters":[],"arguments":{},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::Arithmetic","method_name":"zero?","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",290]},{"klass":"Money","method":"#<Method: Money#exchange_to>","parameters":[["req","other_currency"],["block","rounding_method"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":"USD"},"rounding_method":{"class_name":"NilClass","value":null}},"return_value":{"class_name":"Money","value":"0.20"},"class_name":"Money","method_name":"exchange_to","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",441]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.2e2"}},"return_value":{"class_name":"BigDecimal","value":"0.2e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.2e2"}},"return_value":{"class_name":"Integer","value":20},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":20},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#<=>>","parameters":[["req","other"]],"arguments":{"other":{"class_name":"Money","value":"0.20"}},"return_value":{"class_name":"Integer","value":0},"class_name":"Money::Arithmetic","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",55]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#==>","parameters":[["req","other"]],"arguments":{"other":{"class_name":"Money","value":"0.20"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Arithmetic","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",68]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.16e2"}},"return_value":{"class_name":"BigDecimal","value":"0.16e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.16e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":7},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.16"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.16e2"}},"return_value":{"class_name":"Integer","value":16},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":16},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Money#cents>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":16},"class_name":"Money","method_name":"cents","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",32]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.16e2"}},"return_value":{"class_name":"BigDecimal","value":"0.16e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.16e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":7},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.16"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.16e2"}},"return_value":{"class_name":"BigDecimal","value":"0.16e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.16e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":7},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.16"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":"NZD"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Float","value":15.75}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Float","value":15.75},"currency":{"class_name":"String","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1575e2"}},"return_value":{"class_name":"BigDecimal","value":"0.1575e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.15e2"}},"return_value":{"class_name":"BigDecimal","value":"0.15e2"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.15e2"},"currency":{"class_name":"Money::Currency","value":"NZD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":"#<Money::Bank::VariableExchange:0x00007ffc6309dc80>"},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#round>","parameters":[["opt","rounding_mode"],["opt","rounding_precision"]],"arguments":{"rounding_mode":{"class_name":"Integer","value":2},"rounding_precision":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Money","value":"0.15"},"class_name":"Money","method_name":"round","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",523]}]
    }
  }