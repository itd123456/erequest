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
			if (data['priv'] != 'admin')
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
			$('#vvhead').html('');
			$('#vhdate').html('');
			$('#vvcheck').html('');
			$('#vcdate').html('');
			$('#vvadmin').html('');
			$('#vvadate').html('');;

			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vbranch = data[0]['branch'];
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vadmin = data[0]['admin_name'];
			vadate = data[0]['admin_date'];
			vpurpose = data[0]['purpose'];
				
			$('#vv_req').html(i);
			$('#vvname').html(user);
			$('#vvdate').html(vdate);
			$('#vvbranch').html(vbranch);
			$('#vvhead').html(vhead);
			$('#vhdate').html(hdate);
			$('#vvcheck').html(vcheck);
			$('#vcdate').html(cdate);
			$('#vvadmin').html(vadmin);
			$('#vvadate').html(vadate);;
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
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vpurpose = data[0]['purpose'];
				
			$('#v_req').html(i);
			$('#vname').html(user);
			$('#vdate').html(vdate);
			$('#vbranch').html(vbranch);
			$('#vhead').html(vhead);
			$('#hdate').html(hdate);
			$('#vcheck').html(vcheck);
			$('#cdate').html(cdate);
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
	else if (qntyText.includes('rim'))
	{
		$('#etype').val('rim');
	}
	else if (qntyText.includes('pack'))
	{
		$('#etype').val('pack');
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
		url : "././php/admin-equip.php",
		data : {id : eID, item: editString},
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

$('#decline').on('click', function()
{
	$.ajax(
	{
		type : "POST",
		url : "././php/admin-decline.php",
		data : {id : eID},
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
	$('#view_tbody').children('tr').remove();
});

$('#time_view').on('click', function()
{
	$('#view_tbody').children('tr').remove();
});


$('#vviewReq').on('hidden.bs.modal', function () 
{
	$('#vview_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
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

				if (status == 'Checked by Admin(Checker)')
				{
					t.row.add(
					[
						id,
						name,
						date,
						'Checked by Admin(Checker)',
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button>'
					]).draw( false );
				}
				else if (status == 'Declined by Admin')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						'Declined',
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
				else if (status != 'Approved by Department Head' && status != 'Pending' && status != 'Declined by Department Head' && status != 'Checked by Admin(Checker)')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						'Approved',
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );

				}
			}
		}	
	});
}
