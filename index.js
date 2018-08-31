var fs = require('fs')

const readReadme = () => {
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
   let regExp = /((http:\/\/|https:\/\/|www\.)[^\s]+)/gim;
   let links = data.match(regExp);

   if(links){
     console.log(links)
}

};
