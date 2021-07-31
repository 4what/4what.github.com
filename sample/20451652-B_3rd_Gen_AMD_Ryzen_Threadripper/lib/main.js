!function(){function t(e,n,o){function i(r,c){if(!n[r]){if(!e[r]){var a="function"==typeof require&&require;if(!c&&a)return a(r,!0);if(s)return s(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var h=n[r]={exports:{}};e[r][0].call(h.exports,function(t){var n=e[r][1][t];return i(n||t)},h,h.exports,t,e,n,o)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}return t}()({1:[function(t,e,n){"use strict";var o=function(){function t(){}return t.find=function(t){for(var e,n=0;t&&n<32&&void 0===(e=t.API)&&(t.parent&&t.parent!==t);n++)t=t.parent;return e},t.frames=function(e){var n;if(e&&e.frames)for(var o=0;o<e.frames.length&&!(n=t.find(e.frames[o]));o++);return n},t.get=function(){return t.find(window)||t.frames(window)||t.find(window.opener)||t.frames(window.opener)||t.find(window.top)||t.frames(window.top)},t}();n.Api=o},{}],2:[function(t,e,n){"use strict";var o=function(){function t(){this.buffer=[]}return t.prototype.append=function(t){return this.buffer.push(t),this},t.prototype.toString=function(){return this.buffer.join("")},t}(),i=function(){function t(t){this.input=t,this.index=-1,this.buffer=[],this.current=Number.NaN}return t.prototype.moveNext=function(){if(this.buffer.length>0)return this.current=this.buffer.shift(),!0;if(this.index>=this.input.length-1)return this.current=Number.NaN,!1;var t=this.input.charCodeAt(++this.index);return 13===t&&10===this.input.charCodeAt(this.index+1)&&(t=10,this.index+=2),t<128?this.current=t:t>127&&t<2048?(this.current=t>>6|192,this.buffer.push(63&t|128)):(this.current=t>>12|224,this.buffer.push(t>>6&63|128),this.buffer.push(63&t|128)),!0},t}(),s=function(){function t(t){this.input=t,this.index=-1,this.buffer=[],this.current=64}return t.prototype.moveNext=function(){if(this.buffer.length>0)return this.current=this.buffer.shift(),!0;if(this.index>=this.input.length-1)return this.current=64,!1;var t=r.codex.indexOf(this.input.charAt(++this.index)),e=r.codex.indexOf(this.input.charAt(++this.index)),n=r.codex.indexOf(this.input.charAt(++this.index)),o=r.codex.indexOf(this.input.charAt(++this.index)),i=t<<2|e>>4,s=(15&e)<<4|n>>2,c=(3&n)<<6|o;return this.current=i,64!==n&&this.buffer.push(s),64!==o&&this.buffer.push(c),!0},t}(),r=function(){function t(){}return t.encode=function(t){for(var e=new o,n=new i(t);n.moveNext();){var s=n.current;n.moveNext();var r=n.current;n.moveNext();var c=n.current,a=s>>2,d=(3&s)<<4|r>>4,h=(15&r)<<2|c>>6,p=63&c;isNaN(r)?h=p=64:isNaN(c)&&(p=64),e.append(this.codex.charAt(a)+this.codex.charAt(d)+this.codex.charAt(h)+this.codex.charAt(p))}return e.toString()},t.decode=function(t){for(var e=new o,n=new s(t);n.moveNext();){var i=n.current;if(i<128)e.append(String.fromCharCode(i));else if(i>191&&i<224){n.moveNext();var r=n.current;e.append(String.fromCharCode((31&i)<<6|63&r))}else{n.moveNext();var r=n.current;n.moveNext();var c=n.current;e.append(String.fromCharCode((15&i)<<12|(63&r)<<6|63&c))}}return e.toString()},t.codex="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t}();n.Base64=r},{}],3:[function(t,e,n){"use strict";var o=function(){function t(){}return t.user_info={token:"",first_name:"",last_name:"",sessionid:"",store_number:"",user_id:"",job_code:0},t.jobcode_lookup="",t.polyfills_path="./lib/",t.components_path="./lib/",t.theme_path="./lib/",t.course_path="./course/",t.templates_path="./lib/",t.template="default",t.content="content1",t.selector=".container",t.session_refresh_interval=15,t.dispatch_url="",t.dev_environment=!0,t.IGNORE_MODE=!0,t.IGNORE_ERROR=!0,t.IGNORE_STATUS=!0,t.DEFAULT_MASTERY=80,t.FINISH_ON_SETSCORE=!0,t.INCOMPLETE_ON_FAIL=!1,t}();n.Config=o},{}],4:[function(t,e,n){"use strict";var o=t("./Embeds"),i=t("./Config"),s=t("./Base64"),r=t("./Utils"),c=function(){function t(t){var e=this;this.debug=!1,this.meta=null,this.pages=null,this.components=[],this.polyfills=[],this.styles=[],this.scripts=[],this.used_ids=[],this.course_path="",this.course_full_path="",this.components_path="",this.polyfills_path="",this.type_path="",this.type_full_path="";var n=o.Embeds.getInstance();this.course_path=i.Config.course_path,this.course_full_path=this.course_path,this.type_path=i.Config.course_path,this.type_full_path=this.type_path;var s=!1,c=null;return t.match(/^[a-z]\w+$/i)&&$.ajax({url:this.course_path+t+".xml",cache:!1,async:!1,dataType:"xml",success:function(t){s=!0,c=$(t)}}),s?(n.add("content_name",t+".xml"),n.add("content_number","1"),this.debug=r.Utils.is_true(c.attr("debug")),n.add("dev_environment",this.debug.toString()),this.transitions=r.Utils.is_true(c.attr("transitions")),this.meta=c.find("meta"),this.pages=c.find("pages"),this.theme=c.attr("theme"),i.Config.template=c.attr("template")||i.Config.template,c.find("components").eq(0).find("component").each(function(t,n){var o=$(n),s=o.attr("name"),r=o.attr("version");e.components_path=i.Config.components_path+r+"/"+s+"/",e.components.push({name:s,version:r,path:e.components_path})}),c.find("polyfills").eq(0).find("polyfill").each(function(t,n){var o=$(n),s=o.attr("name");e.polyfills_path=i.Config.polyfills_path+s+"/",e.polyfills.push({name:s,path:e.polyfills_path})}),c.find("assets:first > style").each(function(t,n){var o=$(n),i=o.attr("src")||"";i.length?0!==i.indexOf("http:")&&0!==i.indexOf("https:")&&(r.Utils.file_exists(e.course_path+i)?e.styles.push(e.course_path+i):console.error("assets > style > "+i+" not found.")):console.error("assets > style > empty src property.")}),void c.find("assets:first > script").each(function(t,n){var o=$(n),i=o.attr("src")||"";i.length?0!==i.indexOf("http:")&&0!==i.indexOf("https:")&&(r.Utils.file_exists(e.course_path+i)?e.scripts.push(e.course_path+i):console.error("assets > script > "+i+" not found.")):console.error("assets > script > empty src property.")})):(document.write("<h1>Not Found</h1>"),void document.write("<p>The specified content file could not be found for this course: <pre>"+this.course_full_path+t+".xml</pre></p>"))}return t.prototype.script_tags=function(){var t,e="";for(t=0;t<this.scripts.length;t++)e+='<script src="'+this.scripts[t]+'" type="text/javascript"></script>';return e},t.prototype.stylesheet_tags=function(){var t,e="";for(t=0;t<this.styles.length;t++)e+='<link rel="stylesheet" type="text/css" href="'+this.styles[t]+'" />';return e},t.prototype.check_components=function(t,e){var n,i,r,c=this;t.children().each(function(t,a){if(n=$(a),"component"===a.nodeName){if(i=n.attr("id"),""===i||void 0===i){do i="_component_"+Math.random().toString().substr(2);while($.inArray(i,c.used_ids)!==-1);c.used_ids.push(i),n.attr("id",i)}n.attr("component_parent_id",e||""),c.check_components(n,i),r=$("<div />").append(n.children()).html(),n.empty().text(s.Base64.encode(o.Embeds.getInstance().populate(r)))}else c.check_components(n,e)})},t.prototype.content=function(){var t,e,n,o,i,s,r,c=this,a="";return $("page",this.pages).each(function(d,h){i=$(h),t=i.attr("id")||"",e=i.attr("title")||"",r=parseInt(i.attr("weight")),n=$.trim((i.attr("nav")||"").toLowerCase()),r=isNaN(r)?1:Math.max(0,r),o=["page"],o.push(t),"hidden"===n&&o.push("navhidden"),"skip"===n&&o.push("navskip"),0===d&&o.push("first"),d+1===c.pages.length&&o.push("last"),c.check_components(i),s=$("<div />").append(i.children()).html().replace(/<br><\/br>/gi,"<br>"),a+='<div id="'+t+'" class="'+o.join(" ")+'" data-weight="'+r+'" data-title="'+e+'">'+s+"</div>"}),a},t.prototype.script_data=function(){var t,e,n,i=o.Embeds.getInstance();for(t="(function(context){",e=0;e<this.components.length;e++)t+="context["+JSON.stringify(this.components[e].name+":"+this.components[e].version)+']={"path":'+JSON.stringify(this.components[e].path)+"};";for(t+="})(Monsoon.Components=Monsoon.Components||{});",t+="(function(context){",e=0;e<this.polyfills.length;e++)t+="context["+JSON.stringify(this.polyfills[e].name)+']={"path":'+JSON.stringify(this.polyfills[e].path)+"};";return t+="})(Monsoon.Polyfills=Monsoon.Polyfills||{});",n="(function(context){",n+='context["session_refresh_interval"]='+JSON.stringify(i.get("session_refresh_interval"))+";",n+='context["session"]='+JSON.stringify(i.get("session"))+";",n+='context["dev_environment"]='+JSON.stringify(i.get("dev_environment"))+";",n+='context["remote_addr"]='+JSON.stringify("0.0.0.0")+";",n+='context["language"]='+JSON.stringify(i.get("language"))+";",n+='context["language_code"]='+JSON.stringify(i.get("language_code"))+";",n+='context["user_hash"]='+JSON.stringify(i.get("user_hash"))+";",n+='context["first_name"]='+JSON.stringify(i.get("first_name"))+";",n+='context["last_name"]='+JSON.stringify(i.get("last_name"))+";",n+='context["department_id"]='+JSON.stringify(i.get("department_id"))+";",n+='context["store_number"]='+JSON.stringify(i.get("store_number"))+";",n+='context["job_code"]='+JSON.stringify(i.get("job_code"))+";",n+='context["template_folder"]='+JSON.stringify(i.get("template_path"))+";",n+='context["course_folder"]='+JSON.stringify(i.get("course_folder"))+";",n+='context["assets_folder"]='+JSON.stringify(i.get("assets_folder"))+";",n+='context["course_type"]='+JSON.stringify(i.get("course_type"))+";",n+='context["course_year"]='+JSON.stringify(i.get("course_year"))+";",n+='context["course_ap"]='+JSON.stringify(i.get("course_ap"))+";",n+='context["course_id"]='+JSON.stringify(i.get("course_id"))+";",n+='context["course_title"]='+JSON.stringify(i.get("course_title"))+";",n+='context["course_code"]='+JSON.stringify(i.get("course_code"))+";",n+='context["net_id"]='+JSON.stringify(i.get("net_id"))+";",n+='context["user_id"]='+JSON.stringify(i.get("user_id"))+";",n+='context["dispatch_url"]='+JSON.stringify(i.get("dispatch_url"))+";",n+='context["content_name"]='+JSON.stringify(i.get("content_name"))+";",n+='context["content_number"]='+JSON.stringify(i.get("content_number"))+";",n+="})(Monsoon.Course=Monsoon.Course||{});",'<script type="text/javascript">'+t+"$(document).ready(function(){window.parent.Main.docready(Monsoon);Monsoon.init('"+s.Base64.encode(n)+"')});</script>"},t.prototype.flags=function(){var t="";return this.debug&&(t+=" debug"),this.transitions&&(t+=" transitions"),$.trim(t)},t.prototype.title=function(){return $(this.meta).find("title").text()},t.prototype.description=function(){return $(this.meta).find("description").text()},t.prototype.language=function(){return $(this.meta).find("language").attr("name")||$(this.meta).find("language").text()},t.prototype.language_code=function(){return $(this.meta).find("language").attr("code")},t.prototype.author=function(){return $(this.meta).find("author").text()},t.prototype.vendor=function(){return $(this.meta).find("vendor").text()},t.prototype.content_version=function(){return $(this.meta).find("version").text()},t.prototype.keywords=function(){return $(this.meta).find("keywords").text()},t}();n.Content=c},{"./Base64":2,"./Config":3,"./Embeds":5,"./Utils":9}],5:[function(t,e,n){"use strict";var o=function(){function t(){if(this.embeds={},t._instance)throw new Error("Error: Instantiation failed: Use Embeds.getInstance() instead of new.");t._instance=this}return t.getInstance=function(){return t._instance},t.prototype.add=function(t,e){this.embeds[t]=e},t.prototype.get=function(t){return this.embeds[t]},t.prototype.populate=function(t){var e,n,o=(t||"").split(/(\{\%\s?[a-z0-9-_]+\s?\%\})/gi);for(e=0;e<o.length;e++)n=o[e].match(/^\{\%\s?([a-z0-9-_]+)\s?\%\}$/i),n&&(o[e]=this.embeds[n[1]]||"");return o.join("")},t._instance=new t,t}();n.Embeds=o},{}],6:[function(t,e,n){"use strict";var o=t("./Api"),i=t("./Sco"),s=t("./Content"),r=t("./Template"),c=t("./Config"),a=t("./Embeds"),d=function(){function t(){if(t._instance)throw new Error("singleton.");t._instance=this}return t.prototype.getTotalTime=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return this.sco.get("cmi.core.total_time")||""},t.prototype.getStudentId=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return this.sco.get("cmi.core.student_id")||""},t.prototype.getStudentName=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return this.sco.get("cmi.core.student_name")||""},t.prototype.setLocation=function(t){this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR)&&(this.sco.set("cmi.core.lesson_location",t),this.sco.commit())},t.prototype.getLocation=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return this.sco.get("cmi.core.lesson_location")},t.prototype.setSuspendData=function(t){this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR)&&this.sco.set("cmi.suspend_data",t)},t.prototype.getSuspendData=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return this.sco.get("cmi.suspend_data")},t.prototype.setScore=function(t){this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR)&&(this.sco.set("cmi.core.score.raw",t.toString()),this.sco.commit())},t.prototype.getScore=function(){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR))return parseFloat(this.sco.get("cmi.core.score.raw"))||0},t.prototype.setCompleted=function(t){if(this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR)){void 0!=t&&this.setScore(t);var e=this.sco.get("cmi.core.lesson_mode");if(c.Config.IGNORE_MODE||"browse"!=e&&"review"!=e){var n=this.sco.get("cmi.core.lesson_status");if(c.Config.INCOMPLETE_ON_FAIL||c.Config.IGNORE_STATUS||"passed"!=n&&"failed"!=n&&"complete"!=n)if("credit"==this.sco.get("cmi.core.credit")){var o=parseFloat(this.sco.get("cmi.core.score.raw"))||0,i=parseFloat(this.sco.get("cmi.student_data.mastery_score"));isNaN(i)&&(i=c.Config.DEFAULT_MASTERY),this.sco.set("cmi.core.lesson_status",o>=i?"passed":c.Config.INCOMPLETE_ON_FAIL?"incomplete":"failed")}else this.sco.set("cmi.core.lesson_status","completed")}}},t.prototype.doExit=function(){this.sco&&(this.sco.ready()||c.Config.IGNORE_ERROR)&&("incomplete"==this.sco.get("cmi.core.lesson_status")?this.sco.exit("suspend"):this.sco.exit(""))},t.getInstance=function(){return t._instance},t.prototype.init=function(){var t=this;this.api=o.Api.get(),window.parent.API=this.api,this.sco=new i.Sco(this.api);var e=window.location.search.split("?").pop().split("&");this.vars={},e.forEach(function(e){var n=e.split("=");n[0].length&&(t.vars[decodeURIComponent(n[0])]=decodeURIComponent(n[1]||""))});var n=new s.Content(this.vars.content||c.Config.content),d=new r.Template(c.Config.templates_path),h=a.Embeds.getInstance();h.add("course_path",c.Config.course_path),h.add("session_refresh_interval",c.Config.session_refresh_interval.toString()),h.add("dev_environment",c.Config.dev_environment.toString()),h.add("dispatch_url",c.Config.dispatch_url),h.add("script_tags",n.script_tags()),h.add("stylesheet_tags",n.stylesheet_tags()),h.add("language",n.language()),h.add("language_code",n.language_code()||""),h.add("title",n.title()),h.add("description",n.description()),h.add("author",n.author()),h.add("vendor",n.vendor()),h.add("content_version",n.content_version()),h.add("keywords",n.keywords()),h.add("flags",n.flags()),h.add("job_code","0"),h.add("first_name",this.getStudentName()||"Demo"),h.add("last_name",""),h.add("department_id","0"),h.add("store_number","0"),h.add("net_id",this.getStudentId()||"0"),h.add("user_id",this.getStudentId()||"0"),h.add("session",""),h.add("user_hash",""),h.add("assets_folder",n.course_path+"assets/"),h.add("course_folder",n.course_path),h.add("course_title",n.title()),h.add("course_type","SCO"),h.add("course_year",""),h.add("course_ap",""),h.add("course_id",""),h.add("course_code","SCO"),h.add("prerequisite_list",""),h.add("content",h.populate(n.content())),h.add("script_data",h.populate(n.script_data()));var p=$('iframe[name="content_frame"]').get(0),u=p.contentWindow,f=u.document;return $(u).bind("error",function(t){window.console&&console.error&&console.error("window -> error thrown: "+t.type)}),f.open("text/html","replace"),f.write(h.populate(d.text)),f.close(),u.focus(),!0},t.docready=function(e){e.refresh=function(){(t.getInstance().sco&&t.getInstance().sco.ready()||c.Config.IGNORE_ERROR)&&t.getInstance().sco.commit()},e.setScore=function(n,o,i){window.console&&console.log&&console.log("Monsoon -> setScore:",n),t.getInstance().setCompleted(n),c.Config.FINISH_ON_SETSCORE&&(e.Nav.off(),setTimeout(function(){t.getInstance().doExit()}))}},t._instance=new t,t}();window.Main=d,$(window).bind("unload, beforeunload",function(t){d.getInstance().doExit()}),$(document).ready(function(){d.getInstance().init()})},{"./Api":1,"./Config":3,"./Content":4,"./Embeds":5,"./Sco":7,"./Template":8}],7:[function(t,e,n){"use strict";function o(t){var e=Math.floor(t/10)%100,n=Math.floor(t/1e3)%60,o=Math.floor(t/6e4)%60,i=Math.floor(t/36e5)%24;return("000"+i).replace(/^.*([0-9]{4})$/,"$1")+":"+(o<10?"0"+o:o)+":"+(n<10?"0"+n:n)+"."+(e<10?"0"+e:e)}var i=t("./Config"),s=function(){function t(t,e){this.show_debug_messages=!1,this.started=!1,this.finished=!1,this.show_debug_messages=(e||!1)&&void 0!=window&&void 0!=window.console,i.Config.dev_environment&&console.log("Wrapper::Sco"),this.api=t;var n;if(this.api?n=this.api.LMSInitialize(""):i.Config.dev_environment&&console.error("Wrapper::Sco // Error: Scorm API not located."),"true"==n||i.Config.IGNORE_ERROR){this.started=!0,this.startTime=new Date;var o=this.get("cmi.core.lesson_mode");"normal"!=o&&""!=o||"not attempted"!=this.get("cmi.core.lesson_status")||(this.set("cmi.core.lesson_status","incomplete"),i.Config.dev_environment&&console.log("Wrapper::Sco // set incomplete"),this.api&&this.api.LMSCommit(""),this.checkError("LMSCommit"),i.Config.dev_environment&&console.log("Wrapper::Sco // LMSCommit")),"resume"==this.get("cmi.core.entry")&&(this.lessonLocation=this.get("cmi.core.lesson_location"),this.suspendData=this.get("cmi.suspend_data")),this.lessonStatus=this.get("cmi.core.lesson_status")}else this.checkError("LMSInitialize")}return t.prototype.set=function(t,e){i.Config.dev_environment&&console.log("Wrapper::Sco::set // "+t+":"+e),this.started&&!this.finished||i.Config.IGNORE_ERROR?this.api?this.api.LMSSetValue(t,e):i.Config.dev_environment&&console.error("Wrapper::Sco::set // Error: Scorm API not located."):i.Config.dev_environment&&console.error("Wrapper::Sco::set // Error -> Started:"+(this.started?"Yes":"No")+" Finished:"+(this.finished?"Yes":"No"))},t.prototype.get=function(t){var e=null;return i.Config.dev_environment&&console.log("Wrapper::Sco::get // "+t),this.started&&!this.finished||i.Config.IGNORE_ERROR?this.api?(e=this.api.LMSGetValue(t),!this.checkError("LMSGetValue")&&i.Config.dev_environment&&console.log("Wrapper::Sco::get // returned:"+e)):i.Config.dev_environment&&console.error("Wrapper::Sco::get // Error: Scorm API not located."):i.Config.dev_environment&&console.error("Wrapper::Sco::get // Error -> Started:"+(this.started?"Yes":"No")+" Finished:"+(this.finished?"Yes":"No")),e},t.prototype.commit=function(){i.Config.dev_environment&&console.log("Wrapper::Sco::commit"),this.started&&!this.finished||i.Config.IGNORE_ERROR?this.api?(this.api.LMSCommit(""),this.checkError("LMSCommit")):i.Config.dev_environment&&console.error("Wrapper::Sco::commit // Error: Scorm API not located."):i.Config.dev_environment&&console.error("Wrapper::Sco::commit // Error -> Started:"+(this.started?"Yes":"No")+" Finished:"+(this.finished?"Yes":"No"))},t.prototype.ready=function(){return this.started&&!this.finished||i.Config.IGNORE_ERROR},t.prototype.checkError=function(t){return this.api?(this.lastError=i.Config.IGNORE_ERROR?"0":this.api.LMSGetLastError(),"0"!=this.lastError&&(i.Config.dev_environment&&t&&console.error("Wrapper::Sco::checkError // "+t+" -> returned:"+this.lastError),!0)):"0"!=(this.lastError=i.Config.IGNORE_ERROR?"0":"")},t.prototype.exit=function(t){i.Config.dev_environment&&console.log("Wrapper::Sco::exit // exitType:"+t),this.started&&!this.finished||i.Config.IGNORE_ERROR?(this.endTime=new Date,!this.api&&i.Config.IGNORE_ERROR?this.finished=!0:this.api?(this.set("cmi.core.session_time",o(this.endTime.valueOf()-this.startTime.valueOf())),this.set("cmi.core.exit",t),i.Config.dev_environment&&console.log("Wrapper::Sco::exit // LMSCommit"),this.api.LMSCommit(""),this.checkError("LMSCommit")&&!i.Config.IGNORE_ERROR||(i.Config.dev_environment&&console.log("Wrapper::Sco::exit // LMSFinish"),this.api.LMSFinish(""),this.checkError("LMSFinish")&&!i.Config.IGNORE_ERROR||(this.finished=!0))):i.Config.dev_environment&&console.error("Wrapper::Sco::exit // Error: Scorm API not located.")):i.Config.dev_environment&&console.log("Wrapper::Sco::exit // Error -> Started:"+(this.started?"Yes":"No")+", Finished:"+(this.finished?"Yes":"No"))},t}();n.Sco=s},{"./Config":3}],8:[function(t,e,n){"use strict";var o=t("./Embeds"),i=function(){function t(t){var e=this;this.exists=!1,this.template_path="",$.ajax({url:t+"template.html",cache:!1,async:!1,success:function(t){e.exists=!0,e.text=t}}),o.Embeds.getInstance().add("template_path",t)}return t}();n.Template=i},{"./Embeds":5}],9:[function(t,e,n){"use strict";var o=function(){function t(){}return t.clean=function(t){for(var e=$.trim(t).split(/\r\n|\n/),n=0;n<e.length;n++)e[n]=$.trim(e[n]);return e.join("\n")},t.is_true=function(t){var e=(t||"").toString().toLowerCase();return"yes"===e||"1"===e||"true"===e||"on"===e},t.file_exists=function(t){var e=!1;return $.ajax({type:"HEAD",async:!1,url:t,success:function(){e=!0}}),e},t}();n.Utils=o},{}]},{},[6]);