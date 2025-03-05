import React from 'react';
import { Container, Carousel, Button } from "react-bootstrap";
import banner1 from "../assets/img/banner1.png";
import banner2 from "../assets/img/banner2.png";
import banner3 from "../assets/img/banner3.png";
import banner4 from "../assets/img/banner4.png";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <Container fluid className="p-0" style={{ height: '450px' }}>
                <Carousel>
                 <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={banner1}
                            style={{ height: '420px', objectFit: 'cover' }}                           
                        />
                <Carousel.Caption className="d-flex flex-column justify-content-center align-items-start h-100">
                  <div className="text-center">
                    <h2 style={{ fontSize: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.27)' }}>
                        Compra y Venta de
                    </h2> 
                    <div style={{ fontSize: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.56)' }}>
                    <p>Productos de aseo</p>
                    <p>Ropa de seguridad</p>
                    <p>Productos de librería</p>
                  </div>
                  <Link to="/Gallery">
                  <Button variant="primary">Ver catálogo</Button> 
                  </Link>
                 </div>
                </Carousel.Caption>
              </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner2}
                        style={{ height: '420px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100">
                        <h2 style={{  backgroundColor: 'rgba(0, 0, 0, 0.56)',}}>
                            Productos hasta un 50% de descuento
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner3}
                        style={{ height: '420px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption 
                    className="d-flex flex-column justify-content-center align-items-center h-100">
                        <h2 style={{  backgroundColor: 'rgba(0, 0, 0, 0.56)',}}>
                            Insumos para oficina y particulares
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner4}
                        style={{ height: '420px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100">
                        <h2 style={{  backgroundColor: 'rgba(0, 0, 0, 0.56)',}}>
                            Comercializamos todas las marcas
                        </h2>
                    </Carousel.Caption>
                </Carousel.Item>

                </Carousel>
            </Container>
        </div>
    );
};

export default Banner;
