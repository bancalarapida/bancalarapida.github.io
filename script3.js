
document.addEventListener("DOMContentLoaded", function () {

    
    const loterias =  {box1:"fl tarde", box2:"fl noche",
        box3:"la primera 12pm", box4:"q real", box5:"nac t",
        box6:"la primera 7pm", box7:"q pale", box8:"nac n",
        box9:"la suerte 12.30pm", box10:"lotedom", box11:"ny dia", 
        box12:"la suerte 6pm", box13:"loteka", box14:"ny noche", boxANG:"anguilla",}


    const anguilla = {box15:"anguilla 9am", box16:"anguilla 10am", box17:"anguilla 11am", box18:"anguilla 12pm", 
        box19:"anguilla 1pm", box20:"anguilla 2pm", box21:"anguilla 3pm", box22:"anguilla 4pm", box23:"anguilla 5pm",
        box24:"anguilla 6pm", box25:"anguilla 7pm", box26:"anguilla 8pm", box27:"anguilla 9pm",}

    const logoloterias=  {box1:"FLD.webp",  box2:"FLN.webp",
            box3:"PrimeraD.webp", box4:"Real.webp", box5:"NT.webp",
            box6:"PrimeraN.webp", box7:"QP.webp", box8:"NN.webp",
            box9:"SuerteD.webp", box10:"LTD.webp", box11:"NYD.webp",
            box12:"SuerteN.webp", box13:"LTK.webp", box14:"NYN.webp", boxANG:"ANG.webp",}


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
        try {
            cuadro.style["background-image"] = ""
            if (cuadro.querySelector("#logoloteria")){
                cuadro.querySelector("#logoloteria").style["background-color"] = "rgb(240, 240, 240)"
            }
            //cuadro.querySelector("#logoloteria").src = ""
            //cuadro.querySelector("#logoloteria").style["display"] = "none"
            for (let i = 0; i < 3; i++) {
                cuadro.querySelectorAll("#pre")[i].style["background-image"] = "url('IMG/BolaBlanca.webp')"
                cuadro.querySelectorAll("#pre")[i].innerHTML = ""
            }
            //cuadro.querySelector("#fecha").innerHTML = ""
        }  catch (error) {
            //console.error(error)
            console.log(error)
        }

    }

    function cargarDatos() {
    
        let objectDate = new Date
        let fechaHoy = fecha(objectDate)
        objectDate.setDate(objectDate.getDate() - 1)
        let fechaAyer = fecha(objectDate)
        
        fetch("https://bclrpd.github.io/", {cache: "no-store"})
        //fetch("http://172.16.15.30:8000/premios.ini", {cache: "no-store"})
            .then((res) => res.text())
            .then((text) => {
                let premiosINI = parseINIString(text);
                let t = 0
                let k = 0
                let q = 100
                
                mostrarPremiosGrandes(fechaHoy, premiosUsados, premiosINI[fechaHoy])
                
                for  (let [cuadro, loteria] of Object.entries(loterias)) {
                    let retardo = 100 + (t++ * 150)
                    let premiosCuadro = document.querySelector("#"+cuadro)
                    let premiosLogo = document.querySelector("#"+cuadro+" #logoloteria")
                    if (loteria == "anguilla") {
                        setTimeout(() => {
                                
                                setTimeout(() => {
                                    premiosLogo.src = "IMG/"+logoloterias[cuadro]
                                    premiosLogo.style["background-color"] = "rgb(239, 245, 43)"
                                },retardo + (++k * q))
                        },retardo)
                                
                        
                        for  (let [cuadro, loteria] of Object.entries(anguilla)) {
                            let premiosCuadro = document.querySelector("#"+cuadro)
                            let premiosText = document.querySelectorAll("#"+cuadro+ " #pre")
                            let horaloteriaText = document.querySelectorAll("#"+cuadro+ " #horaANG")                    
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
                                                                               
                            setTimeout(() => {
                                
                                setTimeout(() => {
                                    cuadroDefault(premiosCuadro)
                                },retardo + (++k * q))
                                

                                setTimeout(() => {
                                    premiosCuadro.querySelector("#horaANG").innerHTML = loteria.split(" ")[1]
                                    if (strFecha == fechaHoy){
                                        premiosCuadro.style["background-image"] = "url('IMG/c.webp')"
                                        //premiosLogo.style["background-color"] = "rgb(239, 245, 43)"
                                        premiosCuadro.querySelector("#horaANG").style["background-color"] = "rgb(239, 245, 43)"
                                        
                                    }else{
                                        premiosCuadro.style["background-color"] = "rgb(220, 220, 220)"
                                        //premiosLogo.style["background-color"] = "rgb(220, 220, 220)" 
                                    }
                                },retardo + (++k * q))
                            
                                for (let i = 0; i < 3; i++) {
                                    setTimeout(() => {
                                        if (strFecha == fechaHoy){
                                            premiosText[i].style["background-image"] = "url('IMG/BolaAzul.webp')"                                    
                                        }else{
                                            premiosText[i].style["background-image"] = "url('IMG/BolaBlanca.webp')"
                                        }
                                        premiosText[i].innerHTML = premios[i].replace("100", "00")
                                        
                                    },retardo + (++k * q)) 
                                    
                                } 

                            },retardo)

                            premiosUsados = premiosINI[fechaHoy]

                        }
                       
                    }else {
                        let premiosText = document.querySelectorAll("#"+cuadro+ " #pre")                    
                        //let premiosBolo = document.querySelectorAll("#"+cuadro+ " #bolo")
                        //let premiosFecha = document.querySelector("#"+cuadro+ " #fecha")
                        //let premiosfondo = document.querySelector("#"+cuadro+ " #premios")
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
                        
                        
                                                
                        setTimeout(() => {
                            
                            setTimeout(() => {
                                cuadroDefault(premiosCuadro)
                            },retardo + (++k * q))
                            

                            setTimeout(() => {
                                if (strFecha == fechaHoy){
                                    premiosCuadro.style["background-image"] = "url('IMG/c.webp')"
                                    premiosLogo.style["background-color"] = "rgb(239, 245, 43)"
                                    
                                }else{
                                    premiosCuadro.style["background-color"] = "rgb(220, 220, 220)"
                                    premiosLogo.style["background-color"] = "rgb(220, 220, 220)" 
                                }
                            },retardo + (++k * q))

                            setTimeout(() => {
                                premiosLogo.src = "IMG/"+logoloterias[cuadro]
                            },retardo + (++k * q)) 

                        
                            for (let i = 0; i < 3; i++) {
                                setTimeout(() => {
                                    if (strFecha == fechaHoy){
                                        premiosText[i].style["background-image"] = "url('IMG/BolaAzul.webp')"                                    
                                    }else{
                                        premiosText[i].style["background-image"] = "url('IMG/BolaBlanca.webp')"
                                    }
                                    premiosText[i].innerHTML = premios[i].replace("100", "00")
                                },retardo + (++k * q)) 
                                
                            } 

                        },retardo)

                        premiosUsados = premiosINI[fechaHoy]
                    } 
                }
                
      
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
            document.querySelectorAll("#premiosGrande #pre")[i].style["background-image"] = "url('IMG/BolaBlanca.webp')"
            document.querySelectorAll("#premiosGrande #pre")[i].innerHTML = ""     
        }

        setTimeout(() => {
            document.querySelector("#premiosGrande #logoloteria").style["background-color"] = "rgb(239, 245, 43)" 
        },(++k * q))
        setTimeout(() => {
            document.querySelector("#premiosGrande").style["background-image"] = "url('IMG/c.webp')"
        },(++k * q))

        setTimeout(() => {
            if (lot.indexOf("anguilla") !== -1){
                lot = "anguilla"
            }
            let srcLogo = getKeyByValue(loterias, lot)
            document.querySelector("#premiosGrande #logoloteria").src = "IMG/"+logoloterias[srcLogo]
        },(++k * q))
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                document.querySelectorAll("#premiosGrande #pre")[i].style["background-image"] = "url('IMG/BolaAzul.webp')"
            },(++k * q))       
        }
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                document.querySelectorAll("#premiosGrande #pre")[i].innerHTML = premios[i].replace("100", "00")
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
                        //document.querySelector("#premiosGrande").style["display"] = "none"
                        //document.querySelector("#principal").style["display"] = "block"  
                        location.reload();     
                    },15000 * t)

                } 
            }
           
        }
        
        
    }

    cargarDatos()
    setInterval(cargarDatos, 60000)
    //cargarDatos()
    //premiosGrandes("q real", "25,48,93")

    
    
          
})