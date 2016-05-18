var html = require('./index.jade');
var div = document.createElement('div');
var config = require('./e-config.js');
div.innerHTML = html({
	list: config
});
document.body.appendChild(div);

//加载百度ueditor插件
require('./lib/ueditor.config.js');
require('./lib/ueditor.all.min.js');
require('./lib/zh-cn.js');

var ue = UE.getEditor('editor');

var cmd = require('./command.js');

var context = $(div);
context.append(cmd.html());

var tools = context.find('.tools');
cmd.init(tools);

context.find('ul').on('click', 'li[data-role]', function() {
	var role = $(this).data('role');
	ue.execCommand('insertHtml', config[role]());
	ue.selection.getStart().scrollIntoView();
});

setTimeout(function() {
	var last = null;
	var f = context.find('iframe').first();
	var doc = $(f.get(0).contentDocument);
	var foff = f.offset();

	doc.on('click', function(e) {
		var target = $(e.target);
		cmd.current = $(ue.selection.getStart()).parents('section').first();
		tools.trigger('cmd-blur');
		if (!cmd.current.length) {
			last && last.css('border', 'none');
			return ;
		} else if (cmd.current == last) {
			return;
		}
		last && last.css('border', 'none');
		cmd.current.css('border', '1px dotted rgb(253, 140, 37)');
		tools.trigger('cmd-focus', [cmd.current, f]);
		last = cmd.current;
	});
});