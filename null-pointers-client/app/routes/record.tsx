import RegisterForm from "~/components/RegisterForm";
import "~/styles/record.css";

export default function RecordPage() {
  const imageUrl = "/assets/img/registro.png";

  return (
    <div className="record-container">
      <img className="imgrec" src={imageUrl} alt="Register"/>
      <RegisterForm />
    </div>
  );
}
