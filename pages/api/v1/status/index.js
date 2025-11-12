// CORREÇÃO DE PATH: O caminho correto para o package.json na raiz é "../../../../package.json"
import packageJson from "../../../../package.json"; 

function getApplicationInfo() {
  const { name, version } = packageJson;
  
  // Usamos process.env.NODE_ENV com um fallback para 'development'
  const environment = process.env.NODE_ENV || "development";
  
  // process.uptime() retorna o tempo de execução do processo em segundos
  const uptime_seconds = process.uptime();

  return {
    name,
    version,
    uptime_seconds,
    environment,
  };
}

// O handler precisa ser async para futuros usos, como a conexão com o banco de dados
async function statusHandler(request, response) {
  const status = {
    // Futuros dados do banco de dados (RF-002) virão aqui
    database: {}, 
    application: getApplicationInfo(),
  };

  // Retorna o status 200 com as informações da aplicação
  response.status(200).json(status);
}

export default statusHandler;