<?php
    require "../vendor/autoload.php";
    
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__."/../");
    $dotenv->safeLoad();

    use Rthimoteo\Pegahora\DateTime;
    use Slim\Factory\AppFactory;
    use Slim\Factory\ServerRequestCreatorFactory;
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Rthimoteo\Pegahora\Controllers\UserController;
    use Slim\Views\Twig;
    use Slim\Views\TwigMiddleware;
    

    AppFactory::setSlimHttpDecoratorsAutomaticDetection(false);
    ServerRequestCreatorFactory::setSlimHttpDecoratorsAutomaticDetection(false);

    $app = AppFactory::create();

    $templateDir = implode(DIRECTORY_SEPARATOR, [__DIR__, '..', $_ENV['TEMPLATE_DIR']] );
    $templateDir = realpath($templateDir);
    
    $twig = Twig::create($templateDir, ['cache' => false]);
    $app->add(TwigMiddleware::create($app, $twig));

    $app->get('/', function (Request $request, Response $response, array $args) {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'home.html', [
            'dia' => (new DateTime())->imprimirHora(),
            'hora' => (new DateTime())->imprimirDia()
        ]);

    });

    $app->get('/users', function (Request $request, Response $response, array $args) 
    {
        return UserController::getUsers($request, $response);
    });

    $app->get('/user/{id}', function (Request $request, Response $response, array $args) 
    {

        return UserController::getUser($request, $response, $args);
    });

    $app->delete('/user/{id}', function (Request $request, Response $response, array $args) 
    {

        return UserController::deleteUser($args['id'],$response);
    });
    
    $app->run();
 
