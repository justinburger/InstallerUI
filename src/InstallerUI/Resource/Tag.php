<?php
/**
 * Tag RESTful Resourse
 *
 * @package RestfulResource
 * @subpackage Tag
 * @author Justin Burger <j@justinburger.com>
 *
 */

namespace installerUI;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /Tag
 */
class Tag extends Resource{
    public $container;

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

    /**
     * @method PUT
     * @provides text/json
     */
    function put($name = 'World') {
        return json_encode('V5.154');
    }

}