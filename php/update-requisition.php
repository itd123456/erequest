<?php

	require('database.php');

	$item = $_POST['item'];
	$id = $_POST['id'];

	$sql = "UPDATE requisition
			SET item = '$item'
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>