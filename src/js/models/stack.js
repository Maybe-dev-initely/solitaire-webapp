/**
 * Model class representing a single Stack of cards.
 *
 * @copyright	Copyright (c) 2014, Derek Rosenzweig
 * @class		Stack
 * @name		Stack
 * @version		0.2
 * @author		Derek Rosenzweig <derek.rosenzweig@gmail.com>
 */
var Stack = Class({
	//--------------------------------------------------------------------------
	//
	//  Variables and get/set functions
	//
	//--------------------------------------------------------------------------

	/**
	 * Indicates the classification type of this Stack.
	 *
	 * @private		
	 * @type		StackType
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		null
	 */
	_stackType : null,
	
	/**
	 * Sets the `_stackType` property to the value of `st`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		StackType			st			The StackType classification for this Stack. Required.
	 */
	__setStackType : function(st)
	{
		if (! st.hasOwnProperty('instanceOf') || ! st.instanceOf(StackType)) {
			throw new TypeException("StackType", "Stack.__setStackType");
		}
		this._stackType = st;
	},
	
	/**
	 * Returns the `_stackType` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		StackType			_stackType		Returns the `_stackType` property.
	 */
	getStackType : function()
	{
		return this._stackType;
	},

	/**
	 * Indicates the FanningDirection this Stack will use in the display
	 *
	 * @private		
	 * @type		FanningDirection
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		null
	 */
	_fanningDirection : null,
	
	/**
	 * Sets the `_fanningDirection` property to the value of `fd`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		FanningDirection			fd			The FanningDirection this Stack will use in the display. Required.
	 */
	__setFanningDirection : function(fd)
	{
		if (! fd.hasOwnProperty('instanceOf') || ! fd.instanceOf(FanningDirection)) {
			throw new TypeException("FanningDirection", "Stack.__setFanningDirection");
		}
		this._fanningDirection = fd;
	},
	
	/**
	 * Returns the `_fanningDirection` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		FanningDirection			_fanningDirection		Returns the `_fanningDirection` property.
	 */
	getFanningDirection : function()
	{
		return this._fanningDirection;
	},

	/**
	 * The number of cards to display face down at the start of the game.
	 *
	 * @private		
	 * @type		Integer
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		0
	 */
	_numCardsFacingDown : 0,
	
	/**
	 * Sets the `_numCardsFacingDown` property to the value of `ncfd`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		Integer			ncfd			The number of cards to display face down at the start of the game. Required.
	 */
	__setNumCardsFacingDown : function(ncfd)
	{
		var parsed = null;
		if (typeof ncfd !== "number" || isNaN(parsed = parseInt(ncfd))) {
			throw new TypeException("Integer", "Stack.__setNumCardsFacingDown");
		}
		this._numCardsFacingDown = parsed;
	},
	
	/**
	 * Returns the `_numCardsFacingDown` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		Integer			_numCardsFacingDown		Returns the `_numCardsFacingDown` property.
	 */
	getNumCardsFacingDown : function()
	{
		return this._numCardsFacingDown;
	},

	/**
	 * The number of cards to display face up at the start of the game.
	 *
	 * @private		
	 * @type		Integer
	 * @memberOf	Stack
	 * @since		0.2
	 * @default		0
	 */
	_numCardsFacingUp : 0,
	
	/**
	 * Sets the `_numCardsFacingUp` property to the value of `ncfu`.
	 * 
	 * @private
	 * @throws		TypeException
	 * @memberOf	Stack
	 * @since		0.2
	 * 
	 * @param		Integer			ncfu			The number of cards to display face up at the start of the game. Required.
	 */
	__setNumCardsFacingUp : function(ncfu)
	{
		var parsed = null;
		if (typeof ncfu !== "number" || isNaN(parsed = parseInt(ncfu))) {
			throw new TypeException("Integer", "Stack.__setNumCardsFacingUp");
		}
		this._numCardsFacingUp = parsed;
	},
	
	/**
	 * Returns the `_numCardsFacingUp` property.
	 * 
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 *
	 * @return		Integer			_numCardsFacingUp		Returns the `_numCardsFacingUp` property.
	 */
	getNumCardsFacingUp : function()
	{
		return this._numCardsFacingUp;
	},

	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 * Initialize the Stack object with supplied parameters
	 *
	 * @constructor
	 * @public
	 * @memberOf	Stack
	 * @since		0.2
	 */
	__construct : function(stackType, fanningDirection, numCardsFacingDown, numCardsFacingUp)
	{
		var callStackCurrent = "Stack.__construct";
		if (stackType === undefined) {
			throw new CardGameException('Stack Type param is required.', callStackCurrent);
		}
		this.__setStackType(stackType);

		// Set optional parameters
		var fanningDirections = new FanningDirectionSet();

		if (fanningDirection === undefined) {
			fanningDirection = fanningDirections.none;
		}
		this.__setFanningDirection(fanningDirection);

		if (numCardsFacingDown !== undefined) {
			this.__setNumCardsFacingDown(numCardsFacingDown);
		}
		if (numCardsFacingUp !== undefined) {
			this.__setNumCardsFacingUp(numCardsFacingUp);
		}
	}

	/** Private Functions **/

	/** Public Functions **/

});