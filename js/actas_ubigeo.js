let ambito=''
const getDepartamentos = async(ubigeo)=>{
    ambito=ubigeo
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}`)
    if (data.status == 200){
        const departamentos = await data.json()
        let html = `<select name="cdgoDep" id="cdgoDep" class="form-control" onchange="getProvincias(this.value);">
            <option selected="selected" value="">--SELECCIONE--</option>`
        departamentos.forEach(departamento => {
            html += `<option value="${departamento.Detalle}">${departamento.Detalle}</option>`
        });
        html += `</select>`
        document.getElementById('departamentos').innerHTML=html

        document.getElementById('provincias').innerHTML = `<select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value);" disabled>;
            <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`

        document.getElementById('distritos').innerHTML = `
        <select name="cdgoDist" id="cdgoDist" class="form-control" onchange="getLocales(this.value);" disabled>;
        <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`

        document.getElementById('divLocal').innerHTML = `
        <select name="actas_ubigeo" id="actas_ubigeo" class="form-control" disabled>
        <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`
    }
}

let departamentoElegido=''
const getProvincias = async(departamento) =>{
    departamentoElegido=departamento;
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamento}`)
    if (data.status == 200){ 
        const provincias = await data.json()
        let html = `<select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value);">;
            <option selected="selected" value="">--SELECCIONE--</option>`
        provincias.forEach(provincia => {
            html += `<option value="${provincia.Detalle}">${provincia.Detalle}</option>`
        });
        html += `</select>`
        document.getElementById('provincias').innerHTML=html

        document.getElementById('distritos').innerHTML = `
        <select name="cdgoDist" id="cdgoDist" class="form-control" onchange="getLocales(this.value);" disabled>;
        <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`

        document.getElementById('divLocal').innerHTML = `
        <select name="actas_ubigeo" id="actas_ubigeo" class="form-control" disabled>
        <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`
    }
}

let provinciaElegida=''
const getDistritos = async (provincia) => {
    provinciaElegida=provincia;
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamentoElegido}/${provincia}`)
    if (data.status == 200) {
        const distritos = await data.json();
        let html = `
        <select name="cdgoDist" id="cdgoDist" class="form-control" onchange="getLocales(this.value);">
        <option selected="selected" value="">--SELECCIONE--</option>`
        distritos.forEach(distrito=>{
            html += `<option value="${distrito.Detalle}">${distrito.Detalle}</option>`
        });
        html += `</select>`
        document.getElementById('distritos').innerHTML=html

        document.getElementById('divLocal').innerHTML = `
        <select name="actas_ubigeo" id="actas_ubigeo" class="form-control" disabled>
        <option selected="selected" value="" disabled>--SELECCIONE--</option>`
        html += `</select>`
    }
}

let distritoElegido=''
const getLocales = async(distrito)=>{
    distritoElegido = distrito;
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamentoElegido}/${provinciaElegida}/${distrito}`)
    if (data.status == 200){
        const locales = await data.json();
        let html = `
        <select name="actas_ubigeo" id="actas_ubigeo" class="form-control" onchange="getMesas(this.value);">
        <option value="" selected="selected">--SELECCIONE--</option>
        `
        locales.forEach(local=>{
          if(local.RazonSocial != null){
            html += `<option value="${local.RazonSocial}">${local.RazonSocial}</option>`
          }else{
            
          }
        });
        html += `</select>`
        document.getElementById('divLocal').innerHTML=html
    }
}

let localElegido=''
const getMesas = async(local)=>{
    localElegido=local
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamentoElegido}/${provinciaElegida}/${distritoElegido}/${localElegido}`)
    if (data.status==200){
        const mesas = await data.json();
        let html = `
            <div class="col-xs-12 pbot30">
                <p class="subtitle">LISTADO DE MESAS</p>
                    <div id="page-wrap">
                        <table class="table17" cellspacing="0">
                            <tbody>
                            <tr>
        `
        num = parseInt(0);
        mesas.forEach(mesa=>{
            html += `
                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000178', '10', '1')" style="cursor:pointer"><a href="#">${mesa.idGrupoVotacion}</a></td>
            `
            num+=parseInt(1)
            if(num==10){
                html+=`</tr><tr>`
            }
        })
        html+=`
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        `
        document.getElementById('divMesas').innerHTML=html
    }
}


/*

                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000169', '10', '1')" style="cursor:pointer"><a href="#">000169</a></td>
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000170', '10', '1')" style="cursor:pointer"><a href="#">000170</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000171', '10', '1')" style="cursor:pointer"><a href="#">000171</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000172', '10', '1')" style="cursor:pointer"><a href="#">000172</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000173', '10', '1')" style="cursor:pointer"><a href="#">000173</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000174', '10', '1')" style="cursor:pointer"><a href="#">000174</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000175', '10', '1')" style="cursor:pointer"><a href="#">000175</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000176', '10', '1')" style="cursor:pointer"><a href="#">000176</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000177', '10', '1')" style="cursor:pointer"><a href="#">000177</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000178', '10', '1')" style="cursor:pointer"><a href="#">000178</a></td>
                              </tr>
                              <tr>
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000179', '10', '1')" style="cursor:pointer"><a href="#">000179</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000180', '10', '1')" style="cursor:pointer"><a href="#">000180</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000181', '10', '1')" style="cursor:pointer"><a href="#">000181</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000182', '10', '1')" style="cursor:pointer"><a href="#">000182</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000183', '10', '1')" style="cursor:pointer"><a href="#">000183</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000184', '10', '1')" style="cursor:pointer"><a href="#">000184</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000185', '10', '1')" style="cursor:pointer"><a href="#">000185</a></td>	  
                                <td bgcolor="#C1C1C1" onclick="verDetalleMesa('010202', '000186', '10', '1')" style="cursor:pointer"><a href="#">000186</a></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="col-xs-12 cont-recto oculto-leyenda-color-fondo-mesas">
                        <div class="col-md-4"><img src="images/procesacon.jpg"> Procesada con imagen</div>
                        <div class="col-md-4"><img src="images/procesasin.jpg"> Procesada sin imagen</div>
                        <div class="col-md-4"><img src="images/sinprocesa.jpg"> Sin procesar</div>
                      </div>
        
                      <div class="row pbot30">
                        <div class="col-lg-8 centered">
                          <div class="col-xs-12 col-md-12 col-lg-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td colspan="10">
                                    <div class="conte-paginador">
                                      <span class="paginador-txt">Total de mesas: 18</span>
                                    </div>
                                  </td>
                                </tr>  
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td colspan="10">Página: 
                                    <ul class="pagination">
                                      <li class="active"><a class="paginador-n1">1</a></li>
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
*/








/*
<select name="actas_ubigeo" id="actas_ubigeo" class="form-control" onchange="actas_porUbigeo_verActsPr(this.value, '10', '')">
                            <option value="" selected="selected">--SELECCIONE--</option>
                            <option value="0033?010202">IE 16201</option>
                            <option value="0032?010202">IE MIGUEL MONTEZA TAFUR</option>
                          </select>


        let html = `<select name="cdgoDist" id="cdgoDist" class="form-control">
            <option selected="selected" value="">--SELECCIONE--</option>`;
        distritos.forEach(distrito => {
            html += `<option value="${distrito.Detalle}">${distrito.Detalle}</option>`;
        });
        html += `</select>`;
        document.getElementById('distritos').innerHTML = html;
    }
};
/*
<select name="cdgoDist" id="cdgoDist" class="form-control" onchange="getPageWeb('', 'actas', 'getLocalesVotacion', 'divLocal', '&amp;tipoElec=&amp;ubigeo=' + this.value);
    getPageWeb('', 'actas', 'limpiarDiv', 'divDetalle', '');">
    <option selected="selected" value="">--SELECCIONE--</option>
    <option value="010202">ARAMANGO</option>
    <option value="010205">BAGUA</option>
    <option value="010203">COPALLIN</option>
    <option value="010204">EL PARCO</option>
    <option value="010206">IMAZA</option>
    <option value="010201">LA PECA</option>
</select>
*/