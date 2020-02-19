<?php

	require('database.php');


	$branch = $_POST['branch'];

	$bran = 'Department';

	if ($branch == 'Head Office')
	{
		$bran = 'hodept';
	}
	else
	{
		$bran = 'Department';
	}

	$sql = "SELECT Department
			FROM $bran
			ORDER BY Department";
	
	$db = new Database();

	$db->fetchAll($sql);			

?>