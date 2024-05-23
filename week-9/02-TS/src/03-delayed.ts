function delayed( fn: ()=> void):void{
    setTimeout(fn,10000);
}


delayed(function (){
        console.log('vidit');
    });