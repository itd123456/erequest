<?php

	require('database.php');

	$id = $_POST['id'];

	$sql = "SELECT e.*, DATE_FORMAT(e.date, '%M %d, %Y %h:%i %p') AS date,
			 	   DATE_FORMAT(e.head_date, '%M %d, %Y %h:%i %p') AS head_date,
			 	   DATE_FORMAT(e.check_date, '%M %d, %Y %h:%i %p') AS check_date,
			 	   DATE_FORMAT(e.admin_date, '%M %d, %Y %h:%i %p') AS admin_date,
			 	   DATE_FORMAT(e.gm_date, '%M %d, %Y %h:%i %p') AS gm_date,
			 	   DATE_FORMAT(e.date_received, '%M %d, %Y %h:%i %p') AS date_received,
			 	   u.branch
			FROM equipment e
			JOIN user_data u
			ON e.user = u.user
			WHERE e.id = $id";

	$db = new Database();

	$data = $db->getMax($sql);

	$user = $data[0]['user'];
	$head = $data[0]['head'];
	$check = $data[0]['checker'];
	$admin = $data[0]['admin'];
	$gm = $data[0]['gm'];

	$data[0]['user_name'] = '';
	$data[0]['head_name'] = '';
	$data[0]['check_name'] = '';
	$data[0]['gm_name'] = '';
//USER NAME
	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$user'";

	$name = $db->getMax($sql);

	$data[0]['user_name'] = $name[0]['name'];
//HEAD NAME
	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$head'";

	$name = $db->getMax($sql);

	if (count($name) == 1)
	{
		$data[0]['head_name'] = $name[0]['name'];
	}
//CHECKER NAME
	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$check'";

	$name = $db->getMax($sql);

	if (count($name) == 1)
	{
		$data[0]['check_name'] = $name[0]['name'];
	}
//ADMIN NAME
	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$admin'";

	$name = $db->getMax($sql);

	if (count($name) == 1)
	{
		$data[0]['admin_name'] = $name[0]['name'];
	}
//GM NAME
	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$gm'";

	$name = $db->getMax($sql);

	if (count($name) == 1)
	{
		$data[0]['gm_name'] = $name[0]['name'];
	}

	print json_encode($data);
?>