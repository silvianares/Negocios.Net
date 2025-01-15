using System;
using System.Collections.Generic;

namespace WebAPINegocios.Models;

public partial class Tipo
{
    public int IdTipo { get; set; }

    public string DescripcionTipo { get; set; } = null!;

    public virtual ICollection<Negocio> Negocios { get; set; } = new List<Negocio>();
}
