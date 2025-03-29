// pizarra.js

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("pizarra");
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 768;

    const logo = document.getElementById("logo");

    const filas = [14, 169, 324, 481, 635]
    const colugnas = [[6, 774],
                [6, 262, 518, 774],
                [6, 262, 518, 774],
                [6, 262, 518, 774],
                [6, 262, 518, 774]]

    const lots = [[ "fl tarde", 'fl noche'],
            ["la primera 12pm", "la suerte 12.30pm", "q real", "nac t"],
            ["la primera 8pm", "la suerte 6pm", "q pale", "nac n"],
            ["lotedom", "loteka", "ny dia", "ny noche"],
            ["anguilla 10am", "anguilla 1pm", "anguilla 6pm", "anguilla 9pm"]]

    const imagenFilas2 = [["FLD.webp", "FLN.webp"],
                    ["PrimeraD.webp", "SuerteD.webp", "Real.webp", "NT.webp"],
                    ["PrimeraN.webp", "SuerteN.webp", "QP.webp", "NN.webp"],
                    ["LTD.webp", "LTK.webp", "NYD.webp", "NYN.webp"],
                    ["ANG10am.webp", "ANG1pm.webp", "ANG6pm.webp", "ANG9pm.webp"]]

    
    function cargarDatos() {


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(228, 240, 72, 0.45)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let objectDate = new Date
        let fechaHoy = fecha(objectDate)
        objectDate.setDate(objectDate.getDate() - 1)
        let fechaAyer = fecha(objectDate)
        
        fetch("https://bclrpd.github.io/")
            .then((res) => res.text())
            .then((text) => {
                let premiosINI = parseINIString(text);
                let t = 0
                
                //console.log(iniObj['16-03-2025']['lotedom']);
                for (i in lots) {
                    let y = filas[i]
                    
                    //console.log(lots[i])
                    for (j in lots[i]) {   
                        let x = colugnas[i][j]
                        let lotImagen = document.getElementById(imagenFilas2[i][j])
                        let strFecha
                        let premios
                        if (premiosINI[fechaHoy][lots[i][j]]) {
                           //console.log("Hoy  --" + lots[i][j] + "..." + premiosINI[fechaHoy][lots[i][j]]) 
                            strFecha = fechaHoy
                            premios = premiosINI[fechaHoy][lots[i][j]]
                            

                        }else if(premiosINI[fechaAyer][lots[i][j]]){
                           //console.log("Ayer  --" + lots[i][j]+ "..." + premiosINI[fechaAyer][lots[i][j]])
                            strFecha = fechaAyer
                            premios = premiosINI[fechaAyer][lots[i][j]]

                        }else {
                            strFecha = "--/--/----"
                            premios = "--,--,--"
                            console.log("NADA")

                        }

                        let retardo = 100 + (t++ * 400)
                        
                        
                        setTimeout(() => {
                            dibujar(x, y, strFecha, premios, lotImagen, retardo)
                        },retardo)

                        
                        

                    }
                    
                }
      
            })
            .catch(error => console.error("Error cargando premios:", error));
        
        
        
        

      }
    
    function mostrarPizarra(premios) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        premios.forEach((premio, index) => {
            
            setTimeout(() => {
                dibujar(premio, index);
            },3000 + (index * 100))

            

        });
    }
    

    function dibujar(x, y, fecha, premios, img, retardo ){
     
        let p = premios.split(",") 
        let p1 = p[0]
        let p2 = p[1]
        let p3 = p[2]
        let k = 0
        let q = 100

        setTimeout(() => {
            ctx.fillStyle = "white";
            ctx.fillRect(x, y, 240, 128);
        },retardo + (++k * q)) 
        
        setTimeout(() => {
            imgLoteria(x, y, img)
        },retardo + (++k * q)) 
        setTimeout(() => {
            escribirFecha(fecha, x + 75, y + 125, "rgb(56, 16, 235)")
        },retardo + (++k * q))
        setTimeout(() => {
            circulo(x + 45, y + 75)
        },retardo + (++k * q))
        setTimeout(() => {
            escribirPremio(p1, x + 25, y + 85, "rgb(199, 31, 45)")
        },retardo + (++k * q))
        setTimeout(() => {
            circulo(x + 120, y + 75)
        },retardo + (++k * q))
        setTimeout(() => {
            escribirPremio(p2, x + 100, y + 85, "rgb(199, 31, 45)")
        },retardo + (++k * q))
        setTimeout(() => {
            circulo(x + 195, y + 75)
        },retardo + (++k * q))
        setTimeout(() => {
            escribirPremio(p3, x + 175, y + 85, "rgb(199, 31, 45)")
        },retardo + (++k * q))

        
        
        
        
        
        
        
        
        
    }

    function mostrarlogo(){
        ctx.drawImage(logo, 262, 14, 495, 128);

    }

    function imgLoteria(x, y, img){
        ctx.drawImage(img, x, y, 240, 48);

    }

    function circulo(x, y) {
        ctx.fillStyle = "rgb(110, 146, 224)";
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2, true); // Círculo externo
        //ctx.stroke();
        ctx.fill()
     }

     function escribirPremio(text, x, y, color ){
        ctx.fillStyle = color;
        ctx.font = "35px Arial Black";
        ctx.fillText(text,x,y);
     }

     function escribirFecha(text, x, y, color ){
        ctx.fillStyle = color;
        ctx.font = "13px Arial Black";
        ctx.fillText(text,x,y);
     }

    function parseINIString(data){
        var regex = {
            section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
            param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
            comment: /^\s*;.*$/
        };
        var value = {};
        var lines = data.split(/[\r\n]+/);
        var section = null;
        lines.forEach(function(line){
            if(regex.comment.test(line)){
                return;
            }else if(regex.param.test(line)){
                var match = line.match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(line)){
                var match = line.match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length == 0 && section){
                section = null;
            };
        });
        return value;
    }
    


    function fecha(objectDate){
        let day = objectDate.getDate()
        if (day < 10) {
            day = '0' + day;
        }
        let month  = objectDate.getMonth() + 1 // .getMonth debuelve 0-11
        if (month < 10) {
            month = '0' + month;
        }
        let year = objectDate.getFullYear()
        let fecha = day + "-" + month  + "-" + year;
        return fecha 
    }
    setInterval(cargarDatos, 20000); // Actualiza cada 3 minutos
    cargarDatos();
   //coordenadas()
   
  


});
