<?php
require "../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__."/../");
$dotenv->safeLoad();

use Rthimoteo\Pegahora\Db\Mysqldriver;
use GuzzleHttp\Client as ApiUsers;
use GuzzleHttp\Psr7\Response;

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
        try
        {
            $response = $this->apiUsers->request('GET', 'https://jsonplaceholder.typicode.com/users');
            $users = json_decode($response->getBody(), true);

            foreach ($users as $user) {
                $id_user = $this->createAndReturnUserId($user);
                
                $companydb = [
                    $user["company"]["name"],
                    $user["company"]["bs"],
                    $user["company"]["catchPhrase"],
                    $id_user
                ];

                $sqlCompanies = 'insert into companies (name, bs, catch_phrase, id_user) values (?,?,?,?)';
                $stmtCompanies = $this->dbConnection->prepare($sqlCompanies);
                $stmtCompanies->execute($companydb);
                
                $addressdb = [
                    $user["address"]["street"],
                    $user["address"]["suite"],
                    $user["address"]["zipcode"],
                    $user["address"]["geo"]["lat"],
                    $user["address"]["geo"]["lng"],
                    $id_user
                ];

                $sqlAddress = 'insert into addresses (street, suite, zipcode, lat, `long`, id_user) values (?,?,?,?,?,?)';
                $stmtAddress = $this->dbConnection->prepare($sqlAddress);
                $stmtAddress->execute($addressdb);
                echo 'Usuários '.$user["name"].' inserido';
            }
        }
        catch (\Exception $ex)
        {
            echo $ex->getMessage();
        }
        
    }
    
    /**
     * Função para atribuir o usuário para o Array
     * 
     * @param array $user
     * @return integer
     */
    private function createAndReturnUserId(array $user) : int
    {
        $userdb = [
            $user["name"],
            $user["username"],
            $user["email"],
            $user["phone"],
            $user["website"]
        ];

        $sql = 'insert into users (name, username, email, phone, website) values (?,?,?,?,?)';
        $this->insertToDb($sql, $userdb);

        return $this->dbConnection->lastInsertId();
    }

    private function insertToDb(string $sql, array $data) : void
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($data);
    }
}

new ComandLine();