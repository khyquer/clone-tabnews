# Resumo da Atividade de TDD no Endpoint de Status

Este documento descreve os casos de teste adicionados e as implementações realizadas no endpoint `/api/v1/status` como parte de uma atividade de Test-Driven Development (TDD).

## Casos de Teste Adicionados

Os seguintes testes foram adicionados ao arquivo `tests/integration/api/v1/status/gets.test.js` para cobrir novos cenários e garantir a robustez do endpoint:

1.  **Verificação do `Content-Type`**
    *   **Objetivo:** Garantir que o endpoint responda com o cabeçalho `Content-Type` contendo `application/json`.
    *   **Teste:** `test("GET to /api/v1/status should return Content-Type application/json", ...)`

2.  **Verificação do `charset`**
    *   **Objetivo:** Assegurar que a codificação de caracteres da resposta seja `utf-8`.
    *   **Teste:** `test("GET to /api/v1/status should return charset utf-8", ...)`

3.  **Rejeição de Métodos HTTP Não Permitidos**
    *   **Objetivo:** Garantir que o endpoint aceite apenas requisições do tipo `GET` e rejeite outras, como `POST`, com o código de status `405 Method Not Allowed`.
    *   **Teste:** `test("POST to /api/v1/status should return 405", ...)`

## Implementações Realizadas

Para que os novos testes passassem, a seguinte alteração foi feita no arquivo `pages/api/v1/status/index.js`:

1.  **Validação do Método HTTP**
    *   **Descrição:** Foi adicionada uma verificação no início da função do endpoint para checar o método da requisição (`request.method`).
    *   **Lógica:** Se o método não for `GET`, a função retorna imediatamente uma resposta com status `405` e uma mensagem de erro.
    *   **Resultado:** Esta implementação fez o teste de rejeição de `POST` passar e tornou o endpoint mais seguro e robusto.

Os testes de `Content-Type` e `charset` já passavam por padrão devido à configuração do Next.js, não necessitando de alterações no código.
