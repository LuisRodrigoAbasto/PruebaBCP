using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.UI;

namespace Abasto.Mvc.Cliente.Report
{
    public partial class ReporteContrato : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                this.CargarReporte();
            }
        }
        private Task CargarReporte()
        {
            try
            {
                this.hidCodigo.Value = Request["codigo"].ToString();
                List<ReportParameter> objParamsList = new List<ReportParameter>();
                objParamsList.Add(new ReportParameter("codigo", this.hidCodigo.Value));
                this.rvMain.LocalReport.SetParameters(objParamsList);
                this.rvMain.DataBind();
                this.rvMain.LocalReport.Refresh();
            }
            catch
            {
                this.rvMain.Reset();
            }
            return Task.CompletedTask;
        }

    }
}