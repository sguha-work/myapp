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
$otpVerified = $data["otp"]["verfied"];
$otpVerifiedOn = "";

function getLastUserId() {
    global $databaseObject;
    $query = "SELECT MAX(User_Id) FROM User";
    $resultSet = $databaseObject->executeQuery($query);
    $id = 0;
    if($resultSet) {
        $row = $resultSet->fetchArray(MYSQLI_ASSOC);
        $resultSet->free();
        $id = intval($row['User_Id']);
    } else {
        $id = 1;
    }
    return $id;
}

$userId = getLastUserId() + 1;

$query = "INSERT INTO User VALUES (".$userId.", \"".$databaseObject->escapeString($userEmail)."\", \"".$databaseObject->escapeString($userMobileNumber)."\",\"".$databaseObject->escapeString($userPassword)."\" \"".$databaseObject->escapeString($userName)."\", \"".$otpVerified."\")";
try {
    $databaseObject->executeQuery($query);
    echo "{status:\"success\"}";die();
} catch (Exception $e) {
    echo "{status:\"".$e."\"}";die();
}


?>