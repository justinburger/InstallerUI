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
     * @provides text/html
     */
    function sayHello($name = 'World') {
        return 'Hello '.$name;
    }

}