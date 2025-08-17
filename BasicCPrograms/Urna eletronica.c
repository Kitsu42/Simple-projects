#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void limparTela() {
    #if defined(_WIN32) || defined(_WIN64)
        system("cls");
    #else
        system("clear");
    #endif
}

int main() {
    setlocale(LC_ALL,"");

    int votosAlibaba = 0, votosAlcapone = 0;
    int votosBranco = 0, votosNulo = 0;
    int escolha;
    int votou = 0;

    while (1) {
        limparTela();

        printf("Escolha seu candidato e pressione Enter para continuar!\n");
        printf("Para votar em Alibaba digite 83\n");
        printf("Para votar em Alcapone digite 93\n");
        printf("Para votar em branco digite 01\n");
        printf("Para votar nulo digite 00\n");

        if (votou) {
            printf("\n9999. Finalizar\n");
        }

        printf("Escolha um candidato ou opção de voto: ");
        if(scanf("%d", &escolha) != 1) {
            printf("Opção inválida. Por favor, insira um número.\n");
            while(getchar() != '\n'); 
            getchar();
            continue;
        }

        switch (escolha) {
            case 83:
                votosAlibaba++;
                printf("Você votou em Alibaba.\n");
                votou = 1;
                break;
            case 93:
                votosAlcapone++;
                printf("Você votou em Alcapone.\n");
                votou = 1;
                break;
            case 01:
                votosBranco++;
                printf("Você votou em branco.\n");
                votou = 1;
                break;
            case 00:
                votosNulo++;
                printf("Você votou nulo.\n");
                votou = 1;
                break;
            case 9999:
                if (votou) {
                    printf("\nResultado da eleição:\n");
                    if (votosAlibaba > votosAlcapone) {
                        printf("Candidato eleito: Alibaba\n \n");
                    } else if (votosAlcapone > votosAlibaba) {
                        printf("Candidato eleito: Alcapone\n \n");
                    } else {
                        printf("Empate! Nâo houve candidato eleito.\n \n");
                    }
                    if (votosAlibaba > 0)
                        printf("Alibaba: %d %s\n", votosAlibaba, (votosAlibaba == 1 ? "voto" : "votos"));
                    if (votosAlcapone > 0)
                        printf("Alcapone: %d %s\n", votosAlcapone, (votosAlcapone == 1 ? "voto" : "votos"));
                    if (votosBranco > 0)
                        printf("Votos em branco: %d %s\n", votosBranco, (votosBranco == 1 ? "voto" : "votos"));
                    if (votosNulo > 0)
                        printf("Votos nulos: %d %s\n", votosNulo, (votosNulo == 1 ? "voto" : "votos"));

                    exit(0);
                } else {
                    printf("Por favor, escolha um candidato ou opção de voto.\n");
                }
                break;
            default:
                printf("Opção inválida. Por favor, escolha uma das opções fornecidas.\n");
        }

        if (votou) {
            printf("\nPressione Enter para continuar...\n");
            getchar(); 
            getchar();
        }
    }

    return 0;
}