<?php

	require('database.php');

	$item = $_POST['item'];
	$purpose = $_POST['purpose'];
	$replace = $_POST['replace'];
	$addition = $_POST['addition'];
	$id = $_POST['id'];

	$sql = "UPDATE equipment
			SET item = '$item', purpose = '$purpose', replacement = $replace, addition = $addition
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>