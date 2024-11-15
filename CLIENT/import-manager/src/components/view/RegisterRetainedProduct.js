import { CheckSquareFilled, PlusOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import React from "react";
import "../../styles/styles.css";

export default function RegisterRetainedProduct() {
  const { TextArea } = Input;

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div className="register-product-container">
      <div className="login-form">
        <h1 className="title">Cadastre o Produto</h1>
        <label>Nome do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o nome do produto"
          prefix={<CheckSquareFilled />}
        />
        <label>Descrição</label>
        <Flex vertical gap={32}>
          <TextArea
            showCount
            maxLength={200}
            onChange={onChange}
            placeholder="Descreva o produto"
            style={{ height: 70, resize: "none" }}
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
        <Input
          className="input"
          size="large"
          placeholder="Categoria"
          prefix={<PlusOutlined />}
        />
        <label>Proprietário do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o CPF do proprietário"
          prefix={<PlusOutlined />}
        />
      </div>
    </div>
  );
}
