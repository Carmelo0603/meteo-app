import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import MyNavbar from "./MyNavbar";

const WeatherDetails = () => {
  const params = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = "4581ed4a75ffef0475104ebe50dad4bb";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${API_KEY}&units=metric&lang=it`);

        if (!resp.ok) {
          throw new Error("Errore nel recupero dati meteo (Chiave errata o città inesistente)");
        }

        let weatherData = await resp.json();
        setWeather(weatherData);

        try {
          let lat = weatherData.coord.lat;
          let lon = weatherData.coord.lon;

          let respForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`);

          if (respForecast.ok) {
            let forecastData = await respForecast.json();
            if (forecastData.list) {
              const dailyForecast = forecastData.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
              setForecast(dailyForecast);
            }
          } else {
            console.warn("Previsioni non disponibili (probabilmente API Key in fase di attivazione)");
          }
        } catch (errorForecast) {
          console.error("Errore fetch previsioni:", errorForecast);
        }

        setError(false);
      } catch (err) {
        console.error("Errore Principale:", err);
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
        Ops! Qualcosa è andato storto. <br />
        Controlla di aver scritto bene la città o verifica che la tua API Key sia attiva. <br />
        <Link to="/" className="btn btn-outline-danger mt-3">
          Riprova
        </Link>
      </Alert>
    );

  const getWeatherClass = () => {
    if (!weather) return "bg-default";
    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("clear")) return "bg-sunny";
    if (main.includes("cloud")) return "bg-cloudy";
    if (main.includes("rain") || main.includes("drizzle")) return "bg-rainy";
    if (main.includes("snow")) return "bg-snowy";
    if (main.includes("thunderstorm")) return "bg-stormy";

    return "bg-default";
  };

  return (
    <>
      <MyNavbar></MyNavbar>;
      <Container fluid className={`p-5 min-vh-100 ${getWeatherClass()}`}>
        <Link to="/" className="btn btn-outline-secondary mb-3">
          Indietro
        </Link>

        {weather && (
          <Card className="text-center mb-4 p-4 shadow-lg border-0 glass-card bg-opacity-10">
            <Card.Body>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="display-1">{Math.round(weather.main.temp)}°C</div>
              <p className="lead text-capitalize">{weather.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icona meteo" />
              <p>
                Umidità: {weather.main.humidity}% | Vento: {weather.wind.speed} m/s
              </p>
            </Card.Body>
          </Card>
        )}

        <h3 className="mb-3">Prossimi 5 Giorni (ore 12:00)</h3>
        {forecast.length > 0 ? (
          <Row className="d-flex justify-content-center">
            {forecast.map((day, index) => (
              <Col key={index} md={4} xs={6} lg={3} className="mb-3 mt-3">
                <Card className="h-100 text-center border-0 shadow-sm glass-card">
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      {new Date(day.dt * 1000).toLocaleDateString("it-IT", { weekday: "short", day: "numeric" })}
                    </Card.Title>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                    <div className="fw-bold">{Math.round(day.main.temp)}°C</div>
                    <small className="text-muted">{day.weather[0].description}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="warning">Previsioni non ancora disponibili (verifica API Key).</Alert>
        )}
      </Container>
    </>
  );
};

export default WeatherDetails;
