export interface IUser{
     id?:number;
     username:string;
     password:string;
     fullname:string;
}


export class User{
    public id?:number;
    public username:string;
    public password:string;
    public fullname:string;


    constructor(username:string, password:string, fullname:string) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
    }
}