Ext.onReady(function () {

	/* Nav */
	var _nav = new Ext.Panel({
		region: "west",
		title: "管理系统",
		collapseMode: "mini",
		collapsible: true,
		iconCls: "icon-accordion",
		layout: {
			type: "accordion",
			//activeOnTop: true,
			animate: true
		},
		split: true,
		width: 200,
		defaults: {
			xtype: "treepanel",
			autoScroll: true,
			border: false,
			containerScroll: true,
			//lines: false,
			rootVisible: false,
			//singleExpand: true,
			useArrows: true,
			listeners: {
				click: function (node, e) {
					$extjs.tab.loadOnClickLeaf(node, e, _main, {
						iconCls: "icon-grid"
					});
				}
			}
		},
		items: [
			// 自定义
			{
				title: "控制面板",
				iconCls: "icon-ctrl",
				root: {
					expanded: true,
					children: [
						{
							text: "商品管理",
							singleClickExpand: true,
							children: []
							//qtip: "文字",
							//qtipCfg: { title: "标题", text: "文字" }
						},
						{
							text: "相册管理",
							iconCls: "icon-folder-album",
							singleClickExpand: true,
							children: []
						},
						{
							text: "消息管理",
							iconCls: "icon-folder-msg",
							singleClickExpand: true,
							children: []
						},
						{
							text: "系统配置",
							iconCls: "icon-folder-setting",
							singleClickExpand: true,
							children: []
						},
						{
							text: "用户管理",
							iconCls: "icon-group",
							singleClickExpand: true,
							children: [
								{
									text: "修改密码",
									leaf: true,
									href: ""
									//hrefTarget: "_blank"
								}
							]
						}
					]
				}
			},
			{
				title: "帮助文档",
				iconCls: "icon-doc",
				root: {}
			}
		],
		tbar: {
			items: [
				{
					text: "username",
					xtype: "tbtext",
					cls: "icon-user icon-text"
				},
				"->",
				{
					text: "退出",
					xtype: "button",
					iconCls: "icon-logout",
					handler: function (button, e) {
						// 自定义
						window.location.href = "login.html";
					}
				}
			]
		},
		bbar: {
			buttonAlign: "right",
			items: [
				{
					//text: "展开",
					xtype: "button",
					iconCls: "icon-expand",
					handler: function (button, e) {
						$extjs.tree.toggle(_nav, true);
					}
				},
				"-",
				{
					//text: "折叠",
					xtype: "button",
					iconCls: "icon-collapse",
					handler: function (button, e) {
						$extjs.tree.toggle(_nav, false);
					}
				}
			]
		}
	});


	/* Main */
	var _main = new Ext.TabPanel({
		region: "center",
		//title: "",
		id: "main",
		activeTab: 0,
		border: false,
		enableTabScroll: true,
		plugins: new Ext.ux.TabCloseMenu(),
		//tabPosition: "bottom",
		items: [
			{
				title: "Welcome!",
				//closable: true,
				contentEl: "welcome",
				frame: true,
				//html: '<iframe src="main.html" frameborder="0" scrolling="no"></iframe>',
				iconCls: "icon-tab"
				//tabTip: "文字"
			}
		]
	});


	/* Viewport */
	var _viewport = new Ext.Viewport({
		layout: "border",
		items: [
			//{ region: "north", title: "北" },
			_nav,
			//{ region: "south", title: "南" },
			//{ region: "east", title: "东" },
			_main
		]
	});


	/* Homepage */
	// 自定义
	$extjs.tab.load(_main, {
		title: "主页",
		src: "main.html",
		iconCls: "icon-grid"
	});

});
