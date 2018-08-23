// npm install marked --save
// npm install request --save

//--- SECTION LIBRERIAS

const fs = require('fs');
const marked = require('marked'); // Para extraccion de los links (html)
var request = require('request'); // Para validar el status de los links

const mdLinks = (path , options) => {

  console.log(" \n Ya estoy en la funcion mdlinks \n")
  console.log( "la ruta es ingresada es  : " + path )
  console.log("las opcion ingresadas fueron  : " + options)

  console.log(options.validate);
  console.log(options.stats)

  // readFile(path) -> Funcion para Leer ya sea directorio o file
  // let ArrayObjectLinks =  readFile(path);
  // return ArrayObjectLinks ;

  if(options.validate === true && options.stats == true){
    console.log(" Mostrar nro total de link , nro de link unicos , nro de link rotos")
  }else if(options.stats == true){
    console.log(" Mostrar nro total de link y nro de link unicos ")
  }else if(options.validate == true){
    console.log(" Mostrar link -- status ")
  }else {
    console.log("imprimir todos los links  , junto con ruta del archivo + texto truncado a 50 caracteres")
  }

  readFile(path)

}

const readFile = (path)=>{
  console.log(path)
  let resultado = [ ] ;
  // Leer el contenido de un directorio de manera Asincrona
  fs.readdir(path, (error, files) => {
    files.forEach(file => {
      // console.log(file);
      const stats = fs.statSync(file)
      if (stats.isDirectory()) {
        readDirectory(file)
      } else if (stats.isFile()) {
        // console.log('yes, that is a file')
        // file.lastIndexOf(".") --> indice del ultimo . encontrado
        //file.slice(a,b) --> recorta el string del indice a al b
        let extension = file.slice(file.lastIndexOf(".") + 1)
        // console.log(extension);
        if (extension === "md") {
          fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
              console.log(`Error ${error}`);
            } else {
              resultado = getData(data)
              console.log(resultado)
              // return getData(data)
            }
          })
        }
      } else {
        // console.log('no es archivo ni carpeta')
      }
    });
  })
}

const readDirectory = (file)=> {
  // console.log( file + ' yes, that is a directory')
  // readFile(file)
}

// Funcion para tener ALL content of file con extension.md
const getData = (data) =>{
  // Mostraremos el contenido de cada file.md
  // console.log(data)

  // -- Convertir todo el contenido en etiquetas html 
  const tokens = marked.lexer(data); 
  // console.log(tokens); // Matriz con def de etiquetas
  const html = marked.parser(tokens);
  // console.log(html); // Etiquetas Html con todo el content of files
  // console.log(filterLinks(html));
  return filterLinks(html);
}

const filterLinks = (contentFile) => {
  let htmlContentA = contentFile.toString().split('<a href=');
  // console.log(htmlContentA);
  let htmlContentImg = contentFile.toString().split('<img src=');
  // console.log(htmlContentImg);
  // FILTRANDO LOS LINKS 
  // htmlContentA y htmlContentImg son ARRAY's 
  let allArrayLinks=allLinks(htmlContentA,1)[0].concat(allLinks(htmlContentImg,2)[0]);
  let allTextArrayLinks = allLinks(htmlContentA,1)[1].concat(allLinks(htmlContentImg,2)[1])

  console.log(validateLinks(allArrayLinks));
  // console.log(allArrayLinks)


  // console.log(allTextArrayLinks)


  // --------------------------------------------------
  // PONIENDO EN UN OBJETO TODOS LOS LINK ENCONTRADOS
  // --------------------------------------------------
  // console.log(allTextArrayLinks[3])

  let objetLinks = [] ; 
  // for(let link of allArrayLinks){
  for( let i=0 ; i<= allArrayLinks.length ; i++ ){  
    let link = allArrayLinks[i]
    objetLinks.push (
      { "href":link ,
        "text" : allTextArrayLinks[i] ,
        "file" : "path"
      }
    )
  }
  // console.log(objetLinks);
  return objetLinks
}

const allLinks = (content , opt) =>{
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
  // console.log(textLinks)
  return [arrayLinks , textLinks]
  // return arrayLinks
  // console.log(arrayLinks)
}

const validateLinks =(arrayLinks)=> {
  // console.log(arrayLinks) 
  tam = arrayLinks.length;
  console.log(tam)
  for (const link of arrayLinks){
  // console.log(link);
  request(link, function(error, response, body) {
  if(error != null){
    // console.log('error:', error.message); // Print the error if one occurred
    console.log(link + "  -->  Error de conexion o protocolo")
  }else{
    // console.log('------- statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body.status); // Print the HTML for the Google homepage.
    statuslink = response && response.statusCode ;

    if( 200<=statuslink && statuslink <=400 ){
      console.log(link + '  -->  ok ' + statuslink)
    }else{
      console.log(link + '  -->  fail '+ statuslink)
    }
  }
  
  });

  }
  
}

const  statuslinks = (arrayLinks)=>{
  
  console.log(arrayLinks.length);
  let total = arrayLinks.length;
  let Unique = unitLinks(arrayLinks);

}

const unitLinks= (arrayLinks) => {
  console.log(arrayLinks)
}


// mdLinks('./', {"validate":true } )
// mdLinks('./', {"stats" : true} )
mdLinks('./', {"validate":true , "stats" : true} )
