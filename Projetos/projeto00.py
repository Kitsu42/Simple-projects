import os,sys

print("================================\n       SYSTEM INSPECTOR         \n================================")
print("Vamos tentar fazer essa budega")

def func_0():
    os.system('cls' if os.name == 'nt' else 'clear')
    sys.exit(0)
def func_1(): print("Opção 1")
def func_2(): print("Opção 2")
def func_3(): print("Opção 3")
def func_4(): print("Opção 4")

opcoes = [func_0,func_1, func_2, func_3, func_4]
index = int(input("O que deseja?\n1-Verificar número\n2-Analisar texto\n3-Calcular estatísticas\n4-Gerar relatório\n0-sair\n"))
opcoes[index]()   