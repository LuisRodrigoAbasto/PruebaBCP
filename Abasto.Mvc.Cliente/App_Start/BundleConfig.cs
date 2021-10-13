using System.Web;
using System.Web.Optimization;

namespace Abasto.Mvc.Cliente
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jscookie").Include(
                        "~/Scripts/js-cookie/js.cookie.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/dx").Include(
                        "~/Scripts/jszip.js",
                        "~/Scripts/dx.all.js",
                        "~/Scripts/devextreme-localization/dx.messages.es.js"
                        //, "~/Scripts/dx.viz.js"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/exportardatagrid").Include(
    "~/Scripts/libs/exceljs.min.js",
    "~/Scripts/libs/FileSaver.min.js",
     "~/Scripts/libs/polyfill.min.js",
     "~/Scripts/libs/jspdf.umd.min.js",
     "~/Scripts/libs/jspdf.plugin.autotable.min.js"
     ));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.            
            bundles.Add(new ScriptBundle("~/bundles/shared").Include("~/ScriptsView/Shared/Page.js", "~/ScriptsView/Shared/General.js"));
            bundles.Add(new ScriptBundle("~/bundles/contrato").Include("~/ScriptsView/Contrato/index.js"));
            bundles.Add(new ScriptBundle("~/bundles/contrato").Include("~/ScriptsView/Contrato/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/d3").Include(
                 "~/Scripts/d3.min.js"
                 , "~/Scripts/d3-funnel.min.js"));


            bundles.Add(new ScriptBundle("~/bundles/globalize").Include(
                "~/Scripts/cldr.js",
                "~/Scripts/cldr/*.js",
                "~/Scripts/globalize.js",
                        "~/Scripts/globalize/message.js",
                        "~/Scripts/globalize/number.js",
                        "~/Scripts/globalize/currency.js",
                        "~/Scripts/globalize/date.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate.js"
                        //"~/Scripts/jquery.validate.globalize.js",
                        //"~/Scripts/jquery.validate.unobtrusive.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/dx.estilo.css",
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/inicio").Include(
                         "~/ScriptsView/Home/index.js"
                        ));
        }
    }
}
