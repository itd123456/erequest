$(document).ready(function()
{
	$.ajax(
	{
		type : "POST",
		url : '././php/check-session.php',
		data : "",
		dataType : "json",
		success : function(data)
		{
			if (data['priv'] != 'checker')
			{
				location.replace('login.html');
			}
		}	
	});
});

$(document).ready(function()
{
	initTable();
});

function genExcel(i)
{
	window.open('././php/equip_excel.php?id='+i);
}

////////////////////////////////////////////////   VVIEW BUTTON
function vview(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/get-equipment.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vbranch = data[0]['branch'];
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vpurpose = data[0]['purpose'];
				
			$('#vv_req').html(i);
			$('#vvname').html(user);
			$('#vvdate').html(vdate);
			$('#vvbranch').html(vbranch);
			$('#vvhead').html(vhead);
			$('#vhdate').html(hdate);
			$('#vvcheck').html(vcheck);
			$('#vcdate').html(cdate);
			$('#vvpurpose').val(vpurpose);


			$('#vvreplace').prop("checked", false);
			$('#vvaddition').prop("checked", false);

			if (data[0]['replacement'] == '1')
			{
				$('#vvreplace').prop("checked", true);
			}

			if (data[0]['addition'] == '1')
			{
				$('#vvaddition').prop("checked", true);
			}


			grandTotal = 0;

			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					qnty = item[j]['qnty'];
					type = item[j]['type'];
					items = item[j]['item'];
					amount = formatNumber(item[j]['amount']);
					total = parseFloat(item[j]['total']);
					grandTotal += total;
					total = formatNumber(total);

					obj = 
					{
						qnty : qnty,
						type : type,
						item : items,
						amount : item[j]['amount'],
						total : item[j]['total']
					}

					editItems.push(obj);
					editString = JSON.stringify(editItems);

					$('#vview_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
			grandTotal = formatNumber(grandTotal);
			$('#vview_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
		}
	});
}

$('#vview_close').on('click', function()
{
	$('#vview_tbody').children('tr').remove();
});

$('#time_vview').on('click', function()
{
	$('#vview_tbody').children('tr').remove();
});

////////////////////////////////////////////////   VIEW BUTTON
editItems = [];
editString = '';
eID = 0;
function view(i)
{
	eID = i;

	$.ajax(
	{
		type : "POST",
		url :'././php/get-equipment.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vbranch = data[0]['branch'];
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vpurpose = data[0]['purpose'];
				
			$('#v_req').html(i);
			$('#vname').html(user);
			$('#vdate').html(vdate);
			$('#vbranch').html(vbranch);
			$('#vhead').html(vhead);
			$('#hdate').html(hdate);
			$('#vpurpose').val(vpurpose);

			$('#vreplace').prop("checked", false);
			$('#vaddition').prop("checked", false);

			if (data[0]['replacement'] == '1')
			{
				$('#vreplace').prop("checked", true);
			}

			if (data[0]['addition'] == '1')
			{
				$('#vaddition').prop("checked", true);
			}

			grandTotal = 0;

			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					qnty = item[j]['qnty'];
					type = item[j]['type'];
					items = item[j]['item'];
					amount = formatNumber(item[j]['amount']);
					total = parseFloat(item[j]['total']);
					grandTotal += total;
					total = formatNumber(total);

					obj = 
					{
						qnty : qnty,
						type : type,
						item : items,
						amount : item[j]['amount'],
						total : item[j]['total']
					}

					editItems.push(obj);
					editString = JSON.stringify(editItems);

					$('#view_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td><td> <button class="btn btn-info" style="width: 100%" onclick="editItem(this)"><i class="fa fa-pencil" aria-hidden="true"></i>&nbspEdit</button> </td></tr>');
				}
			}
			grandTotal = formatNumber(grandTotal);
			$('#view_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
		}
	});
}

ind = '';
function editItem(i)
{
	row = idx = i.closest('tr').rowIndex;
	ind = row - 1;

	qntyText = document.getElementById("view_table").rows[row].cells[0].innerHTML;
	qntyNum = qntyText.match(/\d+/g).map(Number);
	qnty = qntyNum[0];

	$('#eqnty').val(qnty);

	if (qntyText.includes('pcs'))
	{
		$('#etype').val('pcs');
	}
	else if (qntyText.includes('box'))
	{
		$('#etype').val('box');
	}
	else if (qntyText.includes('ream'))
	{
		$('#etype').val('ream');
	}
	else if (qntyText.includes('pack'))
	{
		$('#etype').val('pack');
	}
	else if (qntyText.includes('roll'))
	{
		$('#etype').val('roll');
	}

	item = document.getElementById("view_table").rows[row].cells[1].innerHTML;
	amount = document.getElementById("view_table").rows[row].cells[2].innerHTML;
	amount = amount.replace(',','');
	total = document.getElementById("view_table").rows[row].cells[3].innerHTML;
	total = total.replace(',','');

	$('#eItem').val(item);
	$('#eamount').val(amount);
	$('#etotal').val(total);
}

$('#addeItem').on('click', function()
{
	$('#view_tbody').children('tr').remove();

	obj = 
	{
		qnty : $('#eqnty').val(),
		type : $('#etype').val(),
		item : $('#eItem').val(),
		amount : $('#eamount').val(),
		total : $('#etotal').val()
	}

	editItems[ind] = obj;
	editString = JSON.stringify(editItems);
	console.log(editItems);
	$('#view_tbody').children('tr').remove();

	grandTotal = 0;

	len = editItems.length;

	for (i = 0; i < len; i++)
	{
		qnty = editItems[i]['qnty'];
		type = editItems[i]['type'];
		items = editItems[i]['item'];
		amount = formatNumber(editItems[i]['amount']);
		total = parseFloat(editItems[i]['total']);
		grandTotal += total;
		total = formatNumber(total);

		$('#view_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td><td> <button class="btn btn-info" style="width: 100%" onclick="editItem(this)"><i class="fa fa-pencil" aria-hidden="true"></i>&nbspEdit</button> </td></tr>');
	}

	grandTotal = formatNumber(grandTotal);
	$('#view_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
	
	$('#eqnty').val('');
	$('#etype').val('pcs');
	$('#eItem').val('');
	$('#eamount').val('');
	$('#etotal').val('');
});

$('#check').on('click', function()
{
	$.ajax(
	{
		type : "POST",
		url : "././php/check-equip.php",
		data : {id : eID, item : editString},
		dataType : "",
		success : function()
		{
			editItems = [];
			editString = '';

			$('#view_tbody').children('tr').remove();

			initTable();
		}
	});
});

$('#view_close').on('click', function()
{
	$('#eqnty').val('');
	$('#etype').val('pcs');
	$('#eItem').val('');
	$('#eamount').val('');
	$('#etotal').val('');
	$('#view_tbody').children('tr').remove();
});

$('#time_view').on('click', function()
{
	$('#eqnty').val('');
	$('#etype').val('pcs');
	$('#eItem').val('');
	$('#eamount').val('');
	$('#etotal').val('');
	$('#view_tbody').children('tr').remove();
});

$('#vviewReq').on('hidden.bs.modal', function () 
{
  	$('#vview_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#eqnty').val('');
	$('#etype').val('pcs');
	$('#eItem').val('');
	$('#eamount').val('');
	$('#etotal').val('');
	$('#view_tbody').children('tr').remove();
});


$("#eamount").keyup(function() 
{
	qnty = $('#eqnty').val();
	amunt = $(this).val();
	total = qnty * amunt;

	$('#etotal').val(total.toFixed(2));
});

$("#eqnty").keyup(function() 
{
	qnty = $(this).val();
	amunt = $('#eamount').val();
	total = qnty * amunt;

	$('#etotal').val(total.toFixed(2));
});

function formatNumber(num) 
{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function initTable()
{
	var t = $('#dataTable').DataTable();
	var ad = $('#adTable').DataTable();

	t.rows().remove().draw();
	ad.rows().remove().draw();

	$.ajax(
	{
		type : "POST",
		url : '././php/get-request.php',
		data : "",
		dataType : "json",
		success : function(data)
		{
			len = data.length;
			for (i = 0; i < len; i++)
			{
				id = data[i]['id'];
				name = data[i]['name'];
				date = data[i]['date'];
				status = data[i]['status'];
				item = data[i]['item'];

				if (status == 'Approved by Department Head')
				{
					t.row.add(
					[
						id,
						name,
						date,
						'Noted by Department Head',
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button>'
					]).draw( false );
				}
				else if (status == 'Approved by GM')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp' +
						'<button title="generate excel"  onclick=genExcel('+id+') class="btn btn-success"><i class="fa fa-eye"></i>&nbspGenerate Excel</button>'
					]).draw( false );
				}
				else if (status != 'Approved by Department Head' && status != 'Pending' && status != 'Declined by Department Head')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						'Checked',
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );

				}
			}
		}	
	});
}