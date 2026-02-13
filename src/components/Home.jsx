import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      navigate(`/details/${city}`);
    } else {
      alert("Scrivi qualcosa, genio!");
    }
  };

  return (
    <Container className="text-center mt-5">
      <h1>Che tempo fa?</h1>
      <p>Decidi se portarti l'ombrello a Sommatino o alle Maldive.</p>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="text" placeholder="Inserisci città (es. Catania)" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Cerca
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
