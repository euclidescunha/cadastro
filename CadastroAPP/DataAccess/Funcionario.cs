namespace DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Funcionario")]
    public partial class Funcionario
    {
        public int ID { get; set; }

        [Required]
        [StringLength(120)]
        public string Nome { get; set; }

        public int ID_Cargo { get; set; }

        [Column(TypeName = "date")]
        public DateTime Data_Nascimento { get; set; }

        [Column(TypeName = "date")]
        public DateTime Data_Admissao { get; set; }

        [Required]
        [StringLength(10)]
        public string Identidade { get; set; }

        [Required]
        [StringLength(11)]
        public string Cpf { get; set; }

        [Required]
        [StringLength(20)]
        public string Passaporte { get; set; }

        public int ID_Empresa { get; set; }

        public DateTime? Data_inclusao { get; set; }

        public virtual Cargo Cargo { get; set; }

        public virtual Empresa Empresa { get; set; }
    }
}
