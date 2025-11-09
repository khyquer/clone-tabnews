# clone-tabnews

Projeto do curso.dev do Felipe Deschamps (@filipedeschamps)

🧾 Relatório de Implementação com TDD – Projeto Clone TabNews
🔗 Repositório
Fork do projeto original: https://github.com/khyquer/clone-tabnews.git
Clone local: git clone https://github.com/Asantana86/clone-tabnews.git

⚙️ Ambiente configurado
- Banco de dados PostgreSQL via Docker
- Variáveis de ambiente definidas em .env.development
- Migrations gerenciadas com node-pg-migrate
- Testes com Jest
- API estruturada em pages/api/v1

🧪 Ciclo TDD aplicado
🔴 Red – Escrevemos testes que inicialmente falharam
- Testes para a rota /api/v1/status verificando:
- Código de status 200
- Presença e formato da propriedade updated_at
- Estrutura do objeto dependencies.database
- Validação de tipos e valores esperados
🟢 Green – Implementamos o mínimo necessário para passar os testes
- Criamos a rota status/index.js que retorna:
- updated_at com timestamp atual
- dependencies.database com versão, conexões máximas e ativas
- application com name, version, uptime_seconds, environment
🔵 Blue – Refatoramos e melhoramos o código mantendo os testes verdes
- Agrupamos testes com describe
- Reutilizamos chamadas com beforeAll
- Melhoramos mensagens de erro e legibilidade
- Integramos a página inicial (pages/index.js) com a API de migrations
- Criamos lógica para exibir status dinâmico das migrations na interface

🧩 Feature implementada
RF-001 – Retornar informações da aplicação no status
- Criamos a propriedade application no retorno da rota /api/v1/status
- Validamos os campos name, version, uptime_seconds, environment
- Garantimos que uptime_seconds seja numérico e environment reflita NODE_ENV
- Todos os testes passaram com sucesso

📦 Migrations
- Criamos a migration init-db com npm run migration:create -- init-db
- Aplicamos via npm run migration:up ou POST /api/v1/migrations
- Verificamos pendências com GET /api/v1/migrations
- Integramos essa verificação à interface principal

🖥️ Interface aprimorada
- Página inicial exibe mensagem personalizada
- Status das migrations é exibido dinamicamente
- Mensagens como:
- ✅ Todas as migrations foram aplicadas com sucesso!
- ⚠️ Migrations pendentes: 1

✅ Conclusão
O projeto foi desenvolvido seguindo fielmente os princípios do TDD:
- Red: testes falhando inicialmente
- Green: implementação mínima para passar
- Blue: refatoração e melhoria contínua com testes passando
A entrega está completa, funcional, testada e documentada.

