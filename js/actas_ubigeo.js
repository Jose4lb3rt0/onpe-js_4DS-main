let ambito=''
const getDepartamentos = async(ubigeo)=>{
    ambito=ubigeo
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}`)
    if (data.status == 200){
        const departamentos = await data.json()
        let html = `
            <select name="cdgoDep" id="cdgoDep" class="form-control" onchange="getProvincias(this.value);">
                <option selected="selected" value="">--SELECCIONE--</option>        
        `
        departamentos.forEach(departamento => {
            html += `<option value="${departamento.Detalle}">${departamento.Detalle}</option>`
        });
        html += `</select>`
        document.getElementById('departamentos').innerHTML=html

        document.getElementById('provincias').innerHTML `
            <select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value) disabled;
            <option selected="selected" value="">--SELECCIONE--</option>
        `
        html += `</select>`
    }
}

const getProvincias = async(departamento) =>{
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/ubigeo/${ambito}/${departamento}`)
    if (data.status == 200){ 
        const provincias = await data.json()
        let html = `
            <select name="cdgoProv" id="cdgoProv" class="form-control" onchange="getDistritos(this.value);
                <option selected="selected" value="">--SELECCIONE--</option>       
        `
        provincias.forEach(provincia => {
            html += `<option value="${provincia.Detalle}">${provincia.Detalle}</option>`
        });

        html += `</select>`
        document.getElementById('provincias').innerHTML=html
    }
}


/*const getDistritos
<select name="cdgoDist" id="cdgoDist" class="form-control" onchange="
    getPageWeb('', 'actas', 'getLocalesVotacion', 'divLocal', '&amp;tipoElec=&amp;ubigeo=' + this.value);
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