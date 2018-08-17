const fs = require('fs');
const marked = require('marked');

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
  getLinks(html);
}

const getLinks = (html) => {
  
}