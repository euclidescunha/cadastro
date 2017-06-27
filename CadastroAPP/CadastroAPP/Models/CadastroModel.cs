namespace CadastroAPP.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CadastroModel : DbContext
    {
        public CadastroModel()
            : base("name=CadastroModel")
        {
        }

        public virtual DbSet<Cargo> Cargo { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Funcionario> Funcionario { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cargo>()
                .Property(e => e.Cargo1)
                .IsUnicode(false);

            modelBuilder.Entity<Cargo>()
                .HasMany(e => e.Funcionario)
                .WithRequired(e => e.Cargo)
                .HasForeignKey(e => e.ID_Cargo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Empresa>()
                .Property(e => e.Nome)
                .IsFixedLength();

            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.Funcionario)
                .WithRequired(e => e.Empresa)
                .HasForeignKey(e => e.ID_Empresa)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Funcionario>()
                .Property(e => e.Nome)
                .IsUnicode(false);

            modelBuilder.Entity<Funcionario>()
                .Property(e => e.Identidade)
                .IsUnicode(false);

            modelBuilder.Entity<Funcionario>()
                .Property(e => e.Cpf)
                .IsUnicode(false);

            modelBuilder.Entity<Funcionario>()
                .Property(e => e.Passaporte)
                .IsUnicode(false);
        }
    }
}
