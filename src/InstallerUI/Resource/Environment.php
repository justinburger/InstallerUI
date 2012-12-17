<?php
namespace installerUI\Resource;

use \Tonic\Resource as Resource;

/**
 * Single Snippet Resource
 * @uri /Environment
 */
class Environment extends Resource
{
    /* Pimple Container */
    public $container;

    /**
     * @method GET
     * @provides text/json
     */
    public function get($name = 'World')
    {

        $environment = $this->container['environment'];

        return json_encode($environment->getAll());
    }
}
