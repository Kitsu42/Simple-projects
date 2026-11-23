import os

print("================================\n       SYSTEM INSPECTOR         \n================================")
print("Vamos tentar fazer essa budega")

entrada = input("insira alguma bosta: ")

os.system('cls' if os.name == 'nt' else 'clear')

func = int(input("O que deseja que seja feito com esse dado?\n"))

if func == 0:
    print("0")
elif func == 1:
    print("1")
elif func == 2:
    print("2")
elif func == 3:
    print("3")
elif func == 4:
    print("4")
elif func == 5:
    print("5")
else:
    print("Só são aceitos numeros de 0 a 5") #tratamento de erro não está funcionando


