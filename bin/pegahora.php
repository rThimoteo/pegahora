<?php
require "../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__."/../");
$dotenv->safeLoad();

use Rthimoteo\Pegahora\Db\Mysqldriver;
use GuzzleHttp\Client as ApiUsers;

class  ComandLine 
{
    /**
     * Client para acesso da API de Usuários
     *
     * @var ApiUsers
     */
    private $apiUsers;

    /**
     * Driver de acesso ao banco de dados
     *
     * @var Mysqldriver
     */
    private $dbConnection; 

    public function __construct()
    {
        $this->apiUsers = new ApiUsers();
        $this->dbConnection = new Mysqldriver();

        $this->run();
    }

    private function run()
    {
        $response = $this->apiUsers->request('GET', 'https://jsonplaceholder.typicode.com/users');

        echo $response->getStatusCode(); 
        echo $response->getHeaderLine('content-type'); // 'application/json; charset=utf8'
        echo $response->getBody(); 
    }
}

new ComandLine();