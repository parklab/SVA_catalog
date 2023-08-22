import React from "react";

class InsertionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3 className="py-4 text-center">
          Some reported pathogenic SVA insertions
        </h3>
        <div className="row justify-content-md-center">
          <div className="col col-lg-8">
            <button
              className="btn btn-primary mb-3"
              onClick={this.props.toggleInsertionTable}
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
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/9884350/">
                        Rohrer, Jurg, et al., 1999
                      </a>
                      <br />
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/15712380/">
                        Conley, Mary Ellen, et al. 2005
                      </a>
                    </td>
                    <td>BTK</td>
                    <td>XLA</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/17273961/">
                        Makino, Satoshi, et al. 2007
                      </a>
                      <br />
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/29229810/">
                        Bragg, D. Cristopher, et al 2017
                      </a>
                      <br />
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/29474918/">
                        Aneichyk, Tatsiana, et al. 2018
                      </a>
                    </td>
                    <td>TAF1</td>
                    <td>X-linked dystonia-parkinsonism</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/25739383/">
                        Nakamura, Yuki, et al. 2015
                      </a>
                    </td>
                    <td>FIX</td>
                    <td>Hemophilia B</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/12642779/">
                        Wilund, Kenneth R., et al. 2002
                      </a>
                    </td>
                    <td>LDRAP1</td>
                    <td>ARH</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/8040317/">
                        Hassoun, Hani, et al. 1994
                      </a>
                      <br />
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/14628287/">
                        Ostertag, Eric M., et al. 2003
                      </a>
                    </td>
                    <td>SPTA1</td>
                    <td>HE and HPP</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/26740556/">
                        Stacey, Simon N., et al. 2016
                      </a>
                    </td>
                    <td>CASP8</td>
                    <td>Breast Cancer Susceptibility</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/26929209/">
                        Nazaryan‐Petersen, Lusine, et al. 2016
                      </a>
                    </td>
                    <td>A4GNT</td>
                    <td>Chromothripsis</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/17610419/">
                        Takasu, M., et al. 2007
                      </a>
                    </td>
                    <td>HLA-A</td>
                    <td>Leukemia</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/22461402/">
                        van der Klift, Heleen M., et al. 2012
                      </a>
                    </td>
                    <td>PMS2</td>
                    <td>Lynch syndrome</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/9690476/">
                        Kobayashi, Kazuhiro, et al. 1998
                      </a>
                    </td>
                    <td>FKTN</td>
                    <td>FCMD</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/20471263/">
                        Akman, Hasan O., et al. 2010
                      </a>
                    </td>
                    <td>PNPLA2</td>
                    <td>NLSDM</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/24958239/">
                        Vogt, Julia, et al. 2014 (two patients)
                      </a>
                    </td>
                    <td>SUZ1P</td>
                    <td>NF1</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/30122540/">
                        Kherraf, Zine-Eddine, et al. 2018
                      </a>
                    </td>
                    <td>WDR66</td>
                    <td>Male infertility</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/31570822/">
                        Staaf, Johan, et al. 2019
                      </a>
                    </td>
                    <td>BRCA1</td>
                    <td>Breast cancer</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/31597037/">
                        Kim, Jinkuk, et al. 2019
                      </a>
                    </td>
                    <td>MFSD8</td>
                    <td>Batten's disease</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/32441177/">
                        Jones, Kaylie D., et al. 2020
                      </a>
                    </td>
                    <td>CHM</td>
                    <td>Choroideremia</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://www.biorxiv.org/content/10.1101/2020.08.28.271932v2">
                        de la Morena-Barrio, Belén, et al. 2020
                      </a>
                    </td>
                    <td>SERPINC1</td>
                    <td>Antithrombin deficiency</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/21979053/">
                        Taniguchi-Ikeda, Mariko, et al. 2011
                      </a>
                    </td>
                    <td>Fukutin</td>
                    <td>Fukuyama muscular dystrophy</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://www.nature.com/articles/s41586-020-2434-2">
                        Turro, Ernest, et al. 2020
                      </a>
                    </td>
                    <td>ITGB3</td>
                    <td>Glanzmann thrombasthenia</td>
                  </tr>
                  <tr>
                    <td>
                      <a target="_blank" rel="noreferrer" href="https://www.jthjournal.org/article/S1538-7836(23)00640-2/pdf">
                        Zhang, Jiasheng, et al. 2023
                      </a>
                    </td>
                    <td>ITGB3</td>
                    <td>Glanzmann thrombasthenia</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-primary my-3"
                onClick={this.props.toggleInsertionTable}
              >
                Back to Browser
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InsertionTable;
