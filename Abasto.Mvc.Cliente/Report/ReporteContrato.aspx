<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteContrato.aspx.cs" Inherits="Abasto.Mvc.Cliente.Report.ReporteContrato" Async="true" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Contrato</title>
     <style>
        html,body,form,#div1 {
            height: 100%; 
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="div1">
            <asp:ScriptManager ID="smMain" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
            <rsweb:ReportViewer ID="rvMain" runat="server" Height="100%" Width="100%">
                <LocalReport ReportPath="Report\Files\LRATContrato.rdlc">
                    <DataSources>
                        <rsweb:ReportDataSource DataSourceId="dsMain" Name="dsMain" />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>
            <asp:SqlDataSource ID="dsMain" runat="server"
                ConnectionString="<%$ ConnectionStrings:ContextNegocio %>"
                SelectCommand="ReporteContrato" SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:ControlParameter DefaultValue="0" Name="codigo" Type="String" ControlID="hidCodigo" PropertyName="Value" />
                </SelectParameters>
            </asp:SqlDataSource>
            <asp:HiddenField runat="server" ID="hidCodigo" Value="0" />
        </div>
    </form>
</body>
</html>
