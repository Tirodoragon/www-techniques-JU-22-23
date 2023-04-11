import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Pupile from "./pages/pupile";
import Fundacje from "./pages/fundacje";
import Kontakt from "./pages/kontakt";
import Pytania from "./pages/pytania";
import Logowanie from "./pages/logowanie";
import Rejestracja from "./pages/rejestracja";
import {useEffect} from "react";

function App() {
  function responsiveNav() {
    let element = document.getElementById("mynav");
    if (element.className === "mynav") {
      element.className += " responsive";
    } else {
      element.className = "mynav";
    }
  }
  useEffect(()=>{
    let atags = document.querySelector(".mynav").getElementsByTagName("a");
    for (let i = 0; i < atags.length; i++) {
      atags[i].classList.remove("active");
      if (atags[i].href === window.location.href) {
        atags[i].classList.add("active");
      }
    }
  }, [])
  let log = <a href="/logowanie" style={{float: 'right'}}>Logowanie</a>
  if (sessionStorage.getItem("token")) {
    log = <a href="#" onClick={()=>{
      sessionStorage.clear()
      window.location.reload()
    }} style={{float: 'right', backgroundColor: 'red'}}>Wyloguj</a>
  }
  return (
    <div className="App">
      <header>
        <nav className="mynav" id="mynav">
          <a href="/" className="active">Strona główna</a>
          <a href="/pupile">Wasze pupile</a>
          <a href="/pytania">Wasze pytania</a>
          <a href="/fundacje">Polecane fundacje</a>
          <a href="/kontakt">Kontakt</a>
          {log}
          <a href="javascript:void(0);" className="icon" onClick="responsiveNav()">
            <i className="fa fa-bars"/>
          </a>
        </nav>
        <div className="banner">
          <img src={require ("./pages/images/banner.webp")} alt="baner"/>
          <div>
            <h1>Królicza nora</h1>
            <h4>Strona o królikach</h4>
          </div>
        </div>
      </header>
      <Router>
        <Routes>
          <Route exact path = "/" element = {<Home/>} />
          <Route exact path = "/pupile" element = {<Pupile/>} />
          <Route exact path = "/fundacje" element = {<Fundacje/>} />
          <Route exact path = "/kontakt" element = {<Kontakt/>} />
          <Route exact path = "/pytania" element = {<Pytania/>} />
          <Route exact path = "/logowanie" element = {<Logowanie/>} />
          <Route exact path = "/rejestracja" element = {<Rejestracja/>} />
        </Routes>
      </Router>
      <footer>
        <p>© Tomasz Rączkowski, data ostatniej modyfikacji: luty 2023</p>
      </footer>
    </div>
  );
}

export default App;
