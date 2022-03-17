export default class BaseResponse{
    public code:number;
    public message: string;
    public data: any

    constructor(code:number, message:string, data:any=null) {
        this.code = code;
        this.message = message;
        this.data = data
    }
}