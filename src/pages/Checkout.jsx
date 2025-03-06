import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const shippingCost = 7500;

const Checkout = () => {
  const { cart, getCartTotal, getItemTotal, clearCart, user, token } = useContext(AppContext);
  const [shippingMethod, setShippingMethod] = useState("retiro");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const baseTotal = getCartTotal();
  const finalTotal = shippingMethod === "despacho" ? baseTotal + shippingCost : baseTotal;

  const handleCheckout = async () => {
  if (!user || !token) {
    Swal.fire("Error", "Debes iniciar sesión para comprar.", "error");
    return;
  }

  if (cart.length === 0) {
    Swal.fire("Error", "No hay productos en el carrito.", "error");
    return;
  }

  if (!paymentMethod) {
    Swal.fire("Error", "Debes seleccionar un método de pago.", "error");
    return;
  }

  const transactionData = {
    usuario_id: user.id, 
    monto_total: finalTotal,
    tipo_transaccion: true,
    detalle: cart.map((item) => ({
      publicacion_id: item.id,
      cantidad: item.quantity,
      subtotal: getItemTotal(item),
    })),
  };

  try {
    const response = await fetch("https://hito3-backend.onrender.com/transacciones/comprar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error desconocido");
    }

    Swal.fire("Éxito", "Compra realizada correctamente.", "success").then(() => {
      clearCart();
      navigate("/");
    });
  } catch (error) {
    Swal.fire("Error", error.message || "No se pudo procesar el pago.", "error");
  }
};


  return (
    <Container className="mt-4 main-content5">
      <h2 className="text-center mb-4">Resumen de Pago</h2>

      {cart.map((item) => (
        <Card key={item.id} className="mb-3">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img 
                variant="top" 
                src={item.imagen}
                alt={item.nombre}
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

      <div className="text-center my-3">
        <Button variant="success" onClick={handleCheckout}>
          Confirmar Pago
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
