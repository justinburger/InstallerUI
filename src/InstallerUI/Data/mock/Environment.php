<?php
namespace InstallerUI\Data\Mock;

class Environment{

    public function getAll(){
        return array('qa','staging','production');
    }
}