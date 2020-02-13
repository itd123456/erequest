<?php
	
	require('database.php');

	$db = new Database();

	session_start();

	$checker = $_SESSION['username'];
	$id = $_POST['id'];
	$item = $_POST['item'];

	$sql = "UPDATE equipment
			SET item = '$item', checker = '$checker', check_date = NOW(), status = 'Checked by Admin(Checker)'
			WHERE id = $id";

	$db->execQuery($sql);
?>