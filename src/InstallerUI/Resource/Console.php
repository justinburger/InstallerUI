<?php
/**
 * Web Console Functionality.
 * RESTful services to build and display log information in the
 * installer UI.
 *
 * @author Justin Burger <j@justinburger.com>
 *
 */
namespace installerUI\Resource;


use \Tonic\Resource as Resource;

/**
 * Web Console Functionality.
 * RESTful services to build and display log information in the
 * installer UI.
 *
 * @uri /Console
 *
 */
class Console extends Resource
{
    /* Pimple Container */
    public $container;

    /**
     * Sends back all, or some of the memcache log
     * lines. You can specific the last line recieved so
     * you don't need to get back lines you've already
     * loaded on the frontend.
     *
     * @method GET
     * @provides text/json
     */
    public function get()
    {
        $requestLine = (isset($_GET['lastLine']) && is_numeric($_GET['lastLine'])) ? $_GET['lastLine'] : 0;

        $consoleLog = $this->container['consoleLog'];
        $logLines = $consoleLog->getAll();
        $lastLine = sizeof($logLines);

        if ($requestLine != null && $requestLine !=0 && $requestLine!= sizeof($logLines)) {
            for ($i=0; $i<$requestLine; $i++) {
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
