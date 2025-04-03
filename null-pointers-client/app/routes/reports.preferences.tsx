import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/loaders/preferencesLoader";
import "~/styles/preferences.css";
import { Preferencia } from "../interfaces/preference";
import PreferencesTable from "../components/PreferencesTable";

export { loader };

export default function Preferences() {
  const preferenciasData = useLoaderData<typeof loader>() || [];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading-indicator">Loading preferences...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <PreferencesTable preferenciasData={preferenciasData} />
      )}
    </div>
  );
}
