<?php

	require('database.php');

	session_start();

	$user = $_SESSION['username'];

	$sql = "SELECT r.*, CONCAT(u.fname, ' ', u.lname) AS name
			FROM requisition r
			JOIN user_data u
			ON r.user = u.user";

	$db = new Database();
	$db->fetchAll($sql);

?>