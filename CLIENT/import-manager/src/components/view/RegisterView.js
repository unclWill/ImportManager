import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function RegisterView() {
  return (
    <div className="register-form">
      <label>Nome</label>
      <Input
        size="large"
        placeholder="Informe seu Nome"
        prefix={<UserOutlined />}
      />
      <label>Sobrenome</label>
      <Input
        size="large"
        placeholder="Informe seu Sobrenome"
        prefix={<UserOutlined />}
      />

      <label>Senha</label>
      <Input.Password
        size="large"
        placeholder="Crie uma Senha"
        prefix={<UserOutlined />}
      />
      <label>Confirme sua Senha</label>
      <Input.Password
        size="large"
        placeholder="Confirme sua Senha"
        prefix={<UserOutlined />}
      />

      <label>Email</label>
      <Input size="large" placeholder="large size" prefix={<UserOutlined />} />

      <label>CPF</label>
      <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    </div>

    // Nome
    // Sobrenome
    // CPF
    // Email
    // Password
    // Confirme Password
  );
}
