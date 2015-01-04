/**
 * additional-methods
 *
 * @author 4what
 * @version
 * @requires jQuery 1.3.2, jQuery Validation, Validate
 */

// 姓名（中文）
jQuery.validator.addMethod("isChinese", function(value, element) {
	return this.optional(element) || Validate.isChinese(value);
}, "请输入真实中文姓名");

// 身份证
jQuery.validator.addMethod("isIdCard", function(value, element) {
	return this.optional(element) || Validate.isIdCard(value);
}, "请输入真实身份证号");

// 手机
jQuery.validator.addMethod("isMobile", function(value, element) {
	return this.optional(element) || Validate.isMobile(value);
}, "请输入真实手机号");

// 电话
jQuery.validator.addMethod("isPhone", function(value, element) {
	return this.optional(element) || Validate.isMobile(value) || Validate.isTel(value);
}, "请输入真实电话号");

// 邮编
jQuery.validator.addMethod("isPostalCode", function(value, element) {
	return this.optional(element) || Validate.isPostalCode(value);
}, "请输入真实邮政编码");

// 座机
jQuery.validator.addMethod("isTel", function(value, element) {
	return this.optional(element) || Validate.isTel(value);
}, "请输入真实座机号");

// 用户名
jQuery.validator.addMethod("isUsername", function(value, element) {
	return this.optional(element) || Validate.isUsername(value);
}, "请用字母、数字或下划线，长度6-18，字母开头，不区分大小写");
