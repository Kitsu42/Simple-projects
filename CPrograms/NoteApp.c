#include <stdio.h>
#include <stdlib.h>

void escreverArquivo() {
    FILE *arquivo;
    char nomeArquivo[100];
    char texto[1000];

    printf("Digite o nome do arquivo (ex: notas.txt): ");
    scanf("%s", nomeArquivo);

    arquivo = fopen(nomeArquivo, "w");

    if (arquivo == NULL) {
        printf("Erro ao criar o arquivo.\n");
        return;
    }

    printf("Digite sua nota (finalize com ENTER):\n");
    getchar(); // limpar buffer
    fgets(texto, sizeof(texto), stdin);

    fprintf(arquivo, "%s", texto);

    fclose(arquivo);
    printf("Nota salva com sucesso!\n");
}

void lerArquivo() {
    FILE *arquivo;
    char nomeArquivo[100];
    char texto[1000];

    printf("Digite o nome do arquivo para ler: ");
    scanf("%s", nomeArquivo);

    arquivo = fopen(nomeArquivo, "r");

    if (arquivo == NULL) {
        printf("Erro ao abrir o arquivo.\n");
        return;
    }

    printf("\nConteúdo do arquivo:\n\n");

    while (fgets(texto, sizeof(texto), arquivo) != NULL) {
        printf("%s", texto);
    }

    fclose(arquivo);
}

int main() {
    int opcao;

    do {
        printf("\n=== BLOCO DE NOTAS ===\n");
        printf("1 - Criar/Escrever nota\n");
        printf("2 - Ler nota\n");
        printf("0 - Sair\n");
        printf("Escolha: ");
        scanf("%d", &opcao);

        switch (opcao) {
            case 1:
                escreverArquivo();
                break;
            case 2:
                lerArquivo();
                break;
            case 0:
                printf("Saindo...\n");
                break;
            default:
                printf("Opcao invalida!\n");
        }

    } while (opcao != 0);

    return 0;
}