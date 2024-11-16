import { CheckSquareFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Select } from "antd";
import React from "react";
import "../../styles/styles.css";
import "../../styles/registerRetainedProduct.css";

export default function RegisterRetainedProduct() {
  const { TextArea } = Input;

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div className="register-product-container">
      <div className="header-area">
        <img src="/leao.png" alt="Logo" className="logo" />
      </div>
      <div className="product-register-form">
        <h1 className="title">Cadastre o Produto</h1>
        <label>Nome do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o nome do produto"
          prefix={<CheckSquareFilled />}
        />
        <label style={{ marginBottom: "10px" }}>Descrição</label>
        <Flex vertical gap={32}>
          <TextArea
            className="input"
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="Digite a descrição do produto"
            style={{
              height: 80,
              resize: "none",
              borderWidth: "2px",
              borderColor: "#000000",
              marginBottom: "15px",
            }}
          />
        </Flex>
        <label>Quantidade</label>
        <Input
          className="input"
          size="large"
          placeholder="Quantidade"
          prefix={<PlusOutlined />}
        />
        <label>Preço</label>
        <Input
          className="input"
          size="large"
          placeholder="Preço"
          prefix={<PlusOutlined />}
        />
        <label>Categoria</label>
        <Form.Item>
          <Select
            className="product-register-select"
            placeholder="Selecione uma categoria"
          >
            <Select.Option value=""></Select.Option>
            <Select.Option value="Eletrônico">Eletrônico</Select.Option>
            <Select.Option value="Vestuário">Vestuário</Select.Option>
          </Select>
        </Form.Item>
        <label>Proprietário do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o CPF do proprietário"
          prefix={<PlusOutlined />}
        />
        <div className="register-product-buttons-cadastro">
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              width: "6rem",
              margin: "1rem",
            }}
          >
            Cadastrar
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              width: "6rem",
              margin: "1rem",
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
