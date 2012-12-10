<?php
namespace InstallerUI\Data\Mock;

class ConsoleLog{

    public function getAll(){
        return array(
                array('1234'=>'First Mock Item'),
                array('12345'=>'Second Mock Item'),
                array('123456'=>'Third Mock Item')
        );
    }
}