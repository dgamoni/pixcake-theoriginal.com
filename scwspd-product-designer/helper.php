<?php

if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(dirname(dirname(dirname(__FILE__)))) . '/');
require_once(ABSPATH . 'wp-config.php');
global $wpdb;

$task = $_POST["task"];

if($task == "add_image"){
	$proId = $_POST["proId"];
	$title = $_POST["title"];
	$url = $_POST["url"];
	$color = $_POST["color"];
	
	$tableName = $wpdb->prefix . 'scwspd_images';
	$rs = $wpdb->get_results("SELECT * from $tableName where proId = '".$proId."' and url = '".$url."' and color = '".$color."'");
	
	if($rs){
		echo "This image already exists!";
	}else{
		echo $wpdb->insert( $tableName,
			array( 
				'proId' => $proId,
				'title' => $title,
				'url' => $url,
				'color' => $color
		));
	}

}elseif($task == "add_image_pattern"){
	$proId = $_POST["proId"];
	$title = $_POST["title"];
	$url = $_POST["url"];
	$color = $_POST["color"];
	
	$tableName = $wpdb->prefix . 'scwspd_images_pattern';
	$rs = $wpdb->get_results("SELECT * from $tableName where proId = '".$proId."' and url = '".$url."' and color = '".$color."'");
	
	if($rs){
		echo "This image already exists!";
	}else{
		echo $wpdb->insert( $tableName,
			array( 
				'proId' => $proId,
				'title' => $title,
				'url' => $url,
				'color' => $color
		));
	}


}elseif($task == "save_image"){
	$id = $_POST["id"];
	$title = $_POST["title"];
	$url = $_POST["url"];
	$color = $_POST["color"];
	
	$tableName = $wpdb->prefix . 'scwspd_images';
	echo $wpdb->update($tableName, array(
		'title' => $title,
		'url' => $url,
		'color' => $color
	),array(
		'ID' => $id
	));

}elseif($task == "save_image_pattern"){
	$id = $_POST["id"];
	$title = $_POST["title"];
	$url = $_POST["url"];
	$color = $_POST["color"];
	
	$tableName = $wpdb->prefix . 'scwspd_images_pattern';
	echo $wpdb->update($tableName, array(
		'title' => $title,
		'url' => $url,
		'color' => $color
	),array(
		'ID' => $id
	));

}elseif($task == "delete_image"){
	$id = $_POST["id"];
	
	$tableName = $wpdb->prefix . 'scwspd_images';
	echo $wpdb->delete( $tableName, array(
		'ID' => $id
	));

}elseif($task == "delete_image_pattern"){
	$id = $_POST["id"];
	
	$tableName = $wpdb->prefix . 'scwspd_images_pattern';
	echo $wpdb->delete( $tableName, array(
		'ID' => $id
	));

}elseif($task == "save_preview"){
	$proid = $_POST["proid"];
	$dulieu = $_POST["dulieu"];
	
	if(isset($_SESSION["scwspdimages".$proid])){
		$s = $_SESSION["scwspdimages".$proid]."$".$dulieu;
		$_SESSION["scwspdimages".$proid] = $s;
	}else
		$_SESSION["scwspdimages".$proid] = $dulieu;

}elseif($task == "delete_preview"){
	$proid = $_POST["proid"];
	$title = $_POST["title"];
	$color = $_POST["color"];
	$imgs = $_POST["imgs"];
	
	$newArr = "";
	if(isset($_SESSION["scwspdimages".$proid])){
		$scwspdimages = explode("$", $_SESSION["scwspdimages".$proid]);
		foreach($scwspdimages as $img){
			if($img){
				$checkImg = explode("@", $img);
				$dataimages = $checkImg[0];
				$ccolor = $checkImg[1];
				$ctitle = $checkImg[3];
				
				if($title == $ctitle && $color == $ccolor){
					$checkdataimages = explode("#", $dataimages);
					$imgs = explode("#", $imgs);
					
					$checkImgArr = ($checkdataimages == $imgs);
					if($checkImgArr){
						$a = 1;
					}else{
						$newArr .= "$".$img;
					}
				}else{
					$newArr .= "$".$img;
				}
			}
		}
	}
	echo 1;
	$_SESSION["scwspdimages".$proid] = $newArr;
	
}elseif($task == "add_qty"){
	$proId = $_POST["proId"];
	$label = $_POST["label"];
	$price = $_POST["price"];
	
	$tableName = $wpdb->prefix . 'scwspd_quantity';
	$rs = $wpdb->get_results("SELECT * from $tableName where proId = '".$proId."' and label = '".$label."'");
	
	if($rs){
		echo "This image already exists!";
	}else{
		echo $wpdb->insert( $tableName,
			array( 
				'proId' => $proId,
				'label' => $label,
				'price' => $price
		));
	}
}elseif($task == "save_qty"){
	$id = $_POST["id"];
	$label = $_POST["label"];
	$price = $_POST["price"];
	
	$tableName = $wpdb->prefix . 'scwspd_quantity';
	echo $wpdb->update($tableName, array(
		'label' => $label,
		'price' => $price
	),array(
		'ID' => $id
	));
}elseif($task == "delete_qty"){
	$id = $_POST["id"];
	
	$tableName = $wpdb->prefix . 'scwspd_quantity';
	echo $wpdb->delete( $tableName, array(
		'ID' => $id
	));
}