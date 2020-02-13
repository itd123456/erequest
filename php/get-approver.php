<?php

	require('database.php');

	$id = $_POST['id'];

	$sql = "SELECT r.id, r.item, DATE_FORMAT(r.req_date, '%M %d, %Y %h:%i %p') AS req_date, 
				   r.status, r.user, r.check_remark, r.app_remark, CONCAT(u.fname, ' ', u.lname) AS name, 
				   u.Department, r.checker, r.approver, r.app_date,
				   DATE_FORMAT(r.check_date, '%M %d, %Y %h:%i %p') AS check_date,
				   DATE_FORMAT(r.app_date, '%M %d, %Y %h:%i %p') AS app_date,
				   DATE_FORMAT(r.date_received, '%M %d, %Y %h:%i %p') AS received_date
			FROM requisition r
			JOIN user_data u
			ON r.user = u.user
			WHERE r.id = $id";

	$db = new Database();
	$data = $db->getMax($sql);

	$checker = $data[0]['checker'];

	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$checker'";

	$result = $db->getMax($sql);

	if (count($result) == 1)
	{
		$data[0]['checked_by'] = $result[0]['name'];
	}
	else
	{
		$data[0]['checked_by'] = '';
	}

	$approver = $data[0]['approver'];

	$sql = "SELECT CONCAT(fname, ' ', lname) AS name
			FROM user_data
			WHERE user = '$approver'";

	$approver = $db->getMax($sql);

	if (count($approver) == 1)
	{
		$data[0]['approved_by'] = $approver[0]['name'];
	}
	else
	{
		$data[0]['approved_by'] = '';
	}

	print json_encode($data);
?>