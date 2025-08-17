import sqlite3
import tkinter as tk
from tkinter import messagebox, simpledialog

# Banco de dados
conn = sqlite3.connect('passwords.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS users(
    service TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
''')

def insert_password(service, username, password):
    cursor.execute('''
    INSERT INTO users (service, username, password) 
    VALUES (?, ?, ?)
    ''', (service, username, password))
    conn.commit()
    messagebox.showinfo("Sucesso", "Senha salva com sucesso!")

def show_services():
    cursor.execute('SELECT service FROM users')
    services = cursor.fetchall()
    return [service[0] for service in services]

def retrieve_password(service):
    cursor.execute('SELECT username, password FROM users WHERE service = ?', (service,))
    result = cursor.fetchone()
    return result

def update_password(service, new_password):
    cursor.execute('UPDATE users SET password = ? WHERE service = ?', (new_password, service))
    conn.commit()

def delete_service(service):
    cursor.execute('DELETE FROM users WHERE service = ?', (service,))
    conn.commit()

def main_menu():
    def add_password():
        service = simpledialog.askstring("Adicionar Serviço", "Nome do serviço:")
        username = simpledialog.askstring("Adicionar Serviço", "Nome de usuário:")
        password = simpledialog.askstring("Adicionar Serviço", "Senha:")
        if service and username and password:
            insert_password(service, username, password)

    def list_services():
        services = show_services()
        if services:
            messagebox.showinfo("Serviços", "\n".join(services))
        else:
            messagebox.showinfo("Serviços", "Nenhum serviço cadastrado.")

    def recover_password():
        service = simpledialog.askstring("Recuperar Senha", "Nome do serviço:")
        result = retrieve_password(service)
        if result:
            messagebox.showinfo("Senha Recuperada", f"Usuário: {result[0]}\nSenha: {result[1]}")
        else:
            messagebox.showerror("Erro", "Serviço não encontrado.")

    def change_password():
        service = simpledialog.askstring("Alterar Senha", "Nome do serviço:")
        if retrieve_password(service):
            new_password = simpledialog.askstring("Alterar Senha", "Nova senha:")
            update_password(service, new_password)
            messagebox.showinfo("Sucesso", "Senha atualizada com sucesso!")
        else:
            messagebox.showerror("Erro", "Serviço não encontrado.")

    def remove_service():
        service = simpledialog.askstring("Excluir Serviço", "Nome do serviço:")
        if retrieve_password(service):
            delete_service(service)
            messagebox.showinfo("Sucesso", "Serviço excluído com sucesso!")
        else:
            messagebox.showerror("Erro", "Serviço não encontrado.")

    root = tk.Tk()
    root.title("Gerenciador de Senhas")

    tk.Label(root, text="Gerenciador de Senhas", font=("Arial", 16)).pack(pady=10)

    tk.Button(root, text="Adicionar Senha", command=add_password, width=30).pack(pady=5)
    tk.Button(root, text="Listar Serviços", command=list_services, width=30).pack(pady=5)
    tk.Button(root, text="Recuperar Senha", command=recover_password, width=30).pack(pady=5)
    tk.Button(root, text="Alterar Senha", command=change_password, width=30).pack(pady=5)
    tk.Button(root, text="Excluir Serviço", command=remove_service, width=30).pack(pady=5)
    tk.Button(root, text="Sair", command=root.quit, width=30).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main_menu()
