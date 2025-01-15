using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPINegocios.DTOs;
using WebAPINegocios.Models;

namespace WebAPINegocios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposController : ControllerBase
    {
        private readonly ProyectoNegociosContext context;

        public TiposController(ProyectoNegociosContext negociosContext)
        {
            this.context = negociosContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetTipos()
        {
            var tipos = await (from x in context.Tipos
                               select new DTOTipo()
                               {
                                   IdTipo = x.IdTipo,
                                   DescripcionTipo = x.DescripcionTipo
                               }).ToListAsync();

            return Ok(tipos);
        }


    }
}
