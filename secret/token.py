import secrets
import uuid


def generate_project_id():
    # Generar una parte única usando UUID
    unique_part = uuid.uuid4()

    # Generar una parte segura y aleatoria
    # Genera un string hex de 16 caracteres (8 bytes)
    secure_part = secrets.token_hex(8)

    # Combinar ambas partes para formar el project ID
    project_id = f"{unique_part}-{secure_part}"

    return project_id


# Ejemplo de uso
if __name__ == "__main__":
    project_id = generate_project_id()
    print(f"Generated Project ID: {project_id}")
