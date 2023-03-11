const express = require("express");

const router = express.Router();

/////////KATEGORİ = EKONOMİ/////////

router.get('/balik-tut', (req, res) => {
  res.json({ "kod-olta-al": `$nomention
$color[FFFFFF]
$onlyIf[$getVar[para;$authorID]>=550;**<@$authorID>, cüzdanında yeterli miktarda paran yok!**]
$setVar[olta;yes]
$description[**<@$authorID>, 1 adet olta başarıyla alındı.**
$addField[Ödenilen Ücret:;**550 $**]]
$onlyIf[$getVar[olta]!=yes;**<@$authorID> zaten bir oltan bulunuyor.**]
$setVar[para;$sub[$getVar[para;$authorID];550];$authorID]
$footer[]
`
,
"kod-balik-tut": `$nomention
$color[FFFFFF]
$description[$randomText[🐳;🐋;🐬;🐟;🐠;🐡;🦈] **balığı tuttun ve $randomText[50;600] $ para kazandın!**]
$setVar[para;$sum[$getVar[para;$authorID];$random[50;600]];$authorID]
$onlyIf[$getVar[olta]!=no;**<@$authorID> oltan olmadığı için balık tutamazsın!**]
$cooldown[30s;**<@$authorID>, bu komutu bir daha kullana bilmen için %time-s% kaldı!**]
$changeCooldownTime[gün;saat;dakika;saniye]
$footer[]
`
});
});

router.get('/slots', (req, res) => {
  res.json({ "kod": `$if[$randomText[1;2]==1]
__**SLOTS**__
$randomText[1️⃣ 1️⃣ 1️⃣;2️⃣ 2️⃣ 2️⃣;3️⃣ 3️⃣ 3️⃣] ***$multi[2;$message] para kazandın.***
$setVar[para;$sum[$getVar[para;$authorID];$multi[2;$message]];$authorID]
$else
__**SLOTS**__
$randomText[1️⃣ 2️⃣ 1️⃣;3️⃣ 2️⃣ 3️⃣;1️⃣ 1️⃣ 3️⃣] ***$message para kaybettin.***
$setVar[para;$sub[$getVar[para;$authorID];$message];$authorID]
$endif
$argsCheck[>1;Slot oynayacağın para miktarını girmelisin.]
$suppressErrors[Bu bir sayı değil.]
$onlyIf[$getVar[para;$authorID]>$message;Belirttiğin miktarda paran yok.]
$footer[]
`
});
});

router.get('/basit-ekonomi', (req, res) => {
  res.json({ "kod-gunluk": `$nomention

$setUserVar[para;$sum[$random[10;1000];$getUserVar[para]]]

$title[$username, Günlük Ödülünü Aldı.]

$color[FFFFF1]

$description[$random[10;1000] Kazandınız.]
$cooldown[24h;Doatum! Bu Komutu Günde Bir Kere Kullanabilirsin.]
`
,
"kod": `$nomention
$title[$username Çalıştı!]
$color[#ff0000]
$description[$username'in Kazancı:
$random[60;800] Tebrikler!]
$setUserVar[para;$sum[$getUserVar[para;$authorID];$random[60;800]];$authorID]
$cooldown[5m;Biraz Mola Ver Dostum!]  
`
,
"kod": `$nomention

$authorIcon[$userAvatar[$mentioned[1;yes]]] $author[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]] $addTimestamp

$description[
$addField[Nakit:; $getVar[para;$mentioned[1;yes]]]
$addField[Banka:; $getVar[bank;$mentioned[1;yes]]]
$addField[Toplam:; $calculate[$getVar[bank;$mentioned[1;yes]]+$getVar[para;$mentioned[1;yes]]]]
]
`
});
});

router.get('/dilen', (req, res) => {
  res.json({ "kod": `$setVar[para;$sum[$getVar[para;$authorID];$random[50;500]];$authorID]
$color[FFFFFF]
$description[**<@$authorID>, para dilendin ve** \`$random[50;500]\` 💵 **para kazandın.**]
$changeCooldownTime[gün;saat;dakika;saniye]
$cooldown[24h;**<@$authorID>, bu komutu kullana bilmen için %time-h% kaldı!**]
$footer[]
`
});
});

router.get('/bahis', (req, res) => {
  res.json({ "kod": `$nomention
$title[KUMAR]
$color[00ff00]

$globalCooldown[10s;biraz dinlen]

$onlyIf[$isNumber[$message]==true;lüffen sayı gir]
$onlyIf[$message<$getVar[para;$authorID];paran yetersiz]
$onlyIf[$message>0;dostum kumar için elle tutulur gözle görülür bir para lazım]

$var[sayı;$multi[$message;$randomText[0;0;0;0;2;3]]]

$if[$message>$var[sayı]]

$description[**zarar:** -$message 💶]

$setVar[para;$sub[$getVar[para;$authorID];$message];$authorID]
$thumbnail[$userAvatar[$authorID]]
$else

$description[**kazanç:** $var[sayı] 💶]
$setVar[para;$sum[$getVar[para;$authorID];$var[sayı]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$endif
`
});
});

router.get('/soy', (req, res) => {
  res.json({ "kod-soy1": `$nomention
$cooldown[12h;**<@$authorID>, bu komutu 12 saat içerisinde sadece bir kez kullanabilirsin.**]
$deleteIn[7s]
$description[**<@$authorID>, şuan <@$mentioned[1]> adlı kişiyi soyuyorsun.**]
$setVar[soy2;$random[100;500];$authorID]
$setVar[soy;$replaceText[$replaceText[$randomText[evet; hayır];evet;evet;40];hayır;hayır;65];$authorID]
$onlyIf[$mentioned[1]!=$authorID;**<@$authorID>, kendini soyamazsın!**]
$onlyIf[$mentioned[1]!=;**<@$authorID>, birini soymak için önce onu etiketlemelisin!**]
`,
"kod-soy2": `$nomention
$cooldown[12h;wow]
$replyIn[8s]
$onlyIf[$getVar[soy;$authorID]!=belirsiz;]
$onlyIf[$getVar[soy;$authorID]!=hayır;]
$setVar[para;$sum[$getVar[soy2;$authorID];$getVar[para;$authorID]];$authorID]
**<@$authorID>, soyduğun para miktarı** __$getVar[soy2;$authorID]__ 
$setVar[soy;belirsiz;$authorID]
$setVar[para;$sub[$getVar[para;$mentioned[1]];$getVar[soy2;$authorID]];$mentioned[1]]
$onlyIf[$mentioned[1]!=$authorID;]
$onlyIf[$getVar[para;$mentioned[1]]>$getVar[soy2;$authorID];**<@$authorID>, soymaya çalıştığınız kişinin cebinde para yok.**]
$onlyIf[$mentioned[1]!=;]
`
,
"kod-soy3": `$nomention
$cooldown[12h;wow]
$replyIn[8s]
$onlyIf[$getVar[soy;$authorID]!=belirsiz;]
$onlyIf[$getVar[soy;$authorID]!=evet;]
**<@$authorID>, yaptığın soygun başarısız.**
$setVar[soy;belirsiz;$authorID]
$onlyIf[$mentioned[1]!=$authorID;]
$onlyIf[$mentioned[1]!=;]
`
});
});

router.get('/sansli-kutu', (req, res) => {
  res.json({ "kod": `$nomention
$title[$username Bir Şanslı Kasa Açtı!]
$description[▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
📦・$randomText[1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;99;500;999;1000;300;250;100;500] para $randomText[Kazandı!;Kaybetti!]
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬]
$footer[Dinamik / Web Panelli Gelişmiş Bot]
$color[ffb500]



$if[$randomText[Kazandı!;Kaybetti!]==Kazandı!]
$setUserVar[coin;$sum[$getUserVar[para;$authorID];$randomText[1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;99;500;999;1000;300;250;100;500]];$authorID]

$endif


$if[$randomText[Kazandı!;Kaybetti!]==Kaybetti!]
$setUserVar[para;$sub[$getUserVar[para;$authorID];$randomText[1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;99;500;999;1000;300;250;100;500]];$authorID]


$endif
$cooldown[10m;Lütfen 10Dk saniye bekle.] 
$setUserVar[talk;$sum[4;$getUserVar[talk]]]
$footer[]
`
});
});

router.get('/para-gonder', (req, res) => {
  res.json({ "kod": `$nomention
$suppressErrors
$argsCheck[>2;**<@$authorID>, para göndereceğim kişiyi etiketlemelisin!** \`+para-gönder <miktar> <@kullanıcı>\`]
$argsCheck[>1;**<@$authorID>, gönderilecek para miktarını girmelisin.** \`+para-gönder <miktar> <@kullanıcı>\`]
$onlyIf[$mentioned[1]!=;**<@$authorID>, para göndereceğin kişiyi etiketlemeyi unuttun!** \`+para-gönder <miktar> <@kullanıcı>\`]
$onlyIf[$mentioned[1]!=$authorID;**<@$authorID>, kendine para gönderemezsin.**]
$onlyIf[$noMentionMessage[1]>0;**<@$authorID>, 0 ve altı sayı giremezsin!**]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;**<@$authorID>, gönderilicek para miktarını girmelisin!** \`*para-gönder <miktar> <@kullanıcı>\`]
$onlyIf[$getVar[bank;$authorID]>=$noMentionMessage[1];**<@$authorID>, $noMentionMessage[1] miktarda para bankanda bulunmuyor!**]

$color[7DCA49]
$author[Para Gönderme İşlemi]
$authorIcon[$authorAvatar]
$addTimestamp

$description[$thumbnail[$userAvatar[$mentioned[1]]]
**Parayı alan kişi:** 
\`$username[$mentioned[1]#$discriminator[$mentioned[1]]\` 

**Gönderilen Para Miktarı:** 
\`$noMentionMessage\` :coins:

**Parayı gönderen kişi:** 
\`$username#$discriminator[$authorID]\`]]
$setVar[bank;$sum[$getVar[bank;$mentioned[1]];$noMentionMessage[1]];$mentioned[1]]
$setVar[bank;$sub[$getVar[bank;$authorID];$noMentionMessage[1]];$authorID]
$thumbnail[https://cdn.discordapp.com/attachments/853915957411971162/853937348865687582/20210614_130123.png]
$footer[]
`
});
});

router.get('/kasa-al-ac', (req, res) => {
  res.json({ "kod-kasa-al": `$nomention
$suppressErrors[Bu bir sayı değil!]
$title[Kasa alma işlemi]
$color[FFFFFF]
$description[**<@$authorID>, $message[1] adet kasa başarıyla alındı.**
$addField[Ödenilen Ücret:;**$multi[300;$message[1]] $**]]
$setVar[para;$sub[$getVar[para;$authorID];$multi[300;$message[1]]];$authorID]
$onlyIf[$message[1]!=;**<@$authorID>, alınacak kasa miktarı gir!**]
$onlyIf[$getVar[para;$authorID]>=$multi[300;$message[1]];**<@$authorID>, cüzdanında yeterli miktarda paran yok!**]
$setVar[kasalar;$sum[$getVar[kasalar;$authorID];$message[1]];$authorID]
$footer[]
`
,
"kod-kasa-aç": `$nomention
$color[FFFFFF]
$title[Kasa açma işlemi]
$onlyIf[$getVar[kasalar;$authorID]>0;**<@$authorID>, kullanıcılacak kasan kalmadı!**]
$description[**<@$authorID>, 1 adet kasa başarıyla kullanıldı.** 
$addField[Çıkan Para:; **$random[50;500] $ **]]
$setVar[para;$sum[$getVar[para;$authorID];$random[50;500]];$authorID]
$setVar[kasalar;$sub[$getVar[kasalar;$authorID];1];$authorID]
$footer[]
`
});
});

router.get('/banka', (req, res) => {
  res.json({ "kod-çek": `$nomention
$setVar[para;$sum[$getVar[para;$authorID];$message];$authorID]
$setVar[bank;$sub[$getVar[bank;$authorID];$message];$authorID]
$title[DarkSide hesabından para çekildi.]
$description[
Çekilen miktar - $message
]
$onlyIf[$getVar[bank;$authorID]>=$message;Banka hesabında o kadar para yok]
$onlyIf[$noMentionMessage<50001; 50,000 Üstü Sayı Giremezsin.]
`,
"kod-yatir": `$nomention
$setVar[para;$sub[$getVar[para;$authorID];$message];$authorID]
$setVar[bank;$sum[$getVar[bank;$authorID];$message];$authorID]
$title[DarkSide hesabına Para Yatırıldı.]
$description[
Yatırılan miktar - $message
]
$onlyIf[$getVar[para;$authorID]>=$message;Cüzdanından o kadar para yok]
$onlyIf[$noMentionMessage<50001; 50,000 Üstü Sayı Giremezsin.]
`
});
});

router.get('/meslek-sistemj', (req, res) => {
  res.json({ "kod-meslek-sec": `$nomention
$color[FFFFFF]
$suppressErrors
$title[Meslek Seçimi] $if[$checkContains[$message[1];geliştirici]==true]
$description[**<@$authorID>, başarıyla geliştirici olarak işe girdin!**]
$setVar[meslek;geliştirici;$authorID]
$endif
$if[$checkContains[$message[1];polis]==true]
$description[**<@$authorID>, başarıyla polis olarak bir departmana atandın!**]
$setVar[meslek;polis;$authorID]
$endif
$if[$checkContains[$message[1];oduncu]==true]
$description[**<@$authorID>, başarıyla oduncu olarak bir işe başladın!**]
$setVar[meslek;oduncu;$authorID]
$endif
$cooldown[24h;Mesleğini 24 Saatde Bir Değiştirebilirsin]
`
,
"kod-meslek-sifirla": `$nomention
$setVar[meslek;işsiz;$authorID]
$color[FFFFFF]
$description[**<@$authorID>, mesleğiniz sıfırlandı. Artık işsizsiniz!**]
$onlyIf[$getVar[meslek;$authorID]!=işsiz;**❌ | <@$authorID>, zaten işsizsin!**] 
`
});
});
//////////MARKET//////////
router.get('/', (req, res) => {
  res.json({ "kod": ``
});
});

router.get('/para-ekle-sil', (req, res) => {
  res.json({ "kod-para-ekle": `$nomention
$onlyForIDs[SAHİP-İD;Senin Developer olduğunu sanmıyorum]
$color[7DCA49]
$title[Developer Paneli]
$description[<@$mentioned[1]> adlı kullanıcıya para başarıyla verildi.

Verilen Miktar - $noMentionMessage
Güncel parası - $sum[$getVar[para;$mentioned[1]];$noMentionMessage[1]]]
$setVar[para;$sum[$getVar[para;$mentioned[1]];$noMentionMessage[1]];$mentioned[1]]
$argsCheck[>1;Kullanım +para-ekle {miktar} @üye]
`
,
"kod": `$nomention
$onlyForIDs[SIZIN IDNIZ;Senin Developer olduğunu sanmıyorum]
$color[7DCA49]
$title[Developer Paneli]
$setVar[para;$sub[$getVar[para;$mentioned[1]];$noMentionMessage];$mentioned[1]]  
$description[<@$authorID> <@$mentioned[<]> kişisinden **$noMentionMessage**$ silindi.] 
$color[FFFFFF]
$argsCheck[>1;Kullanım +para-sil {miktar} @üye]
$footer[]
`
});
});

router.get('/para-siralamasi', (req, res) => {
  res.json({ "kod": `$var[emoji;💵]

$nomention 
$color[7DCA49]
$title[Para Sıralaması $var[para]]
$description[

🥇$username[$getLeaderboardValue[globalUser;para;asc;1;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;1;value];.] $var[para]
🥈$username[$getLeaderboardValue[globalUser;para;asc;2;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;2;value];.] $var[para]
🥉$username[$getLeaderboardValue[globalUser;para;asc;3;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;3;value];.] $var[para]
-----------------------------------------------
4.  $username[$getLeaderboardValue[globalUser;para;asc;4;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;4;value];.] $var[para]
5.  $username[$getLeaderboardValue[globalUser;para;asc;5;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;5;value];.] $var[para]
6.  $username[$getLeaderboardValue[globalUser;para;asc;6;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;6;value];.] $var[para]
7.  $username[$getLeaderboardValue[globalUser;para;asc;7;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;7;value];.] $var[para]
8.  $username[$getLeaderboardValue[globalUser;para;asc;8;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;8;value];.] $var[para]
9.  $username[$getLeaderboardValue[globalUser;para;asc;9;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;9;value];.] $var[para]
10.$username[$getLeaderboardValue[globalUser;para;asc;10;id]] ~ $numberSeparator[$getLeaderboardValue[globalUser;para;asc;10;value];.] $var[para]

]
$footer[]
`
});
});

router.get('/para-kasma', (req, res) => {
  res.json({ "kod-al": `$nomention
$title[HATA]
$description[eşya alma başarısız **\`geçersiz eşya adı\`**]
$color[ff0000]
$else

$title[EŞYA ALMA İŞLEMİ]
$description[$message adlı eşya alındı]
$footer[]
$color[ffffff]
$endif

$if[$message==tüfek] $onlyIf[$getVar[tüfek;$authorID]!=var;zaten bir tüfeğin var] $onlyIf[$getVar[para;$authorID]>600;satın alınamadı , **\`yetersiz nakit\`**] $setVar[para;$sub[$getVar[para;$authorID];600];$authorID] $setVar[tüfek;var;$authorID] $endif
$if[$message==olta] $onlyIf[$getVar[olta;$authorID]!=var;zaten bir oltan var] $onlyIf[$getVar[para;$authorID]>500;satın alınamadı , **\`yetersiz nakit\`**] $setVar[para;$sub[$getVar[para;$authorID];500];$authorID] $setVar[olta;var;$authorID] $endif
$if[$message==kürek] $onlyIf[$getVar[kürek;$authorID]!=var;zaten bir küreğin var] $onlyIf[$getVar[para;$authorID]>400;satın alınamadı , **\`yetersiz nakit\`**] $setVar[para;$sub[$getVar[para;$authorID];400];$authorID] $setVar[kürek;var;$authorID] $endif
`,
"kod-balik-tut": `$nomention

$if[$getVar[olta;$authorID]==yok]
$title[HATA]
$description[balıkçılık başarısız oltan yok **\`s-market\`**]
$color[ff0000]
$else


$title[BALIK TUTTUN]
$color[00ff00]
$description[**kazanç** $random[50;120] 💶]

$setVar[para;$sum[$getVar[para;$authorID];$random[50;200]];$authorID]
$globalCooldown[30s;30 saniye bekle]
$thumbnail[$userAvatar[$authorID]]
$endif
`
,
"kod-kaz": `$nomention

$if[$getVar[kürek;$authorID]==yok]
$title[HATA]
$description[kazı başarısız küreğin yok **\`s-market\`**]
$color[ff0000]
$else


$title[KAZDIN!]
$description[**kazanç:** $random[20;95] 💶]
$color[00ff00]

$setVar[para;$sum[$getVar[para;$authorID];$random[20;95]];$authorID]
$globalCooldown[30s;30 saniye bekle]
$thumbnail[$userAvatar[$authorID]]
$endif
`
,
"kod-avlan": `$nomention

$if[$getVar[tüfek;$authorID]==yok]
$title[HATA]
$description[avlanama başarısız tüfeğin yok **\`s-market\`**]
$color[ff0000]
$else


$title[AVLANDIN!]
$description[**kazanç:** $random[70;135] 💶]
$color[00ff00]
$thumbnail[$userAvatar[$authorID]]


$setVar[para;$sum[$getVar[para;$authorID];$random[70;135]];$authorID]
$globalCooldown[30s;30 saniye bekle]
$endif
`
,
"kod-itemler": `$nomention
$title[$username[$mentioned[1;yes]] kullanıcısının itemleri]
$description[
•Tüfek: $getVar[tüfek;$authorID]
•Kürek: $getVar[kürek;$authorID]
•Olta:  $getVar[olta;$authorID]
]
`
});
});

/////KATEGORİ = RESİMLİ-SİSTEM/////

router.get('/renk-bilgi', (req, res) => {
  res.json({ "kod": `$nomention

$httpGet[https://api.popcat.xyz/color/$message]
$var[h;$httpResult[hex]]
$var[n;$httpResult[name]]
$var[r;$httpResult[rgb]]
$var[b;$httpResult[brightened]]
$var[i;$httpResult[color_image]]


$httpGet[https://api.popcat.xyz/translate?to=tr&text=$var[n]]

$title[İşte istediğin renk:]
$description[
> **hex:** $var[h]
> **isim:** $httpResult[translated]
> **rgb:** $var[r]
> **parlatılmış:** $var[b]
]

$thumbnail[$var[i]]

$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/iphone-uyari', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/alert?text=$url[encode;$message]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/fact', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/facts?text=$url[encode;$message]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]`
});
});

router.get('/pet-gif', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/pet?image=$replaceText[$userAvatar[$mentioned[1;yes]];?size=2048;;-1]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/uyari-tabela', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/caution?text=$url[encode;$message]]



$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/tersine-yazi', (req, res) => {
  res.json({ "kod": `$httpGet[https://api.popcat.xyz/reverse?text=$url[encode;$message]]

$title[Mesaj:]
$description[$message]

$addField[Tersine:;$httpResult[text]]

$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/blur', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/blur?image=$replaceText[$userAvatar[$mentioned[1;yes]];?size=2048;;-1]

]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/drip', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/drip?image=$replaceText[$userAvatar[$mentioned[1;yes]];?size=2048;;-1]
]

$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/sec-birini', (req, res) => {
  res.json({ "kod": `$httpGet[https://api.popcat.xyz/wyr]
$var[u1;$httpResult[ops1]]
$var[u2;$httpResult[ops2]]

$httpGet[https://api.popcat.xyz/translate?to=tr&text=$var[u1]]
$var[t1;$httpResult[translated]]
$httpGet[https://api.popcat.xyz/translate?to=tr&text=$var[u2]]
$var[t2;$httpResult[translated]]


$title[Seç Birini Oyunu]
$addField[seçenek1:;$var[t1];yes]
$addField[seçenek2:;$var[t2];yes]

$addReactions[1️⃣;2️⃣]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/pikacu', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/pikachu?text=$url[encode;$message]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/biden', (req, res) => {
  res.json({ "kod": `$nomention
$image[https://api.popcat.xyz/biden?text=$url[encode;$message]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/saka', (req, res) => {
  res.json({ "kod": `$httpGet[https://api.popcat.xyz/joke]

$var[ujoke;$httpResult[joke]]
$httpGet[https://api.popcat.xyz/translate?to=tr&text=$var[ujoke]]

$description[$httpResult[translated]]
$footer[kaynak:$var[ujoke]]


$author[$username[$authorID]#$discriminator[$authorID]] $authorIcon[$authorAvatar]
`
});
});

router.get('/mc-basarim', (req, res) => {
  res.json({ "kod": `$nomention
https://minecraftskinstealer.com/achievement/2/Basarim+Kazanildi/$message[1]+$message[2]+$message[3]
$argsCheck[<1;Doğru kullanım **!başarim** yazı ]
$globalCooldown[3s;Komutu 3 Saniyede Bir Kullanabilirsin]
$deletecommand
`
});
});

router.get('/rastegele-kedi', (req, res) => {
  res.json({ "kod": `$nomention
$title[Kedicik Miyav]
$color[ff99ff]
$image[https://cataas.com/cat?$random[1;9999]]
$color[84ff00]
$footer[]
`
});
});

router.get('/ship', (req, res) => {
  res.json({ "kod": `$nomention
$onlyIf[$or[$mentioned[1]==;$mentioned[2]==;$mentioned[3]!=]==false;Bu Komutun Çalışması İçin İki Kişiyi Etiketlemelisin !]
$onlyIf[$mentioned[1]!=$mentioned[2];Aynı Kişiler Arasındaki Aşkı Ölçemiyorum]

$title[$username[$authorID], $username[$mentioned[1]] ve $username[$mentioned[2]] kullanıcılarını shipledi ❤❤️‍🔥]
$image[https://api.resetxd.xyz/love-me?avatar1=$userAvatar[$mentioned[1]]&avatar2=$userAvatar[$mentioned[2]]&percentage=$random[0;100]]
`
});
});

router.get('/qr', (req, res) => {
  res.json({ "kod": `$nomention

$title[$message İçin Qr Kod]
$image[https://apiv1.spapi.ga/image/qrcode?text=$url[encode;$message]]
$authorIcon[$authorAvatar] $author[$username[$authorID] Tarafından İstendi]
`
});
});

//////////KATEGORİ = 1//////////
router.get('/sa-as', (req, res) => {
  res.json({
"kod-sa-as-ac": "$nomention $setServerVar[sa-as;yes] Bot Artık 'sa' Yazıldığında Cevap Verecek $onlyAdmin[Yeterli Yetkin Bulunmamakta]"
,
"kod-sa-as-kapat":"$nomention $setServerVar[sa-as;no] Bot Artık 'sa' Yazıldığında Cevap Vermeyecek $onlyAdmin[Yeterli Yetkin Bulunmamakta]"
,
"kod-sa":"$nomention $enabled[$getServerVar[sa-as];] Aleyküm Selam Hoşgeldin **$username** $onlyIf[$message==;]"
});
});

router.get('/duyuru', (req, res) => {
  res.json({ "kod":"$nomention $title[📢Duyur📢] $description[$message] $footer[Duyuruu!] $color[FF0000] $onlyAdmin[Bu Komutu Kullanman İçin 'Yetkili' Olmalısın] $deletecommand" });
});

router.get('/dm', (req, res) => {
  res.json({ "kod": "$nomention $dm[$mentioned[1]] $color[ff0000] $argsCheck[>1;DM'sine Mesaj Göndermek İstediğiniz Kişiyi Etiketleyin!] $onlyAdmin[Bu Komutu Kullanabilmek İçin **'Yetkili'** Olmalısın!] $title[Mesaj Geldi] $description[ Merhaba <@$mentioned[1]> $noMentionMessage] $argsCheck[>2;Lütfen Göndereceğinizi Yazın!] $deletecommand"
});
});

router.get('/zarat', (req, res) => {
  res.json({ "kod": "$nomention $try $var[sonuç;$randomText[:zar1:;:zar2:;:zar3:;:zar4:;:zar5:;:zar6:]] $var[sonuç2;$randomText[<:zar6:;:zar5:;:zar4:;:zar3:;:zar2:;:zar1:]] $endtry $title[zar atılıyor...] $color[ff0000] $if[$message==] $description[:zar:] $editEmbedIn[2s;zar attın;$var[sonuç];;00ff00] $else $description[:zar: :zar:] $editEmbedIn[2s;zar attın;$var[sonuç] $var[sonuç2];;00ff00] $endif" });
});

router.get('/masa-firlat', (req, res) => {
  res.json({ "kod": `$nomention
$title[$username masa fırlattı]
$image[https://vacefron.nl/api/tableflip?user=$userAvatar[$authorID]]
$footer[]
$addTimestamp` });
});

router.get('/AD', (req, res) => {
  res.json({
    "kod-şifre-oluştur":`
$nomention
$argsCheck[>1;**Bir Uzunluk Girmelisin !**]
$title[Kodunu Özelden Gönderdim]
$footer[DarkSide Development]
$color[00ff00]
$suppressErrors[**Lütfen Tekrar Deneyin !**]
`,
    "kod-şifre-oluştur2":`$nomention
$dm[$authorID]
$argsCheck[>1;]
$title[Rastgele Şifre]
$description[$randomString[$message]]
$footer[DarkSide Development]
$color[00ff00]
$suppressErrors[]`
});
});

router.get('/espri', (req, res) => {
  res.json({ "kod":`$nomention
$title[Espiri]
$description[$randomText[Geçenlerde izdivaç programında adam evim, arabam, param var dedi üç hatun aynı anda elektrik aldı. Adam bildiğin üçlü priz çıktı.;Saçını sarıya boyatıp kaşlarını zift karası bırakınca doğal sarışın olmuyorsun tatlım.Borussia Dortmund deplasman forması gibi oluyon.;Ben Yedigün içiyorum sen Onbeşgün iç.;Sinemada on dakika ara dedi, aradım aradım açmadı.;Röntgen Filmi çektirdik, yakında sinemalarda.;Masada hangi örtü kullanılmaz? - Bitki Örtüsü.;İnsanların seni ezmesine izin verme! Ehliyet al, sen onları ez;İlahi Azrail Sen adamı öldürürsün!;Rıdvan'ın bir büyüğü kimdi? -Rıdtwo;Elektriği Edison buldu ama parasını niye biz ödüyoruz.;Mafya babası olmak için oğlumun adını “Mafya” koydum;Zenginler et, fakirler hâyalet yerler.;Canın sıkıldıysa gevşet.;Abi sen tüp bebek misin? Gaz kaçırıyorsun da.;Seven unutmaz olum, eight unutur.;Dört tarafı suyla çevrili çaya ne denir? Adaçayı.;Terazi ile diş macunu arasındaki fark nedir? Biri tartar öbürü anti tartar.;Fransız ihtilali neye karşı yapılmıştır? Sabaha karşı.;Baraj dendi mi, akar sular durur!;Şeytan kapıyı nasıl çalar? Din den dön!;Yıkanan ton balığına ne denir? Washington.;Çalmak fiilinin gelecek zamanı nedir? Hapse girmek.;Sakla samanı,inekler aç kalsın.;Adamın biri güneşte yanmış, ay da düz.;Adamın biri kızmış istemeye gelmişler.;Ayda 5 milyon kazanma ister misin? Evet.O zaman Ay’a git.;Funda Arar dediler ama hala daha aramadı.;Adamın kafası atmış bacakları eşek.;Uzun lafın kısası,U.L;Yağmur yağmış, kar peynir!;Dünya dönermiş ay da köfte;Son gülen en geç anlayandır.;Bu erikson, başka erik yok.;Sen kamyonu al, leonardo da vinci.;Çalmak fiilinin gelecek zamanı nedir?Hapse girmek.;Adamın kafaya buda Heykeli düşmüş ne demiş Başımıza buda mı gelecekti.;Aya baktım seni gördüm, Sana baktım AYI gördüm.;Koltuk altı spreyi aldım evdeki bütün koltukların altına sıktım ohh miss gibi.]]
$color[0000ff]
`});
});

router.get('/yardim', (req, res) => {
  res.json({ "kod":`$nomention
$deletecommand
$allowMention
$title[🎉 YARDIM 🎉]
$color[ff0000]
$description[KOMUTLARINIZI YAZIN
Örnek
!çalış
!günlük
!cüzdan
]
`});
});

router.get('/intihar', (req, res) => {
  res.json({ "kod":`$nomention
$deletecommand
$title[$username intihar etti!]
$description[
intihar eden:
 <@$authorID>

intihar sebebi:
 $message
(gerçekte intihar etmeyin he )
]
$color[$randomText[000;9999]]
$argsCheck[>1; lütfen intihar sebebini yazın]
`});
});

router.get('/ülke', (req, res) => {
  res.json({ "kod":`$nomention
**<@$mentioned[1;yes]>** senin ırkın ...
$title[$randomText[Türk;alman;rus;çinli;yunan;bulgar;azeri]]
$footer[%$random[1;100]]
$color[$random[1;100000]]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
`});
});

router.get('/corona', (req, res) => {
  res.json({ "kod":`$nomention
$title[Corona Test]
$description[$username Senin Corona Testin $randomText[Pozitif Çıktı!! 14 Gün Karantinaya Girmelisin;Negatif Çıktı!! Çok Şükür]]
$footerIcon[$authorAvatar]
$addTimestamp
$footer[$username Kullandı]
$color[00ffff]
`});
});

router.get('/steve', (req, res) => {
  res.json({ "kod":`$title[steve emoji :)]
$nomention

$image[https://cdn.discordapp.com/emojis/$randomText[888548080922804334;302438795385634847;873428297210531870;873419015048007710;592377771628691460;573746081087750164;592954156411781120;588100936359215104;425370892181176331;873420209577418793;672129224131477534;641909874187304960;735880682521493514;586068093827153931;586933273058607115;441951277211975681;589630625560920090;681217726412488767;873420529279856700;588100936010825744;726091789265535056;425381858121875459;651847833699352578;840245307736457268;735868854328230019;890451627520184321].png?v=1&size=4096]
`});
});

router.get('/sayi-tahmin', (req, res) => {
  res.json({
"kod-sayi-tahmin":`
$nomention

$title[Sayı Tahmin Oyunu ]
$color[$random[1;999999]]
$description[1 ile 100 arasında bir sayı tuttum tahminini yaz :)]
$setUserVar[sayıtahmini;$random[1;100]]
$awaitFunc[sayı]
`
,
"kod-sayi":`$nomention

$if[$message==kapat]
$title[Oyun kapatıldı]
$color[$random[1;999999]]

$elseif[$isNumber[$message]==false]
$title[lütfen \`bir sayı gir\` veya oyunu kapatmak için \`kapat\` yaz]
$color[$random[1;999999]]
$awaitFunc[sayı;$authorID]

$elseif[$or[$message>100;$message<0]]
$title[tahmin ettiğim sayı \`1 ila 100\` arasında]
$color[$random[1;999999]]
$awaitFunc[sayı;$authorID]

$else

$if[$message==$getUserVar[sayıtahmini]]
$title[KAZANDIN! cevap $message idi 😉]
$color[$random[1;999999]]
$addReactions[✅]

$elseif[$message>$getUserVar[sayıtahmini]]
yanlış tahmin ! sayı daha düşük 🔻
$awaitFunc[sayı;$authorID]

$elseif[$message<$getUserVar[sayıtahmini]]
yanlış tahmin ! sayı daha yüksek 🔺
$awaitFunc[sayı;$authorID]
$endif

$endif
`});
});

router.get('/tkm', (req, res) => {
  res.json({
"kod-tkm":`$title[TAŞ KAĞIT MAKAS]
$description[]
$footer[$username adlı kullanıcının oyunu]
$addButton[no;tkm1;Taş;success;no;🗿]
$addButton[no;tkm2;Kağıt;danger;no;📄]
$addButton[no;tkm3;Makas;primary;no;✂️]

$thumbnail[$userAvatar[$authorID]]
`,
"kod-t": `$nomention

$var[cevap;$randomText[🗿;📄;✂️]]

$title[TAŞ KAĞIT MAKAS]

$description[<@$authorID> \`🗿\` **VS** <@$botID> \`$var[cevap]\`
**$if[$var[cevap]==🗿] Berabere :D $elseif[$var[cevap]==📄] kaybettin :/ $elseif[$var[cevap]==✂️] Kazandın :) $endif**
]
`,
"kod-k":`$nomention
$var[cevap;$randomText[🗿;📄;✂️]]
$title[TAŞ KAĞIT MAKAS]
$description[<@$authorID> \`📄\` **VS** <@$botID> \`$var[cevap]\`
**$if[$var[cevap]==📄] Berabere :D $elseif[$var[cevap]==✂️] kaybettin :/ $elseif[$var[cevap]==🗿] Kazandın :) $endif**]`
,
"kod-m":`$nomention

$var[cevap;$randomText[🗿;📄;✂️]]

$title[TAŞ KAĞIT MAKAS]

$description[<@$authorID> \`✂️\` **VS** <@$botID> \`$var[cevap]\`
**$if[$var[cevap]==✂️] Berabere :D $elseif[$var[cevap]==🗿] kaybettin :/ $elseif[$var[cevap]==📄] Kazandın :) $endif**]
`
  });
});

router.get('/sayac', (req, res) => {
  res.json({
"kod-sayaç-ayarla":`$title[Başarılı!]
$description[$thumbnail[$serverIcon]
**Ayarlar güncellendi.
Yeni hedef $noMentionMessage
Güncel kanal <#$getServerVar[gç]>**
]
$setServerVar[sayaç;$noMentionMessage]
$onlyIf[$isNumber[$message[1]]!=false;**Sayı Belirt.**]
$argsCheck[>1;**Doğru kullanım** e!ayarla-sayaç {hedef sayı}]
$onlyIf[$getServerVar[gç]!=;**Kanal ayarlı değil. Kullanım** e!ayarla-hg-bb {#kanal}]
`,
"kod-hgbb-ayarla":`$nomention
$setServerVar[gç;$mentionedChannels[1;yes]]
$onlyAdmin[Bu komutu sadece yetkili kullanabilir.]
$title[Başarılı!]
$description[$thumbnail[$serverIcon]
**Ayarlar güncellendi
Güncel kanal artık:**
<#$mentionedChannels[1]>
]
$footer[Elixir Development]
$addTimestamp
$color[FFFFFF]
`,
"kod-join":`
$nomention
$title[Bir Kullanıcı Spawn Oldu!]
$description[$thumbnail[$serverIcon]
👤**Kullanıcı** \`$username[$authorID]#$discriminator[$authorID]\`
🆔**ID** \`$authorID\`
⏰**Zaman** \`$date\`
📊**Hedef üye sayısına** $sub[$getServerVar[sayaç];$membersCount] **kişi kaldı.
Hedef üye $getServerVar[sayaç]**]

$footer[Elixir Development]
$addTimestamp
`
});
});

router.get('/button-yardim', (req, res) => {
  res.json({
"kod-menu":`$nomention
$title[Yardım Menüsü]
$description[**
Moderasyon | 🔒
Moderasyon Yardım Menüsünü Gösterir

Yetkili | 🛡
Yetkili Yardım Menüsünü Gösterir

Ekonomi | 💰
Ekonomi Yardım Menüsünü Gösterir

Kullanıcı | 👥
Kullanıcı Yardım Menüsünü Gösterir

**]
$addButton[no;menu;Menü;success;yes;📕;]

$addButton[no;moderasyon;Moderasyon;secondary;no;🔒;]
$addButton[no;yetkili;Yetkili;danger;no;🛡]
$addButton[no;ekonomi;Ekonomi;success;no;💰]
$addButton[no;kullanici;Kullanıcı;primary;no;👥]
$footer[]
$color[00ff00]
`,
"kod-moderasyon":`$nomention
$title[Moderasyon Yardım Menüsü]
$description[**KOMUTLARINIZ**]
$color[00ff00]
$editButton[menu;Menü;success;no;📕;]
$editButton[moderasyon;Moderasyon;secondary;yes;🔒;]
$editButton[yetkili;Yetkili;danger;no;🛡;]
$editButton[ekonomi;Ekonomi;success;no;💰;]
$editButton[kullanici;Kullanıcı;primary;no;👥;]
`,
"kod-yetkili":`$nomention
$title[Yetkili Yardım Menüsü]
$description[**KOMUTLARINIZ**]
$color[00ff00]
$editButton[menu;Menü;success;no;📕;]
$editButton[yetkili;Yetkili;danger;yes;🛡;]
$editButton[moderasyon;Moderasyon;secondary;no;🔒;]
$editButton[ekonomi;Ekonomi;success;no;💰;]
$editButton[kullanici;Kullanıcı;primary;no;👥;]
`,
"kod-ekonomi":`$nomention
$title[Ekonomi Yardım Menüsü]
$description[**KOMUTLARINIZ**]
$color[00ff00]
$editButton[menu;Menü;success;no;📕;]
$editButton[ekonomi;Ekonomi;success;yes;💰;]
$editButton[yetkili;Yetkili;danger;no;🛡;]
$editButton[moderasyon;Moderasyon;secondary;no;🔒;]
$editButton[kullanici;Kullanıcı;primary;no;👥;]
`,
"kod-kullanici":`$nomention
$title[Kullanıcı Yardım Menüsü]
$description[**KOMUTLARINIZ**]
$color[00ff00]
$editButton[menu;Menü;success;no;📕;]
$editButton[ekonomi;Ekonomi;success;yes;💰;]
$editButton[yetkili;Yetkili;danger;no;🛡;]
$editButton[moderasyon;Moderasyon;secondary;no;🔒;]
$editButton[kullanici;Kullanıcı;primary;no;👥;]
`
});
});

router.get('/oylama', (req, res) => {
  res.json({ "kod":`$nomention 
$color[FFFFFF]
$useChannel[$mentionedChannels[1]]
$description[
$thumbnail[$userAvatar[$authorID]]
$addField[**Oylama İçeriği:**;$noMentionMessage]
$addField[**Başlatan Yetkili:**;<@$authorID> | **$username#$discriminator[]**]]
$onlyAdmin[**<@$authorID>, bu komutu kullana bilmen için** \`Yönetici\` **iznine sahip olman gerekiyor!**] 
$addReactions[✅;❎] 
$argsCheck[>1;**<@$authorID>, oylama başlatmak için geçerli bir sebep girmelisin!**]
$onlyIf[$mentionedChannels[1]!=;**<@$authorID>, oylamanın yapılacağı kanalı etiketlemelisin!**]
`});
});

router.get('/trump', (req, res) => {
  res.json({ "kod": `$nomention
$title[Donald Trump Tweet Attı!]
$image[https://faketrumptweets.herokuapp.com/tweet?text=$replaceText[$message; ;%20;-1]]
$color[$random[0;999999]]
$argsCheck[>1;Donald Trumpt'dan Atmasını İstediğiniz Tweet'i Yazın.]
$footer[$username tarafından istendi]
$addTimestamp
$botTyping
$suppressErrors[Hata Oluştu; Lütfen Tekrar Deneyin.]
$deletecommand
$ignoreTriggerCase
$footerIcon[$authorAvatar]
`});
});

router.get('/afk', (req, res) => {
  res.json({
"kod-afk":`$nomention
$color[FFFFFF]
$setUserVar[afksebep;$noMentionMessage;$authorID]
$setUserVar[afk;var;$authorID]
$description[<@$authorID> \`$noMentionMessage\` sebebiyle afk moduna geçiş yaptı.]
$footer[]
$addTimestamp
$deleteIn[6s]
$argsCheck[>1;**Bir sebep belirtmelisin.**] 
`,
"kod-unafk":`$nomention
$color[FFFFFF]
$onlyIf[$getUserVar[afk;$authorID]!=yok;]
$setUserVar[afk;yok;$authorID]
$setUserVar[afksebep;;$authorID]
$title[Başarılı!]
$description[<@$authorID> Artık Afk Değilsin!.]
$deleteIn[3s]
`,
"kod-etiket":`$nomention
$color[ffffff]
$onlyIf[$getUserVar[afk;$mentioned[1]]!=yok;]
$description[
$username[$mentioned[1]] Adlı  Kullanıcı $getUserVar[afksebep;$mentioned[1]] Sebebi ile afk.]
$footer[]
$addTimestamp 
$deletecommand
`
});
});

router.get('/hesapmakinesi', (req, res) => {
  res.json({ "kod": `$nomention
$argsCheck[3; İşlem Yapılacak 2 Sayı Yazın örnek: 7 * 2=14 Not:Sayı ve işaret arasında boşluk olması gerekir ve eksili sayılarla işlem olamaz]
$title[Hesap Makinesi]
$description[İşlem: 
$message 
İşlem Sonucu: 
$numberSeparator[$$replaceText[$replaceText[$replaceText[$replaceText[$message[2];*;multi;1];+;sum;1];/;divide;1];-;sub;1][$message[1];$message[3]]; ,]]
$footer[Matematik İşlemi Yapıldı]
` });
});

router.get('/impostor', (req, res) => {
  res.json({ "kod": `$nomention
$title[$username was not The Impostor]
$image[https://vacefron.nl/api/ejected?name=$username&imposter=false&crewmate=red]
` });
});

router.get('/kullanicibilgi', (req, res) => {
  res.json({ "kod": `$nomention
$color[FF0000]
$thumbnail[$userAvatar[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]]
$author[$username[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]]
$authorIcon[$userAvatar[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]]
$description[Kullanıcı: \`$username[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]#$discriminator[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]\`
ID: \`$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]\`
Hesap Oluşturma Tarihi: \`$creationDate[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]
\`
Bot: \`$isBot[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]]\`
Avatar: [Link]($userAvatar[$replaceText[$replaceText[$isNumber[$message[1]];true;$message[1];1];false;$mentioned[1;yes];1]])]
$footer[Kullanan: $username]`
});
});

router.get('/butonlu-davet', (req, res) => {
  res.json({ "kod": `$nomention
$description[**İşte Davet Linkim Dostum**]

$addButton[no;$getBotInvite;Beni Davet Etmek İçin Tıkla;link;no;]
` });
});

router.get('/etiketengel', (req, res) => {
  res.json({ "kod": `$nomention
$deletecommand
$description[<@$authorID> Sahibimi Etiketleme!🙅]
$color[FF0000]
$deleteIn[5]
$footerIcon[$authorAvatar]
$footer[$username]
`});
});

router.get('/dm-destek', (req, res) => {
  res.json({ 
"kod-destek":`$nomention
$description[<@$authorID>, Sorunun Nedir Dostum?
\`Sorununuzu Direk Mesaj Olarak Yazabilirsiniz!\`]  
$color[000001]
$awaitFunc[sorun;$authorID]
$footer[$username Kullandı!]
$onlyIf[$message==;]
$reply
`,
"kod-sorun":`$nomention
$deletecommand
$getUserVar[sorun]
$title[**$serverName[$guildID]**]
$description[
Sorun: \`$message\`
-------------------------
**Sorunun olduğu sunucu:** $getServerInvite[$guildID]]
$dm[647832976213803029] 
$channelSendMessage[$channelID;Sorununuzu Sahibime Gönderdim🥰]
`
});
});

router.get('/uyarı', (req, res) => {
  res.json({
"kod-warn":`<@$mentioned[1]> 
$title[⚠️ Uyarı Aldınız!]
$description[
**Uyarı Alan** : <@$mentioned[1]> 
**Sebep** : $noMentionMessage]
$argsCheck[>1;Yanlış Kullanım \`!warn @kullanıcı sebep\` şeklinde yazınız.]
$onlyAdmin[⚠️ Bu komutu kullanmak için \`Yönetici\` iznine sahip olmalısın]
$setUserVar[uyarı;$sum[$getUserVar[uyarı;$mentioned[1]];1];$mentioned[1]]
`,
"kod-uyarı-say":`$description[
<@$mentioned[1]> **adlı kullanıcının toplam uyarı sayısı** : **$getUserVar[uyarı;$mentioned[1]]**]
$color[00ff00]
$argsCheck[>1;Lütfen bir kullanıcı belirt \`!uyarı-say @kullanıcı\` ]
`,
"kod-uyarı-sil":`$argsCheck[>1;Lütfen birini etiketle \`!uyarısil @kullanıcı\`]
$onlyAdmin[Bu komutu kullanmak için \`Yönetici\` iznine sahip olman gerek.]
<@$mentioned[1]> **adlı kişinin uyarıları başarıyla silindi !**
$setUserVar[uyarı;0;$mentioned[1]]
`
});
});

router.get('/button-rol', (req, res) => {
  res.json({
"kod-button-rol":`$nomention
$title[Buton Rol]
$description[
**Rolü Almak İçin Aşağıdaki Butona Tıklayınız!!**]
$footerIcon[$authorAvatar]
$footer[$username | Rolünü Alabilirsin!]
$addButton[no;rol;;primary;no;🔥]
`,
"kod-interaction":`$nomention
$giveRole[$authorID;ROL İD]
`
});
});

router.get('/bot-istatistik', (req, res) => {
  res.json({ "kod": `$nomention
$color[FF0000]
$thumbnail[$userAvatar[647832976213803029]]
$authorIcon[$userAvatar[647832976213803029]]
$author[İstatistikler]
$addField[**Çalışma süresi**;$uptime]
$addField[**Komut sayısı**;$commandsCount]
$addField[**Kullanıcı sayısı**;$allMembersCount]
$addField[**Sunucu sayısı**;$serverCount]
$addField[**Ping**;$pingms!]
$addField[**Developer**;<@647832976213803029> | $username[647832976213803029]#$discriminator[647832976213803029]]

$footer[]
$addTimestamp
`
});
});

router.get('/mesaj-sil', (req, res) => {
  res.json({ "kod": `$nomention
$deletecommand
$clear[$message]
$onlyPerms[managemessages;Bu komutu kullanabilmek için Mesajları Yönet yetkisine sahip olman gerek.]
$description[
**$message[1] Mesaj Uzaya Uçtu🚀.**]
$argsCheck[>1;Lütfen bir sayı belirt.]
$onlyIf[$isNumber[$message]!=false;Girdiğin şey bir sayı değil.]
$deleteIn[4s]
$suppressErrors
$onlyIf[$message<101; 100 Üstü Sayı Giremezsin.]

$onlyIf[$message>2; 2 Ve Altı Sayı Giremezsin.]

`
});
});

router.get('/istek-kod', (req, res) => {
  res.json({ "kod-log-ayarla": `$nomention
$cooldown[1m;<@$authorID>, **Biraz Yavaşla!**]
$color[FFFFFF]
$title[İstek Kod Sistemi]
$description[$thumbnail[$userAvatar[$authorID]]
**<@$authorID>, İstek Kod Log Kanalı Olarak <#$mentionedChannels[1]> Kanalı Ayarlandı.**
$addField[Ayarlayan Yetkili:;__$username#$discriminator[$authorID]__ | <@$authorID>]]
$setServerVar[istekl;$mentionedChannels[1]]
$onlyIf[$mentionedChannels[1]!=;**<@$authorID>, Ayarlanacak Kanalı Etiketlemeyi Unuttun!**]
$footer[]
`
,
"kod-log-sifirla": `$nomention
$cooldown[1m;<@$authorID>, **Biraz Yavaşla!**]
$color[FFFFFF]
$title[İstek Kod Sistemi]
$description[$thumbnail[$userAvatar[$authorID]]
**<@$authorID>, İstek Kod Log Kanalı Başarıyla Sıfırlandı!**
$addField[Sıfırlayan Yetkili:;__$username#$discriminator[$authorID]__ | <@$authorID>]]
$resetServerVar[istekl]
$footer[]
`
,
"kod-istek": `$nomention
$if[$message==]
$color[000046]
$thumbnail[https://media.discordapp.net/attachments/938889536870695015/982717028416753674/20220603_154258.jpg]
$footer[$username]
$footerIcon[$authorAvatar]
$author[Elixir - İstek Kod]
$authorIcon[https://media.discordapp.net/attachments/938889536870695015/982717028416753674/20220603_154258.jpg]
$title[İstek - Kod]
$description[
***İSTEK KODUNUZU BELİRTMEK İÇİN,***

\`{prefix}istek bdfd {İSTEDİĞİNİZ KOD}\`
\`{prefix}istek aoi.js {İSTEDİĞİNİZ KOD}\`
\`{prefix}isted djs {İSTEDİĞİNİZ KOD}\`
]
$endif

$if[$message[1]==bdfd]
$useChannel[$getServerVar[istekl]] 
$color[FFFFFF]
$description[$thumbnail[https://media.discordapp.net/attachments/892083528114778114/986018790263386192/60df53a2d5fdb.png]]
$addField[Kod İsteyen:;**$username#$discriminator[$authorID]** | <@$authorID>] 
$addField[İstediği Kod:;**$noMentionMessage**]
$addReactions[✅]
$addReactions[❎]
$footer[]
$endif

$if[$message[1]==aoi.js]
$useChannel[$getServerVar[istekl]] 
$color[FFFFFF]
$description[$thumbnail[https://media.discordapp.net/attachments/892083528114778114/986018778133454918/83202021.png]]
$addField[Kod İsteyen:;**$username#$discriminator[$authorID]** | <@$authorID>] 
$addField[İstediği Kod:;**$noMentionMessage**]
$addReactions[✅]
$addReactions[❎]
$footer[]
$endif

$if[$message[1]==djs]
$useChannel[$getServerVar[istekl]] 
$color[FFFFFF]
$description[$thumbnail[https://media.discordapp.net/attachments/892083528114778114/986018512587882526/CrhvyR9ll1G5YcwgT4_nfaJow_R4QP0C5Qf8xScUL5E.jpg]]
$addField[Kod İsteyen:;**$username#$discriminator[$authorID]** | <@$authorID>] 
$addField[İstediği Kod:;**$noMentionMessage**]
$addReactions[✅]
$addReactions[❎]
$footer[]
$endif
`
});
});

router.get('/bakim-mod', (req, res) => {
  res.json({ "kod-bakim": `$nomention
$onlyForIDs[BPTU BAKIMA ALABİLİCEK KİŞİNİN IDSİ;Malesef bakım modunu sadece yetkililer açıp kapayabilir]

$textSplit[$getVar[bakım];<{}>]
$var[bakım;$splitText[1]]
$var[gsebep;$replaceText[$getVar[bakım];$splitText[1]<{}>;;-1]]
$var[ysebep;$replaceText[$message;$message[1];;-1]]

$if[$message[1]==aç]
$onlyIf[$message[2]!=;Botu bakıma almak için bir sebep belirtmelisin]
$author[Bakım modu açıldı] 
$description[Bot artık **\`$var[ysebep]\`** ile bakım modunda !]
$color[ff0000]
$setVar[bakım;açık<{}>$var[ysebep]]

$elseif[$message[1]==kapat]
$author[Bakım modu kapandı]
$description[**\`$var[gsebep]\`** ile bakıma alınan bot artık bakımda değil !]
$color[00ff00]
$setVar[bakım;kapalı<{}>]

$else
Komut kullanılamadı!
**Komutun Kullanımı:**
\`{prefix}bakım aç sebep...\`
\`{prefix}bakım kapat\`
$endif
`
,
"kod-bakim-modu": `$if[$and[$authorID!=BAKIM MODUNDAİKEN BOTU KULLANABİLİCEK KİŞİNİN İDSİ;$checkContains[$getVar[bakım];açık]==true]==true]
$author[Bakım modu açık!]
$description[Bot **\`$replaceText[$getVar[bakım];açık<{}>;;-1]\`** sebebi ile bakım modunda]
$stop
$endif
`
});
});

router.get('/isim', (req, res) => {
  res.json({ "kod": `$nomention
$onlyBotPerms[manageNicknames;Botun isim değiştirme yetkisi yok]
$onlyPerms[manageNicknames;Senin İsim Değiştirme Yetkin Yok]
$onlyIf[$rolePosition[$highestRole[$authorID]]<=$rolePosition[$highestRole[$mentioned[1]]]; Rolünü Değiştirmeye Çalıştığın Kişinin yetkisi Senden Yüksek Veya Sana Eşit]

$suppressErrors[Sanırım botun yetkisi kullanıcı ismini değiştirmeye yetmiyor...]

$var[eski-ad;$nickname[$mentioned[1]]]

$if[$noMentionMessage==]
$var[yeni-ad;$username[$mentioned[1]]]
$else
$var[yeni-ad;$noMentionMessage]
$endif

$changeUsernameWithID[$mentioned[1];$var[yeni-ad]]
$description[**<@$authorID>, <@$mentioned[1]> kullanıcısının ismini değiştirdi**

**Eski Ad:** $var[eski-ad]
**Yeni Ad:** $var[yeni-ad]]
`
});
});
//////////İZİNLER//////////
router.get('/', (req, res) => {
  res.json({ "kod": ``
});
});

router.get('/sunucu-bilgi', (req, res) => {
  res.json({ "kod": `
$var[onlineEmoji;🟢]
$var[offlineEmoji;⚫]
$var[idleEmoji;🟡]
$var[dndEmoji;🔴]

$nomention

$title[$serverName[$guildID] sunucusu hakkında bilgiler]
$footerIcon[$authorAvatar] $footer[$username[$authorID] tarafından istendi]
$serverInfo[
**Server:**
🗓 sunucu oluşturuldu: $creationDate[$guildID]
👑 sunucu sahibi <@$serverOwner[$guildID]>
🌐 sunucu konumu: $serverRegion
🛑 doğrulama seviyesi: $serverVerificationLvl

**Bu Kanaldaki Kullanıcılar:**
👤Üye sayısı: $membersCount
$var[onlineEmoji] Aktif: $membersCount[online]
$var[idleEmoji] Boşta: $membersCount[idle]
$var[dndEmoji] RahatsızEtme: $membersCount[dnd]
$var[offlineEmoji] Offline: $sum[$membersCount[offline];$membersCount[invisible]]

**Emojiler:**
($emoteCount) {emoji}

**Roller:**
($roleCount) $roleNames
]
`
});
});

/////////// KATEGORİ = 2 //////////

router.get('/butonlu-abone-sistemi', (req, res) => {
  res.json({
"kod-abone-log-ayarla":"$nomention $title[Abone Log'u Ayarlandı] $description[Abone Log Başarıyla Ayarlandı! **» Ayarlayan Yetkili:** <@$authorID> **» Ayarlanan Kanal:** $mentionedChannels[1]] $footer[] $addTimestamp $setServerVar[abonelog;$mentionedChannels[1]]",
"kod-abone-log-sıfırla":"$nomention $title[Abone Log Sıfırlandı] $description[Abone Log Başarıyla Sıfırlandı! **Ayarlamak İçin** `{prefix}abone-log ayarla` **Yazmanız Yeterli**] $footer[$username] $addTimestamp  $resetServerVar[abonelog]",
"kod-abone-rol-ayarla": "$nomention $author[Abone Rolü Ayarlandı] $title[Başarılı ✔️] $description[ Abone Rolü Başarıyla Ayarlandı! **Ayarlayan Yetkili:** <@$authorID> **Ayarlanan Rol:** $mentionedRoles[1]] $footer[$username] $addTimestamp $setServerVar[abonerol;$mentionedRoles[1]]",
"kod-abone-ver": "$nomention $author[Elixir - Abone] $authorIcon[$authorAvatar] $title[Abone Sistemi] $description[ <@$mentioned[1]> Kişisine Abone Rolü Verilsin mi?] $thumbnail[$authorAvatar] $footer[] $addTimestamp $setServerVar[aboneüye;$mentioned[1]] $addButton[no;abone;✔️;success;no;] $addButton[no;noabone;❌;success;no;]",
"kod-abone": "$nomention $author[Elixir - Abone] $authorIcon[$authorAvatar] $title[Abone Rolü Verildi] $useChannel[$getServerVar[abonelog]] $thumbnail[$authorAvatar] $description[Abone Rolü Verildii!! ✅**Rol Veren Yetkili:** <@$authorID> ✅**Abone Olan Kullanıcı:** <@$mentioned[1]>] $footer[Elixir Development] $addTimestamp $giveRole[$getServerVar[aboneüye];$getServerVar[abonerol]]",
"kod-noabone": "$nomention $author[Elixir - Abone] $authorIcon[$authorAvatar] $title[İptal Oldu] $description[**Abone Rolü Verme İptal Edildi!**]"
});
});

router.get('/cekilis', (req, res) => {
  res.json({ "kod-cekilis1": " $nomention $argsCheck[>3;Yanlış biçimli kullanım: !çekiliş 10 dakika hediye] $if[$message[1]==] $color[FF0000] $description[Süre yazmayı unuttun.] $else $if[$isNumber[$message[1]]==false] $color[FF0000] $description[Yanlış biçimli kullanım: (prefix)çekiliş 10 dakika hediye] $else $if[$message[2]==] $color[FF0000] $description[Zaman yazmayı unuttun.] $else $if[$checkContains[$message[2];saniye;dakika]==false] $color[FF0000] $description[Yanlış biçimli kullanım  (prefix)çekiliş 10 dakika hediye • En fazla 40 dakika olur. • ilk önce süre sonra zaman sonra hediye yazılır. • Saniye veya dakika komutları ile desteklidir.] $else $if[$message[3]==] $color[FF0000] $description[Hediye yazmayı unuttun.] $else $title[🎉 Çekiliş Başlatıldı 🎉] $description[ $addField[Çekilişi Başlatan;$username#$discriminator[$authorID]] $addField[Çekiliş Süresi;$message[1] $message[2]] $addField[Hediye;$message[3] $message[4] $message[5] $message[6]]] $thumbnail[$serverIcon] $color[1] $addReactions[🎉] $endif $endif $endif $endif $endif "
,
"kod-cekilis2": " $nomention $argsCheck[>3;] $if[$message[1]==] $else $if[$isNumber[$message[1]]==false] $else $if[$message[2]==] $else $if[$checkContains[$message[2];saniye;dakika]==false] $else $if[$message[3]==] $else <@$randomUserID> $replyIn[$message[1]$replaceText[$replaceText[$message[2];dakika;m;1];saniye;s;1]] $title[🎉 Çekiliş Bitti 🎉] $description[ $addField[Çekilişi Kazanan;$username[$randomUserID]#$discriminator[$randomUserID]] $addField[Hediye;$message[3] $message[4] $message[5] $message[6]]] $thumbnail[$serverIcon] $color[1] $addReactions[😃] $endif $endif $endif $endif $endif ",
});
});

router.get('/timer', (req, res) => {
  res.json({ "kod-timer1": " $nomention $title[**Hatırlatıcı**] $description[Hatırlatıcın Oluşturuldu ✅ **Sana `$message[1]` Sonra Hatırlatıcam** <@$authorID>] $color[00ffff] $footer[] $addTimestamp $footerIcon[$authorAvatar] $argsCheck[>1;Bir Süre Belirtmelisin Kanka] $argsCheck[>2;Hatırlatma Mesajı Girmelisin] $setUserVar[hmesaj;$message[2] $message[3] $message[4] $message[5] $message[6] $message[7] $message[8] $message[9] $message[10] $message[11] $message[12] $message[13] $message[14] $message[15] $message[16] $message[17] $message[18] $message[19] $message[20] ] "
,
"kod-timer2": " $nomention <@$authorID> $replyIn[$message[1]] $title[Alarm ⏰] $description[**Mesaj:** ***$getUserVar[hmesaj]***] $footer[Hatırlatma Mesajı Gönderildi] $footerIcon[$authorAvatar] $color[FFFFFF] "
});
});

router.get('/hackle', (req, res) => {
  res.json({ "kod": " $nomention  $deletecommand $cooldown[1m;**<@$authorID>, bir kişiyi daha hacklemeden önce 1 dakika bekle!**] $onlyIf[$mentioned[1]!=$authorID;**<@$authorID>, kendini hacklemeye çalışacak kadar aptal mısın?**] $onlyIf[$mentioned[1]!=;**<@$authorID>, hacklemek için bir kurban etiketlemen gerek!**] $replyIn[2s] $author[Hack Terminali] $description[**<@$authorID>, <@$mentioned[1]> adlı kullanıcı başarıyla hacklendi!** $addField[Mail:; `$username[$mentioned[1]]elixir@gmail.com`] $addField[Şifre:; `$randomString[8]`] $addField[IP adresi:;`$random[200;220].$random[211;411].$random[100;401].$random[100;411]`]$addField[Ülke:;`$randomText[Türkiye 🇹🇷;Türkiye 🇹🇷;Türkiye 🇹🇷;ABD 🇺🇲;Çin 🇨🇳;Rusya 🇷🇺]`]] $color[2ED31E] $image[https://media.discordapp.net/attachments/848442147925393408/857289581859045386/7f89421f894717c5a59647627884d4ff.gif] $footer[] "
});
});

router.get('/loglu-mute', (req, res) => {
  res.json({ "kod-sustur1":`$nomention
$deletecommand
$useChannel[$getServerVar[mutelog]]
$argsCheck[>2;Mute Süresini Söylemen Şart‼️]
$author[Mute]
$title[Mute Verildi ‼️]
$description[
Başarıyla Mute Verildi

***Sebep:**
\`$message[4] $message[5] $message[6] $message[7] $message[8] $message[9] $message[10] $message[11] $message[12]\`

**Mute:** <@$mentioned[1]>
**Mute Veren Yetkili:** <@$authorID>]

$color[00ffff]
$footer[$username]
$addTimestamp
$authorIcon[$authorAvatar]
$thumbnail[$authorAvatar]
$roleGrant[$mentioned[1];+$getServerVar[muterol]]

$onlyIf[$mentioned[1]!=;Mute Vermem İçin Birini Etiketlemen Şart]
$onlyIf[$hasRole[$authorID;$getServerVar[myetkili]]!=false;Bu Komut İçin Mute Yetkilisi Rolün Olmalı]
`
,
"kod-sustur2": `$nomention
$argsCheck[>1; ]
$argsCheck[>2; ]
$argsCheck[>3; ]
$replyIn[$message[2]]
$allowMention
$title[Mute Kalktı‼️]
$description[
<@$mentioned[1]> **Adlı Kullanıcının Mutesi Kalktı‼️**

***Sebep:*** 
\`$message[3] $message[4] $message[5] $message[6] $message[7] $message[8] $message[9] $message[10] $message[11] $message[12]\`
]
$color[00ffff]
$footer[$username]
$addTimestamp
$takeRole[$mentioned[1];$getServerVar[muterol]]
$useChannel[$getServerVar[mutelog]]`
, 
"kod-mute-rol": `$nomention
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$if[$message==]
$title[Mute Rol‼️]
$description[
**Mute Rol Ayarlamak İcin:**
\`-mute-rol ayarla\`

**Mute Rolünü Sıfırlamak İçin:**
\`-mute-rol sıfırla\`
]
$footer[Bunları Kullanabilirsiniz]
$color[000046]
$endif

$if[$message[1]==ayarla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Rol]
$authorIcon[$authorAvatar]
$title[Mute Rol Ayarlandı ✅]
$description[Mute Rol Başarıyla Ayarlandı ‼️

**Ayarlanan Rol:** <@&$mentionedRoles[1]>]
$footer[$username]
$addTimestamp
$color[FFFFFF]
$setServerVar[muterol;$mentionedRoles[1]]

$onlyIf[$mentionedRoles[1]!=;Bir Rol Etiketlemezsen Bu İş Olmaz ‼️]
$endif

$if[$message[1]==sıfırla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Rol]
$title[Mute Rol Sıfırlandı ✅]
$description[Mute Rol Başarıyla Sıfırlandı ‼️]
$footer[$username]
$addTimestamp
$resetServerVar[muterol]
$color[FF0000]
$endif`
,
"kod-mute-log": `$nomention
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$if[$message==]
$title[Mute Log‼️]
$description[
**Mute log Ayarlamak İcin:**
\`-mute-log ayarla\`

**Mute Log Sıfırlamak İçin:**
\`-mute-log sıfırla\`
]
$footer[Bunları Kullanabilirsiniz]
$color[000046]
$endif

$if[$message[1]==ayarla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Log]
$authorIcon[$authorAvatar]
$title[Mute Log Ayarlandı ✅]
$description[Mute Log Başarıyla Ayarlandı ‼️

**Ayarlanan Kanal:** <#$mentionedChannels[1]>]
$footer[$username]
$addTimestamp
$color[FFFFFF]
$setServerVar[mutelog;$mentionedChannels[1]]

$onlyIf[$mentionedChannels[1]!=;Bir Kanal Etiketlemezsen Bu İş Olmaz ‼️]
$endif

$if[$message[1]==sıfırla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Log]
$title[Mute Log Sıfırlandı ✅]
$description[Mute Log Başarıyla Sıfırlandı ‼️]
$footer[$username]
$addTimestamp
$resetServerVar[mutelog]
$color[FF0000]
$endif`
,
"kod-mute-yetkili": `$nomention
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$if[$message[1]==]
$title[Mute Yetkili‼️]
$description[
**Mute Yetkilsi Ayarlamak İcin:**
\`-mute-yetkili ayarla\`

**Mute Yetkilisi Sıfırlamak İçin:**
\`-mute-yetkili sıfırla\`
]
$footer[Bunları Kullanabilirsiniz]
$color[000046]
$endif

$if[$message[1]==ayarla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Yetkili]
$authorIcon[$authorAvatar]
$title[Mute Yetkilisi Ayarlandı ✅]
$description[Mute Yetkili Rolü Başarıyla Ayarlandı ‼️

**Ayarlanan Rol:** <@&$mentionedRoles[1]>]
$footer[$username]
$addTimestamp
$color[FFFFFF]
$setServerVar[myetkili;$mentionedRoles[1]]

$onlyIf[$mentionedRoles[1]!=;Bir Rol Etiketlemezsen Bu İş Olmaz ‼️]
$endif

$if[$message[1]==sıfırla]
$onlyAdmin[Bu Komutu Sen Kullanaman‼️]
$author[Mute Yetkili]
$title[Mute Yetkilisi Sıfırlandı ✅]
$description[Mute Yetkilisi Rolü Başarıyla Sıfırlandı ‼️]
$footer[$username]
$addTimestamp
$resetServerVar[myetkili]
$color[FF0000]
$endif`
});
});

router.get('/timeout', (req, res) => {
  res.json({ "kod-timeout": `$nomention
$onlyIf[$guildID!=;❌ **Bu komut maalesef dmden çalışmıyor :l eğer kullanmak istiyorsanız beni sunucunuza ekleyin.**]

$argsCheck[>2; Lütfen ilk susturacağın süreyi sonra kişiyi etiketle. ]
$timeout[$noMentionMessage[1];$mentioned[1]]
$title[🤫 Kullanıcı Başarıyla Susturuldu]
$description[
Susturma süresi: $noMentionMessage[1]
Susturulan üye: <@$mentioned[1]>
Susturan yetkili: <@$authorID>]
$footer[Bu mesaj 1 dakika içinde silinecek.]
$addTimestamp
$deleteIn[1m]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$onlyPerms[manageroles;Birilerini susturmak için Rolleri Yönet yetkin olması lazım.]
$color[#FFFFFF]`
,
"kod-untimeout": `$nomention
$onlyIf[$guildID!=;❌ **Bu komut maalesef dmden çalışmıyor :l eğer kullanmak istiyorsanız beni sunucunuza ekleyin.**]


$untimeout[$mentioned[1]]
$onlyPerms[kick;Birinin susturmasını kaldırmak için Üyeleri At iznin olması lazım. ]
$title[Kullanıcın Susturması Başarıyla Kaldırıldı.]
$description[<@$mentioned[1]> Adlı Kişinin Susturmasını Başarıyla Kaldırdım.
Moderator: <@$authorID>]
$footer[Bu mesaj 1 dakika içinde silinecek]
$deleteIn[1m]
$color[#FFFFFF]`,
});
});

router.get('/dc-oyun', (req, res) => {
  res.json({ "kod-dogruluk-cesaretlik": `$nomention
$title[**Neyi Seçiyorsun**]
$description[Doğruluk mu Cesaretlik mii??

\`Çok Güzel Sorular Varr\`
]
$footer[]
$addTimestamp
$color[00ffff]

$newSelectMenu[dc;1;1;Doğruluk - Cesaretlik]

$addSelectMenuOption[dc;Dogruluk;value01;Doğruluk Seçersin;no;👼]
$addSelectMenuOption[dc;Cesaretlik;value02;Cesaretlik Seçersin;no;👹]`
,
"kod-dc": `$onInteraction[dc]
$nomention
$if[$message[1]==value01]
$title[Doğruluk]
$description[
**Doğruluk Seçtin ✅**
<@$authorID>

**Soru**:
\`$randomText[En Sevmediğin Kişi;Hiç Cinsel Bir İlişkide Bulundun mu?;Malafat Kaç CM;Aşık Olduğun Biri Varmı Varsa Kim?;
En Sevdiğin Kişi;En Sevdiğin Oyun Ne?;Kaç Tane Kız Arkadaşın Var;Öğretmenine Yaptığın En Utanç Verici Şey;Hiç Sevgilini Aldattın mı?;2 Doğru 1 Yalan Söyle]\`]
$endif

$if[$message[1]==value02]
$title[Cesaretlik]
$description[
**Cesaretlik Seçtin ✅**
<@$authorID>

**Soru:**
\`$randomText[Sevgiline Ayrılma Şakası Yap;DM deki İlk Kıza Çıkma Teklifi Et;Domalıp Fotoğraf At;En Sevdiğin TikTokeri Taklit Et;Sevdiğin Kişiye Çıkma Teklifi Et]\`]
$endif`,
});
});

router.get('/twitch-ara', (req, res) => {
  res.json({ "kod": `$nomention
$argsCheck[>1;**Lütfen Bir Twitch Yayıncısı İsmi Giriniz ‼️**]

$thumbnail[https://pbs.twimg.com/profile_images/1450901581876973568/0bHBmqXe.png]

$title[**TWİTCH**]
$description[
\`$message[1]\` **Adlı Kullanıcı Twitch'de Arandı ‼️**

**__Aratan Kullanıcı:__ <@$authorID>**

**__Aratılan Yayıncı:__** \`$message[1]\`]
$color[0000000]

$footer[$username]
$footerIcon[https://pbs.twimg.com/profile_images/1450901581876973568/0bHBmqXe.png]

$addButton[no;https://m.twitch.tv/$message[1]/home;Yayıncının Hesabına Git;link;no;]` });
});

router.get('/olric-sozleri', (req, res) => {
  res.json({ "kod": `$nomention
$author[$username]
$authorIcon[$authorAvatar]
$title[Olric 🥺]
$description[
$randomText[**-Neden Bu Kadar Dar Kaldırımlar Olric.**
-Neden Efendimiz?
**-Sevgilimizle Yan Yana Yürümeyelim Diye Olric.**
-Kaldırımların Suçu Yok Efendimiz,Biz Hep Uzaktan Sevdik...;**-Onu Sevdiğimi Elbet Bir Gün Anlayacak Olric.**
-Ne Zaman Efendim?
**-Onu Sevmekten Vazgeçtiğim Zaman Olric...**;**-Bazıları Ne Kadar Şanslı Olric!**
-Kimler Efendim?
**-Hani Şu Sevdikleri ile Yan Yana Uyuyanlar..**
-Ya Biz Efendimiz?
**-İyi Geceler Olric.Uyu Artık**;**-Sence Bir Şans Daha Vermelimiyim Olric?**
-İnsanlar Asla Değişmez Efendim..
**-Ama o...**
-O da Efendim,O da..;**-Nedensiz ve Sebepsiz Sevdim Onu Olric**
-Neden Efendimiz?
**-Çünkü Bir Sebebi Olsa,Aşk Olmazdı Bunun İsmi..**;**-Aşk Nedir Bilir misin Olric?**
-Nedir Efendimiz?
**-Aşk Yanmaktır Olric...**
-Siz Hiç Yandınızmı Efendimiz?
**-Hiç Sönmedimki Olric...**;**-Hayatta Üç Yanlışım Oldu Olric**
-Ne Gibi Efendim?
**-Tanımadım,İnandım,Güvendim.Ama Bir Doğrum Oldu Olric..**
-O Nedir Efendim?
**-Sevdim Olric.. Fakat Sende Bilirsinki Üç Yanlış Bir Doğruyu Götürür...**;Kimse bilmesin nerde olduğmu
Sorarlarsa öldü dersin
Böyle gelmiş böyle gider
Kafam senden bile güzel;**-Kusursuz İnsan Var mıdır Olric**
-Yoktur Efendimiz Her İnsanın Bir Kusuru Vardır.
**-Peki Ben Neden Onda Ufacık Bile Olsa Bir Kusur Göremiyorum Olric?**
-Aşkınızdan Kör Olmuşsunuz Efendim...;**-Gelir mi Dersin Olric?**
-Gelmez,Gelemez Efendimiz.
**-Neden Olric?**
-Yüreği O Kadar Büyük Sevemezde Ondan Efendimiz...;**-Biliyor musun Olric,İki Şey Hep Vardır**
-Nedir Onlar Efendim?
**-Her İşte Bir Yanlışlık,Her İçte Bir Yanmışlık...**;**-Yüksek Yerleri Sever misin Olric?**
-Hayır Efendim Bende Yükseklik Korkusu Var.
**-Peki Ya Birini Yarı Yolda Bırakıp Gider misin Olric?**
-Yine Hayır Efendim Bende Alçaklık Korkusu Var...;**-Hadi Gidelim Olric!**
-Nereye Efendimiz
**-Ona Olric**
-O Artık Başkasıyla Efendim
**-Olsun Onun Mutlu Olduğunu Uzaktan İzlemekte Yeter Bana Olric...**]]
$color[ffffff]
$footer[]
$addTimestamp`
});
});

router.get('/ban', (req, res) => {
  res.json({ "kod-banlog": `$nomention
$if[$message==]
$title[Ban Log]
$description[
**Ban Log Ayarlamak İçin:**
\`-banlog ayarla\`

**Ban Log Sıfırlamak İçin:**
\`-banlog sıfırla\`]
$color[00ffff]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$endif

$if[$message[1]==ayarla]
$onlyIf[$mentionedChannels[1]!=;Rol Etiketlemen Şart]
$onlyAdmin[Bu Komutu Kullanabilmen İçin **'Yönetici'** Olmalısın]
$title[Ban Log]
$description[Ban Log Kanalı Başarıyla Ayarlandı ‼️

**Ayarlanan Kanal:** <@$mentionedChannels[1]>

**Ayarlayan Yetkili:**
<@$authorID>]
$color[FFFFFF]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$setServerVar[banlog;$mentionedChannels[1]]
$endif

$if[$message[1]==sıfırla]
$onlyAdmin[Bu Komutu Sen Kullanaman Kankaa]
$title[Ban Log]
$description[Ban Log Başarıyla Sıfırlandı ‼️

**Yetkili:** <@$authorID>]
$color[FF0000]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$resetServerVar[banlog]
$endif`
,
"kod-ban-yetkili": `$nomention
$if[$message==]
$title[Ban Yetkili]
$description[
**Ban Yetkilisi Ayarlamak İçin:**
\`-ban-yetkili ayarla\`

**Ban Yetkilisi Sıfırlamak İçin:**
\`-ban-yetkili sıfırla\`]
$color[00ffff]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$endif

$if[$message[1]==ayarla]
$onlyIf[$mentionedRoles[1]!=;Rol Etiketlemen Şart]
$onlyAdmin[Bu Komutu Kullanabilmen İçin **'Yönetici'** Olmalısın]
$title[Ban Yetkili]
$description[Ban Yetkilsi Rolü Başarıyla Ayarlandı ‼️

**Ayarlanan Rol:** <@&$mentionedRoles[1]>

**Ayarlayan Yetkili:**
<@$authorID>]
$color[FFFFFF]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$setServerVar[banyetkili;$mentionedRoles[1]]
$endif

$if[$message[1]==sıfırla]
$onlyAdmin[Bu Komutu Sen Kullanaman Kankaa]
$title[Ban Yetkili]
$description[Ban Yetkilisi Başarıyla Sıfırlandı ‼️

**Yetkili:** <@$authorID>]
$color[FF0000]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp
$resetServerVar[banyetkili]
$endif`
,
"kod-ban": `$nomention
$banID[$mentioned[1]]
$channelSendMessage[$channelID;**<@$mentioned[1]> Adlı Kullanıcı Sunucudan Banlandı‼️**]
$useChannel[$getServerVar[banlog]]
$author[BanPan]
$title[Banlandı ✅]
$description[Bur Kullanıcı Aramaızdan Uçtu Gitti ‼️

**__Banalanan:__** <@$mentioned[1]>

**__Banlayan:__** <@$authorID>]
$color[FF0000]
$footer[]
$footerIcon[$authorAvatar]
$addTimestamp

$onlyIf[$mentioned[1]!=;Banlamam İçin Birini Etiketlemen Şart]
$onlyIf[$hasRole[$authorID;$getServerVar[banyetkili]]!=false;Bu Komut İçin Ban Yetkilisi Rolün Olmalı]`,
});
});

router.get('/log-sistemi', (req, res) => {
  res.json({ "kod-log": `$nomention
$reply
$onlyAdmin[**Bu Komutu Kullanmak İçin \`'YÖNETİCİ'\` Olmalısın‼️‼️**]
$if[$message==]
$title[Sunucu Log Sistemi]
$description[
**LOG AYARLAMAK İÇİN:**
\`{prefix}log ayarla\`

**LOG SIFIRLAMAK İÇİN:**
\`{prefix}log sıfırla\`]
$footer[Bunları Kullanabilirsiniz]
$color[000000]
$endif

$if[$message[1]==ayarla]
$onlyIf[$mentionedChannels[1]!=;**Lütfen Bir Kanal Etiketleyiniz ‼️**]
$author[$username]
$authorIcon[$authorAvatar]
$title[**__Sunucu Log__**]
$description[**Sunucunuzda Log Kanalı Başarıyla Ayarlandı ‼️**

 ❤️ **Ayarlanan Kanal:** <#$mentionedChannels[1]>
 ❤️ **Ayarlayan Yetkili:** <@$authorID>]
 $footer[]
 $addTimestamp
 $color[ffffff]
 $setServerVar[log;$mentionedChannels[1]]
 $endif
 
 $if[$message[1]==sıfırla]
 $author[$username]
 $authorIcon[$authorAvatar]
 $title[**__Sunucu Log__**]
 $description[Sunucu Log Başarıyla Sıfırlandı ‼️]
 $footer[]
 $addTimestamp
 $color[FF0000]
 $resetServerVar[log]
 $endif`
,
"kod-ban-log1": `$onBanAdd[$getServerVar[log]]
$nomention
$author[BanPan]
$description[
**<@$authorID> Adlı Kullanıcı Sunucudan Banlandı‼️‼️**]
$footer[]
$addTimestamp
$color[000000]`
,
"kod-ban-log2": `$onBanRemove[$getServerVar[log]]
$nomention
$author[Ban Kalktı]
$description[
**$username Adlı Kullanıcının Sunucudaki Yasağı Kalktı‼️‼️**
**ID:** \`$authorID\`]
$footer[]
$addTimestamp
$color[000000]`
,
"kod-mesaj-log": `$onMessageDelete[$getServerVar[log]]
$nomention
$author[Mesaj Silin]
$description[
**<@$authorID> Adlı Kullanıcı Bir Mesaj Sildi‼️‼️**
**Kanal:** \`$channelID\`]
$footer[]
$addTimestamp
$color[000000]`,
});
});

router.get('/link-engel', (req, res) => {
  res.json({ "kod-link-engel": `$nomention
$if[$message==]
$author[Link Engel Sistemi]
$title[Link Engel]
$description[
**Link Engel Sistemini Açmak İçin:**
» \`-link-engel aç\`

**Link Engel Sistemini Kapatmak İçin:**
» \`-link-engel kapat\`
]
$footer[Bunları Kullanabilirsiniz]
$thumbnail[$authorAvatar]
$endif

$if[$message[1]==aç]
$onlyIf[$getServerVar[lengel]!=açık;<@$authorID> Bu Özellik Zaten Açık Durumda]

$onlyAdmin[Bu komutu kullanma yetkiniz yok]

$setServerVar[lengel;açık]

$author[Link Engel]
$title[Başarılı ✅]

$description[

**Link Engel Sistemi Açıldı ‼️**

» **Yetkili:** <@$authorID>
] 
$endif

$if[$message[1]==kapat]
$onlyAdmin[Bu komutu kullanma yetkiniz yok]

$resetServerVar[lengel]

$author[Link Engel]
$title[Başarılı ✅]

$description[

**Link Engel Sistemi Kapatıldı ‼️**

» **Yetkili:** <@$authorID>
] 
$endif`
,
"kod-log": `https://
$nomention
$deletecommand
$author[$username]
$authorIcon[$authorAvatar]
$title[**__Link Engel__**]
$description[Hoop!, Burada Reklam Yapmak Yasak Lütfen Daha Dikkatli Ol ‼️]

$color[ffffff]
$footer[]
$addTimestamp
$onlyIf[$isAdmin[$authorID]==true; ]
$onlyIf[$getServerVar[lengel]!=kapalı; ]`
});
});

router.get('/rol-ver-al', (req, res) => {
  res.json({ "kod": `$nomention
$onlyAdmin[**Bu Komutu Kullanmak İçin \`'YÖNETİCİ'\` İznin Olmalı‼️**]

$if[$message==]
$title[Rol Ver-Al]
$description[
**Bir Rol Vermek İçin:**
\`{prefix}rol ver @üye @rol\`

**Bir Rol Almak İçin:**
\`{prefix}rol al @üye @rol\`]
$footer[]
$addTimestamp
$color[000000]
$endif

$if[$message[1]==ver]
$author[$username]
$authorIcon[$authorAvatar]

$title[Rol Verildi✅]
$description[**<@$mentioned[1]> Adlı Kullanıcıya Başarıyla <@&$mentionedRoles[1]> Rolü Verildi👍**

**__Yetkili:__** <@$authorID>]
$footer[]
$addTimestamp

$roleGrant[$mentioned[1];+$mentionedRoles[1]]

$onlyIf[$mentionedRoles[1]!=;**Lütfen Bir Rol Etiketleyerek Tekrar Deneyiniz‼️**
\`{prefix}rol ver @üye @rol\`]
$onlyIf[$mentioned[1]!=;**Lütfen Bir Kullanıcı Etiketleyiniz‼️**
\`{prefix}rol ver @üye @rol\`]
$endif

$if[$message[1]==al]
$author[$username]
$authorIcon[$authorAvatar]

$title[Rol Alındı✅]
$description[**<@$mentioned[1]> Adlı Kullanıcıdan Başarıyla <@&$mentionedRoles[1]> Rolü Alındı👍**

**__Yetkili:__** <@$authorID>]
$footer[]
$addTimestamp

$roleGrant[$mentioned[1];-$mentionedRoles[1]]

$onlyIf[$mentionedRoles[1]!=;**Lütfen Bir Rol Etiketleyerek Tekrar Deneyiniz‼️**
\`{prefix}rol al @üye @rol\`]
$onlyIf[$mentioned[1]!=;**Lütfen Bir Kullanıcı Etiketleyiniz‼️**
\`{prefix}rol al @üye @rol\`]
$endif`
});
});

router.get('/bot-bilgi', (req, res) => {
  res.json({ "kod": `$title[Bot Bilgisi]
$description[
▂▃▄▅▆▇█▇▆▅▄▃▂
**Ping:** $ping
**Kalan host time:** <t:$hostingExpireTime[yes]:R>
**ne zamandan beri aktif:** $uptime
**node:** $botNode
▂▃▄▅▆▇█▇▆▅▄▃▂
**komut sayısı:** $commandsCount
**premium:** $replaceText[$premiumExpireTime;expired;yok;-1]
▂▃▄▅▆▇█▇▆▅▄▃▂
**serverler:** $serverCount
**üye sayısı:** $allMembersCount
]`
});
});

router.get('/spotify-ara', (req, res) => {
  res.json({ "kod": `$nomention

$author[Spotify ara]
$authorIcon[https://cdn.discordapp.com/icons/938889535507533954/a_447d2d86cba9adb1fbe51533c58527c9.gif?size=2048]
$description[ **Spotify Arama Sonucu:** [Sonuca Zıpla\](https://open.spotify.com/search/$url[encode;$message])]
$footer[$username |]
$addTimestamp
$footerIcon[$authorAvatar]
$color[9aff76]

$image[https://image.thum.io/get/width/1200/crop/675/png/https://open.spotify.com/search/$url[encode;$message]]

$addButton[no;https://open.spotify.com/search/$url[encode;$message];Müziği Çal;link;no]`
});
});

router.get('/selectmenu-rol', (req, res) => {
  res.json({ "kod-rolal": `$nomention
$c[ROL ID ve ayarlar bölümü , daha fazla rol için rol5 , rol6 gibi eklemeniz gerek]
$var[ad;MENÜ ADI GİRİN]
$var[rol1;ROL ID 1] $var[seçenek1;Açıklama]
$var[rol2;ROL ID 2] $var[seçenek2;Açıklama]
$var[rol3;ROL ID 3] $var[seçenek3;Açıklama]
$var[rol4;ROL ID 4] $var[seçenek4;Açıklama]


$c[- - - - - KOD BÖLÜMÜ - - - - -]
$newSelectMenu[rolseç;1;1;$var[ad]]
$title[İstediğin rolleri menü ile seç]
$description[]

$c[Seçenek bölümü , daha fazla seçenek için satırları kopyala yapştır yoluyla arttırın]
$addSelectMenuOption[rolseç;$roleName[$var[rol1]];$var[rol1];$var[seçenek1];no;]
$addSelectMenuOption[rolseç;$roleName[$var[rol2]];$var[rol2];$var[seçenek2];no;]
$addSelectMenuOption[rolseç;$roleName[$var[rol3]];$var[rol3];$var[seçenek3];no;]
$addSelectMenuOption[rolseç;$roleName[$var[rol4]];$var[rol4];$var[seçenek4];no;]

$addSelectMenuOption[rolseç;Rolleri Kaldır;kaldır;Tüm rolleri kullanıcıdan alır;no;🚫]`
,
"kod-rolsec": `$onInteraction[rolseç]
$nomention
$c[ROL ID ve ayarlar bölümü , daha fazla rol için rol6 , rol7 gibi eklemeniz gerek]
$var[rol1;ROL ID 1]
$var[rol2;ROL ID 2]
$var[rol3;ROL ID 3]
$var[rol4;ROL ID 4]

$c[- - - - - KOD BÖLÜMÜ - - - - -]

$if[$message==kaldır]
$roleGrant[$authorID;-$var[rol1]]
$roleGrant[$authorID;-$var[rol2]]
$roleGrant[$authorID;-$var[rol3]]
$roleGrant[$authorID;-$var[rol4]]
$ephemeral
$removeComponent[rolseç]
Roller kaldırıldı !
$else
$roleGrant[$authorID;+$message]
$ephemeral
$removeComponent[rolseç]
<@&$message> rolü verildi!
$endif`
});
});

router.get('/hesap-makinesi', (req, res) => {
  res.json({ "kod": `$nomention
$title[Hesap makinesi !]

$description[]

$addButton[no;7;7;secondary;no;]
$addButton[no;8;8;secondary;no;]
$addButton[no;9;9;secondary;no;]
$addButton[no;÷;÷;primary;no;]
$addButton[no;×;×;primary;no;]

$addButton[yes;4;4;secondary;no;]
$addButton[no;5;5;secondary;no;]
$addButton[no;6;6;secondary;no;]
$addButton[no;+;+;primary;no;]
$addButton[no;-;-;primary;no;]

$addButton[yes;1;  1;secondary;no;]
$addButton[no;2;2;secondary;no;]
$addButton[no;3;3;secondary;no;]
$addButton[no;<;<;danger;no;]
$addButton[no;son;=;success;no;]

$addButton[yes;.;.;secondary;no;]
$addButton[no;0;0;secondary;no;]`
,
"kod": `$onInteraction
$if[$or[$customID==1;$customID==2;$customID==3;$customID==4;$customID==5;$customID==6;$customID==7;$customID==8;$customID==9;$customID==0;$customID==.;$customID==÷;$customID==×;$customID==+;$customID==-;$customID==son;$customID==<]]
$nomention
$suppressErrors[Hatalı , Çok uzun işlem]
$title[Hesap makinesi !]
$enableDecimals[yes]
$var[işlem;$getEmbedData[$channelID;$messageID;1;description]]

$if[$customID==son]
$description[$calculate[$replaceText[$replaceText[$var[işlem];÷;/;-1];×;*;-1]]]
$elseif[$customID==<]
$else
$description[$var[işlem]$customID]
$endif
$endif`
});
});

router.get('/hava-durumu', (req, res) => {
  res.json({ "kod": `$nomention
$if[$isSlash==true] $var[mesaj;$message[1;konum-ülke]] $endif
$if[$isSlash==false] $var[mesaj;$message] $endif

$httpGet[https://api.popcat.xyz/weather?q=$url[encode;$var[mesaj]]] 
$onlyIf[$httpResult[0;location;name]!=;Bu konumu bulamadım başka bir konumu denermisin?]

$description[__**ŞUAN:**__
📍**Konum:** $httpResult[0;location;name]
🏷**Kordinat:** $httpResult[0;location;lat] , $httpResult[0;location;long]
📆**Tarih:** $httpResult[0;current;date] $httpResult[0;current;day]

🌫**Hava Durumu:** $httpResult[0;current;skytext]
🌡**Sıcaklık:** $httpResult[0;current;temperature]
♨️**Hissedilen:** $httpResult[0;current;feelslike]
🌬**Rüzgar:** $httpResult[0;current;winddisplay]

—————————————————
__**$httpResult[0;forecast;1;date] $httpResult[0;forecast;1;day]**__
**Hava Durumu:** $httpResult[0;forecast;1;skytextday]
**sıcaklık:** ☀️$httpResult[0;forecast;1;high] 🌕$httpResult[0;forecast;1;low]

__**$httpResult[0;forecast;2;date] $httpResult[0;forecast;2;day]**__
**Hava Durumu:** $httpResult[0;forecast;2;skytextday]
**sıcaklık:** ☀️$httpResult[0;forecast;2;high] 🌕$httpResult[0;forecast;2;low]

__**$httpResult[0;forecast;3;date] $httpResult[0;forecast;3;day]**__
**Hava Durumu:** $httpResult[0;forecast;3;skytextday]
**sıcaklık:** ☀️$httpResult[0;forecast;3;high] 🌕$httpResult[0;forecast;3;low]

__**$httpResult[0;forecast;4;date] $httpResult[0;forecast;4;day]**__
**Hava Durumu:** $httpResult[0;forecast;4;skytextday]
**sıcaklık:** ☀️$httpResult[0;forecast;4;high] 🌕$httpResult[0;forecast;4;low]

]
$color[#35B0F7]
$thumbnail[$httpResult[0;current;imageUrl]]`
});
});

router.get('/selectmenu-yardim', (req, res) => {
  res.json({ "kod-yardim": `$nomention
$reply
$author[$username]
$authorIcon[$authorAvatar]

$description[
Merhaba Ben **Elixir Development** Discordda Gelişmekte Olan Mükemmel Bir Botum!
**Prefix'im:** \`!\`

__Komut Listem__

**Genel
Moderasyon
Eğlence
Yetkili**
]
$footer[]
$footerIcon[$serverIcon]
$addTimestamp
$color[9269ff]

$newSelectMenu[yardım;1;1;Komutlarımı Görüntüle]
$addSelectMenuOption[yardım;Genel;genel;Genel Komutlarım!]
$addSelectMenuOption[yardım;Moderasyon;moderasyon;Moderasyon Komutlarım!]
$addSelectMenuOption[yardım;Eğlence;eglence;Eğlence Komutlarım!]
$addSelectMenuOption[yardım;Yetkili;yetkili;Yetkili Komutlarım!]
`
,
"kod-interaction": `$onInteraction[yardım]
$nomention
$if[$message==genel]
$author[$username]
$authorIcon[$authorAvatar]
$description[
**Merhaba <@!$authorID>,
Prefix'im:** ?

Sizin **__Genel__** Komutlarınız. Buraya Yazın :D
]
$footer[]
$footerIcon[$serverIcon]
$addTimestamp
$color[9269ff]
$endif

$if[$message==moderasyon]
$author[$username]
$authorIcon[$authorAvatar]
$description[
**Merhaba <@!$authorID>,
Prefix'im:** ?

Sizin **__Moderasyon__** Komutlarınız. Buraya Yazın :D
]
$footer[]
$footerIcon[$serverIcon]
$addTimestamp
$color[9269ff]
$endif

$if[$message==eglence]
$author[$username]
$authorIcon[$authorAvatar]
$description[
**Merhaba <@!$authorID>,
Prefix'im:** ?

Sizin **__Eğlence__** Komutlarınız. Buraya Yazın :D
]
$footer[]
$footerIcon[$serverIcon]
$addTimestamp
$color[9269ff]
$endif

$if[$message==yetkili]
$author[$username]
$authorIcon[$authorAvatar]
$description[
**Merhaba <@!$authorID>,
Prefix'im:** ?

Sizin **__Yetkili__** Komutlarınız. Buraya Yazın :D
]
$footer[]
$footerIcon[$serverIcon]
$addTimestamp
$color[9269ff]
$endif
`
});
});

router.get('/radtgele-profil', (req, res) => {
  res.json({ "kod": `$nomention

$author[$username[$authorID]#$discriminator[$authorID]]$authorIcon[$authorAvatar]

$title[Rastgele Kullanıcı!]
$description[$username[$randomUserID]#$discriminator[$randomUserID]]

$image[$userAvatar[$randomUserID]?size=2048]
`
});
});
///////DÖVİZ//////
router.get('/doviz', (req, res) => {
  res.json({ "kod": ``
});
});

router.get('/troll-nitro', (req, res) => {
  res.json({ "kod": `$nomention
$title[$username Sana Nitro Hediye Etti]

$deletecommand

$dm[$mentioned[1]]

$description[1 Aylık Nitro Seni Bekliyor
[discord.gift/9yAE5SdKgY6Hv4wU](https://media.discordapp.net/attachments/1051473449530429471/1051555518981877760/495196_cover.jpg)]

$image[https://media.discordapp.net/attachments/802886293948071957/828186622666735667/unknown-1.png]
$color[#363940]

$onlyIf[$mentioned[1]!=;Lütfen Birini Etiketleyiniz!]`
});
});

router.get('/boost-count', (req, res) => {
  res.json({ "kod": `$nomention
\`$serverName[$guildID]\` Adlı Sunucu \`$boostCount[$guildID]\` Takviyeye Sahip!
`
});
});

router.get('/rozetler', (req, res) => {
  res.json({ "kod": `$nomention

$var[user;$mentioned[1;yes]]
$onlyIf[$userExists[$var[user]]==true;Lütfen geçerli bir kullanıcı belirt!]

$var[api;https://japi.rest/discord/v1/user/$var[user]]
$httpGet[$var[api]]
$var[result;$httpResult[data;public_flags_array]]
$var[array;$toTitleCase[$replaceText[$var[result];_; ]]]
$var[no-array;$replaceText[$replaceText[$replaceText[$replaceText[$var[array];[;];\];];";];,;, ]]
$var[badges;$var[no-array]]

$httpGet[https://api.popcat.xyz/translate?to=tr&text=$var[badges]]

$color[$random[0;16777216]]
$thumbnail[$userAvatar[$var[user]]]
$author[$username[$var[user]]#$discriminator[$var[user]]]
$authorIcon[$var[user]]
$description[**Rozetler:** $httpResult[translated]]
`
});
});

router.get('/bot-ip', (req, res) => {
  res.json({ "kod": `$nomention

$httpGet[http://ip-api.com/json/]
$if[$httpResult[status]==success]
$title[Bot IP]
$description[


🪪 **IP :** || $httpResult[query] ||

🌍 **Ülke :** $httpResult[country] / $httpResult[countryCode]

🏞 **Bölge :** $httpResult[region]

🔗 **Sağlayan:** $httpResult[isp]

🏙 **Şehir :** $httpResult[city]

🚥 **Enlem :** $httpResult[lat]

🚦 **Boylam :** $httpResult[lon]
]
$color[0000ff]
$else
$description[
> Botun Ipsi sorgulanamadı
]
$color[0000ff]
$endif
`
});
});

router.get('/kanal-ban', (req, res) => {
  res.json({ "kod-ban": `$nomention

$onlyBotPerms[managechannels;Botun Kanal İzinlerini Değiştirme Yetkisi Yok]
$onlyPerms[managechannels;Senin Kanal İzinlerini Değiştirme Yetkin Yok]
$onlyIf[$rolePosition[$highestRole[$authorID]]<=$rolePosition[$highestRole[$mentioned[1]]]; İzinini Değiştirmeye Çalıştığın Kişinin Yetkisi Senden Yüksek Veya Sana Eşit]
$suppressErrors[Sanırım Botun Yetkisi kullanıcı Yetkisini Değiştirmeye Yetmiyor...]


$editChannelPerms[$channelID;$mentioned[1];-sendmessages]

$title[Kullanıcının Bu Kanala Mesaj Gönderme İzini Kaldırıldı]

$description[<@$authorID> , <@$mentioned[1]> kullanıcısını Bu Kanaldan Yasakladı]

$color[#9269ff]
`
,
"kod-unban": `$nomention

$onlyBotPerms[managechannels;Botun Kanal İzinlerini Değiştirme Yetkisi Yok]
$onlyPerms[managechannels;Senin Kanal İzinlerini Değiştirme Yetkin Yok]
$onlyIf[$rolePosition[$highestRole[$authorID]]<=$rolePosition[$highestRole[$mentioned[1]]]; İzinini Değiştirmeye Çalıştığın Kişinin Yetkisi Senden Yüksek Veya Sana Eşit]
$suppressErrors[Sanırım Botun Yetkisi kullanıcı Yetkisini Değiştirmeye Yetmiyor...]


$editChannelPerms[$channelID;$mentioned[1];+sendmessages]

$title[Kullanıcının Bu Kanala Mesaj Gönderme İzni Geri Verildi]

$description[<@$authorID> , <@$mentioned[1]> kullanıcısının Bu Kanaldaki Yasağını Kaldırdı]

$color[#9269ff]
`
});
});


router.get('/kaç-cm', (req, res) => {
  res.json({ "kod": `$nomention
$var[malafat;$randomText[1 ㎝  bu niye bu gada minnag;2 ㎝ çog kısa lo;5 ㎝ yetersiz boy zamanla büyür abisi;7 ㎝ 11 yaşındamısın knk;9 ㎝ idare eder; 13 ㎝ adam olana çok bile;15 ㎝ yuh;16 ㎝ iyimiş;18 ㎝ yuh be knk;31 ㎝ oha lan nası]]
$title[Kaç ㎝]
$description[<@$mentioned[1;yes]> malafatı $var[malafat]]
`
});
});

router.get('/gay-metre', (req, res) => {
  res.json({ "kod": `$nomention
$var[gay;$randomText[0 🏳️‍🌈 temiz çıktın;1 🏳️‍🌈 temiz çıktın;5 🏳️‍🌈 eh hafif bişey seziyorum;8 🏳️‍🌈 kanlarında bir miktar var;12 🏳️‍🌈 e yani iyidir;18 🏳️‍🌈 biraz fazla değilmi ?;20  🏳️‍🌈 sen kesin gaysın knk;24 🏳️‍🌈 senden beklemezdim 😳;30 🏳️‍🌈 oo gaysın demek ha;31 🏳️‍🌈 sj iyimiş;40 🏳️‍🌈 oo sade gay;50 🏳️‍🌈 e yani yarım topsun knk;60 🏳️‍🌈 o yarımdan fazla gay;71 🏳️‍🌈 lan sen dibine kadar erkeksin nasıl olur;85 🏳️‍🌈 oha knk ÇOK FAZLA;90 🏳️‍🌈 sen has gaysın;99 🏳️‍🌈 katkısız GAY;100  🏳️‍🌈 dibine kadar gaysın islama dön]]
$title[Gay Ölçer !]
$description[<@$mentioned[1;yes]> %$var[gay]]
`
});
});

router.get('/kanal-kilit', (req, res) => {
  res.json({ "kod-kanal-kilir": `$nomention 
$onlyBotPerms[managechannels;Bot bu sunucuda kanalları kilitleyemez çünkü izini yok]
$onlyAdmin[bu komut moderatörlere özel]
$color[FFFFFF]
$description[**<@$authorID>, kanalı kilitlemek için** "\`Kilitle\`"**, kanal kiliti açmak için ise **"\`Kilit Aç\`" **butonuna tıklayın.**] 
$thumbnail[$authorAvatar] 
$addButton[no;kilitle;Kilitle;danger;no;🔒] 
$addButton[no;kilitaç;Kilit Aç;success;no;🔓] 
`
,
"kod-kilitle": `$onInteraction[kilitle]
$onlyAdmin[]
$nomention 
$color[FFFFFF]
$onlyIf[$message==;]
$description[<@$authorID>, <#$mentionedChannels[<;yes]> ** adlı kanal başarıyla kilitlendi** 🔒] 
$modifyChannelPerms[$mentionedChannels[<;yes];-sendmessages;$roleID[@everyone]]
$deleteIn[5s]
`
,
"kod-kilitaç": `$onInteraction[kilitaç]
$onlyAdmin[]
$nomention 
$color[FFFFFF] 
$onlyIf[$message==;]
$description[<@$authorID>, <#$mentionedChannels[<;yes]> **adlı kanalın kiliti başarıyla açıldı** 🔓] 
$modifyChannelPerms[$mentionedChannels[<;yes];+sendmessages;$roleID[@everyone]]
$deleteIn[5s]
`
});
});

module.exports = router;