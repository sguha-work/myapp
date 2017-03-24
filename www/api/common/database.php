<?php
    class DataBase {
        
        private $host = "localhost";
        private $databaseName = "id1148597_life";
        private $userName = "id1148597_goesonlife";
        private $password = "wristwatch1988";
        private $MySQLiconn;

        function __construct() {
            
        }

        public function createConnection() {
            $this->MySQLiconn = new MySQLi($this->host,$this->userName,$this->password,$this->databaseName);
            if($this->MySQLiconn->connect_errno) {
                die("ERROR : -> ".$this->MySQLiconn->connect_error);
            }
        }

        public function destroyConnection() {
            $this->MySQLiconn->close();
        }

        public function escapeString($value) {
            return $this->MySQLiconn->real_escape_string($value);
        }

        public function escapeStringArray($values) {
            $index = 0;
            foreach($values as $value) {
                $value = $this->MySQLiconn->real_escape_string($value);
                $values[$index] = $value;
            }
            return $values;
        }

        public function executeQuery($query) {
            $this->createConnection();
            $recordSet = $this->MySQLiconn->query($query);
            $this->destroyConnection();
            return $recordSet;
        }
    }
?>