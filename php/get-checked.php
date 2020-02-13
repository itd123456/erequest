<?php

	require('database.php');

	$id = $_POST['id'];

	$sql = "SELECT r.id, r.item, DATE_FORMAT(r.req_date, '%M %d, %Y %h:%i %p') AS req_date, 
				   r.status, r.user, r.check_remark, r.app_remark, CONCAT(u.fname, ' ', u.lname) AS name, 
				   u.Department, r.checker, r.approver, r.app_date,
				   DATE_FORMAT(r.check_date, '%M %d, %Y %h:%i %p') AS check_date,
				   DATE_FORMAT(r.app_date, '%M %d, %Y %h:%i %p') AS app_date
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

	$data[0]['checked_by'] = $result[0]['name'];

	print json_encode($data);
?>