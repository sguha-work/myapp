<?php
    class DataBase {
        
        private $host = "localhost";
        private $databaseName = "id1148597_life";
        private $userName = "id1148597_goesonlife";
        private $password = "wristwatch1988";
        private $MySQLiconn;

        function __construct() {
            $this->MySQLiconn = new MySQLi($this->host,$this->userName,$this->password,$this->databaseName);
            if($this->MySQLiconn->connect_errno) {
                die("ERROR : -> ".$this->MySQLiconn->connect_error);
            }
            
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
            //$this->createConnection();
            $outputString = $this->MySQLiconn->real_escape_string($value);
            return $outputString;
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
            //$this->createConnection();
            echo $query;
            $recordSet = $this->MySQLiconn->query($query);
            if(strpos(strtolower($query), "select")) {
                $rows = $recordSet->fetch_array();
                $recordSet->free();
                return $rows;
            }
            //$this->destroyConnection();
            return true;
        }
    }
?>