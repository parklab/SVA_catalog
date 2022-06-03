import React from "react";
import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
import { TabixIndexedFile } from "@gmod/tabix";
import VCF from "@gmod/vcf";
import { RemoteFile } from "generic-filehandle";
//import fetch from 'node-fetch'
import { CHROMS } from "./chrom-utils";
import { format } from "d3-format";
import { VCF_URL, TBI_URL, vcfRecordToJson, parseLocation } from "./data-utils";

const PAGE_SIZE = 50;

class VariantTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      loading: true,
      variants: [],
      displayedVariants: [],
      tablePage: 0,
      filter: {},
      showInsertionTable: false,
    };
    this.variants = [];
    this.loadingVariantsCalled = false;
  }

  componentDidMount() {
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleInsertionTable = this.toggleInsertionTable.bind(this);
    this.loadVariants();
  }

  nextPage() {
    this.setState((prevState) => ({
      tablePage: prevState.tablePage + 1,
    }));
  }

  previousPage() {
    this.setState((prevState) => ({
      tablePage: prevState.tablePage - 1,
    }));
  }

  toggleFilter() {
    this.setState((prevState) => ({
      showFilter: !prevState.showFilter,
    }));
  }

  toggleDetails(event) {
    event.preventDefault();
    const variantId = event.target.dataset.id;
    const variants = this.state.displayedVariants;
    variants.forEach((v) => {
      if (v["id"] === variantId) {
        v["showDetails"] = !v["showDetails"];
      }
    });

    this.setState((prevState) => ({
      displayedVariants: variants,
    }));
  }

  toggleInsertionTable(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      filter: {},
      displayedVariants: prevState.variants,
      showInsertionTable: !prevState.showInsertionTable,
    }));
  }

  filterChange(event) {
    const filtertype = event.target.dataset.filtertype;
    const filter = this.state.filter;

    filter[filtertype] = event.target.value;
    if (event.target.value === "") {
      delete filter[filtertype];
    }
    this.applyFilter(filter);
  }

  applyFilter(filter) {
    let variants = this.state.variants;
    if (filter["gene"] !== undefined) {
      variants = variants.filter((v) =>
        v["gene_info"].includes(filter["gene"].toLowerCase())
      );
    }
    if (filter["from"] !== undefined) {
      const locFrom = parseLocation(filter["from"]);
      if (locFrom) {
        variants = variants.filter((v) => {
          return v["posAbs"] >= locFrom["posAbs"];
        });
      }
    }
    if (filter["to"] !== undefined) {
      const locTo = parseLocation(filter["to"]);
      if (locTo) {
        variants = variants.filter((v) => {
          return v["posAbs"] <= locTo["posAbs"];
        });
      }
    }

    this.setState((prevState) => ({
      filter: filter,
      displayedVariants: variants,
    }));
  }

  loadVariants() {
    if (this.loadingVariantsCalled) {
      return;
    }
    this.loadingVariantsCalled = true;

    this.vcfFile = new TabixIndexedFile({
      filehandle: new RemoteFile(VCF_URL),
      tbiFilehandle: new RemoteFile(TBI_URL),
    });
    const vcfHeader = this.vcfFile.getHeader(); // Promise

    vcfHeader.then((header) => {
      const tbiVCFParser = new VCF({ header: header });
      const dataPromises = [];
      CHROMS.forEach((chrom) => {
        const dataPromise = this.vcfFile.getLines(
          chrom["name"],
          0,
          chrom["length"],
          (line) => {
            const vcfRecord = tbiVCFParser.parseLine(line);
            //console.log(vcfRecord);
            this.variants.push(vcfRecordToJson(vcfRecord, chrom));
          }
        );
        dataPromises.push(dataPromise);
      });

      Promise.all(dataPromises).then((values) => {
        this.setState((prevState) => ({
          loading: false,
          variants: this.variants,
          displayedVariants: this.variants,
        }));
        //console.log(this.variants);
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="text-center">
          <CircularProgress color="#999999" width="50px" height="50px" />
          <div className="mt-2 small text-muted">Loading variants...</div>
        </div>
      );
    }

    if (this.state.showInsertionTable) {
      return (
        <div>
          <h3 className="py-4 text-center">
            Some reported pathogenic SVA insertions
          </h3>
          <div className="row justify-content-md-center">
            <div className="col col-lg-8">
              <button
                className="btn btn-primary mb-3"
                onClick={this.toggleInsertionTable}
              >
                Back to Browser
              </button>
              <div className="">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Related papers</th>
                      <th>Defected gene</th>
                      <th>Related disease</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Rohrer, Jurg, et al., 1999
                        <br />
                        Conley, Mary Ellen, et al. 2005
                      </td>
                      <td>BTK</td>
                      <td>XLA</td>
                    </tr>
                    <tr>
                      <td>
                        Makino, Satoshi, et al. 2007
                        <br />
                        Bragg, D. Cristopher, et al 2017
                        <br />
                        Aneichyk, Tatsiana, et al. 2018
                      </td>
                      <td>TAF1</td>
                      <td>X-linked dystonia-parkinsonism</td>
                    </tr>
                    <tr>
                      <td>Nakamura, Yuki, et al. 2015</td>
                      <td>FIX</td>
                      <td>Hemophilia B</td>
                    </tr>
                    <tr>
                      <td>Wilund, Kenneth R., et al. 2002</td>
                      <td>LDRAP1</td>
                      <td>ARH</td>
                    </tr>
                    <tr>
                      <td>
                        Hassoun, Hani, et al. 1994
                        <br />
                        Ostertag, Eric M., et al. 2003
                      </td>
                      <td>SPTA1</td>
                      <td>HE and HPP</td>
                    </tr>
                    <tr>
                      <td>Stacey, Simon N., et al. 2016</td>
                      <td>CASP8</td>
                      <td>Breast Cancer Susceptibility</td>
                    </tr>
                    <tr>
                      <td>Nazaryan‐Petersen, Lusine, et al. 2016</td>
                      <td>A4GNT</td>
                      <td>Chromothripsis</td>
                    </tr>
                    <tr>
                      <td>Takasu, M., et al. 2007</td>
                      <td>HLA-A</td>
                      <td>Leukemia</td>
                    </tr>
                    <tr>
                      <td>van der Klift, Heleen M., et al. 2012</td>
                      <td>PMS2</td>
                      <td>Lynch syndrome</td>
                    </tr>
                    <tr>
                      <td>Kobayashi, Kazuhiro, et al. 1998</td>
                      <td>FKTN</td>
                      <td>FCMD</td>
                    </tr>
                    <tr>
                      <td>Akman, Hasan O., et al. 2010</td>
                      <td>PNPLA2</td>
                      <td>NLSDM</td>
                    </tr>
                    <tr>
                      <td>Vogt, Julia, et al. 2014 (two patients)</td>
                      <td>SUZ1P</td>
                      <td>NF1</td>
                    </tr>
                    <tr>
                      <td>Kherraf, Zine-Eddine, et al. 2018</td>
                      <td>WDR66</td>
                      <td>Male infertility</td>
                    </tr>
                    <tr>
                      <td>Staaf, Johan, et al. 2019</td>
                      <td>BRCA1</td>
                      <td>Breast cancer</td>
                    </tr>
                    <tr>
                      <td>Kim, Jinkuk, et al. 2019</td>
                      <td>MFSD8</td>
                      <td>Batten's disease</td>
                    </tr>
                    <tr>
                      <td>Jones, Kaylie D., et al. 2020</td>
                      <td>CHM</td>
                      <td>Choroideremia</td>
                    </tr>
                    <tr>
                      <td>de la Morena-Barrio, Belén, et al. 2020</td>
                      <td>SERPINC1</td>
                      <td>Antithrombin deficiency</td>
                    </tr>
                    <tr>
                      <td>Taniguchi-Ikeda, Mariko, et al. 2011</td>
                      <td>Fukutin</td>
                      <td>Fukuyama muscular dystrophy</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-primary my-3"
                  onClick={this.toggleInsertionTable}
                >
                  Back to Browser
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const variantRows = [];
    const variantsToDisplay = this.state.displayedVariants.sort(
      (a, b) => a.posAbs - b.posAbs
    );
    const variantsToDisplaySliced = variantsToDisplay.slice(
      this.state.tablePage * PAGE_SIZE,
      (this.state.tablePage + 1) * PAGE_SIZE
    );

    variantsToDisplaySliced.forEach((variant, index) => {
      const gene_info = [];
      variant.gene_info_disp.forEach((gene) => {
        gene_info.push(
          <span className="badge bg-light text-muted d-inline-block me-1">
            {gene}
          </span>
        );
      });

      variantRows.push(
        <tr className={variant.showDetails ? "table-secondary" : ""}>
          <td>{variant.chrom}</td>
          <td>{format(",.0f")(variant.start)}</td>
          <td>{format(",.0f")(variant.end)}</td>
          <td>{variant.length}</td>
          <td>{variant.af}</td>
          <td>{gene_info}</td>
          <td>
            <a
              href="#"
              className="link-primary"
              data-id={variant.id}
              onClick={this.toggleDetails}
            >
              Details
            </a>
          </td>
        </tr>
      );
      if (variant.showDetails) {
        const infos = [];
        const properties = [];
        for (const property in variant.info) {
          properties.push(property);
        }
        //properties.sort();
        properties.forEach((property) => {
          infos.push(
            <div className="col-md-4">
              <strong>{property}:</strong> {variant.info[property]}
            </div>
          );
        });

        variantRows.push(
          <tr className="table-light">
            <td colSpan={7}>
              <div className="row">{infos}</div>
            </td>
          </tr>
        );
      }
    });

    const navButtons = [];
    if (this.state.tablePage > 0) {
      navButtons.push(
        <button
          className="btn btn-primary btn-sm mx-2"
          onClick={this.previousPage}
        >
          Previous
        </button>
      );
    }

    if (
      variantsToDisplay.length > PAGE_SIZE &&
      (this.state.tablePage + 1) * PAGE_SIZE <= variantsToDisplay.length
    ) {
      navButtons.push(
        <button className="btn btn-primary btn-sm" onClick={this.nextPage}>
          Next
        </button>
      );
    }

    let message = "No variants found";
    if (variantsToDisplay.length > 0) {
      message = `Displaying variants ${
        this.state.tablePage * PAGE_SIZE + 1
      }-${Math.min(
        (this.state.tablePage + 1) * PAGE_SIZE,
        variantsToDisplay.length
      )} of ${variantsToDisplay.length}`;
    }

    return (
      <div>
        <h3 className="py-4">Browse variants</h3>
        <div className="d-flex mb-2">
          <div className="me-auto"></div>
          <button
            className="btn btn-primary me-auto btn-sm collapse"
            onClick={this.toggleFilter}
          >
            Filter
          </button>

          <div className="pt-1 mx-2">{message}</div>
          {navButtons}
        </div>

        {/* <div className={this.state.showFilter ? "" : "collapse"}>
          <div className="my-3 p-3 bg-light">
ss
          </div>
        </div> */}
        <div className="row pb-5">
          <div className="col-md-3 col-xl-2">
            <div className="small pt-1 text-muted">FILTER</div>
            <div className="mt-1 p-3 bg-light">
              <div className="mb-2">
                <label
                  htmlFor="filter-from"
                  className="form-label small fw-bold"
                >
                  From
                </label>
                <input
                  className="form-control form-control-sm"
                  id="filter-from"
                  placeholder="e.g. chr1:1000000"
                  data-filtertype="from"
                  onChange={this.filterChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="filter-to" className="form-label small fw-bold">
                  To
                </label>
                <input
                  className="form-control form-control-sm"
                  id="filter-to"
                  placeholder="e.g. chr3:20000000"
                  data-filtertype="to"
                  onChange={this.filterChange}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="filter-gene"
                  className="form-label small fw-bold"
                >
                  Gene
                </label>
                <input
                  className="form-control form-control-sm"
                  id="filter-gene"
                  data-filtertype="gene"
                  placeholder="e.g. TNFRSF8"
                  onChange={this.filterChange}
                />
              </div>
            </div>

            <div className="my-2">
              <a href="#" className="" onClick={this.toggleInsertionTable}>
                Reported pathogenic SVA insertions
              </a>
            </div>
          </div>
          <div className="col-md-9 col-xl-10">
            <div class="table-responsive">
              <table className="table table-hover table-sm">
                <thead className="sticky-table-header bg-white">
                  <tr>
                    <th scope="col">Chrom.</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Length</th>
                    <th scope="col">Allele Frequency</th>
                    <th scope="col">Gene info</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>{variantRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VariantTable;
