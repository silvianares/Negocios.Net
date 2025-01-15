using System;
using System.Collections.Generic;

namespace WebAPINegocios.Models;

public partial class Negocio
{
    public int IdNegocio { get; set; }

    public string Nombre { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal Lat { get; set; }

    public decimal Lng { get; set; }

    public int TiposIdTipo { get; set; }

    public virtual Tipo TiposIdTipoNavigation { get; set; } = null!;
}
