
jQuery(document).ready(function(){
	var url = jQuery(".smartcms_url").val();
	var proid = jQuery(".smartcms_proid").val();
	//var myNicEditor = new nicEditor({
	//	iconsPath : url+'images/nicEditorIcons.gif'
	//});
	bkLib.onDomLoaded(function() {
        editors = nicEditors.allTextAreas();
    });
	
	var editors = {}; 
    
	jQuery(".woocommerce-product-gallery").replaceWith(jQuery(".smartcms_content").show());
	jQuery(".smartcms_content").before( jQuery(".product_title") );
	
	//////////
	jQuery(".scwspd_at_button").click(function(){
		var checkSize = jQuery(".scwspd_text_right").size();
		
		jQuery(".smartcms_content_right").append("<div class='scwspd_text_right scwspd_text_right"+checkSize+"'>"+
			"<span class='scwspd_text_right_delete'><img src='"+url+"images/delete-icon.png'></span>"+
			"<span class='scwspd_text_right_move'><img src='"+url+"images/move-icon.png'></span><br>"+
			"<span id='scwspd_text_right"+checkSize+"' class='scwspd_text_right_edit'>Hello!</span>"+
		"</div>");
		
		jQuery(".scwspd_at_button").before("<div class='scwspd_divat_panel scwspd_divat_panel"+checkSize+"'><textarea class='scwspd_at_panel' id='scwspd_at_panel"+checkSize+"'>Hello!</textarea></div>");
		editors[checkSize] = new nicEditor({ iconsPath : url+'images/nicEditorIcons.gif' }).panelInstance("scwspd_at_panel"+checkSize);
		
		jQuery(".scwspd_divat_panel"+checkSize).find(".nicEdit-main").attr('id', "scwspd_editor"+checkSize);
		var editable = document.getElementById("scwspd_editor"+checkSize);
		editable.addEventListener('input', function() {
			var html = document.getElementById("scwspd_editor"+checkSize).innerHTML;
			jQuery("#scwspd_text_right"+checkSize).html(html);
		});
		
		//calfun(".scwspd_text_right"+checkSize, checkSize);
		jQuery(".scwspd_text_right"+checkSize).draggable({
			handle: jQuery(".scwspd_text_right"+checkSize).children(".scwspd_text_right_move")
		});

		jQuery(".scwspd_text_right"+checkSize).children(".scwspd_text_right_delete").click(function(){
			jQuery(".scwspd_text_right"+checkSize).remove();
			jQuery(".scwspd_divat_panel"+checkSize).remove();
		});
	});
	
	function calfun(el, checkSize){
		var elthis = jQuery(el);

		myNicEditor.setPanel("scwspd_at_panel"+checkSize);
		myNicEditor.addInstance(elthis.children(".scwspd_text_right_edit").attr("id"));	
	}
	
	/////////////////
	jQuery(".scwspd_uploadimage_button").click(function(){
		var checkSize = jQuery(".scwspd_uploadimage_item").size();
		jQuery(this).before("<div class='scwspd_uploadimage_item scwspd_uploadimage_item"+checkSize+"'>"+
			"<label for='scwspd_uploadimage_file"+checkSize+"'>Choose a file</label>"+
			"<input id='scwspd_uploadimage_file"+checkSize+"' type='file'>"+
			"<span class='scwspd_uploadimage_delete'><img src='"+url+"images/delete-icon.png'></span>"+
		"</div>");
		
		jQuery("#scwspd_uploadimage_file"+checkSize).change(function(){
			if(this.files && this.files[0]){
				var reader = new FileReader();
				reader.onload = function (e){
					if( jQuery(".scwspd_image_right"+checkSize).size() > 0){
						jQuery(".scwspd_image_right"+checkSize).children("img").attr("src", e.target.result);
					}else{
						jQuery(".smartcms_content_right").append("<div class='scwspd_image_right scwspd_image_right"+checkSize+"'>"+
							"<img src='"+e.target.result+"'>"+
						"</div>");
						jQuery( ".scwspd_image_right"+checkSize ).resizable().draggable();
					}
				}
				reader.readAsDataURL(this.files[0]);
			}
		});
		
		jQuery(".scwspd_uploadimage_item"+checkSize).children(".scwspd_uploadimage_delete").click(function(){
			jQuery(".scwspd_uploadimage_item"+checkSize).remove();
			jQuery(".scwspd_image_right"+checkSize).remove();
		});
	});
	
	/////////////////
	jQuery(".scwspd_choose_color_item").each(function(key, val){
		var elthis = jQuery(this);
		elthis.click(function(){
			jQuery(".scwspd_choose_color_item").removeClass("active");
			elthis.addClass("active");
			
			jQuery(".scwspd_right_item").removeClass("active");
			jQuery(".scwspd_right_item:eq("+key+")").addClass("active");
			
			jQuery(".scwspd_right_item_add").removeClass("active");
			jQuery(".scwspd_right_item.active").children(".scwspd_right_item_add:first").addClass("active");
			
			var src = jQuery(".scwspd_right_item.active").children(".scwspd_right_item_add:first").children("img").attr("src");
			jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").attr("src", src);
		});
	});
	
	jQuery(".scwspd_right_item_add").each(function(){
		var elthis = jQuery(this);
		elthis.click(function(){
			var src = elthis.children("img").attr("src");
			jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").attr("src", src);
			jQuery(".scwspd_right_item_add").removeClass("active");
			elthis.addClass("active");
		});
	});

	////////////
	jQuery(".scwspd_preview_content_use").click(function(){
		jQuery(".smartcms_content_right").css("opacity", "0.5");
		jQuery(".scwspd_text_right_delete").hide();
		jQuery(".scwspd_text_right_move").hide();
		jQuery(".scwspd_right_item_add").hide();
		jQuery(".ui-resizable-se").hide();
		jQuery(".scwspd_image_right").css("border", "none");
		
		html2canvas(jQuery(".smartcms_content_right"), {
			 onrendered: function(canvas){
				 jQuery(".smartcms_firstimage").val(canvas.toDataURL("image/png"));
				 renderSecondImage();
			 }
		});
		
		
	});
	function renderSecondImage(){
		jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").css("opacity", "0");
		html2canvas(jQuery(".smartcms_content_right"), {
			onrendered: function(canvas2){
				var fimage = jQuery(".smartcms_firstimage").val();
				 var color = jQuery(".scwspd_choose_color_item.active").children("span").text();
				 var title = jQuery(".scwspd_right_item.active").children(".scwspd_right_item_add.active").children("span").text();
				 var qtys = "";
				 
				 jQuery(".scwspd_qty_item").each(function(){
					 var label = jQuery(this).children("label").text();
					 var input = jQuery(this).children("input").val();
					 
					 if(input){
						 if(qtys)
							 qtys += "&"+label+"#"+input;
						 else
							 qtys = label+"#"+input;
					 }
				 });
				 
				 var dulieu = fimage+"#"+canvas2.toDataURL("image/png")+"@"+color+"@"+qtys+"@"+title;
				 
				 jQuery.ajax({
					url: url+"helper.php",
					data: {
						proid: proid,
						dulieu: dulieu,
						task : "save_preview"
					},
					type: 'POST',
					success: function(data){
						var checkSize = jQuery(".scwspd_preview_item").size();
						 jQuery(".scwspd_preview_items").append("<div class='scwspd_preview_item scwspd_preview_item"+checkSize+"'>"+
							'<div class="scwspd_preview_item_left">'+
								'<div class="scwspd_preview_item_left_first">'+
									"<span class='scwspd_preview_title'>"+title+"</span>"+
									"<span class='scwspd_preview_color' style='background: "+color+"'>"+color+"</span>"+
								'</div>'+
								'<div class="scwspd_preview_item_left_images">'+
									"<a class='scwspd_group' href='"+canvas2.toDataURL("image/png")+"'>"+
										"<img src='"+canvas2.toDataURL("image/png")+"'>"+
									"</a>"+
									"<a class='scwspd_group' href='"+fimage+"'>"+
										"<img src='"+fimage+"'>"+
									"</a>"+
								'</div>'+
								'<div class="scwspd_preview_item_left_quantity">'+
									
								'</div>'+
							'</div>'+
							'<div class="scwspd_preview_item_right">'+
								"<img class='scwspd_delete_preview' src='"+url+"images/delete-icon.png'>"+
							'</div>'+
						 "</div>");
						 
						 jQuery(".scwspd_qty_item").each(function(){
							 var label = jQuery(this).children("label").text();
							 var input = jQuery(this).children("input").val();
							 
							 if(input){
								 jQuery(".scwspd_preview_item"+checkSize).find(".scwspd_preview_item_left_quantity").append("<span class='scwspd_preview_qty'>"+label+' - '+input+"</span>");
							 }
						 });
						 
						 jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").css("opacity", "1");
						 jQuery(".smartcms_content_right").css("opacity", "1");
						 
						 jQuery(".scwspd_group").colorbox({rel:'scwspd_group', 'photo':true});
						 jQuery(".scwspd_preview_item").each(function(){
							 var elthis = jQuery(this);
							 elthis.find(".scwspd_delete_preview").click(function(){
								var title = elthis.find(".scwspd_preview_title").text();
								var color = elthis.find(".scwspd_preview_color").text();
								var imgs = "";
						
								elthis.find(".scwspd_preview_item_left_images").children("a").each(function(){
									var src = jQuery(this).attr("href");
									if(imgs)
										imgs += "#"+src;
									else
										imgs += src;
								});
								
								 jQuery.ajax({
									url: url+"helper.php",
									data: {
										proid: proid,
										title: title,
										color: color,
										imgs: imgs,
										task : "delete_preview"
									},
									type: 'POST',
									before: function(e){
										elthis.css("opacity", "0.5");
									},
									success: function(data){
										elthis.css("opacity", "1");
										if(data == "1")
											elthis.remove();
										else
											alert("Error!");
									}
								 });
							 });
						 });
						 jQuery(".scwspd_right_item_add").show();
						 jQuery(".scwspd_text_right_delete").show();
						 jQuery(".scwspd_text_right_move").show();
						 jQuery(".ui-resizable-se").show();
						 jQuery(".scwspd_image_right").css("border", "1px solid #ccc");
					}
				});
			}
		});
	}
	//////////////////
	jQuery(".scwspd_group").colorbox({rel:'scwspd_group', 'photo':true});
	jQuery(".scwspd_preview_item").each(function(){
		 var elthis = jQuery(this);
		 elthis.find(".scwspd_delete_preview").click(function(){
			var title = elthis.find(".scwspd_preview_title").text();
			var color = elthis.find(".scwspd_preview_color").text();
			var imgs = "";
	
			elthis.find(".scwspd_preview_item_left_images").children("a").each(function(){
				var src = jQuery(this).attr("href");
				if(imgs)
					imgs += "#"+src;
				else
					imgs += src;
			});
			
			 jQuery.ajax({
				url: url+"helper.php",
				data: {
					proid: proid,
					title: title,
					color: color,
					imgs: imgs,
					task : "delete_preview"
				},
				type: 'POST',
				before: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1")
						elthis.remove();
					else
						alert("Error!");
				}
			 });
		 });
	 });
});