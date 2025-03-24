import RegisterForm from "~/components/RegisterForm";
import "~/styles/record.css";

export default function RecordPage() {
  const imageUrl = "/assets/img/registro.png";

  return (
    <div className="start" id="container2">
      <img id="imgrec" src={imageUrl}/>
      <RegisterForm />
    </div>
  );
}
