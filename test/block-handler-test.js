import chai from 'chai';
import jsdom from 'jsdom';
import mark from '../src/modules/mark';
import {blockHandler} from '../src/modules/handlers';

chai.should();
describe('block handling', () => {
	it('adds a formatting string to the beginning of a line', () => {
		let string = 'Some text';
		let indices = [0, 9];

		let headingify = blockHandler(string, indices, '#' + ' ');

		headingify.value.should.equal('# Some text');
		headingify.range.should.contain.members([2, 11]);
	});

	it('does not matter where the selection is on that line', () => {
		let string = 'Some text';
		let indices = [9, 9];

		let quotify = blockHandler(string, indices, '>' + ' ');

		quotify.value.should.equal('> Some text');
		quotify.range.should.contain.members([11, 11]);
	});

	it('works with multi-line selections', () => {
		let string = 'Some text\r\nSome other text';
		let indices = [0, 26];

		let headingify = blockHandler(string, indices, '##' + ' ');

		headingify.value.should.equal('## Some text\r\nSome other text');
		headingify.range.should.contain.members([3, 29]);
	});

	it('ignores other lines around the selection', () => {
		let string = 'Some text\r\nSome other text';
		let indices = [11, 26];

		let headingify = blockHandler(string, indices, '#' + ' ');

		headingify.value.should.equal('Some text\r\n# Some other text');
		headingify.range.should.contain.members([13, 28]);
	});

	it('removes all other block formatting', () => {
		let string = '# Some text';
		let indices = [0, 11];

		let headingify = blockHandler(string, indices, '###' + ' ');

		headingify.value.should.equal('### Some text');
		headingify.range.should.contain.members([4, 13]);
	});

	it('removes all other block formatting even if format string is directly touching text', () => {
		let string = '> Some text';
		let indices = [0, 10];

		let headingify = blockHandler(string, indices, '##' + ' ');

		headingify.value.should.equal('## Some text');
		headingify.range.should.contain.members([3, 11]);
	});

	it('considers inline formats to be text', () => {
		let string = '**Some text**';
		let indices = [0, 13];

		let headingify = blockHandler(string, indices, '##' + ' ');

		headingify.value.should.equal('## **Some text**');
		headingify.range.should.contain.members([3, 16]);
	});

	it('also considers inline formats to be text when removing other block formats', () => {
		let string = '> **Some text**';
		let indices = [0, 15];

		let headingify = blockHandler(string, indices, '##' + ' ');

		headingify.value.should.equal('## **Some text**');
		headingify.range.should.contain.members([2, 15]);
	});

	it('works on a blank line', () => {
		let string = '';
		let indices = [0, 0];

		let headingify = blockHandler(string, indices, '#' + ' ');

		headingify.value.should.equal('# ');
		headingify.range.should.contain.members([2, 2]);
	});

	it('removes other formatting on a blank line', () => {
		let string = '>';
		let indices = [0, 1];

		let headingify = blockHandler(string, indices, '#' + ' ');

		headingify.value.should.equal('# ');
		headingify.range.should.contain.members([2, 2]);
	});

});