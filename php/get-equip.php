<?php

	require('database.php');

	$db = new Database();

	$id = $_POST['id'];

	$sql = "SELECT item, purpose, replacement, addition
			FROM equipment
			WHERE id = $id";

	$db->fetchAll($sql);
?>