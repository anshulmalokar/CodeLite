import fs from 'fs';
import path from 'path';
const requiredPath = path.resolve(__dirname,"../../problems/two-sum");
const structFileContents = fs.readFileSync(`${requiredPath}/Structure.md`,'utf-8');
const arr = structFileContents.split('\n');
const contentArray:{[key:string]:string} =  {};
let fields = 1;
arr.forEach(val => {
    const arr = val.split(": ");
    if(val.indexOf("Input Field") === 0){
        contentArray[`Field${fields}`] = arr[1]; 
        fields = fields + 1;
    }else{
        contentArray[arr[0]] = arr[1];
    }
})

const name = getName(contentArray);
const paramaters = getParamaters(contentArray);
const functionString = `const ${name} = (${paramaters}) => {
    // Implementation goes here
    return ${contentArray["Output Field"].split(" ")[1]};
};
`;
const filePath = path.join(requiredPath,'/boilerplate/function.js');
fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, functionString);

function getParamaters(contentArray: {[key:string]:string}){
    console.log(contentArray);
    let paramString = "";
    
    Object.entries(contentArray).forEach(([index, key]) => {
        if(index.indexOf("Field") === 0){
            paramString = paramString + key.split(" ")[1];
        }
    })

    console.log("param string is :" + paramString);
    return "num1,num2";
}

function getName(contentArray: {[key:string]:string}){
    return contentArray["Function Name"];
}