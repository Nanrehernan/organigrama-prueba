import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart/src'
import { BrowserRouter, Route } from 'react-router-dom'
import datos from './TreeOrg'
import avatarPersonnel from './assets/avatar-personnel.svg'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tree: this.getNodoPrincipal(),
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1]
    }
  }

  getTotalReport = (id) => {   
    let totalReport = 0;
    for (let p of datos) {
      if (p.id !== p.idParent) {
        if (p.idParent === id) {
          totalReport++;
        }
      }
    }

    return totalReport;
  }

  getNodoPrincipal = () => { 
    let persona = {};

    for (let p of datos) {
      if (p.id === p.idParent) {
        persona = p;
        break;
      }
    }

    let nodo = {
      id: persona.id,
      person: {
        avatar: avatarPersonnel,
        department: persona.department,
        name: persona.name,
        title: persona.title,
        totalReports: this.getTotalReport(persona.id),
      },
      hasChild: (this.getTotalReport(persona.id) > 0) ? true : false,
      hasParent: (persona.id === persona.idParent) ? false : true,
      children: [],
    };

    return nodo;
  }

  getChild = (id) => {
    let hijos = [];

    for (let p of datos) {
      if (p.id !== p.idParent) {
        if (p.idParent === id) {
          let nodo = {
            id: p.id,
            person: {
              avatar: avatarPersonnel,
              department: p.departament,
              name: p.name,
              title: p.title,
              totalReports: this.getTotalReport(p.id),
            },
            hasChild: (this.getTotalReport(p.id) > 0) ? true : false,
            hasParent: (p.id === p.idParent) ? false : true,
            children: [],
          }

          hijos.push(nodo);
        }
      }
    }

    return hijos;
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  render() {
    const { tree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >
                +
              </button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >
                -
              </button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">
                Download as image
              </button>
              <button className="btn btn-outline-primary" id="download-pdf">
                Download as PDF
              </button>
              <a
                className="github-link"
                href="https://github.com/unicef/react-org-chart"
              >
                Github
              </a>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            <OrgChart
              tree={tree}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
              loadChildren={d => {
                const childrenData = this.getChild(d.id)
                return childrenData
              }}
            />
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
