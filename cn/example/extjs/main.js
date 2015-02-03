Ext.onReady(function() {

	// vtypes
	Ext.apply(Ext.form.VTypes, $ext.vtypes.daterange());
	Ext.apply(Ext.form.VTypes, $ext.vtypes.html());
	Ext.apply(Ext.form.VTypes, $ext.vtypes.password2());
	Ext.apply(Ext.form.VTypes, $ext.vtypes.timerange());


	// pagesize
	var _pagesize = 20; // 自定义


	// arraystore
	var _arraystore = function() {
		return new Ext.data.Store({
			url: "data/array.json", // 自定义
			autoDestroy: true,
			baseParams: {
				// 自定义
				method: "array"
			},
			reader: new Ext.data.ArrayReader({
				fields: [
					// 自定义
					{name: "value"},
					{name: "text"}
				],
				root: "rows",
				totalProperty: "total"
			})
		});
	};


	// jsonstore
	var _jsonstore = new
		//Ext.data.Store
		Ext.data.GroupingStore
		({
/*
			proxy: new
				Ext.data.HttpProxy
				//Ext.data.ScriptTagProxy
				({
					method: "GET",
					url: "data/json.json" // 自定义
				}),
*/
			url: "data/json.json", // 自定义
			autoDestroy: true,
			autoLoad: {
				params: {
					start: 0
				}
			},
			baseParams: {
				limit: _pagesize,
				// 自定义
				method: "json"
			},
			reader: new Ext.data.JsonReader({
				fields: [
					// 自定义
					{name: "id", type: "int"},
					{name: "number", type: "float"},
					{name: "date", type: "date"},
					{name: "boolean", type: "boolean"}
				],
				root: "rows",
				totalProperty: "total"
			}),
			sortInfo: {
				// 自定义
				direction: "DESC",
				field: "date"
			},

			// for GroupingStore
			groupField: "boolean", // 自定义
			//groupOnSort: true,

			//data: "",
			listeners: {
				beforeload: function(store, options) {
					$ext.store.setBaseParam(
						store,
						"[id^='search-']" // 自定义
					);
				}
			}
		});


	// dummy
	var _dummy = function(size) {
		var data = "abcdefghijklmnopqrstuvwxyz";
		data = size ? data.slice(0, size) : data;
		return data.split("");
	};


	// roweditor
	// !Ext.grid.CheckboxSelectionModel
	var _roweditor = new Ext.ux.grid.RowEditor({
		cancelText: "取消",
		//commitChangesText: "",
		errorText: "",
		saveText: "保存",
		listeners: {
			afteredit: function(roweditor, changes, record, rowIndex) {
				Ext.Ajax.extraParams = {
					// 自定义
					method: "update",
					id: record.get("id")
				};
				_grid.body.mask("请稍候……");
				Ext.Ajax.request({
					url: "data/data.json", // 自定义
					method: "POST",
					params: changes,
					callback: function(options, success, response) {
						_grid.body.unmask();
					},
					success: function(response, options) {
						var
						msg,
						result = Ext.util.JSON.decode(response.responseText);
						if (!result.success) {
							record.reject();
							switch (result.msg) {
								// 自定义
								case "":
									msg = "";
									break;
								default:
									msg = result.msg;
									break;
							}
							Ext.Msg.alert("错误", msg).setIcon(Ext.Msg.ERROR);
						}
					},
					failure: function(response, options) {
						record.reject();
						$ext.failure.ajax(response, options);
					}
				});
			}
		}
	});


	// rowexpander
	var _rowexpander = new Ext.ux.grid.RowExpander({
		expandOnDblClick: false,
		expandOnEnter: false,
		tpl: new Ext.Template(
			'<p style="padding: 10px 0 10px 5px;">{date}</p>' // 自定义
		)
	});


	// sm
	var _sm = new
		//Ext.grid.RowSelectionModel
		Ext.grid.CheckboxSelectionModel
		({
			//singleSelect: true,
			listeners: {
				rowselect: function(sm, rowIndex, record) {
					new Ext.Template(
						'{id}' // 自定义
					).overwrite(_preview.body, record.data);
				},
				selectionchange: function(sm) {
					var
					count = sm.getCount(),
					records = sm.getSelections();

					_grid["btn-del"].setDisabled(count < 1);
					_grid["btn-update"].setDisabled(count !== 1);
					_grid["btn-save"].setDisabled(count < 1);

					// 自定义
					_grid["btn-tab-new"].setDisabled(count !== 1);
				}
			}
		});


	// grid
	var _grid = new
		//Ext.grid.GridPanel
		Ext.grid.EditorGridPanel
		({
			region: "center",
			//clicksToEdit: 1,
			columnLines: true,
			ddGroup: "GridToTree",
			enableDragDrop: true,
			loadMask: true,
			plugins: [
				//_roweditor,
				_rowexpander
			],
			stripeRows: true,
			sm: _sm,
			store: _jsonstore,
			view: new
				//Ext.grid.GridView
				Ext.grid.GroupingView
				//Ext.ux.grid.BufferView
				//Ext.ux.grid.LockingGridView
				({
					autoFill: true
					//forceFit: true,
					//markDirty: false

					// for GroupingView
					//hideGroupedColumn: true,
					//showGroupName: false,
					//startCollapsed: true,
					//groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
				}),
			cm: new
				Ext.grid.ColumnModel
				//Ext.ux.grid.LockingColumnModel
				({
					defaults: {
						//align: "center",
						sortable: true
					},
					columns: [
						_rowexpander,
						new Ext.grid.RowNumberer(),
						_sm,

						// 自定义
						{
							header: "ID",
							dataIndex: "id",
							//align: "center",
							//editable: false,
							//renderer: function(value, metaData, record, rowIndex, colIndex, store) {},
							//tooltip: "文字",
							//width: 100
							editor: {
								xtype: "textfield"
							}

							//locked: true // for LockingColumnModel
						},
						{
							header: "Number",
							dataIndex: "number",
							xtype: "numbercolumn",
							//format: "",
							editor: {
								xtype: "numberfield"
							}
						},
						{
							header: "Date",
							dataIndex: "date",
							xtype: "datecolumn",
							format: "Y-m-d H:i:s",
							editor: {
								xtype: "datefield"
							}
						},
						{
							header: "Boolean",
							dataIndex: "boolean",
							xtype: "booleancolumn",
							falseText: "",
							trueText: '<img src="' + Ext.BLANK_IMAGE_URL + '" alt="" class="icon-chk icon-16" />',
							editor: {
								xtype: "checkbox"
							}
						},
						{
							header: "Action",
							xtype: "actioncolumn",
							items: [
								{
									iconCls: "icon-valid icon-16",
									//tooltip: "文字",
									getClass: function(value, metadata, record, rowIndex, colIndex, store) {
										if (record.get("boolean")) {
											//this.items[0].tooltip = "文字";
											return "icon-hide";
										}
									},
									handler: function(grid, rowIndex, colIndex, item, e) {
										var record = _jsonstore.getAt(rowIndex);
										alert(record.get("id"));
									}
								}
							]
						}
					]
				}),
			tbar: [
				{
					xtype: "buttongroup",
					//columns: 2,
					items: [
						{
							text: "新增",
							xtype: "button",
							iconCls: "icon-add",
							handler: function(button, e) {
								_win.show(button.getEl()).setTitle("新增");
							}
						},
						{
							ref: "../../btn-del",
							text: "删除",
							xtype: "button",
							disabled: true,
							iconCls: "icon-del",
							handler: function(button, e) {
								Ext.Msg.confirm("", "确定删除？", function(buttonId, text, opt) {
									switch (buttonId) {
										case "yes":
											var
											ids = [],
											records = _grid.getSelectionModel().getSelections();
											Ext.each(records, function(item, index, allItems) {
												ids.push(item.get(
													"id" // 自定义
												));
											});
											_grid.body.mask("请稍候……");
											Ext.Ajax.request({
												url: "data/data.json", // 自定义
												method: "POST",
												params: {
													// 自定义
													method: "delete",
													id: ids
												},
												callback: function(options, success, response) {
													_grid.body.unmask();
												},
												success: function(response, options) {
													var
													msg,
													result = Ext.util.JSON.decode(response.responseText);
													if (result.success) {
														_jsonstore.remove(records);
													} else {
														switch (result.msg) {
															// 自定义
															case "":
																msg = "";
																break;
															default:
																msg = result.msg;
																break;
														}
														Ext.Msg.alert("错误", msg).setIcon(Ext.Msg.ERROR);
													}
												},
												failure: $ext.failure.ajax
											});
											break;
										case "no":
											break;
										default:
											break;
									}
								});
							}
						},
						{
							ref: "../../btn-update",
							text: "修改",
							xtype: "button",
							disabled: true,
							iconCls: "icon-edit",
							listeners: {
								click: function(button, e) {
									var
									record = _grid.getSelectionModel().getSelected(),
									id = record.get(
										"id" // 自定义
									);

									_win.show().setTitle("修改");

/*
									_form.getForm().load({
										url: "data/form.json", // 自定义
										params: {
											// 自定义
											method: "form",
											id: id
										},
										success: function(form, action) {
											// 自定义
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
*/

									_form.getForm().loadRecord(record);

									$ext.combo.load(
										"[id^='form-combo-']" // 自定义
									);

									$ext.multiselect.load(
										"[id^='form-multiselect-']", // 自定义
										id
									);

									// RowEditor
									//_roweditor.startEditing(_jsonstore.indexOf(record));

									// 自定义
								}
							}
						},
						{
							ref: "../../btn-save",
							text: "保存",
							xtype: "button",
							disabled: true,
							iconCls: "icon-save",
							handler: function(button, e) {
								var data = [];
								Ext.each(_grid.getSelectionModel().getSelections(), function(item, index, allItems) {
									if (item.dirty) {
										data.push(item.data);
									}
								});
								if (data.length === 0) {
									return;
								}
								_grid.body.mask("请稍候……");
								Ext.Ajax.request({
									url: "data/data.json", // 自定义
									method: "POST",
									params: {
										// 自定义
										method: "save",
										data: Ext.util.JSON.encode(data)
									},
									callback: function(options, success, response) {
										_grid.body.unmask();
									},
									success: function(response, options) {
										var
										msg,
										result = Ext.util.JSON.decode(response.responseText);
										if (result.success) {
											Ext.Msg.alert("", "操作成功", function(buttonId, text, opt) {
												// 自定义
												_jsonstore.reload();
											});
										} else {
											switch (result.msg) {
												// 自定义
												case "":
													msg = "";
													break;
												default:
													msg = result.msg;
													break;
											}
											Ext.Msg.alert("错误", msg).setIcon(Ext.Msg.ERROR);
										}
									},
									failure: $ext.failure.ajax
								});
							}
						}
					]
				},
				"-",
				{
					text: "刷新",
					xtype: "button",
					iconCls: "icon-refresh",
					handler: function(button, e) {
						_jsonstore.reload();
					}
				},
				"-",
				{
					text: "配置",
					xtype: "button",
					iconCls: "icon-cfg",
					handler: function(button, e) {
						// 自定义
						$ext.iframewindow({
							title: "配置",
							src: "login.html",
							iconCls: "icon-cfg"
						}).show();
					}
				},
				"-",
				{
					ref: "../btn-tab-new",
					text: "View in New Tab",
					xtype: "button",
					disabled: true,
					iconCls: "icon-tab-new",
					handler: function(button, e) {
						var
						record = _grid.getSelectionModel().getSelected(),
						id = record.get(
							"id" // 自定义
						);

						// 自定义
						$ext.tab.load("main", {
							title: id,
							src: "main.html?id=" + id,
							iconCls: "icon-grid"
						}, window.parent);
					}
				},
				"-",
				{
					text: "菜单",
					xtype: "button",
					iconCls: "icon-menu",
					menu: {
						items: [
							{
								text: "新增",
								iconCls: "icon-user-add"
							},
							{
								text: "删除",
								iconCls: "icon-user-del"
							},
							{
								text: "修改",
								iconCls: "icon-user-edit"
							},
							{
								text: "消息",
								iconCls: "icon-user-msg"
							},
							"-",
							{
								text: "向下",
								iconCls: "icon-down"
							},
							{
								text: "向上",
								iconCls: "icon-up"
							},
							"-",
							{
								text: "错误",
								iconCls: "icon-error"
							},
							{
								text: "正确",
								iconCls: "icon-valid"
							},
							"-",
							{
								text: "信息",
								iconCls: "icon-info"
							},
							{
								text: "警告",
								iconCls: "icon-warning"
							},
							"-",
							{
								text: "消息",
								iconCls: "icon-msg"
							},
							{
								text: "新建",
								iconCls: "icon-msg-add"
							},
							{
								text: "编辑",
								iconCls: "icon-msg-edit"
							},
							{
								text: "发送",
								iconCls: "icon-msg-send"
							},
							"-",
							{
								text: "任务",
								iconCls: "icon-task"
							},
							{
								text: "修改",
								iconCls: "icon-task-edit"
							},
							"-",
							{
								text: "订阅",
								iconCls: "icon-rss"
							},
							{
								text: "新增",
								iconCls: "icon-rss-add"
							},
							{
								text: "删除",
								iconCls: "icon-rss-del"
							},
							{
								text: "读取",
								iconCls: "icon-rss-load"
							},
							"-",
							{
								text: "文章",
								iconCls: "icon-article"
							},
							{
								text: "附件",
								iconCls: "icon-attach"
							},
							{
								text: "日历",
								iconCls: "icon-calendar"
							},
							{
								text: "图表",
								iconCls: "icon-chart"
							},
							{
								text: "选中",
								iconCls: "icon-chk"
							},
							{
								text: "组件",
								iconCls: "icon-component"
							},
							{
								text: "连接",
								iconCls: "icon-connect"
							},
							{
								text: "收藏",
								iconCls: "icon-fav"
							},
							{
								text: "查找",
								iconCls: "icon-find"
							},
							{
								text: "图片",
								iconCls: "icon-image"
							},
							{
								text: "发送",
								iconCls: "icon-mail-send"
							},
							{
								text: "会员",
								iconCls: "icon-member"
							},
							{
								text: "目录",
								iconCls: "icon-package"
							},
							{
								text: "PDF",
								iconCls: "icon-pdf"
							},
							{
								text: "打印",
								iconCls: "icon-print"
							}
						]
					}
				},
				"->",
				//" ",
				new Ext.ux.form.SearchField({
					//width: 240, // 240|360 // 自定义
					store: _jsonstore,
					emptyText: "关键字"
				})
			],
			bbar: {
				xtype: "paging",
				displayInfo: true,
				pageSize: _pagesize,
				plugins: new Ext.ux.ProgressBarPager(),
				prependButtons: true,
				store: _jsonstore
			},
			listeners: {
				rowdblclick: function(grid, rowIndex, e) {
					// 自定义
					//_grid["btn-update"].fireEvent("click");
				}
			}
		});


	// form
	var _form = new Ext.form.FormPanel({
		// no ajax
		//standardSubmit: true,
		//url: "data/data.jsp", // 自定义
		//method: "POST",

		//fileUpload: true, // TODO: (Java) response.setContentType("text/html");

		//autoScroll: true,
		buttonAlign: "center",
		frame: true,
		//height: 600, // 自定义
		labelAlign: "right", // left|right|top
		labelWidth: 100, // 自定义
		padding: "15px 15px 0 15px",
		waitMsgTarget: true,
		defaults: {
			msgTarget: "under", // qtip|side|title|under
			width: 210 // 自定义
		},
		items: [
			// 自定义
			{
				fieldLabel: "displayfield",
				xtype: "displayfield",
				name: "id"
			},
			{
				fieldLabel: "textfield",
				xtype: "textfield",
				name: "textfield",
				allowBlank: false,
				//disabled: true,
				//grow: true,
				//growMax: 240
				//growMin: 120,
				//labelSeparator: "?",
				//maskRe: /\d/,
				//maxLength: 16,
				//minLength: 6,
				//readOnly: true,
				//regex: /\d/,
				//regexText: "错误",
				//selectOnFocus: true,
				vtype: "html"
				//emptyText: "请输入",
				//value: "默认值"
			},
			{
				autoWidth: true,
				layout: "column",
				defaults: {
					columnWidth: 0.5,
					labelAlign: "top",
					layout: "form",
					defaults: {
						anchor: "95%"
					}
				},
				items: [
					{
						items: [
							{
								id: "password",
								fieldLabel: "密码",
								xtype: "textfield",
								name: "password",
								inputType: "password"
							},
							{
								fieldLabel: "Email",
								xtype: "textfield",
								name: "email",
								vtype: "email"
							}
						]
					},
					{
						items: [
							{
								fieldLabel: "确认密码",
								xtype: "textfield",
								name: "password2",
								inputType: "password",
								vtype: "password2",
								PasswordField: "password"
							},
							{
								fieldLabel: "URL",
								xtype: "textfield",
								name: "url",
								vtype: "url"
							}
						]
					}
				]
			},
			{
				fieldLabel: "选项",
				//text: "新增",
				xtype: "button",
				autoWidth: true,
				iconCls: "icon-add",
				handler: function(button, e) {
					$ext.textfield.insert(
						_form,
						button.getId(),
						// 自定义
						"name",
						{
							value: ""
						}
					);
				}
			},
			{
				fieldLabel: "checkbox",
				xtype: "compositefield",
				items: [
					{
						xtype: "checkbox",
						name: "checkbox",
						boxLabel: "item-0",
						//checked: true,
						inputValue: "0"
					},
					{
						xtype: "checkbox",
						name: "checkbox",
						boxLabel: "item-1",
						inputValue: "1"
					}
				]
			},
			{
				fieldLabel: "checkboxgroup",
				xtype: "checkboxgroup",
				autoWidth: true,
				//columns: 1,
				items: [
					{
						name: "checkboxgroup",
						boxLabel: "item-0",
						inputValue: "0"
					},
					{
						name: "checkboxgroup",
						boxLabel: "item-1",
						inputValue: "1"
					}
				]
			},
			{
				fieldLabel: "combo",
				xtype: "compositefield",
				autoWidth: true,
				items: [
					{
						id: "form-combo-id",
						fieldLabel: "combo",
						xtype: "combo",
						name: "combo",
						hiddenName: "combo",
						//allQuery: "",
						//editable: false,
						forceSelection: true,
						//hideTrigger: true,
						lazyRender: true,
						listWidth: 260,
						//queryParam: "name", // query
						resizable: true,
						//title: "标题",
						//transform: "select-id", // <select name="" id="select-id"><option value=""></option></select>
						triggerAction: "all", // query|all

						// autocomplete
						minChars: 2,
						//typeAhead: true,

						//mode: "remote", // remote|local
						store: _arraystore(),
						pageSize: 10,
						displayField: "text",
						valueField: "value",

						emptyText: "请选择"
					},
					{
						//text: "新增",
						xtype: "button",
						autoWidth: true,
						iconCls: "icon-add",
						handler: function(button, e) {
							var
							combo = Ext.getCmp(
								"form-combo-id" // 自定义
							),
							//text = combo.getRawValue(),
							value = combo.getValue();
							if (value) {
								$ext.multiselect.add(
									"form-multiselect-id", // 自定义
									combo.findRecord(combo.valueField, value)
								);
							}
						}
					}
				]
			},
			{
				fieldLabel: "datefield",
				xtype: "compositefield",
				autoWidth: true,
				items: [
					{
						id: "startdate",
						xtype: "datefield",
						name: "startdate",
						//disabledDates: ["2011-01-01", "01-01", "2011-02", "..-03-..", "2012"],
						//disabledDays: [0, 6],
						editable: false,
						format: "Y-m-d",
						//maxValue: new Date(),
						//minValue: "1970-01-01",
						vtype: "daterange",
						endDateField: "enddate",
						emptyText: "开始日期",
						listeners: {
							select: function(cmp, date) {
								Ext.getCmp(cmp.endDateField).onTriggerClick();
							}
						}
					},
					{
						xtype: "spacer",
						html: "~"
					},
					{
						id: "enddate",
						fieldLabel: "结束日期",
						xtype: "datefield",
						name: "enddate",
						editable: false,
						format: "Y-m-d",
						vtype: "daterange",
						startDateField: "startdate",
						emptyText: "结束日期"
					}
				]
			},
			{
				fieldLabel: "fileuploadfield",
				xtype: "fileuploadfield",
				name: "fileuploadfield",
				buttonCfg: {
					iconCls: "icon-image"
				},
				//buttonOnly: true,
				buttonText: "",
				listeners: {
					fileselected: function(cmp, value) {
						alert(value)
					}
				}
			},
			{
				fieldLabel: "htmleditor",
				xtype: "htmleditor",
				name: "htmleditor",
				width: "95%"
			},
			{
				fieldLabel: "itemselector",
				xtype: "itemselector",
				name: "itemselector",
				autoWidth: true,
				imagePath: "js/extjs/3.4.1.1/examples/ux/images/", // 自定义
				multiselects: [
					{
						height: 240,
						width: 240,
						store: _dummy()
					},
					{
						height: 240,
						width: 240,
						store: [],
						tbar:[
							{
								text: "清空",
								xtype: "button",
								handler: function(button, e) {
									_form.getForm().findField("itemselector").reset();
								}
							}
						]
					}
				]
			},
			{
				id: "form-multiselect-id",
				fieldLabel: "multiselect",
				xtype: "multiselect",
				name: "multiselect",
				allowBlank: false,
				//ddReorder: true,
				height: 240,
				//maxSelections: 3,
				//minSelections: 2,
				width: 240,
				style: {
					"overflow": "hidden"
				},

				store:
					//_jsonstore
					_dummy(3)
				,
				displayField: "number",
				valueField: "id",

				tbar: [
					{
						//text: "删除",
						xtype: "button",
						iconCls: "icon-del",
						handler: function(button, e) {
							$ext.multiselect.del(
								"form-multiselect-id" // 自定义
							);
						}
					}
				]
			},
			{
				fieldLabel: "numberfield",
				xtype: "numberfield",
				name: "numberfield",
				allowDecimals: false,
				allowNegative: false,
				//decimalPrecision: 2,
				maxValue: 100,
				minValue: 1
			},
			{
				fieldLabel: "radio",
				xtype: "compositefield",
				items: [
					{
						xtype: "radio",
						name: "radio",
						boxLabel: "是",
						//checked: true,
						inputValue: "yes"
					},
					{
						xtype: "radio",
						name: "radio",
						boxLabel: "否",
						inputValue: "no"
					}
				]
			},
			{
				fieldLabel: "radiogroup",
				xtype: "radiogroup",
				autoWidth: true,
				//columns: 1,
				items: [
					{
						name: "radiogroup",
						boxLabel: "男",
						inputValue: "male"
					},
					{
						name: "radiogroup",
						boxLabel: "女",
						inputValue: "female"
					}
				]
			},
			{
				fieldLabel: "sliderfield",
				xtype: "sliderfield",
				name: "sliderfield",
				decimalPrecision: 2,
				//increment: 10,
				maxValue: 100,
				minValue: 0
				//tipText: function(thumb) {return thumb.value;},
				//vertical: true
			},
			{
				fieldLabel: "spinnerfield",
				xtype: "spinnerfield",
				name: "spinnerfield",
				accelerate: true
				//alternateIncrementValue: 10,
				//incrementValue: 0.1
			},
			{
				fieldLabel: "textarea",
				xtype: "textarea",
				name: "textarea",
				width: "95%"
			},
			{
				fieldLabel: "timefield",
				xtype: "compositefield",
				autoWidth: true,
				items: [
					{
						id: "starttime",
						xtype: "timefield",
						name: "starttime",
						editable: false,
						format: "H:i",
						increment: 30,
						//maxValue: new Date(),
						//minValue: "00:00",
						width: 95,
						vtype: "timerange",
						endTimeField: "endtime",
						emptyText: "开始时间",
						listeners: {
							select: function(combo, record, index) {
								Ext.getCmp(combo.endTimeField).onTriggerClick();
							}
						}
					},
					{
						xtype: "spacer",
						html: "~"
					},
					{
						id: "endtime",
						xtype: "timefield",
						name: "endtime",
						editable: false,
						format: "H:i",
						increment: 30,
						width: 95,
						vtype: "timerange",
						startTimeField: "starttime",
						emptyText: "结束时间"
					}
				]
			}
		],
		buttons: [
			{
				text: "提交",
				xtype: "button",
				iconCls: "icon-submit",
				handler: function(button, e) {
					_submit();
				}
			},
			{
				text: "重置",
				xtype: "button",
				handler: function(button, e) {
					_reset();
				}
			}
		],
		keys: {
			key: Ext.EventObject.ENTER,
			//alt: true,
			ctrl: true,
			//shift: true,
			fn: function(key, e) {
				_submit();
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

	_form.$ = {};


	// reset
	function _reset() {
		$ext.vtypes.daterange.reset(Ext.getCmp("startdate"), Ext.getCmp("enddate"));
		$ext.vtypes.timerange.reset(Ext.getCmp("starttime"), Ext.getCmp("endtime"));

		$ext.multiselect.clear(
			"[id^='form-multiselect-']" // 自定义
		);

		$ext.textfield.removeAll(_form);

		_form.getForm().reset();
	}


	// submit
	function _submit() {
		$ext.multiselect.selectAll(
			"[id^='form-multiselect-']" // 自定义
		);

		if (_form.getForm().isValid()) {
			_form.getForm().submit({
				url: "data/data.json", // 自定义
				method: "POST",
				params: {
					// 自定义
					method: "save"
				},
				success: function(form, action) {
					Ext.Msg.alert("", "操作成功", function(buttonId, text, opt) {
						// 自定义
						_win.hide();
						_jsonstore.reload();
					});
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
	var _win = new Ext.Window({
		autoScroll: true,
		border: false,
		//closable: false,
		closeAction: "hide", // close|hide
		//constrain: true,
		constrainHeader: true,
		//draggable: false,
		height: 600, // 自定义
		iconCls: "icon-form",
		maximizable: true,
		modal: true,
		//onEsc: function() {Ext.emptyFn();},
		plain: true,
		//resizable: false,
		width: 800, // 自定义
		//x: 0,
		//y: 0,
		items: [_form],
		tools: [
			{id: "toggle"},
			{id: "close"},
			{id: "minimize"},
			{id: "maximize"},
			{id: "restore"},
			{id: "gear"},
			{id: "pin"},
			{id: "unpin"},
			{id: "right"},
			{id: "left"},
			{id: "up"},
			{id: "down"},
			{id: "refresh"},
			{id: "minus"},
			{id: "plus"},
			{id: "help"},
			{id: "search"},
			{id: "save"},
			{id: "print"}
		],
		listeners: {
			beforeshow: function(cmp) {
				_reset();
			}
		}
	});


	// search
	var _search = new Ext.Panel({
		region: "north",
		title: "",
		frame: true,
		height: 80, // 50|80|110 // 自定义
		layout: {
			type: "vbox",
			align: "stretch", // left|center|stretch|stretchmax
			defaultMargins: "5px 0",
			pack: "center" // start|center|end
		},
		split: true,
		defaults: {
			layout: {
				type: "hbox", // TODO: bug, 3.2.1+ ?
				//align: "stretch", // top|middle|stretch|stretchmax
				defaultMargins: "0 5px"
				//pack: "center" // start|center|end
			}
		},
		items: [
			// 自定义
			{
				items: [
					{
						id: "search-cascade-parent",
						xtype: "combo",
						name: "parent",
						editable: false,
						lazyRender: true,
						triggerAction: "all",
						store: _dummy(),
						emptyText: "父级",
						listeners: {
							select: function(combo, record, index) {
								$ext.combo.loadChild(
									combo,
									"#search-cascade-child" // 自定义
								);
							}
						}
					},
					{
						id: "search-cascade-child",
						xtype: "combo",
						name: "child",
						disabled: true,
						editable: false,
						lazyRender: true,
						triggerAction: "all",
						store: _arraystore(),
						displayField: "text",
						valueField: "value",
						emptyText: "子级"
					}
				]
			},
			{
				items: [
					{
						id: "search-monthpicker",
						xtype: "datefield",
						name: "monthpicker",
						editable: false,
						format: "Y年m月",
						value: new Date(),
						listeners: {
							afterrender: function(cmp) {
								$ext.monthpicker(cmp, function() {
									_jsonstore.load();
								});
							}
						}
					}
				]
			}
		]
	});


	// tree
	var _tree = new Ext.tree.TreePanel({
		region: "east",
		autoScroll: true,
		collapsible: true,
		containerScroll: true,
		ddGroup: "GridToTree",
		enableDD: true,
		root: {
			id: "src",
			expanded: true
		},
		rootVisible: false,
		split: true,
		width: 200, // 自定义
		loader: new Ext.tree.TreeLoader({
			url: "data/tree.json", // 自定义
			baseParams: {
				// 自定义
				method: "tree"
			}
		}),
		selModel: new
			Ext.tree.DefaultSelectionModel
			//Ext.tree.MultiSelectionModel
			({
				listeners: {
					selectionchange: function(sm, node) {
						_tree["btn-update"].setDisabled(!node || node.isLeaf());
						_tree["btn-del"].setDisabled(sm.isSelected());

						// 自定义
					}
				}
			}),
		tools: [
			{
				id: "refresh",
				//qtip: "刷新"
				handler: function(e, tool, panel, config) {
					panel.getRootNode().reload();
				}
			}
		],
		tbar: [
			{
				text: "新增",
				xtype: "button",
				iconCls: "icon-add",
				handler: function(button, e) {
					_win.show().setTitle("新增");
				}
			},
			{
				ref: "../btn-del",
				text: "删除",
				xtype: "button",
				disabled: true,
				iconCls: "icon-del",
				handler: function(button, e) {
					Ext.Msg.confirm("", "确定删除？", function(buttonId, text, opt) {
						switch (buttonId) {
							case "yes":
								var node = _tree.getSelectionModel().getSelectedNode();
								_tree.body.mask("请稍候……");
								Ext.Ajax.request({
									url: "data/data.json", // 自定义
									method: "POST",
									params: {
										// 自定义
										method: "delete",
										id: node.id
									},
									callback: function(options, success, response) {
										_tree.body.unmask();
									},
									success: function(response, options) {
										var
										msg,
										result = Ext.util.JSON.decode(response.responseText);
										if (result.success) {
											node.remove();
										} else {
											switch (result.msg) {
												// 自定义
												case "":
													msg = "";
													break;
												default:
													msg = result.msg;
													break;
											}
											Ext.Msg.alert("错误", msg).setIcon(Ext.Msg.ERROR);
										}
									},
									failure: $ext.failure.ajax
								});
								break;
							case "no":
								break;
							default:
								break;
						}
					});
				}
			},
			{
				ref: "../btn-update",
				text: "修改",
				xtype: "button",
				disabled: true,
				iconCls: "icon-edit",
				handler: function(button, e) {
					_win.show().setTitle("修改");
					_form.getForm().load({
						url: "data/data.json", // 自定义
						params: {
							// 自定义
							method: "form",
							id: _tree.getSelectionModel().getSelectedNode().id
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
		],
		bbar: {
			buttonAlign: "right",
			items: [
				{
					//text: "展开",
					xtype: "button",
					iconCls: "icon-expand",
					handler: function(button, e) {
						$ext.tree.toggle(_tree, true);
					}
				},
				"-",
				{
					//text: "折叠",
					xtype: "button",
					iconCls: "icon-collapse",
					handler: function(button, e) {
						$ext.tree.toggle(_tree, false);
					}
				}
			]
		},
		listeners: {
			beforenodedrop: function(dropEvent) {
				var
				callback = new Function(),

				dropNode = dropEvent.dropNode,
				method = "",
				position = dropEvent.point, // above|append|below
				target = dropEvent.target,

				id = "",
				parentId = "";

				if (position !== "append" && target.parentNode === _tree.getRootNode()) {
					return false;
				}

				if (!dropNode) {
					if (position === "append" && !target.isExpanded()) {
						target.expand();
					}

					method = "add";

					var record = dropEvent.data.selections[0];

					id = record.get(
						"id" // 自定义
					);

					if (position === "append" ? target.findChild("id", id) : target.parentNode.findChild("id", id)) {
						return false;
					}

					callback = function() {
						var node = new Ext.tree.TreeNode({
							id: id,
							text: record.get(
								"id" // 自定义
							),
							leaf: true
						});

						switch (position) {
							case "append":
								target.appendChild(node);
								break;
							case "above":
								target.parentNode.insertBefore(node, target);
								break;
							case "below":
								target.parentNode.insertBefore(node, target.nextSibling);
								break;
							default:
								break;
						}
					};
				} else {
					if (!dropNode.isLeaf() || (position === "append" && target === dropNode.parentNode)) {
						return false;
					}

					// replace / sort
					method = target.parentNode !== dropNode.parentNode ? "replace" : "sort";

/*
					// replace
					if (target.parentNode === dropNode.parentNode) {
						return false;
					}
					method = "replace";
*/

/*
					// sort
					if (target.parentNode !== dropNode.parentNode) {
						return false;
					}
					method = "sort";
*/

					id = dropNode.id;
					parentId = dropNode.parentNode.id;
				}

				_tree.body.mask("请稍候……");

				Ext.Ajax.request({
					url: "data/data.json", // 自定义
					method: "POST",
					params: {
						// 自定义
						method: method,
						position: position,
						id: id,
						parentId: parentId,
						targetId: target.id,
						targetParentId: target.parentNode.id
					},
					callback: function(options, success, response) {
						if (!success) {
							_tree.getRootNode().reload();
						}
						_tree.body.unmask();
					},
					success: function(response, options) {
						var
						msg,
						result = Ext.util.JSON.decode(response.responseText);
						if (result.success) {
							// 自定义
							callback();
						} else {
							switch (result.msg) {
								// 自定义
								case "":
									msg = "";
									break;
								default:
									msg = result.msg;
									break;
							}
							Ext.Msg.alert("错误", msg).setIcon(Ext.Msg.ERROR);

							// 自定义
							_tree.getRootNode().reload();
						}
					},
					failure: $ext.failure.ajax
				});
			}
		}
	});

	//new Ext.tree.TreeSorter(_tree, {caseSensitive: true, dir: "desc", folderSort: true, sortType: function(node) {return parseInt(node.id, 10);}});


	// preview
	var _preview = new Ext.Panel({
		region: "south",
		title: "预览",
		collapsible: true,
		//frame: true,
		height: 100, // 自定义
		iconCls: "icon-preview",
		split: true,
		html: ""
	});


	// chart
	var _chart = {
		region: "center",
		xtype: "linechart",
		//extraStyle: {},
/*
		seriesStyles: {
			//color: "",
			image: "js/extjs/3.4.1.1/examples/chart/bar.gif",
			mode: "stretch"
		},
*/
		store: _jsonstore,
		tipRenderer: function(chart, record) {
			return record.get("id") + " : " + record.get("date");
		},
		xAxis: new Ext.chart.TimeAxis({
			//title: "",
			labelRenderer: Ext.util.Format.dateRenderer("Y-m-d H:i:s")
		}),
		xField: "date",
		yAxis: new Ext.chart.NumericAxis({
			//title: "",
			labelRenderer: Ext.util.Format.numberRenderer()
		}),
		yField: "id",
		listeners: {
			itemclick: function(o) {
				var record = _jsonstore.getAt(o.index);
				alert(record.get("id"));
			}
		}
	};


	// dataview
	var _dataview = new Ext.DataView({
		cls: "dataview",
		itemSelector: "li.item",
		multiSelect: true,
		overClass: "x-view-over",
		plugins: [
			new Ext.DataView.DragSelector()
/*
			new Ext.DataView.LabelEditor(
				{
					dataIndex: "name"
				}
			),
*/
/*
			// TODO: bug, Ext.data.JsonStore ?
			new Ext.ux.DataViewTransition({
				//duration: 750,
				idProperty: "id"
			})
*/
		],
		prepareData: function(data) {
			return data;
		},
		//simpleSelect: true,
		//singleSelect: true,
		store: new Ext.data.Store({
			url: "data/dataview.json", // 自定义
			autoDestroy: true,
			autoLoad: true,
			reader: new Ext.data.JsonReader({
				fields: [
					// 自定义
					{name: "id", type: "int"},
					{name: "name", type: "string"},
					{name: "price", type: "float"},
					{name: "status", type: "boolean"}
				],
				root: "rows"
			})
		}),
		tpl: new Ext.XTemplate(
			'<ul>',
				'<tpl for=".">',
				'<li class="item" style="height: 120px; width: 120px;" title="{name}">',
					'<img src="js/extjs/3.4.1.1/examples/view/images/phones/{[values.name.replace(/ /g, "-")]}.png" alt="" style="height: 64px; width: 64px;"/>',
					'<span class="x-editable">{name:ellipsis(15)}</span>',
					'<em>{price:usMoney} {[values.status ? "(Sales)" : ""]}</em>',
				'</li>',
				'</tpl>',
			'</ul>'
		),
		listeners: {
			dblclick: function(cmp, index, node, e) {
				var record = cmp.getRecord(node);
				alert(record.get("id"));
			}
		}
	});


	// pivotgrid
	// <!DOCTYPE ...>
	// TODO: bug, Opera, CSS
	var _pivotgrid = new Ext.grid.PivotGrid({
		aggregator: "sum", // sum|avg|count|max|min
		measure: "value",
/*
		renderer: function(value) {
			return value;
		},
*/
		store: new Ext.data.Store({
			url: "data/pivotgrid.json", // 自定义
			autoDestroy: true,
			autoLoad: true,
			reader: new Ext.data.JsonReader({
				fields: [
					// 自定义
					{name: "category", type: "string"},
					{name: "city", type: "string"},
					{name: "product", type: "string"},
					{name: "value", type: "int"},
					{name: "year", type: "int"}
				],
				root: "rows"
			})
		}),
		viewConfig: {
			title: "标题"
/*
			getCellCls: function(value) {
				return "";
			}
*/
		},
		leftAxis: [
			{
				dataIndex: "category"
				//direction: "DESC", // ASC|DESC
				//width: 100
			},
			{
				dataIndex: "product"
			}
		],
		topAxis: [
			{
				dataIndex: "year"
			},
			{
				dataIndex: "city"
			}
		]
	});

	new Ext.Window({
		border: false,
		height: 320,
		layout: "fit",
		width: 960,
		items: [_pivotgrid]
	}).show();


	// treegrid
	var _treegrid = new Ext.ux.tree.TreeGrid({
		region: "center",
		enableSort: false,
		loader: new Ext.tree.TreeLoader({
			url: "data/treegrid.json", // 自定义
			baseParams: {
				// 自定义
				method: "treegrid"
			}
		}),
		columns: [
			// 自定义
			{
				header: "ID",
				dataIndex: "id",
				width: 100
			},
			{
				header: "Date",
				dataIndex: "date",
				editor: {
					xtype: "textfield"
				},
				width: 100
			}
		],
		tbar: [
			{
				text: "新增",
				xtype: "button",
				iconCls: "icon-add",
				handler: function(button, e) {
					var
					parentId = "",
					sm = _treegrid.getSelectionModel();
					if (!sm.isSelected()) {
						var node = sm.getSelectedNode();
						parentId = node.parentNode.id;
					}
					alert(parentId);
				}
			},
			"->",
			{
				//text: "展开",
				xtype: "button",
				iconCls: "icon-expand",
				handler: function(button, e) {
					_treegrid.expandAll();
				}
			},
			"-",
			{
				//text: "折叠",
				xtype: "button",
				iconCls: "icon-collapse",
				handler: function(button, e) {
					_treegrid.collapseAll();
				}
			}
		]
	});

	_treegrid.getRootNode().id = "src";


	// treetotree
	var _treetotree = function(region) {
		return {
			region: region,
			xtype: "treepanel",
			ddGroup: "TreeToTree",
			enableDD: true,
			root: {
				id: "src",
				expanded: true
			},
			rootVisible: false,
			width: "50%", // 自定义
			loader: new Ext.tree.TreeLoader({
				url: "data/tree.json", // 自定义
				baseParams: {
					// 自定义
					method: "tree"
				}
			})
		};
	};

	
	// sample
	new Ext.Window({
		border: false,
		height: 480,
		layout: "fit",
		width: 640,
		items: [
			{
				xtype: "tabpanel",
				activeTab: 0,
				border: false,
				enableTabScroll: true,
				items: [
					{
						title: "Chart",
						iconCls: "icon-chart",
						layout: "border",
						items: [_chart]
					},
					{
						title: "DataView",
						autoScroll: true,
						items: [_dataview]
					},
					{
						title: "TreeGrid",
						layout: "border",
						items: [_treegrid]
					},
					{
						title: "TreeToTree",
						layout: "border",
						defaults: {
							autoScroll: true
						},
						items: [
							_treetotree("west"),
							_treetotree("center")
						]
					}
				]
			}
		]
	}).show();


	// viewport
	var _viewport = new Ext.Viewport({
		//autoScroll: true,
		layout: "border",
		items: [
			// 自定义
			_tree,
			_preview,
			{
				region: "center",
				border: false,
				layout: "border",
				items: [
					// 自定义
					_search,
					_grid
				]
			}
		]
	});


	// init
	$ext.combo.load(
		"#search-cascade-parent", // 自定义
		function(combo, value) {
			$ext.combo.loadChild(
				combo,
				"#search-cascade-child" // 自定义
			);
		}
	);

});
