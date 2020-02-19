<?php

	require('database.php');

	$sql = "SELECT Department
			FROM department
			ORDER BY Department";
	
	$db = new Database();

	$db->fetchAll($sql);			

?>