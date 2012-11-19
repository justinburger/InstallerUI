<?php
namespace installerUI;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /Tag
 */
class Tag extends Resource{
    /**
     * @method GET
     * @provides text/json
     */
    function get($name = 'World') {
        return json_encode(array(
            'ADP-Credit',
            'ADP-CV',
            'Deployment-Test'
        ));
    }

}