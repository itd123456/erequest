<?php

	session_start();

	require('database.php');

	$item = $_POST['item'];
	$id = $_POST['id'];
	$remark = $_POST['remark'];
	$checker = $_SESSION['username'];

	$sql = "UPDATE requisition
			SET item = '$item', check_remark = '$remark', check_date = NOW(), checker = '$checker', status = 'Checked'
			WHERE id = $id";

	$db = new Database();

	$db->execQuery($sql);

?>