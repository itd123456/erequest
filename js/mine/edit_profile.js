var currUserName = '';
$(document).ready(function()
{
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
				if (!data['priv'])
				{
					location.replace('login.html');
				}
			}	
		});
	});

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

	branches = ['Antipolo', 'Bacolod', 'Baguio', 'Baler', 'Baliuag', 'Bataan', 'Batangas', 'Benguet',
				'Bohol', 'Bukidnon','Bulacan', 'Butuan', 'Cabanatuan', 'Cagayan De Oro', 'Cainta',
	'Calamba', 'Capiz', 'Cauayan', 'Cavite', 'Cebu', 'Consolacion', 'Dagupan', 'Dau',
					'Davao', 'Digos', 'Digos City', 'Digos Trike', 'Dumaguete', 'Gapan', 'General Santos',
	'Harrison Plaza', 'Head Office', 'Ilocos Norte', 'Iloilo', 'Imus', 'Intramuros',
	'Isabela', 'Kabankalan', 'Kidapawan', 'Koronadal', 'La Trinidad', 'La Union', 'Lagro',
	'Laguna', 'Laoag', 'Las Piñas', 'Lipa', 'Makati', 'Malaybalay', 'Malolos', 'Mandaluyong',
	'Mandaue', 'Manila', 'Marikina', 'MBL', 'Meycauayan', 'Muntinlupa', 'Naga',
	'Negros Occidental', 'Negros Oriental', 'Nueva Ecija', 'Olongapo', 'Pampanga',
	'Paranaque', 'Pasay', 'Pasig', 'POEA', 'Quezon Avenue', 'Quezon City', 'Roxas',
	'San Fernando PA', 'San Jose', 'San Mateo', 'San Pablo', 'Santiago', 'SC Koronadal',
	'SC Panabo', 'SME Antipolo', 'SME Marikina', 'Tacloban', 'Tagbilaran', 'Tagum',
	'Talavera', 'Tanay', 'Tandang Sora', 'Tarlac', 'Tuguegarao', 'Tuguegarao City',
	'Valencia','Valenzuela'];

	bLen = branches.length;

	for (i = 0; i < bLen; i++)
	{
		text = branches[i];
		$('#branch').append($('<option>', {value:text, text:text}));
	}

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