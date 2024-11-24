import { CheckSquareFilled, PlusOutlined } from "@ant-design/icons";
import { CiViewList } from "react-icons/ci";
import { Button, Form, Input, Select } from "antd";
import React, { useMemo, useState } from "react";
import { registerProductService } from "../service/RegisterProductService";
import { useNavigate } from "react-router-dom";
import "../../styles/registerRetainedProduct.css";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export default function RegisterRetainedProduct() {
  const { user, handleLogout } = useContext(AuthContext);

  const { TextArea } = Input;
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    owner: "",
    feePercentage: "",
  });

  const newProduct = useMemo(() => {
    return { ...formValues };
  }, [formValues]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormValues((prev) => ({ ...prev, category: value }));
  };

  const handleRegister = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.quantity ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.owner ||
      !newProduct.feePercentage
    ) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      await registerProductService(newProduct, user.token);
      alert("Produto cadastrado com sucesso.");
      setFormValues({
        name: "",
        description: "",
        quantity: "",
        price: "",
        category: "",
        owner: "",
        feePercentage: "",
      });
      navigate("/produtos/lista");
    } catch (error) {
      alert(error.message);
    }
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
          name="name"
          placeholder="Digite o nome do produto"
          prefix={<CiViewList />}
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <label style={{ marginBottom: "10px" }}>Descrição</label>
        <TextArea
          className="input"
          showCount
          maxLength={100}
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Digite a descrição do produto"
          style={{
            height: 80,
            resize: "none",
            borderWidth: "2px",
            borderColor: "#000000",
            marginBottom: "15px",
          }}
        />
        <label>Quantidade</label>
        <Input
          className="input"
          size="large"
          name="quantity"
          placeholder="Quantidade"
          prefix={<PlusOutlined />}
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <label>Preço</label>
        <Input
          className="input"
          size="large"
          name="price"
          placeholder="Preço"
          prefix={<PlusOutlined />}
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <label>Taxa aplicada sobre o produto</label>
        <Input
          className="input"
          size="large"
          name="feePercentage"
          placeholder="Digite apenas o valor da taxa, sem %"
          prefix={<PlusOutlined />}
          value={newProduct.feePercentage}
          onChange={handleInputChange}
        />
        <label>Categoria</label>
        <Form.Item>
          <Select
            className="product-register-select"
            placeholder="Selecione uma categoria"
            value={newProduct.category}
            onChange={handleSelectChange}
          >
            <Select.Option value=""></Select.Option>
            <Select.Option value="Eletronicos">Eletrônicos</Select.Option>
            <Select.Option value="Vestuario">Vestuário</Select.Option>
          </Select>
        </Form.Item>
        <label>Proprietário do Produto</label>
        <Input
          className="input"
          size="large"
          name="owner"
          placeholder="Digite o CPF do proprietário"
          prefix={<PlusOutlined />}
          value={newProduct.owner}
          onChange={handleInputChange}
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
            onClick={handleRegister}
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
            onClick={() => navigate("/produtos/lista")}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
