# Multiple Phenotype Interactive Locus Zoom R Shiny App
- **Author(s)** - Frank Grenn
- **Date Started** - December 2020
- **Tools** - [LocusZoom.js](https://statgen.github.io/locuszoom/?chrom=10&start=114550452&end=115067678), [RShiny](https://shiny.rstudio.com/)
- **Quick Description:** A simple R Shiny application that incorporates code from LocusZoom.js to create a multiple phenotype interactive locus zoom plot.

## Setup
### 1. Format Summary Statistics into JSON Format
   Follow code in `locus_zoom_data.ipynb` to do the conversion explained below.
   
   We want to get the chromosome, basepair, pvalue, reference allele, and variant id (can be chr:bp, rsid, etc) from the summary statistics and save in a json format that the interactive locus zoom tool can read.
   For example, we want to convert something like:
   
CHR | BP | SNP | A1 | A2 | N | P | OR 
--- | --- | --- | --- | --- | --- | --- | --- 
1 | 11154 | chr1:11154 | C | A | 4 | 0.7911 | 0.9818 
1 | 11565 | chr1:11565 | G | T | 5 | 0.8735 | 0.9924
1 | 11710 | chr1:11710 | T | G | 4 | 0.7793 | 0.9806

   To a json format like this:
   
```
{
   "data":
   {
      "chromosome":["1","1","1"],
      "log_pvalue":[0.102,0.059,0.108],
      "position":[11154,11565,11710],
      "ref_allele":["C","G","T"],
      "variant":["chr1:11154","chr1:11565","chr1:11710"]
   }

}
```


### 2. Place the Formatted JSON Files in the Shiny App `/jsons` Folder

### 3. Change Arguments in `call_locus_zoom.js`
####   a. Display Range
  Change the values of the default_range variable to select the region to plot
  
```
var default_range = {
  chr:"14",
  start:87523488,
  end:89523488
}
```

####   b. Plot Dimensions
  Set the width of the plot. Height is determined by gene panel.
  
```
var default_width = 1200;
```

####   c. Phenotypes to Include
  Add each phenotype to the phenos array (you can have more than two).
  
```
var phenos = [

    { namespace:"MS", title:"MS", filename:"ms_sumstats_chr14_87523488_89523488.json", color: "rgb(255,0,0)"},
    { namespace:"PD", title:"PD", filename:"pd_sumstats_chr14_87523488_89523488.json", color: "rgb(0,0,255)"}
];

```

### 4. Run the Shiny App
### 5. Display All Genes and Download PNG
   Don't forget to click the "Resize" button to display all genes in the region!
   
### 6. Alter Plot
   Shift + scroll to zoom in and out on plot.
   
   Click and drag to move up/down chromosome.
   
   Click "Data Layers" to alter the display of the variants. 