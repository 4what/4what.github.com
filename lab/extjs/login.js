Ext.onReady(function() {

	// form
	var _form = new Ext.form.FormPanel({
		baseCls: "x-plain",
		buttonAlign: "center",
		frame: true,
		labelAlign: "right",
		labelWidth: 75,
		padding: "15px 0 0 15px",
		waitMsgTarget: true,
		width: 350,
		items: [
			{
				title: "帐户",
				xtype: "fieldset",
				//animCollapse: true,
				//checkboxToggle: true,
				//collapsed: true,
				defaults: {
					width: 210
				},
				items: [
					{
						fieldLabel: "用户名",
						xtype: "textfield",
						name: "username", // 自定义
						allowBlank: false
					},
					{
						fieldLabel: "密　码",
						xtype: "textfield",
						inputType: "password",
						name: "password", // 自定义
						allowBlank: false
					}
				]
			},
			{
				title: "通行证",
				xtype: "fieldset",
				animCollapse: true,
				collapsed: true,
				collapsible: true,
				defaults: {
					width: 210
				},
				items: [
					{
						fieldLabel: "用户名",
						xtype: "textfield",
						name: "username-passport" // 自定义
					},
					{
						fieldLabel: "密　码",
						xtype: "textfield",
						inputType: "password",
						name: "password-passport" // 自定义
					}
				]
			}
		],
		buttons: [
			{
				text: "登录",
				xtype: "button",
				handler: function(button, e) {
					_form_submit();
				}
			},
			{
				text: "重置",
				xtype: "button",
				handler: function(button, e) {
					_form.getForm().reset();
				}
			}
		],
		keys: {
			key: Ext.EventObject.ENTER,
			fn: function() {
				_form_submit();
			}
		},
		listeners: {
			beforeaction: function(form, action) {
				this.getFooterToolbar().disable();
			},
			actioncomplete: function(form, action) {
				this.getFooterToolbar().enable();
			},
			actionfailed: function(form, action) {
				this.getFooterToolbar().enable();
			}
		}
	});


	// submit
	function _form_submit() {
		if (_form.getForm().isValid()) {
			_form.getForm().submit({
				url: "data/data.json", // 自定义
				method: "POST",
				params: {
					// 自定义
					method: "login"
				},
				success: function(form, action) {
					// 自定义
					window.location.href = "index.html";
				},
				failure: function(form, action) {
					var
					msg,
					result = action.result;
					if (result) {
						switch (result.msg) {
							// 自定义
							case "":
								msg = "";
								break;
							default:
								msg = result.msg;
								break;
						}
					}
					$ext.failure.form(form, action, msg);
				},
				waitMsg: "请稍候……"
			});
		}
	}


	// window
	new Ext.Window({
		title: "管理员登录",
		border: false,
		buttonAlign: "center",
		closable: false,
		constrain: true,
		iconCls: "icon-login",
		modal: true,
		plain: true,
		resizable: false,
		width: 380,
		items: [_form],
		buttons: ["&copy; 4what"]
	}).show();

});
