<?php

	require('Spreadsheet/Excel/Writer.php');
  require('database.php');

	$id = json_decode($_GET['id'], true);
  
  $sql = "SELECT e.item, u.branch
          FROM equipment e
          JOIN user_data u
          ON e.user = u.user
          WHERE e.id = $id";

  $db = new Database();
  $item = $db->getMax($sql);
  $branch = $item[0]['branch'];
  $item = json_decode($item[0]['item'], true);

	$writer = new Spreadsheet_Excel_Writer();
  $writer->send('PURCHASE ORDER '.date("Y").'.xls');

	$textWrap = $writer->addFormat();
	$textWrap->setTextWrap(true);

	$sheet = $writer->addWorksheet('Sheet1');

  $merge = $writer->addFormat();
  $merge->setAlign('center');
  $merge->setVAlign('vcenter');

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
  $sheet->writeString(8,0,'SUPPLIER:', $textWrap);
  $sheet->writeString(9,0,'ATTENTION TO:', $textWrap);
  $sheet->writeString(10,0,'CONTACT NO.:', $textWrap);

  //set width of specific cell
  $sheet->setColumn(0,0,14); //Cell A
  $sheet->setColumn(1,1,5); //Cell B
  $sheet->setColumn(2,2,37); //Cell C

  $sheet->setMerge(8, 1, 8, 2);
  $sheet->setMerge(9, 1, 9, 2);
  $sheet->setMerge(10, 1, 10, 2);

  $sheet->writeString(8,3,'DATE::', $textWrap);
  $sheet->writeString(9,3,'TERMS', $textWrap);
  $sheet->writeString(10,3,'P.O.#:', $textWrap);

  //set width of specific cell
  $sheet->setColumn(3,3,14); //Cell D
  $sheet->setColumn(4,4,14); //Cell E

  $textWrap1 = $writer->addFormat();
  $textWrap1->setTextWrap(true);
  $textWrap1->setFontFamily('Tahoma');
  $textWrap1->setBold();
  $textWrap1->setAlign('center');
  $textWrap1->setVAlign('vcenter');

  $sheet->writeString(12,0,'QUANTITY', $textWrap1);
  $sheet->writeString(12,1,'UNIT', $textWrap1);
  $sheet->writeString(12,2,'DESCRIPTION', $textWrap1);
  $sheet->writeString(12,3,'UNIT PRICE', $textWrap1);
  $sheet->writeString(12,4,'AMOUNT', $textWrap1);

  $border = $writer->addFormat();
  $border->setBorder(1);
  $border->setFontFamily('Tahoma');
  $border->setAlign('center');
  $border->setVAlign('vcenter');

  $border2 = $writer->addFormat();
  $border2->setBorder(1);
  $border2->setFontFamily('Tahoma');

  $border3 = $writer->addFormat();
  $border3->setBorder(1);
  $border3->setFontFamily('Tahoma');
  $border3->setAlign('right');
  $border3->setVAlign('vright');

  $x = 13;
  $count = count($item);
  $total = 0;
  for ($i = 0; $i < $count; $i++)
  {
    $qnty = $item[$i]['qnty'];
    $unit = $item[$i]['type'];
    $desc = $item[$i]['item'];
    $price = $item[$i]['amount'];
    $price = (int) $price;
    $price = number_format($price, 2);
    $amount = $item[$i]['total'];
    $amount = (int) $amount;
    $total += $amount;
    $amount = number_format($amount, 2);

    $sheet->writeString($x,0,$qnty, $border);
    $sheet->writeString($x,1,$unit, $border);
    $sheet->writeString($x,2,$desc, $border2);
    $sheet->writeString($x,3,$price, $border3);
    $sheet->writeString($x,4,$amount, $border3);

    $x++;
  }

  $sheet->writeString($x,0,'', $border);
  $sheet->setMerge($x, 1, $x, 3);

  $border1 = $writer->addFormat();
  $border1->setBorder(1);
  $border1->setBold();
  $border1->setFontFamily('Tahoma');
  $border1->setAlign('center');
  $border1->setVAlign('vcenter');

  $branch = strtoupper($branch);
  $sheet->writeString($x,1,$branch, $border1);
  $sheet->writeString($x,2,'', $border);
  $sheet->writeString($x,3,'', $border);
  $sheet->writeString($x,4,'', $border);

  $vat = $writer->addFormat();
  $vat->setColor('red');
  $vat->setBold();
  $vat->setFontFamily('Tahoma');
  $vat->setAlign('center');
  $vat->setVAlign('vcenter');

  $vat1 = $writer->addFormat();
  $vat1->setColor('red');
  $vat1->setBold();
  $vat1->setFontFamily('Tahoma');
  $vat1->setAlign('right');
  $vat1->setVAlign('vright');

  $totalvat = $total * 0.12;
  $totalAmount = $total + $totalvat;
  $totalvat = number_format($totalvat, 2);

  $sheet->writeString($x + 1,3,'12% VAT', $vat);
  $sheet->writeString($x + 1,4,$totalvat, $vat1);

  $ttl = $writer->addFormat();
  $ttl->setBold();
  $ttl->setFontFamily('Tahoma');
  $ttl->setAlign('center');
  $ttl->setVAlign('vcenter');

  $sheet->writeString($x + 2,2,'TOTAL:', $ttl);

  $ttl1 = $writer->addFormat();
  $ttl1->setBold();
  $ttl1->setFontFamily('Tahoma');
  $ttl1->setAlign('right');
  $ttl1->setVAlign('vright');

  $totalAmount = number_format($totalAmount, 2);
  $sheet->writeString($x + 2,4,$totalAmount, $ttl1);

  $merge2 = $writer->addFormat();
  $sheet->writeString($x + 4,0,'Prepared by:', $merge2);
  $sheet->writeString($x + 4,2,'Checked by:', $merge2);

  $ttl2 = $writer->addFormat();
  $ttl2->setBold();
  $ttl2->setFontFamily('Tahoma');

  $sheet->writeString($x + 6,0,'NICKO FLORES', $ttl2);
  $sheet->writeString($x + 6,2,'Nanette Turingan', $merge2);

  $merge1 = $writer->addFormat();
  $merge1->setAlign('right');
  $merge1->setVAlign('vright');

  $sheet->writeString($x + 4,3,'Approved by:', $merge1);
  $sheet->writeString($x + 6,3,'PPP / JLC', $merge1);

  $sheet->setRow($x + 7, 10, 0);
  $sheet->setMerge($x + 8, 0, $x + 8, 2);
  $sheet->writeString($x + 8,0,'TERMS & CONDITION OF PURCHASE:', $merge2);
  $sheet->setMerge($x + 9, 0, $x + 9, 2);
  $sheet->writeString($x + 9,0,'1. This form duly signed by parties concerned', $merge2);
  $sheet->setMerge($x + 10, 0, $x + 10, 2);
  $sheet->writeString($x + 10,0,'constitutes the entire agreement.', $merge2);
  $sheet->setMerge($x + 11, 0, $x + 11, 2);
  $sheet->writeString($x + 11,0,'2. Seller to send original copy of invoices and delivery', $merge2);
  $sheet->setMerge($x + 12, 0, $x + 12, 2);
  $sheet->writeString($x + 12,0,'receipt to Purchasing Dept for processing of payment.', $merge2);
  $sheet->setMerge($x + 13, 0, $x + 13, 2);
  $sheet->writeString($x + 13,0,'3. Deliveries are subject to buyers inspection and', $merge2);
  $sheet->writeString($x + 14,0,'approval.', $merge2);


  $sheet->setMerge($x + 9, 3, $x + 9, 5);
  $sheet->writeString($x + 9,3,'4. The Buyer reserved the right to reject', $merge2);
  $sheet->setMerge($x + 10, 3, $x + 10, 5);
  $sheet->writeString($x + 10,3,'all stock or materials that do not conform', $merge2);
  $sheet->setMerge($x + 11, 3, $x + 11, 4);
  $sheet->writeString($x + 11,3,'the specifications.', $merge2);
  $sheet->setMerge($x + 12, 3, $x + 12, 5);
  $sheet->writeString($x + 12,3,'5. Deliveries must be made within the', $merge2);
  $sheet->setMerge($x + 13, 3, $x + 13, 5);
  $sheet->writeString($x + 13,3,'specified date or buyers reserved the', $merge2);
  $sheet->setMerge($x + 14, 3, $x + 14, 4);
  $sheet->writeString($x + 14,3,'right to cancel PO..', $merge2);

	$writer->close();
?>