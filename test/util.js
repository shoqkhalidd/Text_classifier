var FastText = require('node-fasttext');


function getFastTextResults(statement) {
	//predict returns an array with the input and predictions for best cateogires
	if(statement!=""){
    FastText.predict(
		"model.bin", 3,
		[statement],
		function (success, error) {

		  if(error) {
			console.log(error)
			return;
		  }
		  console.log(success)
		})
  
	  return "success!";}
    else
    return "fail"
}
module.exports=getFastTextResults;