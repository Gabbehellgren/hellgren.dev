import os

# Ange mappens sökväg här
folder_path = r"gallery\london-2024\tower"
htmlrelative = r"tower/"

# Filändelser som räknas som bilder
image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}

# Lista alla filer i mappen
files = os.listdir(folder_path)

# Filtrera ut bildfiler
images = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]
images.sort()

# Generera HTML-kod
html_snippets = [f'<img src="{htmlrelative}{img}" onclick="image(this)">' for img in images]

# Skriv ut HTML-koden
for snippet in html_snippets:
    print(snippet)
