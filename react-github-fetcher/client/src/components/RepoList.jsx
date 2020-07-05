import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div id="section-three">
    {/* There are {props.repos.length} repos. */}
    {
      props.repos.map((repo, index) => {
        return (<div key={index}>
          <Repo repoName={repo.repo_name} repoUser={repo.repo_user} repoForks={repo.forks} repoLink={repo.html_url} />
        </div>)
      })
    }
  </div>
)

export default RepoList;