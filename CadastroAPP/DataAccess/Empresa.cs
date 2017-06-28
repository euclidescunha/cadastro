namespace DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Empresa")]
    public partial class Empresa
    {
        public Empresa()
        {
            Funcionario = new HashSet<Funcionario>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(10)]
        public string Nome { get; set; }

        public DateTime? Data_inclusao { get; set; }

        public virtual ICollection<Funcionario> Funcionario { get; set; }
    }
}
