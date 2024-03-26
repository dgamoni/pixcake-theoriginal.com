<?php 

function design_title_hook() {
    	do_action('design_title_hook');
}

add_action( 'woocommerce_before_single_product', 'my_remove_variation_price' );
function my_remove_variation_price() {
  global $product;
  $scwspd_images = get_post_meta( $product->id, 'scwspd_images', true);
  if ( $scwspd_images == 'designer_enable' ) {

  	add_action( 'design_title_hook', 'woocommerce_template_single_title', 5 );
  	add_action( 'design_title_hook', 'woocommerce_template_single_price', 10 );


  	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_sharing', 50 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
  
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
	//remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
  	
  	add_action( 'woocommerce_before_single_product_summary', 'woocommerce_template_single_add_to_cart', 25 );
  }
} 


/* remove single product sidebar */
// function woocommerce_remove_sidebar_shop() {
//     if( is_product() )
//        remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );
// }
// add_action( 'template_redirect', 'woocommerce_remove_sidebar_shop' );

// remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

// helper
function is_design($product_id) {
  $scwspd_images = get_post_meta( $product_id, 'scwspd_images', true);
  if ( $scwspd_images == 'designer_enable' ) {
  	return true;
  } else {
  	return false;
  }
} 


add_filter( 'body_class','my_body_classes' );
function my_body_classes( $classes ) {
  global $product, $post;
  $scwspd_images = get_post_meta( $post->ID, 'scwspd_images', true);
  	if ( is_product() && $scwspd_images == 'designer_enable' ) {
        $classes[] = 'designer_enable';
    }
    return $classes;
}
