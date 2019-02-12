import React from 'react';

const NewsFeed = (props) => {

    return (
      <div id="news-feed">
        <img id="nytimes" alt="nytimes" src={ require("../nytimes.png") } />
      {
        props.newsFeed.length < 2 ?
        <h1>loading...</h1>
        :
        props.newsFeed.map( article => {
          if(article.multimedia.length > 2 ) {
            return <div  key={Math.random()} className="article">
            <h3 className="article-header"><a target="_blank" rel="noopener noreferrer" href={article.short_url}>{article.title}</a></h3>
            <img className="article-image" alt="" src={article.multimedia[1].url}/>
            <p className="article"> {article.abstract}</p>
            </div>
          }
          return null

        })

      }
      </div>
    );
  }

export default NewsFeed;


// code to display dates
//<h4>{article.created_date.substring(0, Math.min(article.created_date.length, 10))}</h4>
