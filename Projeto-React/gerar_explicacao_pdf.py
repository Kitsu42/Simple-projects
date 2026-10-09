from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, ListFlowable, ListItem

OUTPUT = "/workspaces/Simple-projects/Projeto-React/explicacao-projeto.pdf"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Justified", parent=styles["BodyText"], fontName="Helvetica", fontSize=10, leading=14, alignment=1, spaceAfter=8))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, spaceBefore=14, spaceAfter=8))
styles.add(ParagraphStyle(name="SubSection", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=11, leading=14, spaceBefore=10, spaceAfter=6))

story = []

story.append(Paragraph("Explicação do projeto Projeto-React", styles["Title"]))
story.append(Spacer(1, 8 * mm))

textos = [
    "Este projeto é uma API REST em Node.js, escrita em TypeScript, com Express e TypeORM para gerenciar cadastros relacionados a usuários e produtos em um banco MySQL.",
    "Apesar do nome 'Projeto-React', o código não contém frontend em React. O que existe aqui é um backend, ou seja, uma API que expõe endpoints para criar, listar, buscar, atualizar e excluir registros.",
    "A aplicação oferece operações CRUD para cinco recursos principais: situações de usuário, usuários, categorias de produto, situações de produto e produtos.",
    "Esses dados são persistidos em tabelas relacionais no MySQL e a API responde sob o prefixo /api.",
]
for item in textos:
    story.append(Paragraph(item, styles["Justified"]))

story.append(Paragraph("O que o projeto faz", styles["Section"]))
story.append(Paragraph("A API serve como backend para operações de cadastro e consulta de: usuários, situações de usuário, categorias de produto, situações de produto e produtos. Em outras palavras, ela funciona como um sistema de gestão de dados para um pequeno catálogo de usuários e itens de estoque/produtos.", styles["Justified"]))

story.append(Paragraph("Como o projeto funciona", styles["Section"]))
story.append(Paragraph("1. Inicialização da aplicação", styles["SubSection"]))
story.append(Paragraph("O ponto de entrada está em src/index.ts. Ele importa reflect-metadata, carrega as variáveis do ambiente, cria a instância do Express, monta as rotas em /api e chama AppDataSource.initialize() e AppDataSource.runMigrations() antes de abrir o servidor.", styles["Justified"]))

story.append(Paragraph("2. Configuração do banco de dados", styles["SubSection"]))
story.append(Paragraph("O arquivo src/data-source.ts centraliza a configuração do TypeORM. Ele cria um DataSource para MySQL com host, porta, usuário, senha, nome do banco e entidades a serem mapeadas. O projeto exige DB_DIALECT=mysql, então o ambiente foi pensado para MySQL específico.", styles["Justified"]))

story.append(Paragraph("3. Entidades e relacionamentos", styles["SubSection"]))
story.append(Paragraph("As entidades estão em src/entities. Existe uma tabela Situation para status de usuário, User para os usuários, ProductCategory para categorias, ProductSituation para estados do produto e Product para o cadastro dos produtos. O relacionamento principal mostra que cada usuário pertence a uma situação e cada produto pertence a categoria e situação do produto.", styles["Justified"]))

story.append(Paragraph("4. Migrations", styles["SubSection"]))
story.append(Paragraph("O schema do banco é criado em src/migrations/InitialSchema.ts. Esse arquivo cria as tabelas situations, product_categories, product_situations, users e products e define chaves estrangeiras para manter integridade entre registros.", styles["Justified"]))

story.append(Paragraph("5. Rotas REST", styles["SubSection"]))
items = [
    "GET /api/situations",
    "GET /api/users/:id",
    "POST /api/users",
    "PATCH /api/products/:id",
    "DELETE /api/product-categories/:id",
]
story.append(ListFlowable([ListItem(Paragraph(item, styles["Justified"])) for item in items], bulletType="bullet"))

story.append(Paragraph("6. Controlador e serviço genéricos", styles["SubSection"]))
story.append(Paragraph("Os arquivos src/controllers/crudController.ts e src/services/crudService.ts encapsulam a lógica repetitiva do CRUD. O controlador valida corpo, paginação, ids e campos obrigatórios; o serviço persiste dados e resolve relacionamentos do TypeORM. Isso evita duplicação de código para cada entidade.", styles["Justified"]))

story.append(Paragraph("7. Seeds iniciais", styles["SubSection"]))
story.append(Paragraph("O script src/seed.ts insere dados básicos de exemplo, como Ativo/Inativo, Geral/Eletrônicos/Alimentos e Disponível/Indisponível. Isso deixa o banco pronto para testes e demonstração.", styles["Justified"]))

story.append(Paragraph("Fluxo de execução", styles["Section"]))
story.append(Paragraph("1. O servidor inicia via src/index.ts. 2. O TypeORM conecta ao MySQL. 3. As migrations criam as tabelas. 4. As rotas recebem as requisições. 5. O controlador valida as entradas e chama o serviço. 6. O serviço grava ou recupera dados do banco. 7. A API responde em JSON.", styles["Justified"]))

story.append(Paragraph("Exemplo de criação de usuário", styles["Section"]))
story.append(Paragraph("POST /api/users\n{\n  \"name\": \"Maria\",\n  \"email\": \"maria@email.com\",\n  \"situationId\": 1\n}", styles["Justified"]))

story.append(Paragraph("Exemplo de criação de produto", styles["Section"]))
story.append(Paragraph("POST /api/products\n{\n  \"name\": \"Teclado\",\n  \"productSituationId\": 1,\n  \"productCategoryId\": 2\n}", styles["Justified"]))

story.append(Paragraph("Conclusão", styles["Section"]))
story.append(Paragraph("Em resumo, o projeto é um backend de CRUD para gerenciamento de usuários e produtos em MySQL. Ele usa padrões de arquitetura REST, TypeORM, Express e migrations para organizar, validar, persistir e consultar os dados. A principal funcionalidade é oferecer endpoints padronizados para manutenção de cadastros, sem depender de um frontend React.", styles["Justified"]))

pdf = SimpleDocTemplate(OUTPUT, pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm, topMargin=15 * mm, bottomMargin=15 * mm)
pdf.build(story)
print(f"PDF gerado em: {OUTPUT}")
