## Installation: 
```
 npm i
 npx playwright install
```
## Подготовка: 

1) Аутентефикация: 

  Общие сведения: https://playwright.dev/docs/auth
```
  mkdir -p playwright/.auth
  echo $'\nplaywright/.auth' >> .gitignore
```
2) В  **auth.setup.ts** прописываем свои login и password в строке **fill("")** под соответсвующими локаторами. 


3) В  **getFiles.ts** прописываем ваш личный токен. Инструкция как его получить:

>To get access_token:
>
>Login to your Figma account.
>Head to the account settings from the top-left menu inside Figma.
>Find the personal access tokens section.
>Click Create new token.
>A token will be generated. This will be your only chance to copy the token, so make sure you keep a copy of this in a secure place.

3) В  **ids.ts** прописываем в массиве проекты, которые вам необходимо скачать. Пример:  

>export const ids = [1235332, 23423461];

## Запуск:

1) формируем json:
```
 ts-node getFiles.ts
```
2) запускаем скачаивание: 
```
npx playwright test
```
Если вы заново хотите сформировать json, то перед командой ts-node getFiles.ts очистите файл **fileUrl.json**.
## FAQ:

 ***У меня скачались не все файлы, некоторых не хватает***

Возможные причины:
1) У вас имеются пустые файлы в проекте. 
2) Файлы с одинаковым названием взаимозаменяются в файловой системе windows/mac. Решение: переименовать одинаковые файлы на проектах :) 
3) Администратор проекта запретил скачивать конкретный файл. 

 ***Сначала скачивалось, потом перестало, каждый файл выдаёт ошибку в терминале***

Figma в какой-то момент может подумать, что вы бот, следовательно, перед скачиванием каждого файла она будет просить проходить капчу. К сожалению, в данном случае придётся скачивать вручную. 

 ***С самого начала ничего не качается, не пойму в чём причина***

Чтобы увидеть, что происходит в браузере и на чём спотыкается скачивание, добавьте флаг --headed во время запуска скачивания:

```
npx playwright test --headed
```
Одна из возможных причин: непройденная авторизация. 

***Компьютер сильно нагружается, всё зависает***

В ***playwright.config.js*** поменяйте параметр workers, где 10 - количество параллельных скачиваний. Уменьшайте до тех пор, пока вам не станет комфортно. Пример:

Было
```
workers: process.env.CI ? 1 : 10,
```
Стало
```
workers: process.env.CI ? 1 : 4,
```
