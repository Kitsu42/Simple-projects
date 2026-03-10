import time
from datetime import datetime

while True:
    hora_sistema = datetime.now()
    hora_formatada = hora_sistema.strftime("%H:%M:%S")

    print("\rHora do sistema:", hora_formatada, end="")
    time.sleep(1)