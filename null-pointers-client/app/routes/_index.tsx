import Start from "~/components/Start";
import "~/styles/start.css";

export default function Index() {
  const imageUrl = "/assets/img/image1.png";

  return (
    <div className="start">
      <Start imageSrc={imageUrl} />
    </div>
  );
}
