import React, { useState, useCallback, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import './App.css'; // Für allgemeine Stile, falls vorhanden

const App = () => {
    const [email, setEmail] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [uploadedFile, setUploadedFile] = useState('Keine Datei hochgeladen');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const isEmailValid = useMemo(() => {
        // Einfache E-Mail-Validierung
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

        // Hier würde die tatsächliche API-Anfrage stattfinden
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitMessage('✅ Vielen Dank! Ihre Datei und Anfragedetails wurden erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.');
        
        // Formular zurücksetzen
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

        // Simulierte Anfrage für den Nur-Anfragen-Button
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitMessage('✅ Vielen Dank! Ihre Anfrage ohne Datei wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.');
        
        // Formular zurücksetzen
        setEmail('');
        setProjectDetails('');
        setUploadedFile('Keine Datei hochgeladen');
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>InFron GmbH | HMI Komplettlösungen, Displays & Folientastaturen (Swiss Quality Management)</title>
                <meta name="description" content="Ihr Schweizer Partner für technische Expertise und Qualitätsmanagement von massgefertigten Frontpanels, industriellen Displays und Tastaturen. Schnelle Prototypen-Herstellung und Liefersicherheit." />
            </Helmet>
            
            <div className="min-h-screen bg-white flex flex-col items-center">
                {/* Header/Navigation mit Logo und Slogan - KORRIGIERTE VERSION */}
                <header className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center">
                        {/* Logo und Slogan */}
                        <a href="/" className="flex items-center">
                            {/* Stellen Sie sicher, dass Sie die Datei infron-logo.png in den public/ Ordner kopiert haben! */}
                            <img src="/infron-logo.png" alt="InFron GmbH Logo" className="h-10 mr-3" /> 
                            <div className="hidden sm:block"> {/* Slogan nur auf grösseren Bildschirmen */}
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
                    {/* Hero Content mit optimiertem USP-Statement */}
                    <div className="text-center max-w-4xl mx-auto mb-12 px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-3">
                            Massgefertigte Aluminium-Frontplatten <br className="hidden sm:inline"/>& Eingabesysteme
                        </h1>
                        {/* NEUE SUB-HEADLINE FÜR KLARHEIT */}
                        <p className="text-xl md:text-2xl text-indigo-600 font-semibold mb-6">
                            Ihr zertifizierter Partner für Präzision in der Schweiz.
                        </p>

                        {/* NEUE USP-BULLETS FÜR VERTRAUEN */}
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-10 text-gray-700">
                            <span className="flex items-center text-md">
                                <span className="text-green-500 mr-2">✓</span> **Lieferung 10-14 Tage**
                            </span>
                            <span className="flex items-center text-md">
                                <span className="text-green-500 mr-2">✓</span> **Prototypen- & Kleinserien-Experte**
                            </span>
                            <span className="flex items-center text-md">
                                <span className="text-green-500 mr-2">✓</span> **Inkl. Optical-Bonding-Service**
                            </span>
                        </div>
                        {/* ENDE NEUE ELEMENTE */}
                    </div>

                    {/* Produkt-/Service-Übersicht (4 Hauptkacheln) */}
                    <section className="mt-8 mb-16 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Unsere Kernkompetenzen für Ihren Erfolg</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                                <span className="text-4xl text-orange-500 mb-3 block">⚙️</span>
                                <h3 className="font-bold text-lg mb-1">CNC-Frontplatten</h3>
                                <p className="text-sm text-gray-600">Aluminium und Edelstahl, hochpräzise gefräst.</p>
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
                                <h3 className="font-bold text-lg mb-1">Q-Management CH</h3>
                                <p className="text-sm text-gray-600">Zertifizierte Prozesse und Schweizer Ansprechpartner.</p>
                            </div>
                        </div>
                    </section>
                    {/* Ende Produkt-/Service-Übersicht */}

                    {/* NEUE DETAILLIERTE PRODUKT-LISTE */}
                    <section className="mt-10 mb-16 max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Detaillierte Leistungen im Überblick</h2>
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
                                <p className="text-gray-700 font-medium">Displays/Touch</p>
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
                    {/* ENDE NEUE DETAILLIERTE PRODUKT-LISTE */}

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
                            Qualität aus der Schweiz. <span className="text-orange-500">Ihr direkter Draht zur Produktion.</span>
                        </p>
                        <p>© {new Date().getFullYear()} InFron GmbH. Alle Rechte vorbehalten. | <a href="tel:+41763981505" className="hover:text-indigo-600 transition-colors">Telefon: +41 76 398 15 05</a></p>
                        <p className="text-xs mt-1 text-gray-500">Impressum | Datenschutzerklärung | AGB</p>
                    </div>
                </footer>
            </div>
        </HelmetProvider>
    );
}

export default App;