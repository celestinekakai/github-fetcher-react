import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    console.log('Making Request for data...')
    this.grabRepos((response) => {
      this.setState({
        repos: response
      })
    })
  }

  grabRepos(callback) {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: callback
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify({data: term}),
      success: (response) => {
        this.setState({
          repos: response
        })
      },
      error: () => {}
    })
  }

  render () {
    return (
      <div>
        <div className="top-container">
          <div id="title-container">
            <img id="title-logo" src="./logo-white.png" />
            <h1 id="title">Github Fetcher</h1>
          </div>
          <h4 id="title-slogan">A Hack Reactor Project</h4>
        </div>
        <Search onSearch={this.search.bind(this)} repos={this.state.repos}/>
        <RepoList repos={this.state.repos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));