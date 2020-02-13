<?php

	session_start();
	$user = $_SESSION['username'];

	require('database.php');

	$item = $_POST['item'];

	$sql = "INSERT INTO requisition(item, user)
			VALUES('$item', '$user')";

	$db = new Database();

	$db->execQuery($sql);

?>