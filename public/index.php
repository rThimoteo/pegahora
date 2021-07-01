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
    <!-- <link rel="stylesheet" href="/styles/styles.css"> -->
    <link rel="stylesheet" href="/styles/global.css">
    
</head>
<body>
    <div class="main">
        <form id="formcep">
            <input type="text" class="cep" name="cep" id="cep">
            <button type="submit" class="button">Enviar</button>
            <br>
        </form>
        
        <div>
            <br>
            <span class="hora"><?php $datetime->imprimirHora(); ?> </span>
            <br>
            <br>
            <p>
                <label>Estado:</label>
                <span class="resp" id="uf"></span>
                <br>
                <label>Cidade:</label>
                <span class="resp" id="cidade"></span>
                <br>
                <label>Bairro:</label>
                <span class="resp" id="bairro"></span>
                <br>
                <label>Logardouro:</label>
                <span class="resp" id="rua"></span>
            </p>
        </div>
    </div>
    <script src="/js/libs/jquery-3.6.0.js"></script> 
    <script src="/js/app.js"></script> 
</body>
</html>


