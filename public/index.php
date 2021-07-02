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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="container mt-2">
        <form id="formcep">
            <div class="row">
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="cep" id="cep">
                </div>
                <div class="col-sm-2">
                    <button type="submit" class="btn-success btn">
                        <i class="fas fa-check mr-1"></i>Enviar
                    </button>
                </div>
                <br>
            </div>
        </form>
        <div>
            <br>
            <span class="hora"><?php $datetime->imprimirHora(); ?> </span>
            <br>
            <br>
            <p id="dados-cep"></p>
        </div>
        <div class="table-responsive">
            <table id="users-table" class="table table-striped table-sm">
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>e-mail</th>
                    <th>Telefone</th>
                    <th>Site</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="/js/libs/jquery-3.6.0.js"></script> 
    <script src="/js/app.js"></script> 
</body>
</html>


