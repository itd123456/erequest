<?php

	require('database.php');

	$uname = $_POST['uname'];

	$sql = "SELECT username
			FROM credentials
			WHERE username = '$uname'";

	$db = new Database();
	$db->fetchAll($sql);

?>