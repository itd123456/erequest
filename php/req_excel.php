<?php
	
	require('Spreadsheet/Excel/Writer.php');
  	require('database.php');

  	$start = $_GET['start'];
	$end = $_GET['end'];
	$area = $_GET['area'];
	$db = new Database();

	$end = strtotime($end . '+1 day');
	$end = date('Y-m-d', $end);

	$departments = '';

	if ($area == 'Head Office')
	{

		$departments = "SELECT Department
			 			FROM hodept";
	}
	else if ($area != 'Head Office')
	{
		$departments = "SELECT branch
			 			FROM branch
			 			WHERE area = '$area'";
	}

	$sql = "SELECT r.item, u.Department, u.branch
			FROM requisition r
			JOIN user_data u
			ON r.user = u.user
			JOIN branch b
			ON u.branch = b.branch
			WHERE app_date BETWEEN '$start' AND '$end'
			AND b.area = '$area'";

	$data = $db->getMax($sql);
	$departments = $db->getMax($departments);

	$writer = new Spreadsheet_Excel_Writer();
  	$writer->send('SUPPLIES '.date("Y").'.xls');

	$textWrap = $writer->addFormat();
	$textWrap->setTextWrap(true);
	$textWrap->setFontFamily('Tahoma');

	$sheet = 'sheet 1';

	if ($area == 'North Branches')
	{
		$sheet = 'NORTH BRANCHES';
	}
	else if ($area == 'Head Office')
	{
		$sheet = 'HEAD OFFICE';
	}
	else if ($area == 'Makati')
	{
		$sheet = 'MAKATI AND SOUTH BRANCHES';
	}
	else if ($area == 'GMA')
	{
		$sheet = 'GMA BRANCHES';
	}
	else if ($area == 'Sure Cycle')
	{
		$sheet = 'SURE CYCLE';
	}
	else
	{
		$sheet = 'VISMIN';
	}

	$sheet = $writer->addWorksheet($sheet);

	$merge = $writer->addFormat();
	$merge->setAlign('center');
	$merge->setVAlign('vcenter');
	$merge->setFontFamily('Tahoma');

	$merge1 = $writer->addFormat();
	$merge1->setAlign('right');
	$merge1->setVAlign('vright');
	$merge1->setFontFamily('Tahoma');

	$sheet->setMerge(0, 2, 2, 2);
	$sheet->insertBitmap(0,2,'gdfi.bmp',0, 0, 0.11, 0.41);

	$sheet->setMerge(3, 0, 3, 4);
    $sheet->writeString(3,0,'Unit 201&203, Jollibee Plaza Condo.,', $merge);

    $sheet->setMerge(4, 0, 4, 4);
    $sheet->writeString(4,0,'F. Ortigas Jr. Rd., Ortigas Center,', $merge);

    $sheet->setMerge(5, 0, 5, 4);
    $sheet->writeString(5,0,'Pasig City', $merge);

    $sheet->setMerge(6, 0, 6, 4);
    $sheet->writeString(6,0,'(02) 910-8219 / 0922-8501964', $merge);

    $textWrap->setFontFamily('Tahoma');
    $textWrap->setBold();
    $sheet->writeString(8,0,'SUPPLIER:', $textWrap);
    $sheet->writeString(9,0,'TEL#:', $textWrap);
    $sheet->writeString(10,0,'ATTN TO:', $textWrap);

	//set width of specific cell
	$sheet->setColumn(0,0,14); //Cell A
	$sheet->setColumn(1,1,5); //Cell B
	$sheet->setColumn(2,2,37); //Cell C

	$sheet->setMerge(8, 1, 8, 2);
	$sheet->setMerge(9, 1, 9, 2);
	$sheet->setMerge(10, 1, 10, 2);

	$sheet->writeString(8,3,'DATE:', $textWrap);

	//set width of specific cell
	$sheet->setColumn(3,3,14); //Cell D
	$sheet->setColumn(4,4,14); //Cell E

	$sheet->setRow(11, 3, 0);

	$textWrap1 = $writer->addFormat();
	$textWrap1->setTextWrap(true);
	$textWrap1->setFontFamily('Tahoma');
    $textWrap1->setBold();
    $textWrap1->setAlign('center');
    $textWrap1->setVAlign('vcenter');

    $ttl = $writer->addFormat();
	$ttl->setTextWrap(true);
	$ttl->setFontFamily('Tahoma');
    $ttl->setBold();
    $ttl->setAlign('right');
    $ttl->setVAlign('vright');

    $bLen = count($departments);
	$dLen = count($data);
	$x = 12;
    $prevDept = '';

    if ($area != 'Makati')
    {
    	for ($b = 0; $b < $bLen; $b++)
		{
			$dept = '';

			if ($area != 'Head Office')
			{
				$dept = $departments[$b]['branch'];
			}
			else
			{
				$dept = $departments[$b]['Department'];
			}

			$total = 0;

			for ($d = 0; $d < $dLen; $d++)
			{
				$deptReq = $data[$d]['Department'];

				if ($area != 'Head Office')
				{
					$deptReq = $data[$d]['branch'];
				}

				if ($x == 12 && $dept == $deptReq)
				{	
					$sheet->setMerge($x, 0, $x, 2);
					$sheet->writeString($x, 0, strtoupper($deptReq), $textWrap);
					$x++;
					$sheet->writeString($x, 0, 'Qty', $textWrap1);
					$sheet->writeString($x, 1, 'Unit', $textWrap1);
					$sheet->writeString($x, 2, 'Description', $textWrap1);
					$sheet->writeString($x, 3, 'Unit Price', $textWrap1);
					$sheet->writeString($x, 4, 'Amount', $textWrap1);
					$x++;

					$item = json_decode($data[$d]['item'], true);

					$iLen = count($item);

					for ($i = 0; $i < $iLen; $i++)
					{
						$qty = $item[$i]['qnty'];
						$unit = $item[$i]['type'];
						$desc = $item[$i]['part'];
						$price = $item[$i]['amount'];
						$price = (float) $price;
						$price = number_format($price, 2);
						$amount = $item[$i]['total'];
						$amount = (float) $amount;
						$total += $amount;
						$amount = number_format($amount, 2);

						$sheet->writeString($x, 0, $qty, $merge);
						$sheet->writeString($x, 1, $unit, $merge);
						$sheet->writeString($x, 2, $desc, $merge);
						$sheet->writeString($x, 3, $price, $merge1);
						$sheet->writeString($x, 4, $amount, $merge1);
						$x++;
					}
				}
				else if ($x > 12 && $dept == $deptReq && !$prevDept)
				{
					$item = json_decode($data[$d]['item'], true);

					$iLen = count($item);

					for ($i = 0; $i < $iLen; $i++)
					{
						$qty = $item[$i]['qnty'];
						$unit = $item[$i]['type'];
						$desc = $item[$i]['part'];
						$price = $item[$i]['amount'];
						$price = (float) $price;
						$price = number_format($price, 2);
						$amount = $item[$i]['total'];
						$amount = (float) $amount;
						$total += $amount;
						$amount = number_format($amount, 2);

						$sheet->writeString($x, 0, $qty, $merge);
						$sheet->writeString($x, 1, $unit, $merge);
						$sheet->writeString($x, 2, $desc, $merge);
						$sheet->writeString($x, 3, $price, $merge1);
						$sheet->writeString($x, 4, $amount, $merge1);
						$x++;
					}
				}
				else if ($x > 12 && $dept == $deptReq && $prevDept)
				{
					if ($dept != $prevDept)
					{
						$prevDept = $dept;

						$sheet->setMerge($x, 0, $x, 2);
						$sheet->writeString($x, 0, strtoupper($deptReq), $textWrap);
						$x++;
						$sheet->writeString($x, 0, 'Qty', $textWrap1);
						$sheet->writeString($x, 1, 'Unit', $textWrap1);
						$sheet->writeString($x, 2, 'Description', $textWrap1);
						$sheet->writeString($x, 3, 'Unit Price', $textWrap1);
						$sheet->writeString($x, 4, 'Amount', $textWrap1);
						$x++;

						$item = json_decode($data[$d]['item'], true);

						$iLen = count($item);

						for ($i = 0; $i < $iLen; $i++)
						{
							$qty = $item[$i]['qnty'];
							$unit = $item[$i]['type'];
							$desc = $item[$i]['part'];
							$price = $item[$i]['amount'];
							$price = (float) $price;
							$price = number_format($price, 2);
							$amount = $item[$i]['total'];
							$amount = (float) $amount;
							$total += $amount;
							$amount = number_format($amount, 2);

							$sheet->writeString($x, 0, $qty, $merge);
							$sheet->writeString($x, 1, $unit, $merge);
							$sheet->writeString($x, 2, $desc, $merge);
							$sheet->writeString($x, 3, $price, $merge1);
							$sheet->writeString($x, 4, $amount, $merge1);
							$x++;
						}
					}
					else
					{
						$item = json_decode($data[$d]['item'], true);

						$iLen = count($item);

						for ($i = 0; $i < $iLen; $i++)
						{
							$qty = $item[$i]['qnty'];
							$unit = $item[$i]['type'];
							$desc = $item[$i]['part'];
							$price = $item[$i]['amount'];
							$price = (float) $price;
							$price = number_format($price, 2);
							$amount = $item[$i]['total'];
							$amount = (float) $amount;
							$total += $amount;
							$amount = number_format($amount, 2);

							$sheet->writeString($x, 0, $qty, $merge);
							$sheet->writeString($x, 1, $unit, $merge);
							$sheet->writeString($x, 2, $desc, $merge);
							$sheet->writeString($x, 3, $price, $merge1);
							$sheet->writeString($x, 4, $amount, $merge1);
							$x++;
						}
					}
				}

				if ($x > 12 && $d == $dLen - 1 && $total > 0)
				{
					$sheet->writeString($x, 2, 'TOTAL:', $textWrap1);
					$totalFormat = number_format($total, 2);
					$sheet->writeString($x, 4, $totalFormat, $ttl);
					$prevDept = $dept;
					$x++;
					$sheet->setRow($x, 3, 0);
					$x++;
				}
			}
		}
    }
    else if ($area == 'Makati')
    {
    	$mkti = 0;

    	for ($b = 0; $b < $bLen; $b++)
		{
			$dept = $departments[$b]['branch'];

			if ($dept == 'Makati')
			{
				$mkti = 1;
				continue;
			}

			$total = 0;

			for ($d = 0; $d < $dLen; $d++)
			{
				$deptReq = $data[$d]['branch'];

				if ($x == 12 && $dept == $deptReq)
				{	
					$sheet->setMerge($x, 0, $x, 2);
					$sheet->writeString($x, 0, strtoupper($deptReq), $textWrap);
					$x++;
					$sheet->writeString($x, 0, 'Qty', $textWrap1);
					$sheet->writeString($x, 1, 'Unit', $textWrap1);
					$sheet->writeString($x, 2, 'Description', $textWrap1);
					$sheet->writeString($x, 3, 'Unit Price', $textWrap1);
					$sheet->writeString($x, 4, 'Amount', $textWrap1);
					$x++;

					$item = json_decode($data[$d]['item'], true);

					$iLen = count($item);

					for ($i = 0; $i < $iLen; $i++)
					{
						$qty = $item[$i]['qnty'];
						$unit = $item[$i]['type'];
						$desc = $item[$i]['part'];
						$price = $item[$i]['amount'];
						$price = (float) $price;
						$price = number_format($price, 2);
						$amount = $item[$i]['total'];
						$amount = (float) $amount;
						$total += $amount;
						$amount = number_format($amount, 2);

						$sheet->writeString($x, 0, $qty, $merge);
						$sheet->writeString($x, 1, $unit, $merge);
						$sheet->writeString($x, 2, $desc, $merge);
						$sheet->writeString($x, 3, $price, $merge1);
						$sheet->writeString($x, 4, $amount, $merge1);
						$x++;
					}
				}
				else if ($x > 12 && $dept == $deptReq && !$prevDept)
				{
					$item = json_decode($data[$d]['item'], true);

					$iLen = count($item);

					for ($i = 0; $i < $iLen; $i++)
					{
						$qty = $item[$i]['qnty'];
						$unit = $item[$i]['type'];
						$desc = $item[$i]['part'];
						$price = $item[$i]['amount'];
						$price = (float) $price;
						$price = number_format($price, 2);
						$amount = $item[$i]['total'];
						$amount = (float) $amount;
						$total += $amount;
						$amount = number_format($amount, 2);

						$sheet->writeString($x, 0, $qty, $merge);
						$sheet->writeString($x, 1, $unit, $merge);
						$sheet->writeString($x, 2, $desc, $merge);
						$sheet->writeString($x, 3, $price, $merge1);
						$sheet->writeString($x, 4, $amount, $merge1);
						$x++;
					}
				}
				else if ($x > 12 && $dept == $deptReq && $prevDept)
				{
					if ($dept != $prevDept)
					{
						$prevDept = $dept;

						$sheet->setMerge($x, 0, $x, 2);
						$sheet->writeString($x, 0, strtoupper($deptReq), $textWrap);
						$x++;
						$sheet->writeString($x, 0, 'Qty', $textWrap1);
						$sheet->writeString($x, 1, 'Unit', $textWrap1);
						$sheet->writeString($x, 2, 'Description', $textWrap1);
						$sheet->writeString($x, 3, 'Unit Price', $textWrap1);
						$sheet->writeString($x, 4, 'Amount', $textWrap1);
						$x++;

						$item = json_decode($data[$d]['item'], true);

						$iLen = count($item);

						for ($i = 0; $i < $iLen; $i++)
						{
							$qty = $item[$i]['qnty'];
							$unit = $item[$i]['type'];
							$desc = $item[$i]['part'];
							$price = $item[$i]['amount'];
							$price = (float) $price;
							$price = number_format($price, 2);
							$amount = $item[$i]['total'];
							$amount = (float) $amount;
							$total += $amount;
							$amount = number_format($amount, 2);

							$sheet->writeString($x, 0, $qty, $merge);
							$sheet->writeString($x, 1, $unit, $merge);
							$sheet->writeString($x, 2, $desc, $merge);
							$sheet->writeString($x, 3, $price, $merge1);
							$sheet->writeString($x, 4, $amount, $merge1);
							$x++;
						}
					}
					else
					{
						$item = json_decode($data[$d]['item'], true);

						$iLen = count($item);

						for ($i = 0; $i < $iLen; $i++)
						{
							$qty = $item[$i]['qnty'];
							$unit = $item[$i]['type'];
							$desc = $item[$i]['part'];
							$price = $item[$i]['amount'];
							$price = (float) $price;
							$price = number_format($price, 2);
							$amount = $item[$i]['total'];
							$amount = (float) $amount;
							$total += $amount;
							$amount = number_format($amount, 2);

							$sheet->writeString($x, 0, $qty, $merge);
							$sheet->writeString($x, 1, $unit, $merge);
							$sheet->writeString($x, 2, $desc, $merge);
							$sheet->writeString($x, 3, $price, $merge1);
							$sheet->writeString($x, 4, $amount, $merge1);
							$x++;
						}
					}
				}

				if ($x > 12 && $d == $dLen - 1 && $total > 0)
				{
					$sheet->writeString($x, 2, 'TOTAL:', $textWrap1);
					$totalFormat = number_format($total, 2);
					$sheet->writeString($x, 4, $totalFormat, $ttl);
					$prevDept = $dept;
					$x++;
					$sheet->setRow($x, 3, 0);
					$x++;
				}
			}
		}

		if ($mkti == 1)
		{
			$sql = "SELECT Department
			 		FROM department";

			$departments = $db->getMax($sql);
			$bLen = count($departments);
		    $prevDept = '';

			for ($b = 0; $b < $bLen; $b++)
			{
				$dept = $departments[$b]['Department'];

				$total = 0;

				for ($d = 0; $d < $dLen; $d++)
				{
					$bran = $data[$d]['branch'];

					if ($bran == 'Makati')
					{
						$deptReq = $data[$d]['Department'];

						if ($mkti == 1 && $dept == $deptReq)
						{	
							$mkti = 2;

							$sheet->setMerge($x, 0, $x, 2);
							$sheet->writeString($x, 0, strtoupper($deptReq).' (MAKATI)', $textWrap);
							$x++;

							$item = json_decode($data[$d]['item'], true);

							$iLen = count($item);

							for ($i = 0; $i < $iLen; $i++)
							{
								$qty = $item[$i]['qnty'];
								$unit = $item[$i]['type'];
								$desc = $item[$i]['part'];
								$price = $item[$i]['amount'];
								$price = (float) $price;
								$price = number_format($price, 2);
								$amount = $item[$i]['total'];
								$amount = (float) $amount;
								$total += $amount;
								$amount = number_format($amount, 2);

								$sheet->writeString($x, 0, $qty, $merge);
								$sheet->writeString($x, 1, $unit, $merge);
								$sheet->writeString($x, 2, $desc, $merge);
								$sheet->writeString($x, 3, $price, $merge1);
								$sheet->writeString($x, 4, $amount, $merge1);
								$x++;
							}
						}
						else if ($x > 12 && $dept == $deptReq && !$prevDept)
						{
							$item = json_decode($data[$d]['item'], true);

							$iLen = count($item);

							for ($i = 0; $i < $iLen; $i++)
							{
								$qty = $item[$i]['qnty'];
								$unit = $item[$i]['type'];
								$desc = $item[$i]['part'];
								$price = $item[$i]['amount'];
								$price = (float) $price;
								$price = number_format($price, 2);
								$amount = $item[$i]['total'];
								$amount = (float) $amount;
								$total += $amount;
								$amount = number_format($amount, 2);

								$sheet->writeString($x, 0, $qty, $merge);
								$sheet->writeString($x, 1, $unit, $merge);
								$sheet->writeString($x, 2, $desc, $merge);
								$sheet->writeString($x, 3, $price, $merge1);
								$sheet->writeString($x, 4, $amount, $merge1);
								$x++;
							}
						}
						else if ($x > 12 && $dept == $deptReq && $prevDept)
						{
							if ($dept != $prevDept)
							{
								$prevDept = $dept;

								$sheet->setMerge($x, 0, $x, 2);
								$sheet->writeString($x, 0, strtoupper($deptReq).' (MAKATI)', $textWrap);
								$x++;
								$sheet->writeString($x, 0, 'Qty', $textWrap1);
								$sheet->writeString($x, 1, 'Unit', $textWrap1);
								$sheet->writeString($x, 2, 'Description', $textWrap1);
								$sheet->writeString($x, 3, 'Unit Price', $textWrap1);
								$sheet->writeString($x, 4, 'Amount', $textWrap1);
								$x++;

								$item = json_decode($data[$d]['item'], true);

								$iLen = count($item);

								for ($i = 0; $i < $iLen; $i++)
								{
									$qty = $item[$i]['qnty'];
									$unit = $item[$i]['type'];
									$desc = $item[$i]['part'];
									$price = $item[$i]['amount'];
									$price = (float) $price;
									$price = number_format($price, 2);
									$amount = $item[$i]['total'];
									$amount = (float) $amount;
									$total += $amount;
									$amount = number_format($amount, 2);

									$sheet->writeString($x, 0, $qty, $merge);
									$sheet->writeString($x, 1, $unit, $merge);
									$sheet->writeString($x, 2, $desc, $merge);
									$sheet->writeString($x, 3, $price, $merge1);
									$sheet->writeString($x, 4, $amount, $merge1);
									$x++;
								}
							}
							else
							{
								$item = json_decode($data[$d]['item'], true);

								$iLen = count($item);

								for ($i = 0; $i < $iLen; $i++)
								{
									$qty = $item[$i]['qnty'];
									$unit = $item[$i]['type'];
									$desc = $item[$i]['part'];
									$price = $item[$i]['amount'];
									$price = (float) $price;
									$price = number_format($price, 2);
									$amount = $item[$i]['total'];
									$amount = (float) $amount;
									$total += $amount;
									$amount = number_format($amount, 2);

									$sheet->writeString($x, 0, $qty, $merge);
									$sheet->writeString($x, 1, $unit, $merge);
									$sheet->writeString($x, 2, $desc, $merge);
									$sheet->writeString($x, 3, $price, $merge1);
									$sheet->writeString($x, 4, $amount, $merge1);
									$x++;
								}
							}
						}

						if ($x > 12 && $d == $dLen - 1 && $total > 0)
						{
							$sheet->writeString($x, 2, 'TOTAL:', $textWrap1);
							$totalFormat = number_format($total, 2);
							$sheet->writeString($x, 4, $totalFormat, $ttl);
							$prevDept = $dept;
							$x++;
							$sheet->setRow($x, 3, 0);
							$x++;
						}
					}
				}
			}
		}
    }

	$merge2 = $writer->addFormat();
	$merge2->setFontFamily('Tahoma');
	$sheet->writeString($x + 3, 0, 'Prepared by:', $merge2);
	$sheet->writeString($x + 3, 2, 'Checked by:', $merge);
	$sheet->writeString($x + 5, 0, 'Nicko Kim Flores', $merge2);
	$sheet->writeString($x + 5, 2, 'Nanette Turingan', $merge);

	$writer->close();
?>