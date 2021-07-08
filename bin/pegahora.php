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
                $id_user = $this->addUserAndReturnUserId($user);
                $this->addAddress($user, $id_user);
                $this->addCompany($user, $id_user);
                echo 'Usuários '.$user["name"].' inserido';
            }
        }
        catch (\Exception $ex)
        {
            echo $ex->getMessage();
        }
        
    }
    
    /**
     * Função para atribuir o usuário para o Array e retornar seu ID
     * 
     * @param array $user
     * @return integer
     */
    private function addUserAndReturnUserId(array $user) : int
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

    /**
     * Função que adiciona um endereço no banco de dados usando o id de User
     *
     * @param array $user
     * @param integer $id_user
     * @return void
     */
    private function addAddress(array $user, int $id_user) : void
    {
        $addressdb = [
            $user["address"]["street"],
            $user["address"]["suite"],
            $user["address"]["zipcode"],
            $user["address"]["geo"]["lat"],
            $user["address"]["geo"]["lng"],
            $id_user
        ];

        $sqlAddress = 'insert into addresses (street, suite, zipcode, lat, `long`, id_user) values (?,?,?,?,?,?)';
        $this->insertToDb($sqlAddress, $addressdb);
    }

    /**
     * Função que adiciona a compania no banco de dados usando o id de User
     *
     * @param array $user
     * @param integer $id_user
     * @return void
     */
    private function addCompany(array $user, int $id_user) : void
    {
        $companydb = [
            $user["company"]["name"],
            $user["company"]["bs"],
            $user["company"]["catchPhrase"],
            $id_user
        ];

        $sqlCompanies = 'insert into companies (name, bs, catch_phrase, id_user) values (?,?,?,?)';
        $this->insertToDb($sqlCompanies, $companydb);
    }

    private function insertToDb(string $sql, array $data) : void
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($data);
    }
}

new ComandLine();