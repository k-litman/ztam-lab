# Lab 01 - Progressive Web App

## Co zostało zrealizowane
W trakcie laboratorium wykonano przykładową stronę na podstawie materiałów otrzymanych. Dodano dodatkowo podstawowe stylowanie.

Przetestowano instalację PWA na komputerze. Nie przetestowano instalacji na telefonie z wykorzystaniem USB debuggingu z powodu problemu z połączeniem.
Aplikację natomiast zainstalowano po wdrożeniu na Firebase.

Aplikacja spełnia wszystkie wymagania, tj.:
- brak błędów w zakładce Manifest
- aplikacja jest instalowalna
- manifest jest pełny
- service worker działa
- aplikacja działa w trybie offline
- przycisk instalacji działa zgodnie z założeniami
- wdrożono aplikację na Firebase
- raport Lighthouse daje wynik 100 w wymaganych kategoriach

Aby uzyskać wynik 100 w kategorii Accessibility, należało dodatkowo opakować treść strony (wewnątrz tagu `body`) w tag `main`.

## Uruchomienie
Aplikacja wdrożona na Firebase pod linkiem https://ztam-lab-01.web.app/

Lokalnie aplikację można uruchomić poprzez
```bash
cd public
npx serve
```

## Screenshot
![Aplikacja na telefonie](screenshot.jpg)