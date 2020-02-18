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
			if (data['priv'] != 'emp')
			{
				location.replace('login.html');
			}
		}	
	});
});

$(document).ready(function()
{
	var t = $('#dataTable').DataTable();

	$.ajax(
	{
		type : "POST",
		url : '././php/get-request.php',
		data : "",
		dataType : "json",
		success : function(data)
		{
			var t = $('#dataTable').DataTable();

			t.rows().remove().draw();

			len = data.length;
			for (i = 0; i < len; i++)
			{
				id = data[i]['id'];
				date = data[i]['date'];
				status = data[i]['status'];
				item = data[i]['item'];

				if (status == 'Pending')
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp' + 
						'<button title="edit" data-toggle="modal" data-target=".edit-req" onclick=edit('+id+') class="btn btn-info"><i class="fa fa-pencil">&nbspEdit</i></button> &nbsp' +
						'<button title="view" onclick=del('+id+') class="btn btn-danger"><i class="fa fa-trash">&nbspDelete</i></button> &nbsp'
					]).draw( false );
				}
				else if (status == 'Approved by GM')
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp ' +
						'<button title="Mark as Received" onclick=received('+id+') class="btn btn-success"><i class="fa fa-check"></i>&nbspMark as Received</button>'
					]).draw( false );

				}
				else if (status == 'Received')
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".rview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );

				}
				else
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );

				}
			}
		}	
	});
});

function received(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/received-request.php',
		data : {id : i},
		dataType : "",
		success : function()
		{
			var t = $('#dataTable').DataTable();
			t.rows().remove().draw();

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
						date = data[i]['date'];
						status = data[i]['status'];
						item = data[i]['item'];

						if (status == 'Pending')
						{
							t.row.add(
							[
								id,
								date,
								status,
								'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp' + 
								'<button title="edit" data-toggle="modal" data-target=".edit-req" onclick=edit('+id+') class="btn btn-info"><i class="fa fa-pencil">&nbspEdit</i></button> &nbsp' +
								'<button title="view" onclick=del('+id+') class="btn btn-danger"><i class="fa fa-trash">&nbspDelete</i></button> &nbsp'
							]).draw( false );
						}
						else if (status == 'Approved by GM')
						{
							t.row.add(
							[
								id,
								date,
								status,
								'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp ' +
								'<button title="Mark as Received" onclick=received('+id+') class="btn btn-success"><i class="fa fa-check"></i>&nbspMark as Received</button>'
							]).draw( false );

						}
						else if (status == 'Received')
						{
							t.row.add(
							[
								id,
								date,
								status,
								'<button title="view" data-toggle="modal" data-target=".rview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
							]).draw( false );

						}
						else
						{
							t.row.add(
							[
								id,
								date,
								status,
								'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
							]).draw( false );

						}
					}
				}	
			});
		}
	});
}

$('#time_rview').on('click', function()
{
	$('#rvreplace').prop("checked", false);
	$('#rvaddition').prop("checked", false);
	$('#rview_tbody').children('tr').remove();
});

$('#rview_close').on('click', function()
{
	$('#rvreplace').prop("checked", false);
	$('#rvaddition').prop("checked", false);
	$('#rview_tbody').children('tr').remove();
});

$('#rview').on('hidden.bs.modal', function () 
{
	$('#rvreplace').prop("checked", false);
	$('#rvaddition').prop("checked", false);
	$('#rvpurpose').val('');
  	$('#rview_tbody').children('tr').remove();
});

////////////////////////////////////////////   DELETE BUTTON
function del(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/delete-request.php',
		data : {id : i},
		dataType : "",
		success : function()
		{
			location.reload();
		}
	});
}

////////////////////////////////////////////   EDIT BUTTON
edit_data = [];
string_edit = '';
ids = ''
function edit(i)
{
	ids = i;
	$.ajax(
	{
		type : "POST",
		url :'././php/get-equip.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			$('#ereq').html(i);
			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				purpose = data[i]['purpose'];
				$('#epurpose').val(purpose);

				if (data[i]['replacement'] == '1')
				{
					$('#ereplace').prop("checked", true);
				}

				if (data[i]['addition'] == '1')
				{
					$('#eaddition').prop("checked", true);
				}
				
				grandTotal = 0;

				l = item.length;
				for (j = 0; j < l; j++)
				{

					qnty = item[j]['qnty'];
					type = item[j]['type'];
					items = item[j]['item'];
					amount = item[j]['amount'];
					total = parseFloat(item[j]['total']);
					grandTotal += total;

					obj = 
					{
						qnty : qnty,
						type : type,
						item : items,
						amount : amount,
						total : total
					}

					edit_data.push(obj);
					string_edit = JSON.stringify(edit_data);

					amount = formatNumber(amount);
					total = formatNumber(total);

					$('#edit_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  											'<button style="width:100%" type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
				}
				$('#edit_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + formatNumber(grandTotal) + '</font></td></tr>');
			}
		}
	});
}

$('#eaddItem').on('click', function()
{
	qnty = $('#eqnty').val();
	type = $('#type').val();
	item = $('#eitem').val();
	amount = $('#eamount').val();
	total = $('#etotal').val();

	obj = 
	{
		qnty : qnty,
		type : type,
		item : item,
		amount : amount,
		total : total
	}

	edit_data.push(obj);
	string_edit = JSON.stringify(edit_data);

	$('#edit_tbody').children('tr').remove();

	grandTotal = 0;

	len = edit_data.length;

	for (i = 0; i < len; i++)
	{
		qnty = edit_data[i]['qnty'];
		type = edit_data[i]['type'];
		item = edit_data[i]['item'];
		amount = edit_data[i]['amount'];
		amount = formatNumber(amount)
		total = edit_data[i]['total'];
		total = formatNumber(total);
		
		$('#edit_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  											'<button style="width:100%" type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
		grandTotal += parseFloat(edit_data[i]['total']);
	}
	$('#edit_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + formatNumber(grandTotal) + '</font></td></tr>');
	
	$('#eqnty').val('');
	$('#type').val('');
	$('#eitem').val('');
	$('#eamount').val('');
	$('#etotal').val('');
});

$('#edit_trans').on('click', function()
{
	replace = false;
	addition = false;

	if ($('#eaddition').is(":checked"))
	{
		addition = true;
	}
	else if ($('#ereplace').is(":checked"))
	{
		replace = true;
	}

	data = 
	{
 		item : string_edit,
 		id : ids,
 		replace : replace,
 		addition : addition,
 		purpose : $('#epurpose').val()
	}

	$.ajax(
 	{
 		type : "POST",
 		url : '././php/update-equip.php',
 		data : data,
 		dataType : "",
 		success : function()
 		{
			$('#ereplace').prop("checked", false);
			$('#eaddition').prop("checked", false);

			edit_data = [];
			string_edit = '';
			$('#edit_tbody').children('tr').remove();
 		}
 	});
});

function editDel(i)
{
	var r = i.parentNode.parentNode.rowIndex;
	document.getElementById('edit_table').deleteRow(r);

	edit_data.splice(r-1, 1);
	string_edit = JSON.stringify(edit_data);

	$('#edit_tbody').children('tr').remove();

	grandTotal = 0;

	len = edit_data.length;

	for (i = 0; i < len; i++)
	{
		qnty = edit_data[i]['qnty'];
		type = edit_data[i]['type'];
		item = edit_data[i]['item'];
		amount = edit_data[i]['amount'];
		amount = formatNumber(amount)
		total = edit_data[i]['total'];
		total = formatNumber(total);
		
		$('#edit_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  											'<button style="width:100%" type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
		grandTotal += parseFloat(edit_data[i]['total']);
	}
	$('#edit_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + formatNumber(grandTotal) + '</font></td></tr>');		
}

$('#ereplace').on('click', function()
{
	$('#eaddition').prop("checked", false);
});

$('#eaddition').on('click', function()
{
	$('#ereplace').prop("checked", false);
});

$('#edit_close').on('click', function()
{
	$('#ereplace').prop("checked", false);
	$('#eaddition').prop("checked", false);
	$('#eitem').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#time_edit').on('click', function()
{
	$('#ereplace').prop("checked", false);
	$('#eaddition').prop("checked", false);
	$('#eitem').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

////////////////////////////////////////////////   VIEW BUTTON
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
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vadmin = data[0]['admin_name'];
			vadate = data[0]['admin_date'];
			vgm = data[0]['gm_name'];
			vgdate = data[0]['gm_date'];
			vpurpose = data[0]['purpose'];
			vreceived = data[0]['date_received'];

			$('#vvreq').html(i);
			$('#rvname').html(user);
			$('#rvdate').html(vdate);
			$('#rvhead').html(vhead);
			$('#rhdate').html(hdate);
			$('#rvcheck').html(vcheck);
			$('#rcdate').html(cdate);
			$('#rvadmin').html(vadmin);
			$('#radate').html(vadate);
			$('#rvgm').html(vgm);
			$('#rgdate').html(vgdate);
			$('#rvpurpose').val(vpurpose);
			$('#received').html(vreceived);

			if (data[0]['replacement'] == '1')
			{
				$('#rvreplace').prop("checked", true);
			}

			if (data[0]['addition'] == '1')
			{
				$('#rvaddition').prop("checked", true);
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

					$('#rview_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
			$('#rview_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + formatNumber(grandTotal) + '</font></td></tr>');
		}
	});
}

function view(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/get-equipment.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			$('#vhead').html('');
			$('#hdate').html('');
			$('#vcheck').html('');
			$('#cdate').html('');
			$('#vadmin').html('');
			$('#adate').html('');
			$('#vgm').html('');
			$('#gdate').html('');

			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vadmin = data[0]['admin_name'];
			vadate = data[0]['admin_date'];
			vgm = data[0]['gm_name'];
			vgdate = data[0]['gm_date'];
			vpurpose = data[0]['purpose'];

			$('#vreq').html(i);
			$('#vname').html(user);
			$('#vdate').html(vdate);
			$('#vhead').html(vhead);
			$('#hdate').html(hdate);
			$('#vcheck').html(vcheck);
			$('#cdate').html(cdate);
			$('#vadmin').html(vadmin);
			$('#adate').html(vadate);
			$('#vgm').html(vgm);
			$('#gdate').html(vgdate);
			$('#vpurpose').val(vpurpose);

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

					$('#view_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
			$('#view_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + formatNumber(grandTotal) + '</font></td></tr>');
		}
	});
}

$('#view_close').on('click', function()
{
	$('#vreplace').prop("checked", false);
	$('#vaddition').prop("checked", false);
	$('#vpurpose').val('');
	$('#view_tbody').children('tr').remove();
});

$('#time_view').on('click', function()
{
	$('#vreplace').prop("checked", false);
	$('#vaddition').prop("checked", false);
	$('#vpurpose').val('');
	$('#view_tbody').children('tr').remove();
});


//////////////////////////////////////////     ADD BUTTON
var part_data = [];
var string_data = '';

$('#addItem').on('click', function()
{
	qnty = $('#qnty').val();
	type = $('#type').val();
	item = $('#item').val();
	amount = $('#amount').val();
	total = $('#total').val();

	obj = 
	{
		qnty : qnty,
		type : type,
		item : item,
		amount : amount,
		total : total
	}

	part_data.push(obj);
	string_data = JSON.stringify(part_data);

	$('#add_tbody').children('tr').remove();

	grandTotal = 0;

	len = part_data.length;

	for (i = 0; i < len; i++)
	{
		qnty = part_data[i]['qnty'];
		type = part_data[i]['type'];
		item = part_data[i]['item'];
		amount = part_data[i]['amount'];
		amount = formatNumber(amount)
		total = part_data[i]['total'];
		total = formatNumber(total);

		$('#particular_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + item +'</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  	'<button type="button" style="width:100%" class="btn btn-danger" onclick="deleteRow(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
		
		grandTotal += parseFloat(part_data[i]['total']);
	}

	grandTotal = formatNumber(parseFloat(grandTotal));
	$('#particular_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');

	$('#qnty').val('');
	$('#type').val('pcs');
	$('#item').val('');
	$('#amount').val('');
	$('#total').val('');
});

function deleteRow(i)
{
	var r = i.parentNode.parentNode.rowIndex;
	document.getElementById('particular_table').deleteRow(r);

	part_data.splice(r-1, 1);
	string_data = JSON.stringify(part_data);

	$('#add_tbody').children('tr').remove();

	grandTotal = 0;

	len = part_data.length;

	for (i = 0; i < len; i++)
	{
		qnty = part_data[i]['qnty'];
		type = part_data[i]['type'];
		item = part_data[i]['item'];
		amount = part_data[i]['amount'];
		amount = formatNumber(amount)
		total = part_data[i]['total'];
		total = formatNumber(total);

		$('#particular_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + item +'</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  	'<button type="button" style="width:100%" class="btn btn-danger" onclick="deleteRow(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
		
		grandTotal += parseFloat(part_data[i]['total']);
	}

	grandTotal = formatNumber(parseFloat(grandTotal));
	$('#particular_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
}

$('#add_close').on('click', function()
{
	$('#replace').prop("checked", false);
	$('#addition').prop("checked", false);
	$('#purpose').val('');
	$('#item').val('');

	part_data = [];
	string_data = '';
	$('#add_tbody').children('tr').remove();
});

$('#time_close').on('click', function()
{
	$('#qnty').val('');
	$('#type').val('pcs');
	$('#part').val('');
	$('#amount').val('');
	$('#total').val('');
	$('#item').val('');

	part_data = [];
	string_data = '';
	$('#add_tbody').children('tr').remove();
});

$('#replace').on('click', function()
{
	$('#addition').prop("checked", false);
});

$('#addition').on('click', function()
{
	$('#replace').prop("checked", false);
});

$('#save_trans').on('click', function()
{
	replace = false;
	addition = false;

	if ($('#addition').is(":checked"))
	{
		addition = true;
	}
	else if ($('#replace').is(":checked"))
	{
		replace = true;
	}

	data = 
	{
 		item : string_data,
 		purpose : $('#purpose').val(),
 		replace : replace,
 		addition : addition
	}
	
	$.ajax(
 	{
 		type : "POST",
 		url : '././php/save-request.php',
 		data : data,
 		dataType : "",
 		success : function()
 		{
 			location.reload();
 		}
 	});
});

$('#addReq').on('hidden.bs.modal', function () 
{
	$('#replace').prop("checked", false);
	$('#addition').prop("checked", false);
	$('#purpose').val('');
	$('#item').val('');

	part_data = [];
	string_data = '';
	$('#add_tbody').children('tr').remove();
});

$('#editReq').on('hidden.bs.modal', function () 
{
  	$('#ereplace').prop("checked", false);
	$('#eaddition').prop("checked", false);
	$('#eitem').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#vreplace').prop("checked", false);
	$('#vaddition').prop("checked", false);
	$('#vpurpose').val('');
	$('#view_tbody').children('tr').remove();
});

$("#amount").keyup(function() 
{
	qnty = $('#qnty').val();
	amunt = $(this).val();
	total = qnty * amunt;

	$('#total').val(total.toFixed(2));
});

$("#qnty").keyup(function() 
{
	qnty = $(this).val();
	amunt = $('#amount').val();
	total = qnty * amunt;

	$('#total').val(total.toFixed(2));
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