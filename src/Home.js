import Lgnav from "./Component/Nav";

import Row from 'react-bootstrap/Row';

import Container from "react-bootstrap/Container";
import Movies from "./Component/Home";
export default function Home(){
    return (
       <Container fluid>
        <Row >
<Lgnav/>
        </Row>
        <Row className="mt-3">
<Movies/>
        </Row>
       </Container>
    )
}