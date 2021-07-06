<?php
namespace Rthimoteo\Pegahora\Db;

use PDO;

class Mysqldriver extends PDO
{
    public function __construct()
    {
        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s', $_ENV['MYSQL_HOST'], $_ENV['MYSQL_PORT'], $_ENV['MYSQL_DATABASE']);
        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        );
        parent::__construct($dsn, $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD'], $options);
        
    }
}
