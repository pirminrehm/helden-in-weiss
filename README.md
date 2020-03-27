# Helden in Weiß

## #WirVsVirus Hackathon

**Dieses Projekt ist im Rahmen des #WirVsVirus Hackathon der Bundesregierung entstanden**

**This project is part of the #WirVsVirus Hackathon of the Federal Government**

<p align="center"><img src="https://raw.githubusercontent.com/pirminrehm/wir-vs-virus/master/2020-03-18-hackathon.jpg" width="100%"></p>

## Demo

Please send an email to helden-in-weiss@7kw.de for the demo link.
**Users from devpost can find the link there in the "Try it out" area of our project page.**

## Video

Short pitch: https://youtu.be/_tKyFLk566I

## Description

### Inspiration

Die Lage in den Krankenhäusern wird immer angespannter. Täglich suchen weitere Kliniken Helfer:innen über die Medien, Studentenwerke schreiben Rundmails an Medizinstudenten. Und wir sind erst am Anfang! Wir brauchen schnell eine Plattform, um den explosionsartig wachsenden Kommunikationsbedarf strukturieren zu können. Unseres Wissens gibt es keine Plattform, die diesen speziellen Bedarf abdeckt.

### What it does

### Unser Ziel ist eine lauffähige Plattform bis zum Ende des Hackathons, die von Krankenhäusern und Helfern genutzt werden kann, um Unterstützung im medizinischen Bereich zu suchen und anzubieten. Und die haben wir - wir haben ein lauffähiges Backend, eine funktionierende UI und eine klar strukturierte User Experience! Nach einer gründlichen Runde Hardening können wir die Plattform innerhalb einer Woche in Betrieb nehmen. Features:

- Auswahl von Fähigkeiten anhand der eingetragenen Berufs- und medizinischen Fachgebietsbezeichnungen
- Schnelle Umkreis-Suche für Krankenhäuser und Möglichkeit für Helfer:innen, einen Umkreis für ihr Angebot anzugeben
- Einfaches Interface über E-Mail zum Löschen und Verlängern von Angeboten Unsere Plattform ist ausschließlich für medizinische qualifiziertes Personal, d.h. mittlerweile fachfremd Arbeitende mit entsprechender Ausbildung, Renter:innen, Student:innen.

### How we built it

Reine Web-Applikation mit Open Source-Komponenten, 100% responsive auf Basis von Angular und Material Design. Wir sind bei Null gestartet. Während unsere Researcher Interviews geführt haben, entstand das grundlegende Design in Sketch, das dann iterativ auf Basis des neuen Inputs verfeinert wurde.
Challenges we ran into

Der Prozess, Helfer zu suchen, zu prüfen und einzustellen, ist deutlich umfangreicher als ursprünglich gedacht. Insbesondere formelle Prüfungen sind extrem wichtig. Mit dem von uns umgesetzten Teil des Prozesses lässt sich der wichtigste Schritt schon erledigen - das Finden und Vermitteln von Helfern. Angesichts der Größe der Herausforderung kamen wir ans Zweifeln, ob unser stark reduzierter und auf eine lauffähige Lösung fokussierter Ansatz der richtige war. Besonders wenn wir unsere fertige Plattform sehen denken wir, dass die Entscheidung richtig war.
Accomplishments that we're proud of

### "Proud" ist ein großes Wort... aber wie haben wir das geschafft?

- Trotz schier unerschöpflicher Ideen zu Beginn konnten wir uns schnell auf ein Thema einigen. Uns hat fasziniert, dass es an der Quelle des Problems hilft, Leben retten kann, wir noch rechtzeitig an einer Lösung arbeiten und mit einer relativ kleinen Plattform viel Mehrwert geschaffen werden kann.
- Wir konnten der Versuchung widerstehen, einen besseren / umfangreicheren Prozess zu entwerfen. Wir haben immer wieder unsere Umsetzung priorisiert, denn den Prozess können wir auch nach Livegang noch erweitern.

### What we learned

Ein Hackathon ist in erster Linie ein Wettbewerb. Hier ging es aber um mehr als Gewinnen, und das hat man in der Kommunikation mit anderen Teams immer wieder gemerkt. Wir stehen in Kontakt mit den Teams, die dieselbe Idee bearbeitet haben, und werden versuchen uns mit ihnen zusammenzuschließen.
What's next for Helden in Weiß

### Auf dieser Basis sind folgende Erweiterungen geplant:

- Prüfung der eingetragenen Helfer auf ihre Qualifikationen
- Unterstützung eines Bewerbungsprozesses in Krankenhäusern, indem die Unterlagen digital abgelegt werden
- Zugang für Regierungspräsidien, um beispielsweise ausländische Ärzte direkt auf der Plattform zu prüfen und freizugeben
- Kommunikation über die Plattform statt außerhalb der Plattform über E-Mail Am wichtigsten ist aber, dass sich am Ende eine Plattform durchsetzt. Konkurrenz bringt hier nichts. Deshalb werden wir auch andere Lösungen unterstützen, wo wir können.

## Setup

- you have node.js 12 or later installed
- clone the project and go into project folder `cd helden-in-weiss`
- `npm install`
- `npm install -g @nrwl/cli`
- add in `/apps/api/src/app/.env/` connection variables
  - `MONGO_CONNECTION=<MONGO_CONNECTION_URL>`
  - `MONGOPASSWORD=<MONGO_PASSWORD>`
  - `SENDGRID_API_KEY=<SENDGRID_API_KEY>`
  - `RECAPTCHA_KEY=<RECAPTCHA_KEY>`
- open two consoles
  1. `nx serve helper-app` (frontend)
  2. `nx serve api` (backend)
- go to http://localhost:4200/

# Licence:

This Project is liceced under [MIT licence](https://github.com/pirminrehm/helden-in-weiss/blob/master/LICENSE),
except the file `zipcodes-germany.ts`, which is bascially provide by OpenStreetMap under
[Open Data Commons Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1.0/) and adapted for the software.

© OpenStreetMap-Mitwirkende
