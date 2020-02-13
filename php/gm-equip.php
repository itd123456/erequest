<?php
	
	require('database.php');

	$db = new Database();

	session_start();

	$user = $_SESSION['username'];
	$id = $_POST['id'];

	$sql = "UPDATE equipment
			SET gm = '$user', gm_date = NOW(), status = 'Approved by GM'
			WHERE id = $id";

	$db->execQuery($sql);
?>