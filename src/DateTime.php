<?php
/*

    Namespace [ok]

    Nome da Classe [ok]

    Properties[ok]

    Methods[ok]


*/

namespace Rthimoteo\Pegahora;

use Carbon\Carbon;

class DateTime 
{

    private $hora;
    private $local;


    public function __construct()
    {
        $this->hora = Carbon::now()->timezone('America/Sao_Paulo');
        
    }

    public function imprimirHora()
    {
        echo $this->hora;
    }
}