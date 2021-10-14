Page.RutaAPI = General.UrlApiNegocio() + "/api/contrato";
Page.IDNumerico = true;

Page.Init = (() => {
    //alert("Entró al init");

    $("#objNombre").html("Contrato");
    Page.InitBusqueda();
    Page.InitDatos();
    Page.ObjId = $("#ddlDatosId").dxTextBox("instance");
    Page.ObjDescripcion = $("#ddlDatosNombre").dxTextBox("instance");
    Page.InitBotones();
});
/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Busqueda   --------------------------------------------------------****/
/*****************************************************************************************************************************************/

Page.InitBusqueda = (() => {
    //CONTROLES BUSQUEDA---------------------------------------------------------------

    Page.ddlBusqueda = $("#busqueda").dxValidationGroup({}).dxValidationGroup(`instance`);

    let tabIndex = 1;

    Page.ddlBusFecha = $("#ddlBusFecha").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        showClearButton: true,
        onEnterKey: ((e) => { Page.Buscar(); }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxDateBox("instance");

    Page.ddlBusRepresentante = $("#ddlBusRepresentante").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Representante',
        showClearButton: true,
        onEnterKey: ((e) => { Page.Buscar(); }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxTextBox("instance");

    Page.ddlBusProveedor = $("#ddlBusProveedor").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Proveedor',
        showClearButton: true,
        onEnterKey: ((e) => { Page.Buscar(); }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxTextBox("instance");

    Page.ddlBusCiudad = $("#ddlBusCiudad").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Ciudad',
        showClearButton: true,
        onEnterKey: ((e) => { Page.Buscar(); }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxTextBox("instance");

    Page.ddlBusCuenta = $("#ddlBusCuenta").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Cuenta',
        showClearButton: true,
        onEnterKey: ((e) => { Page.Buscar(); }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxTextBox("instance");

});

Page.LimpiarControlesBusqueda = (() => {
    Page.ddlBusqueda.reset();
});

Page.CargarGridBusqueda = (() => {

    let ClickKey;
    Page.grdBusqueda = $("#grdBusqueda").dxDataGrid({
        dataSource: Page.SetDataSourceDataGrid({
            key: `Id`, url: `${Page.RutaAPI}/search`, data: function () {
                return {
                    fecha: General.formatDate(Page.ddlBusFecha.option(`value`)),
                    representante: Page.ddlBusRepresentante.option(`value`),
                    proveedor: Page.ddlBusProveedor.option(`value`),
                    ciudad: Page.ddlBusCiudad.option(`value`),
                    cuenta: Page.ddlBusCuenta.option(`value`),
                };
            }
        }),
        remoteOperations: true,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        ////filas Responsive de Acuerdo a la Columna
        //wordWrapEnabled: true,
        rowAlternationEnabled: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 10,
        },
        pager: {
            infoText: "Página {0} de {1} ({2} registros)",
            visible: "auto",
            allowedPageSizes: [10, 20, 30],
            showInfo: true,
            showPageSizeSelector: true,
            showNavigationButtons: true,
        },
        headerFilter: {
            allowSearch: true,
            visible: true,
        },
        filterRow: {
            showOperationChooser: false,
            visible: true,
        },
        selectedRowKeys: [],
        columns: [
            { dataField: "CodigoContrato", caption: "Codigo", dataType: `string`, editorOptions: { placeholder: `Codigo`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "FechaInicial", caption: "Fecha Inicial", dataType: 'date', allowHeaderFiltering: true, format: 'dd/MM/yyyy', editorOptions: { format: `dd/MM/yyyy`, placeholder: `Fecha`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "FechaFinal", caption: "Fecha Final", dataType: 'date', allowHeaderFiltering: true, format: 'dd/MM/yyyy', editorOptions: { format: `dd/MM/yyyy`, placeholder: `Fecha`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "representante", caption: "Representante", dataType: `string`, editorOptions: { placeholder: `Representante`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "Ciudad", caption: "Ciudad", dataType: `string`, editorOptions: { placeholder: `Ciudad`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "proveedor", caption: "Proveedor", dataType: `string`, editorOptions: { placeholder: `Proveedor`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "Cuenta", caption: "Cuenta", dataType: `string`, editorOptions: { placeholder: `Cuenta`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "Direccion", caption: "Direccion", dataType: `string`, editorOptions: { placeholder: `Direccion`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "Domicilio", caption: "Domicilio", dataType: `string`, editorOptions: { placeholder: `Domicilio`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            //{ dataField: "DocumentoProveedor", caption: "Doc. Proveedor", dataType: `string`, editorOptions: { placeholder: `Doc. Proveedor`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "Importe", caption: "Importe", dataType: `number`, format: `#,##0.00`, editorOptions: { placeholder: `Importe`, showClearButton: true }, headerFilter: { allowSearch: true }, },
        ],
        selection: {
            mode: "single"
        },
        onSelectionChanged: ((item) => {
            Page.grdBusqueda_onSelectionChanged(item);
        }),
        onRowClick: (e => {
            if (ClickKey == e.key) {
                Page.TabCambiarPage("#tabDatos");
                ClickKey = null;
            }
            else ClickKey = e.key;
        }),
    }).dxDataGrid("instance");
});

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Fin Busqueda ------------------------------------------------------****/
/*****************************************************************************************************************************************/

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Datos -------------------------------------------------------------****/
/*****************************************************************************************************************************************/
Page.InitDatos = (() => {
    //CONTROLES DATOS--------------------------------------------------------------------
    Page.ddlDatos = $("#datos").dxValidationGroup({}).dxValidationGroup(`instance`);
    let tabIndex = 1;
    Page.ddlDatosId = $("#ddlDatosId").dxTextBox({
        tabIndex: tabIndex++,
        value: 0,
        placeholder: 'Codigo Contrato',
        readOnly: true,
    }).dxTextBox("instance");

    Page.ddlDatosNombre = $("#ddlDatosNombre").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Nombre',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosPaterno = $("#ddlDatosPaterno").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Paterno',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosMaterno = $("#ddlDatosMaterno").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Materno',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosTestimonio = $("#ddlDatosTestimonio").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Testimonio',
        showClearButton: true,
        maxLength: 50,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosFechaInicial = $("#ddlDatosFechaInicial").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Inicial',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxDateBox("instance");

    Page.ddlDatosFechaFinal = $("#ddlDatosFechaFinal").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Final',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxDateBox("instance");

    Page.ddlDatosFechaTestimonio = $("#ddlDatosFechaTestimonio").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Testimonio',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxDateBox("instance");

    Page.ddlDatosNumeroNotaria = $("#ddlDatosNumeroNotaria").dxNumberBox({
        format: "#,##0",
        tabIndex: tabIndex++,
        placeholder: 'Numero Notaria',
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxNumberBox(`instance`);

    Page.ddlDatosNombreProveedor = $("#ddlDatosNombreProveedor").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Nombre Proveedor',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosPaternoProveedor = $("#ddlDatosPaternoProveedor").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Paterno Proveedor',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosMaternoProveedor = $("#ddlDatosMaternoProveedor").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Materno Proveedor',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosDocumentoProveedor = $("#ddlDatosDocumentoProveedor").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Documento Proveedor',
        showClearButton: true,
        maxLength: 20,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosDomicilio = $("#ddlDatosDomicilio").dxTextArea({
        tabIndex: tabIndex++,
        maxLength: 500,
        placeholder: 'Domicilio',
        showClearButton: true,
        height: 100,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextArea("instance");

    Page.ddlDatosDireccion = $("#ddlDatosDireccion").dxTextArea({
        tabIndex: tabIndex++,
        maxLength: 500,
        placeholder: 'Direccion',
        showClearButton: true,
        height: 100,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextArea("instance");

    Page.ddlDatosCiudad = $("#ddlDatosCiudad").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Ciudad',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosSuperficie = $("#ddlDatosSuperficie").dxNumberBox({
        format: "#,##0",
        tabIndex: tabIndex++,
        placeholder: 'Superficie',
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxNumberBox(`instance`);

    Page.ddlDatosNumeroDireccion = $("#ddlDatosNumeroDireccion").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Numero Direccion',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosImporte = $("#ddlDatosImporte").dxNumberBox({
        format: "#,##0.00",
        tabIndex: tabIndex++,
        placeholder: 'Importe',
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxNumberBox(`instance`);

    Page.ddlDatosLiteral = $("#ddlDatosLiteral").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Literal',
        showClearButton: true,
        maxLength: 200,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosCuenta = $("#ddlDatosCuenta").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Cuenta',
        showClearButton: true,
        maxLength: 20,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosNumeroMeses = $("#ddlDatosNumeroMeses").dxNumberBox({
        format: "#,##0",
        tabIndex: tabIndex++,
        placeholder: 'Meses',
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxNumberBox(`instance`);

    Page.ddlDatosFechaInicialArrendamiento = $("#ddlDatosFechaInicialArrendamiento").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Inicial Arrendamiento',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxDateBox("instance");

    Page.ddlDatosFechaFinalArrendamiento = $("#ddlDatosFechaFinalArrendamiento").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Final Arrendamiento',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxDateBox("instance");

    Page.ddlDatosFechaTenor = $("#ddlDatosFechaTenor").dxDateBox({
        tabIndex: tabIndex++,
        placeholder: 'Fecha Tenor',
        type: "date",
        displayFormat: "dd/MM/yyyy",
        dateOutOfRangeMessage: "Fecha fuera de rango",
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Fecha es requerido'
        }]
    }).dxDateBox("instance");

    Page.ddlDatosMes = $("#ddlDatosMes").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Mes',
        showClearButton: true,
        maxLength: 30,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosAnio = $("#ddlDatosAnio").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Año',
        showClearButton: true,
        maxLength: 4,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");
});

Page.FormToObj = (() => {
    Page.data.palId = Page.ObjId.option('value');
    Page.data.palEstado = Page.data.estado;
    //CONTROLES DATOS--------------------------------------------------------------------       
    Page.data.empId = Page.ddlDatosEmpresa.option("value");
    Page.data.camId = Page.ddlDatosCampo.option("value");
    Page.data.palFechaCreacion = new Date().toJSON();
    Page.data.palFecha = Page.FormatDateString(Page.ddlDatosFecha.option("value"));

    if ([`R`, `X`].includes(Page.data.estado)) Page.data.palComentario = Page.ddlDatosComentarioRechazar.option("value");
    else Page.data.palComentario = Page.ddlDatosComentario.option("value");
});

Page.ObjToForm = (() => {

    Page.data.codigo = Page.data.Id;
    //CONTROLES DATOS--------------------------------------------------------------------
    Page.ObjId.option('value', Page.data.Id);
    Page.ddlDatosId.option("value", Page.data.Id);
    Page.ddlDatosMaterno.option(`value`, Page.data.Materno);
    Page.ddlDatosPaterno.option(`value`, Page.data.Paterno);
    Page.ddlDatosNombre.option(`value`, Page.data.Nombres);
    Page.ddlDatosTestimonio.option(`value`, Page.data.Testimonio);
    Page.ddlDatosFechaInicial.option(`value`, Page.data.FechaInicial);
    Page.ddlDatosFechaFinal.option(`value`, Page.data.FechaFinal);
    Page.ddlDatosFechaTestimonio.option(`value`, Page.data.FechaTestimonio);
    Page.ddlDatosNumeroNotaria.option(`value`, Page.data.NumeroNotaria);
    Page.ddlDatosPaternoProveedor.option(`value`, Page.data.PaternoProveedor);
    Page.ddlDatosMaternoProveedor.option(`value`, Page.data.MaternoProveedor);
    Page.ddlDatosNombreProveedor.option(`value`, Page.data.NombresProveedor);
    Page.ddlDatosDocumentoProveedor.option(`value`, Page.data.DocumentoProveedor);
    Page.ddlDatosDomicilio.option(`value`, Page.data.Domicilio);
    Page.ddlDatosDireccion.option(`value`, Page.data.Direccion);
    Page.ddlDatosCiudad.option(`value`, Page.data.Ciudad);
    Page.ddlDatosSuperficie.option(`value`, Page.data.Superficie);
    Page.ddlDatosNumeroDireccion.option(`value`, Page.data.NumeroDireccion);
    Page.ddlDatosImporte.option(`value`, Page.data.Importe);
    Page.ddlDatosLiteral.option(`value`, Page.data.Literal);
    Page.ddlDatosCuenta.option(`value`, Page.data.Cuenta);
    Page.ddlDatosNumeroMeses.option(`value`, Page.data.NumeroMeses);
    Page.ddlDatosFechaInicialArrendamiento.option(`value`, Page.data.FechaInicialArrendamiento);
    Page.ddlDatosFechaFinalArrendamiento.option(`value`, Page.data.FechaFinalArrendamiento);
    Page.ddlDatosFechaTenor.option(`value`, Page.data.FechaTenor);
    Page.ddlDatosMes.option(`value`, Page.data.Mes);
    Page.ddlDatosAnio.option(`value`, Page.data.Anio);
});

Page.LimpiarControlesDatos = (() => {
    Page.ControlesDatosResetValidator();
    Page.ddlDatosId.option("value", "0");
   
});

Page.ControlesDatosResetValidator = (() => {
    let data = [
        { nombre: "ddlDatosEmpresa" },
        { nombre: "ddlDatosCampo" },
        { nombre: "ddlDatosFecha" },
        //{ nombre: "ddlDatosComentario" },
        //{ nombre: "ddlDatosComentarioRechazar" },
    ];
    data.forEach(e => {
        Page.TryCatchResetValidator(`#${e.nombre}`);
    });
});

Page.SetDataReadOnly = (() => {
    let readOnly = false;
    if (!["C", undefined].includes(Page.data.estado)) {
        readOnly = true;
    }
    Page.ddlDatosEmpresa.option("readOnly", readOnly);
    Page.ddlDatosCampo.option("readOnly", readOnly);
    Page.ddlDatosFecha.option("readOnly", readOnly);
    Page.ddlDatosComentario.option("readOnly", readOnly);
});

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Fin Datos  --------------------------------------------------------****/
/*****************************************************************************************************************************************/

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Detalle------------------------------------------------------------****/
/*****************************************************************************************************************************************/
Page.TabDetalle = (() => {
    privilegios.MostrarBotones("D");
    $("#divDetalleData").hide();
    $("#lblExcelError").hide();
    if (Page.data.codigo) {
        $("#divResultadoDetalle").show();
        setTimeout(function () {
            Page.CargarDetalleGrid();
        }, 250);
        Page.CargarSetIniciarDetalle();
    }
    else {
        $("#divResultadoDetalle").hide();
        $(`#ddlDetalleDocumentoMostrar`).hide();
    }
});

Page.initDetalleDatos = (() => {
    Page.ddlDetalle = $("#detalle").dxValidationGroup({}).dxValidationGroup(`instance`);

    let tabIndex = 1;

    Page.ddlDetalleMultiple = $("#ddlDetalleMultiple").dxSwitch({
        tabIndex: tabIndex++,
        value: false,
        switchedOffText: `NO`,
        switchedOnText: `SI`,
        onValueChanged: (e => {
            let id = Page.FormatStringNumber($("#hidDetId").val());
            if (e.value && id) {
                Page.grdDetalle.option(`selection.mode`, `multiple`);
                //$(`#ddlDetalleAnimalMostrar`).hide();            
                Page.ddlDetalleAnimal.option("readOnly", true);
            }
            else {
                Page.grdDetalle.option(`selection.mode`, `single`);
                if (id) {
                    Page.DetalleToForm(id);
                    Page.grdDetalle.option(`selectedRowKeys`, [id]);
                } else {
                    //$(`#ddlDetalleAnimalMostrar`).show();
                    Page.TryCatchResetValidator(`#ddlDetalleAnimal`);
                }
                if (Page.data.estado == "C") Page.ddlDetalleAnimal.option("readOnly", false);
                if (Page.ddlDetalleAnimalDataGrid) Page.ddlDetalleAnimalDataGrid.option("selection.mode", e.value ? "multiple" : "single");
            }
        }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxSwitch(`instance`);

    //$(`#ddlDetalleAnimalMostrar`).hide();

    Page.ddlDetalleAnimal = $("#ddlDetalleAnimal").dxDropDownBox({
        tabIndex: tabIndex++,
        dataSource: Page.SetDataSourceDataGrid({
            key: `aniId`, url: `${Page.RutaAPI}Detalle/Animal/GetList`, data: function () {
                return {
                    empresa: Page.data.empId,
                    estado: Page.data.estado == "C" ? "A" : "*"
                };
            }
        }),
        placeholder: "Seleccionar los animales...",
        valueExpr: "aniId",
        //displayExpr: "aniCodigo",
        displayExpr: ((item) => {
            if (Page.ddlDetalleMultiple.option(`value`)) {
                return item && item.aniCodigo;
            } else {
                return item && `[${item.aniCodigo}, ${item.troNombre}, ${item.catNombre}, ${item.razNombre}]`;
            }
        }),
        showClearButton: true,
        searchEnabled: true,
        mode: "search",
        value: [],
        contentTemplate: ((e) => {
            let value = e.value ? e.value.map((x) => { if (typeof x == "object") return x.aniId; else return x; }) : e.value,
                $dataGrid = $("<div>").dxDataGrid({
                    remoteOperations: true,
                    showBorders: true,
                    showColumnLines: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    hoverStateEnabled: true,
                    columnAutoWidth: true,
                    paging: {
                        enabled: true,
                        pageIndex: 0,
                        pageSize: 5,
                    },
                    pager: {
                        visible: "auto",
                        allowedPageSizes: [5, 10, 30, 50],
                        showInfo: true,
                        showPageSizeSelector: true,
                        showNavigationButtons: true,
                    },
                    headerFilter: { visible: true },
                    filterRow: {
                        showOperationChooser: false,
                        visible: true,
                    },
                    dataSource: e.component.getDataSource(),
                    columns: [
                        //{ dataField: "aniId", caption: "ID", editorOptions: { placeholder: `ID`, showClearButton: true }, headerFilter: { allowSearch: true }, },
                        { dataField: "aniCodigo", caption: "Codigo", dataType: `string`, editorOptions: { placeholder: `Codigo`, showClearButton: true }, headerFilter: { allowSearch: true }, },
                        { dataField: "troNombre", caption: "Tropa", dataType: `string`, editorOptions: { placeholder: `Tropa`, showClearButton: true }, headerFilter: { allowSearch: true }, },
                        { dataField: "catNombre", caption: "Categoria", dataType: `string`, editorOptions: { placeholder: `Categoria`, showClearButton: true }, headerFilter: { allowSearch: true }, },
                        { dataField: "razNombre", caption: "Raza", dataType: `string`, editorOptions: { placeholder: `Raza`, showClearButton: true }, headerFilter: { allowSearch: true }, },
                        //{ dataField: "aniSexo", caption: "Sexo", dataType: `string`, editorOptions: { placeholder: `Sexo Animal`, showClearButton: true }, headerFilter: { allowSearch: true } },
                    ],
                    //scrolling: { mode: "infinite" },
                    height: 300,
                    selection: { mode: Page.ddlDetalleMultiple.option(`value`) ? "multiple" : "single" },
                    selectedRowKeys: value,
                    onSelectionChanged: function (item) {
                        let data = item.selectedRowsData;
                        data = data.length > 0 ? data : null;
                        e.component.option("value", data);
                    },
                });

            let dataGrid = $dataGrid.dxDataGrid("instance");
            Page.ddlDetalleAnimalDataGrid = dataGrid;
            e.component.on("valueChanged", function (args) {
                if (args.value) {
                    let type = args.value[0];
                    if (typeof type != "object") dataGrid.selectRows(args.value, false);
                }
                else dataGrid.selectRows(args.value, false);

                if (!Page.ddlDetalleMultiple.option(`value`)) e.component.close();
            });
            return $dataGrid;
        }),
        onValueChanged: (e => {
            let texto = 0;
            if (e.value) {
                texto = e.value.length;
            }
            $(`#ddlDetalleAnimalSeleccionado`).text(`${texto}`);
        }),
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            message: 'Animal es requerido',
            reevaluate: true,
            validationCallback: (e => {
                let sw = false;
                if (![null, undefined].includes(e.value)) {
                    if (e.value.length > 0) {
                        sw = true;
                    }
                }
                return sw;
            }),
        }]
    }).dxDropDownBox("instance");

    Page.ddlDetallePrenez = $("#ddlDetallePrenez").dxSelectBox({
        tabIndex: tabIndex++,
        dataSource: Page.SetDataSourceSelectBox(`value`, null, {}, [
            { nombre: `Preñada`, value: `P` },
            { nombre: `Vacia`, value: `V` },
            { nombre: 'Ninguno', value: `N` },
        ]),
        placeholder: 'Diagnostico...',
        valueExpr: 'value',
        displayExpr: 'nombre',
        showClearButton: true,
        searchEnabled: true,
        mode: "search",
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Diagnostico es requerido',
        }]
    }).dxSelectBox("instance");

    Page.ddlDetalleTamanoPrenez = $("#ddlDetalleTamanoPrenez").dxSelectBox({
        tabIndex: tabIndex++,
        dataSource: Page.SetDataSourceSelectBox(`value`, ``, {}, [
            //{ value: "N", nombre: "Ninguno" },
            { value: "G", nombre: "Grande" },
            { value: "M", nombre: "Mediana" },
            { value: "P", nombre: "Pequeña" },
        ]),
        placeholder: 'Tamaño de Preñez',
        valueExpr: 'value',
        displayExpr: 'nombre',
        showClearButton: true,
        searchEnabled: true,
        mode: "search",
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Tamaño de Preñez es requerido',
        }]
    }).dxSelectBox("instance");

    Page.ddlDetalleEvaluacion = $("#ddlDetalleEvaluacion").dxSelectBox({
        tabIndex: tabIndex++,
        dataSource: Page.SetDataSourceSelectBox(`evaId`),
        placeholder: 'Evaluacion',
        valueExpr: 'evaId',
        displayExpr: 'evaNombre',
        showClearButton: true,
        searchEnabled: true,
        mode: "search",
        noDataText: "Sin Registros",
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            message: 'Evaluacion es requerido',
            reevaluate: true,
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxSelectBox("instance");

    Page.ddlDetalleTropaDestino = $("#ddlDetalleTropaDestino").dxSelectBox({
        tabIndex: tabIndex++,
        dataSource: Page.SetDataSourceSelectBox(`troId`),
        placeholder: 'Tropa Destino',
        valueExpr: 'troId',
        displayExpr: 'troNombre',
        showClearButton: true,
        searchEnabled: true,
        mode: "search",
        noDataText: "Sin Registros",
    }).dxValidator({
        validationRules: [{
            type: 'custom',
            validationCallback: ((e) => {
                return true;
            }),
        }]
    }).dxSelectBox("instance");

    Page.ddlDetalleDocumento = $("#ddlDetalleDocumento").dxFileUploader({
        tabIndex: tabIndex++,
        accept: '.xls,.xlsx',
        allowedFileExtensions: [".xls", ".xlsx"],
        selectButtonText: "Buscar Documento...",
        labelText: "o arrastre el documento aqui...",
        //maxFileSize: 1000000,
        multiple: false,
        uploadUrl: `/`,
        uploadMethod: `POST`,
        uploadedMessage: "Documento Cargado.",
        uploadFailedMessage: "Ocurrió un error al Cargar el Documento.",
        readyToUploadMessage: "Listo",
        //invalidFileExtensionMessage: "Tipo de archivo no permitido",
        uploadUrl: `${General.UrlApiNegocio()}/Api/File/PostFile`,
        onUploaded: ((e) => {
            $("#divDetalleData").hide();
            General.ShowPleaseWait('Procesando el Documento, por favor espere');
            //FileName = e.request.responseText.replace('"', '').replace('"', '');
            Page.DetalleValidarExcel(e.request.responseText.replace('"', '').replace('"', ''));
        }),
        //validationStatus: "valid",
    }).dxFileUploader("instance");

});

Page.CargarSetIniciarDetalle = (() => {
    Page.DetalleResetValidator();
});

Page.SetDetalleReadOnly = (() => {
    let readOnly = true;
    if (["C"].includes(Page.data.estado)) {
        readOnly = false;
        $(`#ddlDetalleMultipleMostrar`).show();
        $(`#ddlDetalleDocumentoMostrar`).show();

    } else {
        $(`#ddlDetalleMultipleMostrar`).hide();
        $(`#ddlDetalleDocumentoMostrar`).hide();
    }
    Page.ddlDetalleAnimal.option(`readOnly`, readOnly);
    Page.ddlDetallePrenez.option(`readOnly`, readOnly);
    Page.ddlDetalleTamanoPrenez.option(`readOnly`, readOnly);
    Page.ddlDetalleEvaluacion.option(`readOnly`, readOnly);
    Page.ddlDetalleTropaDestino.option(`readOnly`, readOnly);
    //Page.ddlDetalle.option(`readOnly`, readOnly);
});

Page.SetDetalleReadOnlyOpcionPrenez = (readOnly => {
    Page.ddlDetalleTamanoPrenez.option(`readOnly`, readOnly);
    Page.ddlDetalleEvaluacion.option(`readOnly`, readOnly);
    Page.ddlDetalleTropaDestino.option(`readOnly`, readOnly);
});

Page.DetalleLimpiar = (() => {
    Page.CargarPredeterminado = false;
    $("#hidDetId").val("");
    Page.DetalleResetValidator();
    //Page.ddlDetallePrenez.reset();
    Page.ddlDetalleTropaDestino.reset();
    Page.CargarPredeterminado = true;
});

Page.DetalleResetValidator = (() => {
    Page.ddlDetalle.reset();
});

Page.TabDetalleFocus = (() => {
    setTimeout(function () {
        //Page.ddlDetalleAnimal.focus();
        Page.ddlDetallePrenez.focus();
    }, 100);
});

Page.DetalleNuevo = (() => {
    Page.grdDetalle.clearSelection();
    Page.DetalleLimpiar();
    $("#divDetalleData").show(100);
    //$(`#ddlDetalleAnimalMostrar`).show();
    $("#btnEnviar").hide();
    if (Page.ddlDetalleAnimalDataGrid && Page.data.estado == "C") Page.ddlDetalleAnimalDataGrid.state(null);
    Page.TabDetalleFocus();
});

Page.DetalleCancelar = (() => {
    Page.DetalleLimpiar();
    $("#divDetalleData").hide(100);
    $("#btnEnviar").show();
    $("#btnCelGuardar").hide();
    $("#btnCelNuevoAbajo").show();
    Page.grdDetalle.option(`selection.mode`, `single`);
});

Page.DetalleToForm = ((codigo) => {

    Page.DetalleLimpiar();
    $.ajax({
        url: `${Page.RutaAPI}Detalle`,
        dataType: "json",
        method: "GET",
        data: { id: codigo },
        success: (result => {
            let obj = result.Result;
            Page.CargarPredeterminado = false;
            //$(`#ddlDetalleAnimalMostrar`).show();
            $("#hidDetId").val(obj.detId);
            $("#divDetalleData").show(100);
            $("#btnEnviar").hide();
            $("#btnCelGuardar").show();
            $("#btnCelNuevoAbajo").hide();
            Page.ScrollTopAnimate("#divDetalleData");
            //setTimeout(function () {
            Page.ddlDetalleAnimal.option(`value`, [obj.aniId]);
            Page.ddlDetalleEvaluacion.option(`value`, obj.evaId);
            Page.ddlDetalleTropaDestino.option(`value`, obj.troIdDestino);
            Page.ddlDetalleTamanoPrenez.option(`value`, obj.detTamanoPrenez);
            Page.ddlDetallePrenez.option(`value`, obj.detPrenez);

            Page.CargarPredeterminado = true;
            Page.TabDetalleFocus();
        }),
        error: ((e) => {
            General.HidePleaseWait();
            let error = e.responseJSON
            General.ShowAlert(error.Mensaje, (error.TipoMensaje == 3 ? "Error" : "Validacion"), error.TipoMensaje);
        }),
    });
});

Page.DetalleGuardar = (() => {
    if ($("#divDetalleData").is(":visible")) {
        if (!Page.ValidarDatosGuardar(`#detalle`)) {
            return;
        }

        if (!Page.data.codigo) {
            General.ShowAlert("Por favor, seleccione un Registro.");
            return;
        }

        let obj = {};
        obj.detId = $("#hidDetId").val();
        obj.palId = Page.data.codigo;
        obj.detPrenez = Page.ddlDetallePrenez.option(`value`);
        obj.detTamanoPrenez = Page.ddlDetalleTamanoPrenez.option(`value`);
        obj.evaId = Page.ddlDetalleEvaluacion.option(`value`);
        obj.troIdDestino = Page.ddlDetalleTropaDestino.option(`value`);
        obj.codigo = [];
        obj.multiple = Page.ddlDetalleMultiple.option(`value`);

        if (obj.multiple && obj.detId > 0) {
            obj.codigo = Page.grdDetalle.option(`selectedRowKeys`);
            if (!obj.codigo.length) {
                General.ShowAlert("Por favor seleccione un Registro en el Detalle Para Actualizar.");
                return;
            }
        }
        else {
            let key = Page.ddlDetalleAnimal.option('value');
            obj.codigo = key.map((x) => { if (typeof x == "object") return x.aniId; else return x; });
        }
        let verb = 'POST';
        if (obj.detId > 0) verb = 'PUT';

        General.ShowPleaseWait('Procesando, por favor espere');
        $.ajax({
            method: verb,
            url: `${Page.RutaAPI}Detalle`,
            data: obj,
            dataType: "json",
            success: (result => {
                General.HidePleaseWait();
                $("#divDetalleData").hide(100);
                Page.DetalleLimpiar();
                setTimeout(function () {
                    Page.CargarDetalleGrid();
                }, 250);
                General.ShowAlert(`${result.Result}`);
                $("#btnEnviar").show();
                $("#btnCelGuardar").hide();
                $("#btnCelNuevoAbajo").show();
            }),
            error: (e => {
                General.HidePleaseWait();
                let error = e.responseJSON
                General.ShowAlert(error.Mensaje, (error.TipoMensaje == 3 ? "Error" : "Validacion"), error.TipoMensaje);
            }),
        });
    }

});

Page.DetalleEliminar = (() => {
    let id = $("#hidDetId").val();
    if ($("#divDetalleData").is(":visible") && id > 0) {
        let obj = {};
        obj.palId = Page.data.codigo;
        obj.codigo = [id]
        if (Page.ddlDetalleMultiple.option(`value`)) {
            obj.codigo = Page.grdDetalle.option(`selectedRowKeys`);
            if (!(obj.codigo.length > 0)) {
                General.ShowAlert("Por favor seleccione un Registro en el Detalle Para Eliminar.");
                return;
            }
        }
        General.ShowPleaseWait('Procesando, por favor espere');

        $.ajax({
            method: 'DELETE',
            url: `${Page.RutaAPI}Detalle`,
            dataType: "json",
            data: obj,
            success: (result => {
                General.HidePleaseWait();
                Page.DetalleLimpiar();
                setTimeout(function () {
                    Page.CargarDetalleGrid();
                }, 250);
                $("#divDetalleData").hide(100);
                $("#btnEnviar").show();
                $("#btnCelGuardar").hide();
                $("#btnCelNuevoAbajo").show();
                General.ShowAlert(`${result.Result}`);
            }),
            error: (e => {
                General.HidePleaseWait();
                let error = e.responseJSON
                General.ShowAlert(error.Mensaje, (error.TipoMensaje == 3 ? "Error" : "Validacion"), error.TipoMensaje);
            }),
        });
    }
    else {
        General.ShowAlert("Por favor seleccione un Registro.");
    }
});
Page.CargarDetalleGrid = (() => {

    let ClickKey;
    Page.grdDetalle = $("#grdDetalle").dxDataGrid({
        dataSource: Page.SetDataSourceDataGrid({ key: `detId`, url: `${Page.RutaAPI}Detalle/GetBy`, data: { id: Page.data.codigo } }),
        remoteOperations: true,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        ////filas Responsive de Acuerdo a la Columna
        //wordWrapEnabled: true,
        rowAlternationEnabled: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        loadPanel: {
            text: "Cargando...",
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 10,
        },
        pager: {
            infoText: "Página {0} de {1} ({2} registros)",
            visible: "auto",
            allowedPageSizes: [10, 20, 30, 50, 100],
            showInfo: true,
            showPageSizeSelector: true,
            showNavigationButtons: true,
        },
        headerFilter: { visible: true },
        filterRow: {
            showOperationChooser: false,
            visible: true,
        },
        selectedRowKeys: [],
        columns: [
            /*{ dataField: "detId", caption: "ID", dataType: `number`, editorOptions: { placeholder: `ID`, showClearButton: true }, headerFilter: { allowSearch: true }, },*/
            { dataField: "aniCodigo", caption: "Codigo Animal", dataType: `string`, editorOptions: { placeholder: `Codigo Animal`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "troNombreOrigen", caption: "Tropa Origen", dataType: `string`, editorOptions: { placeholder: `TropaOrigen`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "troNombreDestino", caption: "Tropa Destino", dataType: `string`, editorOptions: { placeholder: `TropaDestino`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "catNombre", caption: "Categoria", dataType: `string`, editorOptions: { placeholder: `Categoria`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "razNombre", caption: "Raza", dataType: `string`, editorOptions: { placeholder: `Raza`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "detPrenez", caption: "Diagnostico", dataType: `string`, width: 80, editorOptions: { placeholder: `Diagnostico`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "detTamanoPrenez", caption: "Tamaño Preñez", dataType: `string`, width: 90, editorOptions: { placeholder: `Tamaño Preñez`, showClearButton: true }, headerFilter: { allowSearch: true } },
            { dataField: "evaNombre", caption: "Evaluacion", dataType: `string`, editorOptions: { placeholder: `Evaluacion`, showClearButton: true }, headerFilter: { allowSearch: true } },
        ],
        onExporting: (e => {
            e.component.beginUpdate();
            //e.component.columnOption('detId', 'visible', false);
            let columnaVisible = [
                { id: `razNombre` },
                { id: `aniSexo` },
            ];
            columnaVisible.forEach(x => {
                Page.ColumnaVisibleTryCatch(e, x.id, `visible`, false);
            });

            let columnaCaption = [
                { id: `detTamanoPrenez`, entrada: `TamanoPrenez`, salida: `` },
                //{ id: ``, entrada:``,salida:``},
            ];

            columnaCaption.forEach(x => {
                x.salida = Page.ColumnaVisibleTryCatch(e, x.id, `caption`, x.entrada, true);
            });

            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('MiCampoPalpacion');
            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true,
            }).then(function (cellRange) {
                // header
                //console.log(cellRange);
                let row = 2, height = 15, columa = 15, celda = 9;
                let headerRowNota = worksheet.getRow(row);
                headerRowNota.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNota.getCell(celda).value = `Nota`;
                headerRowNota.getCell(celda).font = { name: 'Calibri', size: 12, bold: true };
                headerRowNota.getCell(celda).alignment = { horizontal: 'center', vertical: "middle" };
                //headerRowNota.getCell(7).alignment = { horizontal: 'left', vertical: "middle" };

                row++;
                let headerRowNotaCodigo = worksheet.getRow(row);
                headerRowNotaCodigo.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNotaCodigo.getCell(celda).value = `Codigo Animal: Obligatorio.`;
                headerRowNotaCodigo.getCell(celda).font = { name: 'Calibri', size: 12, bold: false };
                headerRowNotaCodigo.getCell(celda).alignment = { horizontal: 'left', vertical: "middle" };

                row++;
                let headerRowNotaTropaDestino = worksheet.getRow(row);
                headerRowNotaTropaDestino.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNotaTropaDestino.getCell(celda).value = `Tropa Destino: Opcional (Dejar vacio si el animal no cambio de tropa)`;
                headerRowNotaTropaDestino.getCell(celda).font = { name: 'Calibri', size: 12, bold: false };
                headerRowNotaTropaDestino.getCell(celda).alignment = { horizontal: 'left', vertical: "middle" };

                row++;
                let headerRowNotaDiagnostico = worksheet.getRow(row);
                headerRowNotaDiagnostico.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNotaDiagnostico.getCell(celda).value = `Diagnostico: Obligatorio => P=Preñada, V=Vacia, N=Ninguno`;
                headerRowNotaDiagnostico.getCell(celda).font = { name: 'Calibri', size: 12, bold: false };
                headerRowNotaDiagnostico.getCell(celda).alignment = { horizontal: 'left', vertical: "middle" };

                row++;
                let headerRowNotaTamanoPrenez = worksheet.getRow(row);
                headerRowNotaTamanoPrenez.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNotaTamanoPrenez.getCell(celda).value = `Tamaño Preñez: Obligatorio => G=Grandre, M=Mediana, P=Pequeña`;
                headerRowNotaTamanoPrenez.getCell(celda).font = { name: 'Calibri', size: 12, bold: false };
                headerRowNotaTamanoPrenez.getCell(celda).alignment = { horizontal: 'left', vertical: "middle" };

                row++;
                let headerRowNotaEvaluacion = worksheet.getRow(row);
                headerRowNotaEvaluacion.height = height;
                worksheet.mergeCells(row, celda, row, columa);

                headerRowNotaEvaluacion.getCell(celda).value = `Evaluacion: Opcional=> De Acuerdo con lo configurado por el Usuario`;
                headerRowNotaEvaluacion.getCell(celda).font = { name: 'Calibri', size: 12, bold: false };
                headerRowNotaEvaluacion.getCell(celda).alignment = { horizontal: 'left', vertical: "middle" };
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MiCampoPalpacion.xlsx');
                });
            }).then(function () {

                columnaVisible.forEach(x => {
                    Page.ColumnaVisibleTryCatch(e, x.id, `visible`, true);
                });
                columnaCaption.forEach(x => {
                    Page.ColumnaVisibleTryCatch(e, x.id, `caption`, x.salida);
                });
                e.component.endUpdate();
            });
            e.cancel = true;
        }),
        selection: {
            mode: "single"
        },
        onRowClick: (e => {
            if (e.component.option(`selection.mode`) == `single`) {
                if (ClickKey == e.key && e.key) {
                    Page.DetalleToForm(e.key);
                    ClickKey = null;
                }
                else ClickKey = e.key;
            }
        }),
        onSelectionChanged: function (e) {
            if (e.component.option(`selection.mode`) == `multiple`) {
                let data = e.selectedRowsData;
                if (data) data = data.map((x) => {
                    return {
                        aniId: x.aniId,
                        aniCodigo: x.aniCodigo,
                        troNombre: x.troNombreOrigen,
                        razNombre: x.razNombre,
                        catNombre: x.catNombre,
                    };
                });
                Page.ddlDetalleAnimal.option("value", data);
            }
        },
        onContentReady: function (e) {
            if ($("#tabDetalleLi.active").length === 1) {
                Page.ScrollTopAnimate("#grdDetalle");
            }
        },
        summary: {
            totalItems: [
                {
                    name: "total",
                    summaryType: "none",
                    showInColumn: "aniCodigo",
                    customizeText: function (data) {
                        return `Cantidad: ${General.formatNumber(Page.grdDetalle.totalCount())}`;
                    }
                },
            ],
        },
    }).dxDataGrid("instance");
});

Page.ColumnaVisibleTryCatch = ((e, id, nombre, valor, devolver = false) => {
    try {
        let result = '';
        if (devolver) {
            result = e.component.columnOption(id, nombre);
        }
        e.component.columnOption(id, nombre, valor);
        if (devolver) {
            return result;
        }
    }
    catch {
        console.error(`Error al Colocar en ${id}, ${nombre}:${valor}`);
    }
});

Page.DetalleValidarExcel = ((file) => {
    if (Page.grdDetalleExcelError) {
        Page.grdDetalleExcelError.dispose();
    }
    let obj = {
        nombre: file,
        palId: Page.data.codigo,
    };
    $.ajax({
        method: "POST",
        url: `${Page.RutaAPI}Detalle/PostArchivo`,
        data: obj,
        success: (e => {
            General.HidePleaseWait();

            let mensaje = e.Mensaje;
            if (e.Result.length > 0) {
                $("#lblExcelError").show();
                Page.CargarDetalleGridExcelError(e.Result);
            } else {
                $("#lblExcelError").hide();
            }
            General.ShowAlert(mensaje);
            setTimeout(function () {
                Page.CargarDetalleGrid();
            }, 250);
        }),
        error: (e => {
            General.HidePleaseWait();
            let error = e.responseJSON
            General.ShowAlert(error.Mensaje, (error.TipoMensaje == 3 ? "Error" : "Aviso"), error.TipoMensaje);
        }),
    });
});

Page.CargarDetalleGridExcelError = ((data = []) => {

    Page.grdDetalleExcelError = $("#grdDetalleExcelError").dxDataGrid({
        dataSource: Page.SetDataSourceDataGrid({ key: `nro`, dataSource: data }),
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        ////filas Responsive de Acuerdo a la Columna
        //wordWrapEnabled: true,
        rowAlternationEnabled: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        export: {
            fileName: "Animales con Errores",
        },
        loadPanel: {
            text: "Cargando...",
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 10,
        },
        pager: {
            infoText: "Página {0} de {1} ({2} registros)",
            visible: "auto",
            allowedPageSizes: [10, 20, 30, 50, 100],
            showInfo: true,
            showPageSizeSelector: true,
            showNavigationButtons: true,
        },
        headerFilter: { visible: true },
        filterRow: {
            showOperationChooser: false,
            visible: true,
        },
        selectedRowKeys: [],
        columns: [
            { dataField: "codigo", caption: "Cod. Animal", dataType: `string`, editorOptions: { placeholder: `Cod. Animal`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "mensaje", caption: "Mensaje", dataType: `string`, editorOptions: { placeholder: `Mensaje`, showClearButton: true }, headerFilter: { allowSearch: true }, },
        ],
        selection: {
            mode: "single"
        },
    }).dxDataGrid("instance");

    //setTimeout(function () {
    //    Page.grdDetalleExcelError.exportToExcel();
    //}, 5000);
});

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Log        --------------------------------------------------------****/
/*****************************************************************************************************************************************/
Page.TabLog = (() => {
    privilegios.MostrarBotones("N");
    if (Page.data.codigo) {
        $("#divResultadoLog").show();
        setTimeout(function () {
            Page.LogCargarGridBusqueda();
        }, 250);
    }
    else {
        $("#divResultadoLog").hide();
    }
});
Page.LogCargarGridBusqueda = (() => {

    Page.grdLog = $("#grdLog").dxDataGrid({
        dataSource: Page.SetDataSourceDataGrid({ key: `logId`, url: `${Page.RutaAPI}Log/GetBy`, data: { id: Page.data.codigo } }),
        //keyExpr: "conId",
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        ////filas Responsive de Acuerdo a la Columna
        //wordWrapEnabled: true,

        rowAlternationEnabled: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        loadPanel: {
            text: "Cargando...",
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 10,
        },
        pager: {
            infoText: "Página {0} de {1} ({2} registros)",
            visible: "auto",
            allowedPageSizes: [10, 20, 30],
            showInfo: true,
            showPageSizeSelector: true,
            showNavigationButtons: true,
        },
        headerFilter: { visible: true },
        filterRow: {
            showOperationChooser: false,
            visible: true,
        },
        selectedRowKeys: [],
        columns: [
            { dataField: "logFechaDoc", caption: "Fecha", dataType: 'date', format: 'dd/MM/yyyy hh:mm a', editorOptions: { placeholder: `Fecha`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            { dataField: "usrId", caption: "Usuario", editorOptions: { placeholder: `Usuario`, showClearButton: true }, headerFilter: { allowSearch: true }, },
            {
                dataField: "logEstado", caption: "Estado", editorOptions: { placeholder: `Estado`, showClearButton: true }, headerFilter: { allowSearch: true },
                calculateCellValue: (data => {
                    let row = data.logEstado;
                    if (row == "C") {
                        return "Creado";
                    }
                    else if (row == "E") {
                        return "Enviado";
                    }
                    else if (row == "A") {
                        return "Aprobado";
                    }
                    else if (row == "X") {
                        return "Anulado";
                    }
                    else if (row == "R") {
                        return "Rechazado";
                    }
                }),
            },
            { dataField: "logComentario", caption: "Comentario", width: 450, editorOptions: { placeholder: `Comentario`, showClearButton: true }, headerFilter: { allowSearch: true }, },
        ],
        selection: {
            mode: "single"
        },
    }).dxDataGrid("instance");

});

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Fin Log  ----------------------------------------------------------****/
/*****************************************************************************************************************************************/

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Botones------------------------------------------------------------****/
/*****************************************************************************************************************************************/

Page.VerificarBotones = (tabActive => {

});

Page.GuardarRegistroPageFail = (() => {
    Page.data.estado = Page.ddlDatosEstado.option(`value`);
});

/*****************************************************************************************************************************************/
/*****---------------------------------------------------- Seccion Fin Botones--------------------------------------------------------****/
/*****************************************************************************************************************************************/