// api/send.js  —  Vercel Serverless Function
// npm install resend  (oder in package.json)

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

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KFC Aktionscode</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#E4002B;padding:0;border-radius:4px;text-align:center;width:80px;height:80px;vertical-align:middle;">
                    <span style="font-family:Arial,sans-serif;font-weight:900;font-size:28px;color:#ffffff;letter-spacing:1px;">KFC</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="font-size:18px;color:#222222;margin:0;line-height:1.6;">
                Hallo ,
              </p>
            </td>
          </tr>

          <!-- Thank you text -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <p style="font-size:16px;color:#444444;margin:0;line-height:1.8;text-align:center;max-width:480px;">
                herzlichen Dank für dein ehrliches Feedback,<br>
                das wir nutzen werden, um dir und unseren<br>
                anderen <a href="https://www.kfc.de" style="color:#E4002B;text-decoration:none;font-weight:600;">KFC</a>-Gästen ein angenehmes<br>
                Kundenerlebnis zu bieten.
              </p>
            </td>
          </tr>

          <!-- Code intro -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="font-size:16px;color:#222222;margin:0;font-weight:600;text-align:center;">
                Hier ist dein Aktionscode für 3 kostenlose Hot Wings*.
              </p>
            </td>
          </tr>

          <!-- Code box -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f5f5f5;border:2px dashed #E4002B;border-radius:8px;padding:16px 32px;text-align:center;">
                    <span style="font-family:'Courier New',Courier,monospace;font-size:26px;font-weight:900;color:#E4002B;letter-spacing:3px;">${code}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="font-size:16px;color:#222222;margin:0;font-weight:600;text-align:center;">
                Wir freuen uns darauf, dich demnächst wieder<br>bei uns begrüßen zu dürfen!
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #eeeeee;padding-top:24px;">
            </td>
          </tr>

          <!-- Fine print -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="font-size:12px;color:#888888;margin:0;line-height:1.7;text-align:center;max-width:520px;">
                *Einlösbar nur in teilnehmenden Restaurants.
                Das Angebot ist innerhalb von 14 Tagen ab Ausstellung gültig.
                Einlösung nur über unsere Website
                <a href="https://www.kfc.de" style="color:#E4002B;">www.kfc.de</a> und unsere KFC Deutschland App möglich,
                bei einem Bestellung von mindestens 6&euro;, vorbehaltlich der Verfügbarkeit im Restaurant.
                Nicht gültig in Verbindung mit anderen Gutscheinen oder Rabatten.
                Exklusive Mehrwertsteuer. Nur einmalig einlösbar. Ein Aktionscode pro Gast und pro Besuch.
              </p>
            </td>
          </tr>

          <!-- Privacy -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="font-size:12px;color:#888888;margin:0;line-height:1.7;text-align:center;max-width:520px;">
                <strong style="color:#666;">KFC</strong> respektiert deine Daten und deine Privatsphäre.
                Für weitere Informationen darüber, wie wir online gesammelte Informationen verwenden,
                lies bitte unsere <a href="https://www.kfc.de/datenschutz" style="color:#E4002B;">Datenschutzrichtlinie.</a>
              </p>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <p style="font-size:12px;color:#888888;margin:0;text-align:center;line-height:1.7;">
                Wenn du eine Anfrage stellen möchtest, sende uns bitte eine E-Mail an:
                <a href="mailto:service@kfc.de" style="color:#E4002B;">service@kfc.de</a> oder besuchen Sie uns unter
                <a href="https://kfc.de/gaesteservice" style="color:#E4002B;">https://kfc.de/gaesteservice</a>.
              </p>
            </td>
          </tr>

          <!-- Thanks -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="font-size:14px;color:#444444;margin:0;">Vielen Dank.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="border-top:1px solid #eeeeee;padding-top:20px;padding-bottom:10px;">
              <p style="font-size:11px;color:#aaaaaa;margin:0;">&copy; 2024 KFC Alle Rechte vorbehalten.</p>
            </td>
          </tr>

          <!-- Social -->
          <tr>
            <td align="center" style="padding-top:12px;">
              <p style="font-size:12px;color:#666;margin:0 0 8px 0;font-weight:600;">Bleiben Sie in Verbindung</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 4px;">
                    <a href="https://www.facebook.com/KFCDeutschland" style="display:inline-block;width:36px;height:36px;background:#1877F2;border-radius:8px;text-align:center;line-height:36px;">
                      <span style="color:white;font-weight:900;font-size:16px;">f</span>
                    </a>
                  </td>
                  <td style="padding:0 4px;">
                    <a href="https://www.instagram.com/kfcdeutschland" style="display:inline-block;width:36px;height:36px;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-radius:8px;text-align:center;line-height:36px;">
                      <span style="color:white;font-weight:900;font-size:16px;">&#9679;</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'KFC Deutschland <noreply@deine-domain.de>', // ← deine verifizierte domain
      to: [email],
      subject: 'Dein KFC Aktionscode – 3 kostenlose Hot Wings',
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
