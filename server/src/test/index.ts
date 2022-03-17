import {FetchManager} from "./FetchManager";
import {log} from "util";
import {ModelTest} from "../models/ModelTest";





async function main(){

    try {
        let login = await  FetchManager.instance.getLogin("admin11","123456");
        //let a = await  FetchManager.instance.signup("admin11","123456", "admin11")
        console.log(login)

    }catch (e){
        console.log(e)
    }

}

main()

