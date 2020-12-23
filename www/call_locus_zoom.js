
//starting range to display on plot
var default_range = {
  chr:"14",
  start:87523488,
  end:89523488
}

//plot dimensions. Height is usually determined by the gene panel of the plot, not the value of default_height.
var default_width = 1200;
var default_height = 600;

// Define a set of studies/phenotypes
var phenos = [

    { namespace:"MS", title:"MS", filename:"ms_sumstats_chr14_87523488_89523488.json", color: "rgb(255,0,0)"},
    { namespace:"PD", title:"PD", filename:"pd_sumstats_chr14_87523488_89523488.json", color: "rgb(0,0,255)"}
];


function multi_pheno_locuszoom(plot_width = default_width, plot_height = default_height,chr= default_range.chr, start= default_range.start, end = default_range.end)
{
  var apiBase = "https://portaldev.sph.umich.edu/api/v1/";
  
  
  //get the href value from the link created in ui.R
  full_interactive_ref_link = document.getElementById("interactive_ref_link").href;

  
  var data_sources = new LocusZoom.DataSources()
    .add("ld", ["LDLZ2", { url: "https://portaldev.sph.umich.edu/ld/"}])
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
  
  var layout = {
    width: plot_width,
    height: plot_height,
    responsive_resize: false,
    panels: [
      LocusZoom.Layouts.get("panel", "association", association_panel_mods),
      LocusZoom.Layouts.get("panel", "genes", { namespace: { "gene": "gene" } })
    ],
    toolbar: LocusZoom.Layouts.get("toolbar","standard_plot"),
    state: { genome_build: 'GRCh37',ld_pop:'EUR', chr:chr, start: start, end: end}
  };
  
  // loop through phenotypes to add a data source and data layer for each one
  phenos.forEach(function(pheno){
  
  data_sources.add(pheno.namespace, ["AssociationLZ", {url: full_interactive_ref_link+pheno.filename+"?", params: { analysis:3,id_field: "variant" }}]);
  console.log(data_sources);
  
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
}


