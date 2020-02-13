<?php
	
	require('database.php');

	$db = new Database();

	session_start();

	$admin = $_SESSION['username'];
	$id = $_POST['id'];

	$sql = "UPDATE equipment
			SET status = 'Declined by GM'
			WHERE id = $id";

	$db->execQuery($sql);
?>