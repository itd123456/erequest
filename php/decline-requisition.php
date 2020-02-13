<?php

	require('database.php');

	$id = $_POST['id'];

	$sql = "UPDATE requisition
			SET status = 'Declined'
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>