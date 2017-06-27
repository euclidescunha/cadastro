using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;

namespace CadastroAPP.Controllers
{

    [Authorize]
    [RoutePrefix("api/App")]
    public class AppController : ApiController
    {
        
        

    }
}
