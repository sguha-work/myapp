<?php
class EmailSpark
{
    private $header="";
    function __construct($replyToEmail="") {
                
    }
    public function sendEmail($to="",$subject="",$body="") {
        if($to!="") {   
            $headers = array(
                'From' => $from,
                'To' => $to,
                'Subject' => $subject
            );
            $smtp = Mail::factory('smtp', array(
                'host' => 'ssl://smtp.gmail.com',
                'port' => '465',
                'auth' => true,
                'username' => 'goesonlife.com@gmail.com',
                'password' => 'mypassword'
            ));
            $mail = $smtp->send($to, $headers, $body);
            if (PEAR::isError($mail)) {
                return false;
            } else {
                return true;
            }
        }
        
    }
}
?>