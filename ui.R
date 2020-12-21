
shinyUI( tagList(fluidPage(
    shinyjs::useShinyjs(),
    tags$head(includeCSS("www/theme.css")),

    
    #get incteractive locus zoom code via CDN (Content Delivery Network) links
    tags$head(tags$script(src = "https://cdn.jsdelivr.net/npm/d3@^5.16.0",type = "text/javascript")),
    tags$head(tags$script(src = "https://cdn.jsdelivr.net/npm/locuszoom@0.12.2",type = "text/javascript")),
    tags$head(includeCSS("https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/locuszoom.css")),
    tags$head(tags$script(src ="https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/ext/lz-widget-addons.min.js",type = "text/javascript")),
    tags$head(tags$script(src ="https://cdn.jsdelivr.net/npm/locuszoom@0.12.2/dist/ext/lz-widget-addons.min.js.map",type = "text/javascript")),
    
    tags$script(src = "call_locus_zoom.js"),
    
    #this will contain the url to the json files to be used for the interactive locus zoom
    hidden(tags$a(href='rs26431_locus.json',target="_blank", id='interactive_ref_link','sample')),
        div(id = "uiPage",
            dashboardPagePlus(    
                title = "PD Genetic Landscape Plot", skin = "black",
                dashboardHeaderPlus(
                    title = "locus zoom"
                ),
                dashboardSidebar(
                    width = 400,

                    h3("Starting Basepair Range:"),
                    textInput(inputId = "rangeInput", label = NULL, placeholder="1:12345-67890",width = "300px",value=""),

                    actionButton(inputId = "plotButton", label = "Generate Plot")
                    
                    
                    
                ),
                sidebar_fullCollapse = TRUE,
                dashboardBody(
                    
                    htmlOutput("interactiveLZ"),
                    div(id="lz-plot",class="lz-container-responsive")
                    )
                    
                ))
        )
)
)

