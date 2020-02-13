<?php

	require('database.php');

	session_start();

	$user = $_SESSION['username'];

	$sql = "SELECT *, DATE_FORMAT(req_date, '%M %d, %Y %h:%i %p') AS req_date
			FROM requisition
			WHERE user = '$user'";

	$db = new Database();
	$db->fetchAll($sql);

?>