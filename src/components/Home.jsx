import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import WeatherChart from "./WeatherChart";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const API_KEY = "4581ed4a75ffef0475104ebe50dad4bb";

  useEffect(() => {
    const fetchDemoData = async () => {
      try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Roma&appid=${API_KEY}&units=metric&lang=it`);
        const data = await resp.json();
        if (data.list) {
          setChartData(data.list);
        }
      } catch (error) {
        console.error("Errore caricamento demo:", error);
      }
    };

    fetchDemoData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      navigate(`/details/${city}`);
    } else {
      alert("Scrivi qualcosa, genio!");
    }
  };

  return (
    <>
      <Container fluid className="text-center m-0 p-4 align-items-center  ">
        <Row className="d-flex justify-content-center flex-grow-1 m-0  ">
          <Col md={6} className="">
            <h1 className=" justify-content-start">Che tempo fa?</h1>
            <p>Decidi se portarti l'ombrello a Sommatino o alle Maldive.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Inserisci città (es. Catania)" value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Cerca
              </Button>
            </Form>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>Scopri il meteo!</Card.Header>
              <Card.Body>
                <Card.Title>GoodTime EveryTime</Card.Title>
                <Card.Text>In questo spazio puoi cercare tutto il meteo che vuoi quando vuoi, GRATISSSSS</Card.Text>
                <Button variant="primary">Guarda il meteo</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {chartData && (
          <Row className="justify-content-center w-100 my-3 p-0 ">
            <Col md={10} lg={8}>
              <div className="fade-in-up">
                <WeatherChart data={chartData} />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
