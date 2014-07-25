// Unit tests for controllers/game-controller.js

var badGameName = {};
var badGameNameValue = "Unknown";
var goodGameName = "Test";

var badGameRules = "what";
var goodGameRules = new GameRules();

var badGameView = "what";
var goodGameView = new GameView([[]]);

var badStackModel = "bong";

var badCards = "plop";
var goodCards = $('<div></div>');

var st = new StackTypes();
var fd = new FanningDirectionSet();

/** 
 * Requires the extended classes which implement the required abstract classes' stuff.
 * Gotta do it this way until QUnit has mock objects. *shrug*
 */
var TestRules = Class({ extends : GameRules }, {
	_numDecksInGame : 2,
	_includeJokers : false,
	_acesHigh : false,
	_layout : [
		[ null, null, null, {
			stackType : st.inPlay.getStackTypeName(),
			fanningDirection : fd.up,
			numCardsFacingDown : 5,
			numCardsFacingUp : 2
		} ]
	],
	__construct : function() { this.super('__construct'); } 
});
var TestView = Class({ extends : GameView }, { __construct : function(stackModel) { this.super('__construct', stackModel); } });


/** Constructor tests **/
QUnit.test( "constructor failure tests", function( assert ) {
	expect(3);

	assert.throws(
		function() { var gc = new GameController(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The `gameName` param is required.' &&
				e.getCallingMethod() === 'GameController.__construct'
			);
		},
		"Expected that `gameName` param is required was not thrown!"
	);

	assert.throws(
		function() { var gc = new GameController(badGameNameValue); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "UnknownRules" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameRules'
			);
		},
		"Expected that a class by the name 'UnknownRules' doesn't exist was not thrown!"
	);

	assert.throws(
		function() { var gc = new GameController(badGameName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `gameName` param is a String was not thrown!"
	);

});

QUnit.test( "constructor success tests", function( assert ) {
	expect(1);

	var good = new GameController(goodGameName);
	assert.ok(
		good.instanceOf(GameController) === true,
		"Expected that the instantiated object is a `GameController` class."
	);
});

/** Set/Get methods **/
QUnit.test( "`__setGameName()` and `getGameName()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameName(badGameName); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'String'
			);
		},
		"Expected that `gameName` param is a String was not thrown!"
	);

	good.__setGameName(goodGameName);
	assert.strictEqual(
		good.getGameName(),
		goodGameName,
		'The String returned from `getGameName()` (' + 
			good.getGameName() + 
			') does not match the one passed into `__setGameName()` (' + 
			goodGameName + ').'
	);
});

QUnit.test( "`__setGameRules()` and `getGameRules()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameRules(badGameRules); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'GameRules'
			);
		},
		"Expected that `gameName` param is a GameRules was not thrown!"
	);

	good.__setGameRules(goodGameRules);
	assert.strictEqual(
		good.getGameRules(),
		goodGameRules,
		'The GameRules returned from `getGameRules()` (' + 
			good.getGameRules() + 
			') does not match the one passed into `__setGameRules()` (' + 
			goodGameRules + ').'
	);
});

QUnit.test( "`__setGameView()` and `getGameView()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setGameView(badGameRules); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'GameView'
			);
		},
		"Expected that `gameName` param is a GameView was not thrown!"
	);

	good.__setGameView(goodGameView);
	assert.strictEqual(
		good.getGameView(),
		goodGameView,
		'The GameView returned from `getGameView()` (' + 
			good.getGameView() + 
			') does not match the one passed into `__setGameView()` (' + 
			goodGameView + ').'
	);
});

QUnit.test( "`__setCards()` and `getCards()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	assert.throws(
		function() { good.__setCards(badCards); },
		function (e) {
			return (
				e.instanceOf(TypeException) === true &&
				e.getType() === 'jQuery'
			);
		},
		"Expected that `gameName` param is a jQuery object was not thrown!"
	);

	good.__setCards(goodCards);
	assert.strictEqual(
		good.getCards(),
		goodCards,
		'The jQuery object returned from `getCards()` (' + 
			good.getCards() + 
			') does not match the one passed into `__setCards()` (' + 
			goodCards + ').'
	);
});

/** Private method tests **/
QUnit.test( "`__loadGameRules()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);
	good.__setGameName(badGameNameValue);
	assert.throws(
		function() { good.__loadGameRules(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "' + badGameNameValue + 'Rules" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameRules'
			);
		},
		"Expected that a class by the name 'TestRules' doesn't exist was not thrown!"
	);

	good.__setGameName(goodGameName);
	good.__loadGameRules();
	var gr = good.getGameRules();
	assert.ok(
		gr.instanceOf(TestRules) === true,
		'Expected the GameRules object generated to be an instance of the sub-class "' + goodGameName + 'Rules"' 
	);
});

QUnit.test( "`__loadGameView()` tests", function( assert ) {
	expect(2);

	var good = new GameController(goodGameName);

	good.__setGameName(badGameNameValue);
	assert.throws(
		function() { good.__loadGameView(); },
		function (e) {
			return (
				e.instanceOf(CardGameException) === true &&
				e.getMessage() === 'The expected game class "' + badGameNameValue + 'View" does not exist.' &&
				e.getCallingMethod() === 'GameController.__loadGameView'
			);
		},
		"Expected that a class by the name 'TestView' doesn't exist was not thrown!"
	);

	good.__setGameName(goodGameName);
	good.__loadGameView();
	var gv = good.getGameView();
	assert.ok(
		gv.instanceOf(TestView) === true,
		'Expected the GameView object generated to be an instance of the sub-class "' + goodGameName + 'View"' 
	);
});

/** Public method tests ** /
QUnit.test( "`()` tests", function( assert ) {
	expect();

});

/** **/