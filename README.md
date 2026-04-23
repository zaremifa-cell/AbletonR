# Ableton Redesign

Редизайн на [ableton.com](https://www.ableton.com/en/).

Визуална референция: [dasprogramm.co.uk](https://www.dasprogramm.co.uk/shop/braun/) — стилистиката на Braun / Dieter Rams.

---

## Структура на проекта

```
Ableton Redesign/
├── index.html
├── public/
│   ├── ableton-logo.svg
│   ├── live.jpg
│   ├── push.jpg
│   ├── move.jpg
│   └── note.jpg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
└── package.json
```

## Стартиране

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```



---

## Концепция

Авторът е музикант и художник. **Естетиката е приоритет номер едно.**

Най-важното за Ableton е Live софтуера. Session View е уникалното на Live — grid от clips, което няма нито един друг DAW.

### Съдържание на началната страница

1. **Промо лента отгоре** — Rent-to-Own (това е много важно за Ableton)
2. **Nav с името Ableton** и останалите важни линкове
3. **4 големи прозореца на цялата страница** — Live 12, Push, Move, Note
   - Черно-бели по подразбиране (както dasprogramm)
   - При hover стават цветни
   - Показват допълнителна информация и анимация
   - Малко описание
   - Тънка черна разделителна линия между тях
4. **Акцент върху Session View**
5. **Секция за артисти** — как музиканти използват Live (това е много важно за Ableton)
6. **Линкове към Learning Music / Blog**
7. **Минимален footer**

### Стилистика

Стилистиката на сайта на Braun / dasprogramm.co.uk.

---

## Снимки

Снимките са предоставени от автора:
- Live 12 — screenshot на Session View
- Push — top-down shot на устройството
- Move — top-down shot
- Note — iPhone screenshot на iOS app

---

## Какво не е наред в текущата версия

Според автора:

1. **Фонът е прекалено бежов** — не е естетски
2. **Не е използван точният шрифт на Ableton**
3. **Не е използвано тяхното лого**
4. **Не е използвана стилистиката на Live** в достатъчна степен

---

## За следваща итерация

Проектът ще бъде продължен с друг модел.
