<?php

	session_start();
	require('database.php');

	$user = $_POST['user'];
	$pass = md5($_POST['pass']);

	$sql = "SELECT c.username, c.pass, u.priv, u.Department, u.branch, u.id
			FROM credentials c
			JOIN user_data u
			ON c.username = u.user
			WHERE c.username = '$user'
			and c.pass = '$pass'";

	$db = new Database();
	$db->fetchAll($sql);

	$data = $db->getMax($sql);

	$c = count($data);

	if ($c == 1)
	{
		$_SESSION['id'] = user;
		$_SESSION['username'] = $user;
		$_SESSION['priv'] = $data[0]['priv'];
		$_SESSION['dept'] = $data[0]['Department'];
		$_SESSION['branch'] = $data[0]['branch'];
	}
?>