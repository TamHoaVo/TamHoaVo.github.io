<?php
// start the session
session_start();
//unset value
$_SESSION = [];
//destroy the session
session_destroy();
//back to login page
header("Location: login.php");
exit;
?>
