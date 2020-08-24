import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";

// Components
import InvestModal from "../components/InvestModal";

import walletApi from "../api/wallet";

import { round } from '../utils';

const Dashboard = () => {
  const _wallet = walletApi();
  const { user } = useSelector((state) => state.auth);
  const [wallet, setWallet] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [investAmount, setInvestAmount] = useState("");
  const [showInvestModal, setShowInvestModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    _wallet
      .get()
      .then((res) => setWallet(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChangeInvestAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInvestAmount(value);
  };

  const handleInvestFormSubmit = (e) => {
    e.preventDefault();
    setShowInvestModal(true);
  };

  const handleInvestModalSubmit = (asset) => {
    setShowInvestModal(false);
    _wallet
      .addAsset({
        symbol: asset.symbol,
        amount: investAmount / asset.prices.open,
      })
      .then(res => setWallet(res.data))
  };

  const renderAsset = (item, index) => {
    return (
      <p key={index}>
        {item.symbol} - {round(item.amount, 8)}
      </p>
    );
  };

  return isLoading ? (
    <div></div>
  ) : (
    <div>
      <Row className="d-flex justify-content-end my-2">
        <Form inline onSubmit={handleInvestFormSubmit}>
          <Form.Control
            className="mr-sm-2"
            placeholder="USD 450.00"
            value={investAmount}
            onChange={handleChangeInvestAmount}
            size="lg"
          />
          <Button variant="primary" size="lg" type="submit" disabled={!investAmount}>
            Investir
          </Button>
        </Form>
      </Row>
      <Row className="d-flex">
        <Card className="my-2 w-100">
          <Card.Header>
            <h5>Criptomoedas</h5>
          </Card.Header>
          <Card.Body>{wallet.cryptos.map(renderAsset)}</Card.Body>
        </Card>
        <Card className="my-2 w-100">
          <Card.Header>
            <h5>Ações</h5>
          </Card.Header>
          <Card.Body>{wallet.stocks.map(renderAsset)}</Card.Body>
        </Card>
      </Row>
      {showInvestModal && (
        <InvestModal
          investAmount={investAmount}
          isOpen={showInvestModal}
          onClose={() => setShowInvestModal(false)}
          onConfirm={handleInvestModalSubmit}
        />
      )}
    </div>
  );
};

export default connect()(Dashboard);
