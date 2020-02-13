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
	loadData();
});



function received(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/received-requisition.php',
		data : {id : i},
		dataType : "",
		success : function()
		{
			loadData();
		}
	});
}

function vview(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/get-approver.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			cby = data[0]['checked_by'];
			cdate = data[0]['check_date'];
			cremark = data[0]['check_remark'];

			$('#vvreq').html(i);
			$('#vcby').html(cby);
			$('#vcdate').html(cdate);
			$('#vcremark').val(cremark);

			aby = data[0]['approved_by'];
			adate = data[0]['app_date'];
			aremark = data[0]['app_remark'];
			dreceived = data[0]['received_date'];

			$('#vaby').html(aby);
			$('#vadate').html(adate);
			$('#varemark').val(aremark);
			$('#dreceive').html(dreceived);

			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					qnty = item[j]['qnty'];
					type = item[j]['type'];
					part = item[j]['part'];
					amount = item[j]['amount'];
					total = item[j]['total'];

					$('#vview_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
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

function loadData()
{
	var t = $('#dataTable').DataTable();
	t.rows().remove().draw();
	$.ajax(
	{
		type : "POST",
		url : '././php/get-req.php',
		data : "",
		dataType : "json",
		success : function(data)
		{
			len = data.length;
			for (i = 0; i < len; i++)
			{
				id = data[i]['id'];
				date = data[i]['req_date'];
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
				else if (status == 'Approved')
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp' + 
						'<button title="Mark as Received" data-toggle="modal" data-target=".rview" onclick=received('+id+') class="btn btn-success"><i class="fa fa-check">&nbspMark as Received</i></button>'
					]).draw( false );
				}
				else if (status == 'Received')
				{
					t.row.add(
					[
						id,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button>'
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

////////////////////////////////////////////   DELETE BUTTON
function del(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/delete-requisition.php',
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
		url :'././php/get-item.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			$('#ereq').html(i);
			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					qnty = item[j]['qnty'];
					type = item[j]['type'];
					part = item[j]['part'];
					amount = item[j]['amount'];
					total = item[j]['total'];

					obj = 
					{
						qnty : qnty,
						type : type,
						part : part,
						amount : amount,
						total : total
					}

					edit_data.push(obj);
					string_edit = JSON.stringify(edit_data);

					$('#edit_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  											'<button type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button>');
				}
			}
		}
	});
}

$('#edit_particular').on('click', function()
{
	qnty = $('#edit_qnty').val();
	type = $('#edit_type').val();
	part = $('#edit_part').val();
	amount = $('#edit_amount').val();
	total = $('#edit_total').val();

	obj = 
	{
		qnty : qnty,
		type : type,
		part : part,
		amount : amount,
		total : total
	}

	edit_data.push(obj);
	string_edit = JSON.stringify(edit_data);

	console.log(edit_data);

	$('#edit_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  	'<button type="button" class="btn btn-danger" onclick="editDel(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button>');
	
	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');
});

$('#edit_trans').on('click', function()
{
	data = 
	{
 		item : string_edit,
 		id : ids
	}

	$.ajax(
 	{
 		type : "POST",
 		url : '././php/update-requisition.php',
 		data : data,
 		dataType : "",
 		success : function()
 		{
 			$('#edit_qnty').val('');
			$('#edit_type').val('pcs');
			$('#edit_part').val('');
			$('#edit_amount').val('');
			$('#edit_total').val('');

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

$('#edit_close').on('click', function()
{
	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#time_edit').on('click', function()
{
	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

////////////////////////////////////////////////   VIEW BUTTON
function view(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/get-approver.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			cby = data[0]['checked_by'];
			cdate = data[0]['check_date'];
			cremark = data[0]['check_remark'];

			$('#vreq').html(i);
			$('#cby').html(cby);
			$('#cdate').html(cdate);
			$('#cremark').val(cremark);

			aby = data[0]['approved_by'];
			adate = data[0]['app_date'];
			aremark = data[0]['app_remark'];

			$('#aby').html(aby);
			$('#adate').html(adate);
			$('#aremark').val(aremark);

			len = data.length;
			for (i = 0; i < len; i++)
			{
				item = JSON.parse(data[i]['item']);

				l = item.length;
				for (j = 0; j < l; j++)
				{
					qnty = item[j]['qnty'];
					type = item[j]['type'];
					part = item[j]['part'];
					amount = item[j]['amount'];
					total = item[j]['total'];

					$('#view_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
		}
	});
}

$('#view_close').on('click', function()
{
	$('#view_tbody').children('tr').remove();
});

$('#time_view').on('click', function()
{
	$('#view_tbody').children('tr').remove();
});


//////////////////////////////////////////     ADD BUTTON
var part_data = [];
var string_data = '';

$('#particular').on('click', function()
{
	qnty = $('#qnty').val();
	type = $('#type').val();
	part = $('#part').val();
	amount = $('#amount').val();
	total = $('#total').val();

	obj = 
	{
		qnty : qnty,
		type : type,
		part : part,
		amount : amount,
		total : total
	}

	part_data.push(obj);
	string_data = JSON.stringify(part_data);

	$('#particular_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  	'<button type="button" class="btn btn-danger" onclick="deleteRow(this)"><i class="fa fa-trash" aria-hidden="true"></i>&nbspDelete</button>');
	
	$('#qnty').val('');
	$('#type').val('pcs');
	$('#part').val('');
	$('#amount').val('');
	$('#total').val('');
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
	$('#qnty').val('');
	$('#type').val('pcs');
	$('#part').val('');
	$('#amount').val('');
	$('#total').val('');

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

	part_data = [];
	string_data = '';
	$('#add_tbody').children('tr').remove();
});

$('#save_trans').on('click', function()
{
	data = 
	{
 		item : string_data
	}

	$.ajax(
 	{
 		type : "POST",
 		url : '././php/save-requisition.php',
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
	$('#qnty').val('');
	$('#type').val('pcs');
	$('#part').val('');
	$('#amount').val('');
	$('#total').val('');

	part_data = [];
	string_data = '';
	$('#add_tbody').children('tr').remove();
});

$('#editReq').on('hidden.bs.modal', function () 
{
  	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#view_tbody').children('tr').remove();
});

$('#vviewReq').on('hidden.bs.modal', function () 
{
  	$('#vview_tbody').children('tr').remove();
});