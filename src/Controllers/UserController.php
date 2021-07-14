<?php

namespace Rthimoteo\Pegahora\Controllers;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Rthimoteo\Pegahora\Db\Mysqldriver;

class UserController 
{
    public static function getUsers(Request $request, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        $sql="
            select 
                u.id, 
                u.name as user_name, 
                u.username, 
                u.email 
            from
                users as u 
            where
                deleted_at is NULL        
            order by
                user_name
            
        ";

        $stmt = $dbConnection->query($sql, \PDO::FETCH_ASSOC);
        $dados = [];

        foreach ($stmt as $row) {
            $dados[]=$row;
        }

        $json = json_encode($dados);
        $response->getBody()->write($json);

        return $response;
    }

    public static function getUser(Request $request, Response $response, array $args)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        $userId = $args['id'];

        $sql="
        select 
                u.*,
                c.name as company_name,
                c.bs as company_bs,
                c.catch_phrase as company_catch_phrase,
                a.street as address_street,
                a.suite as address_suite,
                a.zipcode as address_zipcode,
                a.lat as address_lat,
                a.lng as address_lng,
                c.id as company_id,
                a.id as address_id

            from
                users as u 
                left join companies as c on 
                    u.id = c.id_user 
                left join addresses as a on 
                    u.id =  a.id_user
            where
                u.id = $userId
        ";

        $stmt = $dbConnection->query($sql, \PDO::FETCH_ASSOC);
        $dados = [
            'user' => []
        ];
        
        foreach ($stmt as $key => $row) {
            if ($key == 0){
                $dados['user']=[
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'username' => $row['username'],
                    'phone' => $row['phone'],
                    'website' => $row['website'],
                    'companies' => [],
                    'addresses' => []
                ];
            }

            $dados['user']['addresses'][$row['address_id']] = [
                'street' => $row['address_street'],
                'suite' => $row['address_suite'],
                'zipcode' => $row['address_zipcode'],
                'lat' => $row['address_lat'],
                'lng' => $row['address_lng']
            ];

            $dados['user']['companies'][$row['company_id']] = [
                'company' => $row['company_name'],
                'bs' => $row['company_bs'],
                'catch_phrase' => $row['company_catch_phrase']
            ];
        }

        $json = json_encode($dados);
        $response->getBody()->write($json);

        return $response;
    }

    public static function deleteUser(int $id, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        try{
            $sql="update users set deleted_at = now() where id = :id";

            $stmt = $dbConnection->prepare($sql);
            $stmt->execute(['id' => $id]);
            $json = json_encode(['message' => 'User Deleted!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }

    public static function createUser(array $data, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        try{
            $sql="insert into users(name, email, username, phone, website) values (:name, :email, :username, :phone, :website)";

            $stmt = $dbConnection->prepare($sql);
            $stmt->execute($data);
            $json = json_encode(['message' => 'User Created!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }

    public static function addCompany(array $data, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();



        try{
            $sql="insert into companies(name, bs, catch_phrase, id_user) values (:name, :bs, :catch_phrase, :id_user)";

            $stmt = $dbConnection->prepare($sql);
            
            $stmt->bindValue(':name',$data['name']);
            $stmt->bindValue(':bs', !empty($data['bs']) ? $data['bs'] : NULL);
            $stmt->bindValue(':catch_phrase', !empty($data['catch_phrase']) ? $data['catch_phrase'] : NULL);
            $stmt->bindValue(':id_user', $data['id_user'], PDO::PARAM_INT);

            $stmt->execute();
            $json = json_encode(['message' => 'Company Added!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }

    public static function addAddress(array $data, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        try{
            $sql="insert into addresses(street, zipcode, suite, lat, lng, id_user) values (:street, :zipcode, :suite, :lat, :lng, :id_user)";

            $stmt = $dbConnection->prepare($sql);
            $stmt->execute($data);
            $json = json_encode(['message' => 'Address Added!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }

    public static function updateUser(int $id, array $data, Response $response)
    {
        header('Content-Type: application/json');

        $dbConnection = new Mysqldriver();

        $data['id']= $id;

        try{
            $sql="update users set name=:name, email=:email, username=:username, phone=:phone, website=:website where id=:id";

            $stmt = $dbConnection->prepare($sql);
            $stmt->execute($data);
            $json = json_encode(['message' => 'User Edited!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }

}