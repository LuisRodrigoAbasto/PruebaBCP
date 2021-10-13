using Abasto.Libreria.DevExtreme;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Abasto.Negocio.Api.Controllers
{
    [RoutePrefix("api/contrato")]
    public class ContratoController : AbastoApiController
    {
        // GET: api/Contrato
       [HttpGet]
        [Route("Search")]
        public dynamic Get(string filtro="")
        {
            using (Negocio cn = new Negocio())
            {
                var lista = cn.BCPContrado.PaginateAsync(filtro);
                return lista;
            }
        }

        // GET: api/Contrato/5
        [Route("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Contrato
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Contrato/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Contrato/5
        public void Delete(int id)
        {
        }
    }
}
