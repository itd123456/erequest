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
	var t = $('#dataTable').DataTable();
	var c = $('#checkTable').DataTable();
	$.ajax(
	{
		type : "POST",
		url : '././php/get-pending.php',
		data : "",
		dataType : "json",
		success : function(data)
		{
			len = data.length;
			for (i = 0; i < len; i++)
			{
				id = data[i]['id'];
				name = data[i]['name'];
				date = data[i]['req_date'];
				status = data[i]['status'];
				item = data[i]['item'];

				if (status == 'Checked')
				{
					t.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".edit-req" onclick=edit('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
				else
				{
					date = data[i]['app_date'];

					c.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );

				}
			}
		}	
	});
});


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
		url :'././php/get-checked.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			$('#r_req').html(i);

			len = data.length;
			for (i = 0; i < len; i++)
			{
				name = data[i]['name'];
				$('#name').html(name);

				date = data[i]['req_date'];
				$('#date').html(date);

				depts = data[i]['Department'];
				$('#depts').html(depts);

				remark = data[i]['check_remark'];
				$('#check_remark').html(remark);

				cby = data[0]['checked_by'];
				cdate = data[0]['check_date'];
				cremark = data[0]['check_remark'];

				$('#cby1').html(cby);
				$('#cdate1').html(cdate);
				$('#cremark1').val(cremark);

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

					$('#edit_table tbody').append('<tr><td class="qnty">' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
		}
	});
}

$('#edit_trans').on('click', function()
{
	data = 
	{
 		item : string_edit,
 		remark : $('#app_remark1').val(),
 		id : ids,
	}

	$.ajax(
 	{
 		type : "POST",
 		url : '././php/approve-requisition.php',
 		data : data,
 		dataType : "",
 		success : function()
 		{
			location.reload();
 		}
 	});
});

$('#decline').on('click', function()
{
	$.ajax(
	{
		type : "POST",
		url :'././php/decline-requisition.php',
		data : {id : ids},
		dataType : "",
		success : function()
		{
			location.reload();
		}
	});
});

$('#edit_close').on('click', function()
{
	$('#app_remark1').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#time_edit').on('click', function()
{
	$('#app_remark1').val('');

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
			$('#cby').html('');
			$('#cdate').html('');
			$('#cremark').val('');
			$('#aby').html('');
			$('#adate').html('');
			$('#aremark').val('');

			$('#v_req').html(i);

			cby = data[0]['checked_by'];
			cdate = data[0]['check_date'];
			cremark = data[0]['check_remark'];

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


$('#editReq').on('hidden.bs.modal', function () 
{
	$('#app_remark1').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#view_tbody').children('tr').remove();
});