
shinyUI( tagList(fluidPage(
    shinyjs::useShinyjs(),

    
    #get interactive locus zoom code via CDN (Content Delivery Network) links
    tags$head(tags$script(src = "https://cdn.jsdelivr.net/npm/d3@^5.16.0",type = "text/javascript")),
    tags$head(tags$script(src = "https://cdn.jsdelivr.net/npm/locuszoom@0.12.2",type = "text/javascript")),
    tags$head(includeCSS("https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/locuszoom.css")),
    tags$head(tags$script(src ="https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/ext/lz-widget-addons.min.js",type = "text/javascript")),
    tags$head(tags$script(src ="https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/ext/lz-widget-addons.min.js.map",type = "text/javascript")),
    
    tags$script(src = "call_locus_zoom.js"),
    
    #this will contain the url to the json files to be used for the interactive locus zoom
    hidden(tags$a(href='jsons/rs26431_locus.json',target="_blank", id='interactive_ref_link','sample')),
    div(id="lz-plot",class="lz-container-responsive")
    # sidebarLayout(
    #     sidebarPanel(
    #         h3("Starting Basepair Range:"),
    #         textInput(inputId = "rangeInput", label = NULL, placeholder="1:12345-67890",width = "300px",value=""),
    #         
    #         h3("Dimensions:"),
    #         sliderInput("canvas_width", label = "Width:",
    #                     min = 300, max = 2000, value = 1200, step =50),
    #         sliderInput("canvas_height", label = "Height:",
    #                     min = 300, max = 1000, value = 800, step =50),
    #         
    #         actionButton(inputId = "plotPhenoButton", label = "Update"),
    #         #actionButton(inputId = "plotLZButton", label = "Generate Normal Plot"),
    #         width =3
    #     ),
    #     mainPanel(
    #         div(id="lz-plot",class="lz-container-responsive")
    #     )
    # ),

        # div(id = "uiPage",
        #     dashboardPagePlus(    
        #         title = "PD Genetic Landscape Plot", skin = "black",
        #         dashboardHeaderPlus(
        #             title = "locus zoom"
        #         ),
        #         dashboardSidebar(
        #             width = 400,
        # 
        # 
        # 
        #             h3("Starting Basepair Range:"),
        #             textInput(inputId = "rangeInput", label = NULL, placeholder="1:12345-67890",width = "300px",value=""),
        # 
        #             actionButton(inputId = "plotPhenoButton", label = "Generate Pheno Plot"),
        #             actionButton(inputId = "plotLZButton", label = "Generate Normal Plot")
        #             
        #             
        #         ),
        #         sidebar_fullCollapse = TRUE,
        #         dashboardBody(
        #             fluidRow(
        #                 column(                 
        #                     htmlOutput("interactiveLZ"),
        #                     div(id="lz-plot",class="lz-container-responsive"),
        #                     width = 6)
        #             )
        # 
        #             )
        #             
        #         ))
        )
)
)

