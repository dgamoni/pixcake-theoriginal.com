
jQuery(document).ready(function(){


	// jQuery('.scwspd_choose_color_graphics_slick').slick({
	//   infinite: true,
	//   slidesToShow: 7,
	//   slidesToScroll: 1
	// });

	var url = jQuery(".smartcms_url").val();
	var proid = jQuery(".smartcms_proid").val();
	//var myNicEditor = new nicEditor({
	//	iconsPath : url+'images/nicEditorIcons.gif'
	//});
	bkLib.onDomLoaded(function() {
        editors = nicEditors.allTextAreas();
    });
	
	var editors = {}; 
    
	//jQuery(".woocommerce-product-gallery").replaceWith(jQuery(".smartcms_content").show());
	jQuery(".woocommerce-product-gallery").replaceWith(jQuery(".smartcms_content_right").show());
	jQuery(".smartcms_content").show();

	jQuery(".smartcms_content").before( jQuery(".product_title") );
	
	//////////
	//jQuery(".scwspd_at_button").click(function(){
		var checkSize = jQuery(".scwspd_text_right").size();
		
		jQuery(".smartcms_content_right").append("<div class='scwspd_text_right scwspd_text_right"+checkSize+"'>"+
			"<span class='scwspd_text_right_delete'><img src='"+url+"images/delete-icon.png'></span>"+
			"<span class='scwspd_text_right_move'><img src='"+url+"images/move-icon.png'></span><br>"+
			"<span id='scwspd_text_right"+checkSize+"' class='scwspd_text_right_edit'>Congratulations Mary</span>"+
		"</div>");
		
		jQuery(".scwspd_at_button").before("<div class='scwspd_divat_panel scwspd_divat_panel"+checkSize+"'><textarea class='scwspd_at_panel' id='scwspd_at_panel"+checkSize+"'>Congratulations Mary</textarea></div>");
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
	//});
	
	function calfun(el, checkSize){
		var elthis = jQuery(el);

		myNicEditor.setPanel("scwspd_at_panel"+checkSize);
		myNicEditor.addInstance(elthis.children(".scwspd_text_right_edit").attr("id"));	
	}
	



	// var checkSize = '0';
	// jQuery("#scwspd_uploadimage_file"+checkSize).click(function(){
	// 	//if(this.files && this.files[0]){
	// 		var reader = new FileReader();
	// 		reader.onload = function (e){
	// 			if( jQuery(".scwspd_image_right"+checkSize).size() > 0){
	// 				jQuery(".scwspd_image_right"+checkSize).children("img").attr("src", e.target.result);
	// 			}else{
	// 				jQuery(".smartcms_content_right").append("<div class='scwspd_image_right scwspd_image_right"+checkSize+"'>"+
	// 					"<img src='"+e.target.result+"'>"+
	// 				"</div>");
	// 				jQuery( ".scwspd_image_right"+checkSize ).resizable().draggable();
	// 			}
	// 		}
	// 		reader.readAsDataURL(this.files[0]);
	// 	//}
	// });



	/////////////////
	jQuery(".scwspd_uploadimage_button").click(function(){
		var checkSize = jQuery(".scwspd_uploadimage_item").size();
		console.log(checkSize);
		jQuery(this).before("<div class='scwspd_uploadimage_item scwspd_uploadimage_item"+checkSize+"'>"+
			"<label for='scwspd_uploadimage_file"+checkSize+"'>Choose a file</label>"+
			"<input id='scwspd_uploadimage_file"+checkSize+"' type='file'>"+
			"<span class='scwspd_uploadimage_delete'><img src='"+url+"images/delete-icon.png'></span>"+
		"</div>");
	


		jQuery("#scwspd_uploadimage_file"+checkSize).change(function(){
			console.log(this);
			console.log(this.files[0]);
			if(this.files && this.files[0]){
				
				var reader = new FileReader();
				//console.log(reader);
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

	//graphics
		jQuery(".scwspd_choose_color_item_graphics").each(function(key, val){
		var elthis_ = jQuery(this);
		//elthis_.click(function(){
		elthis_.live('click',function(){
			jQuery(".scwspd_choose_color_item_graphics").removeClass("active");
			elthis_.addClass("active");
			var bgurl = elthis_.find('.graphics_bg').attr('data-pat');
			console.log(bgurl);

			//jQuery(".main_graphics_bg").remove();
			//jQuery('.scwspd_right_item').children(".scwspd_right_item_main").append('<img class="main_graphics_bg" src="'+bgurl+'">');
	
			if(bgurl){

					if( jQuery(".scwspd_image_right"+checkSize).size() > 0){
						jQuery(".scwspd_image_right"+checkSize).children("img").attr("src", bgurl);
					}else{
						jQuery(".smartcms_content_right").append("<div class='scwspd_image_right scwspd_image_right"+checkSize+"'>"+
							"<img src='"+bgurl+"'>"+
						"</div>");
						// jQuery( ".scwspd_image_right"+checkSize ).resizable().draggable();
						jQuery( ".scwspd_image_right"+checkSize ).draggable(
							    {
							        drag: function(){
							            var offset = $(this).offset();
							            var xPos = offset.left;
							            var yPos = offset.top;
							            $('#posX').text('x: ' + xPos);
							            $('#posY').text('y: ' + yPos);
							        }
							    });
					}

			}	

		});

	});	
	// pattern
	jQuery(".scwspd_choose_color_item_pattern").each(function(key, val){
		var elthis_ = jQuery(this);
		//elthis_.click(function(){
		elthis_.live('click',function(){
			jQuery(".scwspd_choose_color_item_pattern").removeClass("active");
			elthis_.addClass("active");
			var bgurl = elthis_.find('.pattern_bg').attr('data-pat');
			//console.log(bgurl);
			jQuery(".main_pattern_bg").remove();
			jQuery('.scwspd_right_item').children(".scwspd_right_item_main").append('<img class="main_pattern_bg" src="'+bgurl+'">');
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
			jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").not('.main_pattern_bg').attr("src", src);
		});
	});

	jQuery(".scwspd_choose_color_item_text").each(function(key, val){
		var elthis = jQuery(this);
		elthis.click(function(){
			var clr = jQuery(this).find('span').text();
			console.log(clr);
			jQuery(".scwspd_choose_color_item_text").removeClass("active");
			elthis.addClass("active");
			
			jQuery(".scwspd_right_item_text").removeClass("active");
			jQuery(".scwspd_right_item_text:eq("+key+")").addClass("active");
			
			jQuery(".scwspd_right_item_add_text").removeClass("active");
			jQuery(".scwspd_right_item_text.active").children(".scwspd_right_item_add_text:first").addClass("active");
			
			//console.log(jQuery(".smartcms_content_right").children(".scwspd_text_right_edit"));
			jQuery(".smartcms_content_right .scwspd_text_right_edit").css('color', clr);
			//jQuery(".scwspd_right_item_text.active").children(".scwspd_right_item_main").children("img").not('.main_pattern_bg').attr("src", src);
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
		//jQuery(".smartcms_content_right").css("opacity", "0.5");
		jQuery(".scwspd_text_right_delete").hide();
		jQuery(".scwspd_text_right_move").hide();
		jQuery(".scwspd_right_item_add").hide();
		jQuery(".ui-resizable-se").hide();
		jQuery(".scwspd_image_right").css("border", "none");
		
		//var pdf = new jsPDF('p', 'pt', [500, 500]);

		html2canvas(jQuery(".smartcms_content_right"), {
			 onrendered: function(canvas){
				jQuery(".smartcms_firstimage").val(canvas.toDataURL("image/png"));
				renderSecondImage();
				//renderPDF();

					// var imgData = canvas.toDataURL("image/png",);
					// var pdf = new jsPDF('l', 'mm', [132, 132]);
					// pdf.addImage(imgData, 'PNG', 0, 0, 132, 132);
					// pdf.save("youdesign.pdf");

     //       var blob = pdf.output("blob");
     //       var blobURL = URL.createObjectURL(blob);
     //       var downloadLink = document.getElementById('pdf-download-link');
     //       downloadLink.href = blobURL;

			 },
		  width: 510,
		  height: 500
		});

		// setTimeout(function() {

  //       }, 0);				 



	});

// javascript function that uploads a blob to upload.php
function uploadBlob(blobs, id){
    // create a blob here for testing
    //var blob = new Blob(["i am a blob"]);
    var blob = blobs;
    //var blob = yourAudioBlobCapturedFromWebAudioAPI;// for example   
    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
        fd.append('fname', 'test.txt');
        fd.append('data', event.target.result);
        jQuery.ajax({
            type: 'POST',
            url: url+'upload.php',
            data: fd,
            processData: false,
            contentType: false
        }).done(function(data) {
            // print the output from the upload.php script
            //console.log(data);
            jQuery('.smartcms_pdf').val(data);
            //return data;
        });
    };      
    // trigger the read from the reader...
    reader.readAsDataURL(blob);

}

	function renderSecondImage(){
		//jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").css("opacity", "0");
		html2canvas(jQuery(".smartcms_content_right"), {
			onrendered: function(canvas2){
				var fimage = jQuery(".smartcms_firstimage").val();

				//console.log(fimage);
				 var color = jQuery(".scwspd_choose_color_item.active").children("span").text();
				 var title = jQuery(".scwspd_right_item.active").children(".scwspd_right_item_add.active").children("span").text();
				 var qtys = "";
				 
				 // jQuery(".scwspd_qty_item").each(function(){
					//  var label = jQuery(this).children("label").text();
					//  var input = jQuery(this).children("input").val();
					 
					//  if(input){
					// 	 if(qtys)
					// 		 qtys += "&"+label+"#"+input;
					// 	 else
					// 		 qtys = label+"#"+input;
					//  }
				 // });
				 
				 // var dulieu = fimage+"#"+canvas2.toDataURL("image/png")+"@"+color+"@"+qtys+"@"+title;
				
				 var imgData = canvas2.toDataURL("image/png",);
					var pdf = new jsPDF('l', 'mm', [132, 132]);
					pdf.addImage(imgData, 'PNG', 0, 0, 132, 132);
		           var blob = pdf.output("blob");
		           var blobURL = URL.createObjectURL(blob);

		            

		            uploadBlob(blob);
		            var file_pdf = jQuery(".smartcms_pdf").val();

		            var dulieu = "#"+fimage+"@"+file_pdf;

		            //console.log(uploadBlob(blob));

		  //      var fd = new FormData();
				// fd.append('fname', 'test.pdf');
				// fd.append('data', blobURL);


				 jQuery.ajax({
					url: url+"helper.php",
					data: {
						proid: proid,
						dulieu: dulieu,
						blob: blob,
						pdf: file_pdf,
						task : "save_preview"
					},
					type: 'POST',
					success: function(data){

					// var imgData = canvas.toDataURL("image/png",);
					// var pdf = new jsPDF('l', 'mm', [132, 132]);
					// pdf.addImage(imgData, 'PNG', 0, 0, 132, 132);
					// //pdf.save("youdesign.pdf");
		   //         var blob = pdf.output("blob");
		   //         var blobURL = URL.createObjectURL(blob);
		   //         var downloadLink = document.getElementById('pdf-download-link');
		           //downloadLink.href = blobURL;

						var checkSize = jQuery(".scwspd_preview_item").size();
						 jQuery(".scwspd_preview_items").append("<div class='scwspd_preview_item scwspd_preview_item"+checkSize+"'>"+
							'<div class="scwspd_preview_item_left">'+
								'<div class="scwspd_preview_item_left_first">'+
									//"<span class='scwspd_preview_title'>"+title+"</span>"+
									//"<span class='scwspd_preview_color' style='background: "+color+"'>"+color+"</span>"+
								'</div>'+
								'<div class="scwspd_preview_item_left_images">'+
									//"<a class='scwspd_group' href='"+canvas2.toDataURL("image/png")+"'>"+
										//"<img src='"+canvas2.toDataURL("image/png")+"'>"+
									//"</a>"+
									"<a class='scwspd_group' href='"+fimage+"'>"+
										"<img src='"+fimage+"'>"+
									"</a>"+
								'</div>'+
								'<a data-pdf="'+file_pdf+'" href="'+blobURL+'" target="_blank" id="pdf-download-link" title="Download PDF File">Download PDF file</a>'+
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
						 
						 //jQuery(".scwspd_right_item.active").children(".scwspd_right_item_main").children("img").css("opacity", "1");
						 //jQuery(".smartcms_content_right").css("opacity", "1");
						 jQuery(".scwspd_right_item_add").hide();
						 
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
			},
		  width: 510,
		  height: 500
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