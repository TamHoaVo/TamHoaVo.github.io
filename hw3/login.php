<?php
// start the session
session_start();

// hardcoded user and pass
$valid_username = "user";
$valid_password = "1234";

// hold error message
$msg = "";

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // validate input
    if ($username === $valid_username && $password === $valid_password) {
        // set session variables
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;

        // the matches page
        header("Location: matches.php");
        exit;
    } else {
        // if not correct, set error message
        $msg = "<span style='color:red'>Invalid Login Details</span>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <h2>Login Page</h2>
    <form action="login.php" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Login">
    </form>
    <!--diaplay error if any happen -->
    <?= $msg ?>
</body>
</html>
