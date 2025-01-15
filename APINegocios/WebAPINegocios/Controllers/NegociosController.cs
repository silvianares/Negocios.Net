using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPINegocios.DTOs;
using WebAPINegocios.Models;

namespace WebAPINegocios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NegociosController : ControllerBase
    {
        private readonly ProyectoNegociosContext context;

        public NegociosController(ProyectoNegociosContext ProyectonegociosContext)
        {
            this.context = ProyectonegociosContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetNegocios()
        {
            var negocios = await (from x in context.Negocios
                                  select new DTONegocio()
                                  {
                                      IdNegocio = x.IdNegocio,
                                      Nombre = x.Nombre,
                                      Direccion = x.Direccion,
                                      Descripcion = x.Descripcion,
                                      Lat = x.Lat,
                                      Lng = x.Lng,
                                      TiposIdTipo = x.TiposIdTipo,
                                      TiposDescripcion = x.TiposIdTipoNavigation.DescripcionTipo
                                  }).ToListAsync();

            return Ok(negocios);
        }

        [HttpPost]
        public async Task<ActionResult> PostNegocios(DTONegocio negocio)
        {
            var newNegocio = new Negocio()
            {
                Nombre = negocio.Nombre,
                Descripcion = negocio.Descripcion,
                Direccion = negocio.Direccion,
                Lat = negocio.Lat,
                Lng = negocio.Lng,
                TiposIdTipo = negocio.TiposIdTipo
            };

            await context.Negocios.AddAsync(newNegocio);
            await context.SaveChangesAsync();

            return Created("Negocio", new { negocio = newNegocio });
        }

        [HttpPut]
        public async Task<ActionResult> PutNegocios(DTONegocio negocio)
        {
            var negocioUpdate = await context.Negocios.FindAsync(negocio.IdNegocio);
            if (negocioUpdate == null)
            {
                return NotFound();
            }

            negocioUpdate.Nombre = negocio.Nombre;
            negocioUpdate.Descripcion = negocio.Descripcion;
            negocioUpdate.Direccion = negocio.Direccion;
            negocioUpdate.Lat = negocio.Lat;
            negocioUpdate.Lng = negocio.Lng;
            negocioUpdate.TiposIdTipo = negocio.TiposIdTipo;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNegocios(int id)
        {
            var negocio = await context.Negocios.FindAsync(id);
            if (negocio == null)
            {
                return NotFound();
            }

            context.Negocios.Remove(negocio);
            await context.SaveChangesAsync();

            return Ok();
        }

        ///////////////////////////////////////////////
        /// Get para app Ionic
        /// 
        // GET: api/NegociosIonic/radio
        [HttpGet("radio")]
        public async Task<ActionResult> GetNegociosRadio(decimal lat, decimal lng, int tipo, int radio)
        {
            try
            {
                // Paso 1: Filtrar usando bounding box en la base de datos
                var negocios = await (from x in context.Negocios
                                      where x.TiposIdTipo == tipo
                                      && x.Lat >= lat - (radio / 111.0m)
                                      && x.Lat <= lat + (radio / 111.0m)
                                      && x.Lng >= lng - (radio / (111.0m * (decimal)Math.Cos((double)lat * Math.PI / 180.0)))
                                      && x.Lng <= lng + (radio / (111.0m * (decimal)Math.Cos((double)lat * Math.PI / 180.0)))
                                      select new DTONegocioIonic
                                      {
                                          Nombre = x.Nombre,
                                          Direccion = x.Direccion,
                                          Descripcion = x.Descripcion,
                                          Lat = x.Lat,
                                          Lng = x.Lng
                                      }).ToListAsync();

                // Paso 2: Calcular la distancia precisa en memoria
                var negociosConDistancia = negocios
                    .Select(x => new DTONegocioIonic
                    {
                        Nombre = x.Nombre,
                        Direccion = x.Direccion,
                        Descripcion = x.Descripcion,
                        Lat = x.Lat,
                        Lng = x.Lng,
                        Distancia = CalcularDistancia((double)lat, (double)lng, (double)x.Lat, (double)x.Lng)
                    })
                    .Where(x => x.Distancia < radio)
                    .ToList();

                return Ok(negociosConDistancia);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // Método para calcular la distancia entre dos coordenadas (en kilómetros)
        private double CalcularDistancia(double lat1, double lng1, double lat2, double lng2)
        {
            const double radioTierra = 6371; // Radio de la Tierra en kilómetros
            double dLat = GradosARadianes(lat2 - lat1);
            double dLng = GradosARadianes(lng2 - lng1);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(GradosARadianes(lat1)) * Math.Cos(GradosARadianes(lat2)) *
                       Math.Sin(dLng / 2) * Math.Sin(dLng / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return radioTierra * c;
        }

        // Método auxiliar para convertir grados a radianes
        private double GradosARadianes(double grados)
        {
            return grados * Math.PI / 180.0;
        }


    }
}
