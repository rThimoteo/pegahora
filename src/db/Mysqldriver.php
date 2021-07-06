<?php
namespace Rthimoteo\Pegahora\Db;

use PDO;

class Mysqldriver extends PDO
{
    public __construct(
){
        // string $dsn,
        // string|null $username = null,
        // string|null $password = null,
        // array|null $options = null
        $dsn = sprintf('mysql:host=%s', '127.0.0.1');

    }
}
