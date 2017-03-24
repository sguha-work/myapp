<?php
header('Access-Control-Allow-Origin: *');
require_once('common/database.php');

$databaseObject = new DataBase;

$data = $_POST['data'];

$userEmail = $data["email"];
$userMobileNumber = $data["mobileNumber"];
$userPassword = $data["password"];
$userName = $data["name"]["fullName"];
$otpVerified = $data["otp"]["verfied"];
$otpVerifiedOn = "";

function getLastUserId() {
    $query = "SELECT MAX(User_Id) FROM User";
    $resultSet = $databaseObject->executeQuery($query);
    $row = $resultSet->fetchArray(MYSQLI_ASSOC);
    $resultSet->free();
    $id = intval($row['User_Id']);
    return $id;
}

$userId = getLastUserId() + 1;

$query = "INSERT INTO User VALUES (".$userId.", \"".$databaseObject->escapeString($userEmail)."\", \"".$databaseObject->escapeString($userMobileNumber)."\",\"".$databaseObject->escapeString($password)."\" \"".$databaseObject->escapeString($userName)."\", \"".$otpVerified."\")";
try {
    $databaseObject->executeQuery($query);
    echo "{status:\"success\"}";die();
} catch (Exception $e) {
    echo "{status:\"".$e."\"}";die();
}


?>