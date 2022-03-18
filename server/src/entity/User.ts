export interface IUser{
     id?:number;
     username:string;
     password:string;
     full_name:string;
     created_at?:Date;
     updated_at?:Date;
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