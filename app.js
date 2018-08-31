// const readReadme = (callback) => {
//   fs.readFile('./README.md', 'utf8', (err,data) => {
//     if(err){
//       console.log('error')
//     }else {
//       callback(data)
//     }
//   })
// }
//
// readReadme(function (data){
//   console.log(data)
// });

// const data = fs.readFileSync('./README.md', 'utf8');
//
// fs.watch('./',(eventType, fileName) =>{
//   console.log('tipo de evento' + eventType);
//   if(fileName){
//     console.log('En el archivo:' + fileName)
//   }else {
//     console.log('no tienes cabios en archivos')
//   }
// })

// const countLine = (err, data) => {
//   if(err){
//     console.log('No tienes README.md')
//   }else {
// 
//   }
// }
const link = (data) =>{
  let regExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
  let links = data.match(regExp);
  console.log(links);
};
