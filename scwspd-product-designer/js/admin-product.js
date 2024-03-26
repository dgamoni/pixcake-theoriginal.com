// pattern
jQuery(document).ready(function(){
	var proId = jQuery(".scwspd_product_id").val();

	jQuery(".scwspd_upload_add_upload_pattern").click(function(){
		var file_frame;

		if ( file_frame ) {
			file_frame.open();
			return;
		}
		file_frame = wp.media.frames.file_frame = wp.media({
			title: jQuery( this ).data( 'uploader_title_pattern' ),
			button: {
				text: jQuery( this ).data( 'uploader_button_text' ),
			}
		});

		file_frame.on( 'select', function() {
			attachment = file_frame.state().get('selection').first().toJSON();
			jQuery( '.scwspd_upload_add_image_pattern' ).val(attachment.url);
		});

		file_frame.open();
	});
	////////////////////	

	jQuery(".scwspd_upload_add_button_pattern").click(function(){
		var title = jQuery(".scwspd_upload_add_title_pattern").val();
		var url = jQuery(".scwspd_upload_add_image_pattern").val();
		var color = jQuery(".scwspd_upload_add_color_pattern").val();
		
		jQuery.ajax({
			url: "../wp-content/plugins/scwspd-product-designer/helper.php",
			data: {
				proId : proId,
				title: title,
				url: url,
				color: color,
				task: "add_image_pattern"
			},
			type: 'POST',
			beforeSend: function(e){
				jQuery(".scwspd_upload_add_pattern").css("opacity", "0.5");
			},
			success: function(data){
				jQuery(".scwspd_upload_add_pattern").css("opacity", "1");
				if(data == "1")
					location.reload();
				else
					alert(data);
			}
		});
	});
	////////////////////

	jQuery( '.scwspd_images_item_pattern' ).each(function(){
		var elthis = jQuery(this);
		
		var file_frame;
		elthis.children( '.scwspd_images_item_upload_pattern' ).on( 'click', function( event ) {
			event.preventDefault();
			if ( file_frame ) {
				file_frame.open();
				return;
			}
			file_frame = wp.media.frames.file_frame = wp.media({
				title: jQuery( this ).data( 'uploader_title' ),
				button: {
					text: jQuery( this ).data( 'uploader_button_text' ),
				}
			});

			file_frame.on( 'select', function() {
				attachment = file_frame.state().get('selection').first().toJSON();
				elthis.children( '.scwspd_images_item_image_pattern' ).val(attachment.url);
			});

			file_frame.open();
		});
		

		/////
		elthis.children(".scwspd_images_item_save_pattern").click(function(){
			var id = elthis.children(".scwspd_images_item_id_pattern").val();
			var color = elthis.children(".scwspd_images_item_color_pattern").val();
			var title = elthis.children(".scwspd_images_item_title_pattern").val();
			var url = elthis.children(".scwspd_images_item_image_pattern").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					title: title,
					url: url,
					color: color,
					task: "save_image_pattern"
				},
				type: 'POST',
				beforeSend: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1"){
						alert("Saved!");
						elthis.children(".scwspd_images_item_preview_pattern").attr("src", url);
					}
					else
						alert("Error!");
				}
			});
		});
		/////
		elthis.children(".scwspd_images_item_delete_pattern").click(function(){
			var r = confirm("This item will be removed, are you sure?");
			if(r == true){
				var id = elthis.children(".scwspd_images_item_id_pattern").val();
			
				jQuery.ajax({
					url: "../wp-content/plugins/scwspd-product-designer/helper.php",
					data: {
						id: id,
						task: "delete_image_pattern"
					},
					type: 'POST',
					beforeSend: function(e){
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
			}else{
				return false;
			}
		});
	});
	//////////////////

	// graphics

	jQuery(".scwspd_upload_add_upload_graphics").click(function(){
		var file_frame;

		if ( file_frame ) {
			file_frame.open();
			return;
		}
		file_frame = wp.media.frames.file_frame = wp.media({
			title: jQuery( this ).data( 'uploader_title_graphics' ),
			button: {
				text: jQuery( this ).data( 'uploader_button_text' ),
			}
		});

		file_frame.on( 'select', function() {
			attachment = file_frame.state().get('selection').first().toJSON();
			jQuery( '.scwspd_upload_add_image_graphics' ).val(attachment.url);
		});

		file_frame.open();
	});

	jQuery(".scwspd_upload_add_button_graphics").click(function(){
		var title = jQuery(".scwspd_upload_add_title_graphics").val();
		var url = jQuery(".scwspd_upload_add_image_graphics").val();
		var color = jQuery(".scwspd_upload_add_color_graphics").val();
		
		jQuery.ajax({
			url: "../wp-content/plugins/scwspd-product-designer/helper.php",
			data: {
				proId : proId,
				title: title,
				url: url,
				color: color,
				task: "add_image_graphics"
			},
			type: 'POST',
			beforeSend: function(e){
				jQuery(".scwspd_upload_add_graphics").css("opacity", "0.5");
			},
			success: function(data){
				jQuery(".scwspd_upload_add_graphics").css("opacity", "1");
				if(data == "1")
					location.reload();
				else
					alert(data);
			}
		});
	});

	jQuery( '.scwspd_images_item_graphics' ).each(function(){
		var elthis = jQuery(this);
		
		var file_frame;
		elthis.children( '.scwspd_images_item_upload_graphics' ).on( 'click', function( event ) {
			event.preventDefault();
			if ( file_frame ) {
				file_frame.open();
				return;
			}
			file_frame = wp.media.frames.file_frame = wp.media({
				title: jQuery( this ).data( 'uploader_title' ),
				button: {
					text: jQuery( this ).data( 'uploader_button_text' ),
				}
			});

			file_frame.on( 'select', function() {
				attachment = file_frame.state().get('selection').first().toJSON();
				elthis.children( '.scwspd_images_item_image_graphics' ).val(attachment.url);
			});

			file_frame.open();
		});
		

		/////
		elthis.children(".scwspd_images_item_save_graphics").click(function(){
			var id = elthis.children(".scwspd_images_item_id_graphics").val();
			var color = elthis.children(".scwspd_images_item_color_graphics").val();
			var title = elthis.children(".scwspd_images_item_title_graphics").val();
			var url = elthis.children(".scwspd_images_item_image_graphics").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					title: title,
					url: url,
					color: color,
					task: "save_image_graphics"
				},
				type: 'POST',
				beforeSend: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1"){
						alert("Saved!");
						elthis.children(".scwspd_images_item_preview_graphics").attr("src", url);
					}
					else
						alert("Error!");
				}
			});
		});
		/////
		elthis.children(".scwspd_images_item_delete_graphics").click(function(){
			var r = confirm("This item will be removed, are you sure?");
			if(r == true){
				var id = elthis.children(".scwspd_images_item_id_graphics").val();
			
				jQuery.ajax({
					url: "../wp-content/plugins/scwspd-product-designer/helper.php",
					data: {
						id: id,
						task: "delete_image_graphics"
					},
					type: 'POST',
					beforeSend: function(e){
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
			}else{
				return false;
			}
		});
	});

	// text

		jQuery(".scwspd_images_item_save_text_def").click(function(){
				var id = jQuery("#def_text .scwspd_images_item_id_text").val();
				var title = jQuery("#def_text .scwspd_upload_add_title_text").val();
				var table_id = jQuery("#def_text .scwspd_images_item_id_text").attr('table_id');
				console.log(id);
				console.log(title);

			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					title: title,
					table_id: table_id,
					task: "save_text_def"
				},
				type: 'POST',
				beforeSend: function(e){
					//elthis.css("opacity", "0.5");
				},
				success: function(data){
					console.log(data);
					//elthis.css("opacity", "1");
					if(data == "1"){
						alert("Saved!");
						//jQuery("#def_text .scwspd_upload_add_title_text").val(title);
					}
					else
						jQuery("#def_text .scwspd_images_item_id_text").attr('table_id', data);
						alert("Create!");
				}
			});


		});


	jQuery(".scwspd_upload_add_button_text").click(function(){
		var title = jQuery(".scwspd_upload_add_title_text").val();
		var url = jQuery(".scwspd_upload_add_image_text").val();
		var color = jQuery(".scwspd_upload_add_color_text").val();
		
		jQuery.ajax({
			url: "../wp-content/plugins/scwspd-product-designer/helper.php",
			data: {
				proId : proId,
				title: title,
				url: url,
				color: color,
				task: "add_image_text"
			},
			type: 'POST',
			beforeSend: function(e){
				jQuery(".scwspd_upload_add_text").css("opacity", "0.5");
			},
			success: function(data){
				jQuery(".scwspd_upload_add_text").css("opacity", "1");
				if(data == "1")
					location.reload();
				else
					alert(data);
			}
		});
	});

	jQuery( '.scwspd_images_item_text' ).each(function(){
		var elthis = jQuery(this);
		
		var file_frame;
		

		/////
		elthis.children(".scwspd_images_item_save_text").click(function(){
			var id = elthis.children(".scwspd_images_item_id_text").val();
			var color = elthis.children(".scwspd_images_item_color_text").val();
			var title = elthis.children(".scwspd_images_item_title_text").val();
			var url = elthis.children(".scwspd_images_item_image_text").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					title: title,
					url: url,
					color: color,
					task: "save_image_text"
				},
				type: 'POST',
				beforeSend: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1"){
						alert("Saved!");
						//elthis.children(".scwspd_images_item_preview_text").attr("src", url);
					}
					else
						alert("Error!");
				}
			});
		});
		/////
		elthis.children(".scwspd_images_item_delete_text").click(function(){
			var r = confirm("This item will be removed, are you sure?");
			if(r == true){
				var id = elthis.children(".scwspd_images_item_id_text").val();
			
				jQuery.ajax({
					url: "../wp-content/plugins/scwspd-product-designer/helper.php",
					data: {
						id: id,
						task: "delete_image_text"
					},
					type: 'POST',
					beforeSend: function(e){
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
			}else{
				return false;
			}
		});
	});

});


// bg
jQuery(document).ready(function(){
	var proId = jQuery(".scwspd_product_id").val();


	
	jQuery(".scwspd_upload_add_upload").click(function(){
		var file_frame;

		if ( file_frame ) {
			file_frame.open();
			return;
		}
		file_frame = wp.media.frames.file_frame = wp.media({
			title: jQuery( this ).data( 'uploader_title' ),
			button: {
				text: jQuery( this ).data( 'uploader_button_text' ),
			}
		});

		file_frame.on( 'select', function() {
			attachment = file_frame.state().get('selection').first().toJSON();
			jQuery( '.scwspd_upload_add_image' ).val(attachment.url);
		});

		file_frame.open();
	});
	////////////////////
	
	jQuery(".scwspd_upload_add_button").click(function(){
		var title = jQuery(".scwspd_upload_add_title").val();
		var url = jQuery(".scwspd_upload_add_image").val();
		var color = jQuery(".scwspd_upload_add_color").val();
		
		jQuery.ajax({
			url: "../wp-content/plugins/scwspd-product-designer/helper.php",
			data: {
				proId : proId,
				title: title,
				url: url,
				color: color,
				task: "add_image"
			},
			type: 'POST',
			beforeSend: function(e){
				jQuery(".scwspd_upload_add").css("opacity", "0.5");
			},
			success: function(data){
				jQuery(".scwspd_upload_add").css("opacity", "1");
				if(data == "1")
					location.reload();
				else
					alert(data);
			}
		});
	});
	/////////////////////

	jQuery( '.scwspd_images_item' ).each(function(){
		var elthis = jQuery(this);
		
		var file_frame;
		elthis.children( '.scwspd_images_item_upload' ).on( 'click', function( event ) {
			event.preventDefault();
			if ( file_frame ) {
				file_frame.open();
				return;
			}
			file_frame = wp.media.frames.file_frame = wp.media({
				title: jQuery( this ).data( 'uploader_title' ),
				button: {
					text: jQuery( this ).data( 'uploader_button_text' ),
				}
			});

			file_frame.on( 'select', function() {
				attachment = file_frame.state().get('selection').first().toJSON();
				elthis.children( '.scwspd_images_item_image' ).val(attachment.url);
			});

			file_frame.open();
		});
		

		/////
		elthis.children(".scwspd_images_item_save").click(function(){
			var id = elthis.children(".scwspd_images_item_id").val();
			var color = elthis.children(".scwspd_images_item_color").val();
			var title = elthis.children(".scwspd_images_item_title").val();
			var url = elthis.children(".scwspd_images_item_image").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					title: title,
					url: url,
					color: color,
					task: "save_image"
				},
				type: 'POST',
				beforeSend: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1"){
						alert("Saved!");
						elthis.children(".scwspd_images_item_preview").attr("src", url);
					}
					else
						alert("Error!");
				}
			});
		});
		/////
		elthis.children(".scwspd_images_item_delete").click(function(){
			var r = confirm("This item will be removed, are you sure?");
			if(r == true){
				var id = elthis.children(".scwspd_images_item_id").val();
			
				jQuery.ajax({
					url: "../wp-content/plugins/scwspd-product-designer/helper.php",
					data: {
						id: id,
						task: "delete_image"
					},
					type: 'POST',
					beforeSend: function(e){
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
			}else{
				return false;
			}
		});
	});
	
	///////////////////////
	jQuery(".scwspd_qtymanage_add_button").click(function(){
		var label = jQuery(".scwspd_qtymanage_add_label").val();
		var price = jQuery(".scwspd_qtymanage_add_price").val();
		
		jQuery.ajax({
			url: "../wp-content/plugins/scwspd-product-designer/helper.php",
			data: {
				proId: proId,
				label: label,
				price: price,
				task: "add_qty"
			},
			type: 'POST',
			beforeSend: function(e){
				jQuery(".scwspd_qtymanage_add").css("opacity", "0.5");
			},
			success: function(data){
				jQuery(".scwspd_qtymanage_add").css("opacity", "1");
				if(data == "1")
					location.reload();
				else
					alert("Error!");
			}
		});
	});
	
	///////////////
	jQuery(".scwspd_qtymanage_item").each(function(){
		var elthis = jQuery(this);
		
		elthis.children(".scwspd_qtymanage_item_save").click(function(){
			var id = elthis.children(".scwspd_qtymanage_item_id").val();
			var label = elthis.children(".scwspd_qtymanage_item_label").val();
			var price = elthis.children(".scwspd_qtymanage_item_price").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					label: label,
					price: price,
					task: "save_qty"
				},
				type: 'POST',
				beforeSend: function(e){
					elthis.css("opacity", "0.5");
				},
				success: function(data){
					elthis.css("opacity", "1");
					if(data == "1")
						alert("Saved!");
					else
						alert("Error!");
				}
			});
		});
		////
		elthis.children(".scwspd_qtymanage_item_delete").click(function(){
			var id = elthis.children(".scwspd_qtymanage_item_id").val();
			
			jQuery.ajax({
				url: "../wp-content/plugins/scwspd-product-designer/helper.php",
				data: {
					id: id,
					task: "delete_qty"
				},
				type: 'POST',
				beforeSend: function(e){
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