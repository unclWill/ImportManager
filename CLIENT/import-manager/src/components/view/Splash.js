import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StylesSplash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/produtos/lista");
    }, 4000);
  }, []);

  return (
    <div className="container-splash">
      <img src="/gif/leao.gif" alt="leão da receita correndo" />
      <h1>Olha o passado e projeta o futuro!</h1>
    </div>
  );
}
