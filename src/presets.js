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
    data: [{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#initialize>","parameters":[["opt","opts"],["opt","rt"]],"arguments":{"opts":{"class_name":"Hash","value":{}},"rt":{"class_name":"Hash","value":{"EUR_TO_USD":10}}},"return_value":{"class_name":"FalseClass","value":{}},"class_name":"Money::RatesStore::Memory","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",21]},{"klass":"Money::Bank::Base","method":"#<Method: Money::Bank::VariableExchange(Money::Bank::Base)#setup>","parameters":[],"arguments":{},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Bank::Base","method_name":"setup","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/base.rb",82]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#initialize>","parameters":[["opt","st"],["block","block"]],"arguments":{"st":{"class_name":"Money::RatesStore::Memory","value":{"@index":{"EUR_TO_USD":10},"@options":{},"@mutex":"#<Thread::Mutex:0x00007fc942089c20>","@in_transaction":false}},"block":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Bank::VariableExchange","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",59]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.stringified_keys>","parameters":[],"arguments":{},"return_value":{"class_name":"Set","value":{"@hash":{"aed":true,"afn":true,"all":true,"amd":true,"ang":true,"aoa":true,"ars":true,"aud":true,"awg":true,"azn":true,"bam":true,"bbd":true,"bdt":true,"bgn":true,"bhd":true,"bif":true,"bmd":true,"bnd":true,"bob":true,"brl":true,"bsd":true,"btn":true,"bwp":true,"byn":true,"byr":true,"bzd":true,"cad":true,"cdf":true,"chf":true,"clf":true,"clp":true,"cny":true,"cop":true,"crc":true,"cuc":true,"cup":true,"cve":true,"czk":true,"djf":true,"dkk":true,"dop":true,"dzd":true,"egp":true,"ern":true,"etb":true,"eur":true,"fjd":true,"fkp":true,"gbp":true,"gel":true,"ghs":true,"gip":true,"gmd":true,"gnf":true,"gtq":true,"gyd":true,"hkd":true,"hnl":true,"hrk":true,"htg":true,"huf":true,"idr":true,"ils":true,"inr":true,"iqd":true,"irr":true,"isk":true,"jmd":true,"jod":true,"jpy":true,"kes":true,"kgs":true,"khr":true,"kmf":true,"kpw":true,"krw":true,"kwd":true,"kyd":true,"kzt":true,"lak":true,"lbp":true,"lkr":true,"lrd":true,"lsl":true,"ltl":true,"lvl":true,"lyd":true,"mad":true,"mdl":true,"mga":true,"mkd":true,"mmk":true,"mnt":true,"mop":true,"mro":true,"mur":true,"mvr":true,"mwk":true,"mxn":true,"myr":true,"mzn":true,"nad":true,"ngn":true,"nio":true,"nok":true,"npr":true,"nzd":true,"omr":true,"pab":true,"pen":true,"pgk":true,"php":true,"pkr":true,"pln":true,"pyg":true,"qar":true,"ron":true,"rsd":true,"rub":true,"rwf":true,"sar":true,"sbd":true,"scr":true,"sdg":true,"sek":true,"sgd":true,"shp":true,"skk":true,"sll":true,"sos":true,"srd":true,"ssp":true,"std":true,"svc":true,"syp":true,"szl":true,"thb":true,"tjs":true,"tmt":true,"tnd":true,"top":true,"try":true,"ttd":true,"twd":true,"tzs":true,"uah":true,"ugx":true,"usd":true,"uyu":true,"uzs":true,"vef":true,"vnd":true,"vuv":true,"wst":true,"xaf":true,"xag":true,"xau":true,"xba":true,"xbb":true,"xbc":true,"xbd":true,"xcd":true,"xdr":true,"xof":true,"xpd":true,"xpf":true,"xpt":true,"xts":true,"yer":true,"zar":true,"zmk":true,"zmw":true,"btc":true,"jep":true,"ggp":true,"imp":true,"xfu":true,"gbx":true,"cnh":true,"eek":true,"ghc":true,"mtl":true,"tmm":true,"yen":true,"zwd":true,"zwl":true,"zwn":true,"zwr":true}}},"class_name":null,"method_name":"stringified_keys","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",148]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency._instances>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"usd":"USD","eur":"EUR","cad":"CAD","yen":"YEN","bhd":"BHD","dkk":"DKK","nzd":"NZD","xag":"XAG","aed":"AED","chf":"CHF","jpy":"JPY","tnd":"TND","mga":"MGA","vuv":"VUV","brl":"BRL","cny":"CNY","clp":"CLP"}},"class_name":null,"method_name":"_instances","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",47]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.table>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"aed":{"priority":100,"iso_code":"AED","name":"United Arab Emirates Dirham","symbol":"د.إ","alternate_symbols":["DH","Dhs"],"subunit":"Fils","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"784","smallest_denomination":25},"afn":{"priority":100,"iso_code":"AFN","name":"Afghan Afghani","symbol":"؋","alternate_symbols":["Af","Afs"],"subunit":"Pul","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"971","smallest_denomination":100},"all":{"priority":100,"iso_code":"ALL","name":"Albanian Lek","symbol":"L","disambiguate_symbol":"Lek","alternate_symbols":["Lek"],"subunit":"Qintar","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"008","smallest_denomination":100},"amd":{"priority":100,"iso_code":"AMD","name":"Armenian Dram","symbol":"դր.","alternate_symbols":["dram"],"subunit":"Luma","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"051","smallest_denomination":10},"ang":{"priority":100,"iso_code":"ANG","name":"Netherlands Antillean Gulden","symbol":"ƒ","alternate_symbols":["NAƒ","NAf","f"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x0192;","decimal_mark":",","thousands_separator":".","iso_numeric":"532","smallest_denomination":1},"aoa":{"priority":100,"iso_code":"AOA","name":"Angolan Kwanza","symbol":"Kz","alternate_symbols":[],"subunit":"Cêntimo","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"973","smallest_denomination":10},"ars":{"priority":100,"iso_code":"ARS","name":"Argentine Peso","symbol":"$","disambiguate_symbol":"$m/n","alternate_symbols":["$m/n","m$n"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":",","thousands_separator":".","iso_numeric":"032","smallest_denomination":1},"aud":{"priority":4,"iso_code":"AUD","name":"Australian Dollar","symbol":"$","disambiguate_symbol":"A$","alternate_symbols":["A$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"036","smallest_denomination":5},"awg":{"priority":100,"iso_code":"AWG","name":"Aruban Florin","symbol":"ƒ","alternate_symbols":["Afl"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x0192;","decimal_mark":".","thousands_separator":",","iso_numeric":"533","smallest_denomination":5},"azn":{"priority":100,"iso_code":"AZN","name":"Azerbaijani Manat","symbol":"₼","alternate_symbols":["m","man"],"subunit":"Qəpik","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"944","smallest_denomination":1},"bam":{"priority":100,"iso_code":"BAM","name":"Bosnia and Herzegovina Convertible Mark","symbol":"КМ","alternate_symbols":["KM"],"subunit":"Fening","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"977","smallest_denomination":5},"bbd":{"priority":100,"iso_code":"BBD","name":"Barbadian Dollar","symbol":"$","disambiguate_symbol":"Bds$","alternate_symbols":["Bds$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"052","smallest_denomination":1},"bdt":{"priority":100,"iso_code":"BDT","name":"Bangladeshi Taka","symbol":"৳","alternate_symbols":["Tk"],"subunit":"Paisa","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"050","smallest_denomination":1},"bgn":{"priority":100,"iso_code":"BGN","name":"Bulgarian Lev","symbol":"лв.","alternate_symbols":["lev","leva","лев","лева"],"subunit":"Stotinka","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"975","smallest_denomination":1},"bhd":{"priority":100,"iso_code":"BHD","name":"Bahraini Dinar","symbol":"ب.د","alternate_symbols":["BD"],"subunit":"Fils","subunit_to_unit":1000,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"048","smallest_denomination":5},"bif":{"priority":100,"iso_code":"BIF","name":"Burundian Franc","symbol":"Fr","disambiguate_symbol":"FBu","alternate_symbols":["FBu"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"108","smallest_denomination":100},"bmd":{"priority":100,"iso_code":"BMD","name":"Bermudian Dollar","symbol":"$","disambiguate_symbol":"BD$","alternate_symbols":["BD$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"060","smallest_denomination":1},"bnd":{"priority":100,"iso_code":"BND","name":"Brunei Dollar","symbol":"$","disambiguate_symbol":"BND","alternate_symbols":["B$"],"subunit":"Sen","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"096","smallest_denomination":1},"bob":{"priority":100,"iso_code":"BOB","name":"Bolivian Boliviano","symbol":"Bs.","alternate_symbols":["Bs"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"068","smallest_denomination":10},"brl":{"priority":100,"iso_code":"BRL","name":"Brazilian Real","symbol":"R$","subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"R$","decimal_mark":",","thousands_separator":".","iso_numeric":"986","smallest_denomination":5},"bsd":{"priority":100,"iso_code":"BSD","name":"Bahamian Dollar","symbol":"$","disambiguate_symbol":"BSD","alternate_symbols":["B$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"044","smallest_denomination":1},"btn":{"priority":100,"iso_code":"BTN","name":"Bhutanese Ngultrum","symbol":"Nu.","alternate_symbols":["Nu"],"subunit":"Chertrum","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"064","smallest_denomination":5},"bwp":{"priority":100,"iso_code":"BWP","name":"Botswana Pula","symbol":"P","alternate_symbols":[],"subunit":"Thebe","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"072","smallest_denomination":5},"byn":{"priority":100,"iso_code":"BYN","name":"Belarusian Ruble","symbol":"Br","disambiguate_symbol":"BYN","alternate_symbols":["бел. руб.","б.р.","руб.","р."],"subunit":"Kapeyka","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":" ","iso_numeric":"933","smallest_denomination":1},"byr":{"priority":50,"iso_code":"BYR","name":"Belarusian Ruble","symbol":"Br","disambiguate_symbol":"BYR","alternate_symbols":["бел. руб.","б.р.","руб.","р."],"subunit":null,"subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":" ","iso_numeric":"974","smallest_denomination":100},"bzd":{"priority":100,"iso_code":"BZD","name":"Belize Dollar","symbol":"$","disambiguate_symbol":"BZ$","alternate_symbols":["BZ$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"084","smallest_denomination":1},"cad":{"priority":5,"iso_code":"CAD","name":"Canadian Dollar","symbol":"$","disambiguate_symbol":"C$","alternate_symbols":["C$","CAD$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"124","smallest_denomination":5},"cdf":{"priority":100,"iso_code":"CDF","name":"Congolese Franc","symbol":"Fr","disambiguate_symbol":"FC","alternate_symbols":["FC"],"subunit":"Centime","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"976","smallest_denomination":1},"chf":{"priority":100,"iso_code":"CHF","name":"Swiss Franc","symbol":"CHF","alternate_symbols":["SFr","Fr"],"subunit":"Rappen","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"756","smallest_denomination":5},"clf":{"priority":100,"iso_code":"CLF","name":"Unidad de Fomento","symbol":"UF","alternate_symbols":[],"subunit":"Peso","subunit_to_unit":10000,"symbol_first":true,"html_entity":"&#x20B1;","decimal_mark":",","thousands_separator":".","iso_numeric":"990"},"clp":{"priority":100,"iso_code":"CLP","name":"Chilean Peso","symbol":"$","disambiguate_symbol":"CLP","alternate_symbols":[],"subunit":"Peso","subunit_to_unit":1,"symbol_first":true,"html_entity":"&#36;","decimal_mark":",","thousands_separator":".","iso_numeric":"152","smallest_denomination":1},"cny":{"priority":100,"iso_code":"CNY","name":"Chinese Renminbi Yuan","symbol":"¥","alternate_symbols":["CN¥","元","CN元"],"subunit":"Fen","subunit_to_unit":100,"symbol_first":true,"html_entity":"￥","decimal_mark":".","thousands_separator":",","iso_numeric":"156","smallest_denomination":1},"cop":{"priority":100,"iso_code":"COP","name":"Colombian Peso","symbol":"$","disambiguate_symbol":"COL$","alternate_symbols":["COL$"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#36;","decimal_mark":",","thousands_separator":".","iso_numeric":"170","smallest_denomination":20},"crc":{"priority":100,"iso_code":"CRC","name":"Costa Rican Colón","symbol":"₡","alternate_symbols":["¢"],"subunit":"Céntimo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A1;","decimal_mark":",","thousands_separator":".","iso_numeric":"188","smallest_denomination":500},"cuc":{"priority":100,"iso_code":"CUC","name":"Cuban Convertible Peso","symbol":"$","disambiguate_symbol":"CUC$","alternate_symbols":["CUC$"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"931","smallest_denomination":1},"cup":{"priority":100,"iso_code":"CUP","name":"Cuban Peso","symbol":"$","disambiguate_symbol":"$MN","alternate_symbols":["$MN"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B1;","decimal_mark":".","thousands_separator":",","iso_numeric":"192","smallest_denomination":1},"cve":{"priority":100,"iso_code":"CVE","name":"Cape Verdean Escudo","symbol":"$","disambiguate_symbol":"Esc","alternate_symbols":["Esc"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"132","smallest_denomination":100},"czk":{"priority":100,"iso_code":"CZK","name":"Czech Koruna","symbol":"Kč","alternate_symbols":[],"subunit":"Haléř","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":" ","iso_numeric":"203","smallest_denomination":100},"djf":{"priority":100,"iso_code":"DJF","name":"Djiboutian Franc","symbol":"Fdj","alternate_symbols":[],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"262","smallest_denomination":100},"dkk":{"priority":100,"iso_code":"DKK","name":"Danish Krone","symbol":"kr.","disambiguate_symbol":"DKK","alternate_symbols":[",-"],"subunit":"Øre","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"208","smallest_denomination":50},"dop":{"priority":100,"iso_code":"DOP","name":"Dominican Peso","symbol":"$","disambiguate_symbol":"RD$","alternate_symbols":["RD$"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B1;","decimal_mark":".","thousands_separator":",","iso_numeric":"214","smallest_denomination":100},"dzd":{"priority":100,"iso_code":"DZD","name":"Algerian Dinar","symbol":"د.ج","alternate_symbols":["DA"],"subunit":"Centime","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"012","smallest_denomination":100},"egp":{"priority":100,"iso_code":"EGP","name":"Egyptian Pound","symbol":"ج.م","alternate_symbols":["LE","E£","L.E."],"subunit":"Piastre","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"818","smallest_denomination":25},"ern":{"priority":100,"iso_code":"ERN","name":"Eritrean Nakfa","symbol":"Nfk","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"232","smallest_denomination":1},"etb":{"priority":100,"iso_code":"ETB","name":"Ethiopian Birr","symbol":"Br","disambiguate_symbol":"ETB","alternate_symbols":[],"subunit":"Santim","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"230","smallest_denomination":1},"eur":{"priority":2,"iso_code":"EUR","name":"Euro","symbol":"€","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20AC;","decimal_mark":",","thousands_separator":".","iso_numeric":"978","smallest_denomination":1},"fjd":{"priority":100,"iso_code":"FJD","name":"Fijian Dollar","symbol":"$","disambiguate_symbol":"FJ$","alternate_symbols":["FJ$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"242","smallest_denomination":5},"fkp":{"priority":100,"iso_code":"FKP","name":"Falkland Pound","symbol":"£","disambiguate_symbol":"FK£","alternate_symbols":["FK£"],"subunit":"Penny","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"238","smallest_denomination":1},"gbp":{"priority":3,"iso_code":"GBP","name":"British Pound","symbol":"£","alternate_symbols":[],"subunit":"Penny","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"826","smallest_denomination":1},"gel":{"priority":100,"iso_code":"GEL","name":"Georgian Lari","symbol":"ლ","alternate_symbols":["lari"],"subunit":"Tetri","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"981","smallest_denomination":1},"ghs":{"priority":100,"iso_code":"GHS","name":"Ghanaian Cedi","symbol":"₵","alternate_symbols":["GH¢","GH₵"],"subunit":"Pesewa","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B5;","decimal_mark":".","thousands_separator":",","iso_numeric":"936","smallest_denomination":1},"gip":{"priority":100,"iso_code":"GIP","name":"Gibraltar Pound","symbol":"£","disambiguate_symbol":"GIP","alternate_symbols":[],"subunit":"Penny","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"292","smallest_denomination":1},"gmd":{"priority":100,"iso_code":"GMD","name":"Gambian Dalasi","symbol":"D","alternate_symbols":[],"subunit":"Butut","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"270","smallest_denomination":1},"gnf":{"priority":100,"iso_code":"GNF","name":"Guinean Franc","symbol":"Fr","disambiguate_symbol":"FG","alternate_symbols":["FG","GFr"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"324","smallest_denomination":100},"gtq":{"priority":100,"iso_code":"GTQ","name":"Guatemalan Quetzal","symbol":"Q","alternate_symbols":[],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"320","smallest_denomination":1},"gyd":{"priority":100,"iso_code":"GYD","name":"Guyanese Dollar","symbol":"$","disambiguate_symbol":"G$","alternate_symbols":["G$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"328","smallest_denomination":100},"hkd":{"priority":100,"iso_code":"HKD","name":"Hong Kong Dollar","symbol":"$","disambiguate_symbol":"HK$","alternate_symbols":["HK$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"344","smallest_denomination":10},"hnl":{"priority":100,"iso_code":"HNL","name":"Honduran Lempira","symbol":"L","disambiguate_symbol":"HNL","alternate_symbols":[],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"340","smallest_denomination":5},"hrk":{"priority":100,"iso_code":"HRK","name":"Croatian Kuna","symbol":"kn","alternate_symbols":[],"subunit":"Lipa","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"191","smallest_denomination":1},"htg":{"priority":100,"iso_code":"HTG","name":"Haitian Gourde","symbol":"G","alternate_symbols":[],"subunit":"Centime","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"332","smallest_denomination":5},"huf":{"priority":100,"iso_code":"HUF","name":"Hungarian Forint","symbol":"Ft","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":" ","iso_numeric":"348","smallest_denomination":5},"idr":{"priority":100,"iso_code":"IDR","name":"Indonesian Rupiah","symbol":"Rp","alternate_symbols":[],"subunit":"Sen","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"360","smallest_denomination":5000},"ils":{"priority":100,"iso_code":"ILS","name":"Israeli New Sheqel","symbol":"₪","alternate_symbols":["ש״ח","NIS"],"subunit":"Agora","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20AA;","decimal_mark":".","thousands_separator":",","iso_numeric":"376","smallest_denomination":10},"inr":{"priority":100,"iso_code":"INR","name":"Indian Rupee","symbol":"₹","alternate_symbols":["Rs","৳","૱","௹","रु","₨"],"subunit":"Paisa","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20b9;","decimal_mark":".","thousands_separator":",","iso_numeric":"356","smallest_denomination":50},"iqd":{"priority":100,"iso_code":"IQD","name":"Iraqi Dinar","symbol":"ع.د","alternate_symbols":[],"subunit":"Fils","subunit_to_unit":1000,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"368","smallest_denomination":50000},"irr":{"priority":100,"iso_code":"IRR","name":"Iranian Rial","symbol":"﷼","alternate_symbols":[],"subunit":null,"subunit_to_unit":100,"symbol_first":true,"html_entity":"&#xFDFC;","decimal_mark":".","thousands_separator":",","iso_numeric":"364","smallest_denomination":5000},"isk":{"priority":100,"iso_code":"ISK","name":"Icelandic Króna","symbol":"kr","alternate_symbols":["Íkr"],"subunit":null,"subunit_to_unit":1,"symbol_first":true,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"352","smallest_denomination":1},"jmd":{"priority":100,"iso_code":"JMD","name":"Jamaican Dollar","symbol":"$","disambiguate_symbol":"J$","alternate_symbols":["J$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"388","smallest_denomination":1},"jod":{"priority":100,"iso_code":"JOD","name":"Jordanian Dinar","symbol":"د.ا","alternate_symbols":["JD"],"subunit":"Fils","subunit_to_unit":1000,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"400","smallest_denomination":5},"jpy":{"priority":6,"iso_code":"JPY","name":"Japanese Yen","symbol":"¥","alternate_symbols":["円","圓"],"subunit":null,"subunit_to_unit":1,"symbol_first":true,"html_entity":"&#x00A5;","decimal_mark":".","thousands_separator":",","iso_numeric":"392","smallest_denomination":1},"kes":{"priority":100,"iso_code":"KES","name":"Kenyan Shilling","symbol":"KSh","alternate_symbols":["Sh"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"404","smallest_denomination":50},"kgs":{"priority":100,"iso_code":"KGS","name":"Kyrgyzstani Som","symbol":"som","alternate_symbols":["сом"],"subunit":"Tyiyn","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"417","smallest_denomination":1},"khr":{"priority":100,"iso_code":"KHR","name":"Cambodian Riel","symbol":"៛","alternate_symbols":[],"subunit":"Sen","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x17DB;","decimal_mark":".","thousands_separator":",","iso_numeric":"116","smallest_denomination":5000},"kmf":{"priority":100,"iso_code":"KMF","name":"Comorian Franc","symbol":"Fr","disambiguate_symbol":"CF","alternate_symbols":["CF"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"174","smallest_denomination":100},"kpw":{"priority":100,"iso_code":"KPW","name":"North Korean Won","symbol":"₩","alternate_symbols":[],"subunit":"Chŏn","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20A9;","decimal_mark":".","thousands_separator":",","iso_numeric":"408","smallest_denomination":1},"krw":{"priority":100,"iso_code":"KRW","name":"South Korean Won","symbol":"₩","subunit":null,"subunit_to_unit":1,"alternate_symbols":[],"symbol_first":true,"html_entity":"&#x20A9;","decimal_mark":".","thousands_separator":",","iso_numeric":"410","smallest_denomination":1},"kwd":{"priority":100,"iso_code":"KWD","name":"Kuwaiti Dinar","symbol":"د.ك","alternate_symbols":["K.D."],"subunit":"Fils","subunit_to_unit":1000,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"414","smallest_denomination":5},"kyd":{"priority":100,"iso_code":"KYD","name":"Cayman Islands Dollar","symbol":"$","disambiguate_symbol":"CI$","alternate_symbols":["CI$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"136","smallest_denomination":1},"kzt":{"priority":100,"iso_code":"KZT","name":"Kazakhstani Tenge","symbol":"₸","alternate_symbols":[],"subunit":"Tiyn","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"398","smallest_denomination":100},"lak":{"priority":100,"iso_code":"LAK","name":"Lao Kip","symbol":"₭","alternate_symbols":["₭N"],"subunit":"Att","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20AD;","decimal_mark":".","thousands_separator":",","iso_numeric":"418","smallest_denomination":10},"lbp":{"priority":100,"iso_code":"LBP","name":"Lebanese Pound","symbol":"ل.ل","alternate_symbols":["£","L£"],"subunit":"Piastre","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"422","smallest_denomination":25000},"lkr":{"priority":100,"iso_code":"LKR","name":"Sri Lankan Rupee","symbol":"₨","disambiguate_symbol":"SLRs","alternate_symbols":["රු","ரூ","SLRs","/-"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#8360;","decimal_mark":".","thousands_separator":",","iso_numeric":"144","smallest_denomination":100},"lrd":{"priority":100,"iso_code":"LRD","name":"Liberian Dollar","symbol":"$","disambiguate_symbol":"L$","alternate_symbols":["L$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"430","smallest_denomination":5},"lsl":{"priority":100,"iso_code":"LSL","name":"Lesotho Loti","symbol":"L","disambiguate_symbol":"M","alternate_symbols":["M"],"subunit":"Sente","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"426","smallest_denomination":1},"ltl":{"priority":100,"iso_code":"LTL","name":"Lithuanian Litas","symbol":"Lt","alternate_symbols":[],"subunit":"Centas","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"440","smallest_denomination":1},"lvl":{"priority":100,"iso_code":"LVL","name":"Latvian Lats","symbol":"Ls","alternate_symbols":[],"subunit":"Santīms","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"428","smallest_denomination":1},"lyd":{"priority":100,"iso_code":"LYD","name":"Libyan Dinar","symbol":"ل.د","alternate_symbols":["LD"],"subunit":"Dirham","subunit_to_unit":1000,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"434","smallest_denomination":50},"mad":{"priority":100,"iso_code":"MAD","name":"Moroccan Dirham","symbol":"د.م.","alternate_symbols":[],"subunit":"Centime","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"504","smallest_denomination":1},"mdl":{"priority":100,"iso_code":"MDL","name":"Moldovan Leu","symbol":"L","alternate_symbols":["lei"],"subunit":"Ban","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"498","smallest_denomination":1},"mga":{"priority":100,"iso_code":"MGA","name":"Malagasy Ariary","symbol":"Ar","alternate_symbols":[],"subunit":"Iraimbilanja","subunit_to_unit":5,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"969","smallest_denomination":1},"mkd":{"priority":100,"iso_code":"MKD","name":"Macedonian Denar","symbol":"ден","alternate_symbols":[],"subunit":"Deni","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"807","smallest_denomination":100},"mmk":{"priority":100,"iso_code":"MMK","name":"Myanmar Kyat","symbol":"K","disambiguate_symbol":"MMK","alternate_symbols":[],"subunit":"Pya","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"104","smallest_denomination":50},"mnt":{"priority":100,"iso_code":"MNT","name":"Mongolian Tögrög","symbol":"₮","alternate_symbols":[],"subunit":"Möngö","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20AE;","decimal_mark":".","thousands_separator":",","iso_numeric":"496","smallest_denomination":2000},"mop":{"priority":100,"iso_code":"MOP","name":"Macanese Pataca","symbol":"P","alternate_symbols":["MOP$"],"subunit":"Avo","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"446","smallest_denomination":10},"mro":{"priority":100,"iso_code":"MRO","name":"Mauritanian Ouguiya","symbol":"UM","alternate_symbols":[],"subunit":"Khoums","subunit_to_unit":5,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"478","smallest_denomination":1},"mur":{"priority":100,"iso_code":"MUR","name":"Mauritian Rupee","symbol":"₨","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A8;","decimal_mark":".","thousands_separator":",","iso_numeric":"480","smallest_denomination":100},"mvr":{"priority":100,"iso_code":"MVR","name":"Maldivian Rufiyaa","symbol":"MVR","alternate_symbols":["MRF","Rf","/-","ރ"],"subunit":"Laari","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"462","smallest_denomination":1},"mwk":{"priority":100,"iso_code":"MWK","name":"Malawian Kwacha","symbol":"MK","alternate_symbols":[],"subunit":"Tambala","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"454","smallest_denomination":1},"mxn":{"priority":100,"iso_code":"MXN","name":"Mexican Peso","symbol":"$","disambiguate_symbol":"MEX$","alternate_symbols":["MEX$"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"484","smallest_denomination":5},"myr":{"priority":100,"iso_code":"MYR","name":"Malaysian Ringgit","symbol":"RM","alternate_symbols":[],"subunit":"Sen","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"458","smallest_denomination":5},"mzn":{"priority":100,"iso_code":"MZN","name":"Mozambican Metical","symbol":"MTn","alternate_symbols":["MZN"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"943","smallest_denomination":1},"nad":{"priority":100,"iso_code":"NAD","name":"Namibian Dollar","symbol":"$","disambiguate_symbol":"N$","alternate_symbols":["N$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"516","smallest_denomination":5},"ngn":{"priority":100,"iso_code":"NGN","name":"Nigerian Naira","symbol":"₦","alternate_symbols":[],"subunit":"Kobo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A6;","decimal_mark":".","thousands_separator":",","iso_numeric":"566","smallest_denomination":50},"nio":{"priority":100,"iso_code":"NIO","name":"Nicaraguan Córdoba","symbol":"C$","disambiguate_symbol":"NIO$","alternate_symbols":[],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"558","smallest_denomination":5},"nok":{"priority":100,"iso_code":"NOK","name":"Norwegian Krone","symbol":"kr","disambiguate_symbol":"NOK","alternate_symbols":[",-"],"subunit":"Øre","subunit_to_unit":100,"symbol_first":false,"html_entity":"kr","decimal_mark":",","thousands_separator":".","iso_numeric":"578","smallest_denomination":100},"npr":{"priority":100,"iso_code":"NPR","name":"Nepalese Rupee","symbol":"₨","disambiguate_symbol":"NPR","alternate_symbols":["Rs","रू"],"subunit":"Paisa","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A8;","decimal_mark":".","thousands_separator":",","iso_numeric":"524","smallest_denomination":1},"nzd":{"priority":100,"iso_code":"NZD","name":"New Zealand Dollar","symbol":"$","disambiguate_symbol":"NZ$","alternate_symbols":["NZ$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"554","smallest_denomination":10},"omr":{"priority":100,"iso_code":"OMR","name":"Omani Rial","symbol":"ر.ع.","alternate_symbols":[],"subunit":"Baisa","subunit_to_unit":1000,"symbol_first":true,"html_entity":"&#xFDFC;","decimal_mark":".","thousands_separator":",","iso_numeric":"512","smallest_denomination":5},"pab":{"priority":100,"iso_code":"PAB","name":"Panamanian Balboa","symbol":"B/.","alternate_symbols":[],"subunit":"Centésimo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"590","smallest_denomination":1},"pen":{"priority":100,"iso_code":"PEN","name":"Peruvian Sol","symbol":"S/.","alternate_symbols":[],"subunit":"Céntimo","subunit_to_unit":100,"symbol_first":true,"html_entity":"S/.","decimal_mark":".","thousands_separator":",","iso_numeric":"604","smallest_denomination":1},"pgk":{"priority":100,"iso_code":"PGK","name":"Papua New Guinean Kina","symbol":"K","disambiguate_symbol":"PGK","alternate_symbols":[],"subunit":"Toea","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"598","smallest_denomination":5},"php":{"priority":100,"iso_code":"PHP","name":"Philippine Peso","symbol":"₱","alternate_symbols":["PHP","PhP","P"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B1;","decimal_mark":".","thousands_separator":",","iso_numeric":"608","smallest_denomination":1},"pkr":{"priority":100,"iso_code":"PKR","name":"Pakistani Rupee","symbol":"₨","disambiguate_symbol":"PKR","alternate_symbols":["Rs"],"subunit":"Paisa","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A8;","decimal_mark":".","thousands_separator":",","iso_numeric":"586","smallest_denomination":100},"pln":{"priority":100,"iso_code":"PLN","name":"Polish Złoty","symbol":"zł","alternate_symbols":[],"subunit":"Grosz","subunit_to_unit":100,"symbol_first":false,"html_entity":"z&#322;","decimal_mark":",","thousands_separator":" ","iso_numeric":"985","smallest_denomination":1},"pyg":{"priority":100,"iso_code":"PYG","name":"Paraguayan Guaraní","symbol":"₲","alternate_symbols":[],"subunit":"Céntimo","subunit_to_unit":1,"symbol_first":true,"html_entity":"&#x20B2;","decimal_mark":".","thousands_separator":",","iso_numeric":"600","smallest_denomination":5000},"qar":{"priority":100,"iso_code":"QAR","name":"Qatari Riyal","symbol":"ر.ق","alternate_symbols":["QR"],"subunit":"Dirham","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#xFDFC;","decimal_mark":".","thousands_separator":",","iso_numeric":"634","smallest_denomination":1},"ron":{"priority":100,"iso_code":"RON","name":"Romanian Leu","symbol":"Lei","alternate_symbols":[],"subunit":"Bani","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"946","smallest_denomination":1},"rsd":{"priority":100,"iso_code":"RSD","name":"Serbian Dinar","symbol":"РСД","alternate_symbols":["RSD","din","дин"],"subunit":"Para","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"941","smallest_denomination":100},"rub":{"priority":100,"iso_code":"RUB","name":"Russian Ruble","symbol":"₽","alternate_symbols":["руб.","р."],"subunit":"Kopeck","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20BD;","decimal_mark":",","thousands_separator":".","iso_numeric":"643","smallest_denomination":1},"rwf":{"priority":100,"iso_code":"RWF","name":"Rwandan Franc","symbol":"FRw","alternate_symbols":["RF","R₣"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"646","smallest_denomination":100},"sar":{"priority":100,"iso_code":"SAR","name":"Saudi Riyal","symbol":"ر.س","alternate_symbols":["SR","﷼"],"subunit":"Hallallah","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#xFDFC;","decimal_mark":".","thousands_separator":",","iso_numeric":"682","smallest_denomination":5},"sbd":{"priority":100,"iso_code":"SBD","name":"Solomon Islands Dollar","symbol":"$","disambiguate_symbol":"SI$","alternate_symbols":["SI$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"090","smallest_denomination":10},"scr":{"priority":100,"iso_code":"SCR","name":"Seychellois Rupee","symbol":"₨","disambiguate_symbol":"SRe","alternate_symbols":["SRe","SR"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20A8;","decimal_mark":".","thousands_separator":",","iso_numeric":"690","smallest_denomination":1},"sdg":{"priority":100,"iso_code":"SDG","name":"Sudanese Pound","symbol":"£","disambiguate_symbol":"SDG","alternate_symbols":[],"subunit":"Piastre","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"938","smallest_denomination":1},"sek":{"priority":100,"iso_code":"SEK","name":"Swedish Krona","symbol":"kr","disambiguate_symbol":"SEK","alternate_symbols":[":-"],"subunit":"Öre","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":",","thousands_separator":" ","iso_numeric":"752","smallest_denomination":100},"sgd":{"priority":100,"iso_code":"SGD","name":"Singapore Dollar","symbol":"$","disambiguate_symbol":"S$","alternate_symbols":["S$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"702","smallest_denomination":1},"shp":{"priority":100,"iso_code":"SHP","name":"Saint Helenian Pound","symbol":"£","disambiguate_symbol":"SHP","alternate_symbols":[],"subunit":"Penny","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"654","smallest_denomination":1},"skk":{"priority":100,"iso_code":"SKK","name":"Slovak Koruna","symbol":"Sk","alternate_symbols":[],"subunit":"Halier","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"703","smallest_denomination":50},"sll":{"priority":100,"iso_code":"SLL","name":"Sierra Leonean Leone","symbol":"Le","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"694","smallest_denomination":1000},"sos":{"priority":100,"iso_code":"SOS","name":"Somali Shilling","symbol":"Sh","alternate_symbols":["Sh.So"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"706","smallest_denomination":1},"srd":{"priority":100,"iso_code":"SRD","name":"Surinamese Dollar","symbol":"$","disambiguate_symbol":"SRD","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"968","smallest_denomination":1},"ssp":{"priority":100,"iso_code":"SSP","name":"South Sudanese Pound","symbol":"£","disambiguate_symbol":"SSP","alternate_symbols":[],"subunit":"piaster","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"728","smallest_denomination":5},"std":{"priority":100,"iso_code":"STD","name":"São Tomé and Príncipe Dobra","symbol":"Db","alternate_symbols":[],"subunit":"Cêntimo","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"678","smallest_denomination":10000},"svc":{"priority":100,"iso_code":"SVC","name":"Salvadoran Colón","symbol":"₡","alternate_symbols":["¢"],"subunit":"Centavo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20A1;","decimal_mark":".","thousands_separator":",","iso_numeric":"222","smallest_denomination":1},"syp":{"priority":100,"iso_code":"SYP","name":"Syrian Pound","symbol":"£S","alternate_symbols":["£","ل.س","LS","الليرة السورية"],"subunit":"Piastre","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"760","smallest_denomination":100},"szl":{"priority":100,"iso_code":"SZL","name":"Swazi Lilangeni","symbol":"E","disambiguate_symbol":"SZL","subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"748","smallest_denomination":1},"thb":{"priority":100,"iso_code":"THB","name":"Thai Baht","symbol":"฿","alternate_symbols":[],"subunit":"Satang","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x0E3F;","decimal_mark":".","thousands_separator":",","iso_numeric":"764","smallest_denomination":1},"tjs":{"priority":100,"iso_code":"TJS","name":"Tajikistani Somoni","symbol":"ЅМ","alternate_symbols":[],"subunit":"Diram","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"972","smallest_denomination":1},"tmt":{"priority":100,"iso_code":"TMT","name":"Turkmenistani Manat","symbol":"T","alternate_symbols":[],"subunit":"Tenge","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"934","smallest_denomination":1},"tnd":{"priority":100,"iso_code":"TND","name":"Tunisian Dinar","symbol":"د.ت","alternate_symbols":["TD","DT"],"subunit":"Millime","subunit_to_unit":1000,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"788","smallest_denomination":10},"top":{"priority":100,"iso_code":"TOP","name":"Tongan Paʻanga","symbol":"T$","alternate_symbols":["PT"],"subunit":"Seniti","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"776","smallest_denomination":1},"try":{"priority":100,"iso_code":"TRY","name":"Turkish Lira","symbol":"₺","alternate_symbols":["TL"],"subunit":"kuruş","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#8378;","decimal_mark":",","thousands_separator":".","iso_numeric":"949","smallest_denomination":1},"ttd":{"priority":100,"iso_code":"TTD","name":"Trinidad and Tobago Dollar","symbol":"$","disambiguate_symbol":"TT$","alternate_symbols":["TT$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"780","smallest_denomination":1},"twd":{"priority":100,"iso_code":"TWD","name":"New Taiwan Dollar","symbol":"$","disambiguate_symbol":"NT$","alternate_symbols":["NT$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"901","smallest_denomination":50},"tzs":{"priority":100,"iso_code":"TZS","name":"Tanzanian Shilling","symbol":"Sh","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"834","smallest_denomination":5000},"uah":{"priority":100,"iso_code":"UAH","name":"Ukrainian Hryvnia","symbol":"₴","alternate_symbols":[],"subunit":"Kopiyka","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#x20B4;","decimal_mark":".","thousands_separator":",","iso_numeric":"980","smallest_denomination":1},"ugx":{"priority":100,"iso_code":"UGX","name":"Ugandan Shilling","symbol":"USh","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"800","smallest_denomination":1000},"usd":{"priority":1,"iso_code":"USD","name":"United States Dollar","symbol":"$","disambiguate_symbol":"US$","alternate_symbols":["US$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"840","smallest_denomination":1},"uyu":{"priority":100,"iso_code":"UYU","name":"Uruguayan Peso","symbol":"$","alternate_symbols":["$U"],"subunit":"Centésimo","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B1;","decimal_mark":",","thousands_separator":".","iso_numeric":"858","smallest_denomination":100},"uzs":{"priority":100,"iso_code":"UZS","name":"Uzbekistan Som","symbol":"","alternate_symbols":["so‘m","сўм","сум","s","с"],"subunit":"Tiyin","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"860","smallest_denomination":100},"vef":{"priority":100,"iso_code":"VEF","name":"Venezuelan Bolívar","symbol":"Bs","alternate_symbols":["Bs.F"],"subunit":"Céntimo","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":",","thousands_separator":".","iso_numeric":"937","smallest_denomination":1},"vnd":{"priority":100,"iso_code":"VND","name":"Vietnamese Đồng","symbol":"₫","alternate_symbols":[],"subunit":"Hào","subunit_to_unit":1,"symbol_first":false,"html_entity":"&#x20AB;","decimal_mark":",","thousands_separator":".","iso_numeric":"704","smallest_denomination":100},"vuv":{"priority":100,"iso_code":"VUV","name":"Vanuatu Vatu","symbol":"Vt","alternate_symbols":[],"subunit":null,"subunit_to_unit":1,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"548","smallest_denomination":1},"wst":{"priority":100,"iso_code":"WST","name":"Samoan Tala","symbol":"T","disambiguate_symbol":"WS$","alternate_symbols":["WS$","SAT","ST"],"subunit":"Sene","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"882","smallest_denomination":10},"xaf":{"priority":100,"iso_code":"XAF","name":"Central African Cfa Franc","symbol":"Fr","disambiguate_symbol":"FCFA","alternate_symbols":["FCFA"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"950","smallest_denomination":100},"xag":{"priority":100,"iso_code":"XAG","name":"Silver (Troy Ounce)","symbol":"oz t","disambiguate_symbol":"XAG","alternate_symbols":[],"subunit":"oz","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"961"},"xau":{"priority":100,"iso_code":"XAU","name":"Gold (Troy Ounce)","symbol":"oz t","disambiguate_symbol":"XAU","alternate_symbols":[],"subunit":"oz","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"959"},"xba":{"priority":100,"iso_code":"XBA","name":"European Composite Unit","symbol":"","disambiguate_symbol":"XBA","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"955"},"xbb":{"priority":100,"iso_code":"XBB","name":"European Monetary Unit","symbol":"","disambiguate_symbol":"XBB","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"956"},"xbc":{"priority":100,"iso_code":"XBC","name":"European Unit of Account 9","symbol":"","disambiguate_symbol":"XBC","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"957"},"xbd":{"priority":100,"iso_code":"XBD","name":"European Unit of Account 17","symbol":"","disambiguate_symbol":"XBD","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"958"},"xcd":{"priority":100,"iso_code":"XCD","name":"East Caribbean Dollar","symbol":"$","disambiguate_symbol":"EX$","alternate_symbols":["EC$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"951","smallest_denomination":1},"xdr":{"priority":100,"iso_code":"XDR","name":"Special Drawing Rights","symbol":"SDR","alternate_symbols":["XDR"],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"960"},"xof":{"priority":100,"iso_code":"XOF","name":"West African Cfa Franc","symbol":"Fr","disambiguate_symbol":"CFA","alternate_symbols":["CFA"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"952","smallest_denomination":100},"xpd":{"priority":100,"iso_code":"XPD","name":"Palladium","symbol":"oz t","disambiguate_symbol":"XPD","alternate_symbols":[],"subunit":"oz","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"964"},"xpf":{"priority":100,"iso_code":"XPF","name":"Cfp Franc","symbol":"Fr","alternate_symbols":["F"],"subunit":"Centime","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"953","smallest_denomination":100},"xpt":{"priority":100,"iso_code":"XPT","name":"Platinum","symbol":"oz t","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"962","smallest_denomination":""},"xts":{"priority":100,"iso_code":"XTS","name":"Codes specifically reserved for testing purposes","symbol":"","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"963","smallest_denomination":""},"yer":{"priority":100,"iso_code":"YER","name":"Yemeni Rial","symbol":"﷼","alternate_symbols":[],"subunit":"Fils","subunit_to_unit":100,"symbol_first":false,"html_entity":"&#xFDFC;","decimal_mark":".","thousands_separator":",","iso_numeric":"886","smallest_denomination":100},"zar":{"priority":100,"iso_code":"ZAR","name":"South African Rand","symbol":"R","alternate_symbols":[],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x0052;","decimal_mark":".","thousands_separator":",","iso_numeric":"710","smallest_denomination":10},"zmk":{"priority":100,"iso_code":"ZMK","name":"Zambian Kwacha","symbol":"ZK","disambiguate_symbol":"ZMK","alternate_symbols":[],"subunit":"Ngwee","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"894","smallest_denomination":5},"zmw":{"priority":100,"iso_code":"ZMW","name":"Zambian Kwacha","symbol":"ZK","disambiguate_symbol":"ZMW","alternate_symbols":[],"subunit":"Ngwee","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"967","smallest_denomination":5},"btc":{"priority":100,"iso_code":"BTC","name":"Bitcoin","symbol":"₿","alternate_symbols":[],"subunit":"Satoshi","subunit_to_unit":100000000,"symbol_first":true,"html_entity":"&#x20bf;","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"jep":{"priority":100,"iso_code":"JEP","name":"Jersey Pound","symbol":"£","disambiguate_symbol":"JEP","alternate_symbols":[],"subunit":"Penny","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"ggp":{"priority":100,"iso_code":"GGP","name":"Guernsey Pound","symbol":"£","disambiguate_symbol":"GGP","alternate_symbols":[],"subunit":"Penny","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"imp":{"priority":100,"iso_code":"IMP","name":"Isle of Man Pound","symbol":"£","disambiguate_symbol":"IMP","alternate_symbols":["M£"],"subunit":"Penny","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"xfu":{"priority":100,"iso_code":"XFU","name":"UIC Franc","symbol":"","disambiguate_symbol":"XFU","alternate_symbols":[],"subunit":"","subunit_to_unit":100,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":""},"gbx":{"priority":100,"iso_code":"GBX","name":"British Penny","symbol":"","disambiguate_symbol":"GBX","alternate_symbols":[],"subunit":"","subunit_to_unit":1,"symbol_first":true,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"cnh":{"priority":100,"iso_code":"CNH","name":"Chinese Renminbi Yuan Offshore","symbol":"¥","disambiguate_symbol":"CNH","alternate_symbols":["CN¥","元","CN元"],"subunit":"Fen","subunit_to_unit":100,"symbol_first":true,"html_entity":"￥","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":1},"eek":{"priority":100,"iso_code":"EEK","name":"Estonian Kroon","symbol":"KR","alternate_symbols":[],"subunit":"Sent","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"233","smallest_denomination":5},"ghc":{"priority":100,"iso_code":"GHS","name":"Ghanaian Cedi","symbol":"₵","disambiguate_symbol":"GH₵","alternate_symbols":["GH₵"],"subunit":"Pesewa","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x20B5;","decimal_mark":".","thousands_separator":",","iso_numeric":"288","smallest_denomination":1},"mtl":{"priority":100,"iso_code":"MTL","name":"Maltese Lira","symbol":"₤","alternate_symbols":["Lm"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A3;","decimal_mark":".","thousands_separator":",","iso_numeric":"470","smallest_denomination":1},"tmm":{"priority":100,"iso_code":"TMM","name":"Turkmenistani Manat","symbol":"m","alternate_symbols":[],"subunit":"Tennesi","subunit_to_unit":100,"symbol_first":false,"html_entity":"","decimal_mark":".","thousands_separator":",","iso_numeric":"795","smallest_denomination":1},"yen":{"priority":100,"iso_code":"JPY","name":"Japanese Yen","symbol":"¥","disambiguate_symbol":"JPY","alternate_symbols":["円","圓"],"subunit":"Sen","subunit_to_unit":100,"symbol_first":true,"html_entity":"&#x00A5;","decimal_mark":".","thousands_separator":",","iso_numeric":"","smallest_denomination":100},"zwd":{"priority":100,"iso_code":"ZWD","name":"Zimbabwean Dollar","symbol":"$","disambiguate_symbol":"ZWD","alternate_symbols":["Z$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"716","smallest_denomination":100},"zwl":{"priority":100,"iso_code":"ZWL","name":"Zimbabwean Dollar","symbol":"$","disambiguate_symbol":"ZWL","alternate_symbols":["Z$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"932","smallest_denomination":100},"zwn":{"priority":100,"iso_code":"ZWN","name":"Zimbabwean Dollar","symbol":"$","disambiguate_symbol":"ZWN","alternate_symbols":["Z$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"942","smallest_denomination":100},"zwr":{"priority":100,"iso_code":"ZWR","name":"Zimbabwean Dollar","symbol":"$","disambiguate_symbol":"ZWR","alternate_symbols":["Z$"],"subunit":"Cent","subunit_to_unit":100,"symbol_first":true,"html_entity":"$","decimal_mark":".","thousands_separator":",","iso_numeric":"935","smallest_denomination":100}}},"class_name":null,"method_name":"table","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",122]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"String","value":"eur"}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"String","value":"EUR"}},"return_value":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"String","value":"EUR"}},"return_value":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency._instances>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"usd":"USD","eur":"EUR","cad":"CAD","yen":"YEN","bhd":"BHD","dkk":"DKK","nzd":"NZD","xag":"XAG","aed":"AED","chf":"CHF","jpy":"JPY","tnd":"TND","mga":"MGA","vuv":"VUV","brl":"BRL","cny":"CNY","clp":"CLP"}},"class_name":null,"method_name":"_instances","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",47]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#rate_key_for>","parameters":[["req","currency_iso_from"],["req","currency_iso_to"]],"arguments":{"currency_iso_from":{"class_name":"String","value":"EUR"},"currency_iso_to":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"String","value":"EUR_TO_USD"},"class_name":"Money::RatesStore::Memory","method_name":"rate_key_for","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",114]},{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#transaction>","parameters":[["block","block"]],"arguments":{"block":{"class_name":"Proc","value":{}}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::RatesStore::Memory","method_name":"transaction","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",65]},{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#add_rate>","parameters":[["req","currency_iso_from"],["req","currency_iso_to"],["req","rate"]],"arguments":{"currency_iso_from":{"class_name":"String","value":"EUR"},"currency_iso_to":{"class_name":"String","value":"USD"},"rate":{"class_name":"Integer","value":10}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::RatesStore::Memory","method_name":"add_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",39]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#set_rate>","parameters":[["req","from"],["req","to"],["req","rate"],["opt","opts"]],"arguments":{"from":{"class_name":"String","value":"EUR"},"to":{"class_name":"String","value":"USD"},"rate":{"class_name":"Integer","value":10},"opts":{"class_name":"Hash","value":{}}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::Bank::VariableExchange","method_name":"set_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",171]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#add_rate>","parameters":[["req","from"],["req","to"],["req","rate"]],"arguments":{"from":{"class_name":"String","value":"EUR"},"to":{"class_name":"String","value":"USD"},"rate":{"class_name":"Integer","value":10}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::Bank::VariableExchange","method_name":"add_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",152]},{"klass":"#<Class:Money>","method":"#<Method: Money.add_rate>","parameters":[["req","from_currency"],["req","to_currency"],["req","rate"]],"arguments":{"from_currency":{"class_name":"String","value":"EUR"},"to_currency":{"class_name":"String","value":"USD"},"rate":{"class_name":"Integer","value":10}},"return_value":{"class_name":"Integer","value":10},"class_name":null,"method_name":"add_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",206]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":1000}},"return_value":{"class_name":"BigDecimal","value":"0.1e4"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":1000},"currency":{"class_name":"String","value":"EUR"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"FalseClass","value":{}},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"FalseClass","value":{}},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.wrap>","parameters":[["req","object"]],"arguments":{"object":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"class_name":null,"method_name":"wrap","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",101]},{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#transaction>","parameters":[["block","block"]],"arguments":{"block":{"class_name":"Proc","value":{}}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::RatesStore::Memory","method_name":"transaction","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",65]},{"klass":"Money::RatesStore::Memory","method":"#<Method: Money::RatesStore::Memory#get_rate>","parameters":[["req","currency_iso_from"],["req","currency_iso_to"]],"arguments":{"currency_iso_from":{"class_name":"String","value":"EUR"},"currency_iso_to":{"class_name":"String","value":"USD"}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::RatesStore::Memory","method_name":"get_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/rates_store/memory.rb",56]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#get_rate>","parameters":[["req","from"],["req","to"],["opt","opts"]],"arguments":{"from":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"to":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"opts":{"class_name":"Hash","value":{}}},"return_value":{"class_name":"Integer","value":10},"class_name":"Money::Bank::VariableExchange","method_name":"get_rate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",192]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e4"}},"return_value":{"class_name":"BigDecimal","value":"0.1e4"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money>","method":"#<Method: Money.rounding_mode>","parameters":[["opt","mode"]],"arguments":{"mode":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"Integer","value":7},"class_name":null,"method_name":"rounding_mode","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",182]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e4"}},"return_value":{"class_name":"Integer","value":1000},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1000},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#calculate_fractional>","parameters":[["req","from"],["req","to_currency"]],"arguments":{"from":{"class_name":"Money","value":{"@fractional":"0.1e4","@currency":"EUR","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}},"to_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"BigDecimal","value":"0.1e4"},"class_name":"Money::Bank::VariableExchange","method_name":"calculate_fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",121]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#exchange>","parameters":[["req","fractional"],["req","rate"],["block","block"]],"arguments":{"fractional":{"class_name":"BigDecimal","value":"0.1e4"},"rate":{"class_name":"Integer","value":10},"block":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"BigDecimal","value":"0.1e5"},"class_name":"Money::Bank::VariableExchange","method_name":"exchange","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",128]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e5"}},"return_value":{"class_name":"BigDecimal","value":"0.1e5"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"BigDecimal","value":"0.1e5"},"currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money::Bank::VariableExchange","method":"#<Method: Money::Bank::VariableExchange#exchange_with>","parameters":[["req","from"],["req","to_currency"],["block","block"]],"arguments":{"from":{"class_name":"Money","value":{"@fractional":"0.1e4","@currency":"EUR","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}},"to_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"block":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"Money","value":{"@fractional":"0.1e5","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}},"class_name":"Money::Bank::VariableExchange","method_name":"exchange_with","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/variable_exchange.rb",105]},{"klass":"Money","method":"#<Method: Money#exchange_to>","parameters":[["req","other_currency"],["block","rounding_method"]],"arguments":{"other_currency":{"class_name":"String","value":"USD"},"rounding_method":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"Money","value":{"@fractional":"0.1e5","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}},"class_name":"Money","method_name":"exchange_to","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",441]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":10000}},"return_value":{"class_name":"BigDecimal","value":"0.1e5"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":10000},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94208ac38>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e5"}},"return_value":{"class_name":"Integer","value":10000},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":10000},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#zero?>","parameters":[],"arguments":{},"return_value":{"class_name":"FalseClass","value":{}},"class_name":"Money::Arithmetic","method_name":"zero?","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",290]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"TrueClass","value":{}},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money","method":"#<Method: Money#exchange_to>","parameters":[["req","other_currency"],["block","rounding_method"]],"arguments":{"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"rounding_method":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"Money","value":{"@fractional":"0.1e5","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}},"class_name":"Money","method_name":"exchange_to","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",441]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e5"}},"return_value":{"class_name":"BigDecimal","value":"0.1e5"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e5"}},"return_value":{"class_name":"Integer","value":10000},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":10000},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#<=>>","parameters":[["req","other"]],"arguments":{"other":{"class_name":"Money","value":{"@fractional":"0.1e5","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}}},"return_value":{"class_name":"Integer","value":0},"class_name":"Money::Arithmetic","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",55]},{"klass":"Money::Arithmetic","method":"#<Method: Money(Money::Arithmetic)#==>","parameters":[["req","other"]],"arguments":{"other":{"class_name":"Money","value":{"@fractional":"0.1e5","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94208ad00>"}}},"return_value":{"class_name":"TrueClass","value":{}},"class_name":"Money::Arithmetic","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/arithmetic.rb",68]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"USD"},"class_name":"Money::Currency","method_name":"to_s","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",358]},{"klass":"#<Class:Money::Currency>","method":"#<Method: Money::Currency.new>","parameters":[["req","id"]],"arguments":{"id":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":null,"method_name":"new","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",38]},{"klass":"#<Class:Money>","method":"#<Method: Money.default_currency>","parameters":[],"arguments":{},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":null,"method_name":"default_currency","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",136]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":1}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":1},"currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Money#inspect>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"#<Money fractional:1 currency:USD>"},"class_name":"Money","method_name":"inspect","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",348]},{"klass":"#<Class:Money::Bank::Base>","method":"#<Method: Money::Bank::VariableExchange.instance>","parameters":[],"arguments":{},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":null,"method_name":"instance","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/bank/base.rb",45]},{"klass":"#<Class:Money>","method":"#<Method: Subclass.setup_defaults>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":16},"class_name":null,"method_name":"setup_defaults","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",144]},{"klass":"#<Class:Money>","method":"#<Method: Money.inherited>","parameters":[["req","base"]],"arguments":{"base":{"class_name":"Class","value":{"@default_bank":"#<Money::Bank::VariableExchange:0x00007fc94023a648>","@default_currency":"USD","@use_i18n":true,"@infinite_precision":false,"@rounding_mode":7,"@conversion_precision":16}}},"return_value":{"class_name":"Integer","value":16},"class_name":null,"method_name":"inherited","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",164]},{"klass":"Money","method":"#<Method: Subclass(Money)#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":1}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Subclass(Money)#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":1},"currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Subclass(Money)#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"#<Class:Money>","method":"#<Method: Subclass.rounding_mode>","parameters":[["opt","mode"]],"arguments":{"mode":{"class_name":"NilClass","value":{}}},"return_value":{"class_name":"Integer","value":7},"class_name":null,"method_name":"rounding_mode","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",182]},{"klass":"Money","method":"#<Method: Subclass(Money)#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Subclass(Money)#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"Money","method":"#<Method: Subclass(Money)#inspect>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"#<Subclass fractional:1 currency:USD>"},"class_name":"Money","method_name":"inspect","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",348]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":100}},"return_value":{"class_name":"BigDecimal","value":"0.1e3"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":100},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#currency_as_string>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"USD"},"class_name":"Money","method_name":"currency_as_string","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",305]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":100}},"return_value":{"class_name":"BigDecimal","value":"0.1e3"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":100},"currency":{"class_name":"String","value":"EUR"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#to_s>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"EUR"},"class_name":"Money::Currency","method_name":"to_s","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",358]},{"klass":"Money","method":"#<Method: Money#currency_as_string>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"EUR"},"class_name":"Money","method_name":"currency_as_string","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",305]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":0}},"return_value":{"class_name":"BigDecimal","value":"0.0"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":0},"currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"#<Class:#<Money:0x00007fc940416a48>>","method":"#<Method: #<Money fractional:expectation currency:USD>.fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"expectation"},"class_name":null,"method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/spec/money_spec.rb",188]},{"klass":"Money","method":"#<Method: #<Money fractional:expectation currency:USD>.cents>","parameters":[],"arguments":{},"return_value":{"class_name":"String","value":"expectation"},"class_name":"Money","method_name":"cents","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",32]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":1}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":1},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money::Constructors","method":"#<Method: Money.us_dollar>","parameters":[["req","cents"]],"arguments":{"cents":{"class_name":"Integer","value":1}},"return_value":{"class_name":"Money","value":{"@fractional":"0.1e1","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94023a648>"}},"class_name":"Money::Constructors","method_name":"us_dollar","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/constructors.rb",48]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"#<Class:Money::Allocation>","method":"#<Method: Money::Allocation.generate>","parameters":[["req","amount"],["req","parts"],["opt","whole_amounts"]],"arguments":{"amount":{"class_name":"Integer","value":1},"parts":{"class_name":"Integer","value":0},"whole_amounts":{"class_name":"TrueClass","value":{}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":null,"method_name":"generate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/allocation.rb",15]},{"klass":"Money","method":"#<Method: Money#allocate>","parameters":[["req","parts"]],"arguments":{"parts":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money","method_name":"allocate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",502]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":1}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":1},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"BigDecimal","value":"0.1e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.1e1"}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]},{"klass":"Money","method":"#<Method: Money#fractional>","parameters":[],"arguments":{},"return_value":{"class_name":"Integer","value":1},"class_name":"Money","method_name":"fractional","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",52]},{"klass":"#<Class:Money::Allocation>","method":"#<Method: Money::Allocation.generate>","parameters":[["req","amount"],["req","parts"],["opt","whole_amounts"]],"arguments":{"amount":{"class_name":"Integer","value":1},"parts":{"class_name":"Integer","value":-1},"whole_amounts":{"class_name":"TrueClass","value":{}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":null,"method_name":"generate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/allocation.rb",15]},{"klass":"Money","method":"#<Method: Money#allocate>","parameters":[["req","parts"]],"arguments":{"parts":{"class_name":"Integer","value":-1}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money","method_name":"allocate","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",502]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"Integer","value":2}},"return_value":{"class_name":"BigDecimal","value":"0.2e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#initialize>","parameters":[["req","obj"],["opt","currency"],["opt","bank"]],"arguments":{"obj":{"class_name":"Integer","value":2},"currency":{"class_name":"String","value":"USD"},"bank":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}}},"return_value":{"class_name":"Money::Bank::VariableExchange","value":{"@store":"#<Money::RatesStore::Memory:0x00007fc94023a3f0>","@rounding_method":null}},"class_name":"Money","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",259]},{"klass":"Money::Constructors","method":"#<Method: Money.us_dollar>","parameters":[["req","cents"]],"arguments":{"cents":{"class_name":"Integer","value":2}},"return_value":{"class_name":"Money","value":{"@fractional":"0.2e1","@currency":"USD","@bank":"#<Money::Bank::VariableExchange:0x00007fc94023a648>"}},"class_name":"Money::Constructors","method_name":"us_dollar","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money/constructors.rb",48]},{"klass":"Money","method":"#<Method: Money#as_d>","parameters":[["req","num"]],"arguments":{"num":{"class_name":"BigDecimal","value":"0.2e1"}},"return_value":{"class_name":"BigDecimal","value":"0.2e1"},"class_name":"Money","method_name":"as_d","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",556]},{"klass":"Money","method":"#<Method: Money#return_value>","parameters":[["req","value"]],"arguments":{"value":{"class_name":"BigDecimal","value":"0.2e1"}},"return_value":{"class_name":"Integer","value":2},"class_name":"Money","method_name":"return_value","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/money.rb",564]}]
    }
  }