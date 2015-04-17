/*___________________________________4what____________________________________*/

/**
 * UtilExt
 *
 * @author http://www.4what.cn/
 * @version 1.1 Build 2014.10.17
 * @requires ExtJS 3.2+
 */
(function() {

Ext.ns("$ext");

var UtilExt = $ext = {
	/**
	 * @requires Ext.Desktop
	 */
	desktop: {
		/**
		 * @param {Object} options
		 * @return {Ext.app.Module}
		 */
		IFrameWindow: function(options) {
			var
			id = options.id, // {String} (*)
			title = options.title, // {String} (*)
			src = options.src, // {String} (*)
			height = options.height || 600, // {Number}
			iconCls = options.iconCls || "icon-grid", // {String}
			width = options.width || 800; // {Number}

			return Ext.extend(Ext.app.Module, {
				id: id,
				init: function() {
					this.launcher = {
						text: title,
						handler: this.createWindow,
						iconCls: iconCls,
						scope: this
					}
				},
				createWindow: function() {
					var
					desktop = this.app.getDesktop(),
					win = desktop.getWindow(id);
					if (!win) {
						win = desktop.createWindow({
							id: id,
							title: title,
							animCollapse: false,
							constrainHeader: true,
							height: height,
							iconCls: iconCls,
							layout: "fit",
							//maximized: true,
							shim: false,
							width: width,
							html: '<iframe src="' + src + '" frameborder="0" scrolling="no" style="height: 100%; width: 100%;"></iframe>'
						});
					}
					win.show();
				}
			});
		}
	},

	combo: {
		/**
		 * @param {String|Ext.Element[]} combo
		 * @param {Function} callback (optional)
		 */
		load: function(combo, callback) {
			Ext.select(combo).each(function(element, composite, index) {
				var
				item = Ext.getCmp(element.id),
				value = item.getValue();
				if (value) {
					function fn() {
						if (typeof callback === "function") {
							callback(item, value);
						}
					}
					if (item.mode === "remote") {
						var store = item.getStore();
						if (store.findExact(item.valueField, value) === -1) {
							store.load({
								params: {
									id: value
								},
								callback: function(records, options, success) {
									item.setValue(value);
									fn();
								}
							});
							delete item.lastQuery;
						}
					} else {
						fn();
					}
				} else {
					item.reset();
				}
			});
		},
		/**
		 * @param {Ext.form.ComboBox} parent
		 * @param {String|Ext.Element[]} child
		 */
		loadChild: function(parent, child) {
			var value = parent.getValue();
			if (value) {
				var name = parent.getName();
				Ext.select(child).each(function(element, composite, index) {
					var item = Ext.getCmp(element.id);
					item.enable();
					item.reset();
					if (item.mode === "remote") {
						var store = item.getStore();
						store.setBaseParam(name, value);
						if (item.lastQuery !== undefined) {
							store.load();
						}
					}
				});
			}
		}
	},

	failure: {
		/**
		 * @param {Object} response
		 * @param {Object} options
		 */
		ajax: function(response, options) {
			Ext.Msg.alert("错误", "" + response.status + " " + response.statusText).setIcon(Ext.Msg.ERROR);
		},
		/**
		 * @param {Ext.form.BasicForm} form
		 * @param {Ext.form.Action} action
		 * @param {String} msg (optional)
		 * @param {Function} fn (optional)
		 */
		form: function(form, action, msg, fn) {
			switch (action.failureType) {
				case Ext.form.Action.SERVER_INVALID:
					//msg = action.result.msg;
					break;
				case Ext.form.Action.LOAD_FAILURE:
					//msg = action.result.msg;
					break;
				case Ext.form.Action.CONNECT_FAILURE:
					msg = action.response.status + " " + action.response.statusText;
					break;
				default:
					msg = action.failureType;
					break;
			}
			Ext.Msg.alert("错误", msg, fn).setIcon(Ext.Msg.ERROR);
		}
	},

	/**
	 * @requires Ext.ux.ManagedIFrame
	 * @param {String} title
	 * @param {String} src
	 * @return {Ext.ux.ManagedIFrame}
	 */
	iframepanel: function(title, src) {
		return {
			title: title,
			xtype: "iframepanel",
			defaultSrc: src,
			closable: true,
			frame: true,
			//frameConfig: {id: ""},
			loadMask: {
				msg: "请稍候……"
			}
		};
	},

	/**
	 * @requires Ext.ux.ManagedIFrame
	 * @param {Object} options
	 * @return {Ext.Window}
	 */
	iframewindow: function(options) {
		var
		title = options.title, // {String} (*)
		src = options.src, // {String} (*)
		height = options.height || 600, // {Number}
		iconCls = options.iconCls, // {String}
		width = options.width || 800; // {Number}

		return new Ext.ux.ManagedIFrame.Window({
			title: title,
			border: false,
			defaultSrc: src,
			constrainHeader: true,
			height: height,
			iconCls: iconCls,
			layout: "fit",
			maximizable: true,
			modal: true,
			plain: true,
			width: width,
			loadMask: {
				msg: "请稍候……"
			}
		});
	},

	msg: {
		/**
		 * @param {Object} options (optional)
		 */
		alert: function(options) {
			var
			defaults = {
				minWidth: 180, // {Number}
				timeout: false // {Boolean|Function|Number}
			},
			settings = Ext.apply(defaults, options);

			Ext.apply(Ext.Msg, {
				alert: function(title, msg, fn, scope) {
					this.show({
						title: title,
						msg: msg,
						buttons: this.OK,
						fn: fn,
						scope: scope,
						minWidth:
							//this.minWidth
							settings.minWidth
					});

					var that = this;

					// icon
					that.setIcon(Ext.Msg.INFO);

					// timeout
					if (typeof settings.timeout === "function") {
						settings.timeout = settings.timeout(that, title, msg);
					}
					if (settings.timeout) {
						window.setTimeout(function() {
							if (that.isVisible()) {
								that.hide();
								if (fn) {
									fn();
								}
							}
						}, settings.timeout === true ? 1000 * 2 : settings.timeout);
					}

					return this;
				}
			});
		}
	},

	/**
	 * @param {Ext.form.DateField} datefield
	 * @param {Function} callback (optional)
	 */
	monthpicker: function(datefield, callback) {
		Ext.each([datefield.getEl(), datefield.trigger], function(item, index, allItems) {
			datefield.mun(item, "click", datefield.onTriggerClick, datefield);
			datefield.mon(item, "click", function(e, target, options) {
				datefield.onTriggerClick();
				var
				datemenu = datefield.menu,
				datepicker = datemenu.picker;
				datepicker.showMonthPicker();
				if (datefield._monthpicker) {
					return;
				}
				datepicker.mun(datepicker.monthPicker, "dblclick", datepicker.onMonthDblClick, datepicker);
				datepicker.getEl().select("button.x-date-mp-cancel").remove();
				datepicker.getEl().select("button.x-date-mp-ok").on("click", function(e, target, options) {
					datemenu.hide();
					var value = datefield.getValue();
					datefield.setValue((datepicker.mpSelMonth + 1) + "/1/" + datepicker.mpSelYear);
					if (String(datefield.getValue()) !== String(value) && typeof callback === "function") {
						callback();
					}
				});
				datefield._monthpicker = true;
			}, datefield);
		});
	},

	multiselect: {
		/**
		 * @param {String} id
		 * @param {Ext.data.Record|Object} data
		 */
		add: function(id, data) {
			var
			exist = false,
			multiselect = Ext.getCmp(id),
			name = multiselect.valueField,
			record,
			store = multiselect.store;
			if (data instanceof Ext.data.Record) {
				record = data;
				if (store.indexOf(record) > -1 || store.findExact(name, record.get(name)) > -1) {
					exist = true;
				}
			} else {
				if (store.findExact(name, data) > -1) {
					exist = true;
				} else {
					var o = {};
					o[name] = data;
					record = new Ext.data.Record(o);
				}
			}
			if (!exist) {
				store.add(record);
			}
		},
		/**
		 * @param {String|Ext.Element[]} multiselect
		 */
		clear: function(multiselect) {
			Ext.select(multiselect).each(function(element, composite, index) {
				Ext.getCmp(element.id).store.removeAll();
			});
		},
		/**
		 * @param {String} id
		 */
		del: function(id) {
			var
			multiselect = Ext.getCmp(id),
			store = multiselect.store,
			value = multiselect.getValue();
			if (value) {
				value = value.split(",");
				for (var i = value.length - 1; i >= 0; i--) {
					store.removeAt(store.find(multiselect.valueField, new RegExp("^" + value[i] + "$")));
				}
			}
		},
		/**
		 * @param {String|Ext.Element[]} multiselect
		 * @param {Number|Object|String} data
		 */
		load: function(multiselect, data) {
			Ext.select(multiselect).each(function(element, composite, index) {
				var store = Ext.getCmp(element.id).store;
				if (store.proxy !== undefined) {
					store.load({
						params: /number|string/.test(typeof data) ? {
							id: data
						} : data
					});
				}
			});
		},
		/**
		 * @param {String|Ext.Element[]} multiselect
		 */
		selectAll: function(multiselect) {
			Ext.select(multiselect).each(function(element, composite, index) {
				var
				data = [],
				item = Ext.getCmp(element.id),
				store = item.store,
				total = store.getCount();
				for (var i = total - 1; i >= 0; i--) {
					data.push(store.getAt(i).get(item.valueField));
				}
				item.setValue(data.join());
			});
		}
	},

	store: {
		/**
		 * @param {Ext.data.Store} store
		 * @param {String|Ext.Element[]} field
		 */
		setBaseParam: function(store, field) {
			Ext.select(field).each(function(element, composite, index) {
				var item = Ext.getCmp(element.id);
				store.setBaseParam(item.getName(), item.getValue());
			});
		}
	},

	tab: {
		/**
		 * @requires $ext.iframepanel
		 * @param {Ext.TabPanel|String} tabpanel
		 * @param {Object} options
		 * @param {Object} scope (optional)
		 */
		load: function(tabpanel, options, scope) {
			var
			title = options.title, // {String} (*)
			src = options.src, // {String} (*)
			iconCls = options.iconCls, // {String} iconCls

			tabpanel = !scope ? tabpanel : scope.Ext.getCmp(tabpanel),
			target = tabpanel.find("title", title)[0];

			if (target === undefined) {
				target = tabpanel.add(UtilExt.iframepanel(title, src));
				if (iconCls) {
					target.setIconClass(iconCls);
				}
			} else {
				target.getFrameWindow().location.href = src;
			}
			tabpanel.setActiveTab(target);
		},
		/**
		 * @requires $ext.tab.load
		 * @param {Ext.data.Node} node
		 * @param {Ext.EventObject} e
		 * @param {Ext.TabPanel} tabpanel
		 * @param {Object} options (optional)
		 */
		loadOnClickLeaf: function(node, e, tabpanel, options) {
			var
			title = options.title || node.attributes.text, // {String}
			iconCls = node.attributes.iconCls || options.iconCls; // {String}

			if (node.isLeaf()) {
				e.stopEvent();
				this.load(tabpanel, {
					title: title,
					src: node.attributes.href,
					iconCls: iconCls
				});
			}
		},
		/**
		 * !Safari
		 * @requires Ext.ux.ManagedIFrame
		 * @param {String} id
		 */
		reload: function(id) {
			Ext.get(document).addKeyMap({
				key: Ext.EventObject.F5,
				ctrl: false,
				fn: function(key, e) {
					e.preventDefault();
					var tabpanel = window.top.Ext.getCmp(id);
					if (tabpanel) {
						var tab = tabpanel.getActiveTab();
						if (tab.isXType("iframepanel")) {
							tab.getFrameWindow().location.reload();
						}
					} else {
						window.top.location.reload();
					}
				}
			});
		}
	},

	textfield: {
		/**
		 * @param {Ext.form.FormPanel} form (optional)
		 * @param {String} name (optional)
		 * @return {Ext.form.CompositeField[]}
		 */
		fields: function(form, name) {
			var items = this._fields || (this._fields = {});
			if (form) {
				var id = form.getId();
				items = items[id] || (items[id] = {});
				if (name) {
					items = items[name] || (items[name] = []);
				}
			}
			return items;
		},
		/**
		 * @param {Ext.form.FormPanel} form
		 * @param {Number} id
		 * @param {String} name
		 * @param {Object} options (optional)
		 */
		insert: function(form, id, name, options) {
			var
			that = this,
			fields = that.fields(form, name),
			item = form.insert(form.items.indexOfKey(id) + fields.length + 1, {
				xtype: "compositefield",
				autoWidth: true,
				items: [
					Ext.apply({
						xtype: "textfield",
						name: name
					}, options),
					{
						//text: "删除",
						xtype: "button",
						iconCls: "icon-del",
						handler: function(button, e) {
							that.remove(form, item);
							fields.remove(item.getId());
						}
					}
				]
			});
			fields.push(item.getId());
			form.doLayout();
		},
		/**
		 * @param {Ext.form.FormPanel} form
		 * @param {Ext.form.CompositeField} field
		 */
		remove: function(form, field) {
			field.items.each(function(item, index, length) {
				form.getForm().remove(item);
			});
			form.remove(field);
		},
		/**
		 * @param {Ext.form.FormPanel} form
		 */
		removeAll: function(form) {
			var
			that = this,
			fields = that.fields(form);
			Ext.iterate(fields, function(key, value, o) {
				Ext.each(value, function(item, index, allItems) {
					that.remove(form, Ext.getCmp(item));
				});
				o[key] = [];
			});
		}
	},

	tree: {
		/**
		 * @param {Ext.tree.TreePanel|Ext.Panel} treepanel
		 * @param {Boolean} bln
		 */
		toggle: function(treepanel, bln) {
			function handler(target) {
				bln ? target.expandAll() : target.collapseAll();
			}
			if (treepanel.getXType() === "treepanel") {
				handler(treepanel);
			} else {
				Ext.each(treepanel.findByType("treepanel"), function(item, index, allItems) {
					if (!item.collapsed) {
						handler(item);
					}
				});
			}
		}
	},

	vtypes: {
		/**
		 * @return {Object}
		 */
		daterange: function() {
			/**
			 * @param {Ext.form.DateField} startdate
			 * @param {Ext.form.DateField} enddate
			 */
			this.daterange.reset = function(startdate, enddate) {
				startdate.setMaxValue(startdate.initialConfig.maxValue);
				enddate.setMinValue(enddate.initialConfig.minValue);
			};

			return {
				daterange: function(value, field) {
					var date = field.parseDate(value);
					if (!date) {
						return false;
					}
					if (field.startDateField && (!this.dateRangeMax || (date.getTime() !== this.dateRangeMax.getTime()))) {
						var start = Ext.getCmp(field.startDateField);
						start.setMaxValue(date);
						start.validate();
						this.dateRangeMax = date;
					} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() !== this.dateRangeMin.getTime()))) {
						var end = Ext.getCmp(field.endDateField);
						end.setMinValue(date);
						end.validate();
						this.dateRangeMin = date;
					}
					return true;
				}
			};
		},
		/**
		 * @param {String} text (optional)
		 * @param {RegExp} mask (optional)
		 * @return {Object}
		 */
		html: function(text, mask) {
			return {
				html: function(value, field) {
					return !/<\/?[^>]+>/gi.test(value);
				},
				htmlText: text || "",
				htmlMask: mask
			};
		},
		/**
		 * @param {String} text (optional)
		 * @param {RegExp} mask (optional)
		 * @return {Object}
		 */
		password2: function(text, mask) {
			return {
				password2: function(value, field) {
					if (field.PasswordField) {
						return (value === Ext.getCmp(field.PasswordField).getValue());
					}
				},
				password2Text: text || "",
				password2Mask: mask
			};
		},
		/**
		 * @return {Object}
		 */
		timerange: function() {
			/**
			 * @param {Ext.form.TimeField} starttime
			 * @param {Ext.form.TimeField} endtime
			 */
			this.timerange.reset = function(starttime, endtime) {
				starttime.setMaxValue(starttime.initialConfig.maxValue || "23:59");
				endtime.setMinValue(endtime.initialConfig.minValue || "00:00");
			};

			return {
				timerange: function(value, field) {
					if (!value) {
						return false;
					}
					if (field.startTimeField && (!this.timeRangeMax || (value !== this.timeRangeMax))) {
						var start = Ext.getCmp(field.startTimeField);
						start.setMaxValue(value);
						start.validate();
						this.timeRangeMax = value;
					} else if (field.endTimeField && (!this.timeRangeMin || (value !== this.timeRangeMin))) {
						var end = Ext.getCmp(field.endTimeField);
						end.setMinValue(value);
						end.validate();
						this.timeRangeMin = value;
					}
					return true;
				}
			};
		}
	}
};

})();
