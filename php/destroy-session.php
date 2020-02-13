<?php
	session_start();
	session_destroy();

	header('Location: http://localhost:2000/E-Request/login.html');
	exit;
?>