using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Routing;

namespace Operacion.LRAT.Api.ActionFilters
{
    public class UserActivityFilter : ActionFilterAttribute
    {
        public override async Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            //Log(actionExecutedContext);
            await base.OnActionExecutedAsync(actionExecutedContext, cancellationToken);
        }       
    }
}