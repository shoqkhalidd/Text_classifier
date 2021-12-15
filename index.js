const express = require('express')
const app = express();
var FastText = require('node-fasttext');
const cors = require('cors');

let config = { 
  dim: 100,
  input: "train.txt",
  output: "model"
}

FastText.train("supervised", config, function (success, error) {

  if(error) {
    console.log(error)
    return;
  }
  
  console.log(success)
  
})

//app.use(cors());
app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendfile("index.html");
});

app.get('/fasttext/', function(req, res) {
  var statement = req.param('statement');
    //res.send(getFastTextResults(statement));
    if(statement!=""){
    	FastText.predict("model.bin", 3, [statement],function (success, error) {
			if(error) {
				respons = {
					"status" : "ERROR",
					"message" : error
				};
			}else{
				respons = {
					"status" : "SUCCESS",
					"result" : success,
					"message" : "The transaction was completed successfully."
				};
			}
			res.send(respons);
		});
  	}else{
		respons = {
			"status" : "ERROR",
			"message" : "The text is empty."
		};
    	res.send(respons);
    }    
});

app.listen(8000, () => {
  console.log('Listening on port 8000!')
});
