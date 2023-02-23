import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const password = "1234"
  const [passwordInput, setPasswordInput] = useState("")
  const router = useRouter()
  const handleLoginButton = (e: any) => {
    e.preventDefault()
    console.log("Login button clicked", passwordInput)
    if (passwordInput === password) {
      console.log("Password correct")
      router.push("/property")
    }
  }
  return (
    <>

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Property Recode</Navbar.Brand>
        </Container>
      </Navbar>
      <main className={styles.main}>
        <Card><Card.Body><Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onInput={(e: any) => {
              console.log("Password input changed", e.target.value);
              setPasswordInput(e.target.value)
            }} />
            <Form.Text className="text-muted">
              Please enter your password to use the system.
            </Form.Text>
          </Form.Group>
          <Button variant="success" type="submit" onClick={handleLoginButton}>
            Login
          </Button>
        </Form>
        </Card.Body>
        </Card>
      </main>

    </>
  )
}
