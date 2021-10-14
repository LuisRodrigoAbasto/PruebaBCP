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
        export: {
            excelFilterEnabled: true,
            fileName: "Contrato",
        },
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift(
                {
                    location: "before",
                    widget: "dxButton",
                    options: {
                        icon: 'exportxlsx',
                        text: 'Exportar a Excel',
                        type: "success",
                        hint: "Exportar a Excel",
                        onClick: (e => {
                            DevExpress.ui.notify({
                                message: "Descargando.......",
                                width: 450,
                            }, "success", 600);
                            dataGrid.exportToExcel();
                        }),
                    }
                }, {
                location: "before",
                widget: "dxButton",
                options: {
                    icon: 'exportpdf',
                    text: 'Exportar a PDF',
                    type: "success",
                    hint: "Exportar a PDF",
                    onClick: (e => {
                        DevExpress.ui.notify({
                            message: "Descargando....",
                            width: 450,
                        }, "success", 600);
                        let doc = new jsPDF();
                        doc.text(`Contrato`, 10, 10);
                        DevExpress.pdfExporter.exportDataGrid({
                            jsPDFDocument: doc,
                            component: dataGrid,
                        }).then(function () {
                            doc.save('Contrato.pdf');
                        });
                    }),
                }
            });
        },
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
    Page.ddlDatosCodigoContrato = $("#ddlDatosCodigoContrato").dxTextBox({
        tabIndex: tabIndex++,
        placeholder: 'Codigo Contrato',
        maxLength: 10,
    }).dxValidator({
        validationRules: [{
            type: 'required',
        }]
    }).dxTextBox("instance");

    Page.ddlDatosId = $("#ddlDatosId").dxTextBox({
        tabIndex: tabIndex++,
        value: 0,
        placeholder: 'ID',
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
    Page.ddlDatosCodigoContrato.option("value", Page.data.CodigoContrato);
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