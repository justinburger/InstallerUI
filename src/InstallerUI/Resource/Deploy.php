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
 * @uri /Deploy/:organization/:tag
 * @uri /Deploy/:organization/:tag/:env
 */
class Deploy extends Resource
{
    public $container;

    /**
     * Fires the Installer command line tool to deploy
     * based on parms sent from the UI.
     *
     * @method POST
     * @provides text/json
     */
    public function post($organization)
    {
        $postData = json_decode($this->request->data);

        $env = $postData->env;
        $org= $postData->organization;
        $tag = $postData->tag;

        $memcache = new \Memcache();
        $memcache->connect('localhost', 11211) or die ("Could not connect");

        $progressKey = 'deploying_' . strtolower($org . $tag.$env)  . '_progress';
        $progress = $memcache->set($progressKey,array('progress'=>1,'detail'=>'Waiting for backend to start...'));


        $deployCmd = '/usr/local/bin/php ' .
                        $this->container['backend_location'] .
                        "/tools/installTest.php -d -b {$tag} -e {$env} -o {$organization}";
        $outputfile = '/dev/null';
        $pidfile = '/tmp/pid_deploy';

        $finalCmd = sprintf("%s > %s 2>&1 & echo $! >> %s", $deployCmd, $outputfile, $pidfile);

        $finalCmd;
        exec($finalCmd);


        return json_encode(array('status'=>"started"));
    }


    /**
     * Fires the Installer command line tool to deploy
     * based on parms sent from the UI.
     *
     * @method GET
     * @provides text/json
     */
    public function get($organization, $tag, $env)
    {
        $tag =     str_replace('_', '.', $tag);

        $memcache = new \Memcache();
        $memcache->connect('localhost', 11211) or die ("Could not connect");

        $progressKey = 'deploying_' . strtolower($organization . $tag.$env)  . '_progress';
        $progress = $memcache->get($progressKey);

        if ($progress['progress'] === false) {
            $progress['progress'] = 0;
        }

        return json_encode(array('progress'=>$progress['progress'], 'detail'=>$progress['detail']));
    }
}
