var html = require('./index.jade');
var div = document.createElement('div');
div.innerHTML = html();
document.body.appendChild(div);

//加载百度ueditor插件
require('./lib/ueditor.config.js')
require('./lib/ueditor.all.min.js')
require('./lib/zh-cn.js')

var ue = UE.getEditor('editor');

var context = $(div);

var obj = {};
obj['title'] = require('../e-title/index.jade');
obj['content'] = require('../e-content/index.jade');

context.find('ul').on('click', 'li', function() {
	var role = $(this).data('role');
	ue.execCommand('insertHtml', obj[role]());
});