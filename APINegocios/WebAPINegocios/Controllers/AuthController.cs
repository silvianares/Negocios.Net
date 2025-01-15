using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPINegocios.DTOs;
using WebAPINegocios.Models;

namespace WebAPINegocios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ProyectoNegociosContext context;

        public AuthController(ProyectoNegociosContext context)
        {
            this.context = context;
        }

    


        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] DTOUsuario usuario)

        {
            var usuarioDB = await context.Usuarios.FirstOrDefaultAsync(x => x.Email == usuario.Email);
            Console.WriteLine($"UsuarioDB: {usuarioDB?.Email}");
            Console.WriteLine($"Password ingresada: {usuario.Password}");
            Console.WriteLine($"Password almacenada (hashed): {usuarioDB?.Password}");
            if (usuarioDB == null)
            {
                return Unauthorized();
            }

            if (usuarioDB.Password == usuario.Password)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }

        }

    }
}
