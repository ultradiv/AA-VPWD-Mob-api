import json

# Load JSON file
with open('categories_d9.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Sets to track inserted IDs and translations
inserted_categories = set()
inserted_translations = set()

# Open SQL file to write the INSERT statements
with open('insert_categories.sql', 'w', encoding='utf-8') as out:

    for item in data['categories']:

        cat_id = int(item['category_id'])
        if cat_id not in inserted_categories:
            en_name = item['en_name'].replace("'", "''")
            parent_id = int(item['parent_id'])
            toplevel_id = int(item['toplevel_id'])
            out.write(f"INSERT INTO Categories (category_id, en_name, parent_id, toplevel_id) VALUES ({cat_id}, N'{en_name}', {parent_id}, {toplevel_id});\n")
            inserted_categories.add(cat_id)
        for trans in item['translations']:

            lang = trans['code']
            key = (cat_id, lang)
            if key not in inserted_translations:
                word = trans['translated_word'].replace("'", "''")
                out.write(f"INSERT INTO CategoryTranslations (category_id, language_code, translated_word) VALUES ({cat_id}, N'{lang}', N'{word}');\n")
                inserted_translations.add(key)