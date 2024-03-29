import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from 'utils/helpers';

interface DisplayCardProps {
  name: string;
  id: string;
  image: string;
  onClickShow: (id: string) => void;
}

const DisplayCard = ({ name, id, image, onClickShow }: DisplayCardProps) => {
  return (
    <Card style={{ width: '18rem', textAlign: "center", margin: "0.5rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {id}
        </Card.Text>
        <div style={{ textAlign: "center" }}>
          <Button variant="success" onClick={() => onClickShow(id)}>Show</Button>{' '}
        </div>
      </Card.Body>
    </Card>
  )
}

interface Property {
  _id: string;
  name: string;
  image: string;
}

export default function Home() {
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState<Property[]>([]);
  const [modalData, setModalData] = useState<Property | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = (id: string) => {
    setShow(true);
    setModalData(property.find((item) => item._id === id) || null)
  }
  const fetchProperty = async () => {
    const rest = await fetch(BASE_URL)
    const data = await rest.json()
    setProperty(data)
  }
  React.useEffect(() => {
    fetchProperty()
  }, [])
  return (
    <>

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/property">Property Recode</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Add-property">ADD PROPERTY</Nav.Link>
            <Nav.Link href="/property">PROPERTY</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <main>

        <div className='propertyItam'>
          {
            property.map((item) => {
              return (
                <DisplayCard
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  image={item.image}
                  onClickShow={handleShow}
                />
              )
            })
          }
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Card style={{ width: 'full', textAlign: "center" }}>
              <Card.Img variant="top" src={modalData?.image} />
              <Card.Body>
                <Card.Title>{modalData?.name}</Card.Title>
                <Card.Text>
                  {modalData?._id}
                </Card.Text>
                <div style={{ textAlign: "center" }}>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Modal>
        </div>
      </main>
    </>
  )
}
