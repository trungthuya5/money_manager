const xlsx = require('node-xlsx');
const fs = require('fs');
let text_raw = fs.readFileSync('./text.json');
let text = JSON.parse(text_raw);

let data = [];
data.push([])
data.push(["playerId", "1205",	"1603",	"1103",	"1002",	"518",	"1451"])


let aa = []
// console.log(text);
let temp=0;
let arr = []
for(let i=0;i<text.length;i++){
   
    if(temp != text[i][0]){
        data.push(arr)
        arr = []
        temp =text[i][0]
        //console.log(text[i][0]);
        arr.push(temp)
        arr.push(text[i][1])
    }
    else {
        arr.push(text[i][1])
        }
}




var buffer = xlsx.build([{ name: "mySheetName", data: data }]); 
     fs.writeFileSync('./gouzhan.xlsx', buffer);