//Model de usuario
// export class UsuarioModel {
//   id: number;
//   nombre: string;
//   apellido: string;
//   correo: string;
//   rol: string;
//   edad: number;
//   altura: number;

//   objetivo_opt?: string;
//   objetivo_num?: string;
//   correo_v?: string;
//   contrasena?: string;
// }

export class UsuarioRegistroModel {

  constructor (
    public nombre: string | null,
    public apellidos: string | null,
    public correo: string | null,
    public edad: number | null,
    public altura: number | null,
  ){}
}