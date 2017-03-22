<?php

require_once('sendMail.php');

$email = new EmailSpark;
@$to = $_POST['to'];
@$subject = "Welcome to Life Your OTP is: ". $_POST['otp'];
@$body = "<b>Congratulations! Welcome to LIFE.</b></br><p>Use the following OTP to complete join process</p></br><b>".$_POST['otp']."</b>";
$result = $email->sendEmail($to, $subject, $body);
$response = "{status:'success'}";
if($result) {
    echo $response;
} else {
    echo $response = "{status:'failed'}";
}
?>