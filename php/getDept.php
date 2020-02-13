<?php

	require('database.php');

	$sql = "SELECT branch
			FROM branch";
	
	$db = new Database();

	$db->fetchAll($sql);			

?>