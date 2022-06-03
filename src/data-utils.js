import md5 from 'md5'
import { CHROMS, chr2Abs } from "./chrom-utils";
import { format } from "d3-format";

export const VCF_URL = "https://aveit.s3.amazonaws.com/misc/sva_elements.sorted.vcf.gz";
export const TBI_URL = "https://aveit.s3.amazonaws.com/misc/sva_elements.sorted.vcf.gz.tbi";


export const vcfRecordToJson = (vcfRecord, chrom) => {
  const info = vcfRecord['INFO'];
  const posAbs = chr2Abs(vcfRecord.CHROM, +vcfRecord.POS);
  const gene_info = info.GENE_INFO ? info.GENE_INFO[0].toLowerCase() : "";
  const gene_info_disp = [];
  if(info.GENE_INFO){
    const gene_split = info.GENE_INFO[0].split("/");
    gene_split.forEach(gene => {
      const info_split = gene.split(":");
      if(info_split.length > 1){
        const first = info_split[0];
        const last = info_split[info_split.length-1];
        gene_info_disp.push(first+":"+last);
      }else{
        gene_info_disp.push(info_split[0].replace("not_gene_region", "intergenic"));
      }
    });
  }

  const af = format(".2e")(info.AF[0]);

  return {
    id: md5(posAbs).substring(0,4),
    chrom: vcfRecord.CHROM,
    chromOrder: chrom["order"],
    start: vcfRecord.POS,
    end: info.END[0],
    length: info.SVLEN[0],
    type: info.SVTYPE[0],
    info: info,
    gene_info: gene_info,
    gene_info_disp: gene_info_disp,
    posAbs: posAbs,
    af: af,
    showDetails: false
  }
}

export const parseLocation = (str) => {
  const chromNames = CHROMS.map(c => c.name);
  if(str.includes(":")){
    const ss = str.split(":").filter(n => n); // remove empty elements
    if(ss.length === 1 && chromNames.includes(ss[0])){
      const chrName = ss[0];
      return {
        posAbs: chr2Abs(chrName,0)
      }
    }
    else if(ss.length > 1 && chromNames.includes(ss[0]) && parseInt(ss[1], 10)){
      const chrName = ss[0];
      const pos = parseInt(ss[1], 10);
      return {
        posAbs: chr2Abs(chrName, pos)
      }
    }
    
  }else if(chromNames.includes(str)){
    return {
      posAbs: chr2Abs(str,0)
    }
  }

  return null
}