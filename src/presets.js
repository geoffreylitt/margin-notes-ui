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
      data: [{"klass":"Object","method":"#<Method: main.intermediate_hash>","parameters":[],"arguments":{},"return_value":{"class_name":"Hash","value":{"external_id":123}},"class_name":"Object","method_name":"intermediate_hash","method_location":["hash.rb",10]},{"klass":"Object","method":"#<Method: main.final_hash>","parameters":[["req","a"]],"arguments":{"a":{"class_name":"Integer","value":100}},"return_value":{"class_name":"Hash","value":{"external_id":123,"id":100}},"class_name":"Object","method_name":"final_hash","method_location":["hash.rb",4]}]
    }
  }