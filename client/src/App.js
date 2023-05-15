import logo from './logo.svg';
import './App.css';
import Qrcode from './Qrcode';

function App() {
  function iterateDots(){
    var el = document.getElementById("dots");
    var dotsStr = el.innerHTML;
    console.log(dotsStr);
    var dotsLen = dotsStr.length;
    console.log(dotsLen);

    var maxDots = 3;
    el.innerHTML = (dotsLen < maxDots ? dotsStr + '.' : dotsStr='');
}

function startLoading(){
    const intervalMs = 1000;

    let interval = setInterval(iterateDots, intervalMs);
}  
  return (
    <div onLoad={startLoading()} className="App flex-center height">
      <Qrcode></Qrcode>
    </div>
  );
}

export default App;
