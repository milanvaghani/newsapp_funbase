import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // Now Only Put API Id from newsapi from generating fake mail and put api id into app.js in const apiKey="key"
  //   api will be deleted search on newsapi and find same api by business like any;
  // https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1978057013f94492a4d2a48f736a6017
  const updateNews=async()=>{
      props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log("Array",parsedData); Api Fetch karvi tyare data aave 6 ke nai e jova
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, [])
  
  // Buttons Prev And Next
//   const handlePrevClick = async () => {
//     // let url = `https://newsapi.org/v2/top-headlines?country=${
//     //   props.country
//     // }&category=${
//     //   props.category
//     // }&apiKey=1978057013f94492a4d2a48f736a6017&page=${
//     //   this.state.page - 1
//     // }&pageSize=${props.pageSize}`;
//     // this.setState({ loading: true });
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // this.setState({
//     //   page: this.state.page - 1,
//     //   articles: parsedData.articles,
//     //   loading: false,
//     // });
//     setPage(page - 1);
//     updateNews();
// };
//   const handleNextClick = async () => {
//     // if (
//     //   !(
//     //     this.state.page + 1 >
//     //     Math.ceil(this.state.totalResults / props.pageSize)
//     //   )
//     // ) {
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${
//     //     props.country
//     //   }&category=${
//     //     props.category
//     //   }&apiKey=1978057013f94492a4d2a48f736a6017&page=${
//     //     this.state.page + 1
//     //   }&pageSize=${props.pageSize}`;
//     //   this.setState({ loading: true });
//     //   let data = await fetch(url);
//     //   let parsedData = await data.json();
//     //   this.setState({
//     //     page: this.state.page + 1,
//     //     articles: parsedData.articles,
//     //     loading: false,
//     //   });
//     // }
//     setPage(page + 1);
//     updateNews();
//   };

  const fetchMoreData = async() => {
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
       
        {/* Buttons Of Previous And Next
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

export default News;
