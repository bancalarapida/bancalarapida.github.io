

document.addEventListener("DOMContentLoaded", function () {

    
    const loterias =  {box1:"fl tarde", box2:"fl noche",
        box3:"la primera 12pm", box4:"la suerte 12.30pm", box5:"q real", box6:"nac t",
        box7:"la primera 7pm", box8:"la suerte 6pm", box9:"q pale", box10:"nac n",
        box11:"lotedom", box12:"loteka", box13:"ny dia", box14:"ny noche",
        box15:"anguilla 10am", box16:"anguilla 1pm", box17:"anguilla 6pm", box18:"anguilla 9pm"}

    const logoloterias=  {box1:"FLD.webp",  box2:"FLN.webp",
            box3:"PrimeraD.webp", box4:"SuerteD.webp", box5:"Real.webp", box6:"NT.webp",
            box7:"PrimeraN.webp", box8:"SuerteN.webp", box9:"QP.webp", box10:"NN.webp",
            box11:"LTD.webp", box12:"LTK.webp", box13:"NYD.webp", box14:"NYN.webp",
            box15:"ANG10am.webp", box16:"ANG1pm.webp", box17:"ANG6pm.webp", box18:"ANG9pm.webp"}

    var premiosUsados = {}
   
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
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    
    function cuadroDefault(cuadro){
        cuadro.style["background-image"] = ""
        cuadro.querySelector("#logoloteria").style["background-color"] = "rgb(255, 255, 255)"
        //cuadro.querySelector("#logoloteria").src = ""
        //cuadro.querySelector("#logoloteria").style["display"] = "none"
        for (let i = 0; i < 3; i++) {
            cuadro.querySelectorAll("#bolo")[i].src = "IMG/BolaBlanca.webp"
            cuadro.querySelectorAll("#pre")[i].innerHTML = ""
        }
        //cuadro.querySelector("#fecha").innerHTML = ""
        

    }

    function cargarDatos() {
    
        let objectDate = new Date
        let fechaHoy = fecha(objectDate)
        objectDate.setDate(objectDate.getDate() - 1)
        let fechaAyer = fecha(objectDate)
        
        fetch("https://bclrpd.github.io/", {cache: "no-store"})
        //fetch("http://172.16.15.103:8000/premios.ini")
            .then((res) => res.text())
            .then((text) => {
                let premiosINI = parseINIString(text);
                let t = 0
                mostrarPremiosGrandes(fechaHoy, premiosUsados, premiosINI[fechaHoy])
                
                for  (let [cuadro, loteria] of Object.entries(loterias)) {
                    let premiosCuadro = document.querySelector("#"+cuadro)
                    let premiosLogo = document.querySelector("#"+cuadro+" #logoloteria")
                    let premiosText = document.querySelectorAll("#"+cuadro+ " #pre")
                    let premiosBolo = document.querySelectorAll("#"+cuadro+ " #bolo")
                    let premiosFecha = document.querySelector("#"+cuadro+ " #fecha")
                    let premiosfondo = document.querySelector("#"+cuadro+ " #premios")
                    let premios
                    let strFecha

                    if (premiosINI[fechaHoy][loteria]) { 
                        strFecha = fechaHoy
                        premios = premiosINI[fechaHoy][loteria].split(",")

                    }else if(premiosINI[fechaAyer][loteria]){
                        strFecha = fechaAyer
                        premios = premiosINI[fechaAyer][loteria].split(",")

                    }else {
                        strFecha = "--/--/----"
                        let nopremios =  "--,--,--"
                        premios =nopremios.split(",")
                    }
                    
                    let retardo = 100 + (t++ * 200)
                                               
                    setTimeout(() => {
                        let k = 0
                        let q = 200
                        setTimeout(() => {
                            cuadroDefault(premiosCuadro)
                        },retardo + (++k * q))
                        

                        setTimeout(() => {
                            if (strFecha == fechaHoy){
                                premiosCuadro.style["background-image"] = "url('IMG/c.webp')"
                                premiosLogo.style["background-color"] = "rgb(239, 245, 43)"
                                
                            }else{
                                premiosLogo.style["background-color"] = "rgb(255, 255, 255)"
                            }
                        },retardo + (++k * q))

                        setTimeout(() => {
                            premiosLogo.src = "IMG/"+logoloterias[cuadro]
                        },retardo + (++k * q)) 

                       
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                                if (strFecha == fechaHoy){
                                    premiosBolo[i].src = "IMG/BolaAzul.webp"                                    
                                }else{
                                    premiosBolo[i].src = "IMG/BolaBlanca.webp"
                                }
                                premiosText[i].innerHTML = premios[i].replace("100", "00")
                            },retardo + (++k * q)) 
                            
                        } 

                    },retardo)

                    premiosUsados = premiosINI[fechaHoy]
                    
                }
                
                setTimeout(() => {
                    //document.querySelector("#principal").style["display"] = "none"
                    
                },5000)
                setTimeout(() => {
                    //document.querySelector("#principal").style["display"] = "block"
                    
                },7000)

        
            })
            .catch(error => console.error("Error cargando premios:", error));

        }
       
    function premiosGrandes(lot, premios){
        let k = 0
        let q = 400
        premios = premios.split(",")
        document.querySelector("#premiosGrande #logoloteria").style["background-color"] = "rgb(255, 255, 255)"
        document.querySelector("#premiosGrande").style["background-image"] = ""
        for (let i = 0; i < 3; i++) {
            document.querySelectorAll("#premiosGrande #bolo")[i].src = "IMG/BolaBlanca.webp"
            document.querySelectorAll("#premiosGrande #preG")[i].innerHTML = ""     
        }

        setTimeout(() => {
            document.querySelector("#premiosGrande #logoloteria").style["background-color"] = "rgb(239, 245, 43)" 
        },(++k * q))
        setTimeout(() => {
            document.querySelector("#premiosGrande").style["background-image"] = "url('IMG/c.gif')"
        },(++k * q))

        setTimeout(() => {
            let srcLogo = getKeyByValue(loterias, lot)
            document.querySelector("#premiosGrande #logoloteria").src = "IMG/"+logoloterias[srcLogo]
        },(++k * q))
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                document.querySelectorAll("#premiosGrande #bolo")[i].src = "IMG/BolaAzul.webp"
            },(++k * q))       
        }
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                document.querySelectorAll("#premiosGrande #preG")[i].innerHTML = premios[i].replace("100", "00")
            },(++k * q))

        }

    }
    
    function mostrarPremiosGrandes(fecha, premiosViejos, premiosNuevos){
        let t = 0
        if (Object.keys(premiosViejos).length !== 0){
            if (Object.keys(premiosNuevos).length !== 0){
                for  (let [loteria, premios] of Object.entries(premiosNuevos)) {
                    if (premios !== "" && premios !== premiosViejos[loteria]){
                        setTimeout(() => {
                            document.querySelector("#principal").style["display"] = "none"
                            document.querySelector("#premiosGrande").style["display"] = "block"
                            premiosGrandes(loteria, premios)
                            
                        },15000 * t++)

                    }
                    
                }
                if (t > 0){
                    setTimeout(() => {
                        document.querySelector("#premiosGrande").style["display"] = "none"
                        document.querySelector("#principal").style["display"] = "block"       
                    },15000 * t)

                } 
            }
           
        }
        
        
    }

    cargarDatos()
    setInterval(cargarDatos, 20000)
    //cargarDatos()
    //premiosGrandes("q real", "25,48,93")

    
    
          
})