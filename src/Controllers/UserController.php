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
}