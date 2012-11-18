<?php
//require 'vendor/autoload.php';
require_once 'src/tonic/src/Tonic/Autoloader.php';
require_once 'src/InstallerUI/installerUI.php';

// load Tonic library and our snippet resource

$app = new Tonic\Application(array(
    'load' => 'src/InstallerUI/*.php', // look for resource classes in here
));

$request = new Tonic\Request();

$resource = $app->getResource($request);
$response = $resource->exec();
$response->output();