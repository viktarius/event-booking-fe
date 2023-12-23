export interface ILoginRequestBody {
    email: string;
    password: string;
}

export interface IRegisterRequestBody {
    email: string;
    password: string;
    name: string;
    surname: string;
}
