$(document).ready(function()
{
	data =
	{
		branch : $('#branch').val()
	}

	$.ajax(
	{
		type : "POST",
		url : '././php/getBranchDept.php',
		data : data,
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

	branches = ['Angeles', 'Antipolo', 'Bacolod', 'Baguio', 'Baler', 'Baliuag', 'Bataan', 'Batangas', 'Benguet',
            'Bohol', 'Bukidnon','Bulacan', 'Butuan', 'Cabanatuan', 'Cagayan De Oro', 'Cainta',
	'Calamba', 'Capiz', 'Cauayan', 'Cavite', 'Cebu', 'Consolacion', 'Dagupan', 'Dau',
					'Davao', 'Digos', 'Digos Trike', 'Dumaguete', 'Gapan', 'General Santos',
	'Harrison Plaza', 'Head Office', 'Ilocos Norte', 'Iloilo', 'Imus', 'Intramuros',
	'Isabela', 'Kabankalan', 'Kidapawan', 'Koronadal', 'La Trinidad', 'La Union', 'Lagro',
	'Laguna', 'Laoag', 'Las Piñas', 'Lipa', 'Makati', 'Malaybalay', 'Malolos', 'Mandaluyong', 'Marikina',
	'Mandaue', 'Manila', 'Marikina', 'MBL', 'Meycauayan', 'Muntinlupa', 'Naga',
	'Negros Occidental', 'Negros Oriental', 'Nueva Ecija', 'Olongapo', 'Pampanga',
	'Parañaque', 'Pasay', 'Pasig', 'POEA', 'Quezon Avenue', 'Quezon City', 'Roxas',
	'San Fernando, PA', 'San Jose', 'San Mateo', 'San Pablo', 'Santiago', 'SC Koronadal',
	'SC Panabo', 'SME Antipolo', 'SME Marikina', 'SME San Mateo', 'Sucat', 'Tacloban', 'Tagbilaran', 'Tagum',
	'Talavera', 'Tanay', 'Tandang Sora', 'Tarlac', 'Tuguegarao',
	'Valencia','Valenzuela'];

	bLen = branches.length;

	for (i = 0; i < bLen; i++)
	{
		text = branches[i];
		$('#branch').append($('<option>', {value:text, text:text}));
	}

});

function showDepts()
{
	$('#dept').find('option').remove().end();
	
	data =
	{
		branch : $('#branch').val()
	}
	
	$.ajax(
	{
		type : "POST",
		url : '././php/getBranchDept.php',
		data : data,
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
}

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
						location.reload();
					}
				}
			});
		}
	}
});