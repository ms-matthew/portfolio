export const translations = {
    en: {
        // Navbar
        nav: {
            home: "Home",
            about: "About",
            stack: "Stack",
            now: "Now",
            work: "Work",
            journey: "Journey",
            contact: "Contact",
        },

        // Hero terminal
        hero: {
            terminalTitle: "mateusz@portfolio ~",
            lines: [
                { prompt: "$ whoami", delay: 600 },
                { output: "Mateusz — developer from Lublin, PL", delay: 40 },
                { prompt: "$ cat skills.txt", delay: 400 },
                { output: "React + Vite / WebRTC / SignalR / Jetpack Compose", delay: 35 },
                { prompt: "$ cat focus.txt", delay: 400 },
                { output: "real-time apps, full stack, mobile", delay: 35 },
                { prompt: "$ uptime --work", delay: 400 },
            ],
            uptimePrefix: "up",
            uptimeSuffix: "since aug 21, 2025",
            statusWorking: "working for",
            statusCta: "say hi",
        },

        // Hero right side highlights
        heroHighlights: [
            { value: "React", label: "daily driver" },
            { value: "WebRTC", label: "real-time" },
            { value: "Go", label: "backend" },
            { value: "Mobile", label: "Compose" },
        ],

        // About
        about: {
            heading: "Who I am",
            section: "01",
            statement:
                'I build web apps that work in <aqua>real time</aqua> and mobile apps that feel <lavender>native</lavender>. Everything else follows from that.',
            bio: "I'm Mateusz, a developer from Lublin. React + Vite on the frontend, WebRTC & SignalR for live connections, Jetpack Compose for mobile, and currently learning Go for the backend side. I've worked on client projects involving real-time communication and I'm pushing towards full stack.",
            locationTitle: "On file",
            location: "Lublin, PL",
            coords: "51.2465\u00B0 N, 22.5684\u00B0 E",
            replyWeekday: "Weekday reply \u2248 same day.",
            replyWeekend: "Weekend reply \u2248 maybe Monday.",
            statsTitle: "the shape",
            statMonths: "months working",
            statReact: "+ Vite daily",
            statWebRTC: "live connections",
            statGo: "learning backend",
        },

        // Stack
        stack: {
            heading: "The stack",
            section: "02",
            statement:
                "Four tools I use every day. Eight more that orbit around them depending on what the project needs.",
            bio: "React + Vite for the web, WebRTC & SignalR for real-time, Go and Jetpack Compose on the learning list. I pick what fits the problem, not what's trending.",
            legendExpert: "expert",
            legendExperienced: "experienced",
            legendComfortable: "comfortable",
            legendLearning: "learning",
            centerLabel: "stack",
            coreLabel: "Core",
            orbitLabel: "In orbit",
        },

        // Now
        now: {
            heading: "Right now",
            section: "03",
            items: [
                {
                    label: "Building",
                    body: "Full stack apps \u2014 React + Vite on the frontend, learning Go on the backend. Connecting the dots between client and server.",
                },
                {
                    label: "Working on",
                    body: "Real-time web applications with WebRTC and SignalR. Video calls, screen sharing, live data sync \u2014 the kind of stuff where latency matters.",
                },
                {
                    label: "Learning",
                    body: "Go for backend services and Jetpack Compose for native Android. Expanding from frontend into full stack and mobile.",
                },
                {
                    label: "Exploring",
                    body: "three.js and creative web experiments. This portfolio is one of them \u2014 parallax, comet, orbit animations.",
                },
            ],
        },

        // Projects
        projects: {
            heading: "Things I built",
            section: "04",
            moreIn: "More in",
            directMessage: "direct message",
        },

        // Journey
        journey: {
            heading: "The journey",
            section: "06",
            milestones: [
                {
                    date: "Aug 2025",
                    title: "Started working",
                    body: "First professional role. Jumped in with mobile apps \u2014 Jetpack Compose, Kotlin, learning the Android ecosystem from scratch.",
                },
                {
                    date: "Oct 2025",
                    title: "Shifted to web",
                    body: "Moved to React + Vite. Started building web applications with real-time features \u2014 WebRTC for peer-to-peer, SignalR for server-pushed updates.",
                },
                {
                    date: "Nov 2025",
                    title: "Client projects",
                    body: "Worked directly with clients on live-connection apps \u2014 video calls, screen sharing, real-time data sync. The kind of stuff where milliseconds matter.",
                },
                {
                    date: "Apr 2026",
                    title: "Learning Go",
                    body: "Started learning Go for backend services. Pushing towards full stack \u2014 connecting the frontend I know with the server side I'm building.",
                },
                {
                    date: "Now",
                    title: "Full stack path",
                    body: "React + Vite on the frontend, Go on the backend, still experimenting with three.js and creative web on the side. This portfolio is one of those experiments.",
                },
            ],
        },

        // Contact
        contact: {
            heading: "Get in touch",
            section: "07",
            statement:
                "Open to projects \u2014 web apps, real-time features, mobile, anything where the interaction matters. Mail goes through fastest.",
            bio: "If you need someone who can handle both the frontend and the live-connection layer, or if you're building something that needs to feel instant \u2014 let's talk.",
            channelNotes: {
                email: "fastest path",
                github: "code and experiments",
                linkedin: "if that's your thing",
            },
        },

        // Footer
        footer: {
            built: "built in Lublin, late at night",
            tagline: "no analytics \u00B7 no cookies \u00B7 no nonsense",
        },
    },

    pl: {
        nav: {
            home: "Start",
            about: "O mnie",
            stack: "Stack",
            now: "Teraz",
            work: "Projekty",
            journey: "Droga",
            contact: "Kontakt",
        },

        hero: {
            terminalTitle: "mateusz@portfolio ~",
            lines: [
                { prompt: "$ whoami", delay: 600 },
                { output: "Mateusz \u2014 developer z Lublina", delay: 40 },
                { prompt: "$ cat skills.txt", delay: 400 },
                { output: "React + Vite / WebRTC / SignalR / Jetpack Compose", delay: 35 },
                { prompt: "$ cat focus.txt", delay: 400 },
                { output: "aplikacje real-time, full stack, mobile", delay: 35 },
                { prompt: "$ uptime --work", delay: 400 },
            ],
            uptimePrefix: "up",
            uptimeSuffix: "od 21 sierpnia 2025",
            statusWorking: "pracuj\u0119 od",
            statusCta: "napisz",
        },

        heroHighlights: [
            { value: "React", label: "codziennie" },
            { value: "WebRTC", label: "real-time" },
            { value: "Go", label: "backend" },
            { value: "Mobile", label: "Compose" },
        ],

        about: {
            heading: "Kim jestem",
            section: "01",
            statement:
                'Buduj\u0119 aplikacje webowe dzia\u0142aj\u0105ce w <aqua>czasie rzeczywistym</aqua> i mobilne, kt\u00F3re wygl\u0105daj\u0105 jak <lavender>natywne</lavender>. Reszta wynika z tego.',
            bio: "Jestem Mateusz, developer z Lublina. React + Vite na frontendzie, WebRTC i SignalR do po\u0142\u0105cze\u0144 na \u017Cywo, Jetpack Compose na mobile, aktualnie ucz\u0119 si\u0119 Go pod backend. Pracowa\u0142em przy projektach klienckich z komunikacj\u0105 real-time i id\u0119 w stron\u0119 full stacka.",
            locationTitle: "Lokalizacja",
            location: "Lublin, PL",
            coords: "51.2465\u00B0 N, 22.5684\u00B0 E",
            replyWeekday: "W tygodniu \u2248 tego samego dnia.",
            replyWeekend: "Weekend \u2248 mo\u017Ce poniedzia\u0142ek.",
            statsTitle: "w liczbach",
            statMonths: "miesi\u0119cy pracy",
            statReact: "+ Vite codziennie",
            statWebRTC: "po\u0142\u0105czenia live",
            statGo: "ucz\u0119 si\u0119 backendu",
        },

        stack: {
            heading: "Stack",
            section: "02",
            statement:
                "Cztery narz\u0119dzia, kt\u00F3rych u\u017Cywam codziennie. Osiem kolejnych orbituje wok\u00F3\u0142 nich zale\u017Cnie od projektu.",
            bio: "React + Vite na web, WebRTC i SignalR do real-time, Go i Jetpack Compose na li\u015Bcie do nauki. Wybieram to co pasuje do problemu, nie to co jest modne.",
            legendExpert: "ekspert",
            legendExperienced: "do\u015Bwiadczony",
            legendComfortable: "komfortowo",
            legendLearning: "ucz\u0119 si\u0119",
            centerLabel: "stack",
            coreLabel: "Rdze\u0144",
            orbitLabel: "Na orbicie",
        },

        now: {
            heading: "W\u0142a\u015Bnie teraz",
            section: "03",
            items: [
                {
                    label: "Buduj\u0119",
                    body: "Aplikacje full stack \u2014 React + Vite na frontendzie, ucz\u0119 si\u0119 Go na backendzie. \u0141\u0105cz\u0119 klienta z serwerem.",
                },
                {
                    label: "Pracuj\u0119 nad",
                    body: "Aplikacjami webowymi real-time z WebRTC i SignalR. Wideorozmowy, udost\u0119pnianie ekranu, synchronizacja danych na \u017Cywo.",
                },
                {
                    label: "Ucz\u0119 si\u0119",
                    body: "Go do serwis\u00F3w backendowych i Jetpack Compose na natywnego Androida. Rozszerzam si\u0119 z frontendu na full stack i mobile.",
                },
                {
                    label: "Eksperymentuj\u0119",
                    body: "three.js i kreatywne eksperymenty webowe. To portfolio jest jednym z nich \u2014 parallax, kometa, animacje orbit.",
                },
            ],
        },

        projects: {
            heading: "Co zbudowa\u0142em",
            section: "04",
            moreIn: "Wi\u0119cej przez",
            directMessage: "wiadomo\u015B\u0107",
        },

        journey: {
            heading: "Moja droga",
            section: "06",
            milestones: [
                {
                    date: "Sie 2025",
                    title: "Pocz\u0105tek pracy",
                    body: "Pierwsza profesjonalna rola. Zacz\u0105\u0142em od aplikacji mobilnych \u2014 Jetpack Compose, Kotlin, nauka ekosystemu Androida od zera.",
                },
                {
                    date: "Pa\u017A 2025",
                    title: "Przeskok na web",
                    body: "Przesiad\u0142em si\u0119 na React + Vite. Zacz\u0105\u0142em budowa\u0107 aplikacje webowe z funkcjami real-time \u2014 WebRTC peer-to-peer, SignalR do aktualizacji z serwera.",
                },
                {
                    date: "Lis 2025",
                    title: "Projekty klienckie",
                    body: "Praca bezpo\u015Brednio z klientami nad aplikacjami live \u2014 wideorozmowy, udost\u0119pnianie ekranu, synchronizacja danych. Tam gdzie milisekundy maj\u0105 znaczenie.",
                },
                {
                    date: "Kwi 2026",
                    title: "Nauka Go",
                    body: "Zacz\u0105\u0142em uczy\u0107 si\u0119 Go do serwis\u00F3w backendowych. Id\u0119 w stron\u0119 full stacka \u2014 \u0142\u0105cz\u0119 frontend kt\u00F3ry znam z serwerem kt\u00F3ry buduj\u0119.",
                },
                {
                    date: "Teraz",
                    title: "Droga full stack",
                    body: "React + Vite na frontendzie, Go na backendzie, nadal eksperymentuj\u0119 z three.js i kreatywnym webem. To portfolio to jeden z tych eksperyment\u00F3w.",
                },
            ],
        },

        contact: {
            heading: "Kontakt",
            section: "07",
            statement:
                "Otwarty na projekty \u2014 aplikacje webowe, funkcje real-time, mobile, wszystko gdzie interakcja ma znaczenie. Mail dochodzi najszybciej.",
            bio: "Je\u015Bli potrzebujesz kogo\u015B kto ogarnia frontend i warstw\u0119 po\u0142\u0105cze\u0144 na \u017Cywo, albo budujesz co\u015B co musi dzia\u0142a\u0107 natychmiast \u2014 pogadajmy.",
            channelNotes: {
                email: "najszybsza droga",
                github: "kod i eksperymenty",
                linkedin: "je\u015Bli to twoja bajka",
            },
        },

        footer: {
            built: "zbudowane w Lublinie, p\u00F3\u017An\u0105 noc\u0105",
            tagline: "bez analityki \u00B7 bez cookies \u00B7 bez bzdur",
        },
    },
};
