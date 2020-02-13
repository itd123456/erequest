<?php
	
	require('database.php');

	//Create Object $db
	$db = new Database();

	//start session
	session_start();
	$head = $_SESSION['username'];
	$id = $_POST['id'];
	$status = $_POST['status'];

	if ($status == 'Declined by Department Head')
	{
		$sql = "UPDATE equipment
			SET status = '$status'
			WHERE id = $id";
	}
	else if ($status == 'Approved by Department Head')
	{
		$sql = "UPDATE equipment
			SET head = '$head', head_date = NOW(), status = '$status'
			WHERE id = $id";
	}

	$db->execQuery($sql);
?>