## 🏥 eTriaj - Aplicație Mobile pentru Triaj Medical (ESI v5)

**eTriaj** este un proiect de licență ce vizează digitalizarea protocolului internațional de triaj **Emergency Severity Index (ESI) version 5**. Proiectul propune o soluție digitală pentru mobile, menită să asigure un parcurs de evaluare rapid și sigur pentru pacienți.

## 🧠 Arhitectura Neuro-Simbolică

Elementul central al proiectului este utilizarea unei arhitecturi **Neuro-Simbolice**. Această abordare hibridă este concepută pentru a beneficia de flexibilitatea inteligenței artificiale, menținând în același timp controlul riguros al unui sistem bazat pe reguli:

- **Componenta Neurală (NLP):** Utilizează un model de limbaj (Gemini) pentru procesarea descrierilor libere oferite de utilizatori. Rolul acesteia este strict de **normalizare semantică**, traducând limbajul colocvial în simboluri clinice standardizate (tokeni), fără a face evaluări de risc.
- **Componenta Simbolică (Rule Engine):** Reprezintă un motor de reguli determinist care procesează simbolurile extrase. Această componentă este responsabilă pentru decizia finală, garantând respectarea strictă a protocolului medical și eliminând riscul de eroare sau halucinație.
