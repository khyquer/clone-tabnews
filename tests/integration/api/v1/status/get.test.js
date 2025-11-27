describe("GET /api/v1/status", () => {
  test("should return 200 and include application info", async () => {
    // 1. Arrange (Preparação)
    // O teste precisa simular a chamada ao endpoint de status.
    // Em um projeto Next.js, isso pode ser feito com uma biblioteca como 'supertest'
    // ou simplesmente chamando a função do handler com objetos mockados de req/res,
    // mas o modo mais simples para testes integrados é usar a API real.
    // Para simplificar, vou simular uma chamada fetch, pressupondo que o servidor
    // Next.js esteja rodando ou que a função `statusHandler` possa ser importada.

    // Vamos simular a chamada a uma URL que corresponderia ao seu endpoint:
    const response = await fetch("http://localhost:3000/api/v1/status");
    
    // O status 200 é um requisito de um endpoint de status saudável.
    expect(response.status).toBe(200);

    const body = await response.json();

    // 2. Assert (Verificação) - Requisitos da feature:

    // 2.1. A propriedade application deve existir e ser um objeto.
    expect(body).toHaveProperty("application");
    expect(typeof body.application).toBe("object");

    // 2.2. As chaves name, version, uptime_seconds e environment devem estar presentes.
    expect(body.application).toHaveProperty("name");
    expect(body.application).toHaveProperty("version");
    expect(body.application).toHaveProperty("uptime_seconds");
    expect(body.application).toHaveProperty("environment");

    // 2.3. name e version devem ser iguais aos do package.json (extraído dos anexos)
    expect(body.application.name).toEqual("clone-tabnews");
    expect(body.application.version).toEqual("1.0.0");

    // 2.4. uptime_seconds deve ser numérico e maior que zero.
    expect(typeof body.application.uptime_seconds).toBe("number");
    expect(body.application.uptime_seconds).toBeGreaterThan(0);

    // 2.5. environment deve ser 'development' (pressupondo que o servidor dev esteja rodando)
    expect(body.application.environment).toEqual("development");

  });
});