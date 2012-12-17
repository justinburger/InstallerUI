<?php

namespace InstallerUI;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /InstallerUI/:idhash
 */
class InstallerUI extends Resource
{
    /**
     * @method GET
     * @provides text/html
     * @provides application/json
     */
    public function get($request, $idhash)
    {
        return 'Hello '.$request. $idhash;
    }
}
