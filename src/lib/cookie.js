/**
 * cookie的获取设置删除操作
 */

exports.get = get;
exports.set = set;
exports.del = del;

/**
 * 获取cookie的值
 * @param  {String}
 * @return {Mixed}
 */
function get(name) {
	var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
		val = document.cookie.match(reg);
	return val ? (val[2] ? unescape(val[2]) : "") : null;
}

/**
 * 设置或修改cookie, 如果是修改cookie则必须使用跟设置时相同的参数, 否则会出现两个cookie
 * @param {String} name cookie的名字
 * @param {String} value cookie的值
 * @param {String} expires 过期时间(分钟)
 * @param {String} path cookie作用的路径
 * @param {String} domain cookie作用的域名
 * @param {String} secure 是否为安全cookie, 设置了该项则该cookie只能通过https协议传递, 而不能通过js获取.
 */
function set(name, value, expires, path, domain, secure) {
	var exp = new Date(),
		expires = arguments[2] || null,
		path = arguments[3] || "/",
		domain = arguments[4] || null,
		secure = arguments[5] || false;
	expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
	document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

/**
 * 删除cookie, 删除时必须与设置时使用相同的参数
 * @param  {String} name cookie的名字
 * @param  {String} path cookie作用的路径
 * @param  {String} domain cookie作用的域名
 * @param  {String} secure 是否为安全cookie, 设置了该项则该cookie只能通过https协议传递, 而不能通过js获取.
 * @return {String}
 */
function del(name, path, domain, secure) {
	var value = $getCookie(name);
	if (value != null) {
		var exp = new Date();
		exp.setMinutes(exp.getMinutes() - 1000);
		path = path || "/";
		document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
	}
}