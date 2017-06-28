using Messages.Cadastro;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;

namespace CadastroAPP.Controllers
{

    [Authorize]
    [RoutePrefix("api/App")]
    public class AppController : ApiController
    {

        private readonly ICadastroEntityService _cadastroEntityService;

        public AppController(ICadastroEntityService cadastroEntityService)
        {
            _cadastroEntityService = cadastroEntityService;

        }
        
        [HttpPost]        
        [Route("Inserir/Funcionario")]
        public IHttpActionResult InserirFuncionario(InserirFuncionarioRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            InserirFuncionarioResponse result;
            try
            {
                result = _cadastroEntityService.InserirFuncionario(request);
            }
            catch (Exception)
            {
                return BadRequest();               
            }

            return Ok(JsonFormat(result));
        }

        #region Helpers

        private string JsonFormat(Object response)
        {

            var postData = JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.None,
                           new JsonSerializerSettings
                           {
                               NullValueHandling = NullValueHandling.Ignore,
                               DefaultValueHandling = DefaultValueHandling.Ignore
                           }).ToLower();

            return postData; 
        }
    
        #endregion        
        

    }
}
