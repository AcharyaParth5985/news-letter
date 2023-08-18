import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Title, { Footer, One, Sidebar } from './components/Header';
import MainContent, { CatogaryNews } from './components/MainCon';
import { useEffect, useState } from "react";

function App() {
  const [mydata, setData] = useState([]);
  let catogary = "all"

  useEffect(()=>{
    fetch("https://inshorts.me/news/topics")
    .then((responce) => responce.json())
    .then((json)=> setData(json.data.topics) )
    .catch((err)=>console.log("err"+err));
    },[]);

  // console.log(mydata);

  return (
    <main>
      <Title />
      <One/>
      <Router basename='/the-daily-bugle'>
        <MainContent cat={catogary} adata={mydata}/>
        <Routes>
          <Route key="one" path='/' element={<CatogaryNews catg='all' />}/>
          {
            mydata.map(
              (values)=>{
                // console.log("/"+values.topic);
                return(
                  <Route key={values.hashId} path={"/"+values.topic} element={<CatogaryNews catg={values.topic}/>}/>
                );
              }
            )
          }

        </Routes>
      </Router>
        <Sidebar />
      <Footer />
      
    </main>
  );
}

export default App;
