<?php
define('MOCK', true);

require 'vendor/autoload.php';
require_once 'src/tonic/src/Tonic/Autoloader.php';
require_once 'src/Pimple.php';

// load Tonic library and our snippet resource

$app = new Tonic\Application(array(
    'load' => 'src/InstallerUI/Resource/*.php', // look for resource classes in here
));


$container = new Pimple();

if(MOCK){
    $container['organization'] = function ($c) {
        return new InstallerUI\Data\Mock\Organization();
    };

    $container['environment'] = function ($c) {
        return new InstallerUI\Data\Mock\Environment();
    };
}else{
    $container['organization'] = function ($c) {
        return new InstallerUI\Data\Organization();
    };

    $container['environment'] = function ($c) {
        return new InstallerUI\Data\Environment();
    };
}





$request = new Tonic\Request();
$resource = $app->getResource($request);

// make the container available to the resource before executing it
$resource->container = $container;

$response = $resource->exec();
$response->output();