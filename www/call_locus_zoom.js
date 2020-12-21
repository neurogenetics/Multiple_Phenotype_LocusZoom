//To pick up changes to this you may need to clear cached files in the browser

function do_locuszoom_stuff(input_snp, input_chr, input_bp, input_formatsnp,population)
{

      var apiBase = "https://portaldev.sph.umich.edu/api/v1/";
      
      //console.log(document.getElementById("interactive_ref_link").href);
      
      //get the href value from the link created in ui.R
      full_interactive_ref_link = document.getElementById("interactive_ref_link").href;
      //remove the specific file reference
      interactive_ref_link = full_interactive_ref_link.replace("rs26431_locus.json", "")
      
      
      
      //var ourdata = interactive_ref_link+input_snp+"_locus.json/"
      var ourdata = interactive_ref_link+input_snp+"_locus.json?"
      
      console.log(ourdata)
      //var ourdata = "https://pdgenetics.shinyapps.io/GWASBrowser/_w_619d378c/interactive_stats/"+input_snp+"_locus.json/"
      //var ourdata = "http://127.0.0.1:6415//interactive_stats/"+input_snp+"_locus.json/"//"http://127.0.0.1:5103/rs114138760_locus.json/" 

      var data_sources = new LocusZoom.DataSources()
        //.add("assoc", ["AssociationLZ", {url:apiBase + "statistic/single/", params: {source: 45, id_field: "variant"}}])
        .add("assoc", ["AssociationLZ", {url: ourdata, params: { analysis:3, id_field: "variant" }}])
        .add("ld", ["LDLZ2", { url: "https://portaldev.sph.umich.edu/ld/"}])//api/v1/pair/LD/"}])
        .add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/" }])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/" }])
        .add("constraint", ["GeneConstraintLZ", { url: "https://gnomad.broadinstitute.org/api", params: { build: 'GRCh37' } }]);
        console.log(data_sources);
        

      var layout = LocusZoom.Layouts.get("plot", "standard_association", { max_region_scale:2000000, state: { genome_build: 'GRCh37',ld_pop:population, chr:input_chr, start: input_bp-1000000, end: input_bp+1000000, ldrefvar: input_formatsnp}});


      window.plot = LocusZoom.populate("#lz-plot", data_sources, layout);

      
}


function multi_pheno_locuszoom(chr, start, end)
{
      var apiBase = "https://portaldev.sph.umich.edu/api/v1/";
      
      //console.log(document.getElementById("interactive_ref_link").href);
      
      /*//get the href value from the link created in ui.R
      full_interactive_ref_link = document.getElementById("interactive_ref_link").href;
      //remove the specific file reference
      interactive_ref_link = full_interactive_ref_link.replace("rs26431_locus.json", "")
      
      

      var ourdata = interactive_ref_link+input_snp+"_locus.json?"*/
      

      //var ourdata = "https://pdgenetics.shinyapps.io/GWASBrowser/_w_619d378c/interactive_stats/"+input_snp+"_locus.json/"
      //var ourdata = "http://127.0.0.1:6415//interactive_stats/"+input_snp+"_locus.json/"//"http://127.0.0.1:5103/rs114138760_locus.json/" 

      var data_sources = new LocusZoom.DataSources()
        //.add("assoc", ["AssociationLZ", {url:apiBase + "statistic/single/", params: {source: 45, id_field: "variant"}}])
        //.add("assoc", ["AssociationLZ", {url: ourdata, params: { analysis:3, id_field: "variant" }}])
        .add("ld", ["LDLZ2", { url: "https://portaldev.sph.umich.edu/ld/"}])//api/v1/pair/LD/"}])
        .add("gene", ["GeneLZ", { url: apiBase + "annotation/genes/", params: { build: 'GRCh37' } }])
        .add("recomb", ["RecombLZ", { url: apiBase + "annotation/recomb/results/", params: { build: 'GRCh37' } }])
        .add("constraint", ["GeneConstraintLZ", { url: "https://gnomad.broadinstitute.org/api", params: { build: 'GRCh37' } }]);


  // Build the base layout
  var association_panel_mods = {
      data_layers: [
          LocusZoom.Layouts.get("data_layer", "significance", { name: "Line of GWAS Significance" }),
          LocusZoom.Layouts.get("data_layer", "recomb_rate", { namespace: { "recomb": "recomb" }, name: "Recombination Rate" })
      ],
      toolbar: LocusZoom.Layouts.get("panel", "association")["toolbar"]
  };
  association_panel_mods.toolbar.widgets.push({
      type: "data_layers",
      position: "right",
      statuses: ["faded", "hidden"]
  });
  
  
        
      layout = {
        width: 800,
        height: 500,
        responsive_resize: true,
        panels: [
            LocusZoom.Layouts.get("panel", "association", association_panel_mods),
            LocusZoom.Layouts.get("panel", "genes", { namespace: { "gene": "gene" } })
        ],
        toolbar: LocusZoom.Layouts.get("toolbar","standard_plot"),
        state: { genome_build: 'GRCh37',ld_pop:'EUR', chr:chr, start: start, end: end}
    };
    // Define a set of studies/phenotypes and loop through them to add a data source and data layer for each one
    var phenos = [
        { namespace: "fasting_glucose", title: "Fasting glucose meta-analysis", color: "rgb(212, 63, 58)", study_id: 31 },
        { namespace: "fasting_insulin", title: "Fasting insulin meta-analysis", color: "rgb(238, 162, 54)", study_id: 32 },
        { namespace: "triglycerides", title: "Triglycerides meta-analysis", color: "rgb(92, 184, 92)", study_id: 29 },
        { namespace: "cholesterol", title: "Total cholesterol meta-analysis", color: "rgb(53, 126, 189)", study_id: 30 }
    ];
    phenos.forEach(function(pheno){
        data_sources.add(pheno.namespace, ["AssociationLZ", {url: apiBase + "statistic/single/", params: { source: pheno.study_id, id_field: "variant" }}]);
        var association_data_layer_mods = {
            namespace: { "assoc": pheno.namespace },
            id: "associationpvalues_" + pheno.namespace,
            name: pheno.title,
            point_shape: "circle",
            point_size: 40,
            color: pheno.color,
            legend: [
                { shape: "circle", color: pheno.color, size: 40, label: pheno.title, class: "lz-data_layer-scatter" },
            ],
            fields: [pheno.namespace+":variant", pheno.namespace+":position", pheno.namespace+":log_pvalue", pheno.namespace+":log_pvalue|logtoscinotation", pheno.namespace+":ref_allele"],
            tooltip: {
                closable: true,
                show: { or: ["highlighted", "selected"] },
                hide: { and: ["unhighlighted", "unselected"] },
                html: "<strong>" + pheno.title + "</strong><br>"
                    + "<strong>{{" + pheno.namespace + ":variant|htmlescape}}</strong><br>"
                    + "P Value: <strong>{{" + pheno.namespace + ":log_pvalue|logtoscinotation|htmlescape}}</strong><br>"
                    + "Ref. Allele: <strong>{{" + pheno.namespace + ":ref_allele|htmlescape}}</strong><br>"
            }
        };
        layout.panels[0].data_layers.push(LocusZoom.Layouts.get("data_layer", "association_pvalues", association_data_layer_mods));
    });


  
         window.plot = LocusZoom.populate("#lz-plot", data_sources, layout);
         
         
         
         // Create a method to parse a region string into a 600Kb genome range and load it
    function jumpTo(region) {
      var target = region.split(":");
      var chr = target[0];
      var pos = target[1];
      var start = 0;
      var end = 0;
      if (!pos.match(/[-+]/)) {
        start = +pos - 300000
        end = +pos + 300000
      }
      plot.applyState({ chr: chr, start: start, end: end, ldrefvar: "" });
      return false;
    }

    // Populate a list of top hits links for the plot
    var top_hits = [
      ["16:53819169", "FTO"],
      ["15:58680954", "LIPC"],
      ["2:21231524", "APOB"],
      ["16:56959412", "CETP"],
      ["7:44196069", "GCK"],
      ["2:27518370", "GCKR"],
      ["10:114758349", "TCF7L2"],
      ["7:15052860", "DGKB"],
      ["2:27772914", "MRPL33"],
      ["6:20679709", "CDKAL1"],
      ["19:11091630", "LDLR"],
      ["11:116778201", "APOA1"],
      ["8:19986711", "LPL"],
      ["11:92708710", "MTNR1B"]
    ];
    top_hits.forEach(function(hit){
      d3.select("ul.top_hits").append("li")
        .html("<a href=\"javascript:void(0);\" onclick=\"javascript:jumpTo('" + hit[0] + "');\">" + hit[1] + "</a>");
    });
}
