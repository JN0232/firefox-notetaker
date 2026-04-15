# 📝 Firefox Notetaker - Poznámky pro Firefox

Jednoduchý a elegantní Firefox plugin pro tvorbu poznámek s podporou textu, obrázků a souborů. Všechna data se ukládají lokálně v JSON formátu.

## ✨ Funkce

✅ **Psaní poznámek** - Snadno vytvářejte textové poznámky  
✅ **Obrázky** - Přidávejte obrázky k poznámkám  
✅ **Soubory** - Ukládejte soubory přímo do poznámek  
✅ **JSON Export** - Exportujte všechny poznámky jako JSON  
✅ **Lokální úložiště** - Veškerá data zůstávají na vašem počítači  
✅ **Přehledné rozhraní** - Jednoduchý a intuitivní design  

## 🚀 Instalace

### 1. Stažení

```bash
git clone https://github.com/JN0232/firefox-notetaker.git
cd firefox-notetaker
```

Nebo si stáhněte ZIP:
- Jděte na https://github.com/JN0232/firefox-notetaker
- Klikněte `Code` → `Download ZIP`
- Rozbalte soubor

### 2. Načtení do Firefoxu

1. V Firefoxu otevřete: `about:debugging#/runtime/this-firefox`
2. Klikněte na "Načíst dočasné rozšíření"
3. Vyberte soubor `manifest.json` ze staženého adresáře
4. Hotovo! 🎉

## 📖 Jak používat

### Vytvoření poznámky

1. Klikněte na ikonu rozšíření
2. Napište text do textového pole
3. (Volitelně) Přidejte obrázek nebo soubor
4. Klikněte na tlačítko "💾 Uložit"

### Přidání obrázku

1. V panelu "🖼️ Přidat obrázek:" klikněte
2. Vyberte soubor z počítače
3. Klikněte "Uložit"
4. Obrázek se zobrazí v poznámce

### Přidání souboru

1. V panelu "📎 Přidat soubor:" klikněte
2. Vyberte jakýkoli soubor
3. Klikněte "Uložit"
4. Později si soubor stáhněte tlačítkem "📥 Stáhnout"

### Export poznámek

1. Klikněte na "⬇️ Exportovat JSON"
2. Soubor `poznamky_YYYY-MM-DD.json` se stáhne
3. Lze jej otevřít v jakémkoli textovém editoru

### Klávesová zkratka

- **Ctrl + Enter** v textovém poli = uložit poznámku

## 📁 Struktura projektu

```
firebase-notetaker/
├── manifest.json           # Konfigurace rozšíření
├── popup/
│   ├── popup.html          # HTML uživatelského rozhraní
│   ├── popup.css           # Stylování
│   └── popup.js            # Hlavní logika
├── icons/                  # Ikony rozšíření (volitelně)
└── README.md              # Tento soubor
```

## 🛠️ Technologie

- **JavaScript** - Čistý vanilla JS, žádné závislosti
- **Firefox WebExtensions API** - Pro přístup k úložišti
- **CSS3** - Moderní stylování
- **JSON** - Formát pro export

## 💾 Ukládání dat

Poznámky se ukládají v `browser.storage.local` v následující struktuře:

```json
{
  "notes": [
    {
      "id": 1713184573000,
      "text": "Obsah poznámky",
      "imageData": "data:image/png;base64,...",
      "fileName": "dokument.pdf",
      "fileData": "ArrayBuffer...",
      "timestamp": "2026-04-15T10:00:00.000Z"
    }
  ]
}
```

## 📤 Export JSON

Exportovaný JSON obsahuje metadata bez binárních dat:

```json
{
  "notes": [
    {
      "id": 1713184573000,
      "text": "Obsah poznámky",
      "fileName": null,
      "hasImage": true,
      "hasFile": false,
      "timestamp": "2026-04-15T10:00:00.000Z"
    }
  ]
}
```

## 🔒 Bezpečnost

- Veškerá data zůstávají lokálně v prohlížeči
- Žádné odesílání na servery
- Žádné sledování
- Otevřený zdrojový kód

## 🐛 Řešení problémů

### Rozšíření se nezobrazuje
- Zkontrolujte, zda je načteno v `about:debugging`
- Restartujte Firefox
- Znovunačtěte rozšíření

### Poznámky se neukládají
- Zkontrolujte v DevTools (F12) zda nejsou chyby
- Vymažte cache prohlížeče
- Znovu načtěte rozšíření

### Nemohu importovat soubor
- Zkontrolujte velikost souboru (doporučeno < 5MB)
- Vyzkoušejte s jiným formátem souboru

## 📝 Licence

MIT License - Volně použitelné a modifikovatelné

## 🤝 Příspěvky

Pull requesty jsou vítány! 

## 📧 Kontakt

Vytvořeno pro: JN0232

---

**Užívejte si poznámky! 📝✨**