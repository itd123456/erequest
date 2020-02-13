<?php

	require('database.php');

	$id = $_POST['id'];

	$sql = "SELECT r.id, r.item, DATE_FORMAT(r.req_date, '%M %d, %Y %h:%i %p') AS req_date, r.status, r.user, r.check_remark, r.app_remark, CONCAT(u.fname, ' ', u.lname) AS name, u.Department
			FROM requisition r
			JOIN user_data u
			ON r.user = u.user
			WHERE r.id = $id";

	$db = new Database();
	$db->fetchAll($sql);

?>