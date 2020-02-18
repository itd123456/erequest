<?php

	require('Spreadsheet/Excel/Writer.php');

	$data = json_decode($_GET['downData'], true);

	//length of data
  	$count = count($data);

  	$t = $data[$count - 1]['tel'];
  	$m = $data[$count - 1]['mon'];
  	$y = $data[$count - 1]['yr'];

	function cleanData($str)
  	{
   		$str = preg_replace("/\t/", "\\t", $str);
    	$str = preg_replace("/\r?\n/", "\\n", $str);
    	if(strstr($str, '"')) 
    		$str = '"' . str_replace('"', '""', $str) . '"';

    	return $str;
  	}

  	$writer = new Spreadsheet_Excel_Writer();
  	$writer->send('Monthly Down '.$t.' '.$m.' '.$y.'.xls');

  	$textWrap = $writer->addFormat();
  	$textWrap->setTextWrap(true);

  	$sheet = $writer->addWorksheet('Sheet1');

  	$format = $writer->addFormat();
  	$format->setFgColor(5);
  	$format->setAlign('center');
  	$format->setVAlign('vcenter');

  	//Set Column Width of specific cell
  	$sheet->setColumn(2,4,30);
  	$sheet->setColumn(5,5,12);
  	$sheet->setColumn(6,6,50);
  	$sheet->setColumn(7,7,20);

  	//Create the Header of the excel file
  	$sheet->writeString(0,0, "Ticket No", $format);
  	$sheet->writeString(0,1, "Branch", $format);
  	$sheet->writeString(0,2, "Date Started", $format);
  	$sheet->writeString(0,3, "Date Solved", $format);
  	$sheet->writeString(0,4, "Total Down Time", $format);
  	$sheet->writeString(0,5, "Concern", $format);
  	$sheet->writeString(0,6, "Remarks", $format);
  	$sheet->writeString(0,7, "Assigned To", $format);

  	//Set the alignment of branch cell
  	$merge = $writer->addFormat();
  	$merge->setFgColor(53);
  	$merge->setVAlign('vcenter');
  	$merge->setAlign('center');
  	$merge->setBold();
  	//Create a merge cell
  	$sheet->setMerge(1, 0, 1, 7);
  	$sheet->writeString(1,0, $data[0]['Telco'], $merge);

  	//row count
  	$xAxis = 2;

  	//Set the alignment of data
  	$textWrap->setVAlign('vcenter');
  	$textWrap->setAlign('center');
  	$textWrap->setFontFamily('Calibri');

  	for ($i = 0; $i < $count - 1; $i++)
  	{
  		if ($i > 0 && $data[$i]['Telco'] != $data[$i-1]['Telco'])
  		{
  			$sheet->setMerge($xAxis, 0, $xAxis, 7);
  			$telco = strtoupper($data[$i]['Telco']);
	  		$sheet->writeString($xAxis,0, $telco, $merge);

	  		$xAxis++;
  		}

  		$ticket = $data[$i]['Ticket_No'];
  		$branch = $data[$i]['Branch'];
  		$start = $data[$i]['Date_Started'];
  		$solve = $data[$i]['solve'];
  		$downtime = $data[$i]['Total_Down_Time'];
  		$concern = $data[$i]['Concern'];
  		$cleanWord = $data[$i]['Remarks'];
  		$remarks = cleanData($cleanWord);

  		$sheet->writeString($xAxis,0, $ticket, $textWrap);
  		$sheet->writeString($xAxis,1, $branch, $textWrap);
  		$sheet->writeString($xAxis,2, $start, $textWrap);
  		$sheet->writeString($xAxis,3, $solve, $textWrap);
  		$sheet->writeString($xAxis,4, $downtime, $textWrap);
  		$sheet->writeString($xAxis,5, $concern, $textWrap);
  		$sheet->writeString($xAxis,6, "$cleanWord", $textWrap);
  		$sheet->writeString($xAxis,7, 'Maverick Kirk Doyugan', $textWrap);

  		$xAxis++;
  	}

  	$writer->close();
?>