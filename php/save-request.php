<?php

	session_start();

	require('database.php');

	$user = $_SESSION['username'];
	$item = $_POST['item'];
	$purpose = $_POST['purpose'];
	$replace = $_POST['replace'];
	$addition = $_POST['addition'];

	$sql = "INSERT INTO equipment(item, purpose, replacement, addition, user)
			VALUES('$item', '$purpose', $replace, $addition, '$user')";

	$db = new Database();

	$db->execQuery($sql);

?>