
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