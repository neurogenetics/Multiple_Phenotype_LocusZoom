library(rjson)

chr_name <- "CHR"
position_name <- "BP"
pvalue_name <- "P"
ref_name <- "A1"
variant_name <- "SNP"
p_is_log <- FALSE

data <- as.data.frame(fread("www/discovery_metav3.0.meta"))
complete <- data[complete.cases(data),]
if(!p_is_log)
{
  complete$"log_pvalue" <- -1 * log10(complete[,names(complete)==pvalue_name])
} else {
  names(complete)[names(complete) == pvalue_name] <- "log_pvalue"
}

names(complete)[names(complete) == chr_name] <- "chromosome"
names(complete)[names(complete) == position_name] <- "position"
names(complete)[names(complete) == ref_name] <- "ref_allele"
names(complete)[names(complete) == variant_name] <- "variant"


#complete[,names(complete)==chr_name] <- as.character(complete[,names(complete)==chr_name])
complete$chromosome <- as.character(complete$chromosome)

ordered <- complete[order(complete$chromosome,complete$position),c("chromosome","log_pvalue","position","ref_allele","variant")]

ordered <- ordered[ordered$chromosome=="1",]

ordered <- ordered[ ordered$position < 21000000,]
convert_list <- list(data = ordered)


#chromosome,log_pvalue,position,ref_allele,variant
json <- toJSON(convert_list)
writeLines(json, file("www/ms_sumstats.json"))
