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
            'dia' => (new DateTime())->imprimirDia(),
            'hora' => (new DateTime())->imprimirHora()            
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
    
    $app->post('/user/create', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();
    
        return UserController::createUser($body, $response);
    });

    $app->post('/user/company', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();

        return UserController::addCompany($body, $response);
    });

    $app->post('/user/address', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();

        return UserController::addAddress($body, $response);
    });

    $app->post('/user/{id}', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();
        
        return UserController::updateUser($args['id'], $body, $response);
    });
    
    $app->delete('/user/address/{id}', function (Request $request, Response $response, array $args) 
    {
        
        return UserController::deleteAddress($args['id'],$response);
    });

    $app->delete('/user/company/{id}', function (Request $request, Response $response, array $args) 
    {
        
        return UserController::deleteCompany($args['id'],$response);
    });

    $app->get('/user/company/{id}', function (Request $request, Response $response, array $args) 
    {

        return UserController::getCompany($request, $args, $response);
    });

    $app->post('/user/company/edit/{id}', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();

        return UserController::updateCompany($args['id'], $body, $response);
    });

    $app->get('/user/address/{id}', function (Request $request, Response $response, array $args) 
    {

        return UserController::getAddress($request, $args, $response);
    });

    $app->post('/user/address/edit/{id}', function (Request $request, Response $response, array $args) 
    {
        $body = $request->getParsedBody();

        return UserController::updateAddress($args['id'], $body, $response);
    });

    $app->run();