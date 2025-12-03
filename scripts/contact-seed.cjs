require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

if (!uri) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

// Loose schema for pages (we only care about slug + templateData)
const PageSchema = new mongoose.Schema(
  {
    slug: { type: String, index: true },
  },
  { strict: false }
);

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

(async () => {
  try {
    await mongoose.connect(uri, { bufferCommands: false });

    const interestPhones = [
      {
        number: '+34968128600',
        body_es:
          `<p><strong>Hospital General Universitario Santa Lucía</strong><br/>` +
          `C/ Mezquita s/n, Paraje Los Arcos, 30202 Cartagena<br/>` +
          `📞 <a href="tel:+34968128600">+34 968 12 86 00</a></p>`,
        body_en:
          `<p><strong>Hospital General Universitario Santa Lucía</strong><br/>` +
          `C/ Mezquita s/n, Paraje Los Arcos, 30202 Cartagena<br/>` +
          `📞 <a href="tel:+34968128600">+34 968 12 86 00</a></p>`,
        body_fr:
          `<p><strong>Hôpital General Universitario Santa Lucía</strong><br/>` +
          `C/ Mezquita s/n, Paraje Los Arcos, 30202 Cartagena<br/>` +
          `📞 <a href="tel:+34968128600">+34 968 12 86 00</a></p>`,
        body_de:
          `<p><strong>Krankenhaus General Universitario Santa Lucía</strong><br/>` +
          `C/ Mezquita s/n, Paraje Los Arcos, 30202 Cartagena<br/>` +
          `📞 <a href="tel:+34968128600">+34 968 12 86 00</a></p>`,
      },
      {
        number: '+34695969003',
        body_es:
          `<p><strong>Farmacia 365 DÍAS</strong><br/>` +
          `Av. de Venecia 18, Santa Ana, Cartagena<br/>` +
          `📞 <a href="tel:+34695969003">+34 695 969 003</a></p>`,
        body_en:
          `<p><strong>365-Day Pharmacy</strong><br/>` +
          `Av. de Venecia 18, Santa Ana, Cartagena<br/>` +
          `📞 <a href="tel:+34695969003">+34 695 969 003</a></p>`,
        body_fr:
          `<p><strong>Pharmacie 365 JOURS</strong><br/>` +
          `Av. de Venecia 18, Santa Ana, Carthagène<br/>` +
          `📞 <a href="tel:+34695969003">+34 695 969 003</a></p>`,
        body_de:
          `<p><strong>365-Tage-Apotheke</strong><br/>` +
          `Av. de Venecia 18, Santa Ana, Cartagena<br/>` +
          `📞 <a href="tel:+34695969003">+34 695 969 003</a></p>`,
      },
      {
        number: '+34968733081',
        body_es:
          `<p><strong>Gasolinera 24h</strong><br/>` +
          `Carretera de Murcia, Km 437, Cartagena<br/>` +
          `📞 <a href="tel:+34968733081">+34 968 73 30 81</a></p>`,
        body_en:
          `<p><strong>24h Gas Station</strong><br/>` +
          `Carretera de Murcia, Km 437, Cartagena<br/>` +
          `📞 <a href="tel:+34968733081">+34 968 73 30 81</a></p>`,
        body_fr:
          `<p><strong>Station-service 24h</strong><br/>` +
          `Carretera de Murcia, Km 437, Carthagène<br/>` +
          `📞 <a href="tel:+34968733081">+34 968 73 30 81</a></p>`,
        body_de:
          `<p><strong>24h-Tankstelle</strong><br/>` +
          `Carretera de Murcia, Km 437, Cartagena<br/>` +
          `📞 <a href="tel:+34968733081">+34 968 73 30 81</a></p>`,
      },
      {
        number: '+34968531313',
        body_es:
          `<p><strong>Taxi Cartagena</strong><br/>` +
          `📞 <a href="tel:+34968531313">+34 968 53 13 13</a></p>`,
        body_en:
          `<p><strong>Taxi Cartagena</strong><br/>` +
          `📞 <a href="tel:+34968531313">+34 968 53 13 13</a></p>`,
        body_fr:
          `<p><strong>Taxi Cartagena</strong><br/>` +
          `📞 <a href="tel:+34968531313">+34 968 53 13 13</a></p>`,
        body_de:
          `<p><strong>Taxi Cartagena</strong><br/>` +
          `📞 <a href="tel:+34968531313">+34 968 53 13 13</a></p>`,
      },
    ];

    const emergencyPhones = [
      {
        number: '091',
        body_es:
          `<p><strong>Policía Nacional</strong><br/>` +
          `📞 <a href="tel:091">091</a></p>`,
        body_en:
          `<p><strong>National Police</strong><br/>` +
          `📞 <a href="tel:091">091</a></p>`,
        body_fr:
          `<p><strong>Police Nationale</strong><br/>` +
          `📞 <a href="tel:091">091</a></p>`,
        body_de:
          `<p><strong>Nationalpolizei</strong><br/>` +
          `📞 <a href="tel:091">091</a></p>`,
      },
      {
        number: '092',
        body_es:
          `<p><strong>Policía Local</strong><br/>` +
          `📞 <a href="tel:092">092</a></p>`,
        body_en:
          `<p><strong>Local Police</strong><br/>` +
          `📞 <a href="tel:092">092</a></p>`,
        body_fr:
          `<p><strong>Police Locale</strong><br/>` +
          `📞 <a href="tel:092">092</a></p>`,
        body_de:
          `<p><strong>Stadtpolizei</strong><br/>` +
          `📞 <a href="tel:092">092</a></p>`,
      },
      {
        number: '062',
        body_es:
          `<p><strong>Guardia Civil</strong><br/>` +
          `📞 <a href="tel:062">062</a></p>`,
        body_en:
          `<p><strong>Civil Guard</strong><br/>` +
          `📞 <a href="tel:062">062</a></p>`,
        body_fr:
          `<p><strong>Garde Civile</strong><br/>` +
          `📞 <a href="tel:062">062</a></p>`,
        body_de:
          `<p><strong>Guardia Civil</strong><br/>` +
          `📞 <a href="tel:062">062</a></p>`,
      },
      {
        number: '061',
        body_es:
          `<p><strong>Servicios Médicos</strong><br/>` +
          `📞 <a href="tel:061">061</a></p>`,
        body_en:
          `<p><strong>Medical Services</strong><br/>` +
          `📞 <a href="tel:061">061</a></p>`,
        body_fr:
          `<p><strong>Services Médicaux</strong><br/>` +
          `📞 <a href="tel:061">061</a></p>`,
        body_de:
          `<p><strong>Ärztlicher Notdienst</strong><br/>` +
          `📞 <a href="tel:061">061</a></p>`,
      },
      {
        number: '+34968128880',
        body_es:
          `<p><strong>Bomberos</strong><br/>` +
          `📞 <a href="tel:+34968128880">+34 968 128 880</a></p>`,
        body_en:
          `<p><strong>Fire Department</strong><br/>` +
          `📞 <a href="tel:+34968128880">+34 968 128 880</a></p>`,
        body_fr:
          `<p><strong>Pompiers</strong><br/>` +
          `📞 <a href="tel:+34968128880">+34 968 128 880</a></p>`,
        body_de:
          `<p><strong>Feuerwehr</strong><br/>` +
          `📞 <a href="tel:+34968128880">+34 968 128 880</a></p>`,
      },
      {
        number: '016',
        body_es:
          `<p><strong>Violencia de género</strong><br/>` +
          `📞 <a href="tel:016">016</a></p>`,
        body_en:
          `<p><strong>Gender Violence Hotline</strong><br/>` +
          `📞 <a href="tel:016">016</a></p>`,
        body_fr:
          `<p><strong>Violence de genre</strong><br/>` +
          `📞 <a href="tel:016">016</a></p>`,
        body_de:
          `<p><strong>Hilfetelefon bei geschlechtsspezifischer Gewalt</strong><br/>` +
          `📞 <a href="tel:016">016</a></p>`,
      },
    ];

    const result = await Page.findOneAndUpdate(
      { slug: 'homepage' },
      {
        $set: {
          'templateData.section8.interestPhones': interestPhones,
          'templateData.section8.emergencyPhones': emergencyPhones,
        },
      },
      { new: true }
    );

    if (!result) {
      console.error('No homepage document found with slug "homepage"');
      process.exit(1);
    }

    console.log('Homepage contact phones seeded/updated successfully.');
    process.exit(0);
  } catch (e) {
    console.error('Error seeding contact phones:', e);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();