import React, { useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

function App() {
  const [item, setItem] = useState(Array.from({ length: 20 }));

  let fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setItem(item.concat(Array.from({ length: 20 })));
    }, 1500);
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
          <img src="./img/IMG-20171207-WA0000.jpg"></img>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
