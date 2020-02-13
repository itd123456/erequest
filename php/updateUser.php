<?php
	
	require('database.php');

	$db = new Database();

	$prevUser = $_POST['prevUser'];
	$user = $_POST['uname'];
	$pass = $_POST['pass'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$branch = $_POST['branch'];
	$dept = $_POST['dept'];

	session_start();

	$priv = $_SESSION['priv'];

	//update SESSION Values
	$_SESSION['username'] = $user;
	$_SESSION['dept'] = $dept;
	$_SESSION['branch'] = $branch;

	//update password
	if ($pass)
	{
		$pass = md5($pass);

		$sql = "UPDATE credentials
				SET pass = '$pass'
				WHERE username = '$prevUser'";

		$db->execQuery($sql);
	}

	//UPDATE user data
	$sql = "UPDATE user_data
			SET fname = '$fname', lname = '$lname', branch = '$branch', Department = '$dept', user = '$user'
			WHERE user = '$prevUser'";

	$db->execQuery($sql);

	$sql = "UPDATE credentials
			SET username = '$user'
			WHEre username = '$prevUser'";

	$db->execQuery($sql);

	if ($priv != 'emp')
	{
		if ($priv == 'admin')
		{
			$sql = "UPDATE requisition
					SET approver = '$user'
					WHERE approver = '$prevUser'";
		}
		else if ($priv == 'checker')
		{
			$sql = "UPDATE requisition
					SET checker = '$user'
					WHERE checker = '$prevUser'";
		}

		$sql = "UPDATE equipment
				SET $priv = '$user'
				WHERE $priv = '$prevUser'";

		$db->execQuery($sql);		
	}
	else
	{
		$sql = "UPDATE equipment
				SET user = '$user'
				WHERE user = '$prevUser'";

		$db->execQuery($sql);

		$sql = "UPDATE requisition
				SET user = '$user'
				WHERE user = '$prevUser'";

		$db->execQuery($sql);
	}
?>