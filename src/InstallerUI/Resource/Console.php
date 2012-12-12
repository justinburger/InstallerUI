<?php
namespace installerUI\Resource;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /Console
 */
class Console extends Resource{
    /* Pimple Container */
    public $container;

    /**
     * @method GET
     * @provides text/json
     */
    function get() {
        $requestLine = (isset($_GET['lastLine']) && is_numeric($_GET['lastLine'])) ? $_GET['lastLine'] : 0;

        $consoleLog = $this->container['consoleLog'];
        $logLines = $consoleLog->getAll();
        $lastLine = sizeof($logLines);

        if($requestLine != null && $requestLine !=0 && $requestLine!= sizeof($logLines)){
            for($i=0; $i<$requestLine; $i++){
                array_shift($logLines);
            }
        }



        $response = array(
            'line'=>$lastLine,
            'data'=>$logLines
        );

        return json_encode($response);
    }

}