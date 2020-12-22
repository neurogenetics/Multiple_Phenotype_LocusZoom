
shinyServer(function(input, output,session) {


    jsstring <- paste0("multi_pheno_locuszoom()")
    
    runjs(jsstring)

    # observeEvent(input$plotPhenoButton,{
    # 
    #     chr <- unlist(strsplit(input$rangeInput,":"))[1]
    # 
    #     start <- unlist(strsplit(unlist(strsplit(input$rangeInput,":"))[2],"-"))[1]
    # 
    #     end <- unlist(strsplit(unlist(strsplit(input$rangeInput,":"))[2],"-"))[2]
    # 
    #     
    # 
    #     #jsstring <- paste0("multi_pheno_locuszoom(",chr,",",start,",",end,",",input$canvas_width,",",input$canvas_height,")")
    # 
    #     #jsstring <- paste0("multi_pheno_locuszoom(",paste(args,collapse=","),")")
    #     jsstring <- paste0("multi_pheno_locuszoom(",input$canvas_width,",",input$canvas_height,")")
    #     jsstring <- paste0("multi_pheno_locuszoom()")
    #     print(jsstring)
    #     runjs(jsstring)
    #     
    # })
    
    # observeEvent(input$plotLZButton,{
    #     
    #     jsstring <- paste0("do_locuszoom_stuff('rs26431',5,103257163,'5:102323766_C/T','EUR')")
    #     
    #     runjs(jsstring)
    # })
    
})



