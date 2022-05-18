import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart/src'
import { BrowserRouter, Route } from 'react-router-dom'
import tree from './TreeOrg'
import avatarPersonnel from './assets/avatar-personnel.svg'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
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
    //const downloadImageId = 'download-image'
    //const downloadPdfId = 'download-pdf'

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
              onConfigChange={(config) => {
                this.handleOnChangeConfig(config);
              }}
              loadConfig={(d) => {
                let configuration = this.handleLoadConfig(d);
                if (configuration) {
                  return configuration;
                }
              }}
              loadImage={(d) => {
                return Promise.resolve(() => avatarPersonnel);
              }}
            />
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
