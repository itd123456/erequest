<?php

	require('database.php');

	session_start();

	$user = $_SESSION['username'];
	$priv = $_SESSION['priv'];
	$dept = $_SESSION['dept'];
	$branch = $_SESSION['branch'];
	$sql = '';
	
	if ($priv == 'emp')
	{
		$sql = "SELECT *, DATE_FORMAT(date, '%M %d, %Y %h:%i %p') AS date
			FROM equipment
			WHERE user = '$user'";
	}
	else
	{
		$sql = "SELECT e.*, DATE_FORMAT(e.date, '%M %d, %Y %h:%i %p') AS date, u.Department, u.branch, CONCAT(u.fname, ' ', u.lname) AS name
			FROM equipment e
			JOIN user_data u
			ON e.user = u.user";
	}

	$db = new Database();
	$data = $db->getMax($sql);

	$count = count($data);
	for ($i = 0; $i < $count; $i++)
	{
		$data[$i]['head_branch'] = $branch;
		$data[$i]['head_dept'] = $dept;
	}

	print json_encode($data);
?>	