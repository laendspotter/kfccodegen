// api/send.js  —  Vercel Serverless Function

import { Resend } from ‘resend’;

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘method not allowed’ });
}

const { code, email } = req.body;

if (!code || !email) {
return res.status(400).json({ error: ‘code und email erforderlich’ });
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
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADlCAMAAACF3vCXAAACHFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////kACsAAABPT08PDw/oIkcEBAR/f38JCQlgYGAeHh77+/sHBwcjIyP29vafn5+Pj4/x8fEaGhoTExP+/f39/f3Pz8/q6uq+vr6urq6YmJh7e3tvb29MTEw/Pz87OzsvLy8NDQ03NzcXFxfi4uJ2dna3t7exsbH5+fkzMzPf399DQ0MrKyvn5+fW1ta6urrIyMhHR0f4+PjFxcUpKSknJyfz8/Pu7u7s7OzCwsKrq6ulpaVsbGxaWlqioqJdXV3R0dGoqKiSkpKHh4fMzMy0tLRYWFja2tqcnJyNjY2Dg4OBgYFkZGRWVlZSUlLp6eno6Oj83ePT09P2q7mKiopzc3NxcXFnZ2fqMVTnGkH/+/zKysr3tcKVlZXc3NzY2Nj5ytP0lqjzjaDygZbxd47uWHTrRGTqOltJSUnmEjr96e31n7D609v4vslpaWnsT23vY33oJ0vlBjD+9Pb98PPlCDLk5OT71t3wb4fwbobwbYbuYnzoJUr85+uMjIztUW74v8r3uMT1obHZQjxVAAAAMXRSTlMACCjZOhLFt6WZlIV4ZOZrVxm0STDqva6qnY5yXDUf+PTv39TOyop8TEVB9d5SUNLL+flS/AAAAQFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/Ij8+PHI6UkRGIHhtbG5zOnI9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyOkRlc2NyaXB0aW9uIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4OkNyZWF0ZURhdGU+MjAxOS0wNy0wNVQxNjoyNDoyNiswMjowMDwveDpDcmVhdGVEYXRlPjwvcjpEZXNjcmlwdGlvbj48L3I6UkRGPjw/eHBhY2tl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" alt="KFC" width="100" style="display:block;margin:0 auto;" />
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
from: ‘KFC Listens [noreply@kfccode.laendspotter.com](mailto:noreply@kfccode.laendspotter.com)’,
to: [email],
subject: ‘Deine 3 gratis Hotwings bei KFC!’,
html,
});

```
if (error) {
  console.error('Resend error:', error);
  return res.status(500).json({ error: error.message });
}

return res.status(200).json({ success: true, id: data.id });
```

} catch (err) {
console.error(‘Unexpected error:’, err);
return res.status(500).json({ error: ‘interner fehler’ });
}
}
