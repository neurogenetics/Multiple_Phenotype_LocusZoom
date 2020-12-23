library(rjson)
library(data.table)

#names of columns in summary stats file
chr_name <- "CHR"
position_name <- "BP"
pvalue_name <- "P"
ref_name <- "A1"
variant_name <- "SNP"

#is the p value column already -log10?
p_is_log <- FALSE


#output file prefix
out_prefix <-"/path/to/ms_sumstats"


#summary stats file
data <- as.data.frame(fread("/path/to/discovery_metav3.0.meta"))

#how many bps to go up and downstream of each region
bprange <- 1000000


#regions to take from the summary stats
regions <- data.frame(chr=c(1,3,3,5,12,14,17,17),bp=c(154983036,18798848,121765368,133891282,123604053,88523488,40529835,43407670))
head(regions)

#remove any rows with a NA
complete <- data[complete.cases(data),]

#log calculations if needed
if(!p_is_log)
{
  complete$"log_pvalue" <- -1 * log10(complete[,names(complete)==pvalue_name])
} else {
  names(complete)[names(complete) == pvalue_name] <- "log_pvalue"
}

#rename columns
names(complete)[names(complete) == chr_name] <- "chromosome"
names(complete)[names(complete) == position_name] <- "position"
names(complete)[names(complete) == ref_name] <- "ref_allele"
names(complete)[names(complete) == variant_name] <- "variant"

#chromosomes to strings
complete$chromosome <- as.character(complete$chromosome)

#final df to use for json
df <- complete[order(complete$chromosome,complete$position),c("chromosome","log_pvalue","position","ref_allele","variant")]
print(dim(data))
print(dim(df))

#function to take data from all the regions and save to one file
all_regions_one_file <- function()
{

    sub_df <- data.frame()


    for (r in 1:nrow(regions))
    {
        row <- regions[r,]
        print(row)
        region_df <- df[(df$chromosome==as.character(row$chr) & df$position < row$bp +bprange & df$position > row$bp -bprange),]
        print(dim(region_df))
        sub_df <- rbind(sub_df,region_df)

        print("new:")
        print(dim(sub_df))

    }

    convert_list <- list(data = sub_df)


    json <- toJSON(convert_list)
    writeLines(json, file(paste0(out_prefix,".json")))

}

#function to save data for each region to its own file
all_regions_separate_files <- function()
{
    
    for (r in 1:nrow(regions))
    {
        row <- regions[r,]
        print(row)
        region_df <- df[(df$chromosome==as.character(row$chr) & df$position < row$bp +bprange & df$position > row$bp -bprange),]
        print(dim(region_df))


        convert_list <- list(data = region_df)


        json <- toJSON(convert_list)
        new_out_prefix <- paste0(out_prefix,"_chr",row$chr,"_",row$bp -bprange,"_",row$bp+bprange)

        writeLines(json, file(paste0(new_out_prefix,".json")))

    }

}

#run one of the above functions
all_regions_one_file()