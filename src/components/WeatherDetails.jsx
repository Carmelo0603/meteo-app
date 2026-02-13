import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const WeatherDetails = () => {
  const params = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = "ef1a9c1ac88954fc2f872e44c97a9eeb";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${API_KEY}&units=metric&lang=it`);
        if (!resp.ok) throw new Error("Città non trovata");
        let weatherData = await resp.json();

        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;

        let respForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`);
        let forecastData = await respForecast.json();

        const dailyForecast = forecastData.list.filter((reading) => reading.dt_txt.includes("12:00:00"));

        setWeather(weatherData);
        setForecast(dailyForecast);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.city]);

  if (loading) return <Spinner animation="border" variant="primary" className="mt-5" />;
  if (error)
    return (
      <Alert variant="danger" className="mt-5">
        Città non trovata o errore API. <Link to="/">Riprova</Link>
      </Alert>
    );

  return (
    <Container className="mt-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Indietro
      </Link>

      {weather && (
        <Card className="text-center mb-4 p-4 shadow-lg border-0 bg-info bg-opacity-10">
          <Card.Body>
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="display-1">{Math.round(weather.main.temp)}°C</div>
            <p className="lead text-capitalize">{weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icona meteo" />
            <p>
              Umidità: {weather.main.humidity}% | Vento: {weather.wind.speed} m/s
            </p>
          </Card.Body>
        </Card>
      )}

      <h3 className="mb-3">Prossimi 5 Giorni (ore 12:00)</h3>
      <Row>
        {forecast.map((day, index) => (
          <Col key={index} md={2} xs={6} className="mb-3">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>
                  {new Date(day.dt * 1000).toLocaleDateString("it-IT", { weekday: "short", day: "numeric" })}
                </Card.Title>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                <div className="fw-bold">{Math.round(day.main.temp)}°C</div>
                <small className="text-muted">{day.weather[0].description}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherDetails;
