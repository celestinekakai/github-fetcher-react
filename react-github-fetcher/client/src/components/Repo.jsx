import React from 'react';

var Repo = (props) => {
  return (
    <div id="repo">
      <h5 id="user"><b>Repo Owner:</b> {props.repoUser}</h5>
      <h3 id="name"><a href={props.repoLink} target="_blank">{props.repoName}</a></h3>
      <h5 id="forks">Forks: {props.repoForks.toLocaleString('en-US')}</h5>
    </div>
  )
}

export default Repo;