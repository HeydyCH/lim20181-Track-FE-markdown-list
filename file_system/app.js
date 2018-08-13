const fs = require('fs');

console.log('Inicializado');

// MODO ASINCRONO

// fs.readFile('data.txt', 'utf-8', (error,data)=>{
//     if(error){
//         console.log(`Error ${error}`);
//     }else{
//         console.log(data)
//     }
// })


// MODO SINCRONO

// let data = fs.readFileSync('data.txt', 'utf-8');

// console.log(data);




// Pedido de cambio de nombre Asincrono

// fs.rename('data.txt', 'data_renombrado.txt', (error) => {
//   if (error) throw error;
//   console.log('Renombrado!');
// })


// MODO ASINCRONO

// Agregando texto a un archivo txt
// fs.appendFile('data.txt','\nGracias x su seguir intentando' , (error) => {
//   if (error) console.log(`Error ${error}`);
// })

// Eliminando un  archivo txt
// fs.unlink('data2.txt', (error) => {
//   if(error) throw error;
//   console.log("eliminado");
// })

//Copiar un archivo.txt
fs.createReadStream('data.txt').pipe(fs.createWriteStream('data3.txt'));

// Leer el contenido de un directorio de manera Asincrona
// fs.readdir('./../file_system' , (error,files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })

// Leer el contenido de un directorio de manera Sincrona
fs.readdirSync('./../file_system').forEach(file => {
  console.log(file);
})

console.log('finalizado');