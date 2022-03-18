import {FetchManager} from "./FetchManager";

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

