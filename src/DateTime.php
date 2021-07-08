<?php

namespace Rthimoteo\Pegahora;

use Carbon\Carbon;
class DateTime 
{

    private $hora;
    private $dia;

    public function __construct()
    {
        $this->dia = Carbon::now()->timezone('America/Sao_Paulo')
        ->isoFormat('DD/MM/YYYY');
        $this->hora = Carbon::now()->timezone('America/Sao_Paulo')
        ->isoFormat('HH \h\o\r\a\s \e mm \m\i\n\u\t\o\s');
        
    }

    public function imprimirDia() : string
    {   
        $dia = "Dia:" . $this->dia ;
        return $dia;
    }

    public function imprimirHora() : string
    {   
        $horario = $this->hora;
        return $horario;
    }
}