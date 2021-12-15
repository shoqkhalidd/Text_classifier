const express = require('express');
const app = express();
var FastText = require('node-fasttext');
const pathh = require('path');


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

app.use(express.static(pathh.join(__dirname,'/')));
app.set('view engine','ejs')

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/fasttext/', function(req, res) {
  var statement = req.param('statement');
  getFastTextResults(statement,res);
});

function getFastTextResults(statement,res) {
	//predict returns an array with the input and predictions for best cateogires
  if(statement!=""){
    FastText.predict("model.bin", 3 ,[statement],
    function (success, error) {
		  if(error) {
			console.log(error)
			return;
		  }
      res.render('index',{text1:"Lable "+success[0].label.split('l__')[1]
                        ,text2:"Lable "+ success[1].label.split('l__')[1]
                        ,text3:"Lable "+ success[2].label.split('l__')[1]
                        ,st:"Your Text: "+statement});
		})
	  return "success!";
  }
  else{
    return "fail"
  }
}


app.listen(8000, () => {
  console.log('Listening on port 8000!')
});
