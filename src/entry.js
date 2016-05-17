/**
 * 入口文件
 */

var util = require('./lib/util');

var components = {};
components.contentAdmin = require('./components/contentAdmin');
components.editor = require('./components/editor');

var name = util.hash.get('name');
if (name !== '' && components[name]) {
	var mod = components[name];
	mod.init && mod.init();
}