var Page = {
    data: {},
    ModoForm: "A",   //Alta, Baja, Modificación
    SeRealizoBusqueda: false,
    IDNumerico: true,
    ObjId: null,
    ObjDescripcion: null,
    // No se modifica
    tabBusqueda: async function () {
        await Page.MostrarBotones(`B`);
        Page.TabBusquedaPage();
    },
    TabBusquedaPage: function () {
        //sobre escribir en la pagina cliente
    },
    // No se modifica
    tabDatos: async function () {
        await Page.MostrarBotones(`D`);
        Page.TabDatosPage();
    },
    TabDatosPage: function () {
        //sobre escribir en la pagina cliente
    },
    // No se modifica
    RevisarSeguridad: async function () {
        Page.SubTitulo("");
        let tab = Page.GetTabActive();
        if (tab == "tabBuscarLi") tab = "B";
        else if (tab == "tabDatosLi") tab = "D";

        await Page.MostrarBotones(tab);
    },
    LimpiarControlesDatos: function () {
    },
    // No se modifica
    NuevoRegistro: async function () {
        Page.data = {};
        Page.SubTitulo("");
        Page.ModoForm = "A";
        $("#hidRegistroSeleccionado").text(`0`);
        Page.LimpiarControlesDatos();

        if (Page.SeRealizoBusqueda) {
            Page.grdBusqueda.clearSelection();
            await Page.grdBusqueda.pageIndex(0);
            $("#lblDatosRegistrosCounter").text('0 de ' + Page.grdBusqueda.totalCount());
        }
        await Page.MostrarBotones(`D`);
    },
    GetTabActive: function () {
        let tabActive = $("ul#tabContainer li.active");
        return tabActive.attr("id");
    },
    ValidarDatosGuardar: function (tab, animate = true) {
        let sw = false;
        try {
            let valGroup = $(`${tab}`).dxValidationGroup({}).dxValidationGroup("instance");
            let validation = DevExpress.validationEngine.validateGroup(valGroup);
            if (!validation.isValid) {
                General.Notify("Por favor verifique los campos obligatorios.", "error");
                if (animate) {
                    let scroll = validation.brokenRules[0].validator.element().attr('id');
                    Page.ScrollTopAnimate(`#${scroll}`);
                }
            }
            sw = validation.isValid;
        }
        catch (e) {
            console.error(`No se Reconoce la Validacion del Tab ${tab}`, e);
        }
        return sw;
    },
    // No se modifica
    GuardarRegistro: async function () {
        if (!Page.ValidarDatosGuardar(`#datos`)) return;

        General.ShowPleaseWait('Procesando, Por Favor Espere');
        try {
            Page.FormToObj();
            let metodo = "PUT";
            if (Page.ModoForm == "A") metodo = "POST";

            let result = await Page.MetodoAjax(metodo, `${Page.RutaAPI}`, Page.data);
            Page.ModoForm = "M";
            Page.data.codigo = result.data;
            await Page.GuardarRegistroPage();
            await Page.ObtenerDatos(result.data);
            General.HidePleaseWait();
            let mensaje = result.Mensaje;
            if (!mensaje) mensaje = `Registro ${(metodo == 'PUT' ? 'Actualizado' : 'Guardado')} Correctamente`;

            General.ShowAlert(mensaje);
            if (Page.SeRealizoBusqueda) Page.RefrescarBusqueda();
        }
        catch {
            console.error("Error");
            Page.GuardarRegistroPageFail();
        }
        General.HidePleaseWait();
    },
    GuardarRegistroPageFail: function () {
        //En caso de que falle y querramos manejar el error en el js del cliente sobreescribimos esta funcion
    },
    GuardarRegistroPage: async function () {
        //En caso querramos manejar del cliente sobreescribimos esta funcion
    },
    // No se modifica
    EliminarRegistro: async function () {
        let codigo = $("#hidRegistroSeleccionado").text();
        if (Page.ModoForm == "A" || [`0`].includes(codigo)) return;

        General.ShowPleaseWait('Procesando, Por Favor Espere');
        try {
            await Page.MetodoAjax(`DELETE`, `${Page.RutaAPI}/${codigo}`);
            General.HidePleaseWait();
            General.ShowAlert("Registro Eliminado Exitosamente");
            Page.NuevoRegistro();
            if (Page.SeRealizoBusqueda) Page.RefrescarBusqueda();
        }
        catch {
            console.error("Error");
            General.HidePleaseWait();
        }
    },
    RefrescarBusqueda: async function () {
        await Page.grdBusqueda.refresh();
        await Page.PaginacionBusqueda();
    },
    // No se modifica
    Buscar: function () {
        if (Page.grdBusqueda) { Page.grdBusqueda.dispose(); }
        Page.CargarGridBusqueda();
        Page.SeRealizoBusqueda = true;
        setTimeout(function () {
            Page.ScrollTopAnimate("#grdBusqueda");
        }, 1000);
    },

    // No se modifica
    MoveFirst: async function () {

        if (!Page.SeRealizoBusqueda) {
            return;
        }
        General.ShowPleaseWait('Obteniendo datos del registro, por favor espere');
        let pageIndex = 0;
        if (pageIndex != Page.grdBusqueda.pageIndex()) {
            await Page.grdBusqueda.pageIndex(pageIndex);
            //setTimeout(function () {
            await Page.grdBusqueda.selectRowsByIndexes(0);
            //}, 150)//ESTE DELAY SIRVE PARA QUE SE TERMINE DE CARGAR LA SIGUIENTE PAGINA
            //EN EL GRID
        }
        else {
            await Page.grdBusqueda.selectRowsByIndexes(0);
        }
        setTimeout(function () {
            General.HidePleaseWait();
        }, 500);
    },
    // No se modifica
    MoveLast: async function () {

        if (!Page.SeRealizoBusqueda) {
            return;
        }
        General.ShowPleaseWait('Obteniendo datos del registro, por favor espere');
        let pageCount = Page.grdBusqueda.pageCount();
        let pageIndex = pageCount - 1;
        if (pageIndex > 0 && pageIndex != Page.grdBusqueda.pageIndex()) {
            await Page.grdBusqueda.pageIndex(pageIndex);
            let pageSize = Page.grdBusqueda.pageSize() - 1;

            //setTimeout(function () {
            let totalCount = Page.grdBusqueda.totalCount();
            if (totalCount % Page.grdBusqueda.pageSize() == 0)
                await Page.grdBusqueda.selectRowsByIndexes(pageSize);
            else
                await Page.grdBusqueda.selectRowsByIndexes((totalCount % Page.grdBusqueda.pageSize()) - 1);
            //}, 150)//ESTE DELAY SIRVE PARA QUE SE TERMINE DE CARGAR LA SIGUIENTE PAGINA
            //EN EL GRID
        }
        else {
            let totalCount = Page.grdBusqueda.totalCount();
            if (totalCount % Page.grdBusqueda.pageSize() == 0)
                await Page.grdBusqueda.selectRowsByIndexes(Page.grdBusqueda.pageSize() - 1);
            else
                await Page.grdBusqueda.selectRowsByIndexes((totalCount % Page.grdBusqueda.pageSize()) - 1);
        }
        setTimeout(function () {
            General.HidePleaseWait();
        }, 500);
    },

    // No se modifica
    MovePrevious: async function () {

        if (!Page.SeRealizoBusqueda) {
            return;
        }
        General.ShowPleaseWait('Obteniendo datos del registro, por favor espere');

        let codigo = $("#hidRegistroSeleccionado").text();
        if (Page.IDNumerico) codigo = Page.FormatStringNumber(codigo);
        let selectedIndex = await Page.grdBusqueda.getRowIndexByKey(codigo);
        let pageSize = Page.grdBusqueda.instance().pageSize();
        if (selectedIndex > 0) {
            selectedIndex = selectedIndex - 1;
            await Page.grdBusqueda.selectRowsByIndexes(selectedIndex);
        } else {
            let pageIndex = Page.grdBusqueda.pageIndex();
            //var pageCount = Page.grdBusqueda.instance().pageCount();
            let previousIndex = pageIndex - 1;
            if (previousIndex >= 0) {
                selectedIndex = pageSize - 1;
                await Page.grdBusqueda.pageIndex(previousIndex)
                //setTimeout(function () {
                await Page.grdBusqueda.selectRowsByIndexes(selectedIndex);
                //}, 150)//ESTE DELAY SIRVE PARA QUE SE TERMINE DE CARGAR LA SIGUIENTE PAGINA
                //EN EL GRID
            }
        }
        setTimeout(function () {
            General.HidePleaseWait();
        }, 500);
    },

    // No se modifica
    MoveNext: async function () {
        if (!Page.SeRealizoBusqueda) {
            return;
        }
        General.ShowPleaseWait('Obteniendo datos del registro, por favor espere');

        let codigo = $("#hidRegistroSeleccionado").text();
        if (Page.IDNumerico) codigo = Page.FormatStringNumber(codigo);

        let selectedIndex = await Page.grdBusqueda.getRowIndexByKey(codigo);
        let totalIndex = Page.grdBusqueda.totalCount() - 1;
        let pageSize = Page.grdBusqueda.pageSize();
        if (selectedIndex < totalIndex) {
            selectedIndex = selectedIndex + 1;
        }
        if (selectedIndex >= pageSize) {
            let pageIndex = Page.grdBusqueda.pageIndex();
            let pageCount = Page.grdBusqueda.pageCount();
            let nextIndex = pageIndex + 1;
            if (nextIndex < pageCount) {
                selectedIndex = 0;
                await Page.grdBusqueda.pageIndex(nextIndex)
                //setTimeout(function () {
                await Page.grdBusqueda.selectRowsByIndexes(selectedIndex);
                //}, 150) //ESTE DELAY SIRVE PARA QUE SE TERMINE DE CARGAR LA SIGUIENTE PAGINA
                //EN EL GRID
            }
        }
        else {
            await Page.grdBusqueda.selectRowsByIndexes(selectedIndex);
        }
        setTimeout(function () {
            General.HidePleaseWait();
        }, 500);
    },
    ObtenerSelectBoxValor: async function (obj, value, columna) {
        try {
            let item = await obj._loadValue(value);
            if (!columna) columna = obj.option(`displayExpr`);
            return item[columna];
        }
        catch (e) {
            console.error("Error", e);
            return value;
        }
    },
    SubTitulo: function (subTitulo) {
        if (subTitulo.length > 40) subTitulo = subTitulo.substring(0, 37) + "...";
        $("#lblRegistroSeleccionado").html(subTitulo);
    },
    MetodoAjax: async function (metodo, url, data = {}) {
        let obj = await $.ajax({
            method: metodo,
            url: `${url}`,
            data: data,
            headers: General.Headers(),
        });
        return obj;
    },
    ObtenerSubTituloOtros: async function () {
        return null;
    },
    ObtenerSubTitulo: async function () {
        let titulo1 = Page.ObjId.option(`value`), titulo2 = Page.ObjDescripcion.option(`value`),
            titulo3 = await Page.ObtenerSubTituloOtros();

        if (Page.ObjId.NAME != `dxSelectBox`) titulo1 = Page.ObjId.option(`text`);
        if (Page.ObjDescripcion.NAME != `dxSelectBox`) titulo2 = Page.ObjDescripcion.option(`text`);
        if (Page.ObjId.NAME == `dxSelectBox`) titulo1 = await Page.ObtenerSelectBoxValor(Page.ObjId, titulo1);
        if (Page.ObjDescripcion.NAME == `dxSelectBox`) titulo2 = await Page.ObtenerSelectBoxValor(Page.ObjDescripcion, titulo2);
        if (titulo3) titulo2 += " " + titulo3;

        Page.SubTitulo(titulo1 + " - " + titulo2);
    },

    RevisarVariables: function () {
        if (!Page.ObjId) console.error("Page.ObjId No seteado.");
        if (!Page.ObjDescripcion) console.error("Page.ObjDescripcion No seteado.");
    },

    CancelarRegistro: async function () {
        let codigo = $("#hidRegistroSeleccionado").text();
        if (Page.ModoForm == `A` || [`0`].includes(codigo)) {
            Page.NuevoRegistro();
        }
        else {
            General.ShowPleaseWait('Obteniendo datos del registro, por favor espere');
            await Page.ObtenerDatos(codigo);
            General.HidePleaseWait();
        }
    },
    PaginacionBusqueda: async function (grid = Page.grdBusqueda) {
        if (!Page.SeRealizoBusqueda) return;
        let key = $("#hidRegistroSeleccionado").text();
        key = Page.IDNumerico ? Page.FormatStringNumber(key) : key;
        let selectedIndex = await grid.getRowIndexByKey(key);

        $("#lblDatosRegistrosCounter").text((grid.pageIndex() * grid.pageSize() + selectedIndex + 1) + ' de ' + grid.totalCount());

    },
    grdBusqueda_onSelectionChanged: async function (item, codigo) {
        if (typeof item.selectedRowsData === "object" && typeof item.selectedRowKeys === "object") {
            if (item.selectedRowsData.length && item.selectedRowKeys.length) {
                let data = item.selectedRowsData[0], key = codigo ? data[codigo] : item.selectedRowKeys[0];
                if (data && key) {
                    $("#hidRegistroSeleccionado").text(key);
                    if (key) await Page.ObtenerDatos(key);
                    //navegacion
                    await Page.PaginacionBusqueda(item.component);
                }
            }
        }
    },
    ObtenerDatos: async function (id) {
        try {
            $(`#datos`).dxValidationGroup({}).dxValidationGroup("instance").reset();
            let result = await Page.MetodoAjax("GET", `${Page.RutaAPI}/${id}`);
            if (result.data) {
                    $("#hidRegistroSeleccionado").text(id);
                    Page.data = result.data;
                    Page.ObjToForm();
                    Page.ModoForm = "M";
                    if (Page.GetTabActive() != "tabBuscarLi") await Page.MostrarBotones(`D`);
                    await Page.ObtenerSubTitulo();
            }
            else General.ShowAlert(`Registro no existe`, "Informacion", 2);
        }
        catch {
            console.error("Error");
        }
    },

    AutoSelect: async function (param) {
        setTimeout(async function () {
            let key = General.GetUrlParam(param);
            if (key != null) {
                General.ShowPleaseWait('Obteniendo datos del registro, por favor espere...');
                await Page.ObtenerDatos(key);
                Page.TabCambiarPage(`#tabDatos`);
                setTimeout(function () {
                    General.HidePleaseWait();
                }, 1000);
            }
        }, 500);
    },
    ////esto para el detalle se deslice abajo para los datos para todos los que son computadoras y moviles
    ScrollTopAnimate: ((nombre) => {
        try {
            if (!$(nombre).length) return;
            $("html").animate({
                scrollTop: $(nombre).offset().top,
            }, 1000);
        }
        catch (e) {
            console.error(`No se reconoce el: ${nombre}`, e);
        }
    }),

    TabCambiarPage: ((tab) => {
        $("html").animate({
            scrollTop: $("header").offset().top,
        }, 1000, function () {
            try {
                $(`${tab}`).click();
            }
            catch (e) {
                console.error(`No se reconoce el: ${tab}`, e);
            }
        });
    }),

    TryCatchResetValidator: ((nombre) => {
        try {
            $(nombre).dxValidator(`reset`);
        }
        catch (e) {
            console.error(`Colocar Requerido en: ${nombre}`, e);
        }
    }),
    FormatStringNumber: ((e) => {
        e = e.replaceAll(" ", "");
        let x = parseFloat(e);
        if (`${x}` == e) {
            return x;
        }
        else {
            return e;
        }
    }),

    SetSelectBoxIndex: async function (nombre, index) {
        try {
            if (!index) index = 0;
            let obj = $(`${nombre}`).dxSelectBox(`instance`);
            if (!obj._dataSource.isLoaded()) await obj._dataSource.load();

            let getIndex = obj._getSelectedIndex();
            if (getIndex != index) {
                let step = index;
                //getIndex = getIndex >= 0 ? getIndex : 0;
                if (getIndex > index) {
                    step = index - getIndex;
                }
                else if (getIndex > 0) {
                    step = index - getIndex;
                }
                else if (getIndex < 0) {
                    step++;
                }
                obj._setNextItem(step);
            }
        }
        catch (e) {
            console.error(`No se Pudo Encontrar el Valor del SelectBox: ${nombre}`, e);
        }
    },
    ////esto es para utilizar los ajax para cargar los datos
    SetDataCustomStore: ((set) => {
        if (!set.dataSource) set.dataSource = [];
        if (!set.key) set.key = "id";
        let obj = {};
        obj.key = set.key;
        if (typeof obj.load == "function") obj.load = set.load;
        else {
            obj.load = ((e) => {
                let d = $.Deferred(), data;
                if (!set.data) data = {};
                else if (typeof set.data == `function`) data = set.data();
                else if (typeof set.data == `object`) data = set.data;
                if (typeof set.url == "function") set.url = set.url();
                if (set.url && data) {
                    //Colocar esto en DataGrid para que funcione el skip y take     remoteOperations: true,
                    let query = {};
                    [
                        "skip",
                        "take",
                        "requireTotalCount",
                        "requireGroupCount",
                        "sort",
                        "filter",
                        "totalSummary",
                        "group",
                        "groupSummary"
                    ].forEach((x) => {
                        if (![undefined, null, ""].includes(e[x])) query[x] = e[x];
                    });

                    if (!query.sort && !query.group) query.sort = [{ selector: set.key, desc: Page.IDNumerico }];

                    data.filtro = JSON.stringify(query);

                    $.ajax({
                        url: set.url,
                        headers: General.Headers(),
                        method: `GET`,
                        data: data,
                        dataType: `json`,
                        success: ((result) => {
                            //if (set.dataSource.length) result.data.data = set.dataSource.concat(result.data.data);
                            d.resolve(result.data);
                        }),
                        error: (() => {
                            d.reject(`Error al Cargar Datos`);
                        }),
                    });
                }
                else {
                    setTimeout(function () {
                        d.resolve(set.dataSource);
                    }, 3000);
                }
                return d.promise();
            });
        }

        if (typeof set.byKey == "function") obj.byKey = set.byKey;
        else {
            obj.byKey = ((key, option) => {
                var d = new $.Deferred();
                if (typeof key != "object") {
                    let data;
                    if (!set.data) data = {};
                    else if (typeof set.data == `object`) data = set.data;
                    else if (typeof set.data == `function`) data = set.data();
                    let query = {
                        skip: 0,
                        take: 1,
                        filter: [set.key, "=", key],
                    };
                    data.filtro = JSON.stringify(query);

                    if (set.url && data) {
                        $.ajax({
                            url: set.url,
                            method: `GET`,
                            data: data,
                            //headers: General.Headers(),
                            mode: 'cors',
                            dataType: `json`,
                            success: ((result) => {
                                if (result.Result.data.length) d.resolve(result.Result.data[0]);
                                else d.resolve(key);
                            }),
                        });
                    }
                    else d.resolve(key);
                }
                else d.resolve(key);

                return d.promise();
            });
        }
        return new DevExpress.data.CustomStore(obj);
    }),
    SetDataSourceDataGrid: ((obj) => {
        //return Page.SetDataCustomStore(obj);
        let data = Page.SetDataCustomStore(obj);
        return new DevExpress.data.DataSource({
            store: data,
        });
    }),
    AbrirFormularioUrl: ((url = null, target = `_blank`) => {
        if (url) {
            window.open(`${url}`, target);
        }
        else {
            window.location.href = `${General.UrlBase()}/Pendientes`;
        }
    }),

    DescargarDocumento: ((url) => {
        window.location = `${url}`;
    }),
    //Clase para los botones en los formulario
    BotonOperacion: ((botones, operacion) => {
        let data = $(`${botones}`).children();
        for (let i = 0; i < data.length; i++) {
            let id = data[i].id;
            if (operacion == `ocultar`) {
                $(`#${id}`).hide();
            }            
        }
        if (operacion == `ocultar`) {
            $(`${botones}`).hide();
        }
    }),

    TodoBotonesOperacion: ((operacion) => {
        let data = $(`#pnlAcciones`).children().children();
        for (let i = 0; i < data.length; i++) {
            Page.BotonOperacion(`#${data[i].id}`, operacion);
        }
    }),
    InitBotonesCRUD: (() => {
        $("#btnNuevo").hide();
        $("#btnGuardar").hide();
        $("#btnCancelar").hide();
        $("#btnEliminar").hide();
        $("#btnImprimir").hide();

        $("#btnNuevo").dxButton({
            text: "Nuevo",
            type: "success",
            icon:"file",
            onClick: function () {
                let tab = Page.GetTabActive();
                if (tab == "tabDatosLi") {
                    Page.NuevoRegistro();
                }
            }
        });
        $("#btnGuardar").dxButton({
            text: "Guardar",
            type: "success",
            icon:"save",
            onClick: function () {
                let tab = Page.GetTabActive();
                if (tab == "tabDatosLi") {
                    Page.GuardarRegistro();
                }
            }
        });
        //$("#btnCancelar").dxButton({
        //    text: "Cancelar",
        //    type: "success",
        //    icon:"clear",
        //    //width: 120,
        //    onClick: function () {
        //        DevExpress.ui.dialog.confirm("¿Seguro que desea Cancelar?", "Cancelar").done((result) => {
        //            if (result) {
        //                let tab = Page.GetTabActive();
        //                if (tab == "tabDatosLi") {
        //                    Page.CancelarRegistro();
        //                }
        //            }
        //        });
        //    }
        //});

        //$("#btnEliminar").dxButton({
        //    text: "Eliminar",
        //    type: "success",
        //    //width: 120,
        //    icon:"trash",
        //    onClick: function () {
        //        DevExpress.ui.dialog.confirm("¿Seguro que desea Eliminar?", "Cancelar").done((result) => {
        //            if (result) {
        //                let tab = Page.GetTabActive();
        //                if (tab == "tabDatosLi") {
        //                    Page.CancelarRegistro();
        //                }
        //            }
        //        });
        //    }
        //});

        $("#btnImprimir").dxButton({
            text: "Imprimir",
            type: "success",
            icon:'print',
            onClick: function () {
                if (Page.data.codigo) Page.AbrirFormularioUrl(`${General.UrlBase()}/Report/ReporteContrato.aspx?codigo=${Page.data.codigo}`);
                else General.Notify("Seleccione un Registro por favor", "error");
            }
        });       
    }),
    ////esto es para el cliente
    InitBotonesPredeterminados: (() => {
        Page.InitBotonesCRUD();
        $("#btnBuscar").dxButton({
            text: "Buscar",
            type: "success",
            icon:"search",
            //width: 120,
            onClick: function () {
                Page.Buscar();
            }
        });
        $("#btnLimpiar").dxButton({
            text: "Limpiar",
            type: "success",
            icon: "clear",
            //width: 120,
            onClick: function () {
                Page.LimpiarControlesBusqueda();
            }
        });       
        ////Click Para los Tab

        $(`#tabBuscar`).click(function () {
            Page.tabBusqueda();
        });

        $(`#tabDatos`).click(function () {
            Page.tabDatos();
        });
    }),
    ////El Page.InitBotones puede ser reemplazado en el cliente esta function esta por defecto para formularios simples
    InitBotones: (() => {
        Page.InitBotonesPredeterminados();
    }),
    MostrarBotones: (async (boton) => {
        ///B=Busqueda, D=Datos y Transacciones, N=Ninguno
        Page.TodoBotonesOperacion(`ocultar`);      
        $(document).ready(function () {
            let codigo = $("#hidRegistroSeleccionado").text();
            let tab = Page.GetTabActive();
            if (boton == "B") {
                $("#divBotonesBuscar").show();
                $("#btnBuscar").show();
                $("#btnLimpiar").show();
            }
            else if (boton == "D") {
                if ($(`#divBotonesDatos`).length) {                   
                        if ($("#divBotonesDatos").length) $("#divBotonesDatos").show();
                        if ($("#btnNuevo").length) $("#btnNuevo").show();
                        if ($("#btnGuardar").length) $("#btnGuardar").show();
                        if ($("#btnCancelar").length) $("#btnCancelar").show();
                        if (![`0`].includes(codigo)) {
                            if ($("#btnEliminar").length) $("#btnEliminar").show();
                            if ($("#btnImprimir").length) $("#btnImprimir").show();
                        }                                                                                    
                }
            }
            Page.VerificarBotones(tab);
        });
    }),
    AnimacionPanel: ((div, tiempo) => {
        if ($(div).length) {
            Page.LoadPanel = $("#loadpanel").dxLoadPanel({
                shadingColor: "rgba(0,0,0,0.4)",
                position: { of: div },
                visible: false,
                showIndicator: true,
                showPane: true,
                shading: true,
                closeOnOutsideClick: false,
                onShown: function (e) {
                    if ($(div).is(":visible")) {
                        if (tiempo) {
                            setTimeout(function () {
                                e.component.hide();
                            }, 500);
                        }
                    } else {
                        e.component.hide();
                    }
                },
            }).dxLoadPanel("instance");
        }
    }),
};