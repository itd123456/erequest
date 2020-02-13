<?php

	require('database.php');

	$sql = "SELECT Department
			FROM department";
	
	$db = new Database();

	$db->fetchAll($sql);			

?>