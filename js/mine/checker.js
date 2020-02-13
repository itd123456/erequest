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

				if (status == 'Pending')
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
				else if (status == 'Checked')
				{
					date = data[i]['check_date'];

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
				name = data[i]['name'];
				$('#name').html(name);

				date = data[i]['req_date'];
				$('#date').html(date);

				depts = data[i]['Department'];
				$('#depts').html(depts);
				item = JSON.parse(data[i]['item']);

				remark = data[i]['check_remark'];
				$('#check_remark').val(remark);

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

					$('#edit_table tbody').append('<tr><td class="qnty">' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
			  									  '<button style="width:100%" type="button" class="btn btn-info" onclick="editDel(this)"><i class="fa fa-pencil" aria-hidden="true"></i>&nbspEdit</button>');
				}
			}
		}
	});
}

index = 0;
function editDel(i)
{
	row = idx = i.closest('tr').rowIndex;
	index = row;
	qntyText = document.getElementById("edit_table").rows[row].cells[0].innerHTML;
	qntyNum = qntyText.match(/\d+/g).map(Number);
	qnty = qntyNum[0];

	$('#edit_qnty').val(qnty);

	if (qntyText.includes('pcs'))
	{
		$('#edit_type').val('pcs');
	}
	else if (qntyText.includes('box'))
	{
		$('#edit_type').val('box');
	}
	else if (qntyText.includes('rim'))
	{
		$('#edit_type').val('rim');
	}

	partText = document.getElementById("edit_table").rows[row].cells[1].innerHTML;
	$('#edit_part').val(partText);

	amount = document.getElementById("edit_table").rows[row].cells[2].innerHTML;
	$('#edit_amount').val(amount);

	total = document.getElementById("edit_table").rows[row].cells[3].innerHTML;
	$('#edit_total').val(total);
}

$('#edit_particular').on('click', function()
{
	if (index > 0)
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

		edit_data[index - 1] = obj
		string_edit = JSON.stringify(edit_data);

		var len = edit_data.length;
		$('#edit_tbody').children('tr').remove();
		for (i = 0; i < len; i++)
		{
			qnty = edit_data[i]['qnty'];
			type = edit_data[i]['type'];
			part = edit_data[i]['part'];
			amount = edit_data[i]['amount'];
			total = edit_data[i]['total'];

			obj = 
			{
				qnty : qnty,
				type : type,
				part : part,
				amount : amount,
				total : total
			}

			$('#edit_table tbody').append('<tr><td class="qnty">' + qnty + ' ' + type + '</td><td>' + part + '</td><td>' + amount + '</td><td>' + total + '</td><td>' +
	  									  '<button style="width:100%" type="button" class="btn btn-info" onclick="editDel(this)"><i class="fa fa-pencil" aria-hidden="true"></i>&nbspEdit</button>');
		}
	}
	
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
 		remark : $('#check_remark').val(),
 		id : ids,
	}

	$.ajax(
 	{
 		type : "POST",
 		url : '././php/check-requisition.php',
 		data : data,
 		dataType : "",
 		success : function()
 		{
 		    // $('#edit_qnty').val('');
			// $('#edit_type').val('pcs');
			// $('#edit_part').val('');
			// $('#edit_amount').val('');
			// $('#edit_total').val('');

			// edit_data = [];
			// string_edit = '';
			// $('#edit_tbody').children('tr').remove();
			location.reload();
 		}
 	});
});

$('#edit_close').on('click', function()
{
	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');
	$('#check_remark').val('');

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
	$('#check_remark').val('');

	edit_data = [];
	string_edit = '';
	$('#c').children('tr').remove();
});

////////////////////////////////////////////////   VIEW BUTTON
function view(i)
{
	$.ajax(
	{
		type : "POST",
		url :'././php/get-checked.php',
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

			len = data.length;
			for (i = 0; i < len; i++)
			{
				name = data[i]['name'];
				$('#vname').html(name);

				date = data[i]['req_date'];
				$('#vdate').html(date);

				depts = data[i]['Department'];
				$('#vdepts').html(depts);
				item = JSON.parse(data[i]['item']);

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
  	$('#edit_qnty').val('');
	$('#edit_type').val('pcs');
	$('#edit_part').val('');
	$('#edit_amount').val('');
	$('#edit_total').val('');
	$('#check_remark').val('');

	edit_data = [];
	string_edit = '';
	$('#edit_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#view_tbody').children('tr').remove();
});