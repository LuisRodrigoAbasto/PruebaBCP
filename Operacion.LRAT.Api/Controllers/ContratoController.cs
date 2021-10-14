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
        public async Task<dynamic> Search(DateTime? fecha,string representante,string proveedor,string ciudad,string cuenta,string filtro="")
        {
            ciudad = string.IsNullOrEmpty(ciudad) ? "*" : ciudad.ToLower();
            cuenta = string.IsNullOrEmpty(cuenta) ? "*" : cuenta.ToLower();
            proveedor = string.IsNullOrEmpty(proveedor) ? "*" : proveedor.ToLower();
            representante = string.IsNullOrEmpty(representante) ? "*" : representante.ToLower();
            using (Negocio cn = new Negocio())
            {
                var lista = await (from x in cn.BCPContrado
                                   where (x.FechaTenor == fecha || null == fecha)
                                   && (x.Ciudad == ciudad || "*" == ciudad)
                                   && (x.Cuenta == cuenta || "*" == cuenta)
                                   select new
                                   {
                                       x.CodigoContrato,
                                       x.Ciudad,
                                       representante = x.Nombres + " " + x.Paterno + " " + x.Materno,
                                       proveedor = x.NombresProveedor + " " + x.PaternoProveedor + " " + x.MaternoProveedor,
                                       x.FechaInicial,
                                       x.FechaFinal,
                                       x.Cuenta,
                                       x.Direccion,
                                       x.Domicilio,
                                       x.Importe,
                                   }).Where(x =>
                                   (proveedor == "*" ? true : x.proveedor.ToLower().Contains(proveedor)
                                   && (representante == "*" ? true : x.representante.ToLower().Contains(representante))
                                   )).PaginateAsync(filtro);
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
