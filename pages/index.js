import { useEffect, useState } from "react";

function Home() {
  const [migrationStatus, setMigrationStatus] = useState(null);

  useEffect(() => {
    async function checkMigrationStatus() {
      try {
        const response = await fetch("/api/v1/migrations");
        if (response.ok) {
          const pending = await response.json();
          if (Array.isArray(pending) && pending.length === 0) {
            setMigrationStatus("✅ Todas as migrations foram aplicadas com sucesso!");
          } else {
            setMigrationStatus(`⚠️ Migrations pendentes: ${pending.length}`);
          }
        } else {
          setMigrationStatus("❌ Não foi possível verificar o status das migrations.");
        }
      } catch (error) {
        setMigrationStatus("❌ Erro ao conectar com a API de migrations.");
      }
    }

    checkMigrationStatus();
  }, []);

  return (
    <>
      <h1>Você é especial para mim</h1>
      <p>Fiz esta página no curso de programação apenas para dizer isso!</p>
      <span>2023 ❤️ @khyquer</span>
      <hr />
      {migrationStatus && (
        <p>
          <strong>Status das Migrations:</strong> {migrationStatus}
        </p>
      )}
    </>
  );
}

export default Home;