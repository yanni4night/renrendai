function downloadPdf(){
    var html;
	if(/*@cc_on!@*/0){ 
    　  html = ieInnerHTML($("#content")[0]);
　　 }else{ 
     　 html = $("#content").html();
　　 } 
    $("#htmlContent").val(html);
    $("#downloadForm").submit();
}

function ieInnerHTML(obj){
    var zz = obj.innerHTML, z = zz.match(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g);
    if (z) {
        for (var i = 0; i < z.length; i++) {
            var y, zSaved = z[i];
            z[i] = z[i].replace(/(<?\w+)|(<\/?\w+)\s/, function(a){
                return a.toLowerCase();
            });
            y = z[i].match(/\=\w+[?\s+|?>]/g);
            if (y) {
                for (var j = 0; j < y.length; j++) {
                    z[i] = z[i].replace(y[j], y[j].replace(/\=(\w+)([?\s+|?>])/g, '="$1"$2'));
                }
            }
            zz = zz.replace(zSaved, z[i]);
        }
    }
    return zz;
}
