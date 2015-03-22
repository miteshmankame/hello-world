var http=require('http');
var url=require('url');

var server=http.createServer(function(req,res){

	var details=url.parse(req.url,true);

	if(req.method=='GET')
	{
		 

		switch(details.pathname)
		{
			case '/api/parsetime':
			{
				if(details.query.iso!=null)
				{
					res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });

					var date = new Date(details.query.iso);					

					var result={
							hour:date.getHours(),
							minute:date.getMinutes(),
							second:date.getSeconds()
						};
					
					res.end(JSON.stringify(result));
				}
				else
				{
					res.end('No ISO param found');

				}
				break;
			}
			case '/api/unixtime':
			{
				if(details.query.iso!=null)
				{
					res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });

					var date =  Date.parse(details.query.iso);	

					var result={unixtime:date};
					res.end(JSON.stringify(result));
				}
				else
				{
					res.end('No ISO param found');
				}
				break;
			}
			default:
			{
				res.end('In correct URL');
				break;
			}
		
		}
	
	}
	else
	{
	res.end('SEND me GET');
	}
});

server.listen(process.argv[2]);