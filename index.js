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
   let regExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
   let links = data.match(regExp);
   if(links){console.log(links)}
  else{console.log(error)}

};
