<?php
namespace installerUI\Resource;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /Organization
 */
class Organization extends Resource{
    /* Pimple Container */
    public $container;

    /**
     * @method GET
     * @provides text/json
     */
    function get($name = 'World') {

        $organization = $this->container['organization'];

        return json_encode($organization->getAll());
    }

}