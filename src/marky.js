'use strict';

/**
 * Marky Mark
 * Author: Patrick Fricano
 * https://www.github.com/patrickfatrick/marky-mark
 */

import {Map} from 'immutable';
import prototypes from './modules/prototypes';
import mark from './modules/mark';
import * as dispatcher from './modules/dispatcher';

prototypes();

export class Marky {
	constructor () {
		this.mark = mark;
		this.state = [Map({markdown: '', html: ''})],
		this.index = 0;
	}

	update(markdown, state, index) {
		const action = dispatcher.update(markdown, state, index);
		this.state = action.state;
		this.index = action.index;
	}

	undo(state, index) {
		if (index === 0) return state[0];

		const action = dispatcher.undo(state, index);
		this.index = action.index;
		return action.state;
	}

	redo(state, index) {
		if (index === state.length - 1) return state[state.length - 1];

		const action = dispatcher.redo(state, index);
		this.index = action.index;
		return action.state;
	}
}
