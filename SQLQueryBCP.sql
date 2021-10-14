--create Database BD_CONTRATOS_LRAT
create table BCPContrado(
CodigoContrato CHAR(10) primary key,
Paterno varchar(30),
Materno varchar(30),
Nombres varchar(30),
Testimonio varchar(50),
FechaInicial date,
FechaFinal date,
FechaTestimonio date,
NumeroNotaria int,
PaternoProveedor varchar(30),
MaternoProveedor varchar(30),
NombresProveedor varchar(30),
DocumentoProveedor varchar(20),
Domicilio varchar(500),
Direccion varchar(500),
Ciudad varchar(30),
Superficie int,
NumeroDireccion varchar(10),
Importe decimal(15,2),
Literal varchar(200),
--FechaFinalArrendamiento date,
Cuenta varchar(20),
NumeroMeses int,
FechaInicialArrendamiento date,
FechaFinalArrendamiento date,
FechaTenor date,
Mes varchar(30),
Anio varchar(4),
);
go

create table Seguridad(
IdSeguridad int primary key identity(1,1),
Usuario varchar(50),
NombreUsuario varchar(100),
Contrasena varchar(200),
Rol varchar(15));
go

alter proc ReporteContrato
@codigo varchar(20)
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
,'Presentando el Numero de Identificacion Tibutaria NIT '
,''
,'') as documento from BCPContrado as con where con.CodigoContrato=@codigo
end

exec ReporteContrato '1'
select *from BCPContrado
insert into dbo.BCPContrado VALUES('3','Leon','Ventura','Juan Carlos Marcelo','1','2021-10-03','2021-10-04','2021-10-03',1,'Quiroga','Fuentes','Marcelo','12','Montero obispo santistevan','B/Municipal','Santa Cruz',300,'12',10000,'Mil Bolivianos','102100000',12,'2021-10-03','2021-10-03','2021-10-03','Abril','2021')
