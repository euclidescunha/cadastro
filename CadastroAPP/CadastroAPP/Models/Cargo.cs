namespace CadastroAPP.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Cargo")]
    public partial class Cargo
    {
        public Cargo()
        {
            Funcionario = new HashSet<Funcionario>();
        }

        public int ID { get; set; }

        [Column("Cargo")]
        [Required]
        [StringLength(150)]
        public string Cargo1 { get; set; }

        public virtual ICollection<Funcionario> Funcionario { get; set; }
    }
}
