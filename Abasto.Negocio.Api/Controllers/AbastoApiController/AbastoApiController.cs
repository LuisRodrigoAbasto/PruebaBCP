using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Abasto.Negocio.Api.Controllers
{
    public class AbastoApiController:ApiController
    {
        #region response        
        [NonAction]
        public IHttpActionResult ResponseOk<T>(T data,string mensaje="OK")
        {
            var obj = new
            {
                data,
                mensaje,
                tipo="success",
            };
            return Ok(obj);
        }
        [NonAction]
        public IHttpActionResult ResponseEx(string mensaje = "Error")
        {
            var obj =new { mensaje };
            return ResponseMessage(Request.CreateResponse(HttpStatusCode.InternalServerError, obj));
        }
        #endregion
    }
}