import React, { useCallback, useState, useRef, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async'; 


// =================================================================
// SEO KOMPONENTE
// =================================================================

const SEO = () => (
    <Helmet>
        {/* TITEL: "Ingenieurleistung" entfernt */}
        <title>InFron GmbH | HMI Komplettlösungen, Displays & Folientastaturen (Swiss Quality Management)</title>
        <meta 
            name="description" 
            content="Ihr Schweizer Partner für technische Expertise und Qualitätsmanagement von massgefertigten Frontpanels, industriellen Displays und Tastaturen. Angebot in 24 Stunden."
        />
        <link rel="canonical" href="https://www.infron.ch/" /> 
        {/* OG TITEL: "Ingenieurleistung" entfernt */}
        <meta property="og:title" content="InFron GmbH | HMI, Displays & Eingabesysteme (CH Präzisions-Management)" />
        <meta property="og:url" content="https://www.infron.ch/" />
    </Helmet>
);


// =================================================================
// DATENSTRUKTUREN (Unverändert)
// =================================================================

const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'Alle Lösungen', icon: '📦' },
  { id: 'displays', label: 'Displays und Touch', icon: '👆' }, 
  { id: 'folien', label: 'Folien und Oberflächen', icon: '🎨' }, 
  { id: 'tastaturen', label: 'Tastaturen und Matten', icon: '⌨️' }, 
  { id: 'hardware', label: 'Frontplatten und Hardware', icon: '🔩' }, 
];

const PRODUCTS = [
  { id: 1, category: 'displays', title: 'HMI Komplettlösungen', desc: 'Vollständige Mensch-Maschine-Schnittstellen (HMI), Plug-and-Play.', icon: '💡', color: 'blue' },
  { id: 2, category: 'displays', title: 'TFT- und LCD-Displays', desc: 'Spezialisierte Anzeige-Einheiten für industrielle Anwendungen (TFT/LCD).', icon: '🖥️', color: 'blue' },
  { id: 3, category: 'displays', title: 'Optical Bonding', desc: 'Vollflächige Verklebung für höchste Lesbarkeit und Robustheit, auch bei Sonnenlicht.', icon: '✨', color: 'blue' },
  { id: 4, category: 'displays', title: 'Integrierte Touch-Lösungen', desc: 'Kapazitive (PCAP) oder resistive Touch-Panels mit angepassten Displays.', icon: '👆', color: 'blue' }, 
  { id: 5, category: 'folien', title: 'Technische Gläser', desc: 'Chemisch gehärtete und entspiegelte Gläser für Frontpanels und Abdeckungen.', icon: '💎', color: 'green' },
  { id: 6, category: 'folien', title: 'IMD (In-Mold-Decoration)', desc: 'Dekor- und Funktionsfolien, die direkt im Spritzgusswerkzeug integriert werden.', icon: '🧱', color: 'green' },
  { id: 7, category: 'folien', title: 'Bedien- und Dekorfolien', desc: 'Individuell bedruckte, gestanzte und beschichtete Folien für Fronten.', icon: '🎨', color: 'green' },
  { id: 8, category: 'tastaturen', title: 'Folientastaturen', desc: 'Zuverlässige, flache Tastenfelder, resistent gegen Staub, Feuchtigkeit und Chemikalien.', icon: '⌨️', color: 'purple' },
  { id: 9, category: 'tastaturen', title: 'Kapazitive Tastaturen (PCAP)', desc: 'Moderne, hinter Glas liegende Tastenfelder, verschleissfrei und leicht zu reinigen.', icon: '⚡', color: 'purple' },
  { id: 10, category: 'tastaturen', title: 'Silikonschaltmatten', desc: 'Hochtaktile Eingabesysteme aus Silikon, ideal für raue und taktische Umgebungen.', icon: '🎛️', color: 'purple' },
  { id: 11, category: 'hardware', title: 'CNC-gefertigte Frontplatten', desc: 'Präzise Metall- oder Kunststoffplatten, massgefertigt per CNC-Fräsen und Laserschneiden.', icon: '🔩', color: 'yellow' },
  { id: 14, category: 'hardware', title: 'Flexible Leiterplatten (FPC)', desc: 'Flexible Printed Circuits (FPC) für platzsparende und bewegliche Elektronik-Verbindungen.', icon: '🟢', color: 'yellow' },
];

const FORM_CATEGORIES = [
    ...PRODUCTS.map(p => ({ id: p.title, label: p.title })), 
    { id: 'Andere', label: 'Andere / Nicht sicher' },
];

const TECHNICAL_OPTIONS = {
    ipProtection: ['Keine Angabe', 'IP 54', 'IP 65', 'IP 67', 'IP 69K'],
    material: ['Keine Angabe', 'Aluminium', 'Edelstahl (V2A/V4A)', 'Kunststoff (PC/ABS)', 'Technisches Glas'],
    surface: ['Keine Angabe', 'Pulverbeschichtet (RAL)', 'Eloxiert', 'Gebürstet', 'Unbehandelt'],
    mounting: ['Keine Angabe', 'Frontmontage (von Aussen)', 'Hintermontage (von Innen)', 'Aufbau-Gehäuse'],
    bonding: ['Keine Angabe', 'Ja, Optical Bonding gewünscht', 'Nein, Standard Air Gap'],
    environment: ['Keine Angabe', 'Innenbereich (Standard)', 'Aussenbereich (UV-stabil)', 'Feuchtraum/Nassbereich'],
};

// =================================================================
// HILFS-KOMPONENTEN (unverändert)
// =================================================================

const SelectField = ({ id, label, value, onChange, options }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label} <span className="text-xs font-normal text-gray-500">(Optional)</span>
        </label>
        <select 
            id={id} 
            value={value} 
            onChange={onChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
        >
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);


const Modal = ({ children, title, onClose, maxWidth = 'max-w-4xl' }) => {
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full ${maxWidth} relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100`}>
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">{title}</h3>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:hover:text-red-400 text-xl font-bold p-2 transition-colors"
          aria-label="Modal schliessen"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const DatenschutzModal = ({ onClose }) => (
  <Modal title="Datenschutz-Bestimmungen (DSG Art. 6)" onClose={onClose}>
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <p>Datum der letzten Aktualisierung: November 2025</p>
      <h4 className="font-bold text-lg dark:text-white mt-4">1. Essenzielle Cookies</h4>
      <p>Wir verwenden ausschließlich technisch notwendige Cookies, die für die Funktion unserer Webseite und die Speicherung deiner Cookie-Präferenz unerlässlich sind. (DSG Art. 6 Abs. 1 lit. f – Berechtigtes Interesse).</p>
      <h4 className="font-bold text-lg dark:text-white mt-4">2. Datenverarbeitung beim Upload/Formular</h4>
      <p>Die von dir hochgeladenen 3D-Dateien und die eingegebenen Daten werden ausschliesslich zur Erstellung des gewünschten Angebots gespeichert. (DSG Art. 6 Abs. 1 lit. b).</p>
      <h4 className="font-bold text-lg dark:text-white mt-4">3. Deine Rechte</h4>
      <p>Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner Daten. Kontaktiere uns dazu unter info@infron.ch.</p>
    </div>
  </Modal>
);

const AGBModal = ({ onClose }) => (
  <Modal title="Allgemeine Geschäftsbedingungen (AGB) und Widerruf" onClose={onClose}>
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <p>Datum der letzten Aktualisierung: November 2025</p>
      <h4 className="font-bold text-xl text-blue-600 dark:text-blue-400 mt-6">Allgemeine Geschäftsbedingungen</h4>
      <h5 className="font-bold text-lg dark:text-white mt-4">1. Geltungsbereich</h5>
      <p>Diese AGB gelten für alle Angebote, Bestellungen und Lieferungen zwischen der InFron GmbH und ihren Kunden.</p>
      <h5 className="font-bold text-lg dark:text-white mt-4">3. Widerrufsrecht (B2C)</h5>
      <p>Da unsere Produkte massgefertigt nach Kundenspezifikation sind, besteht in der Regel **kein Widerrufsrecht** für Verbraucher. Eine Ausnahme gilt nur bei groben Mängeln.</p>
    </div>
  </Modal>
);

const ProductCard = ({ product, scrollToUpload }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center group hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border-t-4 border-blue-500 dark:border-blue-400 transform hover:border-t-blue-700">
    <span className={`text-5xl mb-4 block text-${product.color}-500 transition-colors`}>{product.icon}</span>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{product.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">{product.desc}</p>
    <button onClick={scrollToUpload} className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors">Jetzt kalkulieren</button>
  </div>
);


// =================================================================
// HAUPT-KOMPONENTE APP
// =================================================================

function App() {
  const [uiState, setUiState] = useState({
    isMenuOpen: false, 
    showCookies: true, 
    showDatenschutz: false, 
    showAGB: false, 
    showForm: false, 
  });
  const [activeCategory, setActiveCategory] = useState('all'); 
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 
  
  const [formData, setFormData] = useState({ 
    name: '', email: '', quantity: '1', budget: '', message: '',
    productCategory: FORM_CATEGORIES.length > 0 ? FORM_CATEGORIES[0].id : 'Andere',
    // NEUE OPTIONALE FELDER
    ipProtection: TECHNICAL_OPTIONS.ipProtection[0],
    material: TECHNICAL_OPTIONS.material[0],
    surface: TECHNICAL_OPTIONS.surface[0],
    mounting: TECHNICAL_OPTIONS.mounting[0],
    bonding: TECHNICAL_OPTIONS.bonding[0],
    environment: TECHNICAL_OPTIONS.environment[0],
  });

  const uploadRef = useRef(null);
  const scrollToUpload = useCallback(() => uploadRef.current?.scrollIntoView({ behavior: 'smooth' }), []);
  const openUI = useCallback((key) => setUiState(prev => ({ ...prev, [key]: true })), []);
  const closeUI = useCallback((key) => setUiState(prev => ({ ...prev, [key]: false })), []);
  
  const updateFormData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleUI = (key) => setUiState(prev => ({ ...prev, [key]: !prev[key] }));


  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    if (file) {
      setTimeout(() => { 
        setUploadedFile(file.name);
        setIsUploading(false);
        openUI('showForm');
      }, 1500);
    }
  }, [openUI]); 

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/step': ['.step', '.stp'], 'model/stl': ['.stl'], 'model/obj': ['.obj'], 'application/dxf': ['.dxf'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  // LOGIK ZUR ANZEIGE DER DYNAMISCHEN FELDER (UNVERÄNDERT)
  const currentCategory = useMemo(() => {
      const selectedTitle = formData.productCategory;
      const product = PRODUCTS.find(p => p.title === selectedTitle);
      return product ? product.category : 'other'; 
  }, [formData.productCategory]);
  
  const renderDynamicFields = () => {
      // Wenn die Kategorie "Andere" oder "Folien" ist, nichts Zusätzliches anzeigen
      if (currentCategory === 'other' || currentCategory === 'folien') return null;

      const isHardware = currentCategory === 'hardware';
      const isDisplay = currentCategory === 'displays';
      const isTastaturen = currentCategory === 'tastaturen';
      
      return (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mt-4">
              <h4 className="font-bold text-gray-800 dark:text-white mb-3">Technische Spezifikationen (Optional)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {(isHardware || isDisplay || isTastaturen) && (
                      <SelectField 
                          id="ipProtection" 
                          label="Gewünschte IP-Schutzklasse" 
                          value={formData.ipProtection} 
                          onChange={(e) => updateFormData('ipProtection', e.target.value)} 
                          options={TECHNICAL_OPTIONS.ipProtection}
                      />
                  )}

                  {(isHardware || currentCategory === 'folien') && (
                      <SelectField 
                          id="material" 
                          label="Material (z.B. Alu, Glas, V2A)" 
                          value={formData.material} 
                          onChange={(e) => updateFormData('material', e.target.value)} 
                          options={TECHNICAL_OPTIONS.material}
                      />
                  )}

                  {isHardware && (
                      <SelectField 
                          id="surface" 
                          label="Oberflächenfinish (z.B. Eloxiert)" 
                          value={formData.surface} 
                          onChange={(e) => updateFormData('surface', e.target.value)} 
                          options={TECHNICAL_OPTIONS.surface}
                      />
                  )}

                  {(isHardware || isDisplay) && (
                      <SelectField 
                          id="mounting" 
                          label="Montageart" 
                          value={formData.mounting} 
                          onChange={(e) => updateFormData('mounting', e.target.value)} 
                          options={TECHNICAL_OPTIONS.mounting}
                      />
                  )}
                  
                  {isDisplay && (
                      <SelectField 
                          id="bonding" 
                          label="Optical Bonding gewünscht?" 
                          value={formData.bonding} 
                          onChange={(e) => updateFormData('bonding', e.target.value)} 
                          options={TECHNICAL_OPTIONS.bonding}
                      />
                  )}
                  
                  {(isDisplay || currentCategory === 'folien' || isTastaturen) && (
                      <SelectField 
                          id="environment" 
                          label="Betriebsumgebung (Innen/Aussen)" 
                          value={formData.environment} 
                          onChange={(e) => updateFormData('environment', e.target.value)} 
                          options={TECHNICAL_OPTIONS.environment}
                      />
                  )}

              </div>
          </div>
      );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    /* ... Logik zur Formularverarbeitung (unverändert) ... */
    if (!formData.name || !formData.email) {
      alert('Bitte fülle alle Pflichtfelder (Name und E-Mail) aus.'); return;
    }
    
    const dateiName = uploadedFile && uploadedFile !== 'Keine Datei hochgeladen' ? uploadedFile : 'Keine 3D-Datei hochgeladen';
    const selectedCategoryLabel = FORM_CATEGORIES.find(c => c.id === formData.productCategory)?.label || formData.productCategory;
    const isDefault = (value) => value.startsWith('Keine Angabe') || value === TECHNICAL_OPTIONS.material[0];

    let techDetails = '';
    if (!isDefault(formData.ipProtection)) techDetails += `\n- IP-Schutz: ${formData.ipProtection}`;
    if (!isDefault(formData.material)) techDetails += `\n- Material: ${formData.material}`;
    if (!isDefault(formData.surface)) techDetails += `\n- Oberfläche: ${formData.surface}`;
    if (!isDefault(formData.mounting)) techDetails += `\n- Montageart: ${formData.mounting}`;
    if (!isDefault(formData.bonding)) techDetails += `\n- Optical Bonding: ${formData.bonding}`;
    if (!isDefault(formData.environment)) techDetails += `\n- Umgebung: ${formData.environment}`;
    if (techDetails) techDetails = `\n\n--- Optionale Tech. Details ---${techDetails}`;


    const anfrageText = `
      Produktgruppe: ${selectedCategoryLabel}
      Name: ${formData.name}
      E-Mail: ${formData.email}
      Datei: ${dateiName}
      Stückzahl: ${formData.quantity}
      Zielpreis: ${formData.budget || 'Nicht angegeben'}
      Anmerkungen/Anforderungen: ${formData.message || 'Keine'}
      ${techDetails}
    `; 

    alert(`Anfrage erfolgreich gesendet! Wir melden uns in 2 Arbeitstagen.\n\n--- Deine übermittelten Details ---\n${anfrageText.trim()}`);

    // Zurücksetzen der Felder
    closeUI('showForm'); setFormData({ 
        name: '', email: '', quantity: '1', budget: '', message: '', 
        productCategory: FORM_CATEGORIES.length > 0 ? FORM_CATEGORIES[0].id : 'Andere', 
        ipProtection: TECHNICAL_OPTIONS.ipProtection[0], material: TECHNICAL_OPTIONS.material[0], 
        surface: TECHNICAL_OPTIONS.surface[0], mounting: TECHNICAL_OPTIONS.mounting[0],
        bonding: TECHNICAL_OPTIONS.bonding[0], environment: TECHNICAL_OPTIONS.environment[0],
    }); setUploadedFile(null); 
  };
  
  const handleAnfragen = useCallback(() => { 
    setUploadedFile('Keine Datei hochgeladen');
    openUI('showForm'); 
  }, [openUI]);
  
  const openSocial = (url) => { window.open(url, '_blank', 'noopener,noreferrer'); };
  const filteredProducts = PRODUCTS.filter(product => activeCategory === 'all' || product.category === activeCategory);
  const { isMenuOpen, showCookies, showDatenschutz, showAGB, showForm } = uiState; 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      <SEO />
      
      {showDatenschutz && <DatenschutzModal onClose={() => closeUI('showDatenschutz')} />}
      {showAGB && <AGBModal onClose={() => closeUI('showAGB')} />}
      
      {/* Formular-Modal (unverändert) */}
      {showForm && (
        <Modal 
          title={uploadedFile === 'Keine Datei hochgeladen' ? 'Anfrage ohne 3D-Modell' : `Angebot für ${uploadedFile}`} 
          onClose={() => closeUI('showForm')} 
          maxWidth="max-w-xl"
        >
          <p className="mb-4 text-gray-600 dark:text-gray-400">Bitte gib deine Kontaktdaten an, damit wir dir ein präzises Angebot senden können.</p>
          {uploadedFile === 'Keine Datei hochgeladen' && (
              <p className="text-orange-500 mb-4 font-semibold">Du forderst ein Angebot ohne 3D-Datei an. Bitte beschreibe dein Anliegen so detailliert wie möglich unter "**Anmerkungen / Spezielle Anforderungen**".</p>
          )}
          <form onSubmit={handleFormSubmit} className="space-y-5">

            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                **Gewünschte Produktgruppe**
              </label>
              <select 
                id="productCategory" 
                value={formData.productCategory} 
                onChange={(e) => updateFormData('productCategory', e.target.value)} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
              >
                {FORM_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            {renderDynamicFields()}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name*</label><input type="text" id="name" required value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" /></div>
              <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-Mail*</label><input type="email" id="email" required value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" /></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
              <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stückzahl</label>
                  <select id="quantity" value={formData.quantity} onChange={(e) => updateFormData('quantity', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2">
                      <option value="1">1 (Muster)</option>
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                      <option value="1000">1'000</option>
                      <option value="2000+">2'000+</option>
                  </select>
              </div>
              
              <div><label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">**Zielpreis (CHF)**</label><input type="text" id="budget" placeholder="Optional" value={formData.budget} onChange={(e) => updateFormData('budget', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" /></div>
            </div>
            
            <div><label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Anmerkungen / Spezielle Anforderungen</label><textarea id="message" rows="4" value={formData.message} onChange={(e) => updateFormData('message', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"></textarea></div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md">Angebot anfordern & senden</button>
          </form>
        </Modal>
      )}

      {/* Sticky CTA Button (Angebot starten) */}
      <button 
          onClick={scrollToUpload} 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-40 text-sm font-bold uppercase hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center"
          aria-label="Schnellangebot starten"
      >
          <span className="text-xl mr-2">✉️</span> Jetzt Angebot starten
      </button>

      {/* Sticky Tech-Chat Button (TEXT KORRIGIERT) */}
      <a 
          href="https://wa.me/+41763981505" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 text-sm font-bold uppercase hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 flex items-center"
          aria-label="Frage per WhatsApp an den Technik-Experten stellen"
      >
          <span className="text-xl mr-2">💬</span> Frage an den Technik-Experten
      </a>


      {/* Cookie-Banner (unverändert) */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-2xl">
          <p className="text-sm mb-2">Wir verwenden nur essenzielle Cookies für Funktionalität.</p>
          <div className="flex space-x-4">
            <button onClick={() => closeUI('showCookies')} className="bg-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">Akzeptieren</button>
            <button onClick={() => openUI('showDatenschutz')} className="text-blue-400 hover:text-blue-300 transition-colors underline">Datenschutz</button>
          </div>
        </div>
      )}

      {/* Header (mit korrigierter Navigation) */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">InFron GmbH <span className="ml-2 text-xl">🇨🇭</span></div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Home</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Über uns</a>
              <a href="#products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Produkte</a>
              <a href="#technical_capabilities" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Expertise</a>
              <a href="#process" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Prozess</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">Kontakt</a>
            </div>
            <button className="md:hidden text-gray-700 dark:text-gray-300 text-2xl" onClick={() => toggleUI('isMenuOpen')} aria-label="Menü öffnen">☰</button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <a href="#home" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Home</a>
              <a href="#about" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Über uns</a>
              <a href="#products" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Produkte</a>
              <a href="#technical_capabilities" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Expertise</a>
              <a href="#process" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Prozess</a>
              <a href="#contact" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => closeUI('isMenuOpen')}>Kontakt</a>
            </div>
          )}
        </nav>
      </header>
      
      {/* --- Hero Section (TEXT KORRIGIERT) --- */}
      <section id="home" className="text-white relative overflow-hidden bg-cover bg-center h-screen flex items-center" style={{backgroundImage: 'url(/hero-bg.jpg)'}}>
        <div className="absolute inset-0 bg-gray-900 opacity-60 backdrop-blur-sm"></div> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
            Massgefertigte Frontpanels <span className="text-blue-400">und</span> Eingabesysteme
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl font-light opacity-95 drop-shadow-md">
            **Schweizer Präzision & Expertise** – höchste Qualitätsstandards für Ihre industriellen Produkte. Erhalten Sie ein **personalisiertes Angebot in 24 Stunden**.
          </p>
          <button onClick={scrollToUpload} className="bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-xl uppercase shadow-2xl hover:bg-blue-700 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-500">
            Jetzt Angebot starten (Datei hochladen)
          </button>
        </div>
      </section>

      {/* --- Upload Section (unverändert) --- */}
      <section id="upload" ref={uploadRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Deine 3D-Zeichnung hochladen</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-lg mx-auto">Sicher, schnell und einfach – Drag & Drop oder klicke.</p>
          <div {...getRootProps()} className="border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 w-full max-w-3xl mx-auto transform hover:scale-[1.02] shadow-lg">
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="animate-pulse"><p className="text-3xl text-blue-500 dark:text-blue-400 mb-2 font-semibold">Datei ablegen – Wir sind bereit!</p></div>
            ) : (
              <div>
                <span className="text-6xl mb-6 block text-blue-500">⬆️</span>
                <p className="text-2xl text-gray-500 dark:text-gray-400 mb-2">Ziehe .STEP, .STL, .OBJ oder .DXF hier rein</p>
                <p className="text-base text-gray-400">oder klicke zum Auswählen (max. 50 MB)</p>
              </div>
            )}
          </div>
          {isUploading && (<div className="mt-6"><div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"><div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div></div><p className="text-sm text-gray-600 mt-2 dark:text-gray-400">Wird verarbeitet...</p></div>)}
          {uploadedFile && uploadedFile !== 'Keine Datei hochgeladen' && (<><p className="mt-6 text-green-600 dark:text-green-400 font-semibold text-xl animate-bounce">Erfolgreich hochgeladen: {uploadedFile}</p><button onClick={() => openUI('showForm')} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">Details angeben & Angebot anfordern</button></>)}
          
          {(!uploadedFile || uploadedFile === 'Keine Datei hochgeladen') && (
            <button 
                onClick={handleAnfragen} 
                className="mt-8 bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md"
            >
                Nur **anfragen** (Falls du keinen 3D-Upload benötigst)
            </button>
          )}
        </div>
      </section>

      {/* --- Produkte Section (unverändert) --- */}
      <section id="products" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Unsere Produktlinien</h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">Wählen Sie eine Kategorie, um sich inspirieren zu lassen.</p>
          
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-12">
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 my-1 
                  ${activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }
                `}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} scrollToUpload={scrollToUpload} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center mt-10 p-8 bg-white dark:bg-gray-700 rounded-lg shadow-inner">
              <p className="text-xl text-gray-600 dark:text-gray-300">Keine Produkte in dieser Kategorie gefunden. Bitte wählen Sie eine andere Kategorie.</p>
            </div>
          )}

        </div>
      </section>
      
      {/* --- Technical Capabilities (TEXT KORRIGIERT) --- */}
      <section id="technical_capabilities" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Unsere Technische Expertise</h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Wir sichern die Qualität Ihrer Produkte durch striktes Schweizer Präzisions-Management über die gesamte Lieferkette.</p>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-xl border-t-4 border-blue-600 bg-gray-50 dark:bg-gray-800 shadow-lg">
                <span className="text-5xl mb-4 block text-blue-600">📐</span>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Präzisions-Spezifikation</h3>
                <p className="text-gray-600 dark:text-gray-300">Wir arbeiten ausschliesslich nach europäischen Toleranznormen (z.B. ISO 2768-mK) und definieren Messpunkte und Materialstandards. Kein Projekt ohne klare Zeichnung.</p>
            </div>
            
            <div className="p-6 rounded-xl border-t-4 border-green-600 bg-gray-50 dark:bg-gray-800 shadow-lg">
                <span className="text-5xl mb-4 block text-green-600">✅</span>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Qualitätsmanagement (CH)</h3>
                <p className="text-gray-600 dark:text-gray-300">Alle Fertigungspartner sind auditiert und unterliegen unseren Qualitätskontrollen. Wir übernehmen die Risikoabsicherung und die finale Prüfung der Chargen in der Schweiz.</p>
            </div>

            <div className="p-6 rounded-xl border-t-4 border-purple-600 bg-gray-50 dark:bg-gray-800 shadow-lg">
                <span className="text-5xl mb-4 block text-purple-600">🔗</span>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Fertig-Montage Service</h3>
                <p className="text-gray-600 dark:text-gray-300">Auf Wunsch liefern wir HMI-Komplettsysteme: Display, Touch, Frontplatte, Dichtung und Folie sind bereits montiert und einbaufertig (Plug-and-Play).</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Prozess Transparenz (TEXT KORRIGIERT) --- */}
      <section id="process" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Transparenter 5-Schritte-Prozess</h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Von Ihrer CAD-Datei bis zur Lieferung – so garantieren wir Geschwindigkeit und Präzision.</p>
            
            <div className="relative flex flex-col items-center">
                <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
                    
                    {/* Schritt 1 */}
                    <div className="relative z-10 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-xl border-t-4 border-blue-500">
                        <div className="h-10 w-10 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Kunden-Upload</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Einreichung der 3D-Datei (.STEP, .STL) oder technischer Zeichnung.</p>
                    </div>

                    {/* Schritt 2 (KORRIGIERT) */}
                    <div className="relative z-10 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-xl border-t-4 border-green-500">
                        <div className="h-10 w-10 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">CH-Datenprüfung</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Prüfung, Normierung (ISO) und finale technische Freigabe durch InFron (Zürich).</p>
                    </div>
                    
                    {/* Schritt 3 */}
                    <div className="relative z-10 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-xl border-t-4 border-red-500">
                        <div className="h-10 w-10 mx-auto mb-3 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Globale Produktion</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fertigung beim auditierten Spezialpartner. Fokus auf Effizienz und Kosten.</p>
                    </div>
                    
                    {/* Schritt 4 */}
                    <div className="relative z-10 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-xl border-t-4 border-yellow-500">
                        <div className="h-10 w-10 mx-auto mb-3 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Swiss Quality Check</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Warenannahme und stichprobenartige Endkontrolle nach Schweizer Standard.</p>
                    </div>
                    
                    {/* Schritt 5 */}
                    <div className="relative z-10 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-xl border-t-4 border-purple-500">
                        <div className="h-10 w-10 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">5</div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">Just-in-Time-Lieferung</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Versand der geprüften Ware direkt an Ihren Standort (DDP).</p>
                    </div>

                </div>
            </div>
        </div>
      </section>


      {/* --- About Section (unverändert) --- */}
      <section id="about" className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">Ihr Partner in Zürich: Über InFron GmbH</h2>
            <div className="md:flex md:space-x-12 items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                    <div className="h-40 w-40 rounded-full mx-auto bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-6xl text-blue-600 mb-4">👩‍💼</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Dragana Ignjatovic</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Gründerin & Inhaberin</p>
                </div>
                <div className="md:w-2/3 space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold">Als spezialisierter B2B-Anbieter ist die InFron GmbH Ihr direkter Kontakt für komplexe Eingabesysteme und Frontpanel-Lösungen.</p>
                    <p>Unsere Mission ist es, Schweizer Unternehmen den Zugang zu präziser Massanfertigung zu vereinfachen, indem wir die gesamte Kette vom technischen Design über das Lieferanten-Audit bis zur finalen Qualitätskontrolle übernehmen. Sie senden uns die CAD-Datei – wir liefern die geprüfte Ware.</p>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">"Transparenz, Geschwindigkeit und die Einhaltung höchster technischer Standards sind unser Versprechen an Sie."</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Testimonials (unverändert) --- */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Was Kunden sagen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><p className="text-gray-600 mb-4">"Schnelles Angebot, perfekte Qualität – empfehle!"</p><p className="font-semibold">– Max M., Zürich</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><p className="text-gray-600 mb-4">"Einfacher 3D-Upload, günstiger als erwartet."</p><p className="font-semibold">– Anna K., Bern</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center"><p className="text-gray-600 mb-4">"Super Service, Lieferung pünktlich."</p><p className="font-semibold">– Lukas S., Basel</p></div>
          </div>
        </div>
      </section>
      
      {/* --- Footer (TEXT KORRIGIERT) --- */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4"><p className="text-lg">Kontakt: info@infron.ch | <a href="tel:+41763981505" className="hover:underline">+41 76 398 15 05</a></p></div>
          <div className="flex justify-center space-x-6 mb-4">
            <button onClick={() => openSocial('https://linkedin.com/in/sebastian-nacht')} className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</button>
            <button onClick={() => openSocial('https://instagram.com/infron_ch')} className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</button>
            <button onClick={() => openSocial('https://x.com/infron_ch')} className="text-gray-400 hover:text-white transition-colors duration-300">X</button>
          </div>
          <div className="text-center text-sm mb-4">
            <button onClick={() => openUI('showAGB')} className="text-gray-400 hover:text-white transition-colors underline">AGB</button> | 
            <button onClick={() => openUI('showDatenschutz')} className="text-gray-400 hover:text-white transition-colors ml-2 underline">Datenschutz</button> | 
            <button onClick={() => openUI('showAGB')} className="text-gray-400 hover:text-white transition-colors ml-2 underline">Widerruf</button>
          </div>
          
          {/* WICHTIGE TRANSPARENZ-ERKLÄRUNG KORRIGIERT */}
          <div className="text-center text-xs text-blue-300 dark:text-blue-400 opacity-90 mt-6 font-semibold">
              Schweizer Präzision: Technische Expertise und Qualitätsmanagement in Zürich. Produktion durch auditiertete Partner (Asien).
          </div>
          
          <div className="text-center text-xs opacity-75 mt-4 border-t border-gray-700 pt-4">
            <h4 className="font-bold mb-2">Impressum (UWG Art. 3)</h4>
            <p>InFron GmbH</p><p>Dragana Ignjatovic, Eigentümerin</p><p>Musterstraße 123, 8000 Zürich, Schweiz</p><p>UID: CHE-123.456.789 MWST</p><p>E-Mail: info@infron.ch | Tel: +41 76 398 15 05</p><p>AGB: [Link zu PDF] | Datenschutz: [Link zu PDF]</p><p>© 2025 InFron GmbH – Alle Rechte vorbehalten</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;