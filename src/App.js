import React, { useState, useCallback, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import './App.css'; 

// 1. BILD IMPORTIEREN (WICHTIG: Pfad muss korrekt zum verschobenen Bild sein)
import heroBackground from './publichero-background.jpg'; 

const App = () => {
    const [email, setEmail] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [uploadedFile, setUploadedFile] = useState('Keine Datei hochgeladen');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const isEmailValid = useMemo(() => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, [email]);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setUploadedFile(acceptedFiles[0].name);
        }
    }, []);

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
    });

    const handleDropzoneClick = (e) => {
        e.preventDefault();
        open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isEmailValid) {
            setSubmitMessage('Bitte geben Sie eine gültige E-Mail-Adresse an.');
            return;
        }

        if (uploadedFile === 'Keine Datei hochgeladen') {
             setSubmitMessage('Bitte laden Sie eine Datei hoch oder klicken Sie auf "Nur anfragen".');
             return;
        }

        setIsSubmitting(true);
        setSubmitMessage('Ihre Anfrage wird verarbeitet...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitMessage('✅ Vielen Dank! Ihre Datei und Anfragedetails wurden erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.');
        
        setEmail('');
        setProjectDetails('');
        setUploadedFile('Keine Datei hochgeladen');
    };

    const handleAnfragen = async (e) => {
        e.preventDefault();
        
        if (!isEmailValid) {
            setSubmitMessage('Bitte geben Sie eine gültige E-Mail-Adresse an.');
            return;
        }

        if (projectDetails.trim() === '') {
            setSubmitMessage('Bitte geben Sie Projektdetails an, wenn Sie keine Datei hochladen können.');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('Ihre Anfrage wird verarbeitet...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitMessage('✅ Vielen Dank! Ihre Anfrage ohne Datei wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.');
        
        setEmail('');
        setProjectDetails('');
        setUploadedFile('Keine Datei hochgeladen');
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>InFron GmbH | HMI Komplettlösungen, Displays & Folientastaturen (Swiss Quality Management)</title>
                <meta name="description" content="Ihr Partner für Inputsysteme mit Schweizer Expertise. Wir bieten präzisionsgefertigte Frontpanels und Displays, gemanagt mit Schweizer Qualitätsstandards (Produktion in China)." />
            </Helmet>
            
            <div className="min-h-screen bg-white flex flex-col items-center">
                {/* Header/Navigation mit Logo und Slogan */}
                <header className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center">
                        {/* Logo und Slogan */}
                        <a href="/" className="flex items-center">
                            <img src="/infron-logo.png" alt="InFron GmbH Logo" className="h-10 mr-3" /> 
                            <div className="hidden sm:block"> 
                                <p className="text-sm text-gray-600">Input systems & Front panels, always in front</p>
                            </div>
                        </a>
                    </div>
                    <nav className="space-x-4">
                        <a href="mailto:info@frontinput.ch" className="text-gray-600 hover:text-indigo-600 transition-colors hidden sm:inline">E-Mail</a>
                        <a href="tel:+41763981505" className="text-gray-600 hover:text-indigo-600 transition-colors hidden sm:inline">Kontakt</a>
                        <a href="https://wa.me/41763981505" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                            WhatsApp
                        </a>
                    </nav>
                </header>

                <main className="flex-grow w-full max-w-7xl px-4 py-16">
                    {/* Hero Content - MIT HINTERGRUNDBILD ÜBER INLINE-STYLE */}
                    <div 
                        className="text-center max-w-4xl mx-auto mb-12 px-4 py-10 rounded-lg relative overflow-hidden shadow-xl" 
                        style={{
                            backgroundImage: `url(${heroBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '400px',
                        }}
                    > 
                        {/* Overlay für bessere Lesbarkeit des Textes auf dem Bild */}
                        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div> 
                        
                        {/* Textinhalt des Hero-Bereichs mit weisser Farbe für bessere Lesbarkeit */}
                        <div className="relative z-10 text-white"> 
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-3">
                                Massgefertigte Inputsysteme <br className="hidden sm:inline"/>und Frontpanels
                            </h1>
                            <p className="text-xl md:text-2xl text-orange-400 font-semibold mb-6">
                                Ihr Partner für Inputsysteme mit **Schweizer Expertise und Q-Management**.
                            </p>

                            <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-10 text-white">
                                <span className="flex items-center text-md">
                                    <span className="text-green-400 mr-2">✓</span> **Lieferung 10-14 Tage**
                                </span>
                                <span className="flex items-center text-md">
                                    <span className="text-green-400 mr-2">✓</span> **Prototypen- & Kleinserien-Experte**
                                </span>
                                <span className="flex items-center text-md">
                                    <span className="text-green-400 mr-2">✓</span> **Inkl. Optical-Bonding-Service**
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Produkt-/Service-Übersicht (4 Hauptkacheln) */}
                    <section className="mt-8 mb-10 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Unsere Kernkompetenzen für Ihren Erfolg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                                <span className="text-4xl text-orange-500 mb-3 block">⚙️</span>
                                <h3 className="font-bold text-lg mb-1">CNC-Frontplatten</h3>
                                <p className="text-sm text-gray-600">Aluminium und Edelstahl, hochpräzise gefertigt.</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                                <span className="text-4xl text-orange-500 mb-3 block">🖥️</span>
                                <h3 className="font-bold text-lg mb-1">Industrielle Displays</h3>
                                <p className="text-sm text-gray-600">HMI-Systeme und Optical Bonding Lösungen.</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                                <span className="text-4xl text-orange-500 mb-3 block">⌨️</span>
                                <h3 className="font-bold text-lg mb-1">Folientastaturen</h3>
                                <p className="text-sm text-gray-600">Robust und langlebig, nach Kundenspezifikation.</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                                <span className="text-4xl text-orange-500 mb-3 block">🤝</span>
                                <h3 className="font-bold text-lg mb-1">Swiss Q-Management</h3>
                                <p className="text-sm text-gray-600">Prozessbegleitung und Schweizer Ansprechpartner.</p>
                            </div>
                        </div>
                    </section>

                    {/* DETAILLIERTE BESCHREIBUNG DES ANGEBOTS */}
                    <section className="mt-10 mb-16 max-w-4xl mx-auto px-4 text-gray-700">
                        <p className="mb-6 leading-relaxed">
                            Als Ihr kompetenter Partner in der Schweiz liefern wir nicht nur **massgefertigte Eingabesysteme**, sondern bieten Ihnen die gesamte Bandbreite an Lösungen von der CNC-Frontplatte bis zur komplexen HMI Komplettlösung. Wir sind spezialisiert auf die präzise Realisierung Ihrer technischen Anforderungen für den industriellen Einsatz. **Die Produktion unserer Komponenten findet in Asien statt, wobei die gesamte Projektleitung und das Qualitätsmanagement durch unser Team in der Schweiz gewährleistet werden.**
                        </p>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Unser Leistungsspektrum im Detail:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-left">
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">HMI Komplettlösungen</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">IMD (In-Mold-Decoration)</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Displays/Touch (Inkl. Optical Bonding)</p>
                            </div>
                            
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Glasoberflächen/Technische Gläser</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Folientastaturen</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Silikonschaltmatten</p>
                            </div>

                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Kapazitive Tastaturen</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Bedienfolien, Frontfolien & Dekorfolien</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Frontplatten</p>
                            </div>
                            
                            <div className="flex items-start">
                                <span className="text-indigo-600 mr-3 mt-1">●</span>
                                <p className="text-gray-700 font-medium">Gedruckte Leiterbahnen FPC</p>
                            </div>
                        </div>
                    </section>
                    {/* ENDE DETAILLIERTE BESCHREIBUNG */}

                    {/* Formularsektion */}
                    <div className="max-w-3xl mx-auto bg-gray-50 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                            Starten Sie Ihre Anfrage in 3 Schritten
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* 1. E-Mail-Feld */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">1. Ihre E-Mail-Adresse (Für das Angebot)</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-3 border ${isEmailValid || email === '' ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm`}
                                    placeholder="max.muster@ihrefirma.ch"
                                    required
                                />
                                {!isEmailValid && email !== '' && (
                                    <p className="text-sm text-red-500">Bitte geben Sie eine gültige Firmen-E-Mail an.</p>
                                )}
                            </div>

                            {/* 2. Projekt-Details */}
                            <div className="space-y-2">
                                <label htmlFor="details" className="block text-lg font-semibold text-gray-700">2. Projektdetails & Spezifikationen</label>
                                <textarea
                                    id="details"
                                    value={projectDetails}
                                    onChange={(e) => setProjectDetails(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm"
                                    placeholder="Benötigte Stückzahl, Material (z.B. EN AW-6060), Displaygrösse, Deadline etc."
                                    required
                                />
                            </div>

                            {/* 3. Datei-Upload (Dropzone) */}
                            <div className="space-y-2">
                                <label className="block text-lg font-semibold text-gray-700">3. Technische Zeichnung / 3D-Modell (Optional)</label>
                                <div {...getRootProps()} className={`p-8 border-4 border-dashed rounded-lg transition-colors ${
                                    isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                                } text-center cursor-pointer`}>
                                    <input {...getInputProps()} />
                                    <p className="text-gray-500">
                                        Ziehen Sie Dateien hierher, oder klicken Sie auf den Button unten.
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Unterstützte Formate: STEP, DXF, DWG, PDF, STL. (Max. 50MB)
                                    </p>
                                    <p className="mt-4 text-indigo-600 font-medium">
                                        {uploadedFile}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Submit Button & Alternativ-Button */}
                            <div className="pt-4 space-y-3">
                                
                                {/* Primärer CTA: Orange und Auffällig */}
                                <button 
                                    onClick={handleDropzoneClick} 
                                    className="w-full bg-orange-500 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-orange-600 transition-colors shadow-2xl transform hover:scale-105 disabled:bg-gray-400"
                                    disabled={isSubmitting}
                                >
                                    Jetzt 3D-Upload starten & Preis anfragen
                                </button>

                                {/* Sekundärer CTA: Nur Anfragen */}
                                <button 
                                    onClick={handleAnfragen} 
                                    className="w-full bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md disabled:bg-gray-400"
                                    disabled={isSubmitting}
                                >
                                    Nur **anfragen** (Falls Sie keinen 3D-Upload benötigen)
                                </button>
                            </div>

                            {submitMessage && (
                                <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${submitMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </main>

                {/* Footer mit Trust-Elementen */}
                <footer className="bg-gray-100 mt-20 py-8 border-t-4 border-orange-500 w-full">
                    <div className="container mx-auto text-center text-gray-700 px-4">
                        <p className="font-semibold mb-2 text-indigo-800">
                            Swiss Management. <span className="text-orange-500">Weltweite Produktion.</span> Ihr direkter Draht zur Lösung.
                        </p>
                        <p>© {new Date().getFullYear()} InFron GmbH. Alle Rechte vorbehalten. | <a href="tel:+41763981505" className="hover:text-indigo-600 transition-colors">Telefon: +41 76 398 15 05</a></p>
                        <p className="text-xs mt-1 text-gray-500">Impressum | Datenschutzerklärung | AGB</p>
                    </div>
                </footer>
            </div>
            
            {/* Floating Action Button (FAB) - "Experten"-Blase */}
            <a 
                href="https://wa.me/41763981505" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white rounded-full shadow-2xl p-4 flex items-center space-x-2 
                            hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Fragen Sie den Experten via WhatsApp"
            >
                <span className="text-2xl">💬</span> 
                <span className="hidden sm:block font-bold text-lg pr-2">Experten-Chat</span>
            </a>

        </HelmetProvider>
    );
}

export default App;