<?php
	
	require('Spreadsheet/Excel/Writer.php');
  	require('database.php');

	$month = $_GET['mon'];
	$year = $_GET['yr'];
	$db = new Database();

	$prevMon = '';
	$prevYear = '';

	if ($month == '01')
	{
		$prevMon = '12';
		$prevYear = (int) $year - 1;
	}
	else
	{
		$prevMon = (int) $month - 1;
		
		if ($prevMon < 10)
		{
			$prevMon = '0'.$prevMon;
		}
	}

	$departments = "SELECT Department
				 FROM department";

	$departments = $db->getMax($departments);

	$data = [];

	for ($p = 16; $p <= 31; $p++)
	{
		$appDate = '%'.$prevYear.'-'.$prevMon.'-'.$p.'%';

		$sql = "SELECT r.item, u.Department
				FROM requisition r
				JOIN user_data u
				ON r.user = u.user
				WHERE app_date LIKE '$appDate'";

		$prevData = $db->getMax($sql);
		
		$check = count($prevData);
		
		if ($check > 0)
		{
			for ($i = 0; $i < $check; $i++)
			{
				array_push($data, $prevData[$i]);
			}
		}
	}

	for ($c = 1; $c <= 15; $c++)
	{
		$appDate = '%'.$year.'-'.$month.'-'.$c.'%';

		if ($c < 10)
		{
			$appDate = '%'.$year.'-'.$month.'-0'.$c.'%';
		}

		$sql = "SELECT r.item, u.Department
				FROM requisition r
				JOIN user_data u
				ON r.user = u.user
				WHERE app_date LIKE '$appDate'";

		$currData = $db->getMax($sql);
		
		$check = count($currData);
		
		if ($check > 0)
		{
			for ($i = 0; $i < $check; $i++)
			{
				array_push($data, $currData[$i]);
			}
		}	
	}

	$writer = new Spreadsheet_Excel_Writer();
  	$writer->send('SUPPLIES '.date("Y").'.xls');

	$textWrap = $writer->addFormat();
	$textWrap->setTextWrap(true);
	$textWrap->setFontFamily('Tahoma');

	$sheet = $writer->addWorksheet('Sheet1');

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

	$bLen = count($departments);
	$dLen = count($data);
	$x = 12;

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

    $prevDept = '';

	for ($b = 0; $b < $bLen; $b++)
	{
		$dept = $departments[$b]['Department'];
		$total = 0;

		for ($d = 0; $d < $dLen; $d++)
		{
			$deptReq = $data[$d]['Department'];

			if ($x == 12 && $dept == $deptReq)
			{	
				$sheet->setMerge($x, 0, $x, 2);
				$sheet->writeString($x, 0, $deptReq, $textWrap);
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
					$sheet->writeString($x, 0, $deptReq, $textWrap);
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

	$merge2 = $writer->addFormat();
	$merge2->setFontFamily('Tahoma');
	$sheet->writeString($x + 3, 0, 'Prepared by:', $merge2);
	$sheet->writeString($x + 3, 2, 'Checked by:', $merge);
	$sheet->writeString($x + 5, 0, 'Nicko Kim Flores', $merge2);
	$sheet->writeString($x + 5, 2, 'Nanette Turingan', $merge);

	$writer->close();
?>