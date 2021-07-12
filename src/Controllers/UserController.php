<?php

namespace Rthimoteo\Pegahora\Controllers;

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
                u.email, 
                c.name as company_name, 
                a.street 
            from
                users as u 
                join companies as c on 
                    u.id = c.id_user 
                join addresses as a on 
                    u.id =  a.id_user
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
                a.`long` as address_lng,
                c.id as company_id,
                a.id as address_id

            from
                users as u 
                join companies as c on 
                    u.id = c.id_user 
                join addresses as a on 
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
            $sql="delete from users where id = :id";

            $stmt = $dbConnection->prepare($sql);
            $stmt->execute(['id' => $id]);
            $json = json_encode(['message' => 'Usuário Excluído!', 'status' => 200]);
        }
        catch(\Exception $e){
            $json = json_encode(['message' => $e->getMessage(), 'status' => $e->getCode()]);
            $response->withStatus($e->getCode());
        }

        $response->getBody()->write($json);

        return $response;
    }
}