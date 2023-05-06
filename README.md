# Plan

1. Odpalić front `yarn dev`
2. Zrobić front
3. zrobić back
4. połączyć front z backiem poprzez

   ```js
   invoke('funkcja_w_rust', { nazwa_argumentu_w_ruscie: funkcjaJs });
   ```

5. Skopiować do `tauri.conf.json` > tauri > allowlist > fs z <https://tauri.app/v1/api/js/fs>
6. Stworzyć dir todos w głównym dir projektu
7. Dodać kopiowanie do schowka tj. pkt.5 z <https://tauri.app/v1/api/js/clipboard>
8. Zrobić ikonę
   1. Pobrać ikonę z iconmonstr
   2. Wrzucić do /src-tauri
   3. odpalić `yarn tauri icon ./src-tauri/icons/app-icon.png`
   4. Bruh to działa tylko w buildzie

## Jeśli chcesz zbuildować (długo trwa)

1. zmienić tauri.conf.json > tauri > bundle > indentifier na coś innego
2. zbuildować `yarn tauri build`
