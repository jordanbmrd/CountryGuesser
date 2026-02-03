<?php
// Router script for PHP built-in server - forwards all requests to index.php
$_SERVER['SCRIPT_NAME'] = '/index.php';
require __DIR__ . '/src/index.php';
