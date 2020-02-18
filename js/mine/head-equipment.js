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
			if (data['priv'] != 'head')
			{
				location.replace('login.html');
			}
		}	
	});
});

$(document).ready(function()
{
	var t = $('#dataTable').DataTable();
	var ad = $('#adTable').DataTable();

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
				name = data[i]['name'];

				dept = data[i]['Department'];
				hdept = data[i]['head_dept'];
				branch = data[i]['branch'];
				hbranch = data[i]['head_branch'];

				if (status == 'Pending' && dept == hdept && branch == hbranch)
				{
					t.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
				else if (status != 'Pending' && dept == hdept && branch == hbranch)
				{
					if (status == 'Declined by Department Head')
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
					else
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
		}	
	});
});

////////////////////////////////////////////////    VIEW BUTTON VIEW BUTTON
function vview(i)
{
	idss = i;
	$.ajax(
	{
		type : "POST",
		url :'././php/get-equipment.php',
		data : {id : i},
		dataType : "json",
		success : function(data)
		{
			$('#vvhead').html('Department Head');
			$('#vhdate').html('Date');

			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vpurpose = data[0]['purpose'];
			head = data[0]['head'];

			if (head)
			{
				vhdate = data[0]['head_date'];
				vhead = data[0]['head_name'];
				
				$('#vvhead').html(vhead);
				$('#vhdate').html(vhdate);
			}

			$('#vvreq').html(i);
			$('#vvname').html(user);
			$('#vvdate').html(vdate);
			$('#vvpurpose').val(vpurpose);
			

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
				console.log(item);
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
	$('#vvreplace').prop("checked", false);
	$('#vvaddition').prop("checked", false);
	$('#vvpurpose').val('');
	$('#vview_tbody').children('tr').remove();
});

$('#time_vview').on('click', function()
{
	$('#vvreplace').prop("checked", false);
	$('#vvaddition').prop("checked", false);
	$('#vvpurpose').val('');
	$('#vview_tbody').children('tr').remove();
});

////////////////////////////////////////////////   VIEW BUTTON
idss = '';
function view(i)
{
	idss = i;
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
			vpurpose = data[0]['purpose'];

			$('#vreq').html(i);
			$('#vname').html(user);
			$('#vdate').html(vdate);
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
				console.log(item);
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
			grandTotal = formatNumber(grandTotal);
			$('#view_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
		}
	});
}

$('#req_decline').on('click', function()
{
	$.ajax(
	{
		type : "POST",
		url : '././php/head-decline.php',
		data : {id : idss, status : 'Declined by Department Head'},
		dataType : "",
		success : function()
		{
			initTable();
		}
	});
});

$('#req_approve').on('click', function()
{
	$.ajax(
	{
		type : "POST",
		url : '././php/head-decline.php',
		data : {id : idss, status : 'Approved by Department Head'},
		dataType : "",
		success : function()
		{
			initTable();
		}
	});
});

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

				dept = data[i]['Department'];
				hdept = data[i]['head_dept'];
				branch = data[i]['branch'];
				hbranch = data[i]['head_branch'];

				if (status == 'Pending' && dept == hdept && branch == hbranch)
				{
					t.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".view-req" onclick=view('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
				else if (status != 'Pending' && dept == hdept && branch == hbranch)
				{
					if (status == 'Declined by Department Head')
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
					else
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


$('#vviewReq').on('hidden.bs.modal', function () 
{
  	$('#vvreplace').prop("checked", false);
	$('#vvaddition').prop("checked", false);
	$('#vvpurpose').val('');
	$('#vview_tbody').children('tr').remove();
});

$('#viewReq').on('hidden.bs.modal', function () 
{
  	$('#vreplace').prop("checked", false);
	$('#vaddition').prop("checked", false);
	$('#vpurpose').val('');
	$('#view_tbody').children('tr').remove();
});

function formatNumber(num) 
{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}