import { useEffect, useState } from "react";

function Title() {
  return (
    <>
      <h1> The Daily Bugle</h1>
      <aside>
        <div>
          <div  className="issue">{TodaysDate("day")}</div>
          <div className="date"> {TodaysDate("date")}</div>
          <div className="edition">new INDIA</div>
        </div>
      </aside>
    </>
  );
}

function One() {
  const [mydata, setData] = useState([]);

  const apiget = () => {
    fetch("https://inshorts.me/news/trending?offset=0&limit=1")
      .then((response) => response.json())
      .then((json) => {
       
        setData(json.data.articles[0]);
      });
  };

  useEffect(() => {
    apiget();
    const interval = setInterval(() => {
      apiget();
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="title--large main-title">{mydata.title}.</h2>
      <div className="main-text multi-column">
        <p>{mydata.content}</p>
        <p>{mydata.subtitle}</p>
        <p><em>Auther Name :</em> {mydata.authorName} <br /> <br /> <em>Source Name : </em>{mydata.sourceName}</p>
      </div>
      <a
        className="terrarium"
        href={mydata.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        <figure>
          <img src={mydata.imageUrl} alt={mydata.imageUrl} />
          <figcaption>
            click above image to dicsover more ..
          </figcaption>
        </figure>
      </a>
    </>
  );
}

function Footer() {
  return (
    <>
      <h1 style={{ borderTop: " 2px Solid var(--black)" , paddingtop: "10px" }} > The End. </h1>
      
    </>
  );
}

function Sidebar() {
  const [mydata, setData] = useState([]);

  const apiget = () => {
    fetch(`https://inshorts.me/news/top?offset=0&limit=5`)
      .then((response) => response.json())
      .then((json) => {
      
        setData(json.data.articles);
      });
  };
  useEffect(() => {
    apiget();
    const interval = setInterval(() => {
      apiget();
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="sidebar">
        <h3 className="title--big"> Today's Top </h3>
        {mydata.map((values) => {
          return Sidecard(values);
        })}
      </div>
    </>
  );
}

function Sidecard({hashId, subtitle, content, imageUrl, sourceUrl, title }) {
  return (
    <div key={hashId}>
      <a key={hashId}
      rel="noreferrer"
        style={{ marginBottom: 20 }}
        className="codepen-item pie"
        href={sourceUrl}
        target="_blank"
      >
        <img className="pie__image" src={imageUrl} alt={imageUrl} />
        <div className="pie__subtitle">{title} </div>
        <div className="pie__content">
          <h4>{subtitle}</h4>
          <p>{content}</p>
        </div>
      </a>
    </div>
  );
}

function TodaysDate(what) {
  const current = new Date();
  let day = current.getDay();
  const date = current.getDate();
  let month = current.getMonth();
  const year = current.getFullYear();

  const dayname = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthname = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  day = dayname[day];
  month = monthname[month];

  const today = `${date} ${month} ${year}`;

  if (what === "day") return day;
  else if (what === "date") return today;
  else return day + today;
}

export default Title;
export { Footer, Sidebar, One };
