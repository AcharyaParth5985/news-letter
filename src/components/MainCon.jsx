import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";


function MainContent({cat,adata}) {
  
  // console.log( cat+"maincont"+ adata);
  return (
    <>
      <div className="catogary">
        <aside>
          <div>
            <div className="issue">
              <Link to="/" > <span id="catogaryName"> {cat} </span> New's </Link>
            </div>
            <div className="issue">
              <Selector data={adata} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}


function Selector({data}) {
  // console.log("selector" +data);
  return <>
    <div className="container">
  <button className="btn"><span>Change Catogary</span><i className="material-icons"></i>
    <nav><ul className="dropdown">
    <li key={"all"}><Link to="/">All</Link></li>
        {
          data.map((values) => {
            return (
              <li key={values.topic}><Link to={"/"+values.topic} >{values.label}</Link></li>
              );
            })
          }
    </ul></nav>
  </button>
</div>
<Outlet/>
  </>;
}

function CatogaryNews({ catg }) {
  
  // console.log("called : "+catg );
  const [mydata, setData] = useState([]);
  
  


  function upCatog(catg) {
    document.getElementById("catogaryName").innerHTML = catg;
  }

  useEffect(()=>{
    let url = `https://inshorts.me/news/topics/${catg}?offset=0&limit=10`;
  if(catg === "all"){
    url = "https://inshorts.me/news/all?offset=0&limit=10"
  }

    fetch(url)
    .then((responce) => responce.json())
    .then((json)=> setData(json.data.articles) )
    .catch((err)=>console.log("err"+err));

    upCatog(catg);

    },[catg]);

  if (mydata.length >0 ) {
    
  return (
    <>
    <div className="main-title multi-column ">
      {mydata.map((values) => {
        return Cards(values);
      })}
      </div>
    </>
  );
  }else{
    // console.log("length zero");
    return(
        <>
            <h1>Data not found</h1>
        </>
    );
  }

  
}

function Cards({ hashId, sourceUrl, content, title, imageUrl }) {
    // console.log(title);
  return (
      <div className="cards" key={hashId}>
        <a
          className="item-with-image plan span--2 long--2 "
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img alt={hashId} src={imageUrl} />
          <h4>{title}</h4>
          <div>
            <p>{content}</p>
          </div>
        </a>
      </div>
    );
  }
export default MainContent;
export {CatogaryNews};
