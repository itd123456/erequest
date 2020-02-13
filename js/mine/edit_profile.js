var currUserName = '';
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

	$.ajax(
	{
		type : "POST",
		url : '././php/getInfo.php',
		data : "",
		dataType: "json",
		success : function(data)
		{
			user = data[0]['user'];
			fname = data[0]['fname'];
			lname = data[0]['lname'];
			branch = data[0]['branch'];
			dept = data[0]['Department'];
			
			currUserName = user;

			$('#uname').val(user);
			$('#fname').val(fname);
			$('#lname').val(lname);
			$('#branch').val(branch);
			$('#dept').val(dept);
		}
	});
});

$('#update_profile').on('click', function()
{
	uname = $('#uname').val();
	pass = $('#pass').val();
	confirm = $('#confirm').val();
	fname = $('#fname').val();
	lname = $('#lname').val();

	if (!uname || !fname || !lname)
	{
		$('#requiredModal').modal();
	}
	else
	{
		if ($('#pass').val() != $('#confirm').val())
		{
			$('#wrongPassModal').modal();
		}
		else
		{
			uname = $('#uname').val();

			data = 
			{
				prevUser : currUserName,
				uname : uname,
				pass : pass,
				confirm : confirm,
				fname : fname,
				lname : lname,
				branch : $('#branch').val(),
				dept : $('#dept').val()
			}

			if (currUserName == uname)
			{
				updateUser(data);
			}
			else
			{
				checkUpdateUser(data);
			}
		}
	}
});

function checkUpdateUser(datas)
{
	$.ajax(
	{
		type : "POST",
		url : '././php/checkUser.php',
		data : datas,
		dataType : "json",
		success : function(user)
		{
			l = user.length;
			if (l > 0)
			{
				$('#userExistModal').modal();
			}
			else
			{
				$.ajax(
				{
					type : "POST",
					url : '././php/updateUser.php',
					data : datas,
					dataType : "",
					success : function()
					{
						getInfo();
					}
				});
			}
		}
	});
}

function updateUser(datas)
{
	$.ajax(
	{
		type : "POST",
		url : '././php/updateUser.php',
		data : datas,
		dataType : "",
		success : function()
		{
			getInfo();
		}
	});
}

function getInfo()
{
	$.ajax(
	{
		type : "POST",
		url : '././php/getInfo.php',
		data : "",
		dataType: "json",
		success : function(data)
		{
			user = data[0]['user'];
			fname = data[0]['fname'];
			lname = data[0]['lname'];
			branch = data[0]['branch'];
			dept = data[0]['Department'];
			
			currUserName = user;

			$('#uname').val(user);
			$('#fname').val(fname);
			$('#lname').val(lname);
			$('#branch').val(branch);
			$('#dept').val(dept);
			$('#pass').val('');
			$('#confirm').val('');

			$('#updateProfileModal').modal();
		}
	});
}