// $.ajax({
// 	url:'../api/news.json',
// 	success:function (res) {
// 		console.log(res)
// 		if ( res.resetCod ===200) {
// 			var newshtml = "";
// 			var data = res.data;
// 			$.each(data, function(n, value) {
// 				newshtml +=	'<li>'+
// 			                    '<a data="'+value.url+'">'+
// 			                      '<span class="titles" >'+value.title+'</span>'+
// 			                      '<span class="right">'+value.date+'</span>'+
// 			                    '</a>'+
// 			                '</li>'
// 			})

// 			$('.desc1 .news').html(newshtml)
// 		}
// 	}
// })