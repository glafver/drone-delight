# 🍱 Drone Delight

**Drone Delight** är en matleveransapp med fokus på användarvänlighet, snabbhet och stilren design. Applikationen är byggd med **React** och **Tailwind CSS** på frontend, och använder **Node.js** och **MongoDB** för backend.

---


## 🥡 Projektbeskrivning

Projektet inleddes med en genomtänkt färgpalett och en första layoutskiss. För att skapa en modern och relevant upplevelse analyserades konkurrenters webbplatser, och inspiration hämtades från lösningar som fungerade särskilt väl. Ambitionen från start var att hålla designen **minimalistisk och modern**.

Färgvalet föll på **orange och grön**, två färger som ofta används i matleveransappar. Dessa nyanser valdes från **Tailwind CSS**-paletten, vilket skapade en enhetlig visuell känsla. Eftersom Tailwind ändå skulle användas som stilbibliotek, bidrog det även till ett smidigt designflöde.

Designen togs fram i **Figma**, både för mobil- och desktopversioner. Under utvecklingens gång justerades layout och detaljer, i takt med att vissa element visade sig fungera bättre i praktiken när de testades direkt i webbläsaren.

---

## 🛠 Teknikval

Projektet är byggt i **React**, ett ramverk som lämpar sig väl för komponentbaserad utveckling. Dess flexibilitet och logiska struktur var avgörande för valet, i kombination med tidigare erfarenhet inom området.

För styling användes **Tailwind CSS**, ett snabbt och modernt verktyg med ett omfattande urval av klasser som förenklar arbetet med responsiva gränssnitt.

### 📚 Använda bibliotek

- `react-toastify` – för notifikationer  
- `react-awesome-reveal` – för animationer  
- `nuka-carousel` – för bildspel  
- `react-icons` - för ikoner
- `react-dom-confetti` – för visuella detaljer

---

## 🌐 Backend & API

Under de första utvecklingsfaserna användes **JSON Server** för att snabbt bygga upp och testa frontend. När gränssnittet var på plats ersattes detta med en riktig backend, byggd i **Node.js** och kopplad till en **MongoDB**-databas.

Övergången till en riktig backend krävde vissa justeringar i frontend-logiken, bland annat eftersom API-responsens struktur såg annorlunda ut. Ett konkret exempel var att **MongoDB använder `_id` istället för `id`**, vilket ledde till fel som fick rättas till i efterhand.

---

## 🚀 Publicering

- **Frontend**: publicerad via **Netlify**  
- **Backend**: hostad på **Render**

Eftersom Render har kallstartstider behövde detta hanteras genom att införa en **ping-route** i backend. I frontend visades en **laddningsindikator** tills servern var redo att svara.

---

## 🔧 Möjliga förbättringar

- En **tokenbaserad autentisering (JWT)** har påbörjats men är inte färdigställd. Detta innebär att applikationens routes ännu inte är skyddade, vilket påverkar säkerheten.

- Användarupplevelsen skulle kunna förbättras genom att exempelvis visa **spinners** medan bilder laddas.

- En mer detaljerad **produktsida** med information om ingredienser samt en **filtreringsfunktion** baserad på dessa skulle göra upplevelsen mer komplett.

- **Kodstrukturen** kan förbättras:
  - Logiken för API-anrop bör flyttas ut från komponenterna till separata filer.
  - Sidor kan delas upp i **mindre, återanvändbara komponenter** för ökad läsbarhet och enklare underhåll.

---

