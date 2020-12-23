
shinyServer(function(input, output,session) {


    jsstring <- paste0("multi_pheno_locuszoom()")
    
    runjs(jsstring)


    
})



