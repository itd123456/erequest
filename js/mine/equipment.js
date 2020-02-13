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

				l = item.length;
				for (j = 0; j < l; j++)
				{
					items = item[j]['item'];

					obj = 
					{
						item : items,
					}

					edit_data.push(obj);
					string_edit = JSON.stringify(edit_data);

					$('#edit_table tbody').append('<tr><td>' + items + '</td><td>' +
			  											'<button style="width:100%" type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
				}
			}
		}
	});
}

$('#eaddItem').on('click', function()
{
	item = $('#eitem').val();

	obj = 
	{
		item : item
	}

	edit_data.push(obj);
	string_edit = JSON.stringify(edit_data);

	$('#edit_table tbody').append('<tr><td>' + item + '</td><td>' +
			  	'<button type="button" style="width:100%" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
	
	$('#eitem').val('');
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


			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					items = item[j]['item'];

					$('#rview_table tbody').append('<tr><td>' + items + '</td></tr>');
				}
			}
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


			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					items = item[j]['item'];

					$('#view_table tbody').append('<tr><td>' + items + '</td></tr>');
				}
			}
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
	item = $('#item').val();

	obj = 
	{
		item : item
	}

	part_data.push(obj);
	string_data = JSON.stringify(part_data);

	$('#particular_table tbody').append('<tr><td>' + item + '</td><td>' +
			  	'<button type="button" style="width:100%" class="btn btn-danger" onclick="deleteRow(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button></td></tr>');
	
	$('#item').val('');
});

function deleteRow(i)
{
	var r = i.parentNode.parentNode.rowIndex;
	document.getElementById('particular_table').deleteRow(r);

	part_data.splice(r-1, 1);
	string_data = JSON.stringify(part_data);
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