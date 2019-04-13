import path from 'path';
import test from 'ava';
import Vinyl from 'vinyl';
import pEvent from 'p-event';
import fn from '.';

test(async t => {
	const stream = fn();
	const promise = pEvent(stream, 'data');

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'file.ext'),
		contents: Buffer.from('unicorns')
	}));

  const file = await promise;
  const expected = [
    'import {css} from \'lit-element\';',
    'export const styles = css`',
    'unicorns`;',
  ].join('\n');

  t.is(file.contents.toString(), expected);
});
