using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPINegocios.Models;

public partial class ProyectoNegociosContext : DbContext
{
    public ProyectoNegociosContext()
    {
    }

    public ProyectoNegociosContext(DbContextOptions<ProyectoNegociosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Negocio> Negocios { get; set; }

    public virtual DbSet<Tipo> Tipos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=ProyectoNegocios;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Negocio>(entity =>
        {
            entity.HasKey(e => e.IdNegocio).HasName("PK__Negocios__750B6A55CA63160D");

            entity.Property(e => e.Descripcion).HasMaxLength(100);
            entity.Property(e => e.Direccion).HasMaxLength(75);
            entity.Property(e => e.Lat).HasColumnType("decimal(12, 9)");
            entity.Property(e => e.Lng).HasColumnType("decimal(12, 9)");
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.TiposIdTipo).HasColumnName("Tipos_IdTipo");

            entity.HasOne(d => d.TiposIdTipoNavigation).WithMany(p => p.Negocios)
                .HasForeignKey(d => d.TiposIdTipo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Negocios_Tipos_IdTipo");
        });

        modelBuilder.Entity<Tipo>(entity =>
        {
            entity.HasKey(e => e.IdTipo).HasName("PK__Tipos__9E3A29A5974AD8FB");

            entity.Property(e => e.DescripcionTipo).HasMaxLength(50);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Password).HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
