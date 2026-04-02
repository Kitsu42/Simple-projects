import pygame
import sys

pygame.init()

# Configurações
LARGURA, ALTURA = 800, 600
TELA = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Pong")

BRANCO = (255, 255, 255)
PRETO = (0, 0, 0)

# Objetos
bola = pygame.Rect(LARGURA//2 - 10, ALTURA//2 - 10, 20, 20)
paddle_esq = pygame.Rect(30, ALTURA//2 - 60, 10, 120)
paddle_dir = pygame.Rect(LARGURA - 40, ALTURA//2 - 60, 10, 120)

vel_bola = [5, 5]
vel_paddle = 7

clock = pygame.time.Clock()

while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Controles
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_w]:
        paddle_esq.y -= vel_paddle
    if teclas[pygame.K_s]:
        paddle_esq.y += vel_paddle
    if teclas[pygame.K_UP]:
        paddle_dir.y -= vel_paddle
    if teclas[pygame.K_DOWN]:
        paddle_dir.y += vel_paddle

    # Movimento da bola
    bola.x += vel_bola[0]
    bola.y += vel_bola[1]

    # Colisão com topo e base
    if bola.top <= 0 or bola.bottom >= ALTURA:
        vel_bola[1] *= -1

    # Colisão com paddles
    if bola.colliderect(paddle_esq) or bola.colliderect(paddle_dir):
        vel_bola[0] *= -1

    # Reset se sair da tela
    if bola.left <= 0 or bola.right >= LARGURA:
        bola.center = (LARGURA//2, ALTURA//2)
        vel_bola[0] *= -1

    # Desenho
    TELA.fill(PRETO)
    pygame.draw.rect(TELA, BRANCO, paddle_esq)
    pygame.draw.rect(TELA, BRANCO, paddle_dir)
    pygame.draw.ellipse(TELA, BRANCO, bola)

    pygame.display.flip()
    clock.tick(60)