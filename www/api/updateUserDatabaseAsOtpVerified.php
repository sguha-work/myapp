<?php
    header('Access-Control-Allow-Origin: *');
    require_once('common/database.php');
    $databaseObject = new DataBase;
    $postData = $_POST;
    $data = $postData['data'];
    $userEmail = $data["email"];
    $query = "UPDATE User SET User_verified = 1 WHERE User_email=\""+ $userEmail +"\"";
    try {
        $databaseObject->executeQuery($query);
        echo "{status:\"success\"}";die();
    } catch (Exception $e) {
        echo "{status:\"".$e."\"}";die();
    }
?>