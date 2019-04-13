'use strict';
const through = require('through2');
const PluginError = require('plugin-error');

const styleModuleTemplate = [
  'import {css} from \'lit-element\';',
  'export const styles = css`',
  '{{styles}}`;',
].join('\n');

module.exports = () => {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new PluginError('gulp-csslit', 'Streaming not supported'));
			return;
		}

		try {
      const content = file.contents.toString(encoding);
      const result = styleModuleTemplate.replace(/{{styles}}/g, content);
      file.contents = Buffer.from(result);
      callback(null, file);
		} catch (error) {
      callback(new PluginError('gulp-csslit', error, {filename: file.path}))
		}
	});
};
