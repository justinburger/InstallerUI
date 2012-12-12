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
 * @uri /Deploy
 * @uri /Deploy/:organization
 */
class Deploy extends Resource{
    public $container;

    /**
     * @method POST
     * @provides text/json
     */
    function post($organization) {
        /**
         * Steps:
         * 1. Fire off a background process to tag.
         * 2. Pick up the tagging version number from memcache
         * 3. return it.
         */


       $postData = json_decode($this->request->data);

        $env = $postData->env;
        $org= $postData->organization;
        $tag = $postData->tag;


       $deployCmd = '/usr/local/bin/php ' . $this->container['backend_location'] . "/tools/installTest.php -d -b {$tag} -e {$env} -o {$organization}";
        $outputfile = '/dev/null';
        $pidfile = '/tmp/pid_deploy';

        exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $deployCmd, $outputfile, $pidfile));


        return json_encode(array('status'=>'Started'));
    }

}