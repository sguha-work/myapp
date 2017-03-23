<?php
    class DataBase {
        
        private $host = "localhost";
        private $databaseName = "id1148597_life";
        private $userName = "id1148597_goesonlife";
        private $password = "wristwatch1988";
        
        function __construct() {
            $MySQLiconn = new MySQLi($host,$userName,$password,$databaseName);
            if($MySQLiconn->connect_errno) {
                die("ERROR : -> ".$MySQLiconn->connect_error);
            }
        }

        public function insertIntoDatabase($tableName, $attributeNames, $values) {
            $index = 0;
            foreach($values as $value) {
                
            }
        }
    }
?>