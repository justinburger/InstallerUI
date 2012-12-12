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
 * @uri /Tag/:organization
 * @uri /Tag/:organization/:tag
 */
class Tag extends Resource{
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

        $tagCmd = '/usr/local/bin/php ' . $this->container['backend_location'] . "/tools/installTest.php --tag -o {$organization} &";

        $outputfile = '/dev/null';
        $pidfile = '/tmp/pid_deploy_tag';

        exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $tagCmd, $outputfile, $pidfile));


        $memcache = new \Memcache();
        $memcache->connect('localhost', 11211) or die ("Could not connect");

        $tag = $memcache->get('tagging_' . strtolower($organization) . '_tag');
        $tag = (is_null($tag)) ? '?' : $tag;

        return json_encode(array('tag'=>$tag, 'cmd'=>$tagCmd));
    }


    /**
     * @method GET
     * @provides text/json
     */
    function get($organization, $tag){
        $tag =     str_replace('_','.',$tag);

        $memcache = new \Memcache();
        $memcache->connect('localhost', 11211) or die ("Could not connect");

        $progressKey = 'tagging_' . strtolower($organization . $tag)  . '_progress';
        $progress = $memcache->get($progressKey);

        return json_encode(array('progress'=>$progress));
    }

}