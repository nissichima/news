function validURL(url) {
    console.log("CHECKING URL VALIDATION OF URL", url);

    var reg =  (/^(http|https):\/\/[^ "]+$/);
    if(reg.test(url)){
        return true;
    }
    
    return false;
    
 }
export { validURL }
