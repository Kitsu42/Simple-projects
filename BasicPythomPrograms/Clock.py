import tkinter as tk
from tkinter import messagebox
import time
import threading

class RelogioApp:
    def __init__(self, master):
        self.master = master
        master.title("Relógio Multifuncional")
        
        self.abas = tk.Frame(master)
        self.abas.pack(side=tk.TOP, fill=tk.X)
        
        self.btn_relogio = tk.Button(self.abas, text="Relógio", command=self.mostrar_relogio)
        self.btn_cronometro = tk.Button(self.abas, text="Cronômetro", command=self.mostrar_cronometro)
        self.btn_pomodoro = tk.Button(self.abas, text="Pomodoro", command=self.mostrar_pomodoro)
        self.btn_timer = tk.Button(self.abas, text="Timer", command=self.mostrar_timer)
        self.btn_despertador = tk.Button(self.abas, text="Despertador", command=self.mostrar_despertador)
        
        self.btn_relogio.pack(side=tk.LEFT, expand=True, fill=tk.X)
        self.btn_cronometro.pack(side=tk.LEFT, expand=True, fill=tk.X)
        self.btn_pomodoro.pack(side=tk.LEFT, expand=True, fill=tk.X)
        self.btn_timer.pack(side=tk.LEFT, expand=True, fill=tk.X)
        self.btn_despertador.pack(side=tk.LEFT, expand=True, fill=tk.X)
        
        self.frame_principal = tk.Frame(master)
        self.frame_principal.pack(pady=20)
        
        self.cronometro_running = False
        self.crono_time = 0
        
        self.pomodoro_running = False
        self.pomodoro_total = 25 * 60  
        self.pomodoro_break = 5 * 60   
        self.pomodoro_in_focus = True
        
        self.timer_running = False
        self.timer_time = 0
        
        self.despertador_time = None
        
        self.mostrar_relogio()
    
    def limpar_frame(self):
        for widget in self.frame_principal.winfo_children():
            widget.destroy()
    
    # ================= Relógio Digital ====================
    def mostrar_relogio(self):
        self.limpar_frame()
        self.lbl_relogio = tk.Label(self.frame_principal, font=("Helvetica", 48))
        self.lbl_relogio.pack()
        self.atualizar_relogio()
    
    def atualizar_relogio(self):
        agora = time.strftime("%H:%M:%S")
        self.lbl_relogio.config(text=agora)
        # Atualiza a cada 1000 ms (1 segundo)
        self.master.after(1000, self.atualizar_relogio)
    
    # ================= Cronômetro ====================
    def mostrar_cronometro(self):
        self.limpar_frame()
        self.crono_time = 0
        self.cronometro_running = False
        
        self.lbl_crono = tk.Label(self.frame_principal, text="00:00:00", font=("Helvetica", 48))
        self.lbl_crono.pack()
        
        frame_botoes = tk.Frame(self.frame_principal)
        frame_botoes.pack(pady=10)
        
        tk.Button(frame_botoes, text="Iniciar", command=self.iniciar_cronometro).pack(side=tk.LEFT, padx=5)
        tk.Button(frame_botoes, text="Pausar", command=self.pausar_cronometro).pack(side=tk.LEFT, padx=5)
        tk.Button(frame_botoes, text="Resetar", command=self.resetar_cronometro).pack(side=tk.LEFT, padx=5)
    
    def atualizar_cronometro(self):
        if self.cronometro_running:
            self.crono_time += 1
            horas = self.crono_time // 3600
            minutos = (self.crono_time % 3600) // 60
            segundos = self.crono_time % 60
            self.lbl_crono.config(text=f"{horas:02d}:{minutos:02d}:{segundos:02d}")
        self.master.after(1000, self.atualizar_cronometro)
    
    def iniciar_cronometro(self):
        if not self.cronometro_running:
            self.cronometro_running = True
            self.atualizar_cronometro()
    
    def pausar_cronometro(self):
        self.cronometro_running = False
    
    def resetar_cronometro(self):
        self.cronometro_running = False
        self.crono_time = 0
        self.lbl_crono.config(text="00:00:00")
    
    # ================= Pomodoro ====================
    def mostrar_pomodoro(self):
        self.limpar_frame()
        self.pomodoro_running = False
        self.pomodoro_in_focus = True
        self.pomodoro_time = self.pomodoro_total
        
        self.lbl_pomodoro = tk.Label(self.frame_principal, text=self.formatar_tempo(self.pomodoro_time),
                                     font=("Helvetica", 48))
        self.lbl_pomodoro.pack()
        
        self.btn_start_pomo = tk.Button(self.frame_principal, text="Iniciar Pomodoro", command=self.iniciar_pomodoro)
        self.btn_start_pomo.pack(pady=10)
    
    def iniciar_pomodoro(self):
        if not self.pomodoro_running:
            self.pomodoro_running = True
            self.contar_pomodoro()
    
    def contar_pomodoro(self):
        if self.pomodoro_running and self.pomodoro_time > 0:
            self.pomodoro_time -= 1
            self.lbl_pomodoro.config(text=self.formatar_tempo(self.pomodoro_time))
            self.master.after(1000, self.contar_pomodoro)
        elif self.pomodoro_running:
            if self.pomodoro_in_focus:
                messagebox.showinfo("Pomodoro", "Sessão de foco finalizada! Hora do descanso.")
                self.pomodoro_time = self.pomodoro_break
            else:
                messagebox.showinfo("Pomodoro", "Descanso finalizado! Hora de focar novamente.")
                self.pomodoro_time = self.pomodoro_total
            self.pomodoro_in_focus = not self.pomodoro_in_focus
            self.contar_pomodoro()
    
    # ================= Timer ====================
    def mostrar_timer(self):
        self.limpar_frame()
        self.timer_running = False
        self.timer_time = 0
        
        tk.Label(self.frame_principal, text="Defina o tempo (segundos):", font=("Helvetica", 14)).pack(pady=5)
        self.ent_tempo = tk.Entry(self.frame_principal)
        self.ent_tempo.pack(pady=5)
        tk.Button(self.frame_principal, text="Iniciar Timer", command=self.iniciar_timer).pack(pady=5)
        self.lbl_timer = tk.Label(self.frame_principal, text="00:00:00", font=("Helvetica", 48))
        self.lbl_timer.pack(pady=10)
    
    def iniciar_timer(self):
        try:
            self.timer_time = int(self.ent_tempo.get())
        except ValueError:
            messagebox.showerror("Erro", "Insira um número válido!")
            return
        self.timer_running = True
        self.contar_timer()
    
    def contar_timer(self):
        if self.timer_running and self.timer_time > 0:
            self.timer_time -= 1
            self.lbl_timer.config(text=self.formatar_tempo(self.timer_time))
            self.master.after(1000, self.contar_timer)
        elif self.timer_running:
            messagebox.showinfo("Timer", "O tempo acabou!")
            self.timer_running = False
    
    # ================= Despertador ====================
    def mostrar_despertador(self):
        self.limpar_frame()
        tk.Label(self.frame_principal, text="Defina o horário (HH:MM):", font=("Helvetica", 14)).pack(pady=5)
        self.ent_despertador = tk.Entry(self.frame_principal)
        self.ent_despertador.pack(pady=5)
        tk.Button(self.frame_principal, text="Ativar Despertador", command=self.ativar_despertador).pack(pady=5)
        self.lbl_despertador = tk.Label(self.frame_principal, text="", font=("Helvetica", 14))
        self.lbl_despertador.pack(pady=10)
    
    def ativar_despertador(self):
        hora_str = self.ent_despertador.get()
        try:
            partes = hora_str.split(":")
            self.despertador_time = (int(partes[0]), int(partes[1]))
            self.lbl_despertador.config(text=f"Despertador ativado para {hora_str}")
            self.verificar_despertador()
        except Exception as e:
            messagebox.showerror("Erro", "Formato inválido! Use HH:MM")
    
    def verificar_despertador(self):
        if self.despertador_time:
            agora = time.localtime()
            if agora.tm_hour == self.despertador_time[0] and agora.tm_min == self.despertador_time[1]:
                messagebox.showinfo("Despertador", "Hora de acordar!")
                self.despertador_time = None
                self.lbl_despertador.config(text="")
                return
            # Verifica a cada 30 segundos
            self.master.after(30000, self.verificar_despertador)
    
    # ================= Função utilitária ====================
    def formatar_tempo(self, segundos):
        horas = segundos // 3600
        minutos = (segundos % 3600) // 60
        seg = segundos % 60
        return f"{horas:02d}:{minutos:02d}:{seg:02d}"

if __name__ == "__main__":
    root = tk.Tk()
    app = RelogioApp(root)
    root.mainloop()
