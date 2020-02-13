<?php

	require('database.php');

	$db = new Database();

	$id = $_POST['id'];

	$sql = "UPDATE requisition
			SET status = 'Received', date_received = NOW()
			WHERE id = $id";

	$db->execQuery($sql);
?>