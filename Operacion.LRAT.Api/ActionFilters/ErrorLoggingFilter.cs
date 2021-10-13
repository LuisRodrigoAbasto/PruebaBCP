using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

public class ErrorLoggingFilter : ExceptionFilterAttribute
{
    public override void OnException(HttpActionExecutedContext context)
    {
        try
        {        
        string Origen = string.Format("Controller [{0}], Action [{1}], Url [{2}]",
             context.ActionContext.ControllerContext.ControllerDescriptor.ControllerType.FullName
            , context.ActionContext.ActionDescriptor.ActionName
            , context.ActionContext.Request.RequestUri);
        //Log.Guardar(context.Exception,context.ActionContext.RequestContext.Principal.Identity.Name ?? ""
        //    , Origen);
        }
        catch (Exception)
        {
        }

    }
}