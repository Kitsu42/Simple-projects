#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

void drawSquare(int size) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            printf("* ");
        }
        printf("\n");
    }
}

void drawTriangle(int size) {
    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\n");
    }
}

void drawCircle(int radius) {
    float dist;
    for (int i = 0; i <= 2 * radius; i++) {
        for (int j = 0; j <= 2 * radius; j++) {
            dist = ((i - radius) * (i - radius) + (j - radius) * (j - radius));
            if (dist <= (radius * radius)) {
                printf("* ");
            } else {
                printf("  ");
            }
        }
        printf("\n");
    }
}

int main() {
    setlocale(LC_ALL, "pt_BR.UTF-8");
    #ifdef _WIN32
        system("chcp 65001 > nul");
    #endif

    int choice, size;

    while (1) {
        printf("Menu:\n");
        printf("1. Desenhar Quadrado\n");
        printf("2. Desenhar Triângulo\n");
        printf("3. Desenhar Círculo\n");
        printf("4. Sair\n");
        printf("Escolha uma opção: ");
        scanf("%d", &choice);

        if (choice == 4) {
            break;
        }

        printf("Digite o tamanho (ou raio para círculo): ");
        scanf("%d", &size);

        switch (choice) {
            case 1:
                drawSquare(size);
                break;
            case 2:
                drawTriangle(size);
                break;
            case 3:
                drawCircle(size);
                break;
            default:
                printf("Opção inválida!\n");
        }
    }

    return 0;
}

