import React from "react";

import { Card } from "react-bootstrap";

const PriceOffer = ({ data, isSelected, onSelect }) => {
  const { _id, name, symbol, total } = data;

  return (
    <Card
      className="rounded-lg"
      bg="dark"
      text="white"
      className="mb-2"
      onClick={() => onSelect(data)}
      style={{ cursor: "pointer" }}
    >
      <Card.Body
        className={isSelected ? "border border-primary shadow-lg" : ""}
      >
        <Card.Title className="mb-0">{symbol}</Card.Title>
        <p className="text-muted">{name}</p>
        <Card.Text>{total}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PriceOffer;
