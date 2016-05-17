/**
 * 获取url当中hash部分的参数
 * @type {[type]}
 */
exports.get = get;

/**
 * @param  {String} 必填参数
 * @param  {String} 可选参数
 * @return {String} 如果没有值返回空串
 */
function get(name, url) {
	var u = arguments[1] || window.location.hash,
		reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
		r = u.substr(u.indexOf("\#") + 1).match(reg);
	return r != null ? r[2] : "";
}