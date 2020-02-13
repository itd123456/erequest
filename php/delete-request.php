<?php
	
	require('database.php');

	$id = $_POST['id'];

	$sql = "DELETE FROM equipment
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>