// libreria para trabjar con sistemas operativos
const os = require('os');
const fs = require('fs');
const mi = require('./mito')

let cpu = os.cpus();
// muestra el sistemas operativos
let sistema = os.platform(); 
// muestra usuario del S.O
let usuario = os.hostname();

let cpu_string = JSON.stringify(cpu);

// mi.saludar();
// console.log(mi.subs)
// let rpta = mi.sumar(10,5);

// 2000  son 2 segundos

setTimeout(() => {
    console.log("termine")
}, 2000);

let rpta = mi.mostrar(20);
// console.log(rpta)

// manipulacion de archivos
/* fs.appendFile('mitocode.txt',` Informacion del CPU :${cpu_string} ` ,function(error){
    if(error){
 console.log('error al crear archivo')
    }else{
        console.log('corre bien000')
    }
   
});
*/
