import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

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
    <>
      <Container fluid className="text-center m-0 p-4 align-items-center">
        <Row className="d-flex justify-content-center ">
          <Col md={6}>
            <h1>Che tempo fa?</h1>
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
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
