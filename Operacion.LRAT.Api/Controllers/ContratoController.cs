using Abasto.Libreria.DevExtreme;
using Abasto.Libreria.General;
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
                                       x.Id,
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
        public dynamic Get(long id)
        {
            using (Negocio cn=new Negocio())
            {
                var obj = cn.BCPContrado.Where(x => x.Id == id).FirstOrDefault();
                return ResponseOk(obj);
            }
        }
        [HttpPost]
        public dynamic Post(BCPContrado obj)
        {
            ContratoReplaceAll(obj);
            using (Negocio cn=new Negocio())
            {
                cn.BCPContrado.Add(obj);
                cn.SaveChanges();
            }
            return ResponseOk(obj.Id);
        }
        [HttpPut]
        public dynamic Put(BCPContrado obj)
        {
            ContratoReplaceAll(obj);
            using (Negocio cn=new Negocio())
            {
                cn.Entry(obj).State = System.Data.Entity.EntityState.Modified;
                cn.SaveChanges();
            }
            return ResponseOk(obj.Id);
        }
        [NonAction]
        private void ContratoReplaceAll(BCPContrado obj)
        {
            obj.CodigoContrato = obj.CodigoContrato.ReplaceAll("  ", " ");
            obj.Domicilio = obj.Domicilio.ReplaceAll("  ", " ");
            obj.Direccion = obj.Direccion.ReplaceAll("  ", " ");
            obj.Ciudad = obj.Ciudad.ReplaceAll("  ", " ");
            obj.Nombres = obj.Nombres.ReplaceAll("  ", " ");
            obj.Paterno = obj.Paterno.ReplaceAll("  ", " ");
            obj.Materno = obj.Materno.ReplaceAll("  ", " ");
            obj.NombresProveedor = obj.NombresProveedor.ReplaceAll("  ", " ");
            obj.PaternoProveedor = obj.PaternoProveedor.ReplaceAll("  ", " ");
            obj.MaternoProveedor = obj.MaternoProveedor.ReplaceAll("  ", " ");
        }
    }
}
