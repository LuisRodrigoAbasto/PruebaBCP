namespace Abasto.Negocio.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Iniciando : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BCPContrado",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CodigoContrato = c.String(maxLength: 10, fixedLength: true, unicode: false),
                        Paterno = c.String(maxLength: 30, unicode: false),
                        Materno = c.String(maxLength: 30, unicode: false),
                        Nombres = c.String(maxLength: 30, unicode: false),
                        Testimonio = c.String(maxLength: 50, unicode: false),
                        FechaInicial = c.DateTime(nullable: false, storeType: "date"),
                        FechaFinal = c.DateTime(nullable: false, storeType: "date"),
                        FechaTestimonio = c.DateTime(nullable: false, storeType: "date"),
                        NumeroNotaria = c.Int(nullable: false),
                        PaternoProveedor = c.String(maxLength: 30, unicode: false),
                        MaternoProveedor = c.String(maxLength: 30, unicode: false),
                        NombresProveedor = c.String(maxLength: 30, unicode: false),
                        DocumentoProveedor = c.String(maxLength: 20, unicode: false),
                        Domicilio = c.String(maxLength: 500, unicode: false),
                        Direccion = c.String(maxLength: 500, unicode: false),
                        Ciudad = c.String(maxLength: 30, unicode: false),
                        Superficie = c.Int(nullable: false),
                        NumeroDireccion = c.String(maxLength: 10, unicode: false),
                        Importe = c.Decimal(nullable: false, precision: 15, scale: 2),
                        Literal = c.String(maxLength: 200, unicode: false),
                        Cuenta = c.String(maxLength: 20, unicode: false),
                        NumeroMeses = c.Int(nullable: false),
                        FechaInicialArrendamiento = c.DateTime(nullable: false, storeType: "date"),
                        FechaFinalArrendamiento = c.DateTime(nullable: false, storeType: "date"),
                        FechaTenor = c.DateTime(nullable: false, storeType: "date"),
                        Mes = c.String(maxLength: 30, unicode: false),
                        Anio = c.String(maxLength: 4, unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Seguridad",
                c => new
                    {
                        IdSeguridad = c.Int(nullable: false, identity: true),
                        Usuario = c.String(maxLength: 50, unicode: false),
                        NombreUsuario = c.String(maxLength: 100, unicode: false),
                        Contrasena = c.String(maxLength: 200, unicode: false),
                        Rol = c.String(maxLength: 15, unicode: false),
                    })
                .PrimaryKey(t => t.IdSeguridad);                

            Sql(@"
                insert into dbo.BCPContrado VALUES('3','Leon','Mamani','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('4','Cuico','Vargar','Juan Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('5','Leon','Colque','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('6','Mamani','Ventura','Juan','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('7','Torrico','Ventura','Juan Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('8','Leon','Torrez','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('9','Leon','Ventura','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('10','Leon','Ventura','Carlos','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')        
                insert into dbo.BCPContrado VALUES('11','Leon','Mamani','Agustin','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('12','Cuico','Vargar','Mariela','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('13','Leon','Colque','Moreira','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('14','Leon','Colque','Roberta','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('15','Leon','Colque','Susana','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('16','Mamani','Ventura','Lucy','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('17','Torrico','Ventura','Grabriela','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('18','Leon','Torrez','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('19','Leon','Ventura','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('20','Leon','Ventura','Carlos','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('23','Leon','Mamani','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('24','Cuico','Vargar','Juan Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('25','Leon','Colque','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('26','Mamani','Ventura','Juan','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('27','Torrico','Ventura','Juan Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('28','Leon','Torrez','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('29','Leon','Ventura','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('30','Leon','Ventura','Carlos','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')        
                insert into dbo.BCPContrado VALUES('31','Leon','Mamani','Agustin','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('32','Cuico','Vargar','Mariela','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('33','Leon','Colque','Moreira','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('34','Leon','Colque','Roberta','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('35','Leon','Colque','Susana','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('36','Mamani','Ventura','Lucy','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('37','Torrico','Ventura','Grabriela','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('38','Leon','Torrez','Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('39','Leon','Ventura','Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
                insert into dbo.BCPContrado VALUES('40','Leon','Ventura','Carlos','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
            ");

            Sql(@"
               create proc ReporteContrato
                @codigo bigint
                as
                begin
                select concat ('<b>PRIMERA PARTES.-</b>Constituyen Partes integrantes del presente contrato: <br>',
                '<b>1.1</b> El          ',
                ' , con matricula del registro de Comercio de Bolivia N 13'
                ,'Debidamente Representado por ',con.Nombres,' ',con.Paterno,' ',con.Materno
                ,'en Meritos al testimonio de poder N ',con.NumeroNotaria
                ,'del Distrito Judicial de la Paz a cargo de Patricia Rivera Sempertegui que en adelante se denominara como el Banco<br>'
                ,'<b>1.2</b> ',con.NombresProveedor,' ',con.PaternoProveedor,' ',con.MaternoProveedor
                ,'con cedula de Identidad o Matricula de Comercio de Bolivia ',con.DocumentoProveedor
                ,' Presentando el Numero de Identificacion Tibutaria NIT , con domicilio en ',con.Domicilio
				,', a quien en adelante se denominara el ARRENDADOR. <br><br>'
				,'<b>SEGUNDA ANTECEDENTES.-</b>'
				,'Por su parte, el ARRENDADOR declara ser una persona natural o juridica legalmente consituida, propietario de una bien inmueble ubicado en ',con.Direccion
				,'de la Ciudad de ',con.Ciudad,', con una superficie de ',con.Superficie,', debidamente registro en las oficinas de derechos Reales bajo la matricula computarizada'
                ,'N ',con.NumeroDireccion,'.'
				,'El ARRENDADOR declara que cumple con todas las exigencias impuestas por la legislacion vigente, incluyendo las de orden municipal y tributario.'
				,''
                ,'') as documento from BCPContrado as con where con.Id=@codigo
                end                  
                ");

        }
        
        public override void Down()
        {
            Sql("drop proc ReporteContrato");
            DropTable("dbo.Seguridad");
            DropTable("dbo.BCPContrado");
        }
    }
}
