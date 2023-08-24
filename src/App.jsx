import React , {useState , useEffect , useRef} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const key = "e2dcf91b99b0496eb3180844232408";

function App() {

  const [city,setCity] = useState('Noida');
  const [values,setValues] = useState({});

  const cityRef = useRef();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
};

  const submit = () => {
    setShow(false);
    setCity(cityRef.current.value);
  };

  const handleShow = () => setShow(true);

  //console.log(values);
  //console.log(w);

  useEffect(() => {
    const fetchAllData = async () => {
      const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`);
      //console.log(data);
      //console.log(city);
      const current=data.current;
      setValues(current);
    };
    fetchAllData();
  },[city]);

  return (
    <div className="App">
      <div className="container">
        <h1>Mausam</h1>
        <h2>{city}</h2>
        <div className="box1">
          <div className="item1">
            <img src={values?.condition?.icon} alt={values?.current?.text}></img>
            <figcaption>{values?.condition?.text}</figcaption>
          </div>
          <div className="item2">
            <h1>{values?.temp_c}°C</h1>
          </div>
        </div>
        <div className="box2">
          <div className="item1">
            <h1>{values?.humidity}%</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>Relative Humidity</caption>
          </div> 
          <div className="item2">
            <h1>{values?.feelslike_c}°C</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>Feels Like</caption>
          </div>
          <div className="item3">
            <h1>{values?.pressure_mb}hpa</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>Pressure</caption>
          </div>
        </div>
        <div className="box3">
          <div className="item1">
            <h1>{values?.uv}</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>UV Index</caption>
          </div> 
          <div className="item2">
            <h1>{values?.wind_kph}Km/h</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>Wind</caption>
          </div>
          <div className="item3">
            <h1>{values?.precip_mm}</h1>
            <caption style={{color:'#bbb',fontSize:'20px',fontWeight:'bold'}}>Precipitation</caption>
          </div>
        </div>
        <div className='footer'>
          <Button variant="primary" className='change-location-button' onClick={handleShow}>Change Location</Button>

          <Modal show={show} onHide={handleClose} className='modal' style={{backgroundColor: '#17141f'}}>
            <Modal.Header closeButton>
              <Modal.Title className='modal-title'>Change Location</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
              <h2 style={{color: '#593196'}}>City</h2>
                <input type="text" ref={cityRef}/><br />
            </Modal.Body>
            <Modal.Footer className='footer-modal'>
              <Button variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" classname='submit-button' onClick={submit} style={{backgroundColor: '#6610f2',
  borderColor: '#6610f2'}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <p>{values?.last_updated}</p>
        </div>
      </div>
    </div>
  );
}

export default App;