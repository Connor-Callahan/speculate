import React from 'react';

const NewsFeed = (props) => {

    return (
      <div id="news-feed">
      <h1> News Feed </h1>
      {
        props.newsFeed.length < 2 ?
        <h1>loading...</h1>
        :
        props.newsFeed.map( article => {
          if(article.multimedia.length > 2 ) {
            return <div className="article">
            <h3 className="article-header"><a target="_blank" rel="noopener noreferrer" href={article.short_url}>{article.title}</a></h3>
            <img className="article-image" src={article.multimedia[1].url}/>
            <p> {article.abstract}</p>
            </div>
          }
        })
      }
      </div>
    );
  }

export default NewsFeed;
