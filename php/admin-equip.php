<?php
	
	require('database.php');

	$db = new Database();

	session_start();

	$admin = $_SESSION['username'];
	$id = $_POST['id'];
	$item = $_POST['item'];

	$sql = "UPDATE equipment
			SET admin = '$admin', admin_date = NOW(), status = 'Approved by Admin', item = '$item'
			WHERE id = $id";

	$db->execQuery($sql);
?>