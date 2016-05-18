exports.html = require('./command.jade');
exports.del = del;
exports.blankpre = blankpre;
exports.blankafter = blankafter;
exports.init = init;
exports.show = show;
exports.hide = hide;
exports.current = null;
exports.tools = null;

function del() {
	this.remove();
}

function blankpre() {
	this.before('<br>');
}

function blankafter() {
	this.after('<br>');
}

function init(tools) {
	exports.tools = tools;
	var that = null;
	tools.on('click', 'li', function(e) {
		var command = $(this).data('command');
		try {
			exports[command].call(that);
		} catch (e) {
			console.error(e)
		}
		tools.hide();
		tools.trigger('cmd-blur');
	});
	tools.on('cmd-focus', function(e, current, ifr) {
		that = current;
		var ifrOffset = ifr.offset();
		var currentOffset = current.offset();
		currentOffset.top += ifrOffset.top + current.height();
		currentOffset.left += ifrOffset.left;
		show(currentOffset);
	});
	tools.on('cmd-blur', function(e, current) {
		that = null;
		hide();
	});
}

function show(offset) {
	exports.tools.css({
		top: offset.top.toString()+'px',
		left: offset.left.toString()+'px'
	});
	exports.tools.show();
}

function hide() {
	exports.tools.hide();
}