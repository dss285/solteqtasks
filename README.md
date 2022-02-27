# Kuvaus
Sovelluksen backendin rajapinta on vakiona https://localhost:7274/EnergiaKulutus

Frontendi on dev buildissa vakiona http://localhost:3000
Backendissä on laitettu CORS kaikille päälle.
Backendi luo .csv tiedostot backend/csvTiedostot kansioon formaatilla
```
vuosi-kuukausi-päivä--tunti-minuutti-sekunti.csv
```
csv erottajana käytetty 
```
;
```


# Miten muuttaisit toteutusta, jos
## Päivämääräväliä halutaan muokata
---
Kun API pyyntö lähetetään käyttöliittymästä, niin laitetaan muuttujat, jotka esittävät päivämäärä väliä, se on sitten kysymys vaan, tarvitseeko ylärajaa, että ottaisi kaikki alarajasta lähtien taikka toisinpäin.

Helsinki Open API ei tue suoraan tätä, mutta me voidaan itse generoida ylä tai/ja alaraja sille.

## Kulutusdata haluttaisiinkin viikoittaisena tai
---
Tämänkin voi ottaa muuttujana sisään esim (w = viikottainen, m=kuukausittainen, y=vuosittainen) ja sitten vaihtaa vaan GroupBy funktiota mitä käytetään.

## Kulutustietoja tulisi saada haettua myös toisesta palvelusta
---
Tämä riippuu ihan siitä onko sama rakenne vai ei, minun toteutus tarvitsee tiettyä rakennetta, tai sitten on valmiina laitettu tiettyjä rajapintoja ja niitten rakenteet kunnossa.

Mikäli on sama rakenne tai sitten eri rakenne niin, muuttujana voidaan ottaa jokin tunniste rajapinnasta (esim helAPI=Helsinki Open API), ja tämän muuttujan mukaan sitten mennään hakemaan tiedot.