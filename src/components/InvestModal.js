import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";

import PriceOffer from "./PriceOffer";

import priceApi from "../api/prices";

import { round } from '../utils';

const InvestModal = ({ investAmount, isOpen, onClose, onConfirm }) => {
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const _prices = priceApi();

  const fetchPrices = () =>
    _prices
      .getAll()
      .then((res) => res.data.stocks.concat(res.data.cryptos))
      .then((data) => data.filter((p) => p.prices))
      .then((data) =>
        data.map((item) =>
          Object.assign(item, {
            total: round(investAmount / item.prices.open, 8),
          })
        )
      );

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        if (!isLoading) setLoading(true);
        fetchPrices()
          .then(setData)
          .finally(() => {
            setTimer(15);
            setLoading(false);
            setSelected(null);
          });
      }
    }, 1000);
  }, [timer]);

  const renderPriceOffer = (item, index) => {
    const isSelected = selected && selected._id === item._id;
    return (
      <Col key={index} lg={4} sm={6} xs={6}>
        <PriceOffer
          data={item}
          onSelect={setSelected}
          isSelected={isSelected}
        />
      </Col>
    );
  };

  return (
    <Modal show={isOpen} onHide={onClose} dialogClassName="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Melhores opções de investimento com USD {investAmount}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            Atualizando em {timer}
            <Row>{data.map(renderPriceOffer)}</Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
        {selected ? (
          <Button variant="primary" onClick={() => onConfirm(selected)}>
            Investir {investAmount} USD em {selected.symbol}
          </Button>
        ) : (
          <Button variant="primary" onClick={onClose} disabled>
            Investir
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InvestModal;
