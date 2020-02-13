<?php

	require('database.php');

	$uname = $_POST['uname'];
	$pass = md5($_POST['pass']);
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$branch = $_POST['branch'];
	$dept = $_POST['dept'];
	$priv = $_POST['priv'];

	$sql = "INSERT INTO credentials(username, pass)
			VALUES('$uname', '$pass')";

	$db = new Database();
	$db->execQuery($sql);

	$sql = "INSERT INTO user_data(fname, lname, user, branch, Department,  		priv)
			VALUES('$fname', '$lname', '$uname', '$branch', '$dept', '$priv')";
	$db->execQuery($sql);
?>