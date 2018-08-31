var fs = require('fs')

const readReadme = (callback) => {
  fs.readFile('./README.md', 'utf8', (err,data) => {
    if(err){
    console.log(err)
  } else{
   link(data);
  }

  })
}
readReadme();

const link = (data) => {
  console.log(data)
   let regExp = /((http:\/\/|https:\/\/|www\.)[^\s]+)/gim;
 
   let links = data.match(regExp);
   if(links){console.log(links)}
  else{console.log(error)}

};
