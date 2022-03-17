import fetch from "node-fetch";

export class FetchManager{

    private static _instance: FetchManager
    private HOST: string = 'http://localhost:3000'
    public token = ""

    public static get instance(): FetchManager {
        return this._instance || (this._instance = new this())
    }


    public setToken(token:string){
        this.token=token;
    }



    constructor() {

    }


    async getLogin(username:string, password:string){
        let res = await fetch(this.HOST+ "/auth/signin",{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'}
        })

        return await res.json()
    }



    async signup(username:string, password: string,fullname?:string ){

        let res = await fetch(this.HOST+ "/auth/signup",{
            method: 'POST',
            body: JSON.stringify({username,password, fullname}),
            headers: {'Content-Type': 'application/json'}
        })

        return await res.json()
    }

}