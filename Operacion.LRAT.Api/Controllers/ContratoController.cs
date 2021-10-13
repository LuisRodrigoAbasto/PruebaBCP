using Abasto.Libreria.DevExtreme;
using Abasto.Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Operacion.LRAT.Api.Controllers
{
    [RoutePrefix("api/contrato")]
    public class ContratoController : AbastoApiController
    {
        // GET: api/Contrato
        [HttpGet]
        [Route("search")]
        public async Task<dynamic> Search(string filtro="")
        {
            using (Negocio cn = new Negocio())
            {
                var lista = await (from x in cn.BCPContrado
                                   select new
                                   {
                                       x.CodigoContrato,
                                       x.Ciudad,
                                       cliente = x.Nombres + " " + x.Paterno + " " + x.Materno,
                                       proveedor = x.NombresProveedor + " " + x.PaternoProveedor + " " + x.MaternoProveedor,
                                       x.FechaInicial,
                                       x.FechaFinal,
                                       x.Cuenta,
                                   }).PaginateAsync(filtro);
                return ResponseOk(lista);
            }
        }

        // GET: api/Contrato/5
        [HttpGet]
        [Route("{id}")]
        public dynamic Get(string id)
        {
            using (Negocio cn=new Negocio())
            {
                var obj = cn.BCPContrado.Where(x => x.CodigoContrato == id).FirstOrDefault();
                return ResponseOk(obj);
            }
        }
    }
}
