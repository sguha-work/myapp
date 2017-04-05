<?php
header('Access-Control-Allow-Origin: *');
require_once('common/database.php');

$databaseObject = new DataBase;
$postData = $_POST;
$data = $postData['data'];

$userEmail = $data["email"];
$userMobileNumber = $data["mobileNumber"];
$userPassword = $data["password"];
$userName = $data["name"]["fullName"];
$otpVerified = ($data["otp"]["verfied"])?1:0;
$deviceId = $data["deviceId"];
$otpVerifiedOn = "";

function getLastUserId() {
    global $databaseObject;
    $query = "SELECT MAX(User_Id) FROM User";
    $rows = $databaseObject->executeQuery($query);
    $id = 0;
    if(sizeof($rows)) {
        $id = intval($rows[0]['User_Id']);
    } else {
        $id = 1;
    }
    return $id;
}

$userId = getLastUserId() + 1;

$query = "INSERT INTO User VALUES (".$userId.", \"".$databaseObject->escapeString($userEmail)."\", \"".$databaseObject->escapeString($userMobileNumber)."\",\"".$databaseObject->escapeString($userPassword)."\", \"".$databaseObject->escapeString($userName)."\", ".$otpVerified.", \"".$deviceId."\")";
try {
    $databaseObject->executeQuery($query);
    echo "{status:\"success\"}";die();
} catch (Exception $e) {
    echo "{status:\"".$e."\"}";die();
}


?>