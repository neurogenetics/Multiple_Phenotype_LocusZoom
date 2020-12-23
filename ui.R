
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
    hidden(tags$a(href='jsons/',target="_blank", id='interactive_ref_link','sample')),
    div(id="lz-plot",class="lz-container-responsive")
   
        )
    )
)

