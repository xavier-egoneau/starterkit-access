let voix = [];

        function chargerVoix() {
            voix = speechSynthesis.getVoices();
            const voixSelect = document.getElementById('voixSelect');
            voixSelect.innerHTML = '<option value="">Choisissez une voix</option>';
            voix.forEach((v, i) => {
                if (v.lang.startsWith('fr')) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `${v.name} (${v.lang})`;
                    voixSelect.appendChild(option);
                }
            });
        }

        function parler() {
            const texte = document.getElementById('texteALire').value;
            const voixIndex = document.getElementById('voixSelect').value;

            if ('speechSynthesis' in window) {
                // Diviser le texte en phrases
                const phrases = texte.match(/[^.!?]+[.!?]+/g) || [texte];

                phrases.forEach((phrase, index) => {
                    const utterance = new SpeechSynthesisUtterance(phrase.trim());
                    
                    if (voixIndex) {
                        utterance.voice = voix[voixIndex];
                    }

                    utterance.rate = 0.9; // Légèrement plus lent pour un débit plus naturel
                    utterance.pitch = 1.1; // Légèrement plus aigu pour plus de clarté
                    utterance.volume = 1;

                    // Ajouter une pause après chaque phrase
                    if (index < phrases.length - 1) {
                        utterance.onend = () => setTimeout(() => {}, 700); // Pause de 700ms
                    }

                    window.speechSynthesis.speak(utterance);
                });
            } else {
                alert("Désolé, votre navigateur ne supporte pas la synthèse vocale.");
            }
        }

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = chargerVoix;
        }

        window.onload = chargerVoix;