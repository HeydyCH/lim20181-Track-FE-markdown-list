// npm install marked --save
// npm install request --save
const fs = require('fs');
const marked = require('marked'); // Para extraccion de los links
var request = require('request'); // Para validar el status de los links

// Leer el contenido de un directorio de manera Asincrona
fs.readdir('./', (error, files) => {
  files.forEach(file => {
    // console.log(file);
    let stats = fs.statSync(file)
    if (stats.isDirectory()) {
      // console.log('yes, that is a directory')
    } else if (stats.isFile()) {
      // console.log('yes, that is a file')
      // file.lastIndexOf(".") --> indice del ultimo . encontrado
      //file.slice(a,b) --> recorta el string del indice a al b
      let extension = file.slice(file.lastIndexOf(".") + 1)
      // console.log(extension);
      if (extension == "md") {
        fs.readFile(file, 'utf-8', (error, data) => {
          if (error) {
            console.log(`Error ${error}`);
          } else {
            getData(data)
          }
        })
      }
    } else {
      // console.log('no es archivo ni carpeta')
    }
  });
})

// Funcion para tener ALL content of file con extension.md

const getData = (data) =>{
  // Mostraremos el contenido de cada file.md
  // console.log(data)

  // -- Convertir todo el contenido en etiquetas html 
  const tokens = marked.lexer(data); 
  // console.log(tokens); // Matriz con def de etiquetas
  const html = marked.parser(tokens);
  console.log(html); // Etiquetas Html con todo el content of files
  filterLinks(html);
}

const filterLinks = (contentFile) => {
  let htmlContentA = contentFile.toString().split('<a href=');
  // console.log(htmlContentA);
  let htmlContentImg = contentFile.toString().split('<img src=');
  // console.log(htmlContentImg);
  // FILTRANDO LOS LINKS 
  // htmlContentA y htmlContentImg son ARRAY's 
  let allArrayLinks=allLinks(htmlContentA,1).concat(allLinks(htmlContentImg,2));
  console.log(statusLinks(allArrayLinks));
  // console.log(allArrayLinks)
  
}

const statusLinks =(arrayLinks)=> {
  console.log(arrayLinks) 
  tam = arrayLinks.length;
  console.log(tam)
  for (const link of arrayLinks){
  // console.log(link);
  request(link, function(error, response, body) {
  console.log(link);
  if(error != null){
    // console.log('error:', error.message); // Print the error if one occurred
    console.log("Error de conexion o protocolo")
  }else{
    // console.log('------- statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body.status); // Print the HTML for the Google homepage.
    statuslink = response && response.statusCode ;

    if( 200<=statuslink && statuslink <=400 ){
      console.log('ok ' + statuslink)
    }else{
      console.log('fail '+ statuslink)
    }
  }
  
  });

  }
  
}

const allLinks = (content , opt) =>{
  console.log("--- > funcion getLinks")
  const arrayLinks = []
  const textLinks = []
  let i1 = 0 ;
  for(const line of content){
    if(i1!=0){
      // console.log(line + "\n")
      const arrPos = [];
    for( const i in line){
      // position es i
      letter = line[i]
      if(letter == '"'){
        // console.log("pos : "+ i)
        arrPos.push(i)
      }
    
    
    }

    if(opt == 2){
      textLinks.push("Link de una Imagen")
    }else{
      // veamos el text de la etiqueta <a
      line.toString().split('</a>')
      
      let filterText = line.toString().split('</a>')
      let textA= filterText[0].substr(arrPos[1]-3+5)
      textLinks.push(textA);

    }
    // console.log(arrPos);
    let newLine = line.substr(arrPos[0]+1,arrPos[1]-1)
    // console.log(newLine);
    arrayLinks.push(newLine);

    }
    i1= i1+1 ;
  }
  console.log(textLinks)
  return arrayLinks
  // console.log(arrayLinks)
}



