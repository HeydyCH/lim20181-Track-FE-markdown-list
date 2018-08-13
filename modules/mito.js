// console.log(module);
let subscriptores = 22000 ;
// module.exports.subs = subscriptores

// module.exports.saludar = function() {
//     console.log("SALUDAR : Importaremos nuetros propios archivos");
// };


module.exports = {
    subs : subscriptores,
    saludar: () => {
        console.log("SALUDAR : Importaremos nuetros propios archivos");
    },
    sumar: (a,b) => a + b ,
    mostrar: a => a + 10 ,
}


