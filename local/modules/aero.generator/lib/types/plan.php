<?php
/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 22.08.2017
 * Time: 23:25
 */

namespace Aero\Generator\Types;

class Plan implements Generateable
{
    /**
     * Generate plan
     */
    function generate()
    {
        $plan = new \Aero\Generator\Plan();
        $plan->initProductsPlan();
    }

    public function getStepSize()
    {
        return 1;
    }
}