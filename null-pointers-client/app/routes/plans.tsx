import Plans from "../components/Plans";
import styles from "~/styles/plans.css?url";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function PlansRoute() {
  return <Plans/>;
}
