// api/send.js  —  Vercel Serverless Function

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const { code, email } = req.body;

  if (!code || !email) {
    return res.status(400).json({ error: 'code und email erforderlich' });
  }


  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KFC Aktionscode</title>
<style>
  body, .bg { background-color: #ffffff !important; }
  .text-main { color: #000000 !important; }
  .text-sub { color: #555555 !important; }
  .text-footer { color: #999999 !important; }
  .text-fake { color: #cccccc !important; }
  @media (prefers-color-scheme: dark) {
    body, .bg { background-color: #ffffff !important; }
    .text-main { color: #000000 !important; }
    .text-sub { color: #555555 !important; }
    .text-footer { color: #999999 !important; }
    .text-fake { color: #cccccc !important; }
  }
</style>
</head>
<body class="bg" style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" class="bg" style="background-color:#ffffff;">
<tr><td align="center" style="padding:32px 16px;">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">

  <!-- Logo -->
  <tr>
    <td align="center" style="padding-bottom:28px;">
      <img src="https://upload.wikimedia.org/wikipedia/de/b/b0/Kentucky_Fried_Chicken_201x_logo.svg" alt="KFC" width="100" style="display:block;" />
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td align="center" style="padding-bottom:18px;">
      <p class="text-main" style="margin:0;font-size:16px;color:#000000;text-align:center;">Hallo ,</p>
    </td>
  </tr>

  <!-- Thank you -->
  <tr>
    <td align="center" style="padding-bottom:20px;">
      <p class="text-main" style="margin:0;font-size:15px;color:#000000;text-align:center;line-height:1.8;">
        herzlichen Dank für dein ehrliches Feedback,<br>
        das wir nutzen werden, um dir und unseren<br>
        anderen KFC-Gästen ein angenehmes<br>
        Kundenerlebnis zu bieten.
      </p>
    </td>
  </tr>

  <!-- Code intro -->
  <tr>
    <td align="center" style="padding-bottom:18px;">
      <p class="text-main" style="margin:0;font-size:15px;color:#000000;text-align:center;line-height:1.8;">
        Hier ist dein Aktionscode für 3 kostenlose Hot Wings*.
      </p>
    </td>
  </tr>

  <!-- Code -->
  <tr>
    <td align="center" style="padding-bottom:20px;">
      <p class="text-main" style="margin:0;font-size:22px;font-weight:bold;color:#000000;text-align:center;letter-spacing:1px;">${code}</p>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td align="center" style="padding-bottom:36px;">
      <p class="text-main" style="margin:0;font-size:15px;font-weight:bold;color:#000000;text-align:center;line-height:1.8;">
        Wir freuen uns darauf, dich demnächst wieder<br>bei uns begrüßen zu dürfen!
      </p>
    </td>
  </tr>

  <!-- Fine print -->
  <tr>
    <td align="center" style="padding-bottom:18px;">
      <p class="text-sub" style="margin:0;font-size:11px;color:#555555;text-align:center;line-height:1.7;">
        *Einlösbar nur in teilnehmenden Restaurants. Das Angebot ist innerhalb von 14 Tagen ab
        Ausstellung gültig. Einlösung nur über unsere Website
        <a href="https://www.kfc.de" style="color:#555555;">www.kfc.de</a> und unsere KFC
        Deutschland App möglich, bei einem Bestellung von mindestens 6&euro;, vorbehaltlich der
        Verfügbarkeit im Restaurant. Nicht gültig in Verbindung mit anderen Gutscheinen oder
        Rabatten. Exklusive Mehrwertsteuer. Nur einmalig einlösbar. Ein Aktionscode pro Gast
        und pro Besuch.
      </p>
    </td>
  </tr>

  <!-- Privacy -->
  <tr>
    <td align="center" style="padding-bottom:18px;">
      <p class="text-sub" style="margin:0;font-size:11px;color:#555555;text-align:center;line-height:1.7;">
        KFC respektiert deine Daten und deine Privatsphäre. Für weitere Informationen darüber,
        wie wir online gesammelte Informationen verwenden, lies bitte unsere
        <a href="https://www.kfc.de/datenschutz" style="color:#555555;text-decoration:underline;">Datenschutzrichtlinie.</a>
      </p>
    </td>
  </tr>

  <!-- Support -->
  <tr>
    <td align="center" style="padding-bottom:18px;">
      <p class="text-sub" style="margin:0;font-size:11px;color:#555555;text-align:center;line-height:1.7;">
        Wenn du eine Anfrage stellen möchtest, sende<br>
        uns bitte eine E-Mail an: <a href="mailto:service@kfc.de" style="color:#555555;">service@kfc.de</a> oder<br>
        besuchen Sie uns unter<br>
        <a href="https://kfc.de/gaesteservice" style="color:#555555;">https://kfc.de/gaesteservice</a>.
      </p>
    </td>
  </tr>

  <!-- Thanks -->
  <tr>
    <td align="center" style="padding-bottom:28px;">
      <p class="text-main" style="margin:0;font-size:13px;color:#000000;text-align:center;">Vielen Dank.</p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding-bottom:8px;">
      <p class="text-footer" style="margin:0;font-size:11px;color:#999999;text-align:center;">&copy; 2024 KFC Alle Rechte vorbehalten.</p>
    </td>
  </tr>

  <!-- Social -->
  <tr>
    <td align="center" style="padding-top:10px;padding-bottom:20px;">
      <p class="text-main" style="margin:0 0 10px 0;font-size:12px;font-weight:bold;color:#000000;text-align:center;">Bleiben Sie in Verbindung</p>
      <table cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td style="padding:0 4px;">
            <a href="https://www.facebook.com/KFCDeutschland">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
                   width="32" height="32" alt="Facebook" style="display:block;border-radius:6px;" />
            </a>
          </td>
          <td style="padding:0 4px;">
            <a href="https://www.instagram.com/kfcdeutschland">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                   width="32" height="32" alt="Instagram" style="display:block;border-radius:6px;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Fake disclaimer -->
  <tr>
    <td align="center" style="border-top:1px solid #eeeeee;padding-top:16px;">
      <p style="margin:0;font-size:10px;color:#cccccc;text-align:center;">
        haha das ist ein test
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'KFC Listens <noreply@kfccode.laendspotter.com>',
      to: [email],
      subject: 'Deine 3 gratis Hotwings bei KFC!',
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'interner fehler' });
  }
}
