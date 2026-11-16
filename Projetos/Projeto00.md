Objetivo: criar um programa de terminal que recebe informações do usuário, realiza verificações e gera um pequeno relatório de diagnóstico.

Você fará duas implementações:
- system_inspector.py
- system_inspector.c
1. Requisitos do projeto
Seu programa deve apresentar um menu:
================================
       SYSTEM INSPECTOR
================================

1. Verificar número
2. Analisar texto
3. Calcular estatísticas
4. Gerar relatório
0. Sair

Escolha uma opção:


Funcionalidade 1 — Verificar número
Receber um número inteiro e informar:
- Se é positivo, negativo ou zero.
- Se é par ou ímpar.
- Se é primo ou não.
Exemplo:
Digite um número: 17

Classificação: Positivo
Paridade: Ímpar
Primo: Sim


Funcionalidade 2 — Analisar texto
Receber uma frase e apresentar:
- Quantidade de caracteres.
- Quantidade de palavras.
- Quantidade de vogais.
- Quantidade de consoantes.
- Quantidade de espaços.
Exemplo:
Texto: Hello World

Caracteres: 11
Palavras: 2
Vogais: 3
Consoantes: 7
Espaços: 1


Considere letras sem distinção entre maiúsculas e minúsculas. Para começar, você pode trabalhar com o alfabeto inglês (ASCII).
Funcionalidade 3 — Calcular estatísticas
Receber uma quantidade N de números e calcular:
- Maior valor.
- Menor valor.
- Média aritmética.
- Soma total.
Exemplo:
Quantidade: 5

Números: 10, 20, 30, 40, 50

Maior: 50
Menor: 10
Média: 30
Soma: 150


Funcionalidade 4 — Gerar relatório
Gerar um relatório .txt contendo:
- Data e horário da execução.
- Nome do programa.
- Resultados das operações realizadas.
- Quantidade de operações executadas.
Não precisa armazenar o histórico entre diferentes execuções.

2. Regras de implementação
Quero que você respeite estas condições para que a avaliação seja justa.
Critério	C	Python
Arquivos	1	1
Bibliotecas	Padrão	Padrão
Funções	Obrigatório	Obrigatório
Estruturas de repetição	Obrigatório	Obrigatório
Condicionais	Obrigatório	Obrigatório
Tratamento de erros	Obrigatório	Obrigatório
Menu interativo	Obrigatório	Obrigatório

Restrições adicionais:
- Não utilize inteligência artificial para escrever o código.
- Não copie soluções prontas.
- Não utilize frameworks.
- Não utilize variáveis globais desnecessariamente.
- Comente apenas as partes que realmente precisam de explicação.
- Procure não duplicar código.