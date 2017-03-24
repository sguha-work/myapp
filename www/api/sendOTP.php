<?php
header('Access-Control-Allow-Origin: *');
require_once('common/sendMail.php');

$email = new EmailSpark;
@$to = $_POST['to'];
@$subject = $_POST['subject'];
@$body = $_POST['body'];
$result = $email->sendEmail($to, $subject, $body);
$response = "{\"status\":\"success\"}";
if($result) {
    echo $response;
} else {
    echo $response = "{\"status\":\"failed\"}";
}
die();
?>