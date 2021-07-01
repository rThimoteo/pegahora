<?php
    require "../vendor/autoload.php";
    use Rthimoteo\Pegahora\DateTime;
    $datetime = new DateTime();
    $teste = true;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEP e Hora</title>
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="stylesheet" href="/styles/global.css">
    
</head>
<body>
    <div class="main">
        <form id="formcep">
            <input type="text" name="cep" id="cep">
            <button type="submit">Enviar</button>
            <br>
        </form>
        
        <div>
            <br>
            <span><?php $datetime->imprimirHora(); ?> </span>
            <br>
            <br>
            <span id="cidade"></span>
        </div>
    </div>
    <script src="/js/app.js"></script> 
</body>
</html>


