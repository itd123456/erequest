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
				name = data[i]['name'];
				date = data[i]['date'];
				status = data[i]['status'];
				item = data[i]['item'];

				if (status == 'Approved by GM')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".vview-req" onclick=vview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
				else if (status == 'Received')
				{
					ad.row.add(
					[
						id,
						name,
						date,
						status,
						'<button title="view" data-toggle="modal" data-target=".rview-req" onclick=rview('+id+') class="btn btn-primary"><i class="fa fa-eye"></i>&nbspView</button> &nbsp'
					]).draw( false );
				}
			}
		}	
	});
});

function rview(i)
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

			$('#rv_req').html(i);
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

					obj = 
					{
						qnty : qnty,
						type : type,
						item : items,
						amount : item[j]['amount'],
						total : item[j]['total']
					}

					$('#rview_table tbody').append('<tr><td>' + qnty + ' ' + type + '</td><td>' + items + '</td><td>' + amount + '</td><td>' + total + '</td></tr>');
				}
			}
			grandTotal = formatNumber(grandTotal);
			$('#rview_table tbody').append('<tr><td>' + '<font color="red">GRAND TOTAL</font>' + '</td><td>' + ' ' + '</td><td>' + ' ' + '</td><td><font color="red"> P ' + grandTotal + '</font></td></tr>');
		}
	});
}

$('#time_rview').on('click', function()
{
	$('#rview_tbody').children('tr').remove();
});

$('#rview_close').on('click', function()
{
	$('#rview_tbody').children('tr').remove();
});

$('#rview').on('hidden.bs.modal', function () 
{
	$('#rvreplace').prop("checked", false);
	$('#rvaddition').prop("checked", false);
	$('#rvpurpose').val('');
  	$('#rview_tbody').children('tr').remove();
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
			user = data[0]['user_name'];
			vdate = data[0]['date'];
			vbranch = data[0]['branch'];
			vhead = data[0]['head_name'];
			hdate = data[0]['head_date'];
			vcheck = data[0]['check_name'];
			cdate = data[0]['check_date'];
			vadmin = data[0]['admin_name'];
			vadate = data[0]['admin_date'];
			vgm = data[0]['gm_name'];
			vgdate = data[0]['gm_date'];
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
			$('#vvadate').html(vadate);
			$('#vvgm').html(vgm);
			$('#vvgdate').html(vgdate);
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

$('#vviewReq').on('hidden.bs.modal', function () 
{
	$('#vview_tbody').children('tr').remove();
});

$('#rviewReq').on('hidden.bs.modal', function () 
{
  	$('#view_tbody').children('tr').remove();
});

function formatNumber(num) 
{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}