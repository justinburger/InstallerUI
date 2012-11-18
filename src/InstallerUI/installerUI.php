<?php

namespace installerUI;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /installerUI/:idhash
 */
class installerUI extends Resource{
    /**
     * @method GET
     * @provides text/html
     */
    function get($request, $idhash) {
        return 'Hello '.$request. $idhash;
    }
}