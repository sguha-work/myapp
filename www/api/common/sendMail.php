<?php
require_once('lib/PHPMailer/PHPMailerAutoload.php');
class EmailSpark
{
    private $header="";
    function __construct($replyToEmail="") {
                
    }
    public function sendEmail($to,$subject,$body) {
        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth= true;
        $mail->Port = 465; // Or 587
        $mail->Username= 'goesonlife.com@gmail.com';
        $mail->Password= 'mypassword';
        $mail->SMTPSecure = 'ssl';
        $mail->From = 'goesonlife.com@gmail.com';
        $mail->FromName= 'LIFE';
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->addAddress($to);
        if(!$mail->send()){
            return false;
        }else{
            return true;
        }
        
    }
}
?>