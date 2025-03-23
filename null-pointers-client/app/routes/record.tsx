import RegisterForm from "~/components/RegisterForm";

export default function Record() {
  const imageUrl = "/assets/img/registro.png"; // Declaración de la imagen

  return (
    <div id="container2">
      <img id="imgrec" src={imageUrl} />
      <RegisterForm /> {/* Renderiza el componente RegisterForm */}
    </div>
  );
}




  