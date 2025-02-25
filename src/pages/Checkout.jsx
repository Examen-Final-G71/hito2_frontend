import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const shippingCost = 7500;

const Checkout = () => {
  const { cart, getCartTotal, getItemTotal, clearCart, getImageUrl } = useContext(AppContext);
  const [shippingMethod, setShippingMethod] = useState("retiro"); // "despacho" o "retiro"
  const [paymentMethod, setPaymentMethod] = useState(""); // Opción de pago seleccionada
  const navigate = useNavigate();


  const baseTotal = getCartTotal();
  // Si es despacho, sumar el costo; de lo contrario, 0
  const finalTotal = shippingMethod === "despacho" ? baseTotal + shippingCost : baseTotal;

  const handleConfirmPayment = () => {
    Swal.fire({
      title: "Pago confirmado",
      text: "Tu pago ha sido procesado exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      clearCart();
      navigate("/");
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Resumen de Pago</h2>
      

      {cart.map((item) => (
        <Card key={item.id} className="mb-3">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img 
                variant="top" 
                src={getImageUrl(product.imagen)}
                alt={product.nombre}
                style={{ height: "150px", objectFit: "cover" }} 
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
                <Card.Text>
                  Precio unitario: ${item.precio}
                </Card.Text>
                <Card.Text>
                  Cantidad: {item.quantity} — Total: ${getItemTotal(item).toFixed(0)} CLP
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

    
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Método de Envío</Card.Title>
          <Form>
            <Form.Check
              inline
              type="radio"
              label="Retiro"
              name="shippingMethod"
              id="retiro"
              value="retiro"
              checked={shippingMethod === "retiro"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              label={`Despacho (+ $${shippingCost} CLP)`}
              name="shippingMethod"
              id="despacho"
              value="despacho"
              checked={shippingMethod === "despacho"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
          </Form>
        </Card.Body>
      </Card>

 
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Método de Pago</Card.Title>
          <Form>
            <Form.Check
              type="radio"
              label="Tarjeta de Crédito/Débito"
              name="paymentMethod"
              id="tarjeta"
              value="tarjeta"
              checked={paymentMethod === "tarjeta"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Transferencia Bancaria"
              name="paymentMethod"
              id="transferencia"
              value="transferencia"
              checked={paymentMethod === "transferencia"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
    
          </Form>
        </Card.Body>
      </Card>


      <Row className="mb-3">
        <Col md={6}>
          <h5>Total sin envío: ${baseTotal.toFixed(0)} CLP</h5>
        </Col>
        <Col md={6} className="text-end">
          <h5>Total a pagar: ${finalTotal.toFixed(0)} CLP</h5>
        </Col>
      </Row>

      <div className="text-center">
        <Button variant="success" onClick={handleConfirmPayment}>
          Confirmar Pago
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;


/*import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const shippingCost = 4500; // 4.500 CLP

const Checkout = () => {
  const { cart, getCartTotal, getItemTotal, clearCart } = useContext(AppContext);
  const [shippingMethod, setShippingMethod] = useState("retiro"); // "despacho" o "retiro"
  const [paymentMethod, setPaymentMethod] = useState(""); // Opción de pago seleccionada
  const navigate = useNavigate();

  // Calcular total base sin envío
  const baseTotal = getCartTotal();
  // Si es despacho, sumar el costo; de lo contrario, 0
  const finalTotal = shippingMethod === "despacho" ? baseTotal + shippingCost : baseTotal;

  const handleConfirmPayment = () => {
 Swal.fire({
      title: "Pago confirmado",
      text: "Tu pago ha sido procesado exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      clearCart();
      navigate("/");
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Resumen de Pago</h2>
      
      {cart.map((item) => (
        <Card key={item.id} className="mb-3">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img 
                variant="top" 
                src={item.image} 
                alt={item.title} 
                style={{ height: "150px", objectFit: "cover" }} 
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>
                  Precio unitario: {item.price}
                </Card.Text>
                <Card.Text>
                  Cantidad: {item.quantity} &mdash; Total: ${getItemTotal(item).toFixed(0)} CLP
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Método de Envío</Card.Title>
          <Form>
            <Form.Check
              inline
              type="radio"
              label="Retiro"
              name="shippingMethod"
              id="retiro"
              value="retiro"
              checked={shippingMethod === "retiro"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              label={`Despacho (+ $${shippingCost} CLP)`}
              name="shippingMethod"
              id="despacho"
              value="despacho"
              checked={shippingMethod === "despacho"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Método de Pago</Card.Title>
          <Form>
            <Form.Check
              type="radio"
              label="Tarjeta de Crédito/Débito"
              name="paymentMethod"
              id="tarjeta"
              value="tarjeta"
              checked={paymentMethod === "tarjeta"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Transferencia Bancaria"
              name="paymentMethod"
              id="transferencia"
              value="transferencia"
              checked={paymentMethod === "transferencia"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form>
        </Card.Body>
      </Card>

      <Row className="mb-3">
        <Col md={6}>
          <h5>Total sin envío: ${baseTotal.toFixed(0)} CLP</h5>
        </Col>
        <Col md={6} className="text-end">
          <h5>
            Total a pagar: ${finalTotal.toFixed(0)} CLP
          </h5>
        </Col>
      </Row>

      <div className="text-center">
        <Button variant="success" onClick={handleConfirmPayment}>
          Confirmar Pago
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;*/
