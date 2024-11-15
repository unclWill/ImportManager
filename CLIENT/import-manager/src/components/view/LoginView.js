import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/styles.css";
import { useState } from "react";

export default function LoginView() {
  const [isCompany, setIsCompany] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCompany(e.target.checked);
  };
  return (
    <div className="container">
      <img src={"/leao.png"} alt="Logo InvestManager" className="logo-img" />
      <h1 className="title">ImportManager</h1>
      <div className="login-form">
        <label>Usuário</label>
        {isCompany ? (
          <>
            <Input
              size="large"
              placeholder="Informe o CNPJ"
              prefix={<UserOutlined />}
            />
          </>
        ) : (
          <>
            <Input
              size="large"
              placeholder="Informe o CPF"
              prefix={<UserOutlined />}
            />
          </>
        )}
        <label>Senha</label>
        <Input.Password
          className="input"
          size="large"
          placeholder="Digite a sua senha"
          prefix={<LockOutlined />}
        />
      </div>
      <Checkbox
        style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}
        onChange={handleCheckboxChange}
      >
        Pessoa Jurídica
      </Checkbox>
      <div className="register-product-buttons-cadastro">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
            fontWeight: "bold",
          }}
        >
          Entrar
        </Button>
        <a>Cadastre-se</a>
      </div>
    </div>
  );
}
