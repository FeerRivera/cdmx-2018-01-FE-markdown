let fs = require('fs');
let path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const colors = require('colors');

const mdLinks = function markdownLinkExtractor(markdown) {
  
  const links = [];
  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = (href, title, text) => {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };

  renderer.image = (href, title, text) => {
   
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  Marked(markdown, {renderer: renderer});
  return links;
};

let currentDirectory = process.cwd(); 
console.log(`Directorio actual: ${process.cwd()}`);
let cwdBuffer = Buffer.from(currentDirectory);
const [,, ...userArgs] = process.argv; 
let validate = userArgs[0];

fs.readdir(cwdBuffer, (err, files) => { 
  if (err) {
    console.log(err.message);
  } else {
    files.forEach(file => {
      if (path.extname(file) === '.md') { 
        fs.readFile(file, 'utf8', function(err, data) { 
          if (err) { 
            console.log(err);
          } else {
            mdLinks(data).forEach(element => {
              if (validate === '--validate') {
                fetch(`${element.href}`).then((response) => {
                  
                  console.log(`Archivo: ${file.blue} Texto: ${element.text.green} Link: ${response.url.yellow} Status: ${response.status} ${response.statusText.cyan}`);
                }).catch((err) => {
                 
                  console.error(`Enlace roto --> Archivo: ${file.blue} Texto: ${element.text.green} Link: ${element.href.yellow}` + err);
                });
              } else {
                fetch(`${element.href}`).then((response) => {
                  
                  console.log(`Archivo: ${file.blue} Texto: ${element.text.green} Link: ${element.href.yellow}`);
                }).catch((err) => {
                  
                  console.error(`Enlace roto --> Archivo: ${file.blue} Texto: ${element.text.green} Link: ${element.href.yellow}` + err);
                });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = mdLinks;
