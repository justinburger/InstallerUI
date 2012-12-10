<?php
namespace InstallerUI\Data\Mock;

class ConsoleLog{

    public function getAll(){
        $memcache = new \Memcache();
        $memcache->connect('localhost', 11211) or die ("Could not connect");
        $installerLog = $memcache->get('Installer_log');

        return ($installerLog);
    }
}