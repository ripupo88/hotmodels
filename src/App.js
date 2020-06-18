import React, { useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ScriptTag from "react-script-tag";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

let init = [
  { link: "https://i.imgur.com/gvO4zNP.jpg" },
  { link: "https://i.imgur.com/guM9nbb.jpg" },
  { link: "https://i.imgur.com/OXR1aWn.jpg" },
];

let fetchingImgs = async (page) => {
  let imgArray = await fetch(
    `https://api.imgur.com/3/account/me/images/${page}`,
    {
      headers: {
        Authorization: "Bearer 14e88fb8d72d08112c613f46f837d9b133e75264",
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      return response.data;
    });
  return imgArray;
};

let count = 0;

function App() {
  //const [page, setPage] = useState(0);
  const [item, setItem] = useState(init);

  console.log(item);

  let fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   setItem(item.concat(Array.from({ length: 20 })));
    // }, 1500);
    setItem(item.concat(await fetchingImgs(count)));
    count++;
    console.log(count);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={item.length}
        next={() => {
          fetchMoreData();
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {item.map((i, index) => (
          <div>
            <img style={{ maxWidth: "100%" }} src={i.link}></img>
            {index % 10 == 2 && (
              <div>
                {/* <script type="text/javascript" data-cfasync="false" async src="https://poweredby.jads.co/js/jads.js"></script> */}
                {/* <script type="text/javascript" data-cfasync="false" async>(adsbyjuicy = window.adsbyjuicy || []).push({{'adzone':852922}});</script> */}
                <ScriptTag
                  type="text/javascript"
                  data-cfasync="false"
                  async
                  src="https://poweredby.jads.co/js/jads.js"
                ></ScriptTag>
                <ins id="852922" data-width="100%" data-height="375px"></ins>
                <ScriptTag type="text/javascript" data-cfasync="false" async>
                  (adsbyjuicy = window.adsbyjuicy || []).push(
                  {JSON.stringify({ adzone: 852922 })})
                </ScriptTag>
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
