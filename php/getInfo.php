<?php

	require('database.php');

	$db = new Database();

	session_start();

	$user = $_SESSION['username'];

	$sql = "SELECT *
			FROM user_data
			WHERE user = '$user'";

	$db->fetchAll($sql);

?>