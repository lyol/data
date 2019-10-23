var scrawl=function(e){e&&this.initOptions(e)};(function(){var p=$G("J_brushBoard"),g=p.getContext("2d"),a=[],m=0;scrawl.prototype={isScrawl:false,brushWidth:-1,brushColor:"",initOptions:function(e){var t=this;t.originalState(e);t._buildToolbarColor(e.colorList);t._addBoardListener(e.saveNum);t._addOPerateListener(e.saveNum);t._addColorBarListener();t._addBrushBarListener();t._addEraserBarListener();t._addAddImgListener();t._addRemoveImgListenter();t._addScalePicListenter();t._addClearSelectionListenter();t._originalColorSelect(e.drawBrushColor);t._originalBrushSelect(e.drawBrushSize);t._clearSelection()},originalState:function(e){var t=this;t.brushWidth=e.drawBrushSize;t.brushColor=e.drawBrushColor;g.lineWidth=t.brushWidth;g.strokeStyle=t.brushColor;g.fillStyle="transparent";g.lineCap="round";g.fill()},_buildToolbarColor:function(e){var t=null,a=[];a.push("<table id='J_colorList'>");for(var i=0,r;r=e[i++];){if((i-1)%5==0){if(i!=1){a.push("</tr>")}a.push("<tr>")}t="#"+r;a.push("<td><a title='"+t+"' href='javascript:void(0)' style='background-color:"+t+"'></a></td>")}a.push("</tr></table>");$G("J_colorBar").innerHTML=a.join("")},_addBoardListener:function(i){var r=this,s=0,o=-1,l=-1,n=false,c=false,d=false,h=0,u,f="";s=parseInt(domUtils.getComputedStyle($G("J_wrap"),"margin-left"));a.push(g.getImageData(0,0,g.canvas.width,g.canvas.height));m+=1;domUtils.on(p,["mousedown","mousemove","mouseup","mouseout"],function(e){u=browser.webkit?e.which:h;switch(e.type){case"mousedown":h=1;f=1;n=true;d=false;c=false;r.isScrawl=true;o=e.clientX-s;l=e.clientY-s;g.beginPath();break;case"mousemove":if(!f&&u==0){return}if(!f&&u){o=e.clientX-s;l=e.clientY-s;g.beginPath();f=1}if(d||!n){return}var t=e.clientX-s,a=e.clientY-s;g.moveTo(o,l);g.lineTo(t,a);g.stroke();o=t;l=a;c=true;break;case"mouseup":h=0;if(!n)return;if(!c){g.arc(o,l,g.lineWidth,0,Math.PI*2,false);g.fillStyle=g.strokeStyle;g.fill()}g.closePath();r._saveOPerate(i);n=false;c=false;d=true;o=-1;l=-1;break;case"mouseout":f="";h=0;if(u==1)return;g.closePath();break}})},_addOPerateListener:function(e){var t=this;domUtils.on($G("J_previousStep"),"click",function(){if(m>1){m-=1;g.clearRect(0,0,g.canvas.width,g.canvas.height);g.putImageData(a[m-1],0,0);t.btn2Highlight("J_nextStep");m==1&&t.btn2disable("J_previousStep")}});domUtils.on($G("J_nextStep"),"click",function(){if(m>0&&m<a.length){g.clearRect(0,0,g.canvas.width,g.canvas.height);g.putImageData(a[m],0,0);m+=1;t.btn2Highlight("J_previousStep");m==a.length&&t.btn2disable("J_nextStep")}});domUtils.on($G("J_clearBoard"),"click",function(){g.clearRect(0,0,g.canvas.width,g.canvas.height);a=[];t._saveOPerate(e);m=1;t.isScrawl=false;t.btn2disable("J_previousStep");t.btn2disable("J_nextStep");t.btn2disable("J_clearBoard")})},_addColorBarListener:function(){var i=this;domUtils.on($G("J_colorBar"),"click",function(e){var t=i.getTarget(e),a=t.title;if(!!a){i._addColorSelect(t);i.brushColor=a;g.globalCompositeOperation="source-over";g.lineWidth=i.brushWidth;g.strokeStyle=a}})},_addBrushBarListener:function(){var i=this;domUtils.on($G("J_brushBar"),"click",function(e){var t=i.getTarget(e),a=browser.ie?t.innerText:t.text;if(!!a){i._addBESelect(t);g.globalCompositeOperation="source-over";g.lineWidth=parseInt(a);g.strokeStyle=i.brushColor;i.brushWidth=g.lineWidth}})},_addEraserBarListener:function(){var i=this;domUtils.on($G("J_eraserBar"),"click",function(e){var t=i.getTarget(e),a=browser.ie?t.innerText:t.text;if(!!a){i._addBESelect(t);g.lineWidth=parseInt(a);g.globalCompositeOperation="destination-out";g.strokeStyle="#FFF"}})},_addAddImgListener:function(){var r=$G("J_imgTxt");if(!window.FileReader){$G("J_addImg").style.display="none";$G("J_removeImg").style.display="none";$G("J_sacleBoard").style.display="none"}domUtils.on(r,"change",function(e){var t=r.parentNode;addMaskLayer(lang.backgroundUploading);var a=e.target||e.srcElement,i=new FileReader;i.onload=function(e){var t=e.target||e.srcElement;ue_callback(t.result,"SUCCESS")};i.readAsDataURL(a.files[0]);t.reset()})},_addRemoveImgListenter:function(){var e=this;domUtils.on($G("J_removeImg"),"click",function(){$G("J_picBoard").innerHTML="";e.btn2disable("J_removeImg");e.btn2disable("J_sacleBoard")})},_addScalePicListenter:function(){domUtils.on($G("J_sacleBoard"),"click",function(){var e=$G("J_picBoard"),t=$G("J_scaleCon"),a=e.children[0];if(a){if(!t){e.style.cssText="position:relative;z-index:999;"+e.style.cssText;a.style.cssText="position: absolute;top:"+(p.height-a.height)/2+"px;left:"+(p.width-a.width)/2+"px;";var i=new ScaleBoy;e.appendChild(i.init());i.startScale(a)}else{if(t.style.visibility=="visible"){t.style.visibility="hidden";e.style.position="";e.style.zIndex=""}else{t.style.visibility="visible";e.style.cssText+="position:relative;z-index:999"}}}})},_addClearSelectionListenter:function(){var t=document;domUtils.on(t,"mousemove",function(e){if(browser.ie&&browser.version<11)t.selection.clear();else window.getSelection().removeAllRanges()})},_clearSelection:function(){var e=["J_operateBar","J_colorBar","J_brushBar","J_eraserBar","J_picBoard"];for(var t=0,a;a=e[t++];){domUtils.unSelectable($G(a))}},_saveOPerate:function(e){var t=this;if(a.length<=e){if(m<a.length){t.btn2disable("J_nextStep");a.splice(m)}a.push(g.getImageData(0,0,g.canvas.width,g.canvas.height));m=a.length}else{a.shift();a.push(g.getImageData(0,0,g.canvas.width,g.canvas.height));m=a.length}t.btn2Highlight("J_previousStep");t.btn2Highlight("J_clearBoard")},_originalColorSelect:function(e){var t=$G("J_colorList").getElementsByTagName("td");for(var a=0,i;i=t[a++];){if(i.children[0].title.toLowerCase()==e){i.children[0].style.opacity=1}}},_originalBrushSelect:function(e){var t=$G("J_brushBar").children;for(var a=0,i;i=t[a++];){if(i.tagName.toLowerCase()=="a"){var r=browser.ie?i.innerText:i.text;if(r.toLowerCase()==e){i.style.opacity=1}}}},_addColorSelect:function(e){var t=this,a=$G("J_colorList").getElementsByTagName("td"),i=$G("J_eraserBar").children,r=$G("J_brushBar").children;for(var s=0,o;o=a[s++];){o.children[0].style.opacity=.3}for(var l=0,n;n=r[l++];){if(n.tagName.toLowerCase()=="a"){n.style.opacity=.3;var c=browser.ie?n.innerText:n.text;if(c.toLowerCase()==this.brushWidth){n.style.opacity=1}}}for(var d=0,h;h=i[d++];){if(h.tagName.toLowerCase()=="a"){h.style.opacity=.3}}e.style.opacity=1;e.blur()},_addBESelect:function(e){var t=$G("J_brushBar").children;var a=$G("J_eraserBar").children;for(var i=0,r;r=t[i++];){if(r.tagName.toLowerCase()=="a"){r.style.opacity=.3}}for(var s=0,o;o=a[s++];){if(o.tagName.toLowerCase()=="a"){o.style.opacity=.3}}e.style.opacity=1;e.blur()},getCanvasData:function(){var e=$G("J_picBoard"),t=e.children[0];if(t){var a,i;if(t.style.position=="absolute"){a=parseInt(t.style.left);i=parseInt(t.style.top)}else{a=(e.offsetWidth-t.width)/2;i=(e.offsetHeight-t.height)/2}g.globalCompositeOperation="destination-over";g.drawImage(t,a,i,t.width,t.height)}else{g.globalCompositeOperation="destination-atop";g.fillStyle="#fff";g.fillRect(0,0,p.width,p.height)}try{return p.toDataURL("image/png").substring(22)}catch(e){return""}},btn2Highlight:function(e){var t=$G(e);t.className.indexOf("H")==-1&&(t.className+="H")},btn2disable:function(e){var t=$G(e);t.className.indexOf("H")!=-1&&(t.className=t.className.replace("H",""))},getTarget:function(e){return e.target||e.srcElement}}})();var ScaleBoy=function(){this.dom=null;this.scalingElement=null};(function(){function e(){var e=document,t=e.getElementsByTagName("head")[0],a=e.createElement("style"),i=".scale{visibility:hidden;cursor:move;position:absolute;left:0;top:0;width:100px;height:50px;background-color:#fff;font-size:0;line-height:0;opacity:.4;filter:Alpha(opacity=40);}"+".scale span{position:absolute;left:0;top:0;width:6px;height:6px;background-color:#006DAE;}"+".scale .hand0, .scale .hand7{cursor:nw-resize;}"+".scale .hand1, .scale .hand6{left:50%;margin-left:-3px;cursor:n-resize;}"+".scale .hand2, .scale .hand4, .scale .hand7{left:100%;margin-left:-6px;}"+".scale .hand3, .scale .hand4{top:50%;margin-top:-3px;cursor:w-resize;}"+".scale .hand5, .scale .hand6, .scale .hand7{margin-top:-6px;top:100%;}"+".scale .hand2, .scale .hand5{cursor:ne-resize;}";a.type="text/css";try{a.appendChild(e.createTextNode(i))}catch(e){a.styleSheet.cssText=i}t.appendChild(a)}function i(){var e=document,t,a=[],i=e.createElement("div");i.id="J_scaleCon";i.className="scale";for(var r=0;r<8;r++){a.push("<span class='hand"+r+"'></span>")}i.innerHTML=a.join("");return i}var s=[[1,1,-1,-1],[0,1,0,-1],[0,1,1,-1],[1,0,-1,0],[0,0,1,0],[1,0,-1,1],[0,0,0,1],[0,0,1,1]];ScaleBoy.prototype={init:function(){e();var a=this,t=a.dom=i();a.scaleMousemove.fp=a;domUtils.on(t,"mousedown",function(e){var t=e.target||e.srcElement;a.start={x:e.clientX,y:e.clientY};if(t.className.indexOf("hand")!=-1){a.dir=t.className.replace("hand","")}domUtils.on(document.body,"mousemove",a.scaleMousemove);e.stopPropagation?e.stopPropagation():e.cancelBubble=true});domUtils.on(document.body,"mouseup",function(e){if(a.start){domUtils.un(document.body,"mousemove",a.scaleMousemove);if(a.moved){a.updateScaledElement({position:{x:t.style.left,y:t.style.top},size:{w:t.style.width,h:t.style.height}})}delete a.start;delete a.moved;delete a.dir}});return t},startScale:function(e){var t=this,a=t.dom;a.style.cssText="visibility:visible;top:"+e.style.top+";left:"+e.style.left+";width:"+e.offsetWidth+"px;height:"+e.offsetHeight+"px;";t.scalingElement=e},updateScaledElement:function(e){var t=this.scalingElement,a=e.position,i=e.size;if(a){typeof a.x!="undefined"&&(t.style.left=a.x);typeof a.y!="undefined"&&(t.style.top=a.y)}if(i){i.w&&(t.style.width=i.w);i.h&&(t.style.height=i.h)}},updateStyleByDir:function(e,t){var a=this,i=a.dom,r;s["def"]=[1,1,0,0];if(s[e][0]!=0){r=parseInt(i.style.left)+t.x;i.style.left=a._validScaledProp("left",r)+"px"}if(s[e][1]!=0){r=parseInt(i.style.top)+t.y;i.style.top=a._validScaledProp("top",r)+"px"}if(s[e][2]!=0){r=i.clientWidth+s[e][2]*t.x;i.style.width=a._validScaledProp("width",r)+"px"}if(s[e][3]!=0){r=i.clientHeight+s[e][3]*t.y;i.style.height=a._validScaledProp("height",r)+"px"}if(e==="def"){a.updateScaledElement({position:{x:i.style.left,y:i.style.top}})}},scaleMousemove:function(e){var t=arguments.callee.fp,a=t.start,i=t.dir||"def",r={x:e.clientX-a.x,y:e.clientY-a.y};t.updateStyleByDir(i,r);arguments.callee.fp.start={x:e.clientX,y:e.clientY};arguments.callee.fp.moved=1},_validScaledProp:function(e,t){var a=this.dom,i=$G("J_picBoard");t=isNaN(t)?0:t;switch(e){case"left":return t<0?0:t+a.clientWidth>i.clientWidth?i.clientWidth-a.clientWidth:t;case"top":return t<0?0:t+a.clientHeight>i.clientHeight?i.clientHeight-a.clientHeight:t;case"width":return t<=0?1:t+a.offsetLeft>i.clientWidth?i.clientWidth-a.offsetLeft:t;case"height":return t<=0?1:t+a.offsetTop>i.clientHeight?i.clientHeight-a.offsetTop:t}}}})();function ue_callback(e,t){var a=document,i=$G("J_picBoard"),r=a.createElement("img");function s(e,t,a,i){var r=0,s=0,o,l=e.width||a,n=e.height||i;if(l>t||n>t){if(l>=n){if(r=l-t){o=(r/l).toFixed(2);e.height=n-n*o;e.width=t}}else{if(s=n-t){o=(s/n).toFixed(2);e.width=l-l*o;e.height=t}}}}removeMaskLayer();if(t=="SUCCESS"){i.innerHTML="";r.onload=function(){s(this,300);i.appendChild(r);var e=new scrawl;e.btn2Highlight("J_removeImg");e.btn2Highlight("J_sacleBoard")};r.src=e}else{alert(t)}}function removeMaskLayer(){var e=$G("J_maskLayer");e.className="maskLayerNull";e.innerHTML="";dialog.buttons[0].setDisabled(false)}function addMaskLayer(e){var t=$G("J_maskLayer");dialog.buttons[0].setDisabled(true);t.className="maskLayer";t.innerHTML=e}function exec(scrawlObj){if(scrawlObj.isScrawl){addMaskLayer(lang.scrawlUpLoading);var base64=scrawlObj.getCanvasData();if(!!base64){var options={timeout:1e5,onsuccess:function(xhr){if(!scrawlObj.isCancelScrawl){var responseObj;responseObj=eval("("+xhr.responseText+")");if(responseObj.state=="SUCCESS"){var imgObj={},url=editor.options.scrawlUrlPrefix+responseObj.url;imgObj.src=url;imgObj._src=url;imgObj.alt=responseObj.original||"";imgObj.title=responseObj.title||"";editor.execCommand("insertImage",imgObj);dialog.close()}else{alert(responseObj.state)}}},onerror:function(){alert(lang.imageError);dialog.close()}};options[editor.getOpt("scrawlFieldName")]=base64;var actionUrl=editor.getActionUrl(editor.getOpt("scrawlActionName")),params=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",url=utils.formatUrl(actionUrl+(actionUrl.indexOf("?")==-1?"?":"&")+params);ajax.request(url,options)}}else{addMaskLayer(lang.noScarwl+"&nbsp;&nbsp;&nbsp;<input type='button' value='"+lang.continueBtn+"'  onclick='removeMaskLayer()'/>")}}