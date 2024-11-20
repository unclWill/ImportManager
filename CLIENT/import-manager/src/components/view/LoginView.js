import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/loginView.css";
import "../../styles/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { isValidCNPJ, isValidCPF } from "../../utils/Mascaras";
//import ReactHowler from "react-howler";

export default function LoginView() {
  const [playing, setPlaying] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxChange = (e) => {
    setIsCompany(e.target.checked);
  };
  const [newUser, setNewUser] = useState({
    doc: "",
    senha: "",
  });
  const { handleLogin } = useContext(AuthContext);

  async function auth() {
    try {
      if (newUser.doc === "" || newUser.senha === "") {
        alert("Todos os campos devem ser preenchidos!");
        return;
      }

      if (isCompany) {
        if (!isValidCNPJ(newUser.doc)) {
          alert("O CNPJ está em formato inválido!");
          return;
        }
      }

      if (!isCompany) {
        if (!isValidCPF(newUser.doc)) {
          alert("O CPF está em formato inválido!");
          return;
        }
      }

      const userL = await handleLogin(newUser.doc, newUser.senha);

      if (userL.token) {
        navigate("/loading");
      }
    } catch (error) {
      alert("Site do governo é assim mesmo, tenta amanhã");
    }
  }

  return (
    <div className="container">
      <img src={"/leao.png"} alt="Logo InvestManager" className="logo-img" />
      <h1 className="title">Óh! Investimentos</h1>
      <div className="login-form">
        <label>Usuário</label>
        {isCompany ? (
          <>
            <Input
              className="input"
              size="large"
              placeholder="Informe o CNPJ"
              prefix={<UserOutlined />}
              value={newUser.doc}
              onChange={(t) => setNewUser({ ...newUser, doc: t.target.value })}
            />
          </>
        ) : (
          <>
            <Input
              className="input"
              size="large"
              placeholder="Informe o CPF"
              prefix={<UserOutlined />}
              value={newUser.doc}
              onChange={(t) => setNewUser({ ...newUser, doc: t.target.value })}
            />
          </>
        )}
        <label>Senha</label>
        <Input.Password
          className="input"
          size="large"
          placeholder="Digite a sua senha"
          prefix={<LockOutlined />}
          value={newUser.senha}
          onChange={(t) => setNewUser({ ...newUser, senha: t.target.value })}
        />

        <Checkbox
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
            alignSelf: "flex-start",
          }}
          onChange={handleCheckboxChange}
        >
          Pessoa Jurídica
        </Checkbox>
      </div>

      <div className="login-buttons-cadastro">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
            fontWeight: "bold",
          }}
          onClick={auth}
        >
          Entrar
        </Button>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("user/cadastro");
          }}
        >
          Cadastre-se
        </a>
      </div>
    </div>
  );
}
