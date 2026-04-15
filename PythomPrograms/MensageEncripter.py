import sys

def gerar_shifts(chave):
    return [ord(c) - ord('a') for c in chave.lower()]

def processar_texto(texto, chave, modo):
    shifts = gerar_shifts(chave)
    resultado = ""
    
    for i, char in enumerate(texto):
        if char.isalpha():
            base = ord('a') if char.islower() else ord('A')
            shift = shifts[i % len(shifts)]
            
            if modo == "encrypt":
                novo = (ord(char) - base + shift) % 26
            else:  # decrypt
                novo = (ord(char) - base - shift) % 26
            
            resultado += chr(base + novo)
        else:
            resultado += char
    
    return resultado

if __name__ == "__main__":
    modo = sys.argv[1]      # encrypt ou decrypt
    chave = sys.argv[2]     # palavra-chave
    texto = sys.argv[3]     # frase

    print(processar_texto(texto, chave, modo))