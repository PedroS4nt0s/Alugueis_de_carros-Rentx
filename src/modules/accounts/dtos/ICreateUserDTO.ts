interface ICreateUserDTO {//Responsavel por traser os dados do cadastro
    name: string;
    password: string;
    email: string;
    driver_license: string; 
    id?: string
    avatar?: string;
}

export {ICreateUserDTO}