
shinyServer(function(input, output,session) {


    
    output$'interactiveLZ' <- renderUI({
        

        jsstring <- paste0("do_locuszoom_stuff('rs26431',5,103257163,'5:102323766_C/T','EUR')")
        jsstring <- paste0("multi_pheno_locuszoom(5,103257163,105257163)")
        
        runjs(jsstring)
    })
    
    observeEvent(input$plotButton,{

        chr <- unlist(strsplit(input$rangeInput,":"))[1]

        start <- unlist(strsplit(unlist(strsplit(input$rangeInput,":"))[2],"-"))[1]
        end <- unlist(strsplit(unlist(strsplit(input$rangeInput,":"))[2],"-"))[2]
        
        jsstring <- paste0("multi_pheno_locuszoom('",chr,"',",start,",",end,")")
        
        runjs(jsstring)
    })
    
})



