/**
 * Validate
 *
 * @author 4what
 * @version 2012.06.22
 */
(function() {

var Validate = window["Validate"] = {
	// chinese
	isChinese: function(value) {
		return /^[\u0391-\uFFE5]+$/.test(value);
	},

	// ID card
	isIdCard: function(number) {
		var date, Ai;
		var verify = "10x98765432";
		var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var area = ["", "", "", "", "", "", "", "", "", "", "", "北京", "天津", "河北", "山西", "内蒙古", "", "", "", "", "", "辽宁", "吉林", "黑龙江", "", "", "", "", "", "", "", "上海", "江苏", "浙江", "安微", "福建", "江西", "山东", "", "", "", "河南", "湖北", "湖南", "广东", "广西", "海南", "", "", "", "重庆", "四川", "贵州", "云南", "西藏", "", "", "", "", "", "", "陕西", "甘肃", "青海", "宁夏", "新疆", "", "", "", "", "", "台湾", "", "", "", "", "", "", "", "", "", "香港", "澳门", "", "", "", "", "", "", "", "", "国外"];
		var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
		if (re == null) return false;
		if (re[1] >= area.length || area[re[1]] == "") return false;
		if (re[2].length == 12) {
			Ai = number.substr(0, 17);
			date = [re[9], re[10], re[11]].join("-");
		} else {
			Ai = number.substr(0, 6) + "19" + number.substr(6);
			date = ["19" + re[4], re[5], re[6]].join("-");
		}
		//if (!this.IsDate(date, "ymd")) return false;
		var sum = 0;
		for (var i = 0; i <= 16; i++) {
			sum += Ai.charAt(i) * Wi[i];
		}
		Ai += verify.charAt(sum % 11);
		return (number.length == 15 || number.length == 18 && number == Ai);
	},

	// mobile phone
	isMobile: function(value) {
		return /^((\(\d{2,3}\))|(\d{3}\-))?((13\d{9})|(15\d{9})|(18[0123456789]\d{8}))$/.test(value);
	},

	// postal code
	isPostalCode: function(value) {
		return /^[1-9]\d{5}$/.test(value);
	},

	// telephone
	isTel: function(value) {
		return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value);
	},

	// username
	isUsername: function(value) {
		return /^[a-zA-Z]([a-zA-Z]|\d|_){4,16}([a-zA-Z]|\d)$/.test(value);
	}
};

})();
