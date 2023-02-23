import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { BASE_URL } from 'utils/helpers'
import { useRouter } from 'next/router'

export default function Home() {
    const [name, setName] = useState("")
    const [file, setFile] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleAddButton = (e: any) => {
        e.preventDefault()
        console.log("Add button clicked", name, file)
        if (!name || !file) {
            console.log("Please fill all fields")
            alert("Please fill all fields")
            return
        }
        //Upload image to m1r.ai
        //Formdata body
        const formData = new FormData()
        formData.append("file", file)
        formData.append("uploadType", "0")
        setIsLoading(true)
        fetch("https://up.m1r.ai/upload", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    image: data.url
                })
            }).then((res) => {
                //Redirect to property page
                router.push("/property")
                setIsLoading(false)
            }).catch((err) => {
                console.log("Error", err)
                setIsLoading(false)
            })
        }).catch((err) => {
            console.log("Error", err)
            setIsLoading(false)
        })

    }
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
            <main className={styles.main}>
                <Card>
                    <Card.Body>
                        <p>Add your property</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
                            <Form.Control
                                placeholder="name"
                                aria-label="name"
                                aria-describedby="basic-addon1"
                                onChange={
                                    (e: any) => {
                                        setName(e.target.value)
                                    }
                                }
                            />
                        </InputGroup>
                        <Form.Control type="file" id="###" aria-label="sdasd" name="name" onChange={
                            (e: any) => {
                                setFile(e.target.files[0])
                            }
                        } />
                        <Button className="button" variant="success" type="submit"
                            disabled={isLoading}
                            onClick={handleAddButton}>
                            {isLoading ? "Loading…" : "Add"}
                        </Button>
                    </Card.Body>
                </Card>
            </main>
        </>
    )
}
