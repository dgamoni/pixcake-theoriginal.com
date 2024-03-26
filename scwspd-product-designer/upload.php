<?
// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
$proid = $_POST["proid"];
// decode it
$decodedData = base64_decode($data);
// print out the raw data, 
//echo ($decodedData);
$string = base64_encode(random_bytes(10));
$filename = $string."_generate.pdf";
echo $filename;
// write the data out to the file
$fp = fopen('upload/'.$filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);
?>