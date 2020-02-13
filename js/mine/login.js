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
			if (data['priv'] == 'emp')
			{
				location.replace('index.html');
			}
			else if (data['priv'] == 'checker')
			{
				location.replace('check-requisition.html');
			}
			else if (data['priv'] == 'admin')
			{
				location.replace('admin.html');
			}
			else if (data['priv'] == 'head')
			{
				location.replace('note-equipment.html');
			}
			else if (data['priv'] == 'gm')
			{
				location.replace('gm-equipment.html');
			}
		}	
	});
});

$('#login').on('click', function()
{
	user = $('#username').val();
	pass = $('#password').val();
	data = 
	{
		user : user,
		pass : pass
	}
	
	$.ajax(
	{
		type : "POST",
		url : '././php/login.php',
		data : data,
		dataType : "json",
		success : function(data)
		{
			len = data.length;
			if (len > 0)
			{
				if (data[0]['priv'] == 'emp')
				{
					location.replace('index.html');
				}
			}
			else
			{
				alert('Invalid username or password');
			}
		}
	});
});