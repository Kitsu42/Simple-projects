#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>
#include <locale.h>
#include <unistd.h>  // Para usleep

int NUMBER_LIMIT = 10;

void catFrameOne() {
    printf(" /\\-----/|\n");
    printf("| * w *  |\n");
    printf("| u    u |\n");
    printf("*You win!*\n");
}

void catFrameTwo() {
    printf(" /\\-----/|\n");
    printf("| - w -  |\n");
    printf("| u    u |\n");
    printf("*You win!*\n");
}

void catFrameThree() {
    printf(" /\\-----/|\n");
    printf("| * w *  |\n");
    printf("| b <3 d |\n");
    printf("*You win!*\n");
}

void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

bool isNumber(const char *str) {
    char *end;
    strtol(str, &end, 10);
    return *end == '\0';
}

void checkGuess(int guess, int secretNumber, int attempts) {
    if (guess < secretNumber) {
        printf("Tente um número maior\n");
    } else if (guess > secretNumber) {
        printf("Tente um número menor\n");
    } else {
        const char* s = (attempts > 1) ? "s" : "";
        printf("Parabéns, você acertou com %d tentativa%s!\n", attempts, s);

        printf("Pressione Enter para ver a animação de parabéns...");
        while (getchar() != '\n');

        for (int i = 0; i < 50; i++) {
            clearScreen();
            catFrameOne();
            usleep(500000);

            clearScreen();
            catFrameTwo();
            usleep(200000);

            clearScreen();
            catFrameThree();
            usleep(200000);
        }

        clearScreen();
        catFrameOne();
    }
}

void waitForEnter() {
    printf("Pressione Enter para sair...");
    while (getchar() != '\n'); 
}

void printWithDelay(const char *str, unsigned int delay) {
    struct timespec ts;
    ts.tv_sec = 0;
    ts.tv_nsec = delay * 1000000;

    while (*str) {
        putchar(*str++);
        fflush(stdout);
        nanosleep(&ts, NULL);
    }
}

int selectLevel(int* gameLevel) {
    printWithDelay("**********************************************\n", 25);
    printWithDelay("* Primeiro, escolha o nível que deseja jogar *\n", 50);
    printWithDelay("**********************************************\n", 25);
    printWithDelay("[1] - Fácil    (números de 1 a 10)\n", 25);
    printWithDelay("[2] - Médio    (números de 1 a 50)\n", 25);
    printWithDelay("[3] - Difícil  (números de 1 a 100)\n", 25);
    printWithDelay("Nível:", 25);
    scanf("%d", gameLevel);
    while (getchar() != '\n');

    switch (*gameLevel) {
    case 1:
        NUMBER_LIMIT = 10;
        break;
    case 2:
        NUMBER_LIMIT = 50;
        break;
    case 3:
        NUMBER_LIMIT = 100;
        break;
    default:
        printf("Nível inválido. Definindo para Fácil.\n");
        NUMBER_LIMIT = 10;
        break;
    }

    return NUMBER_LIMIT;
}

void header() {
    clearScreen();
    printWithDelay("******************************************\n", 50);
    printWithDelay("* Bem-vindo ao nosso jogo de adivinhação *\n", 25);
    printWithDelay("******************************************\n", 50);
    char buffer[50];
    snprintf(buffer, sizeof(buffer), "*     Escolha um número entre 1 e %d     *\n", NUMBER_LIMIT);
    printWithDelay(buffer, 50000);
    printWithDelay("******************************************\n\n", 50);
}

void playGame(int secretNumber) {
    char input[100];
    int guess = 0;
    int attempts = 1;

    while (1) {
        printf("Faça seu chute: ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = 0;

        if (isNumber(input)) {
            guess = atoi(input);
            checkGuess(guess, secretNumber, attempts);

            if (guess == secretNumber) {
                break;
            } else {
                attempts++;
            }
        } else {
            printf("Entrada inválida. Por favor, digite um número.\n");
        }
    }
}

int main() {
    setlocale(LC_ALL, "");
    srand(time(NULL));

    int gameLevel;
    selectLevel(&gameLevel);

    int secretNumber = (rand() % NUMBER_LIMIT) + 1;

    header();
    playGame(secretNumber);
    waitForEnter();

    return 0;
}