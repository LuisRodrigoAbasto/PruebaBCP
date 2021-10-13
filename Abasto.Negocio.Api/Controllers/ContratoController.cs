using Abasto.Libreria.DevExtreme;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Abasto.Negocio.Api.Controllers
{
    [RoutePrefix("api/contrato")]
    public class ContratoController : AbastoApiController
    {
        // GET: api/Contrato
        [HttpGet]
        [Route("search")]
        public async Task<dynamic> Get(string filtro="")
        {
            using (Negocio cn = new Negocio())
            {
                var lista = await cn.BCPContrado.PaginateAsync(filtro);
                return lista;
            }
        }

        // GET: api/Contrato/5
        [HttpGet]
        [Route("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
