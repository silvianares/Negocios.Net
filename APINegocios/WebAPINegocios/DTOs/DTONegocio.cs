namespace WebAPINegocios.DTOs
{
    public class DTONegocio
    {
        public int IdNegocio { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Descripcion { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public int TiposIdTipo { get; set; }
        public string? TiposDescripcion { get; set; }
    }
}
