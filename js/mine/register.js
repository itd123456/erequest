$(document).ready(function()
{
	$.ajax(
	{
		type : "POST",
		url : '././php/getBranchDept.php',
		data : "",
		dataType: "json",
		success : function(data)
		{
			len = data.length;

			for (var i = 0; i < len; i++)
  			{
  				Department = data[i]['Department'];

  				$('#dept').append($('<option>', {value:Department, text:Department}));
  			}
		}
	});

	$.ajax(
	{
		type : "POST",
		url : '././php/getDept.php',
		data : "",
		dataType: "json",
		success : function(data)
		{
			len = data.length;

			for (var i = 0; i < len; i++)
  			{
  				branch = data[i]['branch'];

  				$('#branch').append($('<option>', {value:branch, text:branch}));
  			}
		}
	});
});

$('#register_btn').on('click', function()
{
	uname = $('#uname').val();
	pass = $('#pass').val();
	confirm = $('#confirm').val();
	fname = $('#fname').val();
	lname = $('#lname').val();

	if (!uname || !pass || !confirm || !fname || !lname)
	{
		alert('All fields are required');
	}
	else
	{
		if ($('#pass').val() != $('#confirm').val())
		{
			alert('Password did not match');
		}
		else
		{
			data = 
			{
				uname : $('#uname').val(),
				pass : $('#pass').val(),
				confirm : $('#confirm').val(),
				fname : $('#fname').val(),
				lname : $('#lname').val(),
				branch : $('#branch').val(),
				dept : $('#dept').val(),
				priv : $('#priv').val()
			}

			$.ajax(
			{
				type : "POST",
				url : '././php/checkUser.php',
				data : data,
				dataType : "json",
				success : function(user)
				{
					l = user.length;
					if (l > 0)
					{
						alert('User already exist');
						//$('#userExistModal').modal();
					}
					else
					{
						//$('#registerModal').modal();
						alert('Registered Successfuly');
						$.ajax(
						{
							type : "POST",
							url : '././php/register.php',
							data : data,
							dataType : "",
							success : function()
							{
								
							}
						});
						window.location.replace('login.html');
					}
				}
			});
		}
	}
});