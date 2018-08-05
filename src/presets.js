export default {
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
      data: [{"klass":"Game","method":"#<Method: Game#won_row?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_row?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",73]},{"klass":"Game","method":"#<Method: Game#won_column?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_column?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",81]},{"klass":"Game","method":"#<Method: Game#won_diagonal?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_diagonal?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",90]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#won_row?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_row?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",73]},{"klass":"Game","method":"#<Method: Game#won_column?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_column?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",81]},{"klass":"Game","method":"#<Method: Game#won_diagonal?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won_diagonal?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",90]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":1}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#winner>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"winner","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",32], name: "when nobody has won"},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#toggle_active_player!>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"toggle_active_player!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",61]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"String","value":" X |   |   \n------------\n   |   |   \n------------\n   |   |   "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25], "name": "with one square filled", "favorite": true},{"klass":"AIPlayer","method":"#<Method: AIPlayer#random_candidates>","parameters":[["req","game"]],"arguments":{"self":{"class_name":"AIPlayer","value":{}},"game":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Array","value":[[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]},"class_name":"AIPlayer","method_name":"random_candidates","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",6]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#get_move>","parameters":[["req","game"]],"arguments":{"self":{"class_name":"AIPlayer","value":{}},"game":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Array","value":[2,2]},"class_name":"AIPlayer","method_name":"get_move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",2]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#toggle_active_player!>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"toggle_active_player!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",61]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"String","value":" X |   |   \n------------\n   |   |   \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":1}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"String","value":" X | X |   \n------------\n   |   |   \n------------\n   |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#random_candidates>","parameters":[["req","game"]],"arguments":{"self":{"class_name":"AIPlayer","value":{}},"game":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Array","value":[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1]]},"class_name":"AIPlayer","method_name":"random_candidates","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",6]},{"klass":"AIPlayer","method":"#<Method: AIPlayer#get_move>","parameters":[["req","game"]],"arguments":{"self":{"class_name":"AIPlayer","value":{}},"game":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Array","value":[2,0]},"class_name":"AIPlayer","method_name":"get_move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/ai_player.rb",2]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":2},"col":{"class_name":"Integer","value":0}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"String","value":" X | X |   \n------------\n   |   |   \n------------\n O |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25]},{"klass":"Game","method":"#<Method: Game#validate_move!>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"NilClass","value":null},"class_name":"Game","method_name":"validate_move!","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",45]},{"klass":"Game","method":"#<Method: Game#move>","parameters":[["req","row"],["req","col"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"row":{"class_name":"Integer","value":0},"col":{"class_name":"Integer","value":2}},"return_value":{"class_name":"Integer","value":1},"class_name":"Game","method_name":"move","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",16]},{"klass":"Game","method":"#<Method: Game#to_s>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"String","value":" X | X | X \n------------\n   |   |   \n------------\n O |   | O "},"class_name":"Game","method_name":"to_s","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",25], name: "with many squares filled", "favorite": true},{"klass":"Game","method":"#<Method: Game#won_row?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Game","method_name":"won_row?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",73]},{"klass":"Game","method":"#<Method: Game#won?>","parameters":[["req","player"]],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}},"player":{"class_name":"Integer","value":0}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Game","method_name":"won?","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",66]},{"klass":"Game","method":"#<Method: Game#winner>","parameters":[],"arguments":{"self":{"class_name":"Game","value":{"@squares":[["X","X","X"],[null,null,null],["O",null,"O"]],"@active_player":1}}},"return_value":{"class_name":"Integer","value":0},"class_name":"Game","method_name":"winner","method_location":["/Users/glitt/personal-dev/tic-tac-toe/game.rb",32], name: "when somebody wins"}]
    },
    currency: {
      filename: "/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",
      code:`

# encoding: utf-8

require "json"
require "money/currency/loader"
require "money/currency/heuristics"

class Money

  # Represents a specific currency unit.
  #
  # @see https://en.wikipedia.org/wiki/Currency
  # @see http://iso4217.net/
  class Currency
    include Comparable
    extend Enumerable
    extend Money::Currency::Loader
    extend Money::Currency::Heuristics

    # Keeping cached instances in sync between threads
    @@mutex = Mutex.new
    @@instances = {}

    # Thrown when a Currency has been registered without all the attributes
    # which are required for the current action.
    class MissingAttributeError < StandardError
      def initialize(method, currency, attribute)
        super(
          "Can't call Currency.#{method} - currency '#{currency}' is missing "\
          "the attribute '#{attribute}'"
        )
      end
    end

    # Thrown when an unknown currency is requested.
    class UnknownCurrency < ArgumentError; end

    class << self
      def new(id)
        id = id.to_s.downcase
        unless stringified_keys.include?(id)
          raise UnknownCurrency, "Unknown currency '#{id}'"
        end

        _instances[id] || @@mutex.synchronize { _instances[id] ||= super }
      end

      def _instances
        @@instances
      end

      # Lookup a currency with given +id+ an returns a +Currency+ instance on
      # success, +nil+ otherwise.
      #
      # @param [String, Symbol, #to_s] id Used to look into +table+ and
      # retrieve the applicable attributes.
      #
      # @return [Money::Currency]
      #
      # @example
      #   Money::Currency.find(:eur) #=> #<Money::Currency id: eur ...>
      #   Money::Currency.find(:foo) #=> nil
      def find(id)
        id = id.to_s.downcase.to_sym
        new(id)
      rescue UnknownCurrency
        nil
      end

      # Lookup a currency with given +num+ as an ISO 4217 numeric and returns an
      # +Currency+ instance on success, +nil+ otherwise.
      #
      # @param [#to_s] num used to look into +table+ in +iso_numeric+ and find
      # the right currency id.
      #
      # @return [Money::Currency]
      #
      # @example
      #   Money::Currency.find_by_iso_numeric(978) #=> #<Money::Currency id: eur ...>
      #   Money::Currency.find_by_iso_numeric('001') #=> nil
      def find_by_iso_numeric(num)
        num = num.to_s
        id, _ = self.table.find{|key, currency| currency[:iso_numeric] == num}
        new(id)
      rescue UnknownCurrency
        nil
      end

      # Wraps the object in a +Currency+ unless it's already a +Currency+
      # object.
      #
      # @param [Object] object The object to attempt and wrap as a +Currency+
      # object.
      #
      # @return [Money::Currency]
      #
      # @example
      #   c1 = Money::Currency.new(:usd)
      #   Money::Currency.wrap(nil)   #=> nil
      #   Money::Currency.wrap(c1)    #=> #<Money::Currency id: usd ...>
      #   Money::Currency.wrap("usd") #=> #<Money::Currency id: usd ...>
      def wrap(object)
        if object.nil?
          nil
        elsif object.is_a?(Currency)
          object
        else
          Currency.new(object)
        end
      end

      # List of known currencies.
      #
      # == monetary unit
      # The standard unit of value of a currency, as the dollar in the United States or the peso in Mexico.
      # https://www.answers.com/topic/monetary-unit
      # == fractional monetary unit, subunit
      # A monetary unit that is valued at a fraction (usually one hundredth) of the basic monetary unit
      # https://www.answers.com/topic/fractional-monetary-unit-subunit
      #
      # See https://en.wikipedia.org/wiki/List_of_circulating_currencies and
      # http://search.cpan.org/~tnguyen/Locale-Currency-Format-1.28/Format.pm
      def table
        @table ||= load_currencies
      end

      # List the currencies imported and registered
      # @return [Array]
      #
      # @example
      #   Money::Currency.iso_codes()
      #   [#<Currency ..USD>, 'CAD', 'EUR']...
      def all
        table.keys.map do |curr|
          c = Currency.new(curr)
          if c.priority.nil?
            raise MissingAttributeError.new(:all, c.id, :priority)
          end
          c
        end.sort_by(&:priority)
      end

      # We need a string-based validator before creating an unbounded number of
      # symbols.
      # http://www.randomhacks.net/articles/2007/01/20/13-ways-of-looking-at-a-ruby-symbol#11
      # https://github.com/RubyMoney/money/issues/132
      #
      # @return [Set]
      def stringified_keys
        @stringified_keys ||= stringify_keys
      end

      # Register a new currency
      #
      # @param curr [Hash] information about the currency
      # @option priority [Numeric] a numerical value you can use to sort/group
      #   the currency list
      # @option iso_code [String] the international 3-letter code as defined
      #   by the ISO 4217 standard
      # @option iso_numeric [Integer] the international 3-digit code as
      #   defined by the ISO 4217 standard
      # @option name [String] the currency name
      # @option symbol [String] the currency symbol (UTF-8 encoded)
      # @option subunit [String] the name of the fractional monetary unit
      # @option subunit_to_unit [Numeric] the proportion between the unit and
      #   the subunit
      # @option separator [String] character between the whole and fraction
      #   amounts
      # @option delimiter [String] character between each thousands place
      def register(curr)
        key = curr.fetch(:iso_code).downcase.to_sym
        @@mutex.synchronize { _instances.delete(key.to_s) }
        @table[key] = curr
        @stringified_keys = stringify_keys
      end

      # Inherit a new currency from existing one
      #
      # @param parent_iso_code [String] the international 3-letter code as defined
      # @param curr [Hash] See {register} method for hash structure
      def inherit(parent_iso_code, curr)
        parent_iso_code = parent_iso_code.downcase.to_sym
        curr = @table.fetch(parent_iso_code, {}).merge(curr)
        register(curr)
      end

      # Unregister a currency.
      #
      # @param [Object] curr A Hash with the key :iso_code, or the ISO code
      #   as a String or Symbol.
      #
      # @return [Boolean] true if the currency previously existed, false
      #   if it didn't.
      def unregister(curr)
        if curr.is_a?(Hash)
          key = curr.fetch(:iso_code).downcase.to_sym
        else
          key = curr.downcase.to_sym
        end
        existed = @table.delete(key)
        @stringified_keys = stringify_keys if existed
        existed ? true : false
      end


      def each
        all.each { |c| yield(c) }
      end


      private

      def stringify_keys
        table.keys.each_with_object(Set.new) { |k, set| set.add(k.to_s.downcase) }
      end
    end

    # @!attribute [r] id
    #   @return [Symbol] The symbol used to identify the currency, usually THE
    #     lowercase +iso_code+ attribute.
    # @!attribute [r] priority
    #   @return [Integer] A numerical value you can use to sort/group the
    #     currency list.
    # @!attribute [r] iso_code
    #   @return [String] The international 3-letter code as defined by the ISO
    #     4217 standard.
    # @!attribute [r] iso_numeric
    #   @return [String] The international 3-numeric code as defined by the ISO
    #     4217 standard.
    # @!attribute [r] name
    #   @return [String] The currency name.
    # @!attribute [r] symbol
    #   @return [String] The currency symbol (UTF-8 encoded).
    # @!attribute [r] disambiguate_symbol
    #   @return [String] Alternative currency used if symbol is ambiguous
    # @!attribute [r] html_entity
    #   @return [String] The html entity for the currency symbol
    # @!attribute [r] subunit
    #   @return [String] The name of the fractional monetary unit.
    # @!attribute [r] subunit_to_unit
    #   @return [Integer] The proportion between the unit and the subunit
    # @!attribute [r] decimal_mark
    #   @return [String] The decimal mark, or character used to separate the
    #     whole unit from the subunit.
    # @!attribute [r] thousands_separator
    #   @return [String] The character used to separate thousands grouping of
    #     the whole unit.
    # @!attribute [r] symbol_first
    #   @return [Boolean] Should the currency symbol precede the amount, or
    #     should it come after?
    # @!attribute [r] smallest_denomination
    #   @return [Integer] Smallest amount of cash possible (in the subunit of
    #     this currency)

    attr_reader :id, :priority, :iso_code, :iso_numeric, :name, :symbol,
      :disambiguate_symbol, :html_entity, :subunit, :subunit_to_unit, :decimal_mark,
      :thousands_separator, :symbol_first, :smallest_denomination

    alias_method :separator, :decimal_mark
    alias_method :delimiter, :thousands_separator
    alias_method :eql?, :==

    # Create a new +Currency+ object.
    #
    # @param [String, Symbol, #to_s] id Used to look into +table+ and retrieve
    #  the applicable attributes.
    #
    # @return [Money::Currency]
    #
    # @example
    #   Money::Currency.new(:usd) #=> #<Money::Currency id: usd ...>
    def initialize(id)
      @id = id.to_sym
      initialize_data!
    end

    # Compares +self+ with +other_currency+ against the value of +priority+
    # attribute.
    #
    # @param [Money::Currency] other_currency The currency to compare to.
    #
    # @return [-1,0,1] -1 if less than, 0 is equal to, 1 if greater than
    #
    # @example
    #   c1 = Money::Currency.new(:usd)
    #   c2 = Money::Currency.new(:jpy)
    #   c1 <=> c2 #=> 1
    #   c2 <=> c1 #=> -1
    #   c1 <=> c1 #=> 0
    def <=>(other_currency)
      # <=> returns nil when one of the values is nil
      comparison = self.priority <=> other_currency.priority || 0

      if comparison == 0
        self.id <=> other_currency.id
      else
        comparison
      end
    end

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

    def compare_ids(other_currency)
      other_currency_id = if other_currency.is_a?(Currency)
                            other_currency.id.to_s.downcase
                          else
                            other_currency.to_s.downcase
                          end
      self.id.to_s.downcase == other_currency_id
    end
    private :compare_ids

    # Returns a Integer hash value based on the +id+ attribute in order to use
    # functions like & (intersection), group_by, etc.
    #
    # @return [Integer]
    #
    # @example
    #   Money::Currency.new(:usd).hash #=> 428936
    def hash
      id.hash
    end

    # Returns a human readable representation.
    #
    # @return [String]
    #
    # @example
    #   Money::Currency.new(:usd) #=> #<Currency id: usd ...>
    def inspect
      "#<#{self.class.name} id: #{id}, priority: #{priority}, symbol_first: #{symbol_first}, thousands_separator: #{thousands_separator}, html_entity: #{html_entity}, decimal_mark: #{decimal_mark}, name: #{name}, symbol: #{symbol}, subunit_to_unit: #{subunit_to_unit}, exponent: #{exponent}, iso_code: #{iso_code}, iso_numeric: #{iso_numeric}, subunit: #{subunit}, smallest_denomination: #{smallest_denomination}>"
    end

    # Returns a string representation corresponding to the upcase +id+
    # attribute.
    #
    # --
    # DEV: id.to_s.upcase corresponds to iso_code but don't use ISO_CODE for consistency.
    #
    # @return [String]
    #
    # @example
    #   Money::Currency.new(:usd).to_s #=> "USD"
    #   Money::Currency.new(:eur).to_s #=> "EUR"
    def to_s
      id.to_s.upcase
    end

    # Returns a string representation corresponding to the upcase +id+
    # attribute. Useful in cases where only implicit conversions are made.
    #
    # @return [String]
    #
    # @example
    #   Money::Currency.new(:usd).to_str #=> "USD"
    #   Money::Currency.new(:eur).to_str #=> "EUR"
    def to_str
      id.to_s.upcase
    end

    # Returns a symbol representation corresponding to the upcase +id+
    # attribute.
    #
    # @return [Symbol]
    #
    # @example
    #   Money::Currency.new(:usd).to_sym #=> :USD
    #   Money::Currency.new(:eur).to_sym #=> :EUR
    def to_sym
      id.to_s.upcase.to_sym
    end

    # Conversion to +self+.
    #
    # @return [self]
    def to_currency
      self
    end

    # Returns currency symbol or iso code for currencies with no symbol.
    #
    # @return [String]
    def code
      symbol || iso_code
    end

    def symbol_first?
      !!@symbol_first
    end

    # Returns the relation between subunit and unit as a base 10 exponent.
    #
    # Note that MGA and MRO are exceptions and are rounded to 1
    # @see https://en.wikipedia.org/wiki/ISO_4217#Active_codes
    #
    # @return [Integer]
    def exponent
      Math.log10(subunit_to_unit).round
    end
    alias decimal_places exponent

    private

    def initialize_data!
      data = self.class.table[@id]
      @alternate_symbols     = data[:alternate_symbols]
      @decimal_mark          = data[:decimal_mark]
      @disambiguate_symbol   = data[:disambiguate_symbol]
      @html_entity           = data[:html_entity]
      @iso_code              = data[:iso_code]
      @iso_numeric           = data[:iso_numeric]
      @name                  = data[:name]
      @priority              = data[:priority]
      @smallest_denomination = data[:smallest_denomination]
      @subunit               = data[:subunit]
      @subunit_to_unit       = data[:subunit_to_unit]
      @symbol                = data[:symbol]
      @symbol_first          = data[:symbol_first]
      @thousands_separator   = data[:thousands_separator]
    end
  end
end
`,
      data: [{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"id":{"class_name":"String","value":"eur"}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#hash>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Integer","value":1280356375749346270},"class_name":"Money::Currency","method_name":"hash","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",333]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#hash>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Integer","value":1280356375749346270},"class_name":"Money::Currency","method_name":"hash","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",333]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#hash>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Integer","value":1280356375749346270},"class_name":"Money::Currency","method_name":"hash","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",333]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#hash>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":1280356375749346268},"class_name":"Money::Currency","method_name":"hash","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",333]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Integer","value":-1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"id":{"class_name":"String","value":"eur"}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"abd"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abc","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABC","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abc","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABC","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"abc"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abe","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABE","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abe","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABE","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"abe"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"abc","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABC","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abe","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABE","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":15,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"cad","@alternate_symbols":["C$","CAD$"],"@decimal_mark":".","@disambiguate_symbol":"C$","@html_entity":"$","@iso_code":"CAD","@iso_numeric":"124","@name":"Canadian Dollar","@priority":5,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"cad","@alternate_symbols":["C$","CAD$"],"@decimal_mark":".","@disambiguate_symbol":"C$","@html_entity":"$","@iso_code":"CAD","@iso_numeric":"124","@name":"Canadian Dollar","@priority":5,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"cad"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"cad","@alternate_symbols":["C$","CAD$"],"@decimal_mark":".","@disambiguate_symbol":"C$","@html_entity":"$","@iso_code":"CAD","@iso_numeric":"124","@name":"Canadian Dollar","@priority":5,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"Integer","value":-1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"abd"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#<=>>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"abd","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"ABD","@iso_numeric":null,"@name":null,"@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":null,"@symbol":null,"@symbol_first":null,"@thousands_separator":null}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":-1},"class_name":"Money::Currency","method_name":"<=>","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",289]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"eur"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"eur"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"EUR"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"EUR"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Symbol","value":"eur"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Symbol","value":"eur"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Symbol","value":"EUR"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Symbol","value":"EUR"}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"String","value":"usd"}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#compare_ids>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::Currency","method_name":"compare_ids","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",316]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"eur","@alternate_symbols":[],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x20AC;","@iso_code":"EUR","@iso_numeric":"978","@name":"Euro","@priority":2,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"€","@symbol_first":true,"@thousands_separator":"."}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"FalseClass","value":false},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"xxx","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"XXX","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"%","@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"xxx","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"XXX","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"%","@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"xxx"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#exponent>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":2},"class_name":"Money::Currency","method_name":"exponent","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",410]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#inspect>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":"#<Money::Currency id: usd, priority: 1, symbol_first: true, thousands_separator: ,, html_entity: $, decimal_mark: ., name: United States Dollar, symbol: $, subunit_to_unit: 100, exponent: 2, iso_code: USD, iso_numeric: 840, subunit: Cent, smallest_denomination: 1>"},"class_name":"Money::Currency","method_name":"inspect","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",343]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#to_currency>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"class_name":"Money::Currency","method_name":"to_currency","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",389]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#==>","parameters":[["req","other_currency"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"other_currency":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"TrueClass","value":true},"class_name":"Money::Currency","method_name":"==","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",312]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"jpy","@alternate_symbols":["円","圓"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"&#x00A5;","@iso_code":"JPY","@iso_numeric":"392","@name":"Japanese Yen","@priority":6,"@smallest_denomination":1,"@subunit":null,"@subunit_to_unit":1,"@symbol":"¥","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"jpy","@alternate_symbols":["円","圓"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"&#x00A5;","@iso_code":"JPY","@iso_numeric":"392","@name":"Japanese Yen","@priority":6,"@smallest_denomination":1,"@subunit":null,"@subunit_to_unit":1,"@symbol":"¥","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"jpy"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#exponent>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"jpy","@alternate_symbols":["円","圓"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"&#x00A5;","@iso_code":"JPY","@iso_numeric":"392","@name":"Japanese Yen","@priority":6,"@smallest_denomination":1,"@subunit":null,"@subunit_to_unit":1,"@symbol":"¥","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":0},"class_name":"Money::Currency","method_name":"exponent","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",410]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#exponent>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":2},"class_name":"Money::Currency","method_name":"exponent","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",410]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"iqd","@alternate_symbols":[],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"IQD","@iso_numeric":"368","@name":"Iraqi Dinar","@priority":100,"@smallest_denomination":50000,"@subunit":"Fils","@subunit_to_unit":1000,"@symbol":"ع.د","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"iqd","@alternate_symbols":[],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"IQD","@iso_numeric":"368","@name":"Iraqi Dinar","@priority":100,"@smallest_denomination":50000,"@subunit":"Fils","@subunit_to_unit":1000,"@symbol":"ع.د","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"iqd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#exponent>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"iqd","@alternate_symbols":[],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"IQD","@iso_numeric":"368","@name":"Iraqi Dinar","@priority":100,"@smallest_denomination":50000,"@subunit":"Fils","@subunit_to_unit":1000,"@symbol":"ع.د","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"Integer","value":3},"class_name":"Money::Currency","method_name":"exponent","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",410]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"yyy","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"YYY","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"@","@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"yyy","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"YYY","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"@","@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"yyy"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"xxx","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"XXX","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"%","@symbol_first":null,"@thousands_separator":null}}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"xxx","@alternate_symbols":null,"@decimal_mark":null,"@disambiguate_symbol":null,"@html_entity":null,"@iso_code":"XXX","@iso_numeric":null,"@name":"Golden Doubloon","@priority":null,"@smallest_denomination":null,"@subunit":null,"@subunit_to_unit":100,"@symbol":"%","@symbol_first":null,"@thousands_separator":null}},"id":{"class_name":"String","value":"xxx"}},"return_value":{"class_name":"NilClass","value":{}},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#code>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"usd","@alternate_symbols":["US$"],"@decimal_mark":".","@disambiguate_symbol":"US$","@html_entity":"$","@iso_code":"USD","@iso_numeric":"840","@name":"United States Dollar","@priority":1,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":"$"},"class_name":"Money::Currency","method_name":"code","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",396]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"azn","@alternate_symbols":["m","man"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AZN","@iso_numeric":"944","@name":"Azerbaijani Manat","@priority":100,"@smallest_denomination":1,"@subunit":"Qəpik","@subunit_to_unit":100,"@symbol":"₼","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"azn","@alternate_symbols":["m","man"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AZN","@iso_numeric":"944","@name":"Azerbaijani Manat","@priority":100,"@smallest_denomination":1,"@subunit":"Qəpik","@subunit_to_unit":100,"@symbol":"₼","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"azn"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#code>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"azn","@alternate_symbols":["m","man"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AZN","@iso_numeric":"944","@name":"Azerbaijani Manat","@priority":100,"@smallest_denomination":1,"@subunit":"Qəpik","@subunit_to_unit":100,"@symbol":"₼","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":"₼"},"class_name":"Money::Currency","method_name":"code","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",396]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aed","@alternate_symbols":["DH","Dhs"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AED","@iso_numeric":"784","@name":"United Arab Emirates Dirham","@priority":100,"@smallest_denomination":25,"@subunit":"Fils","@subunit_to_unit":100,"@symbol":"د.إ","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aed","@alternate_symbols":["DH","Dhs"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AED","@iso_numeric":"784","@name":"United Arab Emirates Dirham","@priority":100,"@smallest_denomination":25,"@subunit":"Fils","@subunit_to_unit":100,"@symbol":"د.إ","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"aed"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"afn","@alternate_symbols":["Af","Afs"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AFN","@iso_numeric":"971","@name":"Afghan Afghani","@priority":100,"@smallest_denomination":100,"@subunit":"Pul","@subunit_to_unit":100,"@symbol":"؋","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"afn","@alternate_symbols":["Af","Afs"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AFN","@iso_numeric":"971","@name":"Afghan Afghani","@priority":100,"@smallest_denomination":100,"@subunit":"Pul","@subunit_to_unit":100,"@symbol":"؋","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"afn"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"all","@alternate_symbols":["Lek"],"@decimal_mark":".","@disambiguate_symbol":"Lek","@html_entity":"","@iso_code":"ALL","@iso_numeric":"008","@name":"Albanian Lek","@priority":100,"@smallest_denomination":100,"@subunit":"Qintar","@subunit_to_unit":100,"@symbol":"L","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"all","@alternate_symbols":["Lek"],"@decimal_mark":".","@disambiguate_symbol":"Lek","@html_entity":"","@iso_code":"ALL","@iso_numeric":"008","@name":"Albanian Lek","@priority":100,"@smallest_denomination":100,"@subunit":"Qintar","@subunit_to_unit":100,"@symbol":"L","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"all"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"amd","@alternate_symbols":["dram"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AMD","@iso_numeric":"051","@name":"Armenian Dram","@priority":100,"@smallest_denomination":10,"@subunit":"Luma","@subunit_to_unit":100,"@symbol":"դր.","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"amd","@alternate_symbols":["dram"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AMD","@iso_numeric":"051","@name":"Armenian Dram","@priority":100,"@smallest_denomination":10,"@subunit":"Luma","@subunit_to_unit":100,"@symbol":"դր.","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"amd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"ang","@alternate_symbols":["NAƒ","NAf","f"],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x0192;","@iso_code":"ANG","@iso_numeric":"532","@name":"Netherlands Antillean Gulden","@priority":100,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"ƒ","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"ang","@alternate_symbols":["NAƒ","NAf","f"],"@decimal_mark":",","@disambiguate_symbol":null,"@html_entity":"&#x0192;","@iso_code":"ANG","@iso_numeric":"532","@name":"Netherlands Antillean Gulden","@priority":100,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"ƒ","@symbol_first":true,"@thousands_separator":"."}},"id":{"class_name":"String","value":"ang"}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aoa","@alternate_symbols":[],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AOA","@iso_numeric":"973","@name":"Angolan Kwanza","@priority":100,"@smallest_denomination":10,"@subunit":"Cêntimo","@subunit_to_unit":100,"@symbol":"Kz","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aoa","@alternate_symbols":[],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"AOA","@iso_numeric":"973","@name":"Angolan Kwanza","@priority":100,"@smallest_denomination":10,"@subunit":"Cêntimo","@subunit_to_unit":100,"@symbol":"Kz","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"aoa"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"ars","@alternate_symbols":["$m/n","m$n"],"@decimal_mark":",","@disambiguate_symbol":"$m/n","@html_entity":"$","@iso_code":"ARS","@iso_numeric":"032","@name":"Argentine Peso","@priority":100,"@smallest_denomination":1,"@subunit":"Centavo","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":"."}}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"ars","@alternate_symbols":["$m/n","m$n"],"@decimal_mark":",","@disambiguate_symbol":"$m/n","@html_entity":"$","@iso_code":"ARS","@iso_numeric":"032","@name":"Argentine Peso","@priority":100,"@smallest_denomination":1,"@subunit":"Centavo","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":"."}},"id":{"class_name":"String","value":"ars"}},"return_value":{"class_name":"String","value":"."},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aud","@alternate_symbols":["A$"],"@decimal_mark":".","@disambiguate_symbol":"A$","@html_entity":"$","@iso_code":"AUD","@iso_numeric":"036","@name":"Australian Dollar","@priority":4,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"aud","@alternate_symbols":["A$"],"@decimal_mark":".","@disambiguate_symbol":"A$","@html_entity":"$","@iso_code":"AUD","@iso_numeric":"036","@name":"Australian Dollar","@priority":4,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"aud"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"awg","@alternate_symbols":["Afl"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"&#x0192;","@iso_code":"AWG","@iso_numeric":"533","@name":"Aruban Florin","@priority":100,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"ƒ","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"awg","@alternate_symbols":["Afl"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"&#x0192;","@iso_code":"AWG","@iso_numeric":"533","@name":"Aruban Florin","@priority":100,"@smallest_denomination":5,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"ƒ","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"awg"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bam","@alternate_symbols":["KM"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BAM","@iso_numeric":"977","@name":"Bosnia and Herzegovina Convertible Mark","@priority":100,"@smallest_denomination":5,"@subunit":"Fening","@subunit_to_unit":100,"@symbol":"КМ","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bam","@alternate_symbols":["KM"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BAM","@iso_numeric":"977","@name":"Bosnia and Herzegovina Convertible Mark","@priority":100,"@smallest_denomination":5,"@subunit":"Fening","@subunit_to_unit":100,"@symbol":"КМ","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"bam"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bbd","@alternate_symbols":["Bds$"],"@decimal_mark":".","@disambiguate_symbol":"Bds$","@html_entity":"$","@iso_code":"BBD","@iso_numeric":"052","@name":"Barbadian Dollar","@priority":100,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bbd","@alternate_symbols":["Bds$"],"@decimal_mark":".","@disambiguate_symbol":"Bds$","@html_entity":"$","@iso_code":"BBD","@iso_numeric":"052","@name":"Barbadian Dollar","@priority":100,"@smallest_denomination":1,"@subunit":"Cent","@subunit_to_unit":100,"@symbol":"$","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"bbd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bdt","@alternate_symbols":["Tk"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BDT","@iso_numeric":"050","@name":"Bangladeshi Taka","@priority":100,"@smallest_denomination":1,"@subunit":"Paisa","@subunit_to_unit":100,"@symbol":"৳","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bdt","@alternate_symbols":["Tk"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BDT","@iso_numeric":"050","@name":"Bangladeshi Taka","@priority":100,"@smallest_denomination":1,"@subunit":"Paisa","@subunit_to_unit":100,"@symbol":"৳","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"bdt"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bgn","@alternate_symbols":["lev","leva","лев","лева"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BGN","@iso_numeric":"975","@name":"Bulgarian Lev","@priority":100,"@smallest_denomination":1,"@subunit":"Stotinka","@subunit_to_unit":100,"@symbol":"лв.","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bgn","@alternate_symbols":["lev","leva","лев","лева"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BGN","@iso_numeric":"975","@name":"Bulgarian Lev","@priority":100,"@smallest_denomination":1,"@subunit":"Stotinka","@subunit_to_unit":100,"@symbol":"лв.","@symbol_first":false,"@thousands_separator":","}},"id":{"class_name":"String","value":"bgn"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bhd","@alternate_symbols":["BD"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BHD","@iso_numeric":"048","@name":"Bahraini Dinar","@priority":100,"@smallest_denomination":5,"@subunit":"Fils","@subunit_to_unit":1000,"@symbol":"ب.د","@symbol_first":true,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize>","parameters":[["req","id"]],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bhd","@alternate_symbols":["BD"],"@decimal_mark":".","@disambiguate_symbol":null,"@html_entity":"","@iso_code":"BHD","@iso_numeric":"048","@name":"Bahraini Dinar","@priority":100,"@smallest_denomination":5,"@subunit":"Fils","@subunit_to_unit":1000,"@symbol":"ب.د","@symbol_first":true,"@thousands_separator":","}},"id":{"class_name":"String","value":"bhd"}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",271]},{"klass":"Money::Currency","method":"#<Method: Money::Currency#initialize_data!>","parameters":[],"arguments":{"self":{"class_name":"Money::Currency","value":{"@id":"bif","@alternate_symbols":["FBu"],"@decimal_mark":".","@disambiguate_symbol":"FBu","@html_entity":"","@iso_code":"BIF","@iso_numeric":"108","@name":"Burundian Franc","@priority":100,"@smallest_denomination":100,"@subunit":"Centime","@subunit_to_unit":1,"@symbol":"Fr","@symbol_first":false,"@thousands_separator":","}}},"return_value":{"class_name":"String","value":","},"class_name":"Money::Currency","method_name":"initialize_data!","method_location":["/Users/glitt/personal-dev/oss-gems/money/lib/money/currency.rb",417]}]
    }
  }