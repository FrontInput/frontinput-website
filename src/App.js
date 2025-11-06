import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', quantity: '1', deadline: '2-4 Wochen', budget: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookies, setShowCookies] = useState(true);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showAGB, setShowAGB] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    if (file) {
      setTimeout(() => {
        setUploadedFile(file.name);
        setIsUploading(false);
        setShowForm(true);
      }, 1500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'model/step': ['.step', '.stp'], 
      'model/stl': ['.stl'], 
      'model/obj': ['.obj'],
      'image/vnd.dxf': ['.dxf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const anfrageText = `
      Name: ${formData.name}
      E-Mail: ${formData.email}
      Datei: ${uploadedFile}
      Stückzahl: ${formData.quantity}
      Frist: ${formData.deadline}
      Budget: ${formData.budget || 'Nicht angegeben'}
      Wünsche: ${formData.message || 'Keine'}
    `;
    alert(`Anfrage gesendet! Kopiere das für deinen Partner:\n\n${anfrageText}\n\nAngebot in 2 Arbeitstagen an ${formData.email}. Danke!`);
    setShowForm(false);
    setFormData({ name: '', email: '', quantity: '1', deadline: '2-4 Wochen', budget: '', message: '' });
  };

  const handleBestellen = () => {
    alert('Bestellung initiiert – Zahlung in 2 Schritten. Danke!');
  };

  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Cookie-Banner */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
          <p className="text-sm mb-2">Wir verwenden nur essenzielle Cookies für Funktionalität (DSG Art. 6). Kein Tracking.</p>
          <div className="flex space-x-4">
            <button onClick={() => setShowCookies(false)} className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700 transition">Akzeptieren</button>
            <button onClick={() => setShowDatenschutz(true)} className="text-blue-400 hover:text-blue-300 transition">Datenschutz</button>
          </div>
        </div>
      )}

      {/* Datenschutz-Modal */}
      {showDatenschutz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">Datenschutzerklärung (revDSG 2023)</h3>
            <p className="text-sm mb-4">FrontInput.ch verarbeitet nur notwendige Daten (E-Mail, 3D-Dateien) für Angebote (Art. 6 DSG). Kein Verkauf an Dritte. Widerruf: info@frontinput.ch. Cookies: Nur Session (kein Consent nötig). Volltext: [Link zu PDF].</p>
            <button onClick={() => setShowDatenschutz(false)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Schließen</button>
          </div>
        </div>
      )}

      {/* AGB-Modal */}
      {showAGB && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">AGB</h3>
            <p className="text-sm mb-4">Widerruf: 14 Tage (OR Art. 40). Zahlung: TWINT/PayPal/Rechnung. Lieferung: 2–4 Wochen. Volltext: [Link zu PDF].</p>
            <button onClick={() => setShowAGB(false)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Schließen</button>
          </div>
        </div>
      )}

      {/* Form-Modal nach Upload */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">Angebot anfragen</h3>
            <p className="text-sm mb-4 text-gray-600">Datei {uploadedFile} erhalten. Wir senden sie an unseren Partner und bereiten dein Angebot in 2 Arbeitstagen vor. Diese Infos helfen bei der Kalkulation.</p>
            <form onSubmit={handleFormSubmit}>
              <input 
                type="text" 
                placeholder="Dein Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 mb-4 border rounded" required
              />
              <input 
                type="email" 
                placeholder="Deine E-Mail" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 mb-4 border rounded" required
              />
              <select 
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full p-3 mb-4 border rounded" required
              >
                <option value="1">1 Stück</option>
                <option value="5">5 Stück</option>
                <option value="10">10 Stück</option>
                <option value="50">50+ Stück</option>
              </select>
              <select 
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full p-3 mb-4 border rounded" required
              >
                <option value="2-4 Wochen">2–4 Wochen</option>
                <option value="4-6 Wochen">4–6 Wochen</option>
                <option value="6+ Wochen">6+ Wochen</option>
              </select>
              <input 
                type="text" 
                placeholder="Ungefähres Budget (z.B. 200 CHF, optional)" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full p-3 mb-4 border rounded"
              />
              <textarea 
                placeholder="Zusätzliche Wünsche (z.B. IP-Schutz, Touch-Integration, optional)" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 mb-4 border rounded h-24" 
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">Angebot anfordern – In 2 Tagen per E-Mail</button>
            </form>
            <button onClick={() => setShowForm(false)} className="mt-4 text-gray-500">Abbrechen</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">FrontInput.ch</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Home</a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Services</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Kontakt</a>
            </div>
            <button 
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <a href="#home" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Home</a>
              <a href="#services" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Services</a>
              <a href="#contact" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Kontakt</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6 drop-shadow-lg">Maßgefertigte Aluminium-Frontplatten & Eingabesysteme</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 drop-shadow-md">Präzise Fertigung – lade deine 3D-Zeichnung hoch und erhalte ein personalisiertes Angebot in 24 Stunden. Sichere Zahlung & 14 Tage Widerruf.</p>
          <button 
            onClick={() => document.querySelector('#upload').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Jetzt konfigurieren & bestellen
          </button>
          <p className="text-sm mt-4 opacity-90">Ab 50 CHF | TWINT, PayPal, Rechnung | Sichere SSL-Zahlung</p>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Deine 3D-Zeichnung hochladen</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-lg mx-auto">Sicher, schnell und einfach – Drag & Drop oder klicke. Wir analysieren und kalkulieren in Echtzeit. Kein Risiko: 14 Tage Widerrufsrecht.</p>
          
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 w-full max-w-3xl mx-auto transform hover:scale-105 shadow-lg"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="animate-bounce">
                <p className="text-2xl text-blue-500 dark:text-blue-400 mb-2">Datei ablegen...</p>
              </div>
            ) : (
              <div>
                <span className="text-6xl mb-6 block">📁</span>
                <p className="text-2xl text-gray-500 dark:text-gray-400 mb-2">Ziehe .STL, .OBJ oder .STEP hier rein</p>
                <p className="text-base text-gray-400">oder klicke zum Auswählen (max. 50 MB)</p>
              </div>
            )}
          </div>
          
          {isUploading && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Wird verarbeitet...</p>
            </div>
          )}
          
          {uploadedFile && (
            <p className="mt-6 text-green-600 dark:text-green-400 font-semibold text-xl animate-bounce">Erfolgreich hochgeladen: {uploadedFile} – Danke!</p>
          )}

          <button onClick={handleBestellen} className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Bestellen (ab 50 CHF) – Sichere Zahlung
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">Warum FrontInput.ch?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center group hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <span className="text-5xl mb-4 block text-blue-500 group-hover:rotate-12 transition-transform duration-300">⚡</span>
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Schnell & Zuverlässig</h4>
              <p className="text-gray-600 dark:text-gray-300">Angebot in 24h, Lieferung in 2–4 Wochen – pünktlich wie ein Schweizer Uhrwerk.</p>
              <p className="text-sm text-green-600 mt-2 font-semibold">Ab 50 CHF</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center group hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <span className="text-5xl mb-4 block text-green-500 group-hover:rotate-12 transition-transform duration-300">🔧</span>
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Hochwertige Qualität</h4>
              <p className="text-gray-600 dark:text-gray-300">Aluminium aus zertifizierten Fabriken – Präzision bis 0.01mm.</p>
              <p className="text-sm text-green-600 mt-2 font-semibold">TWINT & PayPal</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center group hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <span className="text-5xl mb-4 block text-yellow-500 group-hover:rotate-12 transition-transform duration-300">💰</span>
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Günstig & Transparent</h4>
              <p className="text-gray-600 dark:text-gray-300">Faire Preise ab 50€ – keine versteckten Kosten, volle Kontrolle.</p>
              <p className="text-sm text-green-600 mt-2 font-semibold">14 Tage Widerruf</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Zahlungsmethoden: <span className="text-blue-600">TWINT | PayPal | Rechnung</span> | SSL-gesichert</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Was Kunden sagen</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 mb-4">"Schnelles Angebot, perfekte Qualität – empfehle!"</p>
              <p className="font-semibold">– Max M., Zürich</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 mb-4">"Einfacher 3D-Upload, günstiger als erwartet."</p>
              <p className="font-semibold">– Anna K., Bern</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 mb-4">"Super Service, Lieferung pünktlich."</p>
              <p className="font-semibold">– Lukas S., Basel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-lg">Kontakt: info@frontinput.ch | +41 79 123 45 67</p>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <button onClick={() => openSocial('https://linkedin.com/in/sebastian-nacht')} className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</button>
            <button onClick={() => openSocial('https://instagram.com/frontinput_ch')} className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</button>
            <button onClick={() => openSocial('https://x.com/frontinput_ch')} className="text-gray-400 hover:text-white transition-colors duration-300">X</button>
          </div>
          <div className="text-center text-sm mb-4">
            <button onClick={() => setShowAGB(true)} className="text-gray-400 hover:text-white transition-colors">AGB</button> | 
            <button onClick={() => setShowDatenschutz(true)} className="text-gray-400 hover:text-white transition-colors ml-2">Datenschutz</button> | 
            <button onClick={() => setShowDatenschutz(true)} className="text-gray-400 hover:text-white transition-colors ml-2">Widerruf</button>
          </div>
          <div className="text-center text-xs opacity-75">
            <h4 className="font-bold mb-2">Impressum (UWG Art. 3)</h4>
            <p>FrontInput.ch</p>
            <p>Sebastian Nacht, Eigentümer</p>
            <p>Musterstraße 123, 8000 Zürich, Schweiz</p>
            <p>UID: CHE-123.456.789 MWST</p>
            <p>E-Mail: info@frontinput.ch | Tel: +41 79 123 45 67</p>
            <p>AGB: [Link zu PDF] | Datenschutz: [Link zu PDF]</p>
            <p>© 2025 FrontInput.ch – Alle Rechte vorbehalten</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;