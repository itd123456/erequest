<?php
	require('database.php');
	$db = new Database();

	$creatTable = "CREATE TABLE hodept
				   (
				   		id INT AUTO_INCREMENT PRIMARY KEY,
				   		Department VARCHAR(30)
				   )";
				   
	$db->execQuery($creatTable);

	$departments = "SELECT Department
					 FROM department";

	$departments = $db->getMax($departments);
	// print_r($departments);
	$bLen = count($departments);

	for ($i = 0; $i < $bLen; $i++)
	{
		$dept = $departments[$i]['Department'];

		$sql = "INSERT INTO hodept(Department)
				VALUES('$dept')";

		$db->execQuery($sql);
	}	

	$new_dept = ['Admin','Admin General Purpose','Confirmation','MC','Posting','Recon','Training','CSR','Marketing New Accounts','BDO',
				 'Sir Sam','Maam Lea','Sir Ariel','Legal (Lenny) Sparta 1 to 4','Legal (Sein) Annap 1','Legal FM2','Legal (Jenery)',
				 'Legal Atty Sadsad','Legal Atty Victoria'];

	$bLen = count($new_dept);

	for ($i = 0; $i < $bLen; $i++)
	{
		$dept = $new_dept[$i];

		$sql = "INSERT INTO hodept(Department)
				VALUES('$dept')";

		$db->execQuery($sql);
	}

	$new_dept = ['Admin General Purpose','Confirmation','MC','Posting','Recon','Training','CSR','Marketing New Accounts','BDO', 'Loans Confirmation', 'Asset'];

	$bLen = count($new_dept);

	for ($i = 0; $i < $bLen; $i++)
	{
		$dept = $new_dept[$i];

		$sql = "INSERT INTO department(Department)
				VALUES('$dept')";

		$db->execQuery($sql);
	}

	$new_dept = ['Sucat', 'Marikina', 'SME San Mateo', 'San Jose', 'Angeles',
				 'Mandue'];

	$bLen = count($new_dept);

	for ($i = 0; $i < $bLen; $i++)
	{
		$branch = $new_dept[$i];

		$sql = "INSERT INTO branch(branch)
				VALUES('$branch')";

		$db->execQuery($sql);
	}

	$sql = "ALTER TABLE branch
			ADD area VARCHAR(20)";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'Head Office'
			WHERE branch = 'Head Office'";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'Makati'
			WHERE branch IN ('Cavite', 'Muntinlupa', 'Las Piñas', 'Intramuros', 'Calamba', 'Sucat', 'Manila', 'Harrison Plaza', 'Imus', 'Makati')";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'GMA'
			WHERE branch IN ('POEA', 'Lagro', 'Valenzuela', 'Quezon Avenue', 'Tandang Sora', 'Antipolo', 'Tanay', 'Marikina', 'Cainta', 'SME Marikina', 'SME San Mateo', 'SME Antipolo')";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'Sure Cycle'
			WHERE branch IN ('Digos Trike', 'SC Koronadal', 'SC Panabo')";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'North Branches'
			WHERE branch IN ('Baguio', 'Olongapo', 'Dagupan', 'Bataan', 'Meycauayan', 'Baliuag', 'San Jose', 'La Trinidad', 'La Union', 'Angeles', 'Dau', 'Malolos', 'Santiago', 'San Fernando, PA', 'Tarlac', 'Laoag', 'Cabanatuan', 'Tuguegarao', 'Cauayan', 'Gapan', 'Baler', 'Lipa', 'San Pablo', 'Naga')";

	$db->execQuery($sql);

	$sql = "UPDATE branch
			SET area = 'VisMin'
			WHERE branch IN ('Cebu', 'Consolacion', 'Mandue', 'Bacolod', 'Iloilo', 'Roxas', 'Dumagete', 'Kabankalan', 'Tacloban', 'Tagbilaran', 'Cagayan De Oro', 'Malaybalay', 'Butuan', 'Valencia', 'General Santos', 'Davao', 'Digos', 'Tagum', 'Koronadal', 'Kidapawan')";

	$db->execQuery($sql);

	$sql = "DELETE FROM branch
			WHERE branch = 'Tuguegarao City'";

	$db->execQuery($sql);
?>