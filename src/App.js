import React, { useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

let fetchingImgs = async(page)=>{

  let imgArray = await fetch(`https://api.imgur.com/3/account/me/images/${page}`,
  {headers:{Authorization:"Bearer 14e88fb8d72d08112c613f46f837d9b133e75264"}})
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {    
    return response.data
  });
  return imgArray;

}

function App() {
  const [page, setPage] = useState(0);
  const [item, setItem] = useState([{link:"https://i.imgur.com/gjPG9Hf.jpg"},{link:"https://i.imgur.com/gjPG9Hf.jpg"},{link:"https://i.imgur.com/gjPG9Hf.jpg"}]);
  
  console.log(item)

  let fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   setItem(item.concat(Array.from({ length: 20 })));
    // }, 1500);
    setPage(page+1);
    setItem(item.concat(await fetchingImgs(page)));
    
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={item.length}
        next={() => {
          fetchMoreData();
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {item.map((i, index) => (
          <img style={{maxWidth: "100%" }} src={i.link}></img>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
