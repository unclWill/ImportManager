import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "../../styles/styles.css";

export default function LoginView() {
  return (
    <div className="container">
      <img src={"/leao.png"} alt="Logo InvestManager" className="logo-img" />
      <h1 className="title">ImportManager</h1>
      <div className="login-form">
        <label>Usuário</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o seu CPF"
          prefix={<UserOutlined />}
        />
        <label>Senha</label>
        <Input.Password
          className="input"
          size="large"
          placeholder="Digite a sua senha"
          prefix={<LockOutlined />}
        />
      </div>
    </div>
  );
}
