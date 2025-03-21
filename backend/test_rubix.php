<?php

require 'vendor/autoload.php';

use Rubix\ML\Classifiers\MultinomialNB;

try {
    $classifier = new MultinomialNB(1.0);
    echo "Rubix ML is working correctly!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
