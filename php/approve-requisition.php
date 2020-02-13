<?php

	session_start();

	require('database.php');

	$item = $_POST['item'];
	$id = $_POST['id'];
	$remark = $_POST['remark'];
	$approver = $_SESSION['username'];

	$sql = "UPDATE requisition
			SET app_remark = '$remark', app_date = NOW(), approver = '$approver', status = 'Approved'
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>