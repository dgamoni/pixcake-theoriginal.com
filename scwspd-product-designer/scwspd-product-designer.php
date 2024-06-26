<?php
/**
* Plugin Name: Simple Product Designer
* Plugin URI: http://codecanyon.net/user/smartcms
* Description: Allow clients design directly on product page for pixcake-theoriginal.com
* Version: 99.0
* Author: SmartCms Team
* Author URI: http://codecanyon.net/user/smartcms
* License: GPLv2 or later
*/
 
define ( 'SMARTCMS_SCWSPD_URL', plugin_dir_url(__FILE__));



function scwspd_boot_session() {
  session_start();
}
add_action('wp_loaded','scwspd_boot_session');

register_activation_hook(__FILE__, 'smartcms_scwspd_install');
global $wnm_db_version;
$wnm_db_version = "1.0";

function smartcms_scwspd_install(){
	global $wpdb;
	global $wnm_db_version;
	
	$table_name = $wpdb->prefix . 'scwspd_images';
	$table_name_pattern = $wpdb->prefix . 'scwspd_images_pattern';
	$table_name_graphics = $wpdb->prefix . 'scwspd_images_graphics';
	$table_name_text = $wpdb->prefix . 'scwspd_images_text';

	$table_name2 = $wpdb->prefix . 'scwspd_quantity';
	$table_name3 = $wpdb->prefix . 'scwspd_order';

	
	$sql = "CREATE TABLE $table_name (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`title` varchar(255) DEFAULT NULL,
		`url` varchar(255) DEFAULT NULL,
		`color` varchar(255) DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";

	$sql_pattern = "CREATE TABLE $table_name_pattern (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`title` varchar(255) DEFAULT NULL,
		`url` varchar(255) DEFAULT NULL,
		`color` varchar(255) DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";

	$sql_graphics = "CREATE TABLE $table_name_graphics (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`title` varchar(255) DEFAULT NULL,
		`url` varchar(255) DEFAULT NULL,
		`color` varchar(255) DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";

	$sql_text = "CREATE TABLE $table_name_text (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`title` varchar(255) DEFAULT NULL,
		`url` varchar(255) DEFAULT NULL,
		`color` varchar(255) DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";

	$sql2 = "CREATE TABLE $table_name2 (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`label` varchar(255) DEFAULT NULL,
		`price` varchar(255) DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";
	
	$sql3 = "CREATE TABLE $table_name3 (
		`ID` int(11) NOT NULL AUTO_INCREMENT,
		`proId` int(11) DEFAULT NULL,
		`orderId` varchar(255) DEFAULT NULL,
		`data` longtext DEFAULT NULL,
		PRIMARY KEY (`id`)
	) $charset_collate;";
	
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	dbDelta($sql);
	dbDelta($sql2);
	dbDelta($sql3);
	dbDelta($sql_pattern);
	dbDelta($sql_graphics);
	dbDelta($sql_text);


	
	add_option("wnm_db_version", $wnm_db_version);
}

add_action( 'widgets_init', 'smartcms_scwspd_widgets' );
add_action( 'plugins_loaded', 'smartcms_scwspd_load' );

function smartcms_scwspd_widgets() {
	register_widget('scwspd_class');
}

function smartcms_scwspd_load() {
    global $mfpd;
    $mfpd = new scwspd_class();
}

class scwspd_class extends WP_Widget {
	function __construct() {
		parent::__construct (
			  'smartcms_scwspd_id',
			  'SmartCms Simple Product Designer',
			  array(
				  'description' => ''
			  )
		);
		//add_shortcode( 'scweb_list_events' , array(&$this, 'scweb_list_events_func') );
		//add_shortcode( 'smartcms_scwaff_shortcode_manage' , array(&$this, 'smartcms_scwaff_shortcode_manage_func') );
		add_action( 'add_meta_boxes', array( $this, 'scwspd_add_tab_admin_product' ), 10, 2 );
	}
	function scwspd_add_tab_admin_product($post_type, $post)
	{
		global $wp_meta_boxes;
		$wp_meta_boxes[ 'product' ][ 'normal' ][ 'core' ][ 'smartcms_scwspd' ][ 'title' ] = "Product Designer";
		$wp_meta_boxes[ 'product' ][ 'normal' ][ 'core' ][ 'smartcms_scwspd' ][ 'id' ] = "smartcms_scwspd";
		$wp_meta_boxes[ 'product' ][ 'normal' ][ 'core' ][ 'smartcms_scwspd' ][ 'callback' ] = "scwspd_add_tab_admin_product_display";
	}
}

add_action( 'scwspd_admin_init', 'scwspd_add_tab_admin_product_display' );
function scwspd_add_tab_admin_product_display(){
	global $wpdb;

	$postId = $_GET['post'];
	
	$tablePostName = $wpdb->prefix . 'posts';
	$checkType = $wpdb->get_results("SELECT post_type from $tablePostName where ID = ".$postId);
	$type = $checkType[0]->post_type;
	
	if($type == "product"){
		wp_register_script('scwspd-admin-script', SMARTCMS_SCWSPD_URL .'js/admin-product.js');
		wp_enqueue_script('scwspd-admin-script');
		wp_register_style('scwspd-admin-css', SMARTCMS_SCWSPD_URL .'css/admin-product.css');
		wp_enqueue_style('scwspd-admin-css');
		
		wp_enqueue_style('thickbox'); // call to media files in wp
		wp_enqueue_script('thickbox');
		wp_enqueue_script( 'media-upload'); 
		wp_enqueue_media();
	
		$tableImagesName = $wpdb->prefix . 'scwspd_images';
		$checkImages = $wpdb->get_results("SELECT * from $tableImagesName where proId = ".$postId);

		$tableImagesName_pattern = $wpdb->prefix . 'scwspd_images_pattern';
		$checkImages_pattern = $wpdb->get_results("SELECT * from $tableImagesName_pattern where proId = ".$postId);

		$tableImagesName_graphics = $wpdb->prefix . 'scwspd_images_graphics';
		$checkImages_graphics = $wpdb->get_results("SELECT * from $tableImagesName_graphics where proId = ".$postId);

		$tableImagesName_text = $wpdb->prefix . 'scwspd_images_text';
		$checkImages_text = $wpdb->get_results("SELECT * from $tableImagesName_text where proId = ".$postId);

		$tableQty = $wpdb->prefix . 'scwspd_quantity';
		$qtys = $wpdb->get_results("SELECT * from $tableQty where proId = ".$postId);
		?>
		<div class="smartcms_admin_page">
			<input type="hidden" class="scwspd_product_id" value="<?php echo $postId ?>">
			
			<!-- Background -->
			<div class="scwspd_upload">
				<span class="scwspd_upload_header">Background Color Manage</span>
				<div class="scwspd_upload_add">
					<input class="scwspd_upload_add_color" placeholder="Color" type="color">
					<input class="scwspd_upload_add_title" placeholder="Title">
					<input class="scwspd_upload_add_image">
					<span class="scwspd_upload_add_upload">Choose Image</span>
					<span class="scwspd_upload_add_button">Add</span>
				</div>
			</div>
			<div class="scwspd_images">
			<?php
			if($checkImages){
				foreach($checkImages as $image){
					?>
					<div class="scwspd_images_item">
						<input type="hidden" value="<?php echo $image->ID ?>" class="scwspd_images_item_id">
						<img src="<?php echo $image->url ?>" class="scwspd_images_item_preview">
						<input class="scwspd_images_item_color" type="color" value="<?php echo $image->color ?>" name="scwspd_images_item_color">
						<input class="scwspd_images_item_title" placeholder="Title" value="<?php echo $image->title ?>" name="scwspd_images_item_title">
						<input class="scwspd_images_item_image" value="<?php echo $image->url ?>" name="scwspd_images_item_image">
						<span class="scwspd_images_item_upload">Choose Image</span>
						<span class="scwspd_images_item_save">Save</span>
						<span class="scwspd_images_item_delete">Delete</span>
					</div>
					<?php
				}
			}
			?>
			</div>
			<!-- pattern -->
			<div class="scwspd_upload_pattern">
				<span class="scwspd_upload_header">Pattern Manage</span>
				<div class="scwspd_upload_add_pattern">
					<input class="scwspd_upload_add_color_pattern" placeholder="Color" type="color">
					<input class="scwspd_upload_add_title_pattern" placeholder="Title">
					<input class="scwspd_upload_add_image_pattern">
					<span class="scwspd_upload_add_upload_pattern">Choose Image</span>
					<span class="scwspd_upload_add_button_pattern">Add</span>
				</div>
			</div>
			<div class="scwspd_images_pattern">
			<?php
			if($checkImages_pattern){
				foreach($checkImages_pattern as $image){
					?>
					<div class="scwspd_images_item_pattern">
						<input type="hidden" value="<?php echo $image->ID ?>" class="scwspd_images_item_id_pattern">
						<img src="<?php echo $image->url ?>" class="scwspd_images_item_preview_pattern">
						<input class="scwspd_images_item_color_pattern" type="color" value="<?php echo $image->color ?>" name="scwspd_images_item_color">
						<input class="scwspd_images_item_title_pattern" placeholder="Title" value="<?php echo $image->title ?>" name="scwspd_images_item_title">
						<input class="scwspd_images_item_image_pattern" value="<?php echo $image->url ?>" name="scwspd_images_item_image">
						<span class="scwspd_images_item_upload_pattern">Choose Image</span>
						<span class="scwspd_images_item_save_pattern">Save</span>
						<span class="scwspd_images_item_delete_pattern">Delete</span>
					</div>
					<?php
				}
			}
			?>
			</div>

			<!-- graphics -->
			<div class="scwspd_upload_graphics">
				<span class="scwspd_upload_header">Graphics Manage</span>
				<div class="scwspd_upload_add_graphics">
					<input class="scwspd_upload_add_color_graphics" placeholder="Color" type="color">
					<input class="scwspd_upload_add_title_graphics" placeholder="Title">
					<input class="scwspd_upload_add_image_graphics">
					<span class="scwspd_upload_add_upload_graphics">Choose Image</span>
					<span class="scwspd_upload_add_button_graphics">Add</span>
				</div>
			</div>
			<div class="scwspd_images_graphics">
			<?php
			if($checkImages_graphics){
				foreach($checkImages_graphics as $image){
					?>
					<div class="scwspd_images_item_graphics">
						<input type="hidden" value="<?php echo $image->ID ?>" class="scwspd_images_item_id_graphics">
						<img src="<?php echo $image->url ?>" class="scwspd_images_item_preview_graphics">
						<input class="scwspd_images_item_color_graphics" type="color" value="<?php echo $image->color ?>" name="scwspd_images_item_color">
						<input class="scwspd_images_item_title_graphics" placeholder="Title" value="<?php echo $image->title ?>" name="scwspd_images_item_title">
						<input class="scwspd_images_item_image_graphics" value="<?php echo $image->url ?>" name="scwspd_images_item_image">
						<span class="scwspd_images_item_upload_graphics">Choose Image</span>
						<span class="scwspd_images_item_save_graphics">Save</span>
						<span class="scwspd_images_item_delete_graphics">Delete</span>
					</div>
					<?php
				}
			}
			?>
			</div>
			<!-- text -->

			<div class="scwspd_upload_text">
				<span class="scwspd_upload_header">Text Manage</span>
<!-- 				<div id="def_text" class="scwspd_upload_add_text">
					<input type="hidden" value="<?php echo $postId ?>" class="scwspd_images_item_id_text">
					<input class="scwspd_upload_add_title_text" placeholder="Title" value="Congratulations Mary">
					<span class="scwspd_images_item_save_text_def">Save</span>
				</div> -->
				<div class="scwspd_upload_add_text">
					<input class="scwspd_upload_add_color_text" placeholder="Color" type="color">
					<span class="scwspd_upload_add_button_text">Add Color</span>
				</div>
			</div>
			<div class="scwspd_images_text">
			<?php
			if($checkImages_text){
				foreach($checkImages_text as $image){
					?>
					<div class="scwspd_images_item_text">
						<input type="hidden" value="<?php echo $image->ID ?>" class="scwspd_images_item_id_text">
						<img src="<?php echo $image->url ?>" class="scwspd_images_item_preview_text">
						<input class="scwspd_images_item_color_text" type="color" value="<?php echo $image->color ?>" name="scwspd_images_item_color">
						<input class="scwspd_images_item_title_text" placeholder="Title" value="<?php echo $image->title ?>" name="scwspd_images_item_title">
						<input class="scwspd_images_item_image_text" value="<?php echo $image->url ?>" name="scwspd_images_item_image">
						<span class="scwspd_images_item_upload_text">Choose Image</span>
						<span class="scwspd_images_item_save_text">Save</span>
						<span class="scwspd_images_item_delete_text">Delete</span>
					</div>
					<?php
				}
			}
			?>
			</div>
			<!-- qty -->
			<div class="scwspd_qtymanage">
				<div class="scwspd_qtymanage_add">
					<span class="scwspd_qtymanage_add_header">Quantity Manage</span>
					<input class="scwspd_qtymanage_add_label" placeholder="Label">
					<input class="scwspd_qtymanage_add_price" placeholder="Price per Item">
					<span class="scwspd_qtymanage_add_button">Add</span>
				</div>
				<div class="scwspd_qtymanage_content">
				<?php
				if($qtys){
					foreach($qtys as $qty){
						?>
						<div class="scwspd_qtymanage_item">
							<input type="hidden" value="<?php echo $qty->ID ?>" class="scwspd_qtymanage_item_id">
							<input class="scwspd_qtymanage_item_label" name="scwspd_qtymanage_item_label" value="<?php echo $qty->label ?>">
							<input class="scwspd_qtymanage_item_price" name="scwspd_qtymanage_item_price" value="<?php echo $qty->price ?>">
							<span class="scwspd_qtymanage_item_save">Save</span>
							<span class="scwspd_qtymanage_item_delete">Delete</span>
						</div>
						<?php
					}
				}
				?>
				</div>
			</div>
		</div>
		<?php
	}
}

//add_action('woocommerce_after_single_product', 'smartcms_scwspd_fontend_single');
add_action('woocommerce_single_product_summary', 'smartcms_scwspd_fontend_single', 25);
function smartcms_scwspd_fontend_single(){
	global $product;
	global $wpdb;
	$proId = $product->id;
	
	$tableImages = $wpdb->prefix . 'scwspd_images';
	$images = $wpdb->get_results("SELECT * from $tableImages where proId = ".$proId);

	$tableImages_pattern = $wpdb->prefix . 'scwspd_images_pattern';
	$images_pattern = $wpdb->get_results("SELECT * from $tableImages_pattern where proId = ".$proId);

// graphics

	$tableImages_graphics = $wpdb->prefix . 'scwspd_images_graphics';
	$images_graphics = $wpdb->get_results("SELECT * from $tableImages_graphics where proId = ".$proId);

	$tableImages_text = $wpdb->prefix . 'scwspd_images_text';
	$images_text = $wpdb->get_results("SELECT * from $tableImages_text where proId = ".$proId);

	$tableQty = $wpdb->prefix . 'scwspd_quantity';
	$qtys = $wpdb->get_results("SELECT * from $tableQty where proId = ".$proId);
	
	global $woocommerce;
    $currency = get_woocommerce_currency_symbol();
	
	update_post_meta($proId, 'scwspd_images', '');

	if($images){
		


		update_post_meta($proId, 'scwspd_images', 'designer_enable');

		wp_register_script('scwspd-nicedit', SMARTCMS_SCWSPD_URL .'js/nicEdit.js');
		wp_enqueue_script('scwspd-nicedit');
		wp_register_script('scwspd-jqueryui', 'https://code.jquery.com/ui/1.11.1/jquery-ui.js');
		wp_enqueue_script('scwspd-jqueryui');
		
		wp_register_script('scwspd-colorbox-script', SMARTCMS_SCWSPD_URL .'colorbox/jquery.colorbox.js');
		wp_enqueue_script('scwspd-colorbox-script');
		wp_register_style('scwspd-style-colorbox', SMARTCMS_SCWSPD_URL .'colorbox/colorbox.css');
		wp_enqueue_style('scwspd-style-colorbox');
		
		wp_register_script('scwspd-html2canvas', SMARTCMS_SCWSPD_URL .'js/html2canvas.js');
		wp_enqueue_script('scwspd-html2canvas');

		wp_register_script('scwspd-jspdf', SMARTCMS_SCWSPD_URL .'js/jspdf.min.js');
		wp_enqueue_script('scwspd-jspdf');


		// wp_register_style('pretty-checkbox-css', SMARTCMS_SCWSPD_URL .'css/pretty-checkbox.min.css');
		// wp_enqueue_style('pretty-checkbox-css');

		// wp_register_script('slick_min_js', SMARTCMS_SCWSPD_URL .'js/slick.min.js');
		// wp_enqueue_script('slick_min_js');
		// wp_register_style('slick_css', SMARTCMS_SCWSPD_URL .'css/slick.css');
		// wp_enqueue_style('slick_css');

		wp_register_script('scwspd-script-frontend', SMARTCMS_SCWSPD_URL .'js/script.js');
		wp_enqueue_script('scwspd-script-frontend');
		wp_register_style('scwspd-style-frontend', SMARTCMS_SCWSPD_URL .'css/style.css');
		wp_enqueue_style('scwspd-style-frontend');

		$colors = array();
		foreach($images as $img){
			array_push($colors, $img->color);
		}
		$colors = array_unique($colors);
		$firstColor = "";

		$colors_pattern = array();
		foreach($images_pattern as $img_pattern){
			array_push($colors_pattern, $img_pattern->url);
		}
		$colors_pattern = array_unique($colors_pattern);
		$firstColor_pattern = "";
		//var_dump($colors_pattern);

		$colors_graphics = array();
		foreach($images_graphics as $img_graphics){
			array_push($colors_graphics, $img_graphics->url);
		}
		$colors_graphics = array_unique($colors_graphics);
		$firstColor_graphics = "";


		$colors_text = array();
		foreach($images_text as $img_text){
			array_push($colors_text, $img_text->color);
		}
		$colors_text = array_unique($colors_text);
		$firstColor_text = "";

		?>
		<div class="smartcms_navigate" data-pagenum="0">
			<span id="navigate_back">back</span>
			<span id="navigate_next">next</span>
		</div>
		<div class="smartcms_content" style="display:none">
			<input type="hidden" class="smartcms_url" value="<?php echo SMARTCMS_SCWSPD_URL ?>">
			<input type="hidden" class="smartcms_proid" value="<?php echo $proId ?>">
			<input type="hidden" class="smartcms_firstimage" value="">
			<input type="hidden" class="smartcms_pdf" value="">

			
			<div class="smartcms_content_left">
				<div class="scwspd_choose_color navigate_content navigate_content_0" data-content="0">
					<div class="scwspd_choose_color_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/color-icon.jpg">
						<span class="scwspd_header_text">Choose the background Color</span>
					</div>
					<div class="viewport">
						<?php
						foreach($colors as $key=>$color){
							if($key == 0) $firstColor = $color;
							?>
							<div class="scwspd_choose_color_item <?php if($key==0) echo 'active' ?>">
								<span style="background: <?php echo $color ?>"><?php echo $color ?></span>
							</div>
							<?php
						}
						?>
					</div>
				</div>
				
				<!-- pattern -->
				<div class="scwspd_choose_color_pattern  navigate_content navigate_content_1 content_hide" data-content="1">
					<div class="scwspd_choose_color_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/color-icon.jpg">
						<span class="scwspd_header_text">Choose the background pattern</span>
					</div>
					<div class="viewport">
						<?php
						foreach($colors_pattern as $key=>$color_pattern){
							if($key == 0) $firstColor_pattern = $color_pattern;
							?>
							<div class="scwspd_choose_color_item_pattern">
								<span data-pat="<?php echo $color_pattern; ?>" class="pattern_bg" style=" background: url(<?php echo $color_pattern; ?>);"><?php echo $color_pattern; ?></span>
							</div>
							<?php
						}
						?>
					</div>
				</div>

				<!-- graphics -->
				<div class="scwspd_choose_color_graphics navigate_content navigate_content_2 content_hide" data-content="2">
					<div class="scwspd_choose_color_header">
						<!-- <img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/color-icon.jpg"> -->
						<span class="scwspd_header_text">Add some graphics</span>
					</div>
					<!-- <div class="scwspd_choose_color_graphics_slick"> -->
					<div class="viewport">
						<?php
						foreach($colors_graphics as $key=>$color_graphics){
							if($key == 0) $firstColor_graphics = $color_graphics;
							?>
							<div class="scwspd_choose_color_item_graphics">
								<span data-pat="<?php echo $color_graphics; ?>" class="graphics_bg" style=" background: url(<?php echo $color_graphics; ?>);"><?php echo $color_graphics; ?></span>
							</div>
							<?php
						}
						?>
					</div>
					<!-- </div> -->
				</div>

				<!-- text -->
				<div class="scwspd_add_text navigate_content navigate_content_3 content_hide" data-content="3">
					<div class="scwspd_add_text_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/text-icon.jpg">
						<span class="scwspd_header_text">You can also add some text (max.40 characters)</span>
					</div>


					<div class="scwspd_add_text_content">
						<span class="scwspd_at_button">Add</span>
					</div>

				</div> 
				<div class="scwspd_add_text navigate_content navigate_content_4 content_hide" data-content="4">

					<div class="scwspd_choose_color_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/color-icon.jpg">
						<span class="scwspd_header_text">Now choose the text color</span>
					</div>
					<div class="viewport">
						<?php
						foreach($colors_text as $key=>$color){
							if($key == 0) $firstColor = $color;
							?>
							<div class="scwspd_choose_color_item_text ">
								<span style="background: <?php echo $color ?>"><?php echo $color ?></span>
							</div>
							<?php
						}
						?>
					</div>

				</div>

				<!-- pane -->

				<!-- end pane -->

<!-- 				<div class="scwspd_upload_image">

					<div class="scwspd_upload_image_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/image-icon.jpg">
						<span class="scwspd_header_text">Upload Images</span>
					</div>
					<div class="scwspd_upload_image_content">
						<span class="scwspd_uploadimage_button">Add Image</span>
					</div>



				</div> -->



				<?php if($qtys){ ?>
				<div class="scwspd_qty navigate_content navigate_content_5 content_hide" data-content="5">
					<div class="scwspd_qty_header">
						
						<span class="scwspd_header_text">Do you want matching postcards?</span>
						<div class="scwspd_header_text_descript scwspd_header_text_descript1">Size, material, how it’s printed...</div>
						<div class="scwspd_header_text_descript scwspd_header_text_descript2">1 pack - 16 postcards</div>
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/post_bg2.png">
					</div>
					<div class="scwspd_qty_content">
						<?php
						foreach($qtys as $key=>$qty){
							?>
							<div class="scwspd_qty_item">
  								<input class="checkbox scwspd_qty_item_radio" id="scwspd_qty_item_radio<?php echo $key ?>" type="radio" name="radio" <?php if($key==0) echo 'checked'; ?> >
								<input id="scwspd_qty_item<?php echo $key ?>" class="scwspd_qty_item_input" value="<?php echo $qty->price ?>">
								<label class="scwspd_qty_radio_label" for="scwspd_qty_item<?php echo $key ?>"><?php echo $qty->label ?></label>
							</div>
							<?php
						}
						?>
					</div>
				</div>
				<?php } ?>

				<div class="scwspd_preview_content navigate_content_6 content_hide" data-content="6">
					<!-- <span class="scwspd_preview_content_use">Render Design</span> -->
					<span class="scwspd_preview_content_use">Add to Basket</span>
						<?php 
							do_action('addcart_button_hook');
						?>
				</div>

				<div class="scwspd_preview">
<!-- 					<div class="scwspd_preview_header">
						<img class="scwspd_header_img" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/preview-icon.png">
						<span class="scwspd_header_text">Review</span>
					</div> -->

					<div class="scwspd_preview_content">
						<!-- <span class="scwspd_preview_content_use">Render Design</span> -->
					</div>
					
					<div class="scwspd_preview_items">
					<?php //unset($_SESSION["scwspdimages".$proId]);
//var_dump($_SESSION["scwspdimages".$proId]);
						if(isset($_SESSION["scwspdimages".$proId]) && $_SESSION["scwspdimages".$proId] !=""){
							$secimages = $_SESSION["scwspdimages".$proId];
							//var_dump( $secimages );
							$scwspdimages = explode("$", $secimages);

							


							//var_dump($scwspdimages);
							$_checkImg = explode("@", $scwspdimages[0]);
							//var_dump($_checkImg);
							foreach($scwspdimages as $img){
								$checkImg = explode("@", $img);
								$dataimages = $checkImg[0];
								$color = $checkImg[1];
								$qtys = $checkImg[2];
								$title = $checkImg[3];
								?>
								<div class="scwspd_preview_item">
									<div class="scwspd_preview_item_left">
										<div class="scwspd_preview_item_left_first">
											<!-- <span class="scwspd_preview_title"><?php echo $title ?></span> -->
											<!-- <span class="scwspd_preview_color" style="background: <?php echo $color ?>"><?php echo $color ?></span> -->
										</div>
										<div class="scwspd_preview_item_left_images">
											<?php
											$checkdataimages = explode("#", $dataimages);
											//var_dump($checkdataimages);
											foreach($checkdataimages as $img){
												if($img):

												?><a class="scwspd_group" href="<?php echo $img ?>"><img src="<?php echo $img ?>"></a><?php
												endif;
											}
											?>
										</div>
										<a href="<?php echo $color; ?>" target="_blank" id="pdf-download-link" title="Download PDF File">Download PDF file</a>
										<div class="scwspd_preview_item_left_quantity">
											<?php
											$checkQty = explode("&", $qtys);
											foreach($checkQty as $qty){
												$checkQ = str_replace("#", " - ", $qty);
												?><span class="scwspd_preview_qty"><?php echo $checkQ ?></span><?php
											}
											?>
										</div>
									</div>
									<div class="scwspd_preview_item_right">
										<img class="scwspd_delete_preview" src="<?php echo SMARTCMS_SCWSPD_URL ?>images/delete-icon.png">
									</div>
								</div>
								<?php
							}
						}
					?>
					</div>
				</div>
			</div>
			<div class="smartcms_content_right">
				<?php
				foreach($colors as $key=>$color){
					//if()
					?>
					<div class="scwspd_right_item <?php if($key==0) echo 'active' ?>">
					<?php
						$check = 0;
						foreach($images as $img){
							if($color == $img->color){
								if($check == 0){
									?>
									<div class="scwspd_right_item_main">
										<img src="<?php echo $img->url; ?>">
									</div>
									<?php
								}
								?>
<!-- 								<div class="scwspd_right_item_add <?php if($check==0) echo 'active' ?>">
									<img src="<?php echo $img->url; ?>"><br>
									<span><?php echo $img->title; ?></span>
								</div> -->
								<?php
								$check++;
							}
						}
					?>
					</div>
					<?php					
				}
				?>
			</div>
		</div>
		<?php
	}
}

function scwspd_product_image( $_product_img, $cart_item, $cart_item_key ){
	$proId = $cart_item["product_id"];
	
	wp_register_script('scwspd-colorbox-script', SMARTCMS_SCWSPD_URL .'colorbox/jquery.colorbox.js');
	wp_enqueue_script('scwspd-colorbox-script');
	wp_register_style('scwspd-style-colorbox', SMARTCMS_SCWSPD_URL .'colorbox/colorbox.css');
	wp_enqueue_style('scwspd-style-colorbox');
		
	wp_register_script('scwspd-cart-script', SMARTCMS_SCWSPD_URL .'js/cart.js');
	wp_enqueue_script('scwspd-cart-script');
	wp_register_style('scwspd-style-cart', SMARTCMS_SCWSPD_URL .'css/cart.css');
	wp_enqueue_style('scwspd-style-cart');
		
		global $woocommerce;
    $currency = get_woocommerce_currency_symbol();

	$designs = '';
	if(isset($_SESSION["scwspdimages".$proId])){
		$designs .= '<a class="scwspd_yourdesign">Your Design</a><br>';
		$secimages = $_SESSION["scwspdimages".$proId];
		$scwspdimages = explode("$", $secimages);
		foreach($scwspdimages as $img){
			$checkImg = explode("@", $img);
			$dataimages = $checkImg[0];
			$ccolor = $checkImg[1];
			$ctitle = $checkImg[3];
			$qtys = $checkImg[2];
			//var_dump($ctitle);
			
			$designs .= "<div class='scwspd_yourdesign_item'>";
			$checkdataimages = explode("#", $dataimages);
			//var_dump($checkdataimages);
			foreach($checkdataimages as $image){
				$cc = explode("data:", $image);
				//var_dump($cc[1]);
				if($image):
					$designs .= '<a class="scwspd_group" href="'.$image.'"><img src="'.$image.'"></a>';
				endif;
			}
			//$designs .= "<br><span class='scwspd_yourdesign_item_title'>".$ctitle."</span>";
			//$designs .= "<span class='scwspd_yourdesign_item_color' style='background: ".$ccolor."'>".$ccolor."</span>";
			$checkQtys = explode("&", $qtys);
			foreach($checkQtys as $qty){
				$designs .= "<span class='scwspd_yourdesign_item_qty'>Pack:". str_replace("#", " - ", $qty) .$currency."</span>";
			}
			$designs .= '</div>';
		}
	}
	
	
    $a = '<br>'.$designs;
    return $_product_img.$a;
}
add_filter( 'woocommerce_cart_item_thumbnail', 'scwspd_product_image', 10, 3 );

add_action( 'woocommerce_before_calculate_totals', 'scwspd_add_custom_price' );
function scwspd_add_custom_price( $cart_object ){
	global $wpdb;
	
	foreach( $cart_object->cart_contents as $key => $value ){
		$proId = $value['data']->id;
		
		if(isset($_SESSION["scwspdimages".$proId])){
			$secimages = $_SESSION["scwspdimages".$proId];
			$scwspdimages = explode("$", $secimages);
			foreach($scwspdimages as $img){
				$checkImg = explode("@", $img);
				
				$qtys = $checkImg[2];
				$checkQtys = explode("&", $qtys);
				foreach($checkQtys as $qty){
					$fqty = explode("#", $qty);
					$label = $fqty[0];
					$quantity = $fqty[1];
					
					$tableName = $wpdb->prefix . 'scwspd_quantity';
					$rs = $wpdb->get_results("SELECT * from $tableName where proId = '".$proId."' and label = '".$label."'");
					$price = $rs[0]->price + $quantity;
					
					//$value['data']->price += $price;
					$value['data']->price = $quantity;
				}
			}
			$value['data']->set_price( $value['data']->price );
		}
	}
}

add_filter( 'woocommerce_order_item_name', 'scwspd_order_complete' , 10, 2 );
function scwspd_order_complete( $link, $item ){
	global $wpdb;
	$proId = $item["product_id"];
	if(isset($_GET['key'])) {
		$order_key = $_GET['key'];
	}
	
	$designs = '';
	if($order_key && $proId){
		wp_register_script('scwspd-colorbox-script', SMARTCMS_SCWSPD_URL .'colorbox/jquery.colorbox.js');
		wp_enqueue_script('scwspd-colorbox-script');
		wp_register_style('scwspd-style-colorbox', SMARTCMS_SCWSPD_URL .'colorbox/colorbox.css');
		wp_enqueue_style('scwspd-style-colorbox');
			
		wp_register_script('scwspd-cart-script', SMARTCMS_SCWSPD_URL .'js/cart.js');
		wp_enqueue_script('scwspd-cart-script');
		wp_register_style('scwspd-style-order', SMARTCMS_SCWSPD_URL .'css/order.css');
		wp_enqueue_style('scwspd-style-order');
		
			global $woocommerce;
    $currency = get_woocommerce_currency_symbol();

		if(isset($_SESSION["scwspdimages".$proId])){
			$designs .= '<br><a class="scwspd_yourdesign">Your Design</a><br>';
			$secimages = $_SESSION["scwspdimages".$proId];
			$scwspdimages = explode("$", $secimages);
			foreach($scwspdimages as $img){
				$checkImg = explode("@", $img);
				$dataimages = $checkImg[0];
				$ccolor = $checkImg[1];
				$ctitle = $checkImg[3];
				$qtys = $checkImg[2];
				
				$designs .= "<div class='scwspd_yourdesign_item'>";
				$checkdataimages = explode("#", $dataimages);
				foreach($checkdataimages as $image){
					if($image):
						$designs .= '<a class="scwspd_group" href="'.$image.'"><img src="'.$image.'"></a>';
					endif;
				}
				$designs .= "<br><br><span class='scwspd_yourdesign_item_title'>".$ctitle."</span>";
				$designs .= "<span class='scwspd_yourdesign_item_color' style='background: ".$ccolor."'>".$ccolor."</span><br>";
				$checkQtys = explode("&", $qtys);
				foreach($checkQtys as $qty){
					$designs .= "<br><span class='scwspd_yourdesign_item_qty'>Pack:". str_replace("#", " - ", $qty) .$currency."</span>";
				}
				$designs .= '</div>';
			}
			
			$table_name = $wpdb->prefix . 'scwspd_order';
			$wpdb->insert( $table_name,
				array( 
					'proId' => $proId, 
					'orderId' => $order_key,
					'data' => $_SESSION["scwspdimages".$proId]
				) 
			);
		}
	}
	
	echo $link.$designs;
}

add_action( 'woocommerce_before_order_itemmeta', 'scwspd_admin_edit_order', 10, 3 );
function scwspd_admin_edit_order( $item_id, $item, $product ){
	global $wpdb;
	$proId = $product->id;
    $postId = $_GET['post'];
	
	$orderKeyTable = $wpdb->prefix . 'postmeta';
	$orderKeyRs = $wpdb->get_results("SELECT * from $orderKeyTable where post_id = ".$postId." and meta_key = '_order_key'");
	$orderKey = $orderKeyRs[0]->meta_value;
	
	$orderTable = $wpdb->prefix . 'scwspd_order';
	$orderdata = $wpdb->get_results("SELECT * from $orderTable where proId = ".$proId." and orderId = '".$orderKey."'");

	global $woocommerce;
    $currency = get_woocommerce_currency_symbol();

	$designs = "";
	$data = $orderdata[0]->data;
	if($data){
		wp_register_script('scwspd-colorbox-script', SMARTCMS_SCWSPD_URL .'colorbox/jquery.colorbox.js');
		wp_enqueue_script('scwspd-colorbox-script');
		wp_register_style('scwspd-style-colorbox', SMARTCMS_SCWSPD_URL .'colorbox/colorbox.css');
		wp_enqueue_style('scwspd-style-colorbox');
			
		wp_register_script('scwspd-cart-script', SMARTCMS_SCWSPD_URL .'js/cart.js');
		wp_enqueue_script('scwspd-cart-script');
		wp_register_style('scwspd-style-order', SMARTCMS_SCWSPD_URL .'css/order.css');
		wp_enqueue_style('scwspd-style-order');
		
		$scwspdimages = explode("$", $data);
		foreach($scwspdimages as $img){
			$checkImg = explode("@", $img);
			$dataimages = $checkImg[0];
			$ccolor = $checkImg[1];
			$ctitle = $checkImg[3];
			$qtys = $checkImg[2];
			
			//var_dump($checkImg);

			$designs .= "<div class='scwspd_yourdesign_item'>";
			$checkdataimages = explode("#", $dataimages);
			foreach($checkdataimages as $image){
				if($image):
					$designs .= '<a class="scwspd_group" href="'.$image.'"><img src="'.$image.'"></a>';
				endif;
			}
			$designs .='<a href="'.SMARTCMS_SCWSPD_URL.'upload/'.$ccolor.'" target="_blank" id="" title="PDF File">PDF file</a>';
			//$designs .= "<br><br><span class='scwspd_yourdesign_item_title'>".$ctitle."</span>";
			//$designs .= "<span class='scwspd_yourdesign_item_color' style='background: ".$ccolor."'>".$ccolor."</span><br>";
			$checkQtys = explode("&", $qtys);
			foreach($checkQtys as $qty){
				$designs .= "<br><span class='scwspd_yourdesign_item_qty'>Pack: ". str_replace("#", " - ", $qty) .$currency."</span>";
			}
			$designs .= '</div>';
		}
		echo $designs;
	}
}